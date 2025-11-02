/**
 * Performance Optimization Utilities
 * Phase 3: Improve Interactivity (INP)
 */

/**
 * Debounce function to limit the rate of function execution
 * Useful for scroll, resize, and input events
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to ensure function is called at most once per specified time
 * Better for high-frequency events like scroll
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Execute a function when browser is idle
 * Uses requestIdleCallback with fallback to setTimeout
 */
export const runWhenIdle = (callback: () => void, options?: IdleRequestOptions): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback for browsers that don't support requestIdleCallback
  return setTimeout(callback, 1);
};

/**
 * Cancel an idle callback
 */
export const cancelIdleCallback = (id: number): void => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * Lazy load a script
 */
export const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

/**
 * Preload a resource
 */
export const preloadResource = (href: string, as: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

/**
 * Check if user has slow connection
 */
export const isSlowConnection = (): boolean => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    return (
      conn?.effectiveType === '2g' ||
      conn?.effectiveType === 'slow-2g' ||
      conn?.saveData === true
    );
  }
  return false;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Optimize images by loading them progressively
 */
export const progressiveImageLoader = (
  element: HTMLImageElement,
  lowQualitySrc: string,
  highQualitySrc: string
): void => {
  // Load low quality first
  element.src = lowQualitySrc;
  
  // Then load high quality
  const img = new Image();
  img.onload = () => {
    element.src = highQualitySrc;
    element.classList.add('loaded');
  };
  img.src = highQualitySrc;
};

/**
 * Measure and report performance metrics
 */
export const measurePerformance = (metricName: string, callback: () => void): void => {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`);
  
  // Report to analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: metricName,
      value: Math.round(duration),
      event_category: 'Performance',
    });
  }
};

/**
 * Batch DOM reads and writes for better performance
 */
export class DOMBatcher {
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];
  private scheduled = false;

  read(callback: () => void): void {
    this.readQueue.push(callback);
    this.schedule();
  }

  write(callback: () => void): void {
    this.writeQueue.push(callback);
    this.schedule();
  }

  private schedule(): void {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }

  private flush(): void {
    // Execute all reads first
    while (this.readQueue.length) {
      const read = this.readQueue.shift();
      if (read) read();
    }

    // Then execute all writes
    while (this.writeQueue.length) {
      const write = this.writeQueue.shift();
      if (write) write();
    }

    this.scheduled = false;
  }
}

// Create singleton instance
export const domBatcher = new DOMBatcher();
