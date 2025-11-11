import { motion } from "framer-motion";
import { Users, Target, Award, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO/SEO";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const values = [
    {
      icon: Target,
      title: t("about.values.vision.title"),
      description: t("about.values.vision.description"),
    },
    {
      icon: Lightbulb,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: Users,
      title: t("about.values.team.title"),
      description: t("about.values.team.description"),
    },
    {
      icon: Award,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
    },
  ];

  const team = [
    {
      name: t("about.teamSection.members.member1.name"),
      role: t("about.teamSection.members.member1.role"),
      image: "/images/team/member-1.webp",
      skills: t("about.teamSection.members.member1.skills", {
        returnObjects: true,
      }) as string[],
    },
    {
      name: t("about.teamSection.members.member2.name"),
      role: t("about.teamSection.members.member2.role"),
      image: "/images/team/member-2.webp",
      skills: t("about.teamSection.members.member2.skills", {
        returnObjects: true,
      }) as string[],
    },
    {
      name: t("about.teamSection.members.member3.name"),
      role: t("about.teamSection.members.member3.role"),
      image: "/images/team/member-3.webp",
      skills: t("about.teamSection.members.member3.skills", {
        returnObjects: true,
      }) as string[],
    },
    {
      name: t("about.teamSection.members.member4.name"),
      role: t("about.teamSection.members.member4.role"),
      image: "/images/team/member-4.webp",
      skills: t("about.teamSection.members.member4.skills", {
        returnObjects: true,
      }) as string[],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <SEO
        title={`${t("about.title")} - WebSiteMy`}
        description={t("about.subtitle")}
        keywords="فريق تطوير, مطورين محترفين, شركة تطوير مواقع, خبرة في التطوير, فريق عمل متخصص"
        url="/about"
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-center mb-20 ${
            isRTL ? "text-right" : "text-left"
          } md:text-center`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("about.title")}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div
            className={`bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700 text-center ${
              isRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {t("about.mission.title")}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              "{t("about.mission.description")}"
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {t("about.values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className={`bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl mb-4 group-hover:scale-110 transition-transform ${
                      isRTL
                        ? "float-right ml-0 mr-auto"
                        : "float-left mr-0 ml-auto"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 clear-both">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {t("about.teamSection.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group ${
                  isRTL ? "text-right" : "text-left"
                } text-center`}
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-700 group-hover:border-cyan-500/50 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-cyan-400 mb-4">{member.role}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-600 rounded-full text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div
            className={`bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 md:p-12 border border-cyan-500/30 ${
              isRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {t("about.cta.title")}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("about.cta.description")}
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all font-medium text-lg"
            >
              {t("about.cta.button")}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
