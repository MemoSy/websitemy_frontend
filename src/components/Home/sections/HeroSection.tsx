import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calculator,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CostCalculatorModal from "../../CostCalculatorModal";
import { soundEffects } from "../../../utils/soundEffects";

// Lighthouse Benchmark Indicators
export interface LighthouseMetricItem {
  key: "performance" | "accessibility" | "seo";
  score: number;
  labelKey: string;
  labelDefault: string;
}

export const LIGHTHOUSE_METRICS: LighthouseMetricItem[] = [
  {
    key: "performance",
    score: 98,
    labelKey: "hero.lighthouse.performance",
    labelDefault: "الأداء",
  },
  {
    key: "accessibility",
    score: 96,
    labelKey: "hero.lighthouse.accessibility",
    labelDefault: "سهولة الوصول",
  },
  {
    key: "seo",
    score: 100,
    labelKey: "hero.lighthouse.seo",
    labelDefault: "SEO",
  },
];

interface LighthouseGaugeProps {
  score: number;
  label: string;
}

// مؤشر قياس دائري ثابت بحجم بارز ومتوازن مع محاذاة نقية
const LighthouseGauge = ({ score, label }: LighthouseGaugeProps) => {
  const strokeColor =
    score >= 90 ? "#10B981" : score >= 50 ? "#F59E0B" : "#EF4444";
  const textColor =
    score >= 90
      ? "text-emerald-400"
      : score >= 50
      ? "text-amber-400"
      : "text-rose-400";

  const radius = 35;
  const strokeWidth = 4.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center select-none text-center">
      {/* الدائرة بصيغة SVG بحجم بارز ومريح بصرياً */}
      <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] md:w-[92px] md:h-[92px] flex items-center justify-center">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 80 80"
          aria-hidden="true"
        >
          {/* دائرة الخلفية */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* دائرة القيمة الثابتة */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* الرقم في المنتصف */}
        <span
          className={`absolute text-xl sm:text-2xl md:text-[26px] font-mono font-black tabular-nums ${textColor}`}
          dir="ltr"
        >
          {score}
        </span>
      </div>

      {/* اسم المؤشر أسفل الدائرة بالعربية فقط */}
      <span className="text-xs sm:text-sm md:text-[15px] font-bold text-slate-100 mt-3 leading-tight">
        {label}
      </span>
    </div>
  );
};

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

// مكون خفيف للعدادات المتحركة مع دعم prefers-reduced-motion و zero-layout-shift
const AnimatedCounter = ({
  end,
  duration = 1000,
  suffix = "",
  className = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // التحقق من خيار تقليل الحركة أو بيئة الاختبار الآلي
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.navigator.webdriver);

    if (prefersReducedMotion) {
      setCount(end);
      hasAnimatedRef.current = true;
      return;
    }

    if (hasAnimatedRef.current) return;

    let animFrameId: number;

    const startAnimation = () => {
      hasAnimatedRef.current = true;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease Out Expo منحنى تباطؤ انسيابي وسلس
        const easeProgress =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.round(easeProgress * end);

        setCount(currentCount);

        if (progress < 1) {
          animFrameId = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animFrameId = requestAnimationFrame(animate);
    };

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          if (counterRef.current) {
            observer.unobserve(counterRef.current);
          }
        }
      },
      { threshold: 0.05 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [end, duration]);

  return (
    <span
      ref={counterRef}
      dir="ltr"
      className={`inline-flex items-center font-mono tabular-nums ${className}`}
    >
      <span>{count}</span>
      {suffix && (
        <span className="text-[#00D9FF] font-bold select-none ml-0.5">
          {suffix}
        </span>
      )}
    </span>
  );
};

// مكون شريط الإحصائيات السفلية - تصميم متماسك وأنيق ومريح بصرياً
interface BusinessStatsBarProps {
  className?: string;
}

const BusinessStatsBar = ({ className = "" }: BusinessStatsBarProps) => {
  const { t } = useTranslation();
  return (
    <div className={`w-full max-w-[560px] ${className}`}>
      <div className="relative rounded-2xl bg-[#0D1230]/75 border border-white/10 p-4 sm:p-5 shadow-xl shadow-black/25 backdrop-blur-sm">
        <div className="grid grid-cols-3 divide-x divide-x-reverse divide-white/10 text-center items-center">
          {/* إحصائية 1: 19+ مشروعاً ناجحاً */}
          <div className="px-2 sm:px-4 flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center justify-center">
              <AnimatedCounter end={19} suffix="+" />
            </div>
            <span className="text-xs sm:text-[13px] text-slate-400 mt-1 font-medium leading-tight">
              {t("hero.stats.projectsLabel")}
            </span>
          </div>

          {/* إحصائية 2: 8 عملاء */}
          <div className="px-2 sm:px-4 flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center justify-center">
              <AnimatedCounter end={8} />
            </div>
            <span className="text-xs sm:text-[13px] text-slate-400 mt-1 font-medium leading-tight">
              {t("hero.stats.clientsLabel")}
            </span>
          </div>

          {/* إحصائية 3: 5 مشاريع مفتوحة المصدر */}
          <div className="px-2 sm:px-4 flex flex-col items-center">
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center justify-center">
              <AnimatedCounter end={5} />
            </div>
            <span className="text-xs sm:text-[13px] text-slate-400 mt-1 font-medium leading-tight">
              {t("hero.stats.openSourceLabel")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // 1. Primary CTA: استشارة واتساب مجانية
  const openWhatsAppConsultation = () => {
    soundEffects.playSend();
    const message = isRTL
      ? "مرحباً، أريد الحصول على استشارة مجانية حول مشروعي 🚀"
      : "Hello, I would like to get a free consultation about my project 🚀";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905313345111?text=${encodedMessage}`, "_blank");
  };

  // 2. Secondary CTA: تصفح معرض الأعمال
  const scrollToProjects = () => {
    soundEffects.playClick();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/projects");
    }
  };

  // 3. Tertiary CTA: فتح حاسبة التكلفة
  const openCalculator = () => {
    soundEffects.playPop();
    setIsCalculatorOpen(true);
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0A0E27] pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Animated Subtle Background Light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft cyan ambient radial */}
        <div
          className={`absolute w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[#00D9FF]/10 rounded-full blur-[140px] -top-[10%] ${
            isRTL ? "-right-[10%]" : "-left-[10%]"
          }`}
        />
        {/* Soft royal indigo ambient radial */}
        <div
          className={`absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#6C5CE7]/10 rounded-full blur-[140px] top-[40%] ${
            isRTL ? "-left-[15%]" : "-right-[15%]"
          }`}
        />
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* الجانب الأيمن (في الـ RTL): الشارة ← العنوان (سطران فقط) ← الأزرار ← رابط الحاسبة ← إحصائيات الأعمال */}
          <div
            className={`lg:col-span-7 flex flex-col ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {/* 1. الشارة العلوية المعتمدة */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>{t("hero.badge")}</span>
              </div>
            </div>

            {/* 2. العنوان الرئيسي: سطرين فقط على Desktop مع تمييز أنيق */}
            {/* المسافة من الشارة: 20-24px (mt-5 sm:mt-6) */}
            <h1 className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-[33px] xl:text-[39px] font-extrabold text-white leading-[1.3] tracking-tight">
              <span className="block text-white">
                {t("hero.title.line1") || "نطوّر مواقع ويب احترافية"}
              </span>
              <span className="block mt-1 sm:mt-1.5 text-slate-100 lg:whitespace-nowrap">
                <span>{t("hero.title.line2") || "تحوّل فكرتك إلى"}{" "}</span>
                <span className="bg-gradient-to-r from-[#00D9FF] via-[#38bdf8] to-[#00FFA3] bg-clip-text text-transparent font-black inline-block">
                  {t("hero.title.highlight") || "حضور رقمي فعّال"}
                </span>
              </span>
            </h1>

            {/* تم حذف النص التوضيحي تماماً وفق التوجيهات لتنظيف الجهة اليمنى */}

            {/* 3. صف الأزرار: المسافة من العنوان 28-36px (mt-7 sm:mt-8) */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              {/* الزر الأساسي */}
              <button
                onClick={openWhatsAppConsultation}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00D9FF] via-[#0ea5e9] to-[#6C5CE7] hover:shadow-[0_0_35px_rgba(0,217,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#00D9FF] focus:ring-offset-2 focus:ring-offset-[#0A0E27]"
              >
                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>{t("hero.cta.consultation")}</span>
              </button>

              {/* الزر الثانوي */}
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0A0E27]"
              >
                <span>{t("hero.cta.portfolio")}</span>
                {isRTL ? (
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </div>

            {/* 4. رابط حاسبة التكلفة: المسافة من الأزرار 14-18px (mt-4) */}
            <div className="mt-4">
              <button
                onClick={openCalculator}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-colors group py-1 focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded"
              >
                <Calculator className="w-4 h-4 text-cyan-400/80 transition-transform group-hover:rotate-12" />
                <span className="underline underline-offset-4 decoration-slate-600 group-hover:decoration-cyan-400 font-medium">
                  {t("hero.cta.calculator")}
                </span>
              </button>
            </div>

            {/* 5. شريط الإحصائيات السفلية على الديسكتوب: المسافة من رابط الحاسبة 28-36px (mt-7 sm:mt-8) */}
            <BusinessStatsBar className="hidden lg:block mt-7 sm:mt-8" />
          </div>

          {/* الجانب الأيسر (في الـ RTL): بطاقة مؤشرات الجودة الكبيرة + الوسوم الثلاثة أسفلها */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex flex-col items-center lg:pt-4 xl:pt-5">
            <div className="w-full max-w-[500px] flex flex-col items-center">
              {/* بطاقة مؤشرات الجودة الكبيرة والواضحة (Lighthouse) */}
              <div className="w-full rounded-3xl bg-[#0D1230]/85 border border-white/10 p-6 sm:p-7 md:p-8 shadow-2xl shadow-black/35 backdrop-blur-md">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 items-center justify-items-center">
                  {LIGHTHOUSE_METRICS.map((metric) => (
                    <LighthouseGauge
                      key={metric.key}
                      score={metric.score}
                      label={t(metric.labelKey) || metric.labelDefault}
                    />
                  ))}
                </div>
              </div>

              {/* الوسوم الثلاثة أسفل بطاقة المؤشرات: صف أول وسمان، وصف ثانٍ وسم واحد في المنتصف */}
              <div className="mt-6 sm:mt-7 w-full flex flex-col items-center gap-2.5 sm:gap-3">
                {/* الصف الأول: وسمان */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 w-full">
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs sm:text-[13px] font-medium text-center">
                    <CheckCircle2 className="w-4 h-4 text-[#00FFA3] shrink-0" />
                    <span>{t("hero.features.design") || "تصميم UI/UX مخصص وعصري"}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs sm:text-[13px] font-medium text-center">
                    <CheckCircle2 className="w-4 h-4 text-[#00FFA3] shrink-0" />
                    <span>{t("hero.features.performance") || "أداء فائق وسرعة تحميل"}</span>
                  </div>
                </div>

                {/* الصف الثاني: وسم واحد في المنتصف */}
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs sm:text-[13px] font-medium text-center">
                  <CheckCircle2 className="w-4 h-4 text-[#00FFA3] shrink-0" />
                  <span>{t("hero.features.support") || "كود نظيف ودعم تقني مستمر"}</span>
                </div>
              </div>

              {/* شريط الإحصائيات على الموبايل فقط (للحفاظ على التسلسل المطلوب: بعد المؤشرات والوسوم) */}
              <BusinessStatsBar className="block lg:hidden mt-7 sm:mt-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Cost Calculator Modal */}
      <CostCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
};

export default HeroSection;
