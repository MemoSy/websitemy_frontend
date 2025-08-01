import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Zap, Target, Brain } from 'lucide-react';
import { serviceCategories } from '../../data/projects';
import ProjectCard from './ProjectCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
  const projectsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const interestCardRef = useRef<HTMLDivElement>(null);

  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);
  const featuredProjects = activeCategory?.projects.slice(0, 2) || [];

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Only animate floating elements, not the section entrance
    const floatingElements = backgroundRef.current?.querySelectorAll('.floating-element');
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
        transformOrigin: "center center"
      });
    }

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (projectsRef.current) {
      // GSAP Animation for projects with performance optimization
      const tl = gsap.timeline();
      
      tl.fromTo(projectsRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          force3D: true
        }
      );

      // Interest card animation
      if (interestCardRef.current) {
        gsap.fromTo(interestCardRef.current,
          { opacity: 0, x: 30, scale: 0.95 },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1, 
            duration: 0.4, 
            delay: 0.1, 
            ease: "power2.out",
            force3D: true
          }
        );
      }
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
          force3D: true
        });
      } else {
        setActiveTab(tabId);
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
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
        <div className="floating-element absolute top-32 right-20 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-cyan-500/30">
          <Sparkles className="md:w-8 md:h-8 w-4 h-4 text-cyan-400" />
        </div>

        <div className="floating-element absolute top-20 left-20 md:top-48 md:left-32 w-10 h-10 md:w-20 md:h-20 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
          <Zap className="w-5 h-5 md:w-10 md:h-10 text-purple-400" />
        </div>

        <div className="floating-element absolute bottom-40 right-40 w-14 h-14 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-500/30">
          <Target className="w-7 h-7 text-green-400" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            نقدم حلول تقنية شاملة تلبي جميع احتياجاتك الرقمية
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          ref={tabsRef}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.id)}
                className={`relative px-3 py-1.5 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 md:w-fit transform hover:scale-105 ${
                  activeTab === category.id
                    ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25'
                    : 'text-gray-400 bg-gray-800/50 border border-gray-700 hover:text-cyan-300 hover:border-cyan-500/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-base md:text-lg">{category.icon}</span>
                  <span className='text-[14px] md:text-[16px]'>{category.title}</span>
                </span>
                
                {activeTab === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

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
              {/* Category Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {activeCategory.title}
                </h3>
                {/* <p className="text-xl text-cyan-300 mb-4 md:flex hidden">{activeCategory.subtitle}</p> */}
                <p className="text-gray-400 max-w-2xl mx-auto">
                  {activeCategory.description}
                </p>
              </div>

              {/* Projects and Interest Card Layout - Fixed spacing */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Featured Projects */}
                {featuredProjects.length > 0 && (
                  <div ref={projectsRef} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredProjects.map((project, index) => (
                      <div key={`${activeCategory.id}-${project.id}`} className="h-full">
                        <ProjectCard
                          project={project}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* View More Button */}
              {activeCategory.projects.length > 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <Link
                    to={`/projects?category=${activeCategory.id}`}
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/50 rounded-xl hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 text-cyan-300 hover:text-cyan-200 group transform hover:scale-105"
                  >
                    <span className="font-medium">عرض جميع المشاريع ({activeCategory.projects.length})</span>
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectTabs;