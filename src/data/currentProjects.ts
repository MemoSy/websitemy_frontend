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

// Current Projects Data
export const currentProjectsData: CurrentProject[] = [
  {
    id: "arabia-swim",
    shortTitle: "arabia-swim",
    name: "أرابيا سويم للسباحة العلاجية",
    status: "قيد التطوير",
    progress: 93,
    startDate: "01 يوليو 2025",
    expectedDuration: "45 يوم",
    tagline: "منصة علاجية متكاملة",
    technologies: [
      {
        name: "TypeScript",
        color: "from-gray-700 to-black",
        icon: "⚛️",
        border: "border-gray-600",
      },
      {
        name: "React.js",
        color: "from-blue-600/20 to-blue-800/20",
        icon: "📘",
        border: "border-blue-500/30",
      },
      {
        name: "Tailwind CSS",
        color: "from-cyan-500/20 to-cyan-700/20",
        icon: "🎨",
        border: "border-cyan-500/30",
      },
      {
        name: "MongoDB",
        color: "from-green-600/20 to-green-800/20",
        icon: "🍃",
        border: "border-green-500/30",
      },
    ],
    features: [
      {
        title: "واجهة مستخدم حديثة",
        desc: "هوية بصرية مع تجربة مستخدم رائعة",
        icon: "🤖",
      },
      {
        title: "بوابة الدفع الآمن",
        desc: "تكامل مع بوابات دفع متعددة ومؤمنة",
        icon: "💳",
      },
      {
        title: "إدارة برامج علاجية",
        desc: "محتوى طبي مخصص مع تحليلات تفصيلية",
        icon: "🏊",
      },
      {
        title: "مقالات مختصة",
        desc: "محتوى طبي مخصص مع معلومات تفصيلية",
        icon: "📚",
      },
    ],
  },
  {
    id: "maqsaf-school",
    shortTitle: "CompreVende",
    name: "نربط بين مقدم الخدمة والعميل",
    status: "قيد التطوير",
    progress: 75,
    startDate: "15 أغسطس 2025",
    expectedDuration: "90 يوم",
    tagline: "نربط بين مقدم الخدمة والعميل",
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
        title: "ربط مقدمي الخدمات",
        desc: "نربط بين مقدم الخدمة والعميل بسهولة وفعالية",
        icon: "🤝",
      },
      {
        title: "نظام إشعارات ذكي",
        desc: " تنبيهات فورية عبر البريد الإلكتروني والرسائل النصية",
        icon: "📈",
      },
      {
        title: " طرق متعددة للربط",
        desc: " خيارات متنوعة للاتصال بين الطرفين",
        icon: "📅",
      },
      {
        title: "حلول متكاملة",
        desc: "منصة شاملة تجمع كل احتياجاتك في مكان واحد",
        icon: "⚡",
      }
    ],
  },
  {
    id: "green-market",
    shortTitle: "ALLEMNI",
    name: " منصة تعليمية ذكية",
    status: "قيد التطوير",
    progress: 80,
    startDate: "20 نوفمبر 2025",
    expectedDuration: "90 يوم",
    tagline: "منصة تعليمية اونلاين",
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
        color: "from-blue-400/20 to-blue-600/20",
        icon: "💧",
        border: "border-blue-300/30",
      },
      {
        name: "typeScript",
        color: "from-red-400/20 to-red-700/20",
        icon: "🛑",
        border: "border-red-300/30",
      },
    ],
    features: [
      {
        title: "إنشاء دروس بالذكاء الاصطناعي",
        desc: "قم بتحميل صورة ودع الذكاء الاصطناعي ينشئ الدرس تلقائياً",
        icon: "🤖",
      },
      {
        title: "واجبات ذكية تلقائية",
        desc: "إنشاء اختبارات خيارات متعددة من الصور بالذكاء الاصطناعي",
        icon: "📝",
      },
      {
        title: "إدارة الملفات والمحتوى",
        desc: "رفع وتنظيم الملفات والدروس بسهولة في مكان واحد",
        icon: "📁",
      },
      {
        title: "دروس خصوصية مخصصة",
        desc: "إنشاء ومشاركة دروس خاصة للطلاب المحددين",
        icon: "🎓",
      }
    ],
  },
];
