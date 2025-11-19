import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Code,
  CheckCircle,
  Calendar,
  TrendingUp,
  ArrowDown,
} from "lucide-react";
import { getCurrentProjectsData } from "../../../data/currentProjects";

const CurrentProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [currentProjectsData, setCurrentProjectsData] = useState(
    getCurrentProjectsData()
  );
  const [activeProjectId, setActiveProjectId] = useState(
    currentProjectsData[0].id
  );
  const activeProject =
    currentProjectsData.find((p) => p.id === activeProjectId) ||
    currentProjectsData[0];

  // Update projects data when language changes
  useEffect(() => {
    setCurrentProjectsData(getCurrentProjectsData());
  }, [i18n.language]);

  return (
    <section
      className="py-20 md:py-24 bg-black relative overflow-hidden"
      id="current-projects"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-20 md:opacity-30">
        {/* Animated gradient orbs */}
        <div className="bg-float-1 absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="bg-float-2 absolute bottom-16 right-8 md:bottom-32 md:right-16 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"></div>
        <div className="bg-float-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute bottom-20 md:bottom-40 left-1/4 w-3 h-3 md:w-6 md:h-6 rounded-full border-2 border-purple-500/30 bg-purple-500/10"></div>
        <div className="floating-element absolute top-1/2 right-10 md:right-20 w-2 h-2 md:w-4 md:h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rotate-45"></div>
      </div>

      <div className="mx-auto w-full max-w-[1288px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl py-2 font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center`}
          >
            {t("currentProjects.title")}
          </h2>
        </div>

        {/* Projects Tabs */}
        <div className="mx-auto flex w-full max-w-3xl gap-2 md:max-w-4xl md:gap-4 mb-10 md:mb-12">
          {currentProjectsData.map((project) => {
            const isActive = project.id === activeProjectId;
            return (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => {
                  if (!isActive) {
                    setActiveProjectId(project.id);
                  }
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  flex: isActive ? "2" : "1",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={`group relative flex flex-col items-end gap-1 overflow-hidden rounded-xl border px-3 py-2 text-xs md:px-5 md:py-3 md:text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
                  isActive
                    ? "border-cyan-500/60 bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-purple-500/20 text-white shadow-lg shadow-cyan-500/20"
                    : "border-gray-700/60 bg-gray-900/30 text-gray-300 hover:border-cyan-500/40 hover:text-white"
                }`}
                aria-pressed={isActive}
                style={{ minWidth: "60px" }}
              >
                <span className="font-semibold leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                  {project.shortTitle}
                </span>
                <span
                  className={`text-[10px] md:text-xs text-gray-400 transition-all group-hover:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis w-full ${
                    !isActive ? "opacity-0 h-0" : "opacity-100"
                  }`}
                >
                  {project.tagline}
                </span>
                {isActive && (
                  <span className="absolute inset-x-3 md:inset-x-4 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"></span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col-reverse sm:flex-row gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Section - Technologies & Features */}
          <motion.div
            key={`left-${activeProject.id}`}
            className="project-left space-y-6 lg:space-y-16 h-full w-full sm:w-[49%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Technologies Used */}
            <div className="!mt-2">
              <h3
                className={`text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 ${
                  isRTL ? "gap-reverse" : ""
                }`}
              >
                <Code className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 flex-shrink-0" />
                <span>{t("currentProjects.sections.technologies")}</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {activeProject.technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className={`tech-card bg-gradient-to-r ${tech.color} backdrop-blur-sm rounded-xl p-3 md:p-4 border ${tech.border} hover:border-cyan-500/50 transition-all group cursor-default hover:scale-105`}
                  >
                    <div className="flex items-center gap-2 gap-reverse">
                      <span className="text-lg md:text-xl flex-shrink-0">
                        {tech.icon}
                      </span>
                      <span className="text-sm md:text-base text-white font-medium group-hover:text-cyan-300 transition-colors truncate">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="flex-1 !mt-12">
              <h3
                className={`text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 ${
                  isRTL ? "gap-reverse" : ""
                }`}
              >
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                <span>{t("currentProjects.sections.features")}</span>
              </h3>

              <div className="space-y-3 md:space-y-7">
                {activeProject.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="feature-item bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 md:p-5 hover:border-purple-500/50 transition-all group hover:bg-gray-800/40"
                  >
                    <div className="flex items-start gap-3 md:gap-4 gap-reverse">
                      <div className="text-xl md:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold mb-1 md:mb-2 group-hover:text-cyan-300 transition-colors text-sm md:text-base">
                          {feature.title}
                        </h4>
                        <p className="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Section - Project Preview & Progress + CTA */}
          <motion.div
            key={`right-${activeProject.id}`}
            className="project-right space-y-4 md:space-y-6 h-full flex flex-col mt-8 lg:mt-0 sm:w-[49%] w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          >
            {/* Project Preview */}
            <div className="relative space-y-4">
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700/50 overflow-hidden">
                {/* Development Badge */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-1 gap-reverse shadow-lg z-10">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                  <span>{activeProject.status}</span>
                </div>

                {/* Project Image */}
                <div className="relative mb-4 md:mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600/50">
                  {/* Simulated Project Screenshot */}
                  <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
                    {/* Browser-like header */}
                    <div className="bg-gray-800 p-2 md:p-3 border-b border-gray-700">
                      <div className="flex items-center gap-1 md:gap-2 gap-reverse">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full shadow-sm"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full shadow-sm"></div>
                        <div className="flex-1 bg-gray-700 rounded ml-2 mr-2 md:ml-4 md:mr-4 px-2 md:px-3 py-0.5 md:py-1">
                          <div className="h-1.5 md:h-2 bg-gray-600 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>

                    {/* Mock website content */}
                    <div className="p-3 md:p-6 space-y-2 md:space-y-4">
                      {/* Header section */}
                      <div className="flex items-center justify-between">
                        <div className="h-4 md:h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded w-1/3 shadow-lg"></div>
                        <div className="flex gap-1 md:gap-2 gap-reverse">
                          <div className="w-4 h-4 md:w-8 md:h-8 bg-gray-700 rounded"></div>
                          <div className="w-4 h-4 md:w-8 md:h-8 bg-gray-700 rounded"></div>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex gap-2 md:gap-4 gap-reverse">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-2 md:h-3 bg-gray-700 rounded w-8 md:w-16"
                          ></div>
                        ))}
                      </div>

                      {/* Main content area */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-3 md:mt-6">
                        <div className="md:col-span-2 space-y-2 md:space-y-3">
                          <div className="h-2 md:h-4 bg-gray-700 rounded w-full"></div>
                          <div className="h-2 md:h-4 bg-gray-700 rounded w-4/5"></div>
                          <div className="h-8 md:h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded border border-cyan-500/30 mt-2 md:mt-4"></div>
                        </div>
                        <div className="space-y-1 md:space-y-2 mt-2 md:mt-0">
                          <div className="h-6 md:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded border border-purple-500/30"></div>
                          <div className="h-6 md:h-12 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded border border-green-500/30"></div>
                          <div className="h-6 md:h-12 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded border border-pink-500/30"></div>
                        </div>
                      </div>

                      {/* Cards section */}
                      <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-6">
                        <div className="h-8 md:h-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded border border-cyan-500/20 flex items-center justify-center">
                          <div className="w-4 h-4 md:w-8 md:h-8 bg-cyan-500/30 rounded"></div>
                        </div>
                        <div className="h-8 md:h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded border border-purple-500/20 flex items-center justify-center">
                          <div className="w-4 h-4 md:w-8 md:h-8 bg-purple-500/30 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {/* Loading overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-pulse"></div>
                  </div>
                </div>

                {/* Additional project info */}
                <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-400/40 rounded-lg border border-gray-700/30">
                  <div
                    className={`flex items-center justify-between text-xs md:text-sm ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-gray-400">
                      {t("currentProjects.sections.projectName")}:
                    </span>
                    <span className="text-white font-medium">
                      {activeProject.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6">
                <div
                  className={`flex items-center justify-between mb-3 md:mb-4 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="text-white font-semibold text-sm md:text-base">
                    {t("currentProjects.sections.progress")}
                  </span>
                  <span className="text-cyan-400 font-bold text-xl md:text-2xl">
                    {activeProject.progress}%
                  </span>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="w-full bg-gray-700/50 rounded-full h-3 md:h-4 mb-4 md:mb-6 overflow-hidden border border-gray-600/30">
                  <div
                    className="progress-fill h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative shadow-lg"
                    style={{ width: `${activeProject.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse opacity-60"></div>
                    <div className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                {/* Timeline Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm">
                  <div
                    className={`flex items-center gap-2 md:gap-3 text-gray-300 ${
                      isRTL ? "gap-reverse" : ""
                    }`}
                  >
                    <div className="p-1.5 md:p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30 flex-shrink-0">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-gray-400 text-xs mb-0.5 md:mb-1">
                        {t("currentProjects.sections.startDate")}
                      </div>
                      <div className="font-medium text-white text-xs md:text-sm">
                        {activeProject.startDate}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-2 md:gap-3 text-gray-300 ${
                      isRTL ? "gap-reverse" : ""
                    }`}
                  >
                    <div className="p-1.5 md:p-2 bg-green-500/20 rounded-lg border border-green-500/30 flex-shrink-0">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-gray-400 text-xs mb-0.5 md:mb-1">
                        {t("currentProjects.sections.expectedDuration")}
                      </div>
                      <div className="font-medium text-white text-xs md:text-sm">
                        {activeProject.expectedDuration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="hidden md:block bg-gradient-to-r from-cyan-500/10 via-purple-500/5 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm mt-auto">
                <div
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isRTL ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <h4
                      className={`text-white font-bold mb-2 text-base md:text-lg ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {t("currentProjects.cta.title")}
                    </h4>
                    <p
                      className={`text-gray-300 text-xs md:text-sm mb-0 sm:mb-4 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {t("currentProjects.cta.description")}
                    </p>
                  </div>
                  <div
                    className={`flex-shrink-0 w-full sm:w-auto ${
                      isRTL ? "sm:ml-4" : "sm:mr-4"
                    }`}
                  >
                    <Link
                      to="/contact"
                      className={`inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all text-xs md:text-sm font-medium hover:scale-105 transform shadow-lg hover:shadow-cyan-500/25 ${
                        isRTL ? "gap-reverse" : ""
                      }`}
                    >
                      <span>{t("currentProjects.cta.button")}</span>
                      <ArrowDown
                        className={`w-3 h-3 md:w-4 md:h-4 ${
                          isRTL ? "rotate-[135deg]" : "rotate-[-45deg]"
                        }`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentProjectsSection;
