/**
 * Admin Session Inactivity Expiration Utility
 * 
 * Automatically tracks user activity in the Admin suite.
 * If 30 minutes of inactivity elapse without user interaction:
 * 1. Automatically clears local storage (clears session tokens, auth keys, and caches)
 * 2. Redirects the user back to the public homepage
 */

import { useEffect, useRef, useCallback } from 'react';

// 30 minutes of inactivity in milliseconds
export const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

// Storage keys used by Admin suite
export const LAST_ACTIVITY_STORAGE_KEY = 'marketinglu_admin_last_activity';
export const ADMIN_AUTH_KEYS = [
  'marketinglu_admin_session',
  'marketinglu_admin_token',
  'marketinglu_admin_user',
  LAST_ACTIVITY_STORAGE_KEY,
];

// Activity event types to listen for
export const USER_ACTIVITY_EVENTS = [
  'mousedown',
  'mousemove',
  'keydown',
  'scroll',
  'touchstart',
  'click',
  'wheel',
] as const;

let inMemoryLastActivity = Date.now();

/**
 * Clear local storage on session expiration or manual logout
 */
export function clearLocalStorage(): void {
  try {
    // Specifically remove known admin keys
    ADMIN_AUTH_KEYS.forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // ignore
      }
    });

    // Clear local storage and session storage
    localStorage.clear();
    sessionStorage.clear();
  } catch (err) {
    console.warn('[AdminSession] Error clearing local storage:', err);
  }
}

/**
 * Record user activity timestamp in memory and throttled in localStorage
 */
let lastStorageWrite = 0;
export function recordActivity(): void {
  const now = Date.now();
  inMemoryLastActivity = now;

  // Throttle localStorage write to at most once every 2 seconds
  if (now - lastStorageWrite > 2000) {
    lastStorageWrite = now;
    try {
      localStorage.setItem(LAST_ACTIVITY_STORAGE_KEY, String(now));
    } catch {
      // ignore
    }
  }
}

/**
 * Get the latest activity timestamp
 */
export function getLastActivity(): number {
  try {
    const stored = localStorage.getItem(LAST_ACTIVITY_STORAGE_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!isNaN(parsed) && parsed > 0) {
        return Math.max(inMemoryLastActivity, parsed);
      }
    }
  } catch {
    // fallback to in-memory
  }
  return inMemoryLastActivity;
}

/**
 * Check if the session is currently expired based on inactivity
 */
export function isSessionExpired(timeoutMs: number = INACTIVITY_TIMEOUT_MS): boolean {
  const lastActive = getLastActivity();
  const elapsed = Date.now() - lastActive;
  return elapsed >= timeoutMs;
}

/**
 * Reset activity timer (e.g. on fresh login)
 */
export function resetActivityTimer(): void {
  const now = Date.now();
  inMemoryLastActivity = now;
  lastStorageWrite = now;
  try {
    localStorage.setItem(LAST_ACTIVITY_STORAGE_KEY, String(now));
  } catch {
    // ignore
  }
}

export interface SessionExpirationOptions {
  onExpire: () => void;
  timeoutMs?: number;
  enabled?: boolean;
}

/**
 * Custom React Hook to track inactivity and trigger session expiration
 */
export function useAdminSessionExpiration({
  onExpire,
  timeoutMs = INACTIVITY_TIMEOUT_MS,
  enabled = true,
}: SessionExpirationOptions) {
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleExpiration = useCallback(() => {
    // Clean up timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Execute session cleanup
    clearLocalStorage();

    // Trigger expiration callback (e.g. redirect to homepage)
    onExpireRef.current();
  }, []);

  const scheduleTimeout = useCallback(() => {
    if (!enabled) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const lastActive = getLastActivity();
    const elapsed = Date.now() - lastActive;
    const remaining = Math.max(0, timeoutMs - elapsed);

    if (remaining <= 0) {
      handleExpiration();
      return;
    }

    timerRef.current = setTimeout(() => {
      handleExpiration();
    }, remaining);
  }, [enabled, timeoutMs, handleExpiration]);

  // Listener for user interactions
  const handleUserActivity = useCallback(() => {
    if (!enabled) return;
    recordActivity();
    scheduleTimeout();
  }, [enabled, scheduleTimeout]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Check if session was already expired while inactive or in background
    if (isSessionExpired(timeoutMs)) {
      handleExpiration();
      return;
    }

    // Set initial activity mark and schedule
    recordActivity();
    scheduleTimeout();

    // Attach interaction event listeners
    const options: AddEventListenerOptions = { passive: true };
    USER_ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleUserActivity, options);
    });

    // Also check on visibility change (when user switches tabs back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (isSessionExpired(timeoutMs)) {
          handleExpiration();
        } else {
          scheduleTimeout();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Periodic safety interval check (runs every 15 seconds)
    intervalRef.current = setInterval(() => {
      if (isSessionExpired(timeoutMs)) {
        handleExpiration();
      }
    }, 15000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      USER_ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleUserActivity);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, timeoutMs, handleUserActivity, scheduleTimeout, handleExpiration]);

  return {
    resetTimer: handleUserActivity,
    clearStorage: clearLocalStorage,
  };
}
