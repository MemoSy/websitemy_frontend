import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { languages } from '../../i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language || 'ar';
  const isRTL = i18n.dir() === 'rtl';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Get 2-letter code for each language
  const getLanguageCode = (lng: string) => {
    return lng.toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Compact Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 group ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}
        aria-label="Change Language"
      >
        <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="text-white text-xs font-bold tracking-wider">
          {getLanguageCode(currentLanguage)}
        </span>
        <svg
          className={`w-3 h-3 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Compact Dropdown Menu */}
      {isOpen && (
        <div className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} bg-[#0F1729]/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-[0_8px_32px_rgba(0,217,255,0.2)] overflow-hidden z-50 min-w-[120px] animate-fade-in`}>
          {Object.keys(languages).map((lng) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              className={`w-full px-4 py-2.5 ${isRTL ? 'text-right' : 'text-left'} hover:bg-cyan-500/10 transition-all duration-200 flex items-center ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              } gap-2.5 border-b border-cyan-500/10 last:border-b-0 ${
                currentLanguage === lng 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="text-lg">
                {lng === 'ar' && '🇸🇦'}
                {lng === 'en' && '🇬🇧'}
                {lng === 'tr' && '🇹🇷'}
              </span>
              <span className="font-semibold text-sm flex-1">
                {getLanguageCode(lng)}
              </span>
              {currentLanguage === lng && (
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
