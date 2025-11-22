import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Sparkles, Zap, Target } from "lucide-react";
import { getServiceCategories } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectTabs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const prefersReducedMotion = useReducedMotion();
  const [serviceCategories, setServiceCategories] = useState(
    getServiceCategories()
  );
  const [activeTab, setActiveTab] = useState("news");
  const projectsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const activeCategory = serviceCategories.find((cat) => cat.id === activeTab);
  const featuredProjects = activeCategory?.projects.slice(0, 3) || [];

  // Update categories when language changes
  useEffect(() => {
    setServiceCategories(getServiceCategories());
  }, [i18n.language]);

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Only animate floating elements, not the section entrance
    const floatingElements =
      backgroundRef.current?.querySelectorAll(".floating-element");
    if (floatingElements && floatingElements.length > 0) {
      gsap.to(floatingElements, {
        y: -15,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.8,
        force3D: true,
        transformOrigin: "center center",
      });
    }

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (projectsRef.current) {
      // GSAP Animation for projects with performance optimization
      const tl = gsap.timeline();

      tl.fromTo(
        projectsRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          force3D: true,
        }
      );

      // Interest card animation
      // Removed interest card animation since we no longer use it
    }
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      // Animate out current projects
      if (projectsRef.current) {
        gsap.to(projectsRef.current.children, {
          opacity: 0,
          y: -20,
          scale: 0.95,
          duration: 0.2,
          onComplete: () => {
            setActiveTab(tabId);
          },
          force3D: true,
        });
      } else {
        setActiveTab(tabId);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 relative overflow-hidden"
    >
      {/* Interactive Background */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
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
        <div className="floating-element absolute top-32 right-20 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl hidden md:flex items-center justify-center backdrop-blur-sm border border-cyan-500/30">
          <Sparkles className="md:w-8 md:h-8 w-4 h-4 text-cyan-400" />
        </div>

        <div className="floating-element absolute top-20 left-20 md:top-48 md:left-32 w-10 h-10 md:w-20 md:h-20 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl hidden md:flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
          <Zap className="w-5 h-5 md:w-10 md:h-10 text-purple-400" />
        </div>

        <div className="floating-element absolute bottom-40 right-40 w-14 h-14 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl hidden md:flex items-center justify-center backdrop-blur-sm border border-green-500/30">
          <Target className="w-7 h-7 text-green-400" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1288px] px-4 relative z-10 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center md:mb-16 mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {t("projectTabs.title")}
          </h2>
          <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto">
            {t("projectTabs.subtitle")}
          </p>
        </motion.div>

        {/* Tabs Navigation - Infinite Marquee */}
        <div className="mb-12 relative w-full overflow-hidden group">
          {/* Gradient Edges for smooth fade */}
          <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-${isRTL ? 'l' : 'r'} from-black via-black/90 to-transparent pointer-events-none`}></div>
          <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-${isRTL ? 'r' : 'l'} from-black via-black/90 to-transparent pointer-events-none`}></div>

          <motion.div
            className="flex gap-3 md:gap-4"
            style={{
              willChange: 'transform',
            }}
            animate={{
              x: isRTL ? ['0%', '50%'] : ['-50%', '0%'],
            }}
            transition={{
              duration: 17.5,
              ease: "linear",
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {[
              ...serviceCategories,
              ...serviceCategories,
            ].map((category, index) => (
              <button
                key={`${category.id}-${index}`}
                onClick={() => handleTabChange(category.id)}
                className={`relative px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                  activeTab === category.id
                    ? "text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25 scale-105"
                    : "text-gray-400 bg-gray-800/50 border border-gray-700 hover:text-cyan-300 hover:border-cyan-500/50"
                }`}
              >
                <span className="text-sm md:text-base lg:text-lg">
                  {category.title}
                </span>

                {activeTab === category.id && (
                  <motion.div
                    layoutId="activeTabMarquee"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl -z-10"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Category Header with View More Button */}
              <div
                className={`flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6 mx-auto max-w-[1288px]`}
              >
                <div className="flex-1">
                  <h3
                    className={`text-xl md:text-4xl font-bold text-white mb-4 text-center ${
                      isRTL ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    {activeCategory.title}
                  </h3>
                  <p
                    className={`text-gray-400 text-xs md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed text-center ${
                      isRTL ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    {activeCategory.description}
                  </p>
                </div>

                {/* View More Button - Always show if there are projects */}
                {activeCategory.projects.length > 0 && (
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <Link
                      to={`/projects?category=${activeCategory.id}`}
                      className={`inline-flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/50 rounded-xl hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400 transition-all duration-300 text-cyan-300 hover:text-cyan-200 group transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-semibold text-base md:text-lg">
                        {t("projectTabs.viewMore")} (
                        {activeCategory.projects.length})
                      </span>
                      <ArrowLeft
                        className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${
                          isRTL
                            ? "rotate-180 group-hover:-translate-x-1"
                            : "group-hover:translate-x-1"
                        }`}
                      />
                    </Link>
                  </div>
                )}
              </div>

              {/* Projects Layout - Optimized for different project counts */}
              <div className="mb-8">
                {featuredProjects.length > 0 && (
                  <div
                    ref={projectsRef}
                    className={`
                      mx-auto max-w-[1288px]
                      ${
                        featuredProjects.length === 1
                          ? "grid grid-cols-1 gap-6"
                          : featuredProjects.length === 2
                          ? "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
                          : featuredProjects.length === 3
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                      }
                    `}
                  >
                    {featuredProjects.map((project, index) => (
                      <div
                        key={`${activeCategory.id}-${project.id}`}
                        className="h-full w-full"
                      >
                        <ProjectCard project={project} index={index} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectTabs;
