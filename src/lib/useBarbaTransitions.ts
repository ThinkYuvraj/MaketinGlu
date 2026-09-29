import { useEffect, useRef } from 'react';
import barba from '@barba/core';

export function useBarbaTransitions(activeRouteKey: string) {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if Barba wrapper and container are present in DOM
    const wrapper = document.querySelector('[data-barba="wrapper"]');
    const container = document.querySelector('[data-barba="container"]');

    if (!wrapper || !container) return;

    if (!isInitialized.current) {
      try {
        barba.init({
          debug: false,
          preventRunning: true,
          transitions: [
            {
              name: 'default-transition',
              leave(data) {
                return new Promise<void>((resolve) => {
                  if (data.current && data.current.container) {
                    data.current.container.style.opacity = '0';
                    data.current.container.style.transform = 'translateY(-10px)';
                    data.current.container.style.transition = 'opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)';
                  }
                  setTimeout(resolve, 280);
                });
              },
              enter(data) {
                return new Promise<void>((resolve) => {
                  if (data.next && data.next.container) {
                    data.next.container.style.opacity = '0';
                    data.next.container.style.transform = 'translateY(15px)';
                    data.next.container.style.transition = 'opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
                    
                    requestAnimationFrame(() => {
                      if (data.next.container) {
                        data.next.container.style.opacity = '1';
                        data.next.container.style.transform = 'translateY(0px)';
                      }
                    });
                  }
                  setTimeout(resolve, 350);
                });
              }
            }
          ]
        });

        // Lifecycle hooks for smooth transition feedback
        barba.hooks.before(() => {
          document.body.classList.add('is-transitioning');
        });

        barba.hooks.after(() => {
          document.body.classList.remove('is-transitioning');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        isInitialized.current = true;
      } catch (err) {
        // Fallback gracefully if already initialized or standard routing in place
        console.debug('Barba initialized with SPA adapter:', err);
      }
    }

    return () => {
      // Cleanup hook if unmounted
    };
  }, []);

  // Trigger Barba transition lifecycle whenever the React route changes
  useEffect(() => {
    const container = document.querySelector(`[data-barba="container"][data-barba-namespace="${activeRouteKey}"]`);
    if (container) {
      document.body.classList.add('barba-page-entering');
      const timer = setTimeout(() => {
        document.body.classList.remove('barba-page-entering');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeRouteKey]);
}
