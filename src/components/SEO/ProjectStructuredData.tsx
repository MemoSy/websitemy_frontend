import React from 'react';
import { Project } from '../../types';

interface ProjectStructuredDataProps {
  project: Project;
  averageRating: number;
  reviewCount: number;
}

const ProjectStructuredData: React.FC<ProjectStructuredDataProps> = ({
  project,
  averageRating,
  reviewCount,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.fullDescription,
    "applicationCategory": "Web Application",
    "operatingSystem": "Web Browser",
    "author": {
      "@type": "Organization",
      "name": "WebSiteMy",
      "url": "https://www.websitemy.com",
      "sameAs": [
        "https://www.facebook.com/websitemy",
        "https://www.linkedin.com/company/websitemy"
      ]
    },
    "creator": {
      "@type": "Organization",
      "name": "WebSiteMy",
      "url": "https://www.websitemy.com"
    },
    "programmingLanguage": project.technologies,
    "category": project.category,
    "image": project.image,
    "url": project.liveUrl,
    "codeRepository": project.githubUrl,
    "dateCreated": "2024-01-01",
    "dateModified": "2024-01-20",
    "version": "1.0",
    "aggregateRating": reviewCount > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "category": "Web Development Service",
      "priceCurrency": "USD",
      "price": project.aiData?.price?.replace(/[^0-9]/g, '') || "0",
      "seller": {
        "@type": "Organization",
        "name": "WebSiteMy"
      }
    },
    "features": project.features,
    "keywords": [
      project.title,
      ...project.technologies,
      project.category,
      "تطوير ويب",
      "برمجة",
      "تطبيقات ويب"
    ].join(", "),
    "about": {
      "@type": "Thing",
      "name": project.category,
      "description": `مشروع ${project.category} متطور`
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.websitemy.com/project/${project.id}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default ProjectStructuredData;
