import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageSquare, 
  Users, 
  Palette, 
  Code, 
  Rocket, 
  Award, 
  HeadphonesIcon 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

const StackCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const cards: Card[] = [
    {
      id: 1,
      icon: <MessageSquare className="w-10 h-10" />,
      title: 'استشارة مجانية وفهم احتياجاتك',
      description: 'نبدأ بفهم رؤيتك واحتياجاتك الحقيقية من خلال استشارة مجانية شاملة',
      gradient: 'from-[#6C5CE7] to-[#00D9FF]',
      iconColor: '#6C5CE7'
    },
    {
      id: 2,
      icon: <Users className="w-10 h-10" />,
      title: 'عرض سعر شفاف ومفصل',
      description: 'نقدم عرض سعر واضح ومفصل بدون تكاليف خفية أو مفاجآت',
      gradient: 'from-[#00D9FF] to-[#00FFA3]',
      iconColor: '#00D9FF'
    },
    {
      id: 3,
      icon: <Palette className="w-10 h-10" />,
      title: 'تصميم واجهات احترافية UI/UX',
      description: 'تصميم واجهات عصرية تعكس هوية علامتك وتحسن تجربة عملائك',
      gradient: 'from-[#00FFA3] to-[#6C5CE7]',
      iconColor: '#00FFA3'
    },
    {
      id: 4,
      icon: <Code className="w-10 h-10" />,
      title: 'البرمجة والتطوير التقني',
      description: 'نقوم ببناء موقعك باستخدام أحدث التقنيات مع أعلى معايير الأمان والأداء',
      gradient: 'from-[#6C5CE7] to-[#00D9FF]',
      iconColor: '#6C5CE7'
    },
    {
      id: 5,
      icon: <Rocket className="w-10 h-10" />,
      title: 'الاختبار والتطوير المستمر',
      description: 'اختبار شامل لضمان عمل الموقع بشكل مثالي على جميع الأجهزة',
      gradient: 'from-[#00D9FF] to-[#00FFA3]',
      iconColor: '#00D9FF'
    },
    {
      id: 6,
      icon: <Award className="w-10 h-10" />,
      title: 'الإطلاق والنشر الرسمي',
      description: 'نطلق موقعك بشكل احترافي مع ضمان استقرار ونشره على منصات موثوقة',
      gradient: 'from-[#00FFA3] to-[#6C5CE7]',
      iconColor: '#00FFA3'
    },
    {
      id: 7,
      icon: <HeadphonesIcon className="w-10 h-10" />,
      title: 'الدعم والصيانة المستمرة',
      description: 'نقدم لك دعم فني مدى الحياة وتحديثات دورية مجانية لمدة ',
      gradient: 'from-[#6C5CE7] to-[#00D9FF]',
      iconColor: '#6C5CE7'
    }
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);
      
      validCards.forEach((card, index) => {
        // الحصول على عنصر الرقم داخل البطاقة
        const numberElement = card.querySelector('.card-number');
        
        if (index < validCards.length - 1) {
          // تثبيت البطاقة مع pin
          const pinTrigger = ScrollTrigger.create({
            trigger: card,
            start: 'top 100px',
            end: 'bottom 0px',
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (numberElement) {
                const progress = self.progress;
                
                let glowIntensity = 0;
                let numberOpacity = 0;
                
                if (progress < 0.2) {
                  const fadeInProgress = progress / 0.2;
                  glowIntensity = fadeInProgress * 40;
                  numberOpacity = fadeInProgress;
                } else if (progress < 0.8) {
                  glowIntensity = 20;
                  numberOpacity = 0.5;
                } else {
                  const fadeOutProgress = (progress - 0.8) / 0.2;
                  glowIntensity = 20 * (1 - fadeOutProgress);
                  numberOpacity = 0.5 * (1 - fadeOutProgress);
                }
                
                gsap.to(numberElement, {
                  opacity: numberOpacity,
                  textShadow: `0 0 ${glowIntensity}px currentColor, 0 0 ${glowIntensity * 1.5}px currentColor, 0 0 ${glowIntensity * 2}px currentColor`,
                  duration: 0.1,
                  ease: 'none'
                });
              }
            }
          });
          
          triggers.push(pinTrigger);

          // تأثير التلاشي (fade out) عندما تصعد البطاقة للأعلى
          const fadeAnimation = gsap.to(card, {
            opacity: 0,
            scale: 0.9,
            scrollTrigger: {
              trigger: card,
              start: 'top 100px',
              end: 'bottom 100px',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          
          if (fadeAnimation.scrollTrigger) {
            triggers.push(fadeAnimation.scrollTrigger);
          }
        } else {
          // البطاقة الأخيرة: إضاءة كاملة دائمًا
          if (numberElement) {
            gsap.set(numberElement, {
              opacity: 1,
              textShadow: '0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor'
            });
          }
        }
      });
      
      triggersRef.current = triggers;
    }, section);

    return () => {
      // إيقاف جميع ScrollTriggers فوراً بترتيب عكسي
      [...triggersRef.current].reverse().forEach(trigger => {
        trigger.kill(true);
      });
      triggersRef.current = [];
      
      // إعادة تعيين السياق
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-[#0F1729]">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#00FFA3]/10 rounded-full blur-3xl"></div>
      </div>

      {/* العنوان */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 md:pt-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-[#6C5CE7]/10 border border-[#6C5CE7]/30 rounded-full mb-4">
            <span className="text-[#6C5CE7] font-semibold text-sm">خطوات العمل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight px-4">
            كيف نحول شركتك إلى{' '}
            <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00D9FF] to-[#00FFA3] bg-clip-text text-transparent">
              واقع ناجح
            </span>
            ؟
          </h2>
          <p className="text-[#A0AEC0] text-base sm:text-lg md:text-xl leading-relaxed px-4">
            عملية واضحة ومنظمة من البداية إلى النهاية مع التزام تام بالمواعيد
          </p>
        </div>
      </div>

      {/* البطاقات المكدسة */}
      <div className="relative pb-20 md:pb-24">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="h-screen flex items-center justify-center px-4 sm:px-6"
          >
            <div className="max-w-5xl w-full">
              <div 
                className="bg-gradient-to-br from-[#1A1F3A]/95 to-[#0F1729]/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl"
                style={{
                  transform: `scale(${1 - (index * 0.05)})`,
                  transformOrigin: 'center top',
                }}
              >
                {/* رقم الخطوة */}
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${card.iconColor}20, ${card.iconColor}05)`,
                      border: `2px solid ${card.iconColor}40`
                    }}
                  >
                    <div style={{ color: card.iconColor }} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                      {card.icon}
                    </div>
                  </div>
                  <div 
                    className="card-number text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black transition-all duration-300"
                    style={{ 
                      color: card.iconColor,
                      textShadow: '0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* المحتوى */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#A0AEC0] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* خط الفاصل */}
                <div 
                  className={`h-1 w-full bg-gradient-to-r ${card.gradient} opacity-30 rounded-full mt-6 sm:mt-8 md:mt-10`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackCards;
