import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { expertiseData } from '../data/expertiseData';

export type RouteType = 'home' | 'services-index' | 'service-detail' | 'admin';

export interface RouteState {
  type: RouteType;
  serviceId?: string;
  anchor?: string;
  path: string;
}

interface NavigationContextType {
  currentRoute: RouteState;
  navigateTo: (path: string) => void;
  navigateToService: (serviceId: string) => void;
  navigateToHome: (anchor?: string) => void;
  navigateToAdmin: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function parsePathAndHash(): RouteState {
  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '/';

  // Normalize hash route (e.g., #/services/web-design -> /services/web-design)
  let routePath = '';
  if (hash.startsWith('#/')) {
    routePath = hash.slice(1); // '/services/web-design'
  } else if (hash.startsWith('#')) {
    // Check if hash is an anchor or alias
    const rawHash = hash.slice(1).toLowerCase();
    if (rawHash === 'admin' || rawHash === 'login') {
      return { type: 'admin', path: '#/admin' };
    }
    if (['web-design', 'ecommerce', 'seo', 'graphic-design', 'ppc', 'smo'].includes(rawHash)) {
      return { type: 'service-detail', serviceId: rawHash, path: `#/services/${rawHash}` };
    }
    if (rawHash === 'services' || rawHash === 'expertise') {
      return { type: 'services-index', path: '#/services' };
    }
    // Anchor on home page
    return { type: 'home', anchor: rawHash, path: hash };
  } else if (pathname !== '/') {
    routePath = pathname;
  }

  // Handle routePath:
  if (routePath.startsWith('/admin') || routePath.startsWith('/login')) {
    return { type: 'admin', path: '#/admin' };
  }

  if (routePath === '/services' || routePath === '/services/') {
    return { type: 'services-index', path: '#/services' };
  }

  const serviceMatch = routePath.match(/^\/services\/([a-zA-Z0-9_-]+)/);
  if (serviceMatch) {
    let serviceId = serviceMatch[1].toLowerCase();
    // Normalize aliases
    if (serviceId === 'branding' || serviceId === 'design' || serviceId === 'branding-design') serviceId = 'graphic-design';
    if (serviceId === 'smm' || serviceId === 'social-media') serviceId = 'smo';
    if (serviceId === 'websites' || serviceId === 'web') serviceId = 'web-design';
    if (serviceId === 'search') serviceId = 'seo';

    const exists = expertiseData.some(item => item.id === serviceId);
    if (exists) {
      return { type: 'service-detail', serviceId, path: `#/services/${serviceId}` };
    }
  }

  return { type: 'home', path: '#/' };
}

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => parsePathAndHash());

  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parsePathAndHash();
      setCurrentRoute(parsed);

      // Handle document title updates
      if (parsed.type === 'service-detail' && parsed.serviceId) {
        const item = expertiseData.find(e => e.id === parsed.serviceId);
        if (item) {
          document.title = `${item.title} | MarketingGlu`;
        }
      } else if (parsed.type === 'services-index') {
        document.title = "Core Digital Marketing Services & Solutions | MarketingGlu";
      } else if (parsed.type === 'admin') {
        document.title = "Admin Studio | MarketingGlu";
      } else {
        document.title = "MarketingGlu - Digital Marketing Solutions";
      }

      // Smooth scroll to top when changing full pages
      if (parsed.type !== 'home' || !parsed.anchor) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (parsed.anchor) {
        // Scroll to anchor on home page
        setTimeout(() => {
          const el = document.getElementById(parsed.anchor!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    // Initial check
    handleLocationChange();

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (targetPath: string) => {
    if (targetPath.startsWith('#')) {
      window.location.hash = targetPath;
    } else if (targetPath.startsWith('/')) {
      window.location.hash = `#${targetPath}`;
    } else {
      window.location.hash = `#/${targetPath}`;
    }
  };

  const navigateToService = (serviceId: string) => {
    navigateTo(`/services/${serviceId}`);
  };

  const navigateToHome = (anchor?: string) => {
    if (anchor) {
      if (currentRoute.type === 'home') {
        const el = document.getElementById(anchor.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        window.location.hash = `#${anchor.replace('#', '')}`;
      } else {
        window.location.hash = `#/${anchor.replace('#', '')}`;
      }
    } else {
      window.location.hash = '#/';
    }
  };

  const navigateToAdmin = () => {
    navigateTo('/admin');
  };

  return (
    <NavigationContext.Provider
      value={{
        currentRoute,
        navigateTo,
        navigateToService,
        navigateToHome,
        navigateToAdmin,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
