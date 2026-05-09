import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Globe,
  ShoppingCart,
  Code,
  Palette,
  Heart,
  ExternalLink,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import CostCalculatorModal from "../../CostCalculatorModal";
import { soundEffects } from "../../../utils/soundEffects";

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ربط أنواع الخدمات مع IDs في Modal (مطابقة للبطاقات)
const serviceToProjectType: Record<number, string> = {
  0: "personal",      // تطوير المواقع الشخصية
  1: "ecommerce",     // بناء المتاجر الإلكترونية
  2: "startup",       // تطبيقات Startup
  3: "branding",      // تجديد الهوية البصرية
  4: "community",     // مبادرة العطاء المجتمعي
};

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // State للـ Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [isInView, setIsInView] = useState(false); // للتحكم في ظهور شريط التقدم العمودي
  const [scrollProgress, setScrollProgress] = useState(0); // تقدم التمرير

  // فتح Modal مع الخدمة المختارة
  const openQuoteModal = (serviceIndex: number) => {
    soundEffects.playClick();
    setSelectedService(serviceToProjectType[serviceIndex] || "");
    setIsModalOpen(true);
  };

  // refs للعناصر
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const progressIndicatorRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // التأكد من وجود العناصر
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = cardsRefs.current;
    if (cards.length !== 5) return;

    // Horizontal Scroll Animation
    const container = cardsContainerRef.current;
    const section = sectionRef.current;

    // تحديد الاتجاه بناءً على اللغة
    const currentDir = i18n.dir();
    const isRTLDir = currentDir === "rtl";

    // إعداد الحاوية والبطاقات
    gsap.set(container, {
      display: "flex",
      flexDirection: "row",
      gap: "2rem",
      width: "100%",
      overflowX: "visible",
      x: 0, // إعادة تعيين الموقع عند تغيير اللغة
    });

    // حساب المسافة للتمرير بناءً على الاتجاه
    const scrollDistance = container.scrollWidth - container.offsetWidth;

    // تطبيق الأنيميشن الأفقي مع pin
    const horizontalScroll = gsap.to(container, {
      x: isRTLDir
        ? () => `+${scrollDistance}` // RTL: تمرير لليسار (موجب)
        : () => `-${scrollDistance}`, // LTR: تمرير لليمين (سالب)
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
        onRefresh: (self) => {
          scrollTriggerRef.current = self;
        },
        onUpdate: (self) => {
          // تحديث Progress Indicator
          if (progressIndicatorRef.current && progressLineRef.current) {
            const progress = self.progress;
            setScrollProgress(progress); // تحديث التقدم للشريط العمودي
            // تحريك الدائرة حسب اتجاه اللغة
            if (isRTLDir) {
              // RTL: من اليمين لليسار
              progressIndicatorRef.current.style.right = `${progress * 100}%`;
              progressIndicatorRef.current.style.left = 'auto';
            } else {
              // LTR: من اليسار لليمين
              progressIndicatorRef.current.style.left = `${progress * 100}%`;
              progressIndicatorRef.current.style.right = 'auto';
            }
            // تحديث عرض الخط المملوء
            progressLineRef.current.style.width = `${progress * 100}%`;
          }
        },
      },
    });

    scrollTriggerRef.current = horizontalScroll.scrollTrigger!;

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // تنظيف فوري ومتزامن قبل إلغاء التحميل
    return () => {
      window.removeEventListener("resize", handleResize);

      // إيقاف ScrollTrigger فوراً وإرجاع العناصر
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
        scrollTriggerRef.current = null;
      }

      if (horizontalScroll) {
        horizontalScroll.kill();
      }

      // إعادة تعيين جميع الأنماط بشكل متزامن
      if (container) {
        gsap.set(container, { clearProps: "all" });
      }

      if (section) {
        gsap.set(section, { clearProps: "all" });
      }
    };
  }, [i18n]); // إضافة i18n كـ dependency لإعادة التشغيل عند تغيير اللغة

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 bg-[#131829] relative overflow-x-hidden"
      id="services"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(0,217,255,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(108,92,231,0.03)_0%,transparent_50%)]"></div>
      </div>

      {/* Vertical Progress Indicator - يظهر فقط عندما يكون القسم مرئياً */}
      <div 
        className={`fixed top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2 transition-all duration-500 ${
          isRTL ? 'right-8' : 'left-8'
        } ${isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isRTL ? 'translate-x-8' : '-translate-x-8'}`}`}
      >
        {/* Progress Line Background */}
        <div className="relative h-40 w-1 bg-white/10 rounded-full overflow-hidden">
          {/* Active Progress */}
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00D9FF] to-[#6C5CE7] rounded-full transition-all duration-100 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        
        {/* Step Dots - 5 خدمات */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 flex flex-col justify-between py-0">
          {[0, 1, 2, 3, 4].map((index) => {
            const activeIndex = Math.floor(scrollProgress * 5);
            const isActive = index <= activeIndex;
            return (
              <div 
                key={index}
                className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-transparent scale-125' 
                    : 'border-white/30 bg-transparent'
                }`}
                style={{
                  backgroundColor: isActive ? (index % 2 === 0 ? '#00D9FF' : '#6C5CE7') : 'transparent',
                  boxShadow: index === activeIndex ? `0 0 15px ${index % 2 === 0 ? '#00D9FF' : '#6C5CE7'}` : 'none'
                }}
              />
            );
          })}
        </div>
        
        {/* Current Progress Percentage */}
        <div 
          className="mt-4 text-xl font-bold transition-all duration-300"
          style={{ color: scrollProgress > 0.5 ? '#6C5CE7' : '#00D9FF' }}
        >
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>

      <div className="container mx-auto px-4 xl:px-0 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 max-w-3xl mx-auto ${
            isRTL ? "" : ""
          }`}
        >
          <span className="inline-block px-6 py-2 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full text-[#00D9FF] font-semibold text-sm uppercase tracking-wider mb-4">
            {t("services.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t("services.title")}
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
              {" "}
              {t("services.highlight")}
            </span>
          </h2>
          <p className="text-[#A0AEC0] text-base sm:text-lg leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid - 6 خدمات في صف أفقي */}
        <div
          ref={cardsContainerRef}
          className={`relative mb-12 flex flex-nowrap !gap-20 overflow-visible ${
            isRTL ? "flex-row" : "flex-row"
          }`}
          style={{
            width: "100%",
            direction: isRTL ? "rtl" : "ltr", // تأكيد الاتجاه
          }}
        >
          {/* إزالة CSS القديم */}

          {/* Service 1 - المواقع الشخصية */}
          <div
            ref={(el) => (cardsRefs.current[0] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: "280px", willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Globe className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t("services.service1.title")}
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                {t("services.service1.description")}
              </p>
              <ul className="space-y-2 mb-5">
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service1.feature1")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service1.feature2")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service1.feature3")}</span>
                </li>
              </ul>
              <div
                className={`flex items-baseline mb-4 pt-4 border-t border-white/10 ${
                  isRTL ? "justify-between" : "justify-between flex-row-reverse"
                }`}
              >
                <span className="text-[#A0AEC0] text-xs">
                  {t("services.pricing.from")}
                </span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                  $300
                </span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => openQuoteModal(0)}
                  className={`w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] flex items-center justify-center gap-2 ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <span>{t("services.cta.quote")}</span>
                </button>
                <Link
                  to="https://websitemy.com/"
                  className={`w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <ExternalLink
                    className={`w-3.5 h-3.5 transition-transform ${
                      isRTL
                        ? "group-hover:translate-x-[-2px]"
                        : "group-hover:translate-x-[2px]"
                    }`}
                  />
                  <span>{t("services.cta.viewSample")}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 2 - المتاجر الإلكترونية (المميز) */}
          <div
            ref={(el) => (cardsRefs.current[1] = el)}
            className="service-card bg-[#1A1F3A] border-2 border-[#00D9FF] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,217,255,0.3)] group relative overflow-hidden shadow-[0_0_20px_rgba(0,217,255,0.15)] flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: "280px", willChange: "transform, opacity" }}
          >
            <div
              className={`absolute top-3 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,217,255,0.4)] ${
                isRTL ? "left-3" : "right-3"
              }`}
            >
              {t("services.service2.badge")}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-[#6C5CE7]/10"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <ShoppingCart className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t("services.service2.title")}
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                {t("services.service2.description")}
              </p>
              <ul className="space-y-2 mb-5">
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service2.feature1")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service2.feature2")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service2.feature3")}</span>
                </li>
              </ul>
              <div
                className={`flex items-baseline mb-4 pt-4 border-t border-white/10 ${
                  isRTL ? "justify-between" : "justify-between flex-row-reverse"
                }`}
              >
                <span className="text-[#A0AEC0] text-xs">
                  {t("services.pricing.from")}
                </span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                  $500
                </span>
              </div>
              <div className="space-y-2">
                <button onClick={() => openQuoteModal(1)} className="w-full py-3 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white rounded-lg text-sm font-semibold transition-all hover:shadow-[0_0_25px_rgba(0,217,255,0.6)]">
                  {t("services.cta.quote")}
                </button>
                <Link
                  to="https://camera-shop-teal.vercel.app/ar"
                  className={`w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <ExternalLink
                    className={`w-3.5 h-3.5 transition-transform ${
                      isRTL
                        ? "group-hover:translate-x-[-2px]"
                        : "group-hover:translate-x-[2px]"
                    }`}
                  />
                  <span>{t("services.cta.viewSample")}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 3 - تطبيقات Startup */}
          <div
            ref={(el) => (cardsRefs.current[2] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: "280px", willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Code className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t("services.service3.title")}
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                {t("services.service3.description")}
              </p>
              <ul className="space-y-2 mb-5">
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service3.feature1")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service3.feature2")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service3.feature3")}</span>
                </li>
              </ul>
              <div
                className={`flex items-baseline mb-4 pt-4 border-t border-white/10 ${
                  isRTL ? "justify-between" : "justify-between flex-row-reverse"
                }`}
              >
                <span className="text-[#A0AEC0] text-xs">
                  {t("services.pricing.from")}
                </span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                  $1,000
                </span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => openQuoteModal(2)}
                  className={`w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]`}
                >
                  {t("services.cta.quote")}
                </button>
                <Link
                  to="https://www.comprevende.com"
                  className={`w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <ExternalLink
                    className={`w-3.5 h-3.5 transition-transform ${
                      isRTL
                        ? "group-hover:translate-x-[-2px]"
                        : "group-hover:translate-x-[2px]"
                    }`}
                  />
                  <span>{t("services.cta.viewSample")}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 4 - تجديد الهوية البصرية */}
          <div
            ref={(el) => (cardsRefs.current[3] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: "280px", willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Palette className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t("services.service4.title")}
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                {t("services.service4.description")}
              </p>
              <ul className="space-y-2 mb-5">
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service4.feature1")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service4.feature2")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service4.feature3")}</span>
                </li>
              </ul>
              <div
                className={`flex items-baseline mb-4 pt-4 border-t border-white/10 ${
                  isRTL ? "justify-between" : "justify-between flex-row-reverse"
                }`}
              >
                <span className="text-[#A0AEC0] text-xs">
                  {t("services.pricing.from")}
                </span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                  $250
                </span>
              </div>
              <div className="space-y-2">
                <button onClick={() => openQuoteModal(3)} className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                  {t("services.cta.quote")}
                </button>
                <Link
                  to="https://www.arabiaswim.com"
                  className={`w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <ExternalLink
                    className={`w-3.5 h-3.5 transition-transform ${
                      isRTL
                        ? "group-hover:translate-x-[-2px]"
                        : "group-hover:translate-x-[2px]"
                    }`}
                  />
                  <span>{t("services.cta.viewSample")}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 5 - مبادرة العطاء المجتمعي */}
          <div
            ref={(el) => (cardsRefs.current[4] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: "280px", willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Heart className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t("services.service5.title")}
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                {t("services.service5.description")}
              </p>
              <ul className="space-y-2 mb-5">
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service5.feature1")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service5.feature2")}</span>
                </li>
                <li
                  className={`flex items-start gap-2 text-[#A0AEC0] text-xs ${
                    isRTL ? "flex-row" : "flex-row"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>{t("services.service5.feature3")}</span>
                </li>
              </ul>
              <div
                className={`flex items-baseline mb-4 pt-4 border-t border-white/10 ${
                  isRTL ? "justify-between" : "justify-between flex-row-reverse"
                }`}
              >
                <span className="text-[#A0AEC0] text-xs">
                  {t("services.pricing.free")}
                </span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                  $0
                </span>
              </div>
              <div className="space-y-2">
                <button onClick={() => openQuoteModal(4)} className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                  {t("services.cta.details")}
                </button>
                <Link
                  to="https://www.nationalsy.com/"
                  className={`w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group ${
                    isRTL ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <ExternalLink
                    className={`w-3.5 h-3.5 transition-transform ${
                      isRTL
                        ? "group-hover:translate-x-[-2px]"
                        : "group-hover:translate-x-[2px]"
                    }`}
                  />
                  <span>{t("services.cta.viewSample")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator - خط التقدم أسفل البطاقات */}
        <div className="relative mt-12 mx-auto max-w-[80%] hidden md:block">
          {/* الخط الخلفي (غير مملوء) */}
          <div className="h-[2px] bg-[#1A1F3A] rounded-full w-full relative">
            {/* الخط المملوء (يتقدم مع التمرير) */}
            <div
              ref={progressLineRef}
              className={`absolute top-0 h-full bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] rounded-full transition-none ${isRTL ? 'right-0' : 'left-0'}`}
              style={{ width: "0%" }}
            />
            
            {/* نقطة البداية */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.5)] ${isRTL ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} />
            
            {/* نقطة النهاية */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#6C5CE7]/30 border border-[#6C5CE7]/50 ${isRTL ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`} />
            
            {/* الدائرة المتحركة */}
            <div
              ref={progressIndicatorRef}
              className={`absolute top-1/2 -translate-y-1/2 transition-none ${isRTL ? 'translate-x-1/2' : '-translate-x-1/2'}`}
              style={{ [isRTL ? 'right' : 'left']: "0%" }}
            >
              {/* الدائرة الخارجية المتوهجة */}
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] shadow-[0_0_20px_rgba(0,217,255,0.6),0_0_40px_rgba(108,92,231,0.4)] animate-pulse" />
                {/* الدائرة الداخلية */}
                <div className="absolute inset-1 rounded-full bg-[#0A0E27]" />
                {/* النقطة المركزية */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Calculator Modal */}
      <CostCalculatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preSelectedService={selectedService}
      />
    </section>
  );
};

export default ServicesSection;
