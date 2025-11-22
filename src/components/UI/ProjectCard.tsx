import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Project } from '../../types';
import LazyImage from './LazyImage';
import MicroInteractions from './MicroInteractions';
import { optimizeImage } from '../../utils/imageOptimization';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative w-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30"
    >
      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
      
      {/* Image Container - 70% of card */}
      <div className="relative overflow-hidden h-64 md:h-80">
        <LazyImage
          src={optimizeImage(project.image, 800, 600)}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Technologies - Show on Hover at Bottom Left */}
        <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 max-w-[80%]`}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-cyan-500/40 rounded-lg text-xs text-cyan-300 font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-cyan-500/40 rounded-lg text-xs text-cyan-300 font-medium">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Content - 30% of card */}
      <div className="p-5 md:p-6 space-y-4">
        {/* Title */}
        <MicroInteractions type="text">
          <h3 className={`text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {project.title}
          </h3>
        </MicroInteractions>

        {/* Description - 3 lines max */}
        <p className={`text-gray-400 text-sm md:text-base line-clamp-3 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className={`flex items-center gap-3 pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Live Preview Button */}
          {project.liveUrl && (
            <MicroInteractions type="button" intensity="medium">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 inline-flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''} px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 text-sm font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50`}
              >
                <Eye className="w-4 h-4" />
                <span>{isRTL ? 'معاينة مباشرة' : 'Live Preview'}</span>
              </a>
            </MicroInteractions>
          )}
          
          {/* View Details Button */}
          <MicroInteractions type="button" intensity="medium">
            <Link
              to={`/project/${project.id}`}
              className={`flex-1 inline-flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''} px-4 py-2.5 bg-gray-800/80 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-all transform hover:scale-105 text-sm font-semibold`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t('projects.card.viewDetails')}</span>
            </Link>
          </MicroInteractions>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-700 pointer-events-none rounded-3xl"></div>
    </motion.div>
  );
};

export default ProjectCard;