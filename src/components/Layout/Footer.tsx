import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="شعار WebSiteMy - شركة تطوير المواقع الإلكترونية" className="w-32" />
            </div>
            <p className="text-gray-400 leading-relaxed">
              نحن لا نبني مواقع ويب... نبني تجارب رقمية خالدة
            </p>
            <div className="flex gap-8">
              <a href="https://github.com/MemoSy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/mahmudalmubayed/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/Memosy2009" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/websitemyy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@codelam" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  المشاريع
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  من نحن
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">info@websitemy.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">+905313345111</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">Bursa \ Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;