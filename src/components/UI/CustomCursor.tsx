import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'click' | 'text'>('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // إخفاء المؤشر الافتراضي
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
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
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target instanceof Element && target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
        setCursorType('hover');
        
        const text = target.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
        }

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
        setCursorType('text');
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
        setCursorText('');
        setCursorType('default');

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
      setCursorType('click');
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      setCursorType(isHovering ? 'hover' : 'default');
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

  return (
    <>
      {/* المؤشر الرئيسي */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className={`w-full h-full rounded-full transition-all duration-300 ${
          cursorType === 'text' 
            ? 'bg-cyan-400' 
            : 'bg-white'
        }`} />
      </div>

      {/* المتابع */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998]"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className={`w-full h-full rounded-full border-2 transition-all duration-300 ${
          isHovering 
            ? 'border-cyan-400 bg-cyan-400/10' 
            : 'border-white/30'
        }`} />
        
        {/* نص المؤشر */}
        {cursorText && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap">
            {cursorText}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomCursor;