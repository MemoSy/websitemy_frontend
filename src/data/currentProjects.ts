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
    ],
  },
  {
    id: "maqsaf-school",
    shortTitle: "maqsaf-school",
    name: "مدرسة مقصف الإلكترونية",
    status: "قيد التطوير",
    progress: 75,
    startDate: "15 أغسطس 2025",
    expectedDuration: "60 يوم",
    tagline: "نظام مقاصف مدرسية ذكي",
    technologies: [
      {
        name: "Next.js",
        color: "from-black to-gray-800",
        icon: "▲",
        border: "border-gray-700",
      },
      {
        name: "PostgreSQL",
        color: "from-blue-500/20 to-blue-700/20",
        icon: "🐘",
        border: "border-blue-400/30",
      },
      {
        name: "Prisma",
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
        title: "طلب مسبق للوجبات",
        desc: "يمكن للطلاب طلب وجباتهم قبل الوصول",
        icon: "🍱",
      },
      {
        title: "دفع إلكتروني آمن",
        desc: "نظام دفع متكامل للأولياء والطلاب",
        icon: "💳",
      },
      {
        title: "تقارير للإدارة",
        desc: "لوحة تحكم شاملة لمتابعة المبيعات والطلبات",
        icon: "📊",
      },
    ],
  },
  {
    id: "green-market",
    shortTitle: "green-market",
    name: "سوق الخضراوات الخضراء",
    status: "قيد التطوير",
    progress: 60,
    startDate: "20 سبتمبر 2025",
    expectedDuration: "50 يوم",
    tagline: "متجر عضوي متكامل",
    technologies: [
      {
        name: "Vue.js",
        color: "from-green-500/20 to-emerald-700/20",
        icon: "💚",
        border: "border-green-400/30",
      },
      {
        name: "Laravel",
        color: "from-red-500/20 to-orange-600/20",
        icon: "🔴",
        border: "border-red-400/30",
      },
      {
        name: "MySQL",
        color: "from-blue-400/20 to-blue-600/20",
        icon: "🐬",
        border: "border-blue-300/30",
      },
      {
        name: "Redis",
        color: "from-red-400/20 to-red-700/20",
        icon: "⚡",
        border: "border-red-300/30",
      },
    ],
    features: [
      {
        title: "كتالوج منتجات تفاعلي",
        desc: "عرض المنتجات العضوية مع معلومات تفصيلية",
        icon: "🥗",
      },
      {
        title: "نظام توصيل ذكي",
        desc: "تتبع الطلبات والتوصيل في الوقت الفعلي",
        icon: "🚚",
      },
      {
        title: "برنامج ولاء",
        desc: "نقاط مكافآت وعروض خاصة للعملاء المخلصين",
        icon: "🎁",
      },
    ],
  },
];
