import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { throttle } from '../../utils/performanceOptimizer';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // إخفاء المؤشر الافتراضي
    document.body.style.cursor = 'none';

    // Throttle mouse move for better performance
    const moveCursor = throttle((e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });

      // إضافة نقطة جديدة للمسار
      setMouseTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
        // الحفاظ على آخر 10 نقاط فقط (نصف القيمة السابقة)
        return newTrail.slice(-10);
      });
    }, 16); // ~60fps

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target instanceof Element && target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(true);

        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(follower, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
      } else if (target instanceof Element && target.matches('input, textarea')) {
        gsap.to(cursor, {
          scaleX: 0.1,
          scaleY: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target instanceof Element && target.matches('a, button, [role="button"], .cursor-pointer, input, textarea')) {
        setIsHovering(false);

        gsap.to(cursor, {
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(follower, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: isHovering ? 0.5 : 1,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // إضافة مستمعي الأحداث
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isHovering]);

  // تأثير لحذف نقاط المسار القديمة تدريجيًا
  useEffect(() => {
    if (mouseTrail.length > 0) {
      const timer = setTimeout(() => {
        setMouseTrail(prev => prev.slice(1));
      }, 25); // حذف نقطة كل 25ms (أسرع بالنصف)
      return () => clearTimeout(timer);
    }
  }, [mouseTrail]);

  // إخفاء المؤشر على الأجهزة اللمسية
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* خط المسار - يظهر ويختفي مع حركة الماوس */}
      <svg
        ref={trailRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
        style={{ willChange: 'contents' }}
      >
        <defs>
          {/* تدرج لوني - أزرق نيون عادي، أخضر عند الـ hover */}
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ 
              stopColor: isHovering ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)', 
              stopOpacity: 0 
            }} />
            <stop offset="50%" style={{ 
              stopColor: isHovering ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)', 
              stopOpacity: 0.6 
            }} />
            <stop offset="100%" style={{ 
              stopColor: isHovering ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)', 
              stopOpacity: 1 
            }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {mouseTrail.length > 1 && (
          <path
            d={`M ${mouseTrail.map(point => `${point.x} ${point.y}`).join(' L ')}`}
            stroke="url(#trailGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            style={{
              opacity: mouseTrail.length / 10
            }}
          />
        )}
      </svg>

      {/* النقطة الصغيرة - تتبع الماوس مباشرة مع تأثير وهج أزرق/أخضر */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[10000]"
        style={{ 
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div 
          className={`w-full h-full rounded-full transition-all duration-300 ${
            isHovering ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{
            boxShadow: isHovering 
              ? '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)'
              : '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6), 0 0 45px rgba(59, 130, 246, 0.4)'
          }}
        />
      </div>

      {/* الدائرة الكبيرة - تتبع الماوس بتأخير سلس مع تأثير وهج أزرق/أخضر */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999]"
        style={{ 
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div 
          className={`w-full h-full rounded-full border transition-all duration-300 ${
            isHovering 
              ? 'border-green-500/60 bg-green-500/10' 
              : 'border-blue-500/60 bg-blue-500/10'
          }`}
          style={{
            boxShadow: isHovering 
              ? '0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4), inset 0 0 20px rgba(34, 197, 94, 0.2)'
              : '0 0 25px rgba(59, 130, 246, 0.5), 0 0 50px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.2)'
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;