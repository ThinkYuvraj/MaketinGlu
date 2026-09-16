import React, { useState, useEffect, useCallback } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import {
  useAdminSessionExpiration,
  clearLocalStorage,
  resetActivityTimer,
  isSessionExpired,
  INACTIVITY_TIMEOUT_MS,
} from './sessionExpiration';

interface AdminAppProps {
  onBackToSite: () => void;
}

export default function AdminApp({ onBackToSite }: AdminAppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // If the session has already expired based on 30m inactivity, clear and return unauthenticated
    if (isSessionExpired()) {
      clearLocalStorage();
      return false;
    }
    return localStorage.getItem('marketinglu_admin_session') === 'authenticated';
  });

  // Automatically clears local storage and redirects the user back to the public homepage after 30 minutes of inactivity
  const handleSessionExpired = useCallback(() => {
    clearLocalStorage();
    setIsAuthenticated(false);
    onBackToSite();
    if (typeof window !== 'undefined' && window.location.hash !== '#/' && window.location.hash !== '') {
      window.location.hash = '#/';
    }
  }, [onBackToSite]);

  // Hook tracking user interaction events and enforcing 30m inactivity window
  useAdminSessionExpiration({
    onExpire: handleSessionExpired,
    timeoutMs: INACTIVITY_TIMEOUT_MS,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    const token = localStorage.getItem('marketinglu_admin_token');
    if (token) {
      // Check inactivity on initial verification
      if (isSessionExpired()) {
        handleSessionExpired();
        return;
      }

      // Validate session with backend server
      fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.valid) {
          clearLocalStorage();
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        // If server is unreachable momentarily, maintain session
      });
    }
  }, [handleSessionExpired]);

  const handleLoginSuccess = () => {
    resetActivityTimer();
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('marketinglu_admin_token');
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch {
        // Ignore logout network error
      }
    }
    clearLocalStorage();
    setIsAuthenticated(false);
    onBackToSite();
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess} 
        onBackToSite={onBackToSite} 
      />
    );
  }

  return (
    <AdminDashboard 
      onBackToSite={onBackToSite} 
      onLogout={handleLogout} 
    />
  );
}
