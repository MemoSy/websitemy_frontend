import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  Zap,
  Target,
  Brain,
  Code,
  CheckCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import TypewriterText from "../components/UI/TypewriterText";
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

const Home = () => {
  const typewriterTexts = [" لا تدع منافسيك يسبقونك", "إبدأ الآن "];

  // State for animated counters
  const [counters, setCounters] = useState({
    experience: 0,
    satisfaction: 0,
    projects: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const currentProjectRef = useRef<HTMLDivElement>(null);

  // GSAP animations setup
  useEffect(() => {
    // Current Project Section Animation
    if (currentProjectRef.current) {
      // Set initial states
      gsap.set(".project-left", { x: -100, opacity: 0 });
      gsap.set(".project-right", { x: 100, opacity: 0 });
      gsap.set(".tech-card", { scale: 0.8, opacity: 0 });
      gsap.set(".feature-item", { y: 30, opacity: 0 });
      gsap.set(".progress-fill", { width: 0 });
      gsap.set(".floating-element", { scale: 0, rotation: 0 });

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
        duration: 1.2,
        ease: "power3.out",
      })
        .to(
          ".project-right",
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
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
            stagger: 0.1,
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
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          ".progress-fill",
          {
            width: "85%",
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
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

      // Continuous floating animation for background elements
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Animated counter function
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
            animateCounter(0, 90, 2500, (value) => {
              setCounters((prev) => ({ ...prev, satisfaction: value }));
            });

            // Animate projects counter (10+)
            animateCounter(0, 10, 3000, (value) => {
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
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
        <div className="container mx-auto px-4 text-center relative z-10 mt-40">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-5xl mx-auto space-y-20"
          >
            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-0 leading-tight md:h-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent block h-full">
                <TypewriterText
                  texts={typewriterTexts}
                  speed={150}
                  delay={2500}
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              افتح بابك للعالم … و خلّي مشروعك يبلّش صح ، و يوصل للعالمية نحن
              موجودين في شركة websitemy هدفنا نساعدك ضمن خطوات بسيطة وسعر منافس
              جداً
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link
                to="/projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 font-medium text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 gap-reverse">
                  <Sparkles className="w-5 h-5" />
                  <span>استكشف أعمالنا</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                to="/ai-chat"
                className="group relative px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105 font-medium text-lg backdrop-blur-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 gap-reverse">
                  <Brain className="w-5 h-5" />
                  <span>إسألني عن الأسعار</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </motion.div>

            {/* Animated Stats Cards */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
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
      <br />
      <br />

      {/* Current Development Project Section */}
      <section
        ref={currentProjectRef}
        className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
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

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-6">
            <h2 className="text-3xl md:text-4xl  lg:text-[44px] font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 md:mb-4">
              مشروع قيد التنفيذ
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col-reverse sm:flex-row gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
            {/* Left Section - Technologies & Features */}
            <div className="project-left space-y-6 lg:space-y-16 h-full w-full sm:w-[49%]">
              {/* Technologies Used */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 gap-reverse">
                  <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 flex-shrink-0" />
                  <span>التقنيات المستخدمة</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    {
                      name: "TypeScript",
                      color: "from-gray-700 to-black",
                      icon: "⚛️",
                      border: "border-gray-600",
                    },
                    {
                      name: "react.js",
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
                  ].map((tech, index) => (
                    <div
                      key={index}
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
                  {[
                    {
                      title: "واجهة مستخدم حديثة",
                      desc: "هوية بصرية مع تجربة مستخدم رائعة ",
                      icon: "🤖",
                    },
                    {
                      title: "بوابة الدفع الآمن",
                      desc: "تكامل مع بوابات دفع متعددة ومؤمنة",
                      icon: "💳",
                    },
                    {
                      title: "اضافة برامج علاجية ",
                      desc: "مقالات و برامج مخصصة مع تحليلات مفصلة",
                      icon: "📊",
                    },
                    {
                      title: "تجربة مستخدم متجاوبة",
                      desc: "تصميم متكيف مع جميع الأجهزة والشاشات",
                      icon: "📱",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
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
            </div>

            {/* Right Section - Project Preview & Progress + CTA */}
            <div className="project-right space-y-4 md:space-y-6 h-full flex flex-col mt-8 lg:mt-0 sm:w-[49%] w-full">
              {/* Project Preview */}
              <div className="relative space-y-4">
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700/50 overflow-hidden">
                  {/* Development Badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1 gap-reverse shadow-lg z-10">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                    <span>قيد التطوير</span>
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
                        أرابيا سويم للسباحة العلاجية
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
                      85%
                    </span>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full bg-gray-700/50 rounded-full h-3 md:h-4 mb-4 md:mb-6 overflow-hidden border border-gray-600/30">
                    <div className="progress-fill h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative shadow-lg">
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
                          01 يوليو 2025
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
                          45 يوم
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action - Now horizontally aligned */}
                <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm mt-auto">
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
            </div>
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
