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
  const [activeTab, setActiveTab] = useState("saas");
  const projectsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const activeCategory = serviceCategories.find((cat) => cat.id === activeTab);
  const totalProjectsCount = serviceCategories.reduce(
    (acc, cat) => acc + (cat.projects?.length || 0),
    0
  );
  const featuredProjects = (() => {
    if (!activeCategory) return [];

    if (activeCategory.id !== "saas") {
      return activeCategory.projects.slice(0, 3);
    }

    // Featured Startup projects - displayed in this specific order
    const featuredStartupIds = [
      "comprevende",
      "daftar-smart-ledger",
      "alimni-platform",
    ];

    const startupProjects = featuredStartupIds
      .map((id) => activeCategory.projects.find((project) => project.id === id))
      .filter(
        (project): project is NonNullable<typeof project> => Boolean(project)
      );

    return startupProjects.slice(0, 3);
  })();

  // Update categories when language changes
  useEffect(() => {
    setServiceCategories(getServiceCategories());
  }, [i18n.language]);



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
      id="projects"
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

      <div className="mx-auto w-full max-w-[1400px] px-4 relative z-10 xl:px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center md:mb-16 mb-10"
        >
          {/* Eyebrow Total Projects Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0E27]/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-4 shadow-[0_0_20px_rgba(0,217,255,0.15)] backdrop-blur-md hover:border-cyan-400/50 transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00D9FF]"></span>
            </span>
            <span className="tracking-wide">
              {t("projectTabs.totalBadge", { count: totalProjectsCount })}
            </span>
          </div>

          {/* Section Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent pt-1 pb-3 leading-snug tracking-tight">
            {t("projectTabs.title")}
          </h2>

          {/* Section Subtitle - Hidden on mobile */}
          <p className="hidden md:block text-sm md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("projectTabs.subtitle")}
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mb-8 md:mb-12 relative w-full">
          <div className="hidden lg:flex w-full items-center justify-between gap-3 xl:gap-4 mb-12">
            {/* Desktop View - Show all tabs without arrows */}
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.id)}
                className={`group relative flex-1 min-w-0 px-3 py-2.5 xl:px-4 xl:py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between gap-2 text-xs sm:text-sm lg:text-base ${
                  activeTab === category.id
                    ? "text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25 scale-100"
                    : "text-gray-400 bg-gray-800/50 border border-gray-700 hover:text-cyan-300 hover:border-cyan-500/50 hover:scale-[1.02]"
                }`}
              >
                <span className="truncate font-semibold">{category.title}</span>
                <span
                  className={`flex-shrink-0 text-[11px] lg:text-xs font-black px-2.5 py-0.5 rounded-full transition-all duration-300 ${
                    activeTab === category.id
                      ? "bg-[#0A0E27]/90 text-cyan-200 border border-cyan-300/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
                      : "bg-gray-900/80 text-gray-400 border border-gray-700/60 group-hover:text-cyan-300 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10"
                  }`}
                >
                  {category.projects?.length || 0}
                </span>

                {activeTab === category.id && (
                  <motion.div
                    layoutId="activeTab"
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
          </div>

          {/* Mobile View - Full-bleed Swipeable Tabs with Edge Fades */}
          <div className="lg:hidden relative w-full overflow-hidden">
            {/* Left Edge Fade Mask */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-black via-black/50 to-transparent" />

            {/* Right Edge Fade Mask */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-black via-black/50 to-transparent" />

            {/* Tabs Container */}
            <div
              ref={tabsContainerRef}
              className="w-full overflow-x-auto scrollbar-hide py-2 px-4 touch-pan-x"
              style={{
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="flex gap-2.5 px-2 py-1 min-w-max items-center">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={(e) => {
                      handleTabChange(category.id);
                      e.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }}
                    className={`group relative px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm flex items-center gap-2 ${
                      activeTab === category.id
                        ? "text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25 scale-100"
                        : "text-gray-400 bg-gray-800/60 border border-gray-700/70 hover:text-cyan-300 hover:border-cyan-500/40"
                    }`}
                  >
                    <span>{category.title}</span>
                    <span
                      className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full transition-all duration-300 ${
                        activeTab === category.id
                          ? "bg-[#0A0E27]/90 text-cyan-200 border border-cyan-300/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
                          : "bg-gray-900/80 text-gray-400 border border-gray-700/60 group-hover:text-cyan-300 group-hover:border-cyan-500/20"
                      }`}
                    >
                      {category.projects?.length || 0}
                    </span>

                    {activeTab === category.id && (
                      <motion.div
                        layoutId="activeTabMobile"
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
              </div>
            </div>
          </div>
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
                className={`flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 md:mb-12 gap-4 md:gap-6 mx-auto max-w-[1400px]`}
              >
                <div className="flex-1">
                  <h3
                    className={`text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-center ${
                      isRTL ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    {activeCategory.title}
                  </h3>
                  <p
                    className={`hidden md:block text-gray-400 text-xs md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed text-center ${
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
                      mx-auto max-w-[1400px]
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
