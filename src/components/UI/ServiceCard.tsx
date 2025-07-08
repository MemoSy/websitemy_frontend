import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceCategory } from '../../types';
import ProjectCard from './ProjectCard';

interface ServiceCardProps {
  service: ServiceCategory;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const featuredProjects = service.projects.slice(0, 2);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      {/* Service Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-6">
          <span className="text-2xl">{service.icon}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {service.title}
        </h2>
        <p className="text-xl text-cyan-300 mb-4">{service.subtitle}</p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {service.description}
        </p>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featuredProjects.map((project, projectIndex) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={projectIndex}
            />
          ))}
        </div>
      )}

      {/* View All Link */}
      {service.projects.length > 2 && (
        <div className="text-center">
          <Link
            to={`/projects?category=${service.id}`}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/50 rounded-xl hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 text-cyan-300 hover:text-cyan-200 group"
          >
            <span className="font-medium">عرض جميع المشاريع</span>
            <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </motion.section>
  );
};

export default ServiceCard;