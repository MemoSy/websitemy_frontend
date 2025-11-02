import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbSchema } from '../../utils/structuredData';
import StructuredData from '../SEO/StructuredData';

interface BreadcrumbItem {
  name: string;
  path: string;
}

const routeNames: Record<string, string> = {
  '/': 'الرئيسية',
  '/about': 'من نحن',
  '/projects': 'مشاريعنا',
  '/contact': 'اتصل بنا',
  '/ai-chat': 'المساعد الذكي',
  '/chat-analytics': 'إحصائيات المحادثات',
  '/admin': 'لوحة التحكم'
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'الرئيسية', path: '/' }
  ];

  let currentPath = '';
  pathnames.forEach((name) => {
    currentPath += `/${name}`;
    
    // Handle dynamic routes like /project/:id
    if (name.match(/^[0-9]+$/)) {
      breadcrumbItems.push({
        name: 'تفاصيل المشروع',
        path: currentPath
      });
    } else {
      const routeName = routeNames[currentPath] || name;
      breadcrumbItems.push({
        name: routeName,
        path: currentPath
      });
    }
  });

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  const schemaItems = breadcrumbItems.map(item => ({
    name: item.name,
    url: `https://www.websitemy.com${item.path}`
  }));

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(schemaItems)} />
      <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 space-x-reverse text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-500 mx-2" />
                )}
                
                {index === 0 ? (
                  <Link
                    to={item.path}
                    className="flex items-center space-x-1 space-x-reverse text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ) : index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-300 font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-cyan-300 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumbs;
