import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  CheckCircle,
  Globe,
  ShoppingCart,
  Code,
  FileText,
  Zap,
  Headphones,
  ExternalLink,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// تسجيل ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
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

    // إعداد الحاوية والبطاقات
    gsap.set(container, {
      display: 'flex',
      flexDirection: 'row',
      gap: '2rem',
      width: '100%',
      overflowX: 'visible',
    });

    // تطبيق الأنيميشن الأفقي مع pin (التمرير لليسار)
    const horizontalScroll = gsap.to(container, {
      x: () => +(container.scrollWidth - container.offsetWidth), // قيمة موجبة للتمرير لليسار في RTL
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: () => `+=${container.scrollWidth - container.offsetWidth}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
        onRefresh: (self) => {
          scrollTriggerRef.current = self;
        }
      },
    });

    scrollTriggerRef.current = horizontalScroll.scrollTrigger!;

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // تنظيف فوري ومتزامن قبل إلغاء التحميل
    return () => {
      window.removeEventListener('resize', handleResize);
      
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
        gsap.set(container, { clearProps: 'all' });
      }
      
      if (section) {
        gsap.set(section, { clearProps: 'all' });
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="max-sm:!py-4 py-24 bg-[#131829] relative overflow-x-hidden" 
      id="services"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(0,217,255,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(108,92,231,0.03)_0%,transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-block px-6 py-2 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full text-[#00D9FF] font-semibold text-sm uppercase tracking-wider mb-4">
            خدماتنا
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            حلول ويب متكاملة لنجاح أعمالك
          </h2>
          <p className="text-[#A0AEC0] text-lg leading-relaxed">
            نقدم خدمات تطوير ويب شاملة مصممة خصيصاً لتحقيق أهدافك التجارية
          </p>
        </div>

        {/* Services Grid - 6 خدمات في صف أفقي */}
        <div 
          ref={cardsContainerRef}
          className="relative mb-12 flex flex-nowrap !gap-20 overflow-visible" 
          style={{
            width: '100%',
          }}
        >
          {/* إزالة CSS القديم */}
          
          {/* Service 1 - المواقع الشخصية */}
          <div 
            ref={(el) => (cardsRefs.current[0] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: '280px', willChange: 'transform, opacity' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Globe className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                تطوير المواقع الشخصية
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                مواقع سريعة وآمنة تعكس هويتك المهنية وتبني ثقة عملائك
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>تصميم احترافي حسب هويتك</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>سرعة تحميل أقل من 2 ثانية</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>تحسين محركات البحث SEO</span>
                </li>
              </ul>
              <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-white/10">
                <span className="text-[#A0AEC0] text-xs">يبدأ من</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">$300</span>
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                  اطلب عرض سعر
                </button>
                <Link
                  to="https://websitemy.com/"
                  className="w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                  <span>شاهد محتوى مشابه</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 2 - المتاجر الإلكترونية (المميز) */}
          <div 
            ref={(el) => (cardsRefs.current[1] = el)}
            className="service-card bg-[#1A1F3A] border-2 border-[#00D9FF] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,217,255,0.3)] group relative overflow-hidden shadow-[0_0_20px_rgba(0,217,255,0.15)] flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: '280px', willChange: 'transform, opacity' }}
          >
            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,217,255,0.4)]">
              الأكثر طلباً
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-[#6C5CE7]/10"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <ShoppingCart className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                بناء المتاجر الإلكترونية
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                متاجر متكاملة تزيد مبيعاتك وتسهّل إدارة منتجاتك بسهولة
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>نظام إدارة متقدم</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>بوابات دفع آمنة ومتعددة</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>تقارير وتحليلات مفصلة</span>
                </li>
              </ul>
              <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-white/10">
                <span className="text-[#A0AEC0] text-xs">يبدأ من</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">$500</span>
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white rounded-lg text-sm font-semibold transition-all hover:shadow-[0_0_25px_rgba(0,217,255,0.6)]">
                  اطلب عرض سعر
                </button>
                <Link
                  to="https://camera-shop-teal.vercel.app/ar"
                  className="w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                  <span>شاهد محتوى مشابه</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 3 - تطبيقات Startup */}
          <div 
            ref={(el) => (cardsRefs.current[2] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: '280px', willChange: 'transform, opacity' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Code className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                تطبيقات Startup  
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                نحول فكرتك إلى تطبيق احترافي جاهز للانطلاق في السوق
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>تطوير MVP في 4-6 أسابيع</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>تصميم UX/UI عصري وجذاب</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>بنية تقنية قابلة للتوسع</span>
                </li>
              </ul>
              <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-white/10">
                <span className="text-[#A0AEC0] text-xs">يبدأ من</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">$1,000</span>
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                  اطلب عرض سعر
                </button>
                <Link
                  to="https://www.comprevende.com"
                  className="w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                  <span>شاهد محتوى مشابه</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 4 - لوحات التحكم */}
          <div 
            ref={(el) => (cardsRefs.current[3] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: '280px', willChange: 'transform, opacity' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <FileText className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                 تجديد الهوية البصرية 
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                نحدّث موقعك بتصميم عصري احترافي يعكس تطور علامتك التجارية
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>فريق متخصص في UI/UX</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>تحليل شامل للهوية الحالية</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>مراجعات متعددة حتى الرضا التام</span>
                </li>
              </ul>
              <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-white/10">
                <span className="text-[#A0AEC0] text-xs">يبدأ من</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">$250</span>
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                  اطلب عرض سعر
                </button>
                <Link
                  to="https://www.arabiaswim.com"
                  className="w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                  <span>شاهد محتوى مشابه</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 5 - تحسين الأداء */}
          <div 
            ref={(el) => (cardsRefs.current[4] = el)}
            className="service-card bg-[#1A1F3A] border border-[#00D9FF]/10 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00D9FF] hover:shadow-[0_10px_30px_rgba(0,217,255,0.2)] group relative overflow-hidden flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[calc(28%-1rem)]"
            style={{ minWidth: '280px', willChange: 'transform, opacity' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/5 to-[#6C5CE7]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border-2 border-[#00D9FF]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#00D9FF] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] transition-all">
                <Zap className="w-7 h-7 text-[#00D9FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                مبادرة العطاء المجتمعي
              </h3>
              <p className="text-[#A0AEC0] text-sm leading-relaxed mb-4">
                نقدم خدماتنا مجاناً للمؤسسات والجمعيات التي تخدم المجتمع
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>تطوير موقع مجاني</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>دعم فني لمدة 3 أشهر</span>
                </li>
                <li className="flex items-start gap-2 text-[#A0AEC0] text-xs">
                  <CheckCircle className="w-4 h-4 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                  <span>استضافة مجانية للسنة الأولى</span>
                </li>
              </ul>
              <div className="flex items-baseline justify-between mb-4 pt-4 border-t border-white/10">
                <span className="text-[#A0AEC0] text-xs"> مجانا</span>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">$0</span>
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-semibold transition-all hover:bg-gradient-to-r hover:from-[#00D9FF] hover:to-[#6C5CE7] hover:text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                  اطلب  التفاصيل
                </button>
                <Link
                  to="https://www.nationalsy.com/"
                  className="w-full py-2.5 flex items-center justify-center gap-2 text-[#A0AEC0] hover:text-[#00D9FF] text-xs font-medium transition-all group"
                >
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-[-2px] transition-transform" />
                  <span>شاهد محتوى مشابه</span>
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