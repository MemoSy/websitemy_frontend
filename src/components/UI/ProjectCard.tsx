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
      className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={optimizeImage(project.image, 800, 400)}
          alt={project.title}
          className="w-full h-48 transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <MicroInteractions type="text">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
          </MicroInteractions>
          <div className="flex items-center space-x-1 space-x-reverse text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{project.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <MicroInteractions key={tech} type="button" intensity="subtle">
              <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-300 hover:border-cyan-500/50 transition-colors">
                {tech}
              </span>
            </MicroInteractions>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Duration and View Button */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            مدة التنفيذ: {project.duration}
          </span>
          <MicroInteractions type="button" intensity="medium">
            <Link
              to={`/project/${project.id}`}
              data-cursor-text="عرض التفاصيل"
              className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:scale-105 text-sm font-medium"
            >
              عرض التفاصيل
            </Link>
          </MicroInteractions>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;