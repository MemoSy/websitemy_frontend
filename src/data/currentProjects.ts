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
      id: "maqsaf-school",
      shortTitle: t("currentProjects.projects.compreVende.shortTitle"),
      name: t("currentProjects.projects.compreVende.name"),
      status: t("currentProjects.projects.compreVende.status"),
      progress: 75,
      startDate: "15 أغسطس 2025",
      expectedDuration: "90 يوم",
      tagline: t("currentProjects.projects.compreVende.tagline"),
      technologies: [
        {
          name: "Next.js",
          color: "from-black to-gray-800",
          icon: "▲",
          border: "border-gray-700",
        },
        {
          name: "mongoDB",
          color: "from-blue-500/20 to-blue-700/20",
          icon: "🐘",
          border: "border-blue-400/30",
        },
        {
          name: "nest.js",
          color: "from-indigo-500/20 to-purple-700/20",
          icon: "🔷",
          border: "border-indigo-400/30",
        },
        {
          name: "Stripe",
          color: "from-purple-500/20 to-pink-600/20",
          icon: "💰",
          border: "border-purple-400/30",
        },
      ],
      features: [
        {
          title: t(
            "currentProjects.projects.compreVende.features.feature1.title"
          ),
          desc: t(
            "currentProjects.projects.compreVende.features.feature1.desc"
          ),
          icon: "🤝",
        },
        {
          title: t(
            "currentProjects.projects.compreVende.features.feature2.title"
          ),
          desc: t(
            "currentProjects.projects.compreVende.features.feature2.desc"
          ),
          icon: "📈",
        },
        {
          title: t(
            "currentProjects.projects.compreVende.features.feature3.title"
          ),
          desc: t(
            "currentProjects.projects.compreVende.features.feature3.desc"
          ),
          icon: "📅",
        },
        {
          title: t(
            "currentProjects.projects.compreVende.features.feature4.title"
          ),
          desc: t(
            "currentProjects.projects.compreVende.features.feature4.desc"
          ),
          icon: "⚡",
        },
      ],
    },
    {
      id: "green-market",
      shortTitle: t("currentProjects.projects.allemni.shortTitle"),
      name: t("currentProjects.projects.allemni.name"),
      status: t("currentProjects.projects.allemni.status"),
      progress: 80,
      startDate: "20 نوفمبر 2025",
      expectedDuration: "90 يوم",
      tagline: t("currentProjects.projects.allemni.tagline"),
      technologies: [
        {
          name: "react.js",
          color: "from-green-500/20 to-emerald-700/20",
          icon: "💚",
          border: "border-green-400/30",
        },
        {
          name: "nest.js",
          color: "from-red-500/20 to-orange-600/20",
          icon: "🔴",
          border: "border-red-400/30",
        },
        {
          name: "mongoDB",
          color: "from-indigo-500/20 to-purple-700/20",
          icon: "🔷",
          border: "border-indigo-400/30",
        },
        {
          name: "tailwind CSS",
          color: "from-purple-500/20 to-pink-600/20",
          icon: "🎨",
          border: "border-purple-400/30",
        },
      ],
      features: [
        {
          title: t("currentProjects.projects.allemni.features.feature1.title"),
          desc: t("currentProjects.projects.allemni.features.feature1.desc"),
          icon: "🤖",
        },
        {
          title: t("currentProjects.projects.allemni.features.feature2.title"),
          desc: t("currentProjects.projects.allemni.features.feature2.desc"),
          icon: "📝",
        },
        {
          title: t("currentProjects.projects.allemni.features.feature3.title"),
          desc: t("currentProjects.projects.allemni.features.feature3.desc"),
          icon: "📁",
        },
        {
          title: t("currentProjects.projects.allemni.features.feature4.title"),
          desc: t("currentProjects.projects.allemni.features.feature4.desc"),
          icon: "🎓",
        },
      ],
    },
  ];
};

// Export currentProjectsData for backward compatibility
export const currentProjectsData = getCurrentProjectsData();
