import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import './AIAssistantButton.css';

const AIAssistantButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!buttonRef.current) return;

    // تأثير النبضة المستمر مع حركة عمودية خفيفة
    gsap.to(buttonRef.current, {
      scale: 1.08,
      y: -3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // تأثير البريق المتحرك مع تغيير الشفافية
    if (sparkleRef.current) {
      gsap.to(sparkleRef.current, {
        rotation: 360,
        duration: 3.5,
        repeat: -1,
        ease: "none"
      });

      // تأثير الظهور والاختفاء للبريق بشكل أكثر وضوحاً
      gsap.to(sparkleRef.current, {
        opacity: 0.2,
        scale: 0.8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // تأثيرات الدوائر المتموجة في الخلفية - محسنة
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
          scale: 2.2,
          opacity: 0,
          duration: 2.5,
          ease: "power2.out",
          onComplete: () => ripple.remove()
        }
      );
    };

    // إنشاء تأثير التموج كل 2.5 ثانية لجذب الانتباه أكثر
    const rippleInterval = setInterval(createRipple, 2500);

    // تأثير حركة إضافية كل فترة لجذب الانتباه
    const attentionAnimation = () => {
      if (!buttonRef.current) return;
      
      gsap.to(buttonRef.current, {
        rotation: 8,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(buttonRef.current, {
            rotation: 0,
            duration: 0.2
          });
        }
      });
    };

    // تشغيل حركة لفت الانتباه كل 8 ثوان
    const attentionInterval = setInterval(attentionAnimation, 8000);

    return () => {
      clearInterval(rippleInterval);
      clearInterval(attentionInterval);
      gsap.killTweensOf(buttonRef.current);
      if (sparkleRef.current) {
        gsap.killTweensOf(sparkleRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    // تأثير النقر
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // التوجه إلى صفحة الدردشة
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
      {/* تلميح النص */}
      <div className="ai-assistant-tooltip">
        🤖 اسأل المساعد الذكي عن الأسعار
      </div>
      
      {/* الزر الرئيسي */}
      <button
        ref={buttonRef}
        className="ai-assistant-button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="فتح المساعد الذكي"
        title="تحدث مع المساعد الذكي"
      >
        <div className="ai-assistant-content">
          <MessageCircle size={24} strokeWidth={2} />
          <div style={{ fontSize: '8px', marginTop: '2px', fontWeight: '600' }}>
            AI
          </div>
        </div>
        
        {/* أيقونة البريق */}
        <div ref={sparkleRef} className="ai-assistant-sparkle">
          <Sparkles size={12} />
        </div>
      </button>
    </div>
  );
};

export default AIAssistantButton;
