import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'websitemy ➡ لتطوير الويب',
  description = 'شركة تطوير ويب متخصصة في إنشاء مواقع إلكترونية وتطبيقات ويب متقدمة. نحول أفكارك إلى واقع رقمي بأحدث التقنيات.',
  keywords = 'تطوير مواقع, تطبيقات ويب, برمجة, تصميم مواقع, تطوير واجهات, React, TypeScript, NestJS, WebSiteMy',
  image = 'https://www.websitemy.com/logo1.png',
  url = 'https://www.websitemy.com',
  type = 'website',
  author = 'WebSiteMy',
  publishedTime,
  modifiedTime,
  noIndex = false,
  canonicalUrl
}) => {
  const fullTitle = title.includes('websitemy') ? title : `${title} | websitemy`;
  const fullUrl = url.startsWith('http') ? url : `https://www.websitemy.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://www.websitemy.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="WebSiteMy" />
      <meta property="og:locale" content="ar_SA" />
      
      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@websitemy" />
      <meta name="twitter:creator" content="@websitemy" />
      
      {/* Additional SEO */}
      <meta name="language" content="Arabic" />
      <meta name="geo.region" content="SA" />
      <meta name="geo.country" content="Saudi Arabia" />
      <meta name="theme-color" content="#00d4ff" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WebSiteMy",
          "description": description,
          "url": "https://www.websitemy.com",
          "logo": "https://www.websitemy.com/logo1.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "ahmeddalhalabi1@gmail.com",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://github.com/MemoSy",
            "https://www.linkedin.com/in/mahmudalmubayed/",
            "https://x.com/Memosy2009",
            "https://www.facebook.com/websitemyy"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
