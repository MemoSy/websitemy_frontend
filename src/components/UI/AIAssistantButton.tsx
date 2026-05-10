import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './AIAssistantButton.css';
import MayaAvatar from './MayaAvatar';

const AIAssistantButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!buttonRef.current) return;

    // حركة خفيفة مستمرة بدون إزعاج.
    gsap.to(buttonRef.current, {
      scale: 1.04,
      y: -2,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // تموجات دقيقة لجذب الانتباه.
    const createRipple = () => {
      if (!buttonRef.current) return;
      
      const ripple = document.createElement('div');
      ripple.className = 'ai-assistant-ripple';
      buttonRef.current.appendChild(ripple);

      gsap.fromTo(ripple, 
        {
          scale: 0,
          opacity: 0.8
        },
        {
          scale: 2,
          opacity: 0,
          duration: 2.2,
          ease: "power2.out",
          onComplete: () => ripple.remove()
        }
      );
    };

    const rippleInterval = setInterval(createRipple, 3200);

    const attentionAnimation = () => {
      if (!buttonRef.current) return;
      
      gsap.to(buttonRef.current, {
        rotation: 4,
        duration: 0.24,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(buttonRef.current, {
            rotation: 0,
            duration: 0.16
          });
        }
      });
    };

    const attentionInterval = setInterval(attentionAnimation, 9000);

    return () => {
      clearInterval(rippleInterval);
      clearInterval(attentionInterval);
      gsap.killTweensOf(buttonRef.current);
    };
  }, []);

  const handleClick = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          navigate('/ai-chat');
        }
      });
    }
  };

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-assistant-tooltip">
        Maya is here - سكرتيرتك الذكية
      </div>
      
      <button
        ref={buttonRef}
        className="ai-assistant-button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="فتح دردشة مايا سكرتيرة WebSiteMy"
        title="تحدث مع Maya"
      >
        <div className="ai-assistant-content">
          <MayaAvatar size="md" interactive />
        </div>

        <span className="ai-assistant-badge">M</span>
      </button>
    </div>
  );
};

export default AIAssistantButton;
