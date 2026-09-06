import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calculator,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Quote,
  Rocket,
  Sparkles,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CostCalculatorModal from "../../CostCalculatorModal";
import { clientTestimonials } from "../../../data/clientTestimonials";
import { soundEffects } from "../../../utils/soundEffects";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
}

const AnimatedCounter = ({ end, suffix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.navigator.webdriver;

    if (reduceMotion) {
      setCount(end);
      return;
    }

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 900, 1);
        setCount(Math.round((1 - Math.pow(1 - progress, 3)) * end));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    });

    if (counterRef.current) observer.observe(counterRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);

  return (
    <span ref={counterRef} dir="ltr" className="inline-flex font-mono tabular-nums">
      {count}
      {suffix && <span className="text-[#00D9FF]">{suffix}</span>}
    </span>
  );
};

const BusinessStatsBar = () => {
  const { t } = useTranslation();
  const stats = [
    { value: 19, suffix: "+", label: t("hero.stats.projectsLabel") },
    { value: 8, label: t("hero.stats.clientsLabel") },
    { value: 5, label: t("hero.stats.openSourceLabel") },
  ];

  return (
    <div className="w-full rounded-[22px] border border-[#4A75B8]/55 bg-[#0D1731]/72 px-3 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] sm:px-6 sm:py-7">
      <div className="grid grid-cols-3 divide-x divide-x-reverse divide-[#36517D]/55 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex min-w-0 flex-col items-center px-2 sm:px-4">
            <span className="text-[28px] font-black leading-none text-white sm:text-[34px]">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
            </span>
            <span className="mt-2 text-[10px] font-medium leading-snug text-[#B3C5E2] sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const testimonialPlaceholderImages = [
  "/images/co/bb.jpg",
  "/images/co/mm.jpg",
  "/images/co/ss.png",
  "/images/co/kk.jpg",
  "/images/co/nn.jpg",
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = clientTestimonials.length;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const paginate = (step: number) => {
    setActiveIndex((current) => (current + step + total) % total);
  };

  const offsetFor = (index: number) => {
    let offset = index - activeIndex;
    const midpoint = Math.floor(total / 2);
    if (offset > midpoint) offset -= total;
    if (offset < -midpoint) offset += total;
    return offset;
  };

  return (
    <div className="relative mx-auto w-full max-w-[790px]" dir="rtl">
      {/* ملصق أعلى اليسار: شركاء في نجاحك مع السهم الملتف */}
      <div
        className="pointer-events-none absolute left-[-62px] top-[10px] z-20 hidden xl:flex items-start gap-1 select-none text-[#62C7FF]"
        style={{
          transform: "rotate(-5deg)",
          filter: "drop-shadow(0 0 6px rgba(0, 217, 255, 0.35))",
          fontFamily: "'Aref Ruqaa Ink', cursive",
          direction: "ltr",
        }}
      >
        <div className="text-center text-[20px] font-bold leading-[1.3] tracking-wide" dir="rtl">
          شركاء
          <br />
          في نجاحك
        </div>
        <svg
          width="48"
          height="64"
          viewBox="0 0 48 64"
          fill="none"
          className="shrink-0 -mt-1"
          aria-hidden="true"
        >
          <path
            d="M 4 32 C 12 16, 20 5, 29 7 C 36 9, 36 21, 28 25 C 20 28, 18 16, 26 14 C 33 13, 38 24, 43 52"
            stroke="#62C7FF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 33 46 L 43 54 L 47 41"
            stroke="#62C7FF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ملصق أسفل اليمين: آراء عملائنا في قصص نجاحنا مع السهم المقوس الصاعد */}
      <div
        className="pointer-events-none absolute -bottom-[22px] right-[30px] z-20 hidden xl:flex items-end gap-2.5 text-[#62C7FF] select-none"
        style={{
          transform: "rotate(3deg)",
          filter: "drop-shadow(0 0 6px rgba(0, 217, 255, 0.35))",
          fontFamily: "'Aref Ruqaa Ink', cursive",
          direction: "ltr",
        }}
      >
        <svg
          width="48"
          height="68"
          viewBox="0 0 48 68"
          fill="none"
          className="shrink-0 mb-3"
          aria-hidden="true"
        >
          <path
            d="M 44 64 C 28 52, 16 34, 10 10"
            stroke="#62C7FF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 8 26 L 10 9 L 26 15"
            stroke="#62C7FF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-center text-[20px] font-bold leading-[1.35] tracking-wide" dir="rtl">
          آراء عملائنا
          <br />
          في قصص نجاحنا
        </div>
      </div>

      <motion.div
        className="relative -mx-5 h-[450px] w-[calc(100%+2.5rem)] touch-pan-y overflow-hidden [perspective:1200px] sm:h-[530px] lg:h-[600px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.x < -45 || info.velocity.x < -450) paginate(1);
          if (info.offset.x > 45 || info.velocity.x > 450) paginate(-1);
        }}
        aria-roledescription="carousel"
        aria-label="آراء عملائنا"
      >

        {clientTestimonials.map((testimonial, index) => {
          const offset = offsetFor(index);
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          const imageSrc = testimonial.image || testimonialPlaceholderImages[index % testimonialPlaceholderImages.length];
          return (
            <motion.article
              key={testimonial.id}
              initial={false}
              animate={{
                x: `${offset * 54}%`,
                y: isActive ? 0 : 8,
                scale: isActive ? 1 : 0.86,
                rotate: isActive ? -1.1 : 0,
                rotateY: isActive ? 0 : offset * 42,
                opacity: isActive ? 1 : isVisible ? 0.76 : 0,
              }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute inset-x-0 top-[44px] z-10 mx-auto ${isActive ? "w-[78%] max-w-[580px] rounded-[31px] border border-[#2787E8]/80 bg-[#0D1D3A]/95 p-3 shadow-[0_28px_70px_rgba(0,0,0,.34),0_0_32px_rgba(0,139,255,.12)] sm:p-[26px]" : "w-[94%] max-w-[740px] p-0"}`}
              style={{
                zIndex: isActive ? 10 : isVisible ? 5 : 0,
                pointerEvents: isActive ? "auto" : "none",
                transformOrigin: offset < 0 ? "right center" : offset > 0 ? "left center" : "center center",
                transformStyle: "preserve-3d",
              }}
              aria-hidden={!isActive}
            >
              <div
                className={`relative overflow-hidden ${
                  isActive
                    ? "min-h-[338px] rounded-[24px] border border-[#31598D]/70 bg-[linear-gradient(145deg,rgba(20,42,80,.98),rgba(11,23,49,.98))] px-5 pb-5 pt-6 shadow-[0_18px_45px_rgba(0,0,0,0.3)] sm:min-h-[420px] sm:px-8 sm:pb-7 sm:pt-8"
                    : "min-h-[300px] rounded-[24px] border border-[#3B95ED]/80 bg-[linear-gradient(145deg,rgba(16,42,79,.82),rgba(7,22,49,.92))] px-4 pb-4 pt-5 shadow-[0_22px_45px_rgba(0,0,0,.3)] sm:min-h-[390px] sm:px-6 sm:pb-6 sm:pt-7"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(22,153,255,.12),transparent_35%)]" />
                {isActive && <Quote className="absolute right-5 top-5 h-7 w-7 fill-[#00D9FF] text-[#00D9FF] opacity-90 sm:right-7 sm:top-6 sm:h-8 sm:w-8" />}
                {!isActive && isVisible && (
                  <Quote
                    className={`absolute top-5 z-20 h-7 w-7 fill-[#00D9FF] text-[#00D9FF] opacity-90 ${offset < 0 ? "left-4" : "right-4"}`}
                    aria-hidden="true"
                  />
                )}


                <div
                  className={
                    isActive
                      ? "relative grid grid-cols-[78px_minmax(0,1fr)] items-start gap-4 pt-8 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-7 sm:pt-8"
                      : `relative flex min-h-[252px] flex-col justify-center gap-3 sm:min-h-[334px] ${offset < 0 ? "items-start pl-1" : "items-end pr-1"}`
                  }
                  dir="ltr"
                >
                  <div className="relative">
                    {isActive && (
                      <div className="pointer-events-none absolute -left-3 -top-8 z-20 h-11 w-14" aria-hidden="true">
                        <span className="absolute left-0 top-7 block h-[3px] w-5 -rotate-[18deg] rounded-full bg-[#FFC94A] shadow-[0_0_8px_rgba(255,201,74,.35)]" />
                        <span className="absolute left-4 top-3 block h-[3px] w-5 rotate-[55deg] rounded-full bg-[#FFC94A] shadow-[0_0_8px_rgba(255,201,74,.35)]" />
                        <span className="absolute left-9 top-0 block h-[3px] w-4 rotate-[78deg] rounded-full bg-[#FFC94A] shadow-[0_0_8px_rgba(255,201,74,.35)]" />
                      </div>
                    )}
                    <div
                      className={`relative z-10 flex items-center justify-center overflow-hidden rounded-full border-[3px] border-[#80C2FF] bg-[#102447] bg-cover bg-no-repeat shadow-[0_0_26px_rgba(0,180,255,0.2)] ${isActive ? "h-[78px] w-[78px] sm:h-[124px] sm:w-[124px]" : "h-[88px] w-[88px] sm:h-[120px] sm:w-[120px]"}`}
                      style={{
                        backgroundImage: `url("${imageSrc}")`,
                        backgroundPosition: testimonial.imagePosition || "center",
                        ...(isActive ? undefined : { transform: `rotateY(${offset * -42}deg) scale(1.08)` }),
                      }}
                      role="img"
                      aria-label={testimonial.name}
                    >
                      <img
                        src={imageSrc}
                        alt={testimonial.name}
                        className="sr-only"
                        aria-hidden="true"
                      />
                    </div>
                    {isActive && (
                      <span className="absolute -bottom-5 left-0 z-20 whitespace-nowrap rounded-[13px] border border-white/35 bg-[#A8D3FF] px-3.5 py-1.5 text-xs font-black text-[#10264A] shadow-[0_7px_16px_rgba(0,0,0,.28)] -rotate-[8deg] sm:-bottom-4 sm:left-0 sm:text-sm">
                        {testimonial.badgeText || "عمل رائع"}
                      </span>
                    )}
                  </div>

                  <div className={isActive ? "min-w-0 text-right" : "w-[110px] text-center"} dir="rtl">
                    {isActive && <p className="text-[13px] font-medium leading-[1.85] text-[#EEF5FF] sm:text-base sm:leading-[1.9]">”{testimonial.comment}“</p>}
                    <div className={isActive ? "mt-3 flex w-full flex-row-reverse items-center justify-start gap-2 border-t border-white/10 pt-3 sm:mt-4" : "w-full"}>
                      <div className={isActive ? "min-w-0 flex-1 text-right" : "w-full text-center"}>
                        <h3 className="text-sm font-black text-white sm:text-base">{testimonial.name}</h3>
                        {isActive && (
                          <>
                            <p className="mt-0.5 text-[10px] text-[#AABFDD] sm:text-xs">صاحب المشروع</p>
                            <p className="mt-0.5 truncate text-[10px] font-semibold text-[#64BFFF] sm:text-xs">{testimonial.projectName}</p>
                          </>
                        )}
                      </div>
                      {isActive && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#3A68A4] bg-[#17325E]">
                          <Briefcase className="h-4 w-4 text-[#8FC5FF]" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isActive && (
                <div className="relative mt-7 flex flex-col gap-5" dir="ltr">
                  <div className="flex items-center gap-2" dir="ltr" aria-label={`${testimonial.rating} من 5 نجوم`}>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((starIndex) => {
                        const fillPercent = Math.max(0, Math.min(1, testimonial.rating - starIndex));
                        const gradId = `star-grad-${testimonial.id}-${starIndex}`;

                        if (fillPercent >= 1) {
                          return (
                            <Star key={starIndex} className="h-4 w-4 fill-[#FFC94A] text-[#FFC94A] sm:h-5 sm:w-5" />
                          );
                        }
                        if (fillPercent <= 0) {
                          return (
                            <Star key={starIndex} className="h-4 w-4 fill-transparent text-[#3A5B85] sm:h-5 sm:w-5" />
                          );
                        }
                        return (
                          <svg
                            key={starIndex}
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <defs>
                              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset={`${fillPercent * 100}%`} stopColor="#FFC94A" />
                                <stop offset={`${fillPercent * 100}%`} stopColor="transparent" />
                              </linearGradient>
                            </defs>
                            <polygon
                              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                              fill={`url(#${gradId})`}
                              stroke="#FFC94A"
                            />
                          </svg>
                        );
                      })}
                    </div>
                    <span className="text-xs font-bold text-[#FFD369] sm:text-sm font-mono tabular-nums">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex w-full items-center justify-center gap-2.5 sm:justify-between">
                    <button
                      type="button"
                      onClick={() => paginate(-1)}
                      className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#5C79A3] bg-[#152B4D]/80 text-white transition hover:border-[#00D9FF] hover:bg-[#1B3C67] focus:outline-none focus:ring-2 focus:ring-[#00D9FF] sm:flex"
                      aria-label="الرأي السابق"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2 px-1">
                      {clientTestimonials.map((item, dotIndex) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => goTo(dotIndex)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${dotIndex === activeIndex ? "w-4 bg-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,.65)]" : "w-2.5 bg-[#50709A] hover:bg-[#79A6D8]"}`}
                          aria-label={`انتقل إلى رأي العميل ${dotIndex + 1}`}
                          aria-current={dotIndex === activeIndex ? "true" : undefined}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => paginate(1)}
                      className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#5C79A3] bg-[#152B4D]/80 text-white transition hover:border-[#00D9FF] hover:bg-[#1B3C67] focus:outline-none focus:ring-2 focus:ring-[#00D9FF] sm:flex"
                      aria-label="الرأي التالي"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <p className="mt-1 text-center text-[11px] font-medium text-[#7895BA] sm:text-xs lg:hidden">
        اسحب للتنقل بين آراء عملائنا
      </p>
    </div>
  );
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const openWhatsAppConsultation = () => {
    soundEffects.playSend();
    const message = isRTL
      ? "مرحباً، أريد الحصول على استشارة مجانية حول مشروعي 🚀"
      : "Hello, I would like to get a free consultation about my project 🚀";
    window.open(`https://wa.me/905313345111?text=${encodeURIComponent(message)}`, "_blank");
  };

  const scrollToProjects = () => {
    soundEffects.playClick();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
    else navigate("/projects");
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#081328] pt-24 sm:pt-28 lg:min-h-[900px] lg:pt-[156px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: "linear-gradient(rgba(111,164,225,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(111,164,225,.8) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(36,109,211,.13),transparent_36%),radial-gradient(circle_at_22%_45%,rgba(0,160,255,.09),transparent_36%)]" />
        <div className="absolute -bottom-[425px] -left-[270px] h-[560px] w-[560px] rounded-full border border-[#169BFF]/35 bg-[radial-gradient(circle_at_65%_20%,rgba(22,149,255,.62),rgba(6,41,94,.86)_38%,rgba(2,13,37,.95)_70%)] shadow-[0_-18px_80px_rgba(0,127,255,.25)] sm:h-[650px] sm:w-[650px]" />
      </div>
      {/* ملصق أسفل اليسار: مواقع تصنع فرصًا حقيقية مع القوس التحتي المائل وقوس الأفق */}
      <div
        className="pointer-events-none absolute bottom-[88px] left-[70px] z-10 hidden lg:block select-none text-[#62C7FF]"
        style={{
          transform: "rotate(-14deg)",
          filter: "drop-shadow(0 0 6px rgba(0, 217, 255, 0.35))",
          fontFamily: "'Aref Ruqaa Ink', cursive",
        }}
      >
        <div className="relative text-center text-[21px] font-bold leading-[1.3] tracking-wide" dir="rtl">
          مواقع تصنع
          <br />
          فرصًا حقيقية

          {/* خط التحديد المقوس تحت العبارة */}
          <svg
            width="130"
            height="25"
            viewBox="0 0 130 25"
            fill="none"
            className="absolute right-0 -bottom-3 overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M 125 4 C 95 20, 45 22, 5 8"
              stroke="#62C7FF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>

          {/* قوس الأفق التعبيري الممتد فوق منحنى الكرة الزرقاء */}
          <svg
            width="60"
            height="35"
            viewBox="0 0 60 35"
            fill="none"
            className="absolute left-full top-2 -ml-2 overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M 2 24 C 18 2, 42 2, 56 18"
              stroke="#62C7FF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>


      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 pb-14 sm:px-7 sm:pb-16 lg:px-10 lg:pb-10 xl:px-14">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-24 xl:gap-32" style={{ direction: "ltr" }}>
          <div className="order-2 min-w-0 lg:order-1">
            <TestimonialSlider />
          </div>

          <div className={`order-1 min-w-0 lg:order-2 lg:pt-1 ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#118ED4]/80 bg-[#0B2543]/80 px-4 py-2 text-xs font-semibold text-[#35D7FF] shadow-[0_0_24px_rgba(0,217,255,.08)] sm:text-sm">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t("hero.badge")}</span>
                <Rocket className="h-4 w-4 fill-[#00D9FF] text-[#00D9FF]" />
              </div>
            </div>

            <h1 className="mt-9 text-center text-[31px] font-black leading-[1.32] tracking-tight text-white sm:text-[39px] lg:text-right lg:text-[36px] lg:leading-[1.42] xl:text-[40px] 2xl:text-[44px]">
              <span className="block lg:whitespace-nowrap">{t("hero.title.line1")}</span>
              <span className="mt-2 block lg:mt-2.5 lg:whitespace-nowrap lg:text-[31px] xl:text-[35px] 2xl:text-[39px]">
                <span>{t("hero.title.line2")} </span>
                <span className="bg-gradient-to-l from-[#02E1EE] via-[#0FC7FF] to-[#1187FF] bg-clip-text text-transparent">{t("hero.title.highlight")}</span>
              </span>
            </h1>

            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:mt-14 lg:justify-start lg:gap-5">
              <button
                type="button"
                onClick={openWhatsAppConsultation}
                className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#7566FF] via-[#329CFF] to-[#03D4E8] px-7 text-base font-black text-white shadow-[0_10px_32px_rgba(19,157,255,.28)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(19,157,255,.4)] focus:outline-none focus:ring-2 focus:ring-[#00D9FF] focus:ring-offset-2 focus:ring-offset-[#081328] sm:min-w-[275px]"
              >
                <MessageSquare className="h-5 w-5 transition-transform group-hover:scale-110" />
                {t("hero.cta.consultation")}
              </button>
              <button
                type="button"
                onClick={scrollToProjects}
                className="group inline-flex min-h-[58px] items-center justify-center gap-3 rounded-2xl border border-[#4186D3]/80 bg-[#0A1831]/75 px-7 text-base font-black text-white transition hover:-translate-y-0.5 hover:border-[#00D9FF] hover:bg-[#102443] focus:outline-none focus:ring-2 focus:ring-[#00D9FF] sm:min-w-[210px]"
              >
                {t("hero.cta.portfolio")}
                {isRTL ? <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
              </button>
            </div>

            <div className="mt-8 flex justify-center lg:mt-10 lg:justify-start">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setIsCalculatorOpen(true);
                }}
                className="group inline-flex items-center gap-2.5 py-1 text-sm font-semibold text-[#91B4DF] transition hover:text-[#31D6FF] focus:outline-none focus:ring-1 focus:ring-[#00D9FF] sm:text-base"
              >
                <Calculator className="h-5 w-5 text-[#00D9FF]" />
                <span className="underline decoration-[#3B6C9F] underline-offset-4 group-hover:decoration-[#00D9FF]">{t("hero.cta.calculator")}</span>
              </button>
            </div>

            <div className="mx-auto mt-10 max-w-[720px] lg:mx-0 lg:mt-14">
              <BusinessStatsBar />
            </div>

            <div className="mt-6 hidden items-center gap-4 text-xs font-medium text-[#6684AA] lg:flex">
              <span className="h-px w-14 bg-gradient-to-l from-[#00D9FF] to-transparent" />
              <span>من الفكرة إلى التأثير</span>
            </div>
          </div>
        </div>
      </div>

      <CostCalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
    </section>
  );
};

export default HeroSection;
