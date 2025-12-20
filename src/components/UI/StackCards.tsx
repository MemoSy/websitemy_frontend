import React, { useRef, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageSquare,
  Palette,
  Code,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  bgGradient: string; // خلفية القسم المتدرجة
}

const StackCards: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [isInView, setIsInView] = useState(false); // للتحكم في ظهور شريط التقدم

  const cards: Card[] = [
    {
      id: 1,
      icon: <MessageSquare className="w-10 h-10" />,
      title: t("stackCards.cards.card1.title"),
      description: t("stackCards.cards.card1.description"),
      gradient: "from-[#6C5CE7] to-[#00D9FF]",
      iconColor: "#6C5CE7",
      bgGradient: "radial-gradient(ellipse at 30% 20%, rgba(108, 92, 231, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)",
    },
    {
      id: 2,
      icon: <Palette className="w-10 h-10" />,
      title: t("stackCards.cards.card2.title"),
      description: t("stackCards.cards.card2.description"),
      gradient: "from-[#00D9FF] to-[#00FFA3]",
      iconColor: "#00D9FF",
      bgGradient: "radial-gradient(ellipse at 70% 30%, rgba(0, 217, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(0, 255, 163, 0.1) 0%, transparent 50%)",
    },
    {
      id: 3,
      icon: <Code className="w-10 h-10" />,
      title: t("stackCards.cards.card3.title"),
      description: t("stackCards.cards.card3.description"),
      gradient: "from-[#00FFA3] to-[#6C5CE7]",
      iconColor: "#00FFA3",
      bgGradient: "radial-gradient(ellipse at 40% 40%, rgba(0, 255, 163, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 60% 60%, rgba(108, 92, 231, 0.1) 0%, transparent 50%)",
    },
    {
      id: 4,
      icon: <Rocket className="w-10 h-10" />,
      title: t("stackCards.cards.card4.title"),
      description: t("stackCards.cards.card4.description"),
      gradient: "from-[#6C5CE7] to-[#00D9FF]",
      iconColor: "#6C5CE7",
      bgGradient: "radial-gradient(ellipse at 50% 30%, rgba(108, 92, 231, 0.2) 0%, transparent 40%), radial-gradient(ellipse at 50% 70%, rgba(0, 217, 255, 0.15) 0%, transparent 40%), radial-gradient(ellipse at 30% 50%, rgba(0, 255, 163, 0.1) 0%, transparent 50%)",
    },
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // ScrollTrigger للقسم بالكامل - للتحكم في ظهور شريط التقدم
      const sectionTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
      });
      triggers.push(sectionTrigger);

      const validCards = cardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null
      );

      validCards.forEach((card, index) => {
        // Get the number element inside the card
        const numberElement = card.querySelector(".card-number");

        // تثبيت البطاقة مع pin
        const pinTrigger = ScrollTrigger.create({
          trigger: card,
          start: `top ${100 + index * 10}px`,
          endTrigger: sectionRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // تحديث البطاقة النشطة للخلفية المتدرجة
            if (progress > 0.1 && progress < 0.9) {
              setActiveCard(index);
            }
            
            // تحديث الخلفية المتدرجة
            if (bgRef.current) {
              gsap.to(bgRef.current, {
                background: cards[index].bgGradient,
                duration: 0.5,
                ease: "power2.out",
              });
            }

            if (numberElement) {
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
                textShadow: `0 0 ${glowIntensity}px currentColor, 0 0 ${
                  glowIntensity * 1.5
                }px currentColor, 0 0 ${glowIntensity * 2}px currentColor`,
                duration: 0.1,
                ease: "none",
              });
            }
          },
        });

        triggers.push(pinTrigger);
      });

      triggersRef.current = triggers;
    }, section);

    return () => {
      // Stop all ScrollTriggers immediately in reverse order
      [...triggersRef.current].reverse().forEach((trigger) => {
        trigger.kill(true);
      });
      triggersRef.current = [];

      // Reset context
      ctx.revert();
    };
  }, [i18n.language]); // Re-run when language changes

  return (
    <div ref={sectionRef} className="relative bg-[#0F1729]">
      {/* Dynamic Gradient Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
        style={{ background: cards[0].bgGradient }}
      />
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#00FFA3]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Vertical Progress Indicator - يظهر فقط عندما يكون القسم مرئياً */}
      <div 
        className={`fixed top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2 transition-all duration-500 ${
          isRTL ? 'right-8' : 'left-8'
        } ${isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-8' : '-translate-x-8'}`}`}
      >
        {/* Progress Line Background */}
        <div className="relative h-48 w-1 bg-white/10 rounded-full overflow-hidden">
          {/* Active Progress */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#6C5CE7] via-[#00D9FF] to-[#00FFA3] rounded-full transition-all duration-500 ease-out"
            style={{ height: `${((activeCard + 1) / cards.length) * 100}%` }}
          />
        </div>
        
        {/* Step Dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 flex flex-col justify-between py-0">
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index <= activeCard 
                  ? 'border-transparent scale-125' 
                  : 'border-white/30 bg-transparent'
              }`}
              style={{
                backgroundColor: index <= activeCard ? card.iconColor : 'transparent',
                boxShadow: index === activeCard ? `0 0 15px ${card.iconColor}, 0 0 30px ${card.iconColor}50` : 'none'
              }}
            />
          ))}
        </div>
        
        {/* Current Step Number */}
        <div 
          className="mt-4 text-2xl font-bold transition-all duration-300"
          style={{ color: cards[activeCard]?.iconColor || '#6C5CE7' }}
        >
          {String(activeCard + 1).padStart(2, '0')}
          <span className="text-white/30 text-sm">/{String(cards.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 md:pt-24 relative z-10">
        <div
          className={`text-center max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`}
        >
          <div className="inline-block px-4 py-2 bg-[#6C5CE7]/10 border border-[#6C5CE7]/30 rounded-full mb-4">
            <span className="text-[#6C5CE7] font-semibold text-sm">
              {t("stackCards.badge")}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight px-4 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("stackCards.title.part1")}{" "}
            <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00D9FF] to-[#00FFA3] bg-clip-text text-transparent">
              {t("stackCards.title.highlight")}
            </span>
            {t("stackCards.title.part2")}
          </h2>
          <p
            className={`text-[#A0AEC0] text-base sm:text-lg leading-relaxed`}
          >
            {t("stackCards.subtitle")}
          </p>
        </div>
      </div>

      {/* Stacked Cards */}
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
                  transform: isRTL
                    ? `translateX(-${index * 10}px)`
                    : `translateX(${index * 10}px)`,
                  transformOrigin: "center top",
                }}
              >
                {/* Step number */}
                <div
                  className={`flex items-start justify-between mb-6 sm:mb-8 ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${card.iconColor}20, ${card.iconColor}05)`,
                      border: `2px solid ${card.iconColor}40`,
                    }}
                  >
                    <div
                      style={{ color: card.iconColor }}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div
                    className="card-number text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black transition-all duration-300"
                    style={{
                      color: card.iconColor,
                      textShadow:
                        "0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-[#A0AEC0] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Divider line */}
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
