import { useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { expertiseData } from '../../data/expertiseData';
import { defaultBlogs } from '../../data/blogsData';

function updateMetaTag(nameOrProperty: string, value: string, isProperty = false) {
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, nameOrProperty);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

function updateCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function updateJsonLd(id: string, data: object) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

export default function SEOHead() {
  const { currentRoute } = useNavigation();
  const { config } = useSiteConfig();

  useEffect(() => {
    const baseUrl = 'https://marketinglu.com';
    const siteName = config.brandName || 'MarketingGlu';

    let pageTitle = `${siteName} - Software Solutions & Digital Engineering Company`;
    let metaDescription = 'MarketingGlu is a premier software solutions and digital engineering company specializing in custom software development, enterprise web architecture, SEO, performance marketing, and scalable IT solutions.';
    let keywords = 'MarketingGlu, software solutions company, software development company, custom software development, enterprise software solutions, IT software company, software engineering, SaaS development, full-stack development, digital marketing agency, web design company, SEO solutions, New Delhi software company, India software solutions';
    let canonicalUrl = `${baseUrl}/`;
    let ogImage = `${baseUrl}/images/marketingglu_icon.png`;
    let ogType = 'website';
    const breadcrumbs: Array<{ name: string; item: string }> = [
      { name: 'Home', item: `${baseUrl}/` }
    ];
    let pageJsonLd: object | null = null;

    if (currentRoute.type === 'service-detail' && currentRoute.serviceId) {
      const service = config.services?.find(s => s.id === currentRoute.serviceId) || expertiseData.find(e => e.id === currentRoute.serviceId);
      if (service) {
        pageTitle = `${service.title} Services & Software Architecture | ${siteName}`;
        metaDescription = service.summary || `${service.title} services delivered by ${siteName}. Enterprise-grade performance, Core Web Vitals optimization, and predictable digital growth.`;
        keywords = `${service.title}, ${service.tabLabel}, ${siteName} services, custom software, digital marketing New Delhi`;
        canonicalUrl = `${baseUrl}/services/${service.id}`;
        ogType = 'service';
        breadcrumbs.push(
          { name: 'Services', item: `${baseUrl}/services` },
          { name: service.title, item: canonicalUrl }
        );

        pageJsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${canonicalUrl}#service`,
          'name': service.title,
          'serviceType': service.category || service.title,
          'description': service.summary,
          'provider': {
            '@type': 'Organization',
            'name': siteName,
            'url': baseUrl,
            'logo': `${baseUrl}/images/marketingglu_icon.png`,
            'telephone': config.phone,
            'email': config.email,
          },
          'areaServed': ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Global'],
          'offers': {
            '@type': 'Offer',
            'priceRange': '$$',
            'availability': 'https://schema.org/InStock',
          },
        };
      }
    } else if (currentRoute.type === 'services-index') {
      pageTitle = `Core Digital Marketing Services & Software Architecture | ${siteName}`;
      metaDescription = `Explore ${siteName}'s 6 core engineering and growth disciplines: Custom Web Design, Technical SEO, Social Media Optimization, High-ROAS PPC, E-Commerce Scaling, and Graphic Design Systems.`;
      keywords = `digital marketing services, custom web design, technical SEO services, PPC management, e-commerce scaling, SMO services, ${siteName}`;
      canonicalUrl = `${baseUrl}/services`;
      breadcrumbs.push({ name: 'Services', item: canonicalUrl });
    } else if (currentRoute.type === 'blog-detail' && currentRoute.blogSlug) {
      const blog = config.blogs?.find(b => b.slug === currentRoute.blogSlug) || defaultBlogs.find(b => b.slug === currentRoute.blogSlug);
      if (blog) {
        pageTitle = `${blog.title} | ${siteName}`;
        metaDescription = blog.excerpt || blog.title;
        keywords = `${blog.tags?.join(', ') || blog.category}, ${siteName} blog, digital growth guide`;
        canonicalUrl = `${baseUrl}/blogs/${blog.slug}`;
        ogType = 'article';
        const coverImg = blog.coverImage || '/images/marketingglu_icon.png';
        ogImage = coverImg.startsWith('http') ? coverImg : `${baseUrl}${coverImg}`;
        breadcrumbs.push(
          { name: 'Articles & Resources', item: `${baseUrl}/blogs` },
          { name: blog.title, item: canonicalUrl }
        );

        pageJsonLd = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${canonicalUrl}#article`,
          'headline': blog.title,
          'description': blog.excerpt,
          'datePublished': blog.publishedAt,
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          'author': {
            '@type': 'Person',
            'name': blog.author.name,
            'jobTitle': blog.author.role,
          },
          'publisher': {
            '@type': 'Organization',
            'name': siteName,
            'url': baseUrl,
            'logo': `${baseUrl}/images/marketingglu_icon.png`,
          },
          'image': ogImage,
        };
      }
    } else if (currentRoute.type === 'blogs') {
      pageTitle = `Digital Growth Insights, Technical SEO & Engineering Guides | ${siteName}`;
      metaDescription = `Actionable technical SEO blueprints, e-commerce ROAS scaling frameworks, custom web architecture breakdowns, and performance marketing resources from ${siteName}.`;
      keywords = `SEO guides, Core Web Vitals blueprint, e-commerce ROAS framework, custom web development insights, ${siteName} articles`;
      canonicalUrl = `${baseUrl}/blogs`;
      breadcrumbs.push({ name: 'Articles & Resources', item: canonicalUrl });
    } else if (currentRoute.type === 'privacy') {
      pageTitle = `Privacy Policy & Data Sovereignty | ${siteName}`;
      metaDescription = `Read ${siteName}'s official Privacy Policy detailing client data sovereignty, non-disclosure compliance, and secure data handling standards.`;
      canonicalUrl = `${baseUrl}/privacy`;
      breadcrumbs.push({ name: 'Privacy Policy', item: canonicalUrl });
    } else if (currentRoute.type === 'terms') {
      pageTitle = `Terms & Conditions | ${siteName}`;
      metaDescription = `Standard service agreement provisions, commercial milestone schedules, and 100% legal IP ownership terms at ${siteName}.`;
      canonicalUrl = `${baseUrl}/terms`;
      breadcrumbs.push({ name: 'Terms & Conditions', item: canonicalUrl });
    } else if (currentRoute.type === 'admin') {
      pageTitle = `Admin Management Studio | ${siteName}`;
      metaDescription = `Secure administrative session portal for ${siteName} content management and website controls.`;
      canonicalUrl = `${baseUrl}/admin`;
    }

    // Update document title
    document.title = pageTitle;

    // Update Primary Meta Tags
    updateMetaTag('title', pageTitle);
    updateMetaTag('description', metaDescription);
    updateMetaTag('keywords', keywords);
    updateCanonical(canonicalUrl);

    // Update OpenGraph
    updateMetaTag('og:title', pageTitle, true);
    updateMetaTag('og:description', metaDescription, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);

    // Update Twitter Cards
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:image', ogImage);

    // Inject BreadcrumbList JSON-LD
    if (breadcrumbs.length > 1) {
      const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.item,
        })),
      };
      updateJsonLd('seo-breadcrumb-jsonld', breadcrumbJsonLd);
    } else {
      const existingBreadcrumb = document.getElementById('seo-breadcrumb-jsonld');
      if (existingBreadcrumb) existingBreadcrumb.remove();
    }

    // Inject Page Specific JSON-LD (Service / BlogPosting)
    if (pageJsonLd) {
      updateJsonLd('seo-page-jsonld', pageJsonLd);
    } else {
      const existingPageJsonLd = document.getElementById('seo-page-jsonld');
      if (existingPageJsonLd) existingPageJsonLd.remove();
    }

  }, [currentRoute, config]);

  return null;
}
