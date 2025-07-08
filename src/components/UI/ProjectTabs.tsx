import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { serviceCategories } from '../../data/projects';
import ProjectCard from './ProjectCard';
import { gsap } from 'gsap';

const   ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
  const projectsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);
  const featuredProjects = activeCategory?.projects.slice(0, 2) || [];

  useEffect(() => {
    if (projectsRef.current) {
      // GSAP Animation for projects
      gsap.fromTo(
        projectsRef.current.children,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out"
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
          y: -30,
          scale: 0.95,
          duration: 0.3,
          onComplete: () => {
            setActiveTab(tabId);
          }
        });
      } else {
        setActiveTab(tabId);
      }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.id)}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 w-full md:w-fit transform hover:scale-105 ${
                  activeTab === category.id
                    ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25'
                    : 'text-gray-400 bg-gray-800/50 border border-gray-700 hover:text-cyan-300 hover:border-cyan-500/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.title}</span>
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
              transition={{ duration: 0.3 }}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className=" md:inline-flex hidden items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-6">
                  <span className="text-2xl">{activeCategory.icon}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {activeCategory.title}
                </h3>
                <p className="text-xl text-cyan-300 mb-4 md:flex hidden">{activeCategory.subtitle}</p>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  {activeCategory.description}
                </p>
              </div>

              {/* Featured Projects */}
              {featuredProjects.length > 0 && (
                <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {featuredProjects.map((project, index) => (
                    <div key={`${activeCategory.id}-${project.id}`}>
                      <ProjectCard
                        project={project}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* View More Button */}
              {activeCategory.projects.length > 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
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