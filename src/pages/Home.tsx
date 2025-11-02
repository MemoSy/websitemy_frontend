import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  Zap,
  Target,
  Code,
  CheckCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeroVideo from "../components/UI/HeroVideo";
import ProjectTabs from "../components/UI/ProjectTabs";
import TechSlider from "../components/UI/TechSlider";
import TestimonialsSection from "../components/UI/TestimonialsSection";
import SEO from "../components/SEO/SEO";
import StructuredData from "../components/SEO/StructuredData";
import {
  getOrganizationSchema,
  getWebSiteSchema,
} from "../utils/structuredData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CurrentProject = {
  id: string;
  shortTitle: string;
  name: string;
  status: string;
  progress: number;
  startDate: string;
  expectedDuration: string;
  tagline: string;
  technologies: Array<{
    name: string;
    color: string;
    icon: string;
    border: string;
  }>;
  features: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
};

const currentProjects: CurrentProject[] = [
  {
    id: "arabia-swim",
    shortTitle: "arabia-swim", 
    name: "أرابيا سويم للسباحة العلاجية",
    status: "قيد التطوير",
    progress: 93,
    startDate: "01 يوليو 2025",
    expectedDuration: "45 يوم",
    tagline: "منصة علاجية متكاملة",
    technologies: [
      {
        name: "TypeScript",
        color: "from-gray-700 to-black",
        icon: "⚛️",
        border: "border-gray-600",
      },
      {
        name: "React.js",
        color: "from-blue-600/20 to-blue-800/20",
        icon: "📘",
        border: "border-blue-500/30",
      },
      {
        name: "Tailwind CSS",
        color: "from-cyan-500/20 to-cyan-700/20",
        icon: "🎨",
        border: "border-cyan-500/30",
      },
      {
        name: "MongoDB",
        color: "from-green-600/20 to-green-800/20",
        icon: "🍃",
        border: "border-green-500/30",
      },
    ],
    features: [
      {
        title: "واجهة مستخدم حديثة",
        desc: "هوية بصرية مع تجربة مستخدم رائعة",
        icon: "🤖",
      },
      {
        title: "بوابة الدفع الآمن",
        desc: "تكامل مع بوابات دفع متعددة ومؤمنة",
        icon: "💳",
      },
      {
        title: "إدارة برامج علاجية",
        desc: "محتوى طبي مخصص مع تحليلات تفصيلية",
        icon: "📊",
      },
      {
        title: "دعم متعدد اللغات",
        desc: "ملاءمة كاملة للجمهور الإقليمي والعالمي",
        icon: "📱",
      },
    ],
  },
  {
    id: "wellness-hub",
    shortTitle: "comprevender",
    name: "منصة برازيلية تربط بين مقدم الخدمات والعملاء",
    status: "قيد التطوير",
    progress: 75,
    startDate: "15 أغسطس 2025",
    expectedDuration: "90 يوم",
    tagline: " منصة خدمية متكاملة",
    technologies: [
      {
        name: "Next.js",
        color: "from-gray-700 to-black",
        icon: "⚡",
        border: "border-gray-600",
      },
      {
        name: "TypeScript",
        color: "from-blue-600/20 to-blue-800/20",
        icon: "📘",
        border: "border-blue-500/30",
      },
      {
        name: "nest.JS",
        color: "from-cyan-500/20 to-cyan-700/20",
        icon: "🎯",
        border: "border-cyan-500/30",
      },
      {
        name: "mongoDB",
        color: "from-orange-500/20 to-red-500/20",
        icon: "🔥",
        border: "border-orange-500/30",
      },
    ],
 features: [
  {
    title: "نظام إشعارات ذكي",
    desc: "تنبيهات فورية لمقدمي الخدمة عند ورود طلبات مطابقة لتخصصهم",
    icon: "🔔",
  },
  {
    title: "فلترة عالمية متقدمة",
    desc: "بحث دقيق يربط العملاء بمقدمي الخدمة الأنسب لاحتياجاتهم",
    icon: "🎯",
  },
  {
    title: "تواصل مباشر وآمن",
    desc: "نظام محادثات خاص ومشفر بين العملاء ومقدمي الخدمة",
    icon: "💬",
  },
  {
    title: "أداء عالي وسرعة",
    desc: "منصة متكاملة بتقنيات حديثة لتجربة سلسة وسريعة",
    icon: "⚡",
  },
    ],
  },
  {
    id: "clinic-pro",
    shortTitle: " Alemni",
    name: "نظام  متكامل لإدارة المدارس",
    status: "قيد التطوير",
    progress: 60,
    startDate: "01 سبتمبر 2025",
    expectedDuration: "75 يوم",
    tagline: "  نظام إدارة مدارس شامل",
    technologies: [
      {
        name: "react.js",
        color: "from-emerald-500/20 to-emerald-700/20",
        icon: "🌿",
        border: "border-emerald-500/30",
      },
      {
        name: "TypeScript",
        color: "from-blue-600/20 to-blue-800/20",
        icon: "📘",
        border: "border-blue-500/30",
      },
      {
        name: "Tailwind CSS",
        color: "from-cyan-500/20 to-cyan-700/20",
        icon: "🎨",
        border: "border-cyan-500/30",
      },
      {
        name: "nest.JS",
        color: "from-indigo-500/20 to-blue-500/20",
        icon: "🗄️",
        border: "border-indigo-500/30",
      },
    ],
    features: [
  {
    title: "إنشاء واجبات بالذكاء الاصطناعي",
    desc: "رفع صورة من أي كتاب لتحليلها وإنشاء واجبات تفاعلية تلقائياً",
    icon: "🤖",
  },
  {
    title: "لوحة تحكم إدارية متقدمة",
    desc: "مراقبة شاملة في الوقت الفعلي وإرسال تقارير تلقائية للأهالي",
    icon: "🎛️",
  },
  {
    title: "نظام تواصل مرن",
    desc: "محادثات فردية وجماعية مع جدولة الحصص وتحديد المواقع",
    icon: "💬",
  },
  {
    title: "جدولة ذكية للحصص",
    desc: "تخطيط الحصص مسبقاً لأسابيع أو شهور مع تحديد الموقع والوقت",
    icon: "📅",
  },
    ],
  },
];

const Home = () => {

  // State for animated counters
  const [counters, setCounters] = useState({
    experience: 0,
    satisfaction: 0,
    projects: 0,
  });

  const [activeProjectId, setActiveProjectId] = useState(
    currentProjects[0].id
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const currentProjectRef = useRef<HTMLDivElement>(null);

  const activeProject =
    currentProjects.find((project) => project.id === activeProjectId) ??
    currentProjects[0];

  // GSAP animations setup
  useEffect(() => {
    // Skip heavy animations on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Skip animations if user prefers reduced motion
    }

    // Current Project Section Animation
    if (currentProjectRef.current) {
      // Set initial states with reduced complexity on mobile
      const animationDuration = isMobile ? 0.6 : 1.2;
      const staggerDelay = isMobile ? 0.05 : 0.1;

      gsap.set(".project-left", { x: -100, opacity: 0 });
      gsap.set(".project-right", { x: 100, opacity: 0 });
      gsap.set(".tech-card", { scale: 0.8, opacity: 0 });
      gsap.set(".feature-item", { y: 30, opacity: 0 });
      gsap.set(".progress-fill", { scaleX: 0, transformOrigin: "left center" });
      
      if (!isMobile) {
        gsap.set(".floating-element", { scale: 0, rotation: 0 });
      }

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentProjectRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate sections
      tl.to(".project-left", {
        x: 0,
        opacity: 1,
        duration: animationDuration,
        ease: "power3.out",
      })
        .to(
          ".project-right",
          {
            x: 0,
            opacity: 1,
            duration: animationDuration,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".tech-card",
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: staggerDelay,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .to(
          ".feature-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: staggerDelay * 1.5,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ".progress-fill",
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.6"
        );

      // Only add floating animations on desktop
      if (!isMobile) {
        tl.to(
          ".floating-element",
          {
            scale: 1,
            rotation: 360,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

        // Continuous floating animation for background elements (desktop only)
        gsap.to(".bg-float-1", {
          y: -20,
          x: 15,
          rotation: 10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".bg-float-2", {
          y: 25,
          x: -20,
          rotation: -15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".bg-float-3", {
          y: -15,
          x: 10,
          rotation: 8,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);  // Animated counter function
  const animateCounter = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void
  ) => {
    const startTime = Date.now();

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);

      callback(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate experience counter (3 years)
            animateCounter(0, 3, 2000, (value) => {
              setCounters((prev) => ({ ...prev, experience: value }));
            });

            // Animate satisfaction counter (90%)
            animateCounter(0, 85, 2500, (value) => {
              setCounters((prev) => ({ ...prev, satisfaction: value }));
            });

            // Animate projects counter (10+)
            animateCounter(0, 12, 3000, (value) => {
              setCounters((prev) => ({ ...prev, projects: value }));
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="relative">
      <SEO
        title="websitemy ➡ لتطوير الويب - شركة تطوير المواقع الإلكترونية"
        description="نحن في WebSiteMy متخصصون في تطوير المواقع الإلكترونية وتطبيقات الويب المتقدمة باستخدام أحدث التقنيات مثل React و TypeScript و NestJS. نحول أفكارك إلى واقع رقمي احترافي."
        keywords="تطوير مواقع, تطوير تطبيقات ويب, شركة برمجة, تصميم مواقع, React, TypeScript, NestJS, تطوير واجهات, برمجة مواقع, تطوير متاجر إلكترونية"
        url="/"
        image="/logo1.png"
      />
      <StructuredData data={[getOrganizationSchema(), getWebSiteSchema()]} />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pb-10">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          {/* Floating Icons */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-32 right-20 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-cyan-500/30"
          >
            <Sparkles className="md:w-8 md:h-8 w-4 h-4 text-cyan-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-20  left-20 md:top-48 md:left-32 w-10 h-10 md:w-20 md:h-20 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-purple-500/30"
          >
            <Zap className="w-5 h-5 md:w-10 md:h-10 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-40 right-40 w-14 h-14 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-500/30"
          >
            <Target className="w-7 h-7 text-green-400" />
          </motion.div>
        </div>

        {/* Hero Content */}
  <div className="mx-auto w-full max-w-[1288px] px-4 text-center relative z-10 mt-40 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto flex max-w-5xl flex-col items-center gap-16"
          >
            <HeroVideo />

            {/* Animated Stats Cards */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3"
            >
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-4xl font-bold text-cyan-400 mb-2 tabular-nums"
                  animate={{
                    textShadow: hasAnimated
                      ? "0 0 20px rgba(0, 212, 255, 0.5)"
                      : "none",
                  }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  +{counters.experience}
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  سنوات خبرة
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-4xl font-bold text-green-400 mb-2 tabular-nums"
                  animate={{
                    textShadow: hasAnimated
                      ? "0 0 20px rgba(16, 185, 129, 0.5)"
                      : "none",
                  }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                >
                  {counters.satisfaction}%
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  عملاء راضون
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-4xl font-bold text-purple-400 mb-2 tabular-nums"
                  animate={{
                    textShadow: hasAnimated
                      ? "0 0 20px rgba(168, 85, 247, 0.5)"
                      : "none",
                  }}
                  transition={{ duration: 0.5, delay: 3 }}
                >
                  +{counters.projects}
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  مشروع منجز
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center space-y-2"
            >
              <ArrowDown className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Slider Section */}
      <TechSlider />

      {/* Current Development Project Section */}
      <section
        ref={currentProjectRef}
        className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-20 md:opacity-30">
          {/* Animated gradient orbs */}
          <div className="bg-float-1 absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="bg-float-2 absolute bottom-16 right-8 md:bottom-32 md:right-16 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"></div>
          <div className="bg-float-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* <div className="floating-element absolute top-16 md:top-32 right-1/4 w-4 h-4 md:w-8 md:h-8 border-2 border-cyan-500/30 rotate-45 bg-cyan-500/10"></div> */}
          <div className="floating-element absolute bottom-20 md:bottom-40 left-1/4 w-3 h-3 md:w-6 md:h-6 rounded-full border-2 border-purple-500/30 bg-purple-500/10"></div>
          <div className="floating-element absolute top-1/2 right-10 md:right-20 w-2 h-2 md:w-4 md:h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rotate-45"></div>
        </div>

        <div className="mx-auto w-full max-w-[1288px] px-5 relative z-10 sm:px-8">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:-translate-y-3 md:text-4xl  lg:text-[44px] font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent py-2">
              مشاريع قيد التنفيذ
            </h2>
          </div>

          {/* Projects Tabs */}
          <div className="mx-auto flex w-full max-w-3xl gap-2 md:max-w-4xl md:gap-4 mb-8 md:mb-10">
            {currentProjects.map((project) => {
              const isActive = project.id === activeProjectId;
              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    if (!isActive) {
                      setActiveProjectId(project.id);
                    }
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    flex: isActive ? '2' : '1',
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className={`group relative flex flex-col items-end gap-1 overflow-hidden rounded-xl border px-3 py-2 text-xs md:px-5 md:py-3 md:text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
                    isActive
                      ? "border-cyan-500/60 bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-purple-500/20 text-white shadow-lg shadow-cyan-500/20"
                      : "border-gray-700/60 bg-gray-900/30 text-gray-300 hover:border-cyan-500/40 hover:text-white"
                  }`}
                  aria-pressed={isActive}
                  style={{ minWidth: '60px' }}
                >
                  <span className="font-semibold leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {project.shortTitle}
                  </span>
                  <span className={`text-[10px] md:text-xs text-gray-400 transition-all group-hover:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis w-full ${!isActive ? 'opacity-0 h-0' : 'opacity-100'}`}>
                    {project.tagline}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-3 md:inset-x-4 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"></span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col-reverse sm:flex-row gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
            {/* Left Section - Technologies & Features */}
            <motion.div
              key={`left-${activeProject.id}`}
              className="project-left space-y-6 lg:space-y-16 h-full w-full sm:w-[49%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Technologies Used */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 gap-reverse">
                  <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 flex-shrink-0" />
                  <span>التقنيات المستخدمة</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {activeProject.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className={`tech-card bg-gradient-to-r ${tech.color} backdrop-blur-sm rounded-xl p-3 md:p-4 border ${tech.border} hover:border-cyan-500/50 transition-all group cursor-default hover:scale-105`}
                    >
                      <div className="flex items-center gap-2 gap-reverse">
                        <span className="text-lg md:text-xl flex-shrink-0">
                          {tech.icon}
                        </span>
                        <span className="text-sm md:text-base text-white font-medium group-hover:text-cyan-300 transition-colors truncate">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 gap-reverse">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                  <span>الميزات الرئيسية</span>
                </h3>

                <div className="space-y-3 md:space-y-7">
                  {activeProject.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="feature-item bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-5 hover:border-purple-500/50 transition-all group hover:bg-gray-800/40"
                    >
                      <div className="flex items-start gap-3 md:gap-4 gap-reverse">
                        <div className="text-xl md:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold mb-1 md:mb-2 group-hover:text-cyan-300 transition-colors text-sm md:text-base">
                            {feature.title}
                          </h4>
                          <p className="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Section - Project Preview & Progress + CTA */}
            <motion.div
              key={`right-${activeProject.id}`}
              className="project-right space-y-4 md:space-y-6 h-full flex flex-col mt-8 lg:mt-0 sm:w-[49%] w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
            >
              {/* Project Preview */}
              <div className="relative space-y-4">
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700/50 overflow-hidden">
                  {/* Development Badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1 gap-reverse shadow-lg z-10">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                    <span>{activeProject.status}</span>
                  </div>

                  {/* Project Image */}
                  <div className="relative mb-4 md:mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600/50">
                    {/* Simulated Project Screenshot */}
                    <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                      {/* Browser-like header */}
                      <div className="bg-gray-800 p-2 md:p-3 border-b border-gray-700">
                        <div className="flex items-center gap-1 md:gap-2 gap-reverse">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full shadow-sm"></div>
                          <div className="flex-1 bg-gray-700 rounded ml-2 mr-2 md:ml-4 md:mr-4 px-2 md:px-3 py-0.5 md:py-1">
                            <div className="h-1.5 md:h-2 bg-gray-600 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>

                      {/* Mock website content */}
                      <div className="p-3 md:p-6 space-y-2 md:space-y-4">
                        {/* Header section */}
                        <div className="flex items-center justify-between">
                          <div className="h-4 md:h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded w-1/3 shadow-lg"></div>
                          <div className="flex gap-1 md:gap-2 gap-reverse">
                            <div className="w-4 h-4 md:w-8 md:h-8 bg-gray-700 rounded"></div>
                            <div className="w-4 h-4 md:w-8 md:h-8 bg-gray-700 rounded"></div>
                          </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-2 md:gap-4 gap-reverse">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="h-2 md:h-3 bg-gray-700 rounded w-8 md:w-16"
                            ></div>
                          ))}
                        </div>

                        {/* Main content area */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-3 md:mt-6">
                          <div className="md:col-span-2 space-y-2 md:space-y-3">
                            <div className="h-2 md:h-4 bg-gray-700 rounded w-full"></div>
                            <div className="h-2 md:h-4 bg-gray-700 rounded w-4/5"></div>
                            <div className="h-8 md:h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded border border-cyan-500/30 mt-2 md:mt-4"></div>
                          </div>
                          <div className="space-y-1 md:space-y-2 mt-2 md:mt-0">
                            <div className="h-6 md:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded border border-purple-500/30"></div>
                            <div className="h-6 md:h-12 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded border border-green-500/30"></div>
                            <div className="h-6 md:h-12 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded border border-pink-500/30"></div>
                          </div>
                        </div>

                        {/* Cards section */}
                        <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-6">
                          <div className="h-8 md:h-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded border border-cyan-500/20 flex items-center justify-center">
                            <div className="w-4 h-4 md:w-8 md:h-8 bg-cyan-500/30 rounded"></div>
                          </div>
                          <div className="h-8 md:h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded border border-purple-500/20 flex items-center justify-center">
                            <div className="w-4 h-4 md:w-8 md:h-8 bg-purple-500/30 rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* Loading overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Additional project info */}
                  <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-400/40 rounded-lg border border-gray-700/30">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-400">اسم المشروع:</span>
                      <span className="text-white font-medium">
                        {activeProject.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-white font-semibold text-sm md:text-base">
                      مستوى التقدم
                    </span>
                    <span className="text-cyan-400 font-bold text-xl md:text-2xl">
                      {activeProject.progress}%
                    </span>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full bg-gray-700/50 rounded-full h-3 md:h-4 mb-4 md:mb-6 overflow-hidden border border-gray-600/30">
                    <div
                      className="progress-fill h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative shadow-lg"
                      style={{ width: `${activeProject.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse opacity-60"></div>
                      <div className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>

                  {/* Timeline Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm">
                    <div className="flex items-center gap-2 md:gap-3 gap-reverse text-gray-300">
                      <div className="p-1.5 md:p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30 flex-shrink-0">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-gray-400 text-xs mb-0.5 md:mb-1">
                          تاريخ البدء
                        </div>
                        <div className="font-medium text-white text-xs md:text-sm">
                          {activeProject.startDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 gap-reverse text-gray-300">
                      <div className="p-1.5 md:p-2 bg-green-500/20 rounded-lg border border-green-500/30 flex-shrink-0">
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-gray-400 text-xs mb-0.5 md:mb-1">
                          المدة المتوقعة
                        </div>
                        <div className="font-medium text-white text-xs md:text-sm">
                          {activeProject.expectedDuration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action - Now horizontally aligned - Hidden on mobile */}
                <div className="hidden md:block bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm mt-auto">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-2 text-base md:text-lg">
                        مهتم بمشروع مماثل؟
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm mb-0 sm:mb-4">
                        تواصل معنا لمناقشة مشروعك وتحويل فكرتك إلى واقع رقمي
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-full sm:w-auto sm:mr-4">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center w-full sm:w-auto gap-2 gap-reverse bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all text-xs md:text-sm font-medium hover:scale-105 transform shadow-lg hover:shadow-cyan-500/25"
                      >
                        <span>تواصل معنا</span>
                        <ArrowDown className="w-3 h-3 md:w-4 md:h-4 rotate-[-45deg]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Tabs Section */}
      <ProjectTabs />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default Home;
