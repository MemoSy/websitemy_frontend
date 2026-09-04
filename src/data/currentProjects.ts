import i18n from "../i18n";

// Current Projects Data Types
export type CurrentProject = {
  id: string;
  shortTitle: string;
  name: string;
  status: string;
  progress: number;
  startDate: string;
  expectedDuration: string;
  tagline: string;
  technologies: Array<{
    name: string;
    color: string;
    icon: string;
    border: string;
  }>;
  features: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
};

// Function to get translated project data
export const getCurrentProjectsData = (): CurrentProject[] => {
  const t = i18n.t.bind(i18n);

  return [
    {
      id: "economics-lessons",
      shortTitle: t("currentProjects.projects.economicsLessons.shortTitle"),
      name: t("currentProjects.projects.economicsLessons.name"),
      status: t("currentProjects.projects.economicsLessons.status"),
      progress: 60,
      startDate: "15 نيسان 2026",
      expectedDuration: " شهرين",
      tagline: t("currentProjects.projects.economicsLessons.tagline"),
      technologies: [
        {
          name: "Next.js",
          color: "from-black to-gray-800",
          icon: "▲",
          border: "border-gray-700",
        },
        {
          name: "React",
          color: "from-blue-400/20 to-blue-600/20",
          icon: "⚛️",
          border: "border-blue-400/30",
        },
        {
          name: "Tailwind CSS",
          color: "from-cyan-400/20 to-cyan-600/20",
          icon: "🎨",
          border: "border-cyan-400/30",
        },
        {
          name: "MongoDB",
          color: "from-green-500/20 to-emerald-700/20",
          icon: "💚",
          border: "border-green-400/30",
        },
      ],
      features: [
        {
          title: t("currentProjects.projects.economicsLessons.features.feature1.title"),
          desc: t("currentProjects.projects.economicsLessons.features.feature1.desc"),
          icon: "⭐",
        },
        {
          title: t("currentProjects.projects.economicsLessons.features.feature2.title"),
          desc: t("currentProjects.projects.economicsLessons.features.feature2.desc"),
          icon: "🔑",
        },
        {
          title: t("currentProjects.projects.economicsLessons.features.feature3.title"),
          desc: t("currentProjects.projects.economicsLessons.features.feature3.desc"),
          icon: "📈",
        },
        {
          title: t("currentProjects.projects.economicsLessons.features.feature4.title"),
          desc: t("currentProjects.projects.economicsLessons.features.feature4.desc"),
          icon: "🎬",
        },
      ],
    },
    {
      id: "linkedin-coach",
      shortTitle: t("currentProjects.projects.linkedinCoach.shortTitle"),
      name: t("currentProjects.projects.linkedinCoach.name"),
      status: t("currentProjects.projects.linkedinCoach.status"),
      progress: 85,
      startDate: "1 حزيران 2026",
      expectedDuration: t("currentProjects.projects.linkedinCoach.expectedDuration"),
      tagline: t("currentProjects.projects.linkedinCoach.tagline"),
      technologies: [
        {
          name: "Next.js",
          color: "from-black to-gray-800",
          icon: "▲",
          border: "border-gray-700",
        },
        {
          name: "NestJS",
          color: "from-red-500/20 to-orange-600/20",
          icon: "🔴",
          border: "border-red-400/30",
        },
        {
          name: "PostgreSQL",
          color: "from-blue-500/20 to-indigo-700/20",
          icon: "🐘",
          border: "border-blue-400/30",
        },
        {
          name: "Tailwind CSS",
          color: "from-cyan-400/20 to-cyan-600/20",
          icon: "🎨",
          border: "border-cyan-400/30",
        },
      ],
      features: [
        {
          title: t("currentProjects.projects.linkedinCoach.features.feature1.title"),
          desc: t("currentProjects.projects.linkedinCoach.features.feature1.desc"),
          icon: "👤",
        },
        {
          title: t("currentProjects.projects.linkedinCoach.features.feature2.title"),
          desc: t("currentProjects.projects.linkedinCoach.features.feature2.desc"),
          icon: "🗺️",
        },
        {
          title: t("currentProjects.projects.linkedinCoach.features.feature3.title"),
          desc: t("currentProjects.projects.linkedinCoach.features.feature3.desc"),
          icon: "⭐",
        },
        {
          title: t("currentProjects.projects.linkedinCoach.features.feature5.title"),
          desc: t("currentProjects.projects.linkedinCoach.features.feature5.desc"),
          icon: "📰",
        },
        {
          title: t("currentProjects.projects.linkedinCoach.features.feature6.title"),
          desc: t("currentProjects.projects.linkedinCoach.features.feature6.desc"),
          icon: "🖥️",
        },
      ],
    },
  ];
};

// Export currentProjectsData for backward compatibility
export const currentProjectsData = getCurrentProjectsData();
