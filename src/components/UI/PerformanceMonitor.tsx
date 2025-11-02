import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  renderTime: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: (performance as any).memory ? 
            Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0,
          loadTime: Math.round(performance.timing?.loadEventEnd - performance.timing?.navigationStart) || 0,
          renderTime: Math.round(currentTime - performance.timing?.domContentLoadedEventStart) || 0
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg text-xs font-mono z-[10000] border border-gray-700">
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={metrics.fps < 30 ? 'text-red-400' : metrics.fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.fps}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Memory:</span>
          <span className={metrics.memoryUsage > 100 ? 'text-red-400' : 'text-green-400'}>
            {metrics.memoryUsage}MB
          </span>
        </div>
        <div className="flex justify-between">
          <span>Load:</span>
          <span className={metrics.loadTime > 3000 ? 'text-red-400' : 'text-green-400'}>
            {metrics.loadTime}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span>Render:</span>
          <span>{metrics.renderTime}ms</span>
        </div>
      </div>
      <div className="text-gray-400 text-[10px] mt-2">
        Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;