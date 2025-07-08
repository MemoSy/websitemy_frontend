import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const TechSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseDirection, setMouseDirection] = useState<"left" | "right" | null>(
    null
  );
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const technologies: TechItem[] = [
    { name: "Next.js", icon: "/nextjs.svg", color: "from-gray-800 to-black" },
    { name: "Nest.js", icon: "/nestjs.svg", color: "from-red-500 to-pink-500" },
    { name: "Git", icon: "/git.svg", color: "from-orange-500 to-red-500" },
    {
      name: "Node.js",
      icon: "/nodejs.svg",
      color: "from-yellow-400 to-orange-500",
    },
    { name: "CSS", icon: "/css.svg", color: "from-purple-500 to-indigo-500" },
    { name: "HTML", icon: "/html.svg", color: "from-orange-400 to-red-500" },

    {
      name: "MongoDB",
      icon: "/mongodb.svg",
      color: "from-green-500 to-green-700",
    },
    {
      name: "TypeScript",
      icon: "/typescript.svg",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Tailwind",
      icon: "/tailwind.svg",
      color: "from-cyan-400 to-teal-500",
    },
    {
      name: "React.js",
      icon: "/reactjs.svg",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "JavaScript",
      icon: "/javascript.svg",
      color: "from-yellow-400 to-yellow-600",
    },
  ];

  // تكرار التقنيات لضمان الحركة المستمرة
  const duplicatedTechs = [...technologies];

  useEffect(() => {
    if (sliderRef.current) {
      // إعداد الحركة الأساسية
      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth; // قسمة على 3 لأننا كررنا المصفوفة 3 مرات

      animationRef.current = gsap.to(slider, {
        x: -totalWidth,
        duration: 15,
        ease: "none",
        repeat: -1,
        paused: false,
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current || !animationRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const mouseX = e.clientX;

    if (mouseX < centerX) {
      setMouseDirection("left");
      // تسريع الحركة لليسار
      animationRef.current.timeScale(2);
    } else {
      setMouseDirection("right");
      // إبطاء الحركة أو عكسها لليمين
      animationRef.current.timeScale(-1);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseDirection(null);
    if (animationRef.current) {
      // العودة للسرعة الطبيعية
      animationRef.current.timeScale(1);
    }
  };

  return (
    <section className="py-16 overflow-hidden md:inline-block hidden">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            التقنيات التي نتقنها
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نستخدم أحدث التقنيات والأدوات لضمان تقديم حلول متطورة وعالية الجودة
          </p>
        </motion.div>
      </div>

      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Tech Slider */}
        <div
          ref={sliderRef}
          className="flex items-center gap-16 cursor-pointer"
          style={{ width: "max-content" }}
        >
          {duplicatedTechs.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className={`flex-shrink-0 group relative`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-700 group-hover:border-cyan-500/50`}
              >
                <img
                  src={`/images${tech.icon}`}
                  alt={tech.name}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>

              {/* Tech Name Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium border border-gray-700 whitespace-nowrap">
                  {tech.name}
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Control Indicators */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                mouseDirection === "left" ? "bg-cyan-400" : "bg-gray-600"
              }`}
            ></div>
            <span className="text-white text-sm">تحكم بالماوس</span>
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                mouseDirection === "right" ? "bg-cyan-400" : "bg-gray-600"
              }`}
            ></div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechSlider;
