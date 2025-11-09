import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const validCards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);
      
      validCards.forEach((card, index) => {
        // الحصول على عنصر الرقم داخل البطاقة
        const numberElement = card.querySelector('.card-number');
        
        if (index < validCards.length - 1) {
          // تثبيت البطاقة
          ScrollTrigger.create({
            trigger: card,
            start: 'top 100px',
            end: 'bottom 0px',
            pin: true,
            pinSpacing: false,
            pinType: 'transform',
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (numberElement) {
                const progress = self.progress;
                
                // المرحلة 1: الظهور (0 -> 0.2) = إضاءة 100%
                // المرحلة 2: في المنتصف (0.2 -> 0.8) = إضاءة 50%
                // المرحلة 3: الاختفاء (0.8 -> 1) = إضاءة 0%
                
                let glowIntensity = 0;
                let numberOpacity = 0;
                
                if (progress < 0.2) {
                  // مرحلة الظهور: من 0% إلى 100%
                  const fadeInProgress = progress / 0.2;
                  glowIntensity = fadeInProgress * 40;
                  numberOpacity = fadeInProgress;
                } else if (progress < 0.8) {
                  // مرحلة الثبات: 50%
                  glowIntensity = 20;
                  numberOpacity = 0.5;
                } else {
                  // مرحلة الاختفاء: من 50% إلى 0%
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

          // تأثير التلاشي (fade out) عندما تصعد البطاقة للأعلى
          gsap.to(card, {
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
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
      <div className="container mx-auto px-6 pt-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-[#6C5CE7]/10 border border-[#6C5CE7]/30 rounded-full mb-6">
            <span className="text-[#6C5CE7] font-semibold text-sm">خطوات العمل</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            كيف نحول شركتك إلى{' '}
            <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00D9FF] to-[#00FFA3] bg-clip-text text-transparent">
              واقع ناجح
            </span>
            ؟
          </h2>
          <p className="text-[#A0AEC0] text-xl leading-relaxed">
            عملية واضحة ومنظمة من البداية إلى النهاية مع التزام تام بالمواعيد
          </p>
        </div>
      </div>

      {/* البطاقات المكدسة */}
      <div className="relative">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="h-screen flex items-center justify-center px-6"
          >
            <div className="max-w-5xl w-full">
              <div 
                className="bg-gradient-to-br from-[#1A1F3A]/95 to-[#0F1729]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl"
                style={{
                  transform: `scale(${1 - (index * 0.05)})`,
                  transformOrigin: 'center top',
                }}
              >
                {/* رقم الخطوة */}
                <div className="flex items-start justify-between mb-8">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${card.iconColor}20, ${card.iconColor}05)`,
                      border: `2px solid ${card.iconColor}40`
                    }}
                  >
                    <div style={{ color: card.iconColor }}>
                      {card.icon}
                    </div>
                  </div>
                  <div 
                    className="card-number text-8xl font-black transition-all duration-300"
                    style={{ 
                      color: card.iconColor,
                      textShadow: '0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* المحتوى */}
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold text-white leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#A0AEC0] text-2xl leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* خط الفاصل */}
                <div 
                  className={`h-1 w-full bg-gradient-to-r ${card.gradient} opacity-30 rounded-full mt-10`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA في الأسفل */}
      <div className="container mx-auto px-6  pb-32 relative z-10">
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <a
              href="#contact"
              className="px-12 py-6 bg-gradient-to-r from-[#6C5CE7] to-[#00D9FF] text-white font-bold text-xl rounded-2xl hover:shadow-[0_0_40px_rgba(108,92,231,0.6)] transition-all duration-300 hover:-translate-y-1"
            >
              ابدأ مشروعك الآن
            </a>
            <a
              href="#projects"
              className="px-12 py-6 bg-[#1A1F3A] text-white font-bold text-xl rounded-2xl border-2 border-white/10 hover:border-[#6C5CE7] transition-all duration-300 hover:-translate-y-1"
            >
              شاهد أعمالنا السابقة
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackCards;
