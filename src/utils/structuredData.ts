export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WebSiteMy",
  "alternateName": "موقعي",
  "description": "شركة تطوير ويب متخصصة في إنشاء مواقع إلكترونية وتطبيقات ويب متقدمة. نحول أفكارك إلى واقع رقمي بأحدث التقنيات.",
  "url": "https://www.websitemy.com",
  "logo": "https://www.websitemy.com/logo1.png",
  "foundingDate": "2020",
  "areaServed": ["Saudi Arabia", "UAE", "Turkey", "Syria"],
  "knowsLanguage": ["Arabic", "English", "Turkish"],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "email": "ahmeddalhalabi1@gmail.com",
      "telephone": "+905313345111",
      "contactType": "customer service",
      "areaServed": ["SA", "AE", "TR", "SY"],
      "availableLanguage": ["Arabic", "English", "Turkish"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TR",
    "addressLocality": "Bursa",
    "addressRegion": "Bursa"
  },
  "sameAs": [
    "https://github.com/MemoSy",
    "https://www.linkedin.com/in/mahmudalmubayed/",
    "https://x.com/Memosy2009",
    "https://www.facebook.com/websitemyy",
    "https://www.youtube.com/@codelam"
  ],
  "offers": [
    {
      "@type": "Service",
      "name": "تطوير المواقع الإلكترونية",
      "description": "تطوير مواقع ويب احترافية ومتجاوبة",
      "provider": {
        "@type": "Organization",
        "name": "WebSiteMy"
      }
    },
    {
      "@type": "Service", 
      "name": "تطوير تطبيقات الويب",
      "description": "تطوير تطبيقات ويب متقدمة باستخدام React و TypeScript",
      "provider": {
        "@type": "Organization",
        "name": "WebSiteMy"
      }
    },
    {
      "@type": "Service",
      "name": "التجارة الإلكترونية",
      "description": "تطوير متاجر إلكترونية متكاملة",
      "provider": {
        "@type": "Organization",
        "name": "WebSiteMy"
      }
    }
  ]
});

export const getPersonSchema = (person: {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  skills: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.jobTitle,
  "description": person.description,
  "image": person.image,
  "knowsAbout": person.skills,
  "worksFor": {
    "@type": "Organization",
    "name": "WebSiteMy"
  }
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WebSiteMy",
  "url": "https://www.websitemy.com",
  "description": "شركة تطوير ويب متخصصة في إنشاء مواقع إلكترونية وتطبيقات ويب متقدمة",
  "inLanguage": "ar",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.websitemy.com/projects?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WebSiteMy",
    "logo": "https://www.websitemy.com/logo1.png"
  }
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
