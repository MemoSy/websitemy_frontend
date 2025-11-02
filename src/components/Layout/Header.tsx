import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Phone, FileText, ChevronDown, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { serviceCategories } from '../../data/projects';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { 
      path: '/projects', 
      label: 'أعمالنا', 
      icon: Briefcase,
      hasDropdown: true,
      dropdownItems: serviceCategories.map(category => ({
        path: `/projects?category=${category.id}`,
        label: category.title,
        icon: category.icon
      }))
    },
    { path: '/about', label: 'من نحن', icon: FileText },
    { path: '/contact', label: 'تواصل معنا', icon: Phone },
    { path: '/ai-chat', label: 'إسألني ', icon: Brain }
  ];

  return (
  <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      dir='rtl'
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-[1288px] px-4 py-4 sm:px-8">
        <nav className="flex flex-row-reverse items-center justify-between">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/images/logo.png"
              alt="شعار موقع WebSiteMy لتطوير المواقع الإلكترونية"
              className="w-36 "
            />
          </Link>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                    onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-300 group ${
                        location.pathname === item.path || location.pathname.startsWith('/project')
                          ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isProjectsDropdownOpen ? 'rotate-180' : ''}`} />
                    </Link>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isProjectsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
                        >
                          <div className="p-2">
                            <Link
                              to="/projects"
                              className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-cyan-500/10 transition-all text-gray-300 hover:text-cyan-300"
                            >
                              <Briefcase className="w-4 h-4" />
                              <span>جميع المشاريع</span>
                            </Link>
                            <div className="border-t border-gray-700 my-2"></div>
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.path}
                                to={dropdownItem.path}
                                className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg hover:bg-cyan-500/10 transition-all text-gray-300 hover:text-cyan-300"
                              >
                                <span className="text-lg">{dropdownItem.icon}</span>
                                <span className="text-sm">{dropdownItem.label}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-300 group ${
                    location.pathname === item.path
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                      : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="bg-gray-900/90 backdrop-blur-xl rounded-lg border border-gray-800 p-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.hasDropdown) {
                    return (
                      <div key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                            location.pathname === item.path || location.pathname.startsWith('/project')
                              ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                              : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                        <div className="mr-8 mb-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center space-x-3 space-x-reverse px-4 py-2 rounded-lg hover:bg-cyan-500/10 transition-all text-gray-400 hover:text-cyan-300 text-sm"
                            >
                              <span>{dropdownItem.icon}</span>
                              <span>{dropdownItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 mb-2 last:mb-0 ${
                        location.pathname === item.path
                          ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;