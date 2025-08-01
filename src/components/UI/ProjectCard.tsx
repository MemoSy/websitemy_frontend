import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import LazyImage from './LazyImage';
import MicroInteractions from './MicroInteractions';
import { optimizeImage } from '../../utils/imageOptimization';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
    >
      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={optimizeImage(project.image, 800, 400)}
          alt={project.title}
          className="w-full h-48 transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 space-x-reverse bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-600">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-white">{project.rating}</span>
        </div>

        {/* Technology Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-white">{project.technologies[0]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <MicroInteractions type="text">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
              {project.title}
            </h3>
          </MicroInteractions>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <MicroInteractions key={tech} type="button" intensity="subtle">
              <span className="px-3 py-1 bg-gray-800/70 border border-gray-600 rounded-full text-xs text-gray-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300">
                {tech}
              </span>
            </MicroInteractions>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-gray-800/70 border border-gray-600 rounded-full text-xs text-gray-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Duration and View Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">
            مدة التنفيذ: {project.duration}
          </span>
          <MicroInteractions type="button" intensity="medium">
            <Link
              to={`/project/${project.id}`}
              data-cursor-text="عرض التفاصيل"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:scale-105 text-sm font-medium group/btn"
            >
              <span>عرض التفاصيل</span>
              <ExternalLink className="w-3 h-3 mr-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </MicroInteractions>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;