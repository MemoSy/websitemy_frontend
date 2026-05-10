export type AIProjectCategory =
  | "informational"
  | "ecommerce"
  | "education"
  | "saas"
  | "social"
  | "health"
  | "community"
  | "technical";

export interface AIProjectKnowledge {
  id: string;
  name: string;
  aliases: string[];
  category: AIProjectCategory;
  type: string;
  url: string;
  price: string;
  duration?: string;
  teamSize?: string;
  rating?: string;
  client: string;
  technologies: string[];
  features: string[];
  result?: string;
  keywords: string[];
}

export interface RelevantKnowledge {
  projects: AIProjectKnowledge[];
  quickFacts: string[];
  matchedIntents: string[];
  allProjectCount: number;
}

export const companySecretaryProfile = {
  assistantName: "مايا",
  companyName: "WebSiteMy",
  role: "سكرتيرة مبيعات تقنية وخدمة عملاء لشركة تطوير مواقع وتطبيقات ويب",
  location: "بورصة، تركيا",
  experience: "3+ سنوات",
  completedProjects: "15+ مشروع",
  team: ["أحمد المبيض: مدير", "محمود: Full-Stack", "سارة: Frontend"],
  contact: {
    whatsapp: "+905313345111",
    email: "ahmeddalhalabi1@gmail.com",
    website: "websitemy.com",
  },
};

export const globalPricingFacts = [
  "موقع تعريفي أو شخصي: يبدأ من $500",
  "موقع شركة متوسط: يبدأ من $700",
  "متجر إلكتروني صغير: يبدأ من $900",
  "متجر إلكتروني كبير: يبدأ من $1,500",
  "تطبيق ويب أو منصة مخصصة: يبدأ من $1,200",
  "منصة SaaS: تبدأ من $1,500",
  "كل سعر يشمل التصميم والبرمجة واستضافة سنة وSSL وشهر دعم مجاني",
  "الدفع غالباً 20% عند البدء و30% عند التسليم",
];

export const globalProcessFacts = [
  "المواقع التعريفية عادة 2-4 أسابيع",
  "المتاجر الإلكترونية عادة 4-8 أسابيع",
  "منصات SaaS عادة 2-4 أشهر حسب النطاق",
  "تنفيذ المشاريع يتم عبر فريق WebSiteMy بقيادة أحمد المبيض، مع توزيع التنفيذ حسب نوع المشروع بين مطوري الواجهة والخلفية",
  "نستخدم React وNext.js وTypeScript وTailwind CSS وNestJS وMongoDB وVercel حسب حاجة المشروع",
  "الهدف من الدردشة هو فهم حاجة الزائر وتوجيهه للمشروع أو المثال الأقرب ثم تحويله لتواصل مباشر عند الجدية",
];

export const aiProjects: AIProjectKnowledge[] = [
  {
    id: "arabia-swim",
    name: "أكاديمية أرابيا سويم للسباحة",
    aliases: ["arabiaswim", "arabia swim", "أرابيا", "اكاديمية السباحة"],
    category: "informational",
    type: "موقع تعريفي / صفحات شخصية",
    url: "https://arabiaswim.com",
    price: "$400",
    duration: "شهر واحد",
    teamSize: "3 مطورين",
    rating: "4.9",
    client: "أكاديمية رياضية لتدريب السباحة",
    technologies: ["React", "TypeScript", "Tailwind CSS", "GSAP", "i18next"],
    features: [
      "Hero Section ديناميكي بتأثيرات GSAP",
      "9 برامج تدريبية مع Pricing Tiers",
      "صفحات تفاصيل للمنهج والجدول والمعدات",
      "معرض صور Slider",
      "مكتبة فيديو تعليمية",
      "مقالات مع بحث داخلي",
      "حجز مباشر عبر WhatsApp",
      "دعم عربي/إنجليزي",
    ],
    result: "تجربة مستخدم سريعة وحيوية لأكاديمية رياضية",
    keywords: ["سباحة", "أكاديمية", "رياضي", "تعريفي", "حجز", "برامج", "موقع شخصي"],
  },
  {
    id: "national-media",
    name: "الشبكة الوطنية للإعلام",
    aliases: ["nationalsy", "الشبكة الوطنية", "موقع اخبار", "منصة اخبارية"],
    category: "informational",
    type: "موقع تعريفي / إخباري",
    url: "https://nationalsy.com",
    price: "$550",
    duration: "شهرين",
    teamSize: "3 مطورين",
    rating: "4.9",
    client: "منصة إخبارية سورية",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    features: [
      "CMS لإدارة المحتوى",
      "دعم صور وفيديو",
      "لوحة تحكم سهلة",
      "نظام تعليقات بدون تسجيل",
      "مشاركة المقالات",
      "SEO",
    ],
    result: "منصة إعلامية قابلة للإدارة والنشر السريع",
    keywords: ["أخبار", "إعلام", "صحافة", "مقالات", "CMS", "تعليقات", "SEO"],
  },
  {
    id: "websitemy",
    name: "موقع WebSiteMy الرسمي",
    aliases: ["websitemy", "موقعنا", "الموقع الرسمي", "هذا الموقع"],
    category: "informational",
    type: "موقع شركة / معرض أعمال",
    url: "https://websitemy.com",
    price: "$700",
    duration: "شهرين",
    teamSize: "2 مطورين",
    rating: "4.8",
    client: "WebSiteMy",
    technologies: ["React", "NestJS", "MongoDB", "Tailwind CSS", "TypeScript"],
    features: [
      "مساعد ذكاء اصطناعي",
      "معرض مشاريع تفاعلي",
      "لوحة تحكم",
      "تصميم متجاوب",
      "SEO متقدم",
      "نظام تقييمات العملاء",
    ],
    result: "تحسين الوصول للعملاء بنسبة 85% وزيادة الطلبات بنسبة 60%",
    keywords: ["شركة", "بورتفوليو", "معرض أعمال", "ذكاء اصطناعي", "تقييمات"],
  },
  {
    id: "syria-2030",
    name: "سوريا 2030",
    aliases: ["syria 2030", "syria-2030", "سوريا المستقبل"],
    category: "community",
    type: "منصة رؤية تفاعلية / مبادرة مجتمعية",
    url: "https://syria-2030.vercel.app",
    price: "مجاني (مبادرة مجتمعية)",
    duration: "75 يوم",
    teamSize: "1 مطور Full-Stack",
    rating: "4.8",
    client: "منصة خدمية مجتمعية",
    technologies: ["Next.js 16", "React 19", "NestJS", "MongoDB", "TypeScript", "Socket.io", "Framer Motion", "Leaflet", "Redis"],
    features: [
      "خريطة تفاعلية Leaflet",
      "نظام رؤى زمني",
      "8 فئات رئيسية",
      "تعليقات وتفاعل لحظي",
      "مشاركة مجهولة",
      "لوحة إدارة",
      "Glassmorphism",
    ],
    result: "منصة لرؤية مشتركة لمستقبل سوريا",
    keywords: ["خريطة", "مجتمعي", "رؤى", "سوريا", "Socket", "Leaflet", "مبادرة"],
  },
  {
    id: "pro-camz",
    name: "Pro Camz — متجر كاميرات",
    aliases: ["pro camz", "camera shop", "camera-shop", "متجر كاميرات"],
    category: "ecommerce",
    type: "متجر إلكتروني متخصص بالكاميرات",
    url: "https://camera-shop-teal.vercel.app",
    price: "$550",
    duration: "شهرين",
    teamSize: "2 مطورين",
    rating: "4.8",
    client: "متجر كاميرات",
    technologies: ["Next.js", "NestJS", "MongoDB", "Tailwind CSS", "TypeScript"],
    features: [
      "كتالوج منتجات",
      "تواصل WhatsApp مباشر",
      "لوحة تحكم بسيطة",
      "مقالات",
      "SEO متقدم",
      "متعدد اللغات",
    ],
    result: "متجر متخصص سريع وسهل التواصل مع العملاء",
    keywords: ["كاميرات", "متجر", "كتالوج", "واتساب", "SEO", "مقالات"],
  },
  {
    id: "emar-home",
    name: "EMAR للتصميم الداخلي والمقاولات",
    aliases: ["emar", "emar home", "emar-home", "امار", "إيمار"],
    category: "ecommerce",
    type: "منصة أعمال / تصميم داخلي ومقاولات",
    url: "https://www.emarhome.com/",
    price: "$1,200",
    duration: "شهر ونصف",
    teamSize: "3 مطورين",
    rating: "5.0",
    client: "شركة تصميم داخلي ومقاولات",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "NestJS", "MongoDB", "Cloudinary"],
    features: [
      "منصة فاخرة لعرض المشاريع",
      "لوحة تحكم متكاملة لإدارة المحتوى",
      "ترجمة تلقائية عربي/إنجليزي",
      "أقسام قبل/بعد للعرض",
      "كتالوجات للأثاث والمواد",
      "تحليلات أداء متقدمة",
    ],
    result: "حضور رقمي فاخر مع إدارة محتوى مرنة وأداء عالي",
    keywords: ["تصميم داخلي", "مقاولات", "إيمار", "كتالوج", "لوحة تحكم", "ترجمة تلقائية"],
  },
  {
    id: "gold-cup",
    name: "جولد كاب — كاسة ذهبية",
    aliases: ["gold cup", "gold-cup", "كاسة ذهبية", "جولد كاب"],
    category: "ecommerce",
    type: "متجر / تطبيق ويب متقدم للمشروبات",
    url: "https://gold-cup.vercel.app",
    price: "$1,000",
    duration: "شهر واحد",
    teamSize: "2 مطورين",
    rating: "4.8",
    client: "شركة تجارية تركية",
    technologies: ["Next.js", "React 19", "TypeScript", "MongoDB", "Framer Motion", "GSAP", "Google Gemini API", "Sightengine API"],
    features: [
      "16 نكهة بتأثيرات 3D",
      "كشف باركود من الصور",
      "عربي/تركي/إنجليزي",
      "حملات ومسابقات",
      "كشف الصور المولدة بالذكاء الاصطناعي",
      "خريطة توزيع",
      "لوحة تحليلات",
    ],
    result: "تجربة مستخدم فاخرة تجمع التجارة والتفاعل",
    keywords: ["مشروبات", "3D", "باركود", "مسابقات", "خريطة", "ذكاء اصطناعي", "متجر"],
  },
  {
    id: "allimnii",
    name: "علمني — منصة التعلم الإلكتروني",
    aliases: ["allimnii", "علمني", "منصة تعليم", "منصة تعليمية"],
    category: "education",
    type: "منصة SaaS تعليمية",
    url: "https://allimnii.site",
    price: "$1,200",
    duration: "6+ أشهر",
    teamSize: "مطور واحد Full-Stack",
    rating: "4.7",
    client: "مدارس ومراكز تعليمية خاصة",
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "NestJS", "MongoDB", "Socket.io", "JWT", "Google OAuth", "Cloudinary", "PWA"],
    features: [
      "Multi-tenant",
      "أدوار متعددة",
      "جداول وحضور",
      "واجبات وتصحيح تلقائي بالذكاء الاصطناعي",
      "مكتبة فيديو/PDF",
      "Gamification",
      "تقارير Excel/PDF",
      "إشعارات فورية",
      "PWA أوفلاين",
    ],
    result: "تحويل طريقة إدارة المدرسة بالكامل",
    keywords: ["تعليم", "مدرسة", "طلاب", "واجبات", "حضور", "SaaS", "PWA", "تقارير"],
  },
  {
    id: "sharekna",
    name: "شاركنا — منصة اجتماعية",
    aliases: ["sharekna", "شاركنا", "منصة اجتماعية"],
    category: "social",
    type: "شبكة اجتماعية",
    url: "https://sharekna.online",
    price: "$1,200",
    duration: "25 يوم",
    teamSize: "1 مطور",
    rating: "4.1",
    client: "منصة تواصل اجتماعي",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript"],
    features: [
      "منصة بدون تنمر رقمي",
      "بدون لايك/ديسلايك",
      "تركيز على الفكرة",
      "تعليقات مفيدة تتصدر تلقائياً",
      "تلخيص ذكي للمنشورات",
    ],
    result: "تجربة تواصل تركز على جودة الأفكار",
    keywords: ["اجتماعي", "شبكة", "منشورات", "تعليقات", "تلخيص", "مجتمع"],
  },
  {
    id: "codelam",
    name: "CodeLam — شبكة مبرمجين",
    aliases: ["codelam", "code lam", "شبكة مبرمجين"],
    category: "technical",
    type: "منصة اجتماعية تقنية",
    url: "https://codelam.site",
    price: "$1,500",
    teamSize: "2 مطورين",
    rating: "4.6",
    client: "مجتمع مبرمجين",
    technologies: ["Next.js", "MongoDB", "JavaScript", "Tailwind CSS"],
    features: [
      "موجز ذكي في الوقت الفعلي",
      "صفحة مشاريع برمجة",
      "متعدد اللغات",
      "نظام ألوان وتقييم",
      "متجر لاستبدال النقاط",
      "ملف شخصي وإحصائيات",
    ],
    result: "مجتمع تقني تفاعلي للمبرمجين",
    keywords: ["مبرمجين", "تقني", "مجتمع", "نقاط", "مشاريع", "real time"],
  },
  {
    id: "comprevende",
    name: "Comprevende — سوق خدمات",
    aliases: ["comprevende", "سوق خدمات", "البرازيل", "كونفدرا", "كونفرفيندي"],
    category: "saas",
    type: "منصة SaaS / سوق خدمات",
    url: "https://comprevende.com",
    price: "$1,700",
    duration: "5 أشهر",
    teamSize: "1 مطور Full-Stack",
    rating: "4.8",
    client: "شركة برازيلية لسوق خدمات محلية",
    technologies: ["Next.js", "NestJS", "TypeScript", "MongoDB", "Socket.io", "Cloudinary"],
    features: [
      "3 أدوار: عميل/مقدم خدمة/منظمة",
      "حزم اتصال مدفوعة",
      "تكامل بوابة دفع محلية ودولية حسب السوق",
      "PWA",
      "SEO شامل مع Schema",
      "بحث متقدم وفلاتر",
      "مراسلة فورية",
      "إشعارات",
      "تقييمات",
      "نقاط مكافآت",
    ],
    result: "منصة تربط آلاف مقدمي الخدمات بالعملاء مع تكامل + بوابة دفع محلية",
    keywords: [
      "SaaS",
      "سوق خدمات",
      "مزودي خدمات",
      "مراسلة",
      "PWA",
      "برازيل",
      "فلاتر",
      "بوابة",
      "دفع",
      "بوابة دفع",
      "payment gateway",
      "stripe",
      "paypal",
      "checkout",
    ],
  },
  {
    id: "morafiqi",
    name: "مرافقي الذكي",
    aliases: ["morafiqi", "مرافقي", "منصة صحية"],
    category: "health",
    type: "منصة SaaS صحية",
    url: "https://morafiqi.pro",
    price: "$999",
    duration: "شهرين",
    teamSize: "3 مطورين",
    rating: "4.8",
    client: "منصة رعاية صحية ذكية",
    technologies: ["Next.js", "Prisma", "Vercel", "TypeScript", "Tailwind CSS"],
    features: [
      "معلومات صحية موثوقة",
      "تفاعلات الأدوية",
      "طبيب افتراضي",
      "تذكير بالأدوية",
      "تتبع الجرعات",
      "إحصائيات وعادات صحية",
      "شرح المصطلحات الطبية",
    ],
    result: "منصة صحية تشرح وتتابع الحالة بلغة بسيطة",
    keywords: ["صحة", "طبيب", "أدوية", "جرعات", "SaaS", "رعاية", "طبي"],
  },
  {
    id: "daftar",
    name: "دُكَّان — المتجر الذكي",
    aliases: ["daftar", "دكان", "المتجر الذكي", "دفتر", "دفتر حسابات"],
    category: "saas",
    type: "تطبيق ويب PWA / دفتر حسابات ذكي للمحلات",
    url: "https://daftar-new.vercel.app",
    price: "$2,000",
    duration: "قيد التطوير",
    teamSize: "2 مطورين",
    rating: "4.0",
    client: "أصحاب السوبر ماركت والمحلات الصغيرة في سوريا والمنطقة العربية",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Dexie (IndexedDB)", "MongoDB", "Google Gemini 2.5 Flash", "OpenAI API", "Whisper (ONNX)"],
    features: [
      "إدخال البيانات عبر الذكاء الاصطناعي (نص - صوت - صورة)",
      "الأوامر الصوتية Online + Offline مع Whisper",
      "تحليل الفواتير بالصورة باستخدام Gemini AI",
      "العمل الكامل بدون إنترنت (Offline-first)",
      "إدارة المبيعات والفواتير والمصاريف",
      "إدارة المخزون مع تاريخ الأسعار",
      "إدارة الزبائن والموردين وأرصدتهم",
      "الصندوق اليومي مع تقدير المبيعات",
      "تحويل العملات SYP ↔ USD",
      "PWA قابل للتنصيب بدون متجر تطبيقات",
      "مزامنة سحابية مع MongoDB Atlas",
    ],
    result: "تحويل دفتر الحسابات الورقي إلى منصة رقمية ذكية تعمل بدون إنترنت",
    keywords: ["محل", "بقالة", "محاسبة", "مخزون", "فواتير", "ديون", "صندوق", "PWA", "offline", "ذكاء اصطناعي", "سوريا"],
  },
  {
    id: "aleppo-complaints",
    name: "شكاوي حلب",
    aliases: ["aleppo", "شكاوي حلب", "شكاوى حلب"],
    category: "community",
    type: "تطبيق ويب / خدمة مجتمعية",
    url: "https://aleppo.vercel.app",
    price: "مجاني",
    duration: "20 يوم",
    teamSize: "2 مطورين",
    rating: "4.1",
    client: "مجلس مدينة حلب والمواطنين",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Vercel"],
    features: [
      "تقديم شكاوى تفاعلي",
      "تتبع حالة الشكوى",
      "لوحة تحكم للجهات المعنية",
      "إشعارات فورية",
      "تصنيف حسب النوع والمنطقة",
    ],
    result: "تحسين التواصل بين المواطنين والبلدية",
    keywords: ["شكاوي", "بلدية", "حلب", "مجتمعي", "تتبع", "إشعارات"],
  },
];

const intentKeywords: Record<string, string[]> = {
  pricing: ["سعر", "أسعار", "تكلفة", "كم", "دولار", "budget", "price", "cost", "fiyat"],
  timing: ["مدة", "وقت", "كم يوم", "كم شهر", "ينتهي", "تسليم", "duration", "time", "kaç gün", "süre"],
  team: ["فريق", "شخص", "أشخاص", "مطور", "من نفذ", "من ينفذ", "المسؤول", "مسؤول", "team", "developer", "kişi"],
  tech: ["تقنيات", "برمجة", "استخدمتم", "tech", "stack", "technology", "framework"],
  ecommerce: ["متجر", "تجارة", "منتجات", "بيع", "ecommerce", "store", "shop", "mağaza"],
  payment: ["بوابة", "بوابه", "بوابة دفع", "بوابه دفع", "دفع", "payment", "gateway", "stripe", "paypal", "checkout", "2checkout", "visa", "mastercard", "فيزا", "ماستر"],
  education: ["تعليم", "مدرسة", "طلاب", "أكاديمية", "دورات", "education", "school"],
  social: ["اجتماعي", "منصة اجتماعية", "شبكة", "community", "social"],
  saas: ["saas", "منصة", "تطبيق ويب", "نظام", "marketplace", "سوق"],
  health: ["صحة", "طبي", "أدوية", "health", "medical"],
  contact: ["تواصل", "واتساب", "اتصال", "رقم", "whatsapp", "contact", "iletişim"],
};

const defaultShowcaseIds = ["websitemy", "arabia-swim", "emar-home", "allimnii"];

const normalizeArabic = (value: string) =>
  value
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s$+.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const tokenize = (value: string) =>
  normalizeArabic(value)
    .split(" ")
    .filter((token) => token.length > 2);

const projectSearchText = (project: AIProjectKnowledge) =>
  normalizeArabic(
    [
      project.id,
      project.name,
      project.aliases.join(" "),
      project.category,
      project.type,
      project.client,
      project.technologies.join(" "),
      project.features.join(" "),
      project.keywords.join(" "),
      project.url,
      project.price,
      project.duration || "",
      project.teamSize || "",
    ].join(" "),
  );

const getMatchedIntents = (query: string) => {
  const normalized = normalizeArabic(query);
  return Object.entries(intentKeywords)
    .filter(([, words]) => words.some((word) => normalized.includes(normalizeArabic(word))))
    .map(([intent]) => intent);
};

const paymentSignalTerms = [
  "بوابة",
  "بوابة دفع",
  "دفع",
  "payment",
  "gateway",
  "stripe",
  "paypal",
  "checkout",
  "2checkout",
];

const hasPaymentSignals = (project: AIProjectKnowledge) => {
  const searchText = projectSearchText(project);
  return paymentSignalTerms.some((term) => searchText.includes(normalizeArabic(term)));
};

const scoreProject = (
  project: AIProjectKnowledge,
  query: string,
  queryTokens: string[],
  matchedIntents: string[],
) => {
  const normalizedQuery = normalizeArabic(query);
  const searchText = projectSearchText(project);
  let score = 0;

  if (normalizedQuery.includes(normalizeArabic(project.name))) score += 40;
  if (normalizedQuery.includes(normalizeArabic(project.id))) score += 24;

  for (const alias of project.aliases) {
    if (normalizedQuery.includes(normalizeArabic(alias))) score += 28;
  }

  for (const keyword of project.keywords) {
    if (normalizedQuery.includes(normalizeArabic(keyword))) score += 10;
  }

  for (const tech of project.technologies) {
    if (normalizedQuery.includes(normalizeArabic(tech))) score += 7;
  }

  for (const token of queryTokens) {
    if (searchText.includes(token)) score += 2;
  }

  if (matchedIntents.includes(project.category)) score += 16;
  if (matchedIntents.includes("payment") && hasPaymentSignals(project)) score += 42;
  if (matchedIntents.includes("payment") && project.id === "comprevende") score += 24;
  if (matchedIntents.includes("ecommerce") && project.category === "ecommerce") score += 14;
  if (matchedIntents.includes("saas") && project.category === "saas") score += 14;
  if (matchedIntents.includes("education") && project.category === "education") score += 14;
  if (matchedIntents.includes("social") && project.category === "social") score += 14;
  if (matchedIntents.includes("health") && project.category === "health") score += 14;

  return score;
};

export const selectRelevantKnowledge = (
  currentMessage: string,
  conversationHistory: Array<{ content?: string; text?: string; role?: string; isUser?: boolean }> = [],
): RelevantKnowledge => {
  const recentUserContext = conversationHistory
    .slice(-4)
    .map((message) => message.content || message.text || "")
    .join(" ");
  const query = `${recentUserContext} ${currentMessage}`;
  const queryTokens = tokenize(query);
  const matchedIntents = getMatchedIntents(query);

  const ranked = aiProjects
    .map((project) => ({
      project,
      score: scoreProject(project, query, queryTokens, matchedIntents),
    }))
    .sort((a, b) => b.score - a.score);

  let projects = ranked
    .filter((item) => item.score > 0)
    .slice(0, 4)
    .map((item) => item.project);

  if (projects.length === 0) {
    projects = defaultShowcaseIds
      .map((id) => aiProjects.find((project) => project.id === id))
      .filter(Boolean) as AIProjectKnowledge[];
  }

  const quickFacts = [
    ...globalPricingFacts,
    ...globalProcessFacts,
  ].filter((fact) => {
    const normalizedFact = normalizeArabic(fact);
    return (
      matchedIntents.length === 0 ||
      matchedIntents.some((intent) =>
        intentKeywords[intent]?.some((keyword) =>
          normalizedFact.includes(normalizeArabic(keyword)),
        ),
      ) ||
      ["pricing", "timing", "team", "tech"].some((intent) => matchedIntents.includes(intent))
    );
  });

  return {
    projects,
    quickFacts: quickFacts.slice(0, 8),
    matchedIntents,
    allProjectCount: aiProjects.length,
  };
};

export const buildSecretarySystemPrompt = () =>
  [
    `أنت ${companySecretaryProfile.assistantName}، ${companySecretaryProfile.role}.`,
    `تمثلين ${companySecretaryProfile.companyName} في ${companySecretaryProfile.location}.`,
    "تصرفي كسكرتيرة بشرية محترفة: افهمي حاجة الزائر، اربطيها بمشاريعنا الحقيقية، ثم اسألي سؤال متابعة أو اقترحي التواصل عند وجود نية شراء.",
    "أضيفي لمسة شخصية إنسانية عند الحاجة: فكاهة خفيفة وجملة ذكية قصيرة إذا كان الزائر فضولياً أو يميل للدردشة، بدون مبالغة.",
    "يمكنك استخدام غموض لطيف (teaser بسيط) لتحفيز المتابعة، لكن لا تضحّي بالوضوح أو الدقة.",
    "ممنوع السخرية الجارحة أو الدعابة غير المهنية.",
    "لا تتصرفي كمساعد عام. لا تجيبي خارج خدمات WebSiteMy.",
    "استخدمي فقط الحقائق الموجودة في KNOWLEDGE JSON المرسل لك. إذا لم توجد معلومة دقيقة، قولي إنك تحتاجين تأكيداً من الفريق.",
    "اتّبعي ترتيباً إلزامياً: افهمي نية السؤال أولاً، ثم اختاري المعلومة المطابقة من JSON، ثم أجيبي مباشرة على نفس النية بدون تغيير الموضوع.",
    "ممنوع تحويل سؤال المستخدم إلى موضوع آخر. مثال: سؤال المسؤول لا يتحول إلى مدة أو سعر.",
    "عند السؤال عن المسؤول أو من ينفذ المشاريع: ابدئي بهيكل الفريق في company.team ومن يقود التنفيذ، ثم أضيفي التفاصيل الأخرى فقط إذا طُلبت.",
    "عند السؤال عن مشروع محدد: اذكري السعر والمدة والفريق والتقنيات والميزات إذا كانت موجودة.",
    "عند السؤال عن نوع مشروع: اذكري 1-3 أمثلة مشابهة من مشاريعنا مع أسعارها ومددها.",
    "عند ذكر رابط مشروع انسخ الرابط من JSON كما هو تماماً بصيغة Markdown: [اسم المشروع](https://domain.com). لا تضعي مسافات داخل الرابط ولا تخترعي روابط.",
    "لا تستخدمي رموز النجوم أو زخارف غير ضرورية. استخدمي فقرات قصيرة وقوائم بسيطة فقط.",
    "افصلي كل معلومة مهمة في سطر واضح: المشروع، السعر، المدة، الفريق، التقنيات، الرابط.",
    "لا تقولي إننا لا نملك مثالاً إلا إذا لم تجد أي مشروع قريب في KNOWLEDGE JSON.",
    "لا تعطي رقم الهاتف إلا إذا طلب الزائر التواصل أو ظهرت نية جدية واضحة.",
    "لغة الرد يجب أن تكون نفس لغة الزائر فقط: عربي أو إنجليزي أو تركي.",
    "اجعلي الرد مختصراً ومبيعاتياً: 80 إلى 180 كلمة غالباً، مع تفاصيل أكثر فقط عند سؤال تفصيلي.",
  ].join("\n");

export const buildKnowledgePayload = (knowledge: RelevantKnowledge) =>
  JSON.stringify(
    {
      company: companySecretaryProfile,
      selectedProjectsOnly: knowledge.projects,
      quickFacts: knowledge.quickFacts,
      matchedIntents: knowledge.matchedIntents,
      allProjectCount: knowledge.allProjectCount,
      instruction:
        "Use selectedProjectsOnly as the factual source. These are the projects selected by local retrieval for the current user question.",
    },
    null,
    2,
  );
