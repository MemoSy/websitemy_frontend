import { useEffect } from 'react';

// Declare global gtag function
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object[];
}

export const useSEO = (config: PageSEOConfig) => {
  useEffect(() => {
    // Update page title
    document.title = config.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    }
    
    // Update keywords if provided
    if (config.keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', config.keywords);
      }
    }
    
    // Update canonical URL if provided
    if (config.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = config.canonicalUrl;
    }
    
    // Update Open Graph image if provided
    if (config.ogImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', config.ogImage);
      }
    }
    
    // Add structured data if provided
    if (config.structuredData) {
      config.structuredData.forEach((data, index) => {
        const scriptId = `structured-data-${index}`;
        let script = document.getElementById(scriptId) as HTMLScriptElement;
        
        if (!script) {
          script = document.createElement('script') as HTMLScriptElement;
          script.id = scriptId;
          script.type = 'application/ld+json';
          document.head.appendChild(script);
        }
        
        script.textContent = JSON.stringify(data);
      });
    }
    
    // Cleanup function
    return () => {
      // Remove dynamic structured data scripts
      if (config.structuredData) {
        config.structuredData.forEach((_, index) => {
          const script = document.getElementById(`structured-data-${index}`);
          if (script) {
            script.remove();
          }
        });
      }
    };
  }, [config]);
};

// Hook for tracking page views
export const usePageView = (pageName: string) => {
  useEffect(() => {
    // Google Analytics page view
    if (window.gtag) {
      window.gtag('config', 'G-QJHWNDNKEV', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
    
    // Custom analytics event
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, [pageName]);
};

// Preload next page resources
export const preloadPage = (route: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
};

// Critical CSS loading
export const loadCriticalCSS = (cssContent: string) => {
  const style = document.createElement('style');
  style.textContent = cssContent;
  document.head.appendChild(style);
};

// Web font loading optimization
export const optimizeWebFonts = () => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';
  document.head.appendChild(link);
  
  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossOrigin = 'anonymous';
  document.head.appendChild(link2);
};
