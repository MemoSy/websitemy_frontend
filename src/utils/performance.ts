// تحسين الأداء والذاكرة
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// تنظيف الذاكرة
export const cleanupResources = () => {
  // تنظيف الصور غير المستخدمة
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete || img.naturalHeight === 0) {
      img.src = '';
    }
  });

  // تنظيف event listeners غير المستخدمة
  if ('gc' in window && typeof (window as any).gc === 'function') {
    (window as any).gc();
  }
};

// قياس أداء الوظائف
export const measurePerformance = <T extends (...args: any[]) => any>(
  func: T,
  name: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }) as T;
};

// تحسين الرسوم المتحركة
export const requestIdleCallback = (callback: () => void) => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
};

// تحميل الموارد بشكل تدريجي
export const loadResourcesProgressively = async (
  resources: string[],
  onProgress?: (loaded: number, total: number) => void
) => {
  const results = [];
  
  for (let i = 0; i < resources.length; i++) {
    try {
      const resource = await fetch(resources[i]);
      results.push(resource);
      onProgress?.(i + 1, resources.length);
    } catch (error) {
      console.error(`Failed to load resource: ${resources[i]}`, error);
      results.push(null);
    }
  }
  
  return results;
};