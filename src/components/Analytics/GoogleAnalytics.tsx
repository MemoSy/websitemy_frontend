import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  useEffect(() => {
    // تحميل Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // إعداد gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // تتبع تغيير الصفحات (لـ SPA)
    const originalPushState = history.pushState;
    history.pushState = function(state, title, url) {
      originalPushState.apply(history, [state, title, url]);
      gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    return () => {
      // تنظيف
      const scripts = document.querySelectorAll(`script[src*="googletagmanager"]`);
      scripts.forEach(script => script.remove());
    };
  }, [measurementId]);

  return null;
};

// تصدير functions مساعدة لتتبع الأحداث
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageTitle,
      page_location: `${window.location.origin}${pagePath}`,
    });
  }
};

// تتبع أحداث المشاريع
export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent('project_view', {
    project_id: projectId,
    project_title: projectTitle,
    event_category: 'Project',
    event_label: projectTitle,
  });
};

export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    event_category: 'Contact',
    event_label: formType,
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    event_category: 'Download',
    event_label: fileName,
  });
};

// إضافة types للـ window object
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default GoogleAnalytics;
