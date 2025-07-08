import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Target, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import TypewriterText from '../components/UI/TypewriterText';
import ProjectTabs from '../components/UI/ProjectTabs';
import TechSlider from '../components/UI/TechSlider';
import TestimonialsSection from '../components/UI/TestimonialsSection';

const Home = () => {
  const typewriterTexts = [
    ' WebSiteMy',
    'نحن نبدع لأجلك'
  ];

  // State for animated counters
  const [counters, setCounters] = useState({
    experience: 0,
    satisfaction: 0,
    projects: 0
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animated counter function
  const animateCounter = (start: number, end: number, duration: number, callback: (value: number) => void) => {
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
            
            // Animate experience counter (5 years)
            animateCounter(0, 5, 2000, (value) => {
              setCounters(prev => ({ ...prev, experience: value }));
            });

            // Animate satisfaction counter (98%)
            animateCounter(0, 98, 2500, (value) => {
              setCounters(prev => ({ ...prev, satisfaction: value }));
            });

            // Animate projects counter (150+)
            animateCounter(0, 150, 3000, (value) => {
              setCounters(prev => ({ ...prev, projects: value }));
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
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
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
              repeatType: "reverse"
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
              repeatType: "reverse"
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
              repeatType: "reverse"
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
              نحن فريق من المطورين المبدعين والمصممين المتميزين، نتخصص في إنشاء حلول تقنية مبتكرة
              ومواقع ويب احترافية تترك أثراً لا يُمحى لدى المستخدمين
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
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
                  <Sparkles className="w-5 h-5" />
                  <span>استكشف أعمالنا</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link
                to="/ai-chat"
                className="group relative px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105 font-medium text-lg backdrop-blur-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 space-x-reverse">
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
                    textShadow: hasAnimated ? "0 0 20px rgba(0, 212, 255, 0.5)" : "none"
                  }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  +{counters.experience}
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">سنوات خبرة</div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-green-400 mb-2 tabular-nums"
                  animate={{ 
                    textShadow: hasAnimated ? "0 0 20px rgba(16, 185, 129, 0.5)" : "none"
                  }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                >
                  {counters.satisfaction}%
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">عملاء راضون</div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-purple-400 mb-2 tabular-nums"
                  animate={{ 
                    textShadow: hasAnimated ? "0 0 20px rgba(168, 85, 247, 0.5)" : "none"
                  }}
                  transition={{ duration: 0.5, delay: 3 }}
                >
                  +{counters.projects}
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">مشروع منجز</div>
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

      {/* Projects Tabs Section */}
      <ProjectTabs />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default Home;