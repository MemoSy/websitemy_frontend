import { useEffect, useState } from 'react';

interface PerformanceData {
  loadTime: number;
  renderTime: number;
  resourceCount: number;
  memoryUsage: number;
}

export const usePerformance = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    loadTime: 0,
    renderTime: 0,
    resourceCount: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const resources = performance.getEntriesByType('resource');
      
      setPerformanceData({
        loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        renderTime: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        resourceCount: resources.length,
        memoryUsage: (performance as any).memory ? 
          Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0
      });
    };

    // قياس الأداء بعد تحميل الصفحة
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  return performanceData;
};