// Script to generate sitemap.xml from projects data
import fs from 'fs';
import path from 'path';

// مؤقتاً سنقوم بإنشاء البيانات يدوياً
const projects = [
  { id: 'websitemy-portfolio' },
  { id: 'alimni-platform' },
  { id: 'comprevende' },
  { id: 'ecommerce-luxury' },
  { id: 'pro-camz' },
  { id: 'sharekna' },
  { id: 'business' },
  { id: 'social-network' },
  { id: 'aleppo-complaints' },
  { id: 'national-network-media' },
  { id: 'saas-platform' },
  { id: 'syria-2030' }
];

const serviceCategories = [
  { id: 'ecommerce', projects: [{}] },
  { id: 'social', projects: [{}] },
  { id: 'saas', projects: [{}] },
  { id: 'news', projects: [{}] },
  { id: 'service', projects: [{}] },
  { id: 'opensource', projects: [{}] }
];

const baseUrl = 'https://www.websitemy.com';
const currentDate = new Date().toISOString().split('T')[0];

// Main pages
const mainPages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/about', priority: 0.8, changefreq: 'monthly' },
  { url: '/projects', priority: 0.9, changefreq: 'weekly' },
  { url: '/ai-chat', priority: 0.7, changefreq: 'weekly' },
  { url: '/contact', priority: 0.6, changefreq: 'monthly' }
];

// Generate XML sitemap
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->`;

// Add main pages
mainPages.forEach(page => {
  sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
});

// Add individual project pages
sitemap += `

  <!-- Individual Project Pages -->`;

projects.forEach(project => {
  sitemap += `
  <url>
    <loc>${baseUrl}/project/${project.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Add project categories
sitemap += `

  <!-- Project Categories -->`;

serviceCategories.forEach(category => {
  if (category.projects && category.projects.length > 0) {
    sitemap += `
  <url>
    <loc>${baseUrl}/projects?category=${category.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }
});

sitemap += `
</urlset>`;

// Write sitemap to public folder
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`📍 Generated ${projects.length} project pages`);
console.log(`📍 Generated ${serviceCategories.length} category pages`);
console.log(`📍 Total URLs: ${mainPages.length + projects.length + serviceCategories.length}`);
