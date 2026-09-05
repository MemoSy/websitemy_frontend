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
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  bgGradient: string;
  highlights: string[];
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

  const shouldReduceMotion = useReducedMotion();
  const prevStepRef = useRef(activeStep);
  const directionRef = useRef(1);

  if (activeStep !== prevStepRef.current) {
    directionRef.current = activeStep >= prevStepRef.current ? 1 : -1;
    prevStepRef.current = activeStep;
  }
  const direction = directionRef.current;

  // Directional text transition variants (28px displacement, premium cubic-bezier easing)
  const displacement = 28;
  const titleVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir >= 0 ? -displacement : displacement,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir >= 0 ? displacement : -displacement,
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  const isWheelingRef = useRef(false);

  const getHighlights = (cardKey: string, fallback: string[]): string[] => {
    const res = t(`stackCards.cards.${cardKey}.highlights`, {
      returnObjects: true,
    });
    return Array.isArray(res) ? (res as string[]) : fallback;
  };

  const cards: Card[] = [
    {
      id: 1,
      icon: <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />,
      title: t("stackCards.cards.card1.title"),
      description: t("stackCards.cards.card1.description"),
      highlights: getHighlights("card1", [
        "دراسة المتطلبات",
        "خارطة الطريق",
      ]),
      gradient: "from-[#6C5CE7] to-[#00D9FF]",
      iconColor: "#6C5CE7",
      bgGradient:
        "radial-gradient(ellipse at 30% 20%, rgba(108, 92, 231, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(0, 217, 255, 0.12) 0%, transparent 55%)",
    },
    {
      id: 2,
      icon: <Palette className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />,
      title: t("stackCards.cards.card2.title"),
      description: t("stackCards.cards.card2.description"),
      highlights: getHighlights("card2", [
        "نماذج Wireframes",
        "تصاميم Figma UI/UX",
      ]),
      gradient: "from-[#00D9FF] to-[#00FFA3]",
      iconColor: "#00D9FF",
      bgGradient:
        "radial-gradient(ellipse at 70% 30%, rgba(0, 217, 255, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 30% 70%, rgba(0, 255, 163, 0.12) 0%, transparent 55%)",
    },
    {
      id: 3,
      icon: <Code className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />,
      title: t("stackCards.cards.card3.title"),
      description: t("stackCards.cards.card3.description"),
      highlights: getHighlights("card3", [
        "أكواد نظيفة وسريعة",
        "تهيئة السيو SEO",
      ]),
      gradient: "from-[#00FFA3] to-[#6C5CE7]",
      iconColor: "#00FFA3",
      bgGradient:
        "radial-gradient(ellipse at 40% 40%, rgba(0, 255, 163, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 60% 60%, rgba(108, 92, 231, 0.15) 0%, transparent 55%)",
    },
    {
      id: 4,
      icon: <Rocket className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />,
      title: t("stackCards.cards.card4.title"),
      description: t("stackCards.cards.card4.description"),
      highlights: getHighlights("card4", [
        "إطلاق واختبار شامل",
        "دعم فني مستمر",
      ]),
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
        if (w < 640) return 60;
        if (w < 1024) return 220;
        return 380;
      };

      const updateCardsPosition = (progress: number) => {
        const virtualIndex = progress * maxIndex;
        const currentNearest = Math.round(virtualIndex);
        
        // Guard state updates so React re-renders only on actual step changes
        if (activeStepRef.current !== currentNearest) {
          activeStepRef.current = currentNearest;
          setActiveStep(currentNearest);
        }

        // Dynamic background update
        if (bgRef.current && cards[currentNearest]) {
          bgRef.current.style.background = cards[currentNearest].bgGradient;
        }

        const stepX = getStepX();
        const dir = isRTL ? -1 : 1;
        const isMobile = window.innerWidth < 640;

        cardsRef.current.forEach((cardEl, i) => {
          if (!cardEl) return;

          const diff = i - virtualIndex;
          const absDiff = Math.abs(diff);

          if (isMobile && absDiff > 1.1) {
            gsap.set(cardEl, { display: "none" });
            return;
          }

          // 3D Cylindrical Transformation
          const x = dir * diff * stepX;
          const z = -Math.min(absDiff, 2.5) * (isMobile ? 70 : 160);
          const rotateY = dir * -diff * (isMobile ? 12 : 22);
          const scale = Math.max(isMobile ? 0.82 : 0.68, 1 - absDiff * (isMobile ? 0.1 : 0.14));
          const opacity = Math.max(0.06, 1 - absDiff * 0.46);
          const blur = isMobile ? 0 : Math.min(absDiff * 2.2, 5);
          const zIndex = Math.round(30 - absDiff * 8);

          gsap.set(cardEl, {
            display: "block",
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

  // Support direct hash navigation to #process
  useEffect(() => {
    if (window.location.hash === "#process" && sectionRef.current) {
      const timer = setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

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
    <div ref={sectionRef} id="process" className="relative bg-[#0F1729] overflow-x-clip">
      {/* Pinned Viewport Container - Takes full viewport with generous top spacing below fixed Header */}
      <div
        ref={pinTargetRef}
        className="h-screen w-full relative flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 select-none"
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

        {/* Section Header */}
        <div className="container mx-auto px-4 xl:px-0 relative z-10">
          <div
            className={`text-center max-w-4xl mx-auto ${isRTL ? "rtl" : "ltr"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6C5CE7]/15 border border-[#6C5CE7]/35 rounded-full mb-4 sm:mb-5 shadow-md backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
              <span className="text-[#00D9FF] font-semibold text-xs sm:text-sm tracking-wide">
                {t("stackCards.badge")}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight px-4 text-center"
            >
              {t("stackCards.title.part1")}{" "}
              <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00D9FF] to-[#00FFA3] bg-clip-text text-transparent">
                {t("stackCards.title.highlight")}
              </span>
              {t("stackCards.title.part2")}
            </h2>
            <p
              className="text-[#A0AEC0] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto px-4 text-center"
            >
              {t("stackCards.subtitle")}
            </p>
          </div>
        </div>

        {/* Central Dynamic Step Title (Directional Smooth Transition) */}
        <div className="relative z-20 container mx-auto px-4 my-auto py-2 sm:py-3">
          <div className="flex items-center justify-center text-center max-w-3xl mx-auto min-h-[44px] sm:min-h-[52px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.h3
                key={`title-${activeStep}`}
                custom={direction}
                variants={titleVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight whitespace-nowrap px-4 select-none"
                style={{
                  textShadow: `0 2px 10px rgba(0,0,0,0.85), 0 0 25px ${active.iconColor}35`,
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {active.title}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* 3D Circular Horizontal Carousel Stage */}
        <div
          className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-auto flex items-center justify-center h-[280px] sm:h-[300px] md:h-[320px] overflow-x-clip"
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
                className="absolute left-0 right-0 mx-auto w-[90vw] sm:w-[82vw] md:w-[620px] max-w-2xl cursor-pointer will-change-transform"
              >
                <div className="relative bg-gradient-to-br from-[#1A1F3A]/95 to-[#0F1729]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 md:p-8 transition-all duration-300 border border-white/10">
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
                      className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300"
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
                        className="text-3xl sm:text-4xl md:text-4xl font-black transition-all duration-300 tracking-tight"
                        style={{
                          color: card.iconColor,
                          textShadow:
                            activeStep === index
                              ? `0 0 25px ${card.iconColor}70, 0 0 45px ${card.iconColor}30`
                              : "none",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/40 text-[10px] sm:text-xs font-semibold tracking-wider uppercase -mt-0.5">
                        {isRTL ? "خطوة" : "Step"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content: Exactly 1 line on desktop + Exactly 2 Tags */}
                  <div className="space-y-4">
                    <p
                      className={`card-desc text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed transition-opacity duration-300 font-medium md:whitespace-nowrap overflow-hidden text-ellipsis ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {card.description}
                    </p>

                    {/* Exactly 2 Tags */}
                    {card.highlights && card.highlights.length > 0 && (
                      <div
                        className={`flex items-center gap-2 sm:gap-2.5 pt-3 border-t border-white/10 ${
                          isRTL ? "justify-start" : "justify-start"
                        }`}
                      >
                        {card.highlights.slice(0, 2).map((item, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 shadow-sm"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: card.iconColor }}
                            />
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
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
        <div className="container mx-auto px-4 relative z-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
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
                      boxShadow: isSelected ? `0 0 10px ${card.iconColor}80` : undefined,
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

          {/* Refined User Hint */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-white/50 bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-sm">
            <MousePointer className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            <span>
              {t("stackCards.hint", {
                defaultValue: isRTL
                  ? "مرّر للتنقل بين المراحل أو اختر البطاقة"
                  : "Scroll to transition between steps or select a card",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackCards;
