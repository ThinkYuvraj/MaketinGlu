import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { expertiseData } from '../data/expertiseData';
import { scrollToTop, scrollToElement } from '../lib/useSmoothScroll';

export type RouteType = 'home' | 'services-index' | 'service-detail' | 'packages-index' | 'package-detail' | 'blogs' | 'blog-detail' | 'admin' | 'privacy' | 'terms';

export interface RouteState {
  type: RouteType;
  serviceId?: string;
  packageId?: string;
  blogSlug?: string;
  anchor?: string;
  path: string;
}

interface NavigationContextType {
  currentRoute: RouteState;
  navigateTo: (path: string) => void;
  navigateToService: (serviceId: string) => void;
  navigateToPackages: () => void;
  navigateToPackageDetail: (packageId: string) => void;
  navigateToBlogs: () => void;
  navigateToBlogDetail: (slug: string) => void;
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
    if (rawHash === 'about' || rawHash === 'about-us' || rawHash === 'company') {
      return { type: 'home', anchor: 'about', path: '#about' };
    }
    if (['web-design', 'ecommerce', 'seo', 'graphic-design', 'ppc', 'smo'].includes(rawHash)) {
      return { type: 'service-detail', serviceId: rawHash, path: `#/services/${rawHash}` };
    }
    if (rawHash === 'services' || rawHash === 'expertise') {
      return { type: 'services-index', path: '#/services' };
    }
    if (rawHash === 'packages' || rawHash === 'pricing' || rawHash === 'plans') {
      return { type: 'packages-index', path: '#/packages' };
    }
    if (['basic', 'advance', 'pro'].includes(rawHash)) {
      return { type: 'package-detail', packageId: rawHash, path: `#/packages/${rawHash}` };
    }
    if (rawHash === 'privacy' || rawHash === 'privacy-policy') {
      return { type: 'privacy', path: '#/privacy' };
    }
    if (rawHash === 'terms' || rawHash === 'terms-conditions' || rawHash === 'terms-and-conditions' || rawHash === 'terms-of-service') {
      return { type: 'terms', path: '#/terms' };
    }
    if (rawHash === 'blogs' || rawHash === 'blog' || rawHash === 'resources' || rawHash === 'articles') {
      return { type: 'blogs', path: '#/blogs' };
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

  if (routePath === '/about' || routePath === '/about/' || routePath === '/about-us' || routePath === '/about-us/') {
    return { type: 'home', anchor: 'about', path: '#about' };
  }

  if (routePath === '/privacy' || routePath === '/privacy/' || routePath === '/privacy-policy') {
    return { type: 'privacy', path: '#/privacy' };
  }

  if (routePath === '/terms' || routePath === '/terms/' || routePath === '/terms-conditions' || routePath === '/terms-and-conditions') {
    return { type: 'terms', path: '#/terms' };
  }

  if (routePath === '/services' || routePath === '/services/') {
    return { type: 'services-index', path: '#/services' };
  }

  if (routePath === '/packages' || routePath === '/packages/' || routePath === '/pricing' || routePath === '/pricing/') {
    return { type: 'packages-index', path: '#/packages' };
  }

  const pkgMatch = routePath.match(/^\/(?:packages|pricing|plans)\/([a-zA-Z0-9_-]+)/);
  if (pkgMatch) {
    return { type: 'package-detail', packageId: pkgMatch[1].toLowerCase(), path: `#/packages/${pkgMatch[1]}` };
  }

  if (routePath === '/blogs' || routePath === '/blogs/' || routePath === '/resources' || routePath === '/resources/') {
    return { type: 'blogs', path: '#/blogs' };
  }

  const blogMatch = routePath.match(/^\/(?:blogs|resources|blog)\/([a-zA-Z0-9_-]+)/);
  if (blogMatch) {
    return { type: 'blog-detail', blogSlug: blogMatch[1], path: `#/blogs/${blogMatch[1]}` };
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
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const handleLocationChange = () => {
      let parsed = parsePathAndHash();

      // If initial page load / refresh and route is home, strictly load at top of Home (Hero)
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        if (parsed.type === 'home') {
          if (window.location.hash !== '#/') {
            window.history.replaceState(null, '', '#/');
          }
          parsed = { type: 'home', path: '#/' };
        }
      } else if (!window.location.hash || window.location.hash === '#') {
        window.history.replaceState(null, '', '#/');
      }

      setCurrentRoute(parsed);

      // Handle document title updates
      if (parsed.type === 'service-detail' && parsed.serviceId) {
        const item = expertiseData.find(e => e.id === parsed.serviceId);
        if (item) {
          document.title = `${item.title} | MarketinGlu`;
        }
      } else if (parsed.type === 'services-index') {
        document.title = "Core Digital Marketing Services & Solutions | MarketinGlu";
      } else if (parsed.type === 'packages-index') {
        document.title = "Service Packages & Turnkey Facilities Scope | MarketinGlu";
      } else if (parsed.type === 'package-detail' && parsed.packageId) {
        document.title = `${parsed.packageId.toUpperCase()} Package Scope & Facilities | MarketinGlu`;
      } else if (parsed.type === 'blogs') {
        document.title = "Marketing Insights, Guides & Growth Resources | MarketinGlu";
      } else if (parsed.type === 'blog-detail') {
        document.title = "Marketing Insights & Strategic Guides | MarketinGlu";
      } else if (parsed.type === 'admin') {
        document.title = "Admin Studio | MarketinGlu";
      } else if (parsed.type === 'privacy') {
        document.title = "Privacy Policy | MarketinGlu";
      } else if (parsed.type === 'terms') {
        document.title = "Terms & Conditions | MarketinGlu";
      } else {
        document.title = "MarketinGlu - Digital Marketing Solutions";
      }

      // Smooth scroll to top when changing full pages or landing on home
      if (parsed.type !== 'home') {
        scrollToTop(true);
      } else if (parsed.anchor) {
        setTimeout(() => {
          scrollToElement(parsed.anchor!);
        }, 100);
      } else {
        scrollToTop(true);
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

  const navigateToPackages = () => {
    navigateTo('/packages');
  };

  const navigateToPackageDetail = (packageId: string) => {
    navigateTo(`/packages/${packageId}`);
  };

  const navigateToBlogs = () => {
    navigateTo('/blogs');
  };

  const navigateToBlogDetail = (slug: string) => {
    navigateTo(`/blogs/${slug}`);
  };

  const navigateToHome = (anchor?: string) => {
    if (anchor) {
      const cleanAnchor = anchor.replace(/^#\/?/, '');
      if (currentRoute.type === 'home') {
        scrollToElement(cleanAnchor);
        window.location.hash = `#${cleanAnchor}`;
      } else {
        window.location.hash = `#/${cleanAnchor}`;
      }
    } else {
      const isAlreadyHome = currentRoute.type === 'home';
      window.location.hash = '#/';
      if (isAlreadyHome) {
        scrollToTop(false);
      }
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
        navigateToPackages,
        navigateToPackageDetail,
        navigateToBlogs,
        navigateToBlogDetail,
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
