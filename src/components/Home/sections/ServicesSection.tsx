import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Globe,
  ShoppingCart,
  Code,
  FileText,
  Zap,
  ExternalLink,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // refs للعناصر
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

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
        onRefresh: (self) => {
          scrollTriggerRef.current = self;
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
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
                <button className="w-full py-3 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white rounded-lg text-sm font-semibold transition-all hover:shadow-[0_0_25px_rgba(0,217,255,0.6)]">
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

          {/* Service 4 - لوحات التحكم */}
          <div
            ref={(el) => (cardsRefs.current[3] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: "280px", willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <FileText className="w-7 h-7 text-[#00D9FF]" />
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
                <button className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
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

          {/* Service 5 - تحسين الأداء */}
          <div
            ref={(el) => (cardsRefs.current[4] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: "280px", willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Zap className="w-7 h-7 text-[#00D9FF]" />
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
                <button className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
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
      </div>
    </section>
  );
};

export default ServicesSection;
