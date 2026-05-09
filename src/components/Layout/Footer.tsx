import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 xl:px-0">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {/* Company Info */}
          <div className="space-y-5">
            <div
              className={`flex items-center flex-row gap-2`}
            >
              <img
                src="/images/logo.png"
                alt="WebSiteMy Logo"
                className="w-32"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div
              className={`flex gap-8 ${
                isRTL ? "flex-row-reverse justify-end" : "flex-row"
              }`}
            >
              <a
                href="https://github.com/MemoSy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mahmudalmubayed/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Memosy2009"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/websitemyy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@codelam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {t("footer.quickLinks.projects")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {t("footer.quickLinks.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              {t("footer.contact.title")}
            </h3>
            <div className="space-y-3">
              <div
                className={`flex items-center gap-3`}
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">
                  {t("footer.contact.email")}
                </span>
              </div>
              <div
                className={`flex items-center gap-3`}
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">
                  {t("footer.contact.phone")}
                </span>
              </div>
              <div
                className={`flex items-center gap-3`}
              >
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400">
                  {t("footer.contact.location")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
