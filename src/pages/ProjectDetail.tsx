import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Clock,
  Star,
  Code,
  Target,
  Zap,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getProjects } from "../data/projects";
import { Review } from "../types";
import ReviewSystem from "../components/UI/ReviewSystem";
import SEO from "../components/SEO/SEO";
import ProjectStructuredData from "../components/SEO/ProjectStructuredData";
import { trackProjectView } from "../components/Analytics/GoogleAnalytics";

const AnimatedCounter = ({ value, suffix = "", isFloat = false }: { value: number, suffix?: string, isFloat?: boolean }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(easeOut * value);
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value]);

  return <span>{isFloat ? count.toFixed(1) : Math.round(count)}{suffix}</span>;
};

const ProjectDetail = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const { id } = useParams<{ id: string }>();
  const [projects, setProjects] = useState(getProjects());
  const project = projects.find((p) => p.id === id);
  const [projectReviews, setProjectReviews] = useState<Review[]>(
    project?.reviews || []
  );

  // Update projects when language changes
  useEffect(() => {
    setProjects(getProjects());
  }, [i18n.language]);

  // التمرير لأعلى الصفحة عند فتح المشروع
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // تتبع زيارة المشروع
  useEffect(() => {
    if (project) {
      trackProjectView(project.id, project.title);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-bold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('projectDetail.notFound')}
          </h2>
          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {t('projectDetail.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  const handleAddReview = async (newReview: Omit<Review, "id" | "date">) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setProjectReviews([...projectReviews, review]);
  };

  // حساب متوسط التقييم
  const averageRating =
    projectReviews.length > 0
      ? projectReviews.reduce((sum, review) => sum + review.rating, 0) /
        projectReviews.length
      : project.rating;

  // بيانات SEO للمشروع
  const projectSEO = {
    title: `${project.title} ${t('projectDetail.seo.titleSuffix')}`,
    description: `${project.description}. ${t('projectDetail.seo.descriptionPrefix')} ${project.technologies.join(', ')} ${t('projectDetail.seo.descriptionDuration')} ${project.duration}. ${t('projectDetail.seo.descriptionRating')} ${averageRating.toFixed(1)}/5`,
    keywords: `${project.title}, ${project.technologies.join(', ')}, ${t('projectDetail.seo.descriptionPrefix')}, ${project.category}`,
    url: `/project/${project.id}`
  };

  return (
    <>
      <SEO {...projectSEO} />
      <ProjectStructuredData 
        project={project} 
        averageRating={averageRating} 
        reviewCount={projectReviews.length} 
      />
      
      <div className="min-h-screen pt-32 pb-20 lg:pt-40">
      <div className="container mx-auto px-4 lg:px-8 xl:px-0">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className={`inline-flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group`}
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
            <span>{t('projectDetail.backToHome')}</span>
          </Link>
        </motion.div>

        {/* Project Header - Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch ${isRTL ? 'lg:flex-row-reverse' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* Right/Left: Project Details */}
            <div className={`flex flex-col justify-between h-full py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight m-0">
                {project.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl m-0">
                {project.description}
              </p>

              <div className={`flex flex-wrap items-center gap-4 m-0 ${isRTL ? 'justify-start' : 'justify-start'}`}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(6,182,212,0.2)]`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{t('projectDetail.livePreview')}</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-8 py-3.5 bg-[#0F172A] text-white rounded-xl font-semibold hover:bg-gray-800 transition-all transform hover:-translate-y-1 hover:shadow-lg border border-gray-700/50`}
                  >
                    <Github className="w-5 h-5" />
                    <span>{t('projectDetail.sourceCode')}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Left/Right: Video Showcase */}
            {project.youtubeVideo && (
              <div className="relative w-full rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl shadow-cyan-500/10 group h-[300px] sm:h-[400px] md:h-[450px]">
                {/* Overlay for aesthetic framing */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/60 to-transparent pointer-events-none rounded-2xl z-10"></div>
                <iframe
                  className="absolute inset-0 w-full h-full z-0"
                  src={project.youtubeVideo}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </motion.div>

        {/* Project Overview (The Story) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-24"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className={`bg-gradient-to-br from-[#0F172A] to-gray-900 border border-gray-700/50 rounded-3xl p-8 md:p-10 shadow-lg ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className={`text-2xl font-bold text-white mb-6 flex items-center ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <Target className={`w-7 h-7 text-cyan-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
              {t('projectDetail.sections.overview')}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed font-medium">
              {project.fullDescription}
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="mb-24"
           dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="bg-[#0F172A]/40 border border-gray-700/50 rounded-3xl p-8 md:p-10">
            <h2 className={`text-2xl font-bold text-white mb-8 flex items-center ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <CheckCircle className={`w-7 h-7 text-green-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
              {t('projectDetail.sections.features')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8">
              {project.features.map((feature, index) => (
                <div key={index} className={`flex items-start ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-cyan-400/80" />
                  </div>
                  <span className={`text-gray-300 text-base leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Objectives & Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Objectives */}
          <div className="bg-[#0F172A]/50 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-colors">
            <h3 className={`text-2xl font-bold text-white mb-6 flex items-center ${isRTL ? 'text-right' : ''}`}>
              <Award className={`w-7 h-7 text-yellow-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
              {t('projectDetail.sections.objectives')}
            </h3>
            <ul className="space-y-4">
              {project.objectives.map((objective, index) => (
                <li key={index} className={`flex items-start ${isRTL ? 'text-right space-x-reverse' : ''} space-x-3`}>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2.5 flex-shrink-0"></div>
                  <span className={`text-gray-300 leading-relaxed max-w-[90%] ${isRTL ? 'text-right' : 'text-left'}`}>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="bg-[#0F172A]/50 border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
            <h3 className={`text-2xl font-bold text-white mb-6 flex items-center ${isRTL ? 'text-right' : ''}`}>
              <Zap className={`w-7 h-7 text-purple-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
              {t('projectDetail.sections.challenges')}
            </h3>
            <ul className="space-y-4">
              {project.challenges.map((challenge, index) => (
                <li key={index} className={`flex items-start ${isRTL ? 'text-right space-x-reverse' : ''} space-x-3`}>
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2.5 flex-shrink-0"></div>
                  <span className={`text-gray-300 leading-relaxed max-w-[90%] ${isRTL ? 'text-right' : 'text-left'}`}>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Technologies Used (Moved to bottom) */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="mb-24"
           dir={isRTL ? 'rtl' : 'ltr'}
        >
          <h2 className={`text-2xl font-bold text-white mb-6 flex items-center ${isRTL ? 'justify-start' : 'justify-start'}`}>
             <Code className={`w-7 h-7 text-cyan-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
             {t('projectDetail.sections.technologiesUsed')}
          </h2>
          <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-start' : 'justify-start'}`}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 bg-[#0F172A] border border-cyan-500/20 rounded-xl text-cyan-300 font-medium shadow-sm hover:border-cyan-500/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Title Outside */}
          <h2 className={`text-2xl font-bold text-white mb-6 flex items-center ${isRTL ? 'justify-start' : 'justify-start'}`}>
            <TrendingUp className={`w-7 h-7 text-cyan-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            {t('projectDetail.sections.stats')}
          </h2>

          {/* Minimalist Stats Container */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`flex flex-col justify-center ${isRTL ? 'text-right md:text-center' : 'text-left md:text-center'}`}>
              <div className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <div className="text-gray-400 font-medium text-lg">{t('projectDetail.stats.successRate')}</div>
            </div>

            <div className={`flex flex-col justify-center ${isRTL ? 'text-right md:text-center' : 'text-left md:text-center'} md:border-r border-gray-700/50`}>
              <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-2 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                <AnimatedCounter value={98} suffix="%" />
              </div>
              <div className="text-gray-400 font-medium text-lg">{t('projectDetail.stats.clientSatisfaction')}</div>
            </div>

            <div className={`flex flex-col justify-center ${isRTL ? 'text-right md:text-center' : 'text-left md:text-center'} md:border-r border-gray-700/50`}>
              <div className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-2 drop-shadow-[0_0_15px_rgba(192,132,252,0.3)]">
                24/7
              </div>
              <div className="text-gray-400 font-medium text-lg">{t('projectDetail.stats.support')}</div>
            </div>

            <div className={`flex flex-col justify-center ${isRTL ? 'text-right md:text-center' : 'text-left md:text-center'} md:border-r border-gray-700/50`}>
              <div className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                <AnimatedCounter value={Number(averageRating.toFixed(1))} isFloat={true} />
              </div>
              <div className="text-gray-400 font-medium text-lg">{t('projectDetail.stats.overallRating')}</div>
            </div>
          </div>
        </motion.div>

        {/* Review System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ReviewSystem
            onAddReview={handleAddReview}
            projectId={project.id}
          />
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default ProjectDetail;
