import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SEO 
        title={t('notFound.seo.title')}
        description={t('notFound.seo.description')}
        noIndex={true}
        url="/404"
      />
      
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <motion.h1 
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            404
          </motion.h1>
          
          {/* Message */}
          <h2 className={`text-2xl md:text-3xl font-bold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('notFound.heading')}
          </h2>
          <p className={`text-gray-400 mb-8 max-w-md mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('notFound.message')}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className={`group flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''} px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:scale-105`}
            >
              <Home className="w-5 h-5" />
              <span>{t('notFound.backToHome')}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
            </Link>
            
            <Link
              to="/projects"
              className={`group flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''} px-6 py-3 border-2 border-cyan-500 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-105`}
            >
              <Search className="w-5 h-5" />
              <span>{t('notFound.browseProjects')}</span>
            </Link>
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-xl"
              animate={{
                y: [0, 20, 0],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
