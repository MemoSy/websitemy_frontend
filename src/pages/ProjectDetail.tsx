import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Clock,
  Star,
  Calendar,
  Code,
  Target,
  Zap,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { Review } from "../types";
import ImageGallery from "../components/UI/ImageGallery";
import ReviewSystem from "../components/UI/ReviewSystem";
import SEO from "../components/SEO/SEO";
import ProjectStructuredData from "../components/SEO/ProjectStructuredData";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [projectReviews, setProjectReviews] = useState<Review[]>(
    project?.reviews || []
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            المشروع غير موجود
          </h2>
          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            العودة للرئيسية
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
    title: `${project.title} - مشروع تطوير ويب احترافي | WebSiteMy`,
    description: `${project.description}. مشروع مطور باستخدام ${project.technologies.join(', ')} في مدة ${project.duration}. تقييم العملاء: ${averageRating.toFixed(1)}/5`,
    keywords: `${project.title}, ${project.technologies.join(', ')}, تطوير ويب, برمجة, ${project.category}, مشاريع برمجة`,
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
      
      <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>العودة للرئيسية</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-6 lg:mt-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>معاينة مباشرة</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  <span>الكود المصدري</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Meta */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">مدة التنفيذ</span>
              </div>
              <span className="text-xl font-semibold text-white">
                {project.duration}
              </span>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-400">التقييم</span>
              </div>
              <span className="text-xl font-semibold text-white">
                {averageRating.toFixed(1)}/5
              </span>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-2">
                <Code className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">التقنيات</span>
              </div>
              <span className="text-xl font-semibold text-white">
                {project.technologies.length}
              </span>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-3 mb-2">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">التقييمات</span>
              </div>
              <span className="text-xl font-semibold text-white">
                {projectReviews.length}
              </span>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              التقنيات المستخدمة
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-cyan-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">الفيديو</h2>
          <iframe
            className="w-full md:w-[660px] h-64 md:h-96 rounded-2xl border border-gray-700"
            src={project.youtubeVideo}
            title="YouTube video player"
            allow="accelerometer; 
                  autoplay; 
                  clipboard-write; 
                  encrypted-media; 
                  gyroscope; 
                  picture-in-picture; 
                  web-share"
          ></iframe>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Description */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Target className="w-6 h-6 text-cyan-400 mr-3" />
                نظرة عامة
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {project.fullDescription}
              </p>

              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                الميزات الرئيسية
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectives and Challenges */}
            <div className="space-y-8">
              {/* Objectives */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 text-yellow-400 mr-3" />
                  الأهداف
                </h3>
                <ul className="space-y-3">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Zap className="w-6 h-6 text-purple-400 mr-3" />
                  التحديات
                </h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-400 mr-3" />
              إحصائيات المشروع
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  100%
                </div>
                <div className="text-gray-400">معدل النجاح</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  98%
                </div>
                <div className="text-gray-400">رضا العميل</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-400">الدعم الفني</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="text-gray-400">التقييم العام</div>
              </div>
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
