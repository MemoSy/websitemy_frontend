import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MicroInteractionsProps {
  children: React.ReactNode;
  type?: 'button' | 'card' | 'icon' | 'text';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

const MicroInteractions: React.FC<MicroInteractionsProps> = ({
  children,
  type = 'button',
  intensity = 'medium',
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const intensityConfig = {
      subtle: { scale: 1.02, duration: 0.2, y: -2 },
      medium: { scale: 1.05, duration: 0.3, y: -5 },
      strong: { scale: 1.1, duration: 0.4, y: -10 }
    };

    const config = intensityConfig[intensity];

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: config.scale,
        y: config.y,
        duration: config.duration,
        ease: "power2.out"
      });

      // تأثير الوهج
      if (type === 'button' || type === 'card') {
        gsap.to(element, {
          boxShadow: '0 10px 40px rgba(0, 212, 255, 0.3)',
          duration: config.duration,
          ease: "power2.out"
        });
      }

      // تأثير الدوران للأيقونات
      if (type === 'icon') {
        gsap.to(element.querySelector('svg, .icon'), {
          rotation: 10,
          duration: config.duration,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: config.duration,
        ease: "power2.out"
      });

      if (type === 'button' || type === 'card') {
        gsap.to(element, {
          boxShadow: '0 0 0 rgba(0, 212, 255, 0)',
          duration: config.duration,
          ease: "power2.out"
        });
      }

      if (type === 'icon') {
        gsap.to(element.querySelector('svg, .icon'), {
          rotation: 0,
          duration: config.duration,
          ease: "power2.out"
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(element, {
        scale: config.scale * 0.95,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(element, {
        scale: config.scale,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // تأثير النبض للنصوص
    if (type === 'text') {
      const handleTextHover = () => {
        gsap.to(element, {
          color: '#00d4ff',
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleTextLeave = () => {
        gsap.to(element, {
          color: '',
          duration: 0.3,
          ease: "power2.out"
        });
      };

      element.addEventListener('mouseenter', handleTextHover);
      element.addEventListener('mouseleave', handleTextLeave);

      return () => {
        element.removeEventListener('mouseenter', handleTextHover);
        element.removeEventListener('mouseleave', handleTextLeave);
      };
    }

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
    };
  }, [type, intensity]);

  return (
    <div ref={elementRef} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

export default MicroInteractions;