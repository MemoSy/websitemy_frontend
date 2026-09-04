import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageSquare,
  Palette,
  Code,
  Rocket,
  ChevronLeft,
  ChevronRight,
  MousePointer,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  bgGradient: string;
}

const StackCards: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  activeStepRef.current = activeStep;

  const isWheelingRef = useRef(false);

  const cards: Card[] = [
    {
      id: 1,
      icon: <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      title: t("stackCards.cards.card1.title"),
      description: t("stackCards.cards.card1.description"),
      gradient: "from-[#6C5CE7] to-[#00D9FF]",
      iconColor: "#6C5CE7",
      bgGradient:
        "radial-gradient(ellipse at 30% 20%, rgba(108, 92, 231, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(0, 217, 255, 0.12) 0%, transparent 55%)",
    },
    {
      id: 2,
      icon: <Palette className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      title: t("stackCards.cards.card2.title"),
      description: t("stackCards.cards.card2.description"),
      gradient: "from-[#00D9FF] to-[#00FFA3]",
      iconColor: "#00D9FF",
      bgGradient:
        "radial-gradient(ellipse at 70% 30%, rgba(0, 217, 255, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(0, 255, 163, 0.12) 0%, transparent 55%)",
    },
    {
      id: 3,
      icon: <Code className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      title: t("stackCards.cards.card3.title"),
      description: t("stackCards.cards.card3.description"),
      gradient: "from-[#00FFA3] to-[#6C5CE7]",
      iconColor: "#00FFA3",
      bgGradient:
        "radial-gradient(ellipse at 40% 40%, rgba(0, 255, 163, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 60% 60%, rgba(108, 92, 231, 0.15) 0%, transparent 55%)",
    },
    {
      id: 4,
      icon: <Rocket className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />,
      title: t("stackCards.cards.card4.title"),
      description: t("stackCards.cards.card4.description"),
      gradient: "from-[#6C5CE7] to-[#00D9FF]",
      iconColor: "#6C5CE7",
      bgGradient:
        "radial-gradient(ellipse at 50% 30%, rgba(108, 92, 231, 0.28) 0%, transparent 50%), radial-gradient(ellipse at 50% 70%, rgba(0, 217, 255, 0.18) 0%, transparent 50%)",
    },
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinTargetRef.current) return;

    const section = sectionRef.current;
    const pinTarget = pinTargetRef.current;
    const totalCards = cards.length;
    const maxIndex = totalCards - 1;

    const ctx = gsap.context(() => {
      const getStepX = () => {
        const w = window.innerWidth;
        if (w < 640) return 140;
        if (w < 1024) return 260;
        return 380;
      };

      const updateCardsPosition = (progress: number) => {
        const virtualIndex = progress * maxIndex;
        const currentNearest = Math.round(virtualIndex);
        setActiveStep(currentNearest);

        // Dynamic background update
        if (bgRef.current && cards[currentNearest]) {
          bgRef.current.style.background = cards[currentNearest].bgGradient;
        }

        const stepX = getStepX();
        const dir = isRTL ? -1 : 1;

        cardsRef.current.forEach((cardEl, i) => {
          if (!cardEl) return;

          const diff = i - virtualIndex;
          const absDiff = Math.abs(diff);

          // 3D Cylindrical Transformation
          const x = dir * diff * stepX;
          const z = -Math.min(absDiff, 2.5) * 160;
          const rotateY = dir * -diff * 22;
          const scale = Math.max(0.68, 1 - absDiff * 0.14);
          const opacity = Math.max(0.06, 1 - absDiff * 0.46);
          const blur = Math.min(absDiff * 2.2, 5);
          const zIndex = Math.round(30 - absDiff * 8);

          gsap.set(cardEl, {
            x,
            z,
            rotateY,
            scale,
            opacity,
            filter: `blur(${blur}px)`,
            zIndex,
          });

          // Visual Hierarchy: Active vs Background card details
          const innerCard = cardEl.firstElementChild as HTMLElement | null;
          const descEl = cardEl.querySelector(".card-desc") as HTMLElement | null;

          if (innerCard) {
            if (absDiff < 0.35) {
              innerCard.style.borderColor = `${cards[i].iconColor}70`;
              innerCard.style.boxShadow = `0 30px 70px -15px rgba(0,0,0,0.85), 0 0 50px ${cards[i].iconColor}35`;
            } else {
              innerCard.style.borderColor = "rgba(255,255,255,0.06)";
              innerCard.style.boxShadow = "0 15px 35px -10px rgba(0,0,0,0.6)";
            }
          }

          if (descEl) {
            // Keep background cards cleaner and less cluttered by softening their text
            descEl.style.opacity = String(Math.max(0.15, 1 - absDiff * 0.7));
          }
        });
      };

      // Create ScrollTrigger with Pin and Snapping
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        pin: pinTarget,
        anticipatePin: 1,
        scrub: 0.6,
        snap: {
          snapTo: [0, 1 / 3, 2 / 3, 1],
          duration: { min: 0.2, max: 0.4 },
          ease: "power1.out",
        },
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateCardsPosition(self.progress);
        },
      });

      triggerRef.current = st;
      updateCardsPosition(0);
    }, section);

    return () => {
      ctx.revert();
    };
  }, [i18n.language, isRTL]);

  // One-Click Wheel Assist: A single wheel movement immediately advances or reverses by exactly 1 card
  useEffect(() => {
    const pinEl = pinTargetRef.current;
    if (!pinEl) return;

    const handleNativeWheel = (e: WheelEvent) => {
      const st = triggerRef.current;
      if (!st || !st.isActive) return;

      if (Math.abs(e.deltaY) > 20) {
        if (isWheelingRef.current) {
          e.preventDefault();
          return;
        }

        if (e.deltaY > 0 && activeStepRef.current < cards.length - 1) {
          // Scroll Down -> Step Forward immediately
          e.preventDefault();
          isWheelingRef.current = true;
          const nextIdx = activeStepRef.current + 1;
          const progress = nextIdx / (cards.length - 1);
          const targetScroll = st.start + progress * (st.end - st.start);

          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });

          setTimeout(() => {
            isWheelingRef.current = false;
          }, 450);
        } else if (e.deltaY < 0 && activeStepRef.current > 0) {
          // Scroll Up -> Step Backward immediately
          e.preventDefault();
          isWheelingRef.current = true;
          const prevIdx = activeStepRef.current - 1;
          const progress = prevIdx / (cards.length - 1);
          const targetScroll = st.start + progress * (st.end - st.start);

          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });

          setTimeout(() => {
            isWheelingRef.current = false;
          }, 450);
        }
        // At last card scrolling down: natural unpinned scroll to next section!
        // At first card scrolling up: natural unpinned scroll to previous section!
      }
    };

    pinEl.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      pinEl.removeEventListener("wheel", handleNativeWheel);
    };
  }, [cards.length]);

  // Click navigation to jump directly to any step
  const scrollToStep = (index: number) => {
    if (!triggerRef.current) return;
    const st = triggerRef.current;
    const progress = index / (cards.length - 1);
    const targetScroll = st.start + progress * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const nextStep = () => {
    scrollToStep(Math.min(activeStep + 1, cards.length - 1));
  };

  const prevStep = () => {
    scrollToStep(Math.max(activeStep - 1, 0));
  };

  const active = cards[activeStep] || cards[0];

  return (
    <div ref={sectionRef} className="relative bg-[#0F1729]">
      {/* Pinned Viewport Container - Takes full viewport with generous top spacing below fixed Header */}
      <div
        ref={pinTargetRef}
        className="h-screen w-full relative flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-8 select-none"
      >
        {/* Dynamic Background Glow */}
        <div
          ref={bgRef}
          className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
          style={{ background: active.bgGradient }}
        />

        {/* Ambient background glowing orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/3 -left-32 w-96 h-96 rounded-full blur-3xl transition-colors duration-700 opacity-25"
            style={{ backgroundColor: active.iconColor }}
          />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl bg-[#00D9FF] opacity-15" />
        </div>

        {/* Section Header with generous margin below Header */}
        <div className="container mx-auto px-4 xl:px-0 relative z-10">
          <div
            className={`text-center max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6C5CE7]/15 border border-[#6C5CE7]/35 rounded-full mb-3 shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
              <span className="text-[#00D9FF] font-semibold text-xs sm:text-sm tracking-wide">
                {t("stackCards.badge")}
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 leading-tight px-4 ${
                isRTL ? "text-right md:text-center" : "text-left md:text-center"
              }`}
            >
              {t("stackCards.title.part1")}{" "}
              <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00D9FF] to-[#00FFA3] bg-clip-text text-transparent">
                {t("stackCards.title.highlight")}
              </span>
              {t("stackCards.title.part2")}
            </h2>
            <p
              className={`text-[#A0AEC0] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto px-4 ${
                isRTL ? "text-right md:text-center" : "text-left md:text-center"
              }`}
            >
              {t("stackCards.subtitle")}
            </p>
          </div>
        </div>

        {/* 3D Circular Horizontal Carousel Stage */}
        <div
          className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 my-auto flex items-center justify-center h-[340px] sm:h-[370px] md:h-[400px]"
          style={{
            perspective: "1200px",
          }}
        >
          {cards.map((card, index) => {
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => scrollToStep(index)}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="absolute w-[90vw] sm:w-[82vw] md:w-[620px] max-w-2xl cursor-pointer will-change-transform"
              >
                <div className="relative bg-gradient-to-br from-[#1A1F3A]/95 to-[#0F1729]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-9 transition-all duration-300 border border-white/10">
                  {/* Top glowing accent line */}
                  <div
                    className="absolute -top-px left-12 right-12 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${card.iconColor}, transparent)`,
                    }}
                  />

                  {/* Header: Icon & Step Counter */}
                  <div
                    className={`flex items-center justify-between mb-4 sm:mb-5 ${
                      isRTL ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Icon container */}
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${card.iconColor}25, ${card.iconColor}08)`,
                        border: `2px solid ${card.iconColor}40`,
                      }}
                    >
                      <div style={{ color: card.iconColor }}>{card.icon}</div>
                    </div>

                    {/* Step number badge */}
                    <div className="flex flex-col items-center">
                      <span
                        className="text-4xl sm:text-5xl md:text-5xl font-black transition-all duration-300 tracking-tight"
                        style={{
                          color: card.iconColor,
                          textShadow:
                            activeStep === index
                              ? `0 0 30px ${card.iconColor}80, 0 0 50px ${card.iconColor}40`
                              : "none",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/40 text-[10px] sm:text-xs font-bold tracking-wider uppercase -mt-1">
                        {isRTL ? "خطوة" : "Step"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3
                      className={`text-xl sm:text-2xl md:text-2xl font-bold text-white leading-tight ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`card-desc text-[#A0AEC0] text-xs sm:text-sm md:text-base leading-relaxed transition-opacity duration-300 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Divider Line */}
                  <div
                    className={`h-1 w-full bg-gradient-to-r ${card.gradient} opacity-35 rounded-full mt-4 sm:mt-5`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Controls: Navigation + Step Dots + Progress */}
        <div className="container mx-auto px-4 relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Navigation Arrows + Dots in a unified Glassmorphism Bar */}
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
            <button
              onClick={isRTL ? nextStep : prevStep}
              disabled={activeStep === (isRTL ? cards.length - 1 : 0)}
              aria-label="Previous step"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed border border-white/10 hover:border-cyan-400/40 text-white flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-sm"
            >
              {isRTL ? (
                <ChevronRight className="w-5 h-5 text-gray-300" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              )}
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2 px-2">
              {cards.map((card, index) => {
                const isSelected = index === activeStep;
                return (
                  <button
                    key={card.id}
                    onClick={() => scrollToStep(index)}
                    className={`transition-all duration-300 rounded-full ${
                      isSelected
                        ? "w-8 h-2.5 shadow-md"
                        : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                    style={{
                      backgroundColor: isSelected ? card.iconColor : undefined,
                      boxShadow: isSelected ? `0 0 14px ${card.iconColor}` : undefined,
                    }}
                    aria-label={`Go to step ${index + 1}`}
                  />
                );
              })}
            </div>

            <button
              onClick={isRTL ? prevStep : nextStep}
              disabled={activeStep === (isRTL ? 0 : cards.length - 1)}
              aria-label="Next step"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed border border-white/10 hover:border-cyan-400/40 text-white flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-sm"
            >
              {isRTL ? (
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>

          {/* User Hint */}
          <div className="flex items-center gap-2 text-xs text-white/50 bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-sm">
            <MousePointer className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            <span>
              {isRTL
                ? "حركة سكرول واحدة للتنقل بين المراحل، أو انقر على الكارت"
                : "One scroll to transition steps, or click any card"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackCards;
