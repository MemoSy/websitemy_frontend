import i18n from "../i18n";
import { Project, ServiceCategory } from "../types";

export const projects: Project[] = [
  {
    id: "ecommerce-luxury",
    title: "المتجر الذكي  ",
    description:
      "منصة تجارة إلكترونية متطورة بتصميم حديث وتجربة مستخدم استثنائية",
    fullDescription:
      "تم تطوير هذا المتجر الإلكتروني باستخدام أحدث التقنيات لضمان تجربة تسوق سلسة ومرضية. يتضمن نظام إدارة محتوى قوي، نظام ذكي، وتحليلات مبيعات متقدمة. المشروع يهدف إلى توفير منصة شاملة للتجارة الإلكترونية مع واجهة مستخدم حديثة وسهلة الاستخدام، بالإضافة إلى نظام إدارة متقدم للمنتجات والطلبات.",
    image: "/images/projects/local/project-artwin-main.webp",
    youtubeVideo: "https://www.youtube.com/embed/LtP5HDSfcmw",
    category: "ecommerce",
    technologies: ["nextjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "2 أشهر",
    rating: 4.3,
    // AI-relevant data
    aiData: {
      price: "650$",
      clientType: " متجر الكتروني ذكي",
      complexity: "متقدم",
      teamSize: "3 مطورين",
      keyFeatures: [
        "واجهة مستخدم احترافية  ",
        "اضافة منتخ بسعر مخفض   ",
        "لوحة تحكم متقدمة جدا",
        "نظام تبديل الاستايلات",
        "نظام تقييم المنتجات",
        "نظام تعليقات دون تسجيل",
      ],
      clientFeedback: "تجربة ممتازة وزيادة في المبيعات بنسبة 40%",
    },
    reviews: [
      {
        id: "2",
        author: "فاطمة علي",
        email: "fatima@example.com",
        rating: 4,
        comment:
          "تجربة مستخدم رائعة، سهولة في الاستخدام وتصميم جذاب. أنصح بالتعامل مع هذا الفريق.",
        date: "2024-01-10",
      },
    ],
    liveUrl: "https://www.shapeshop.store/",
    githubUrl: "https://www.shapeshop.store",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "واجهة مستخدم احترافية  ",
      "اضافة منتخ بسعر مخفض   ",
      "لوحة تحكم متقدمة جدا",
      "نظام تبديل الاستايلات",
      "نظام تقييم المنتجات",
      "نظام تعليقات دون تسجيل",
    ],
  },

  {
    id: "artwin-mobile",
    title: "artwin mobile ",
    description:
      "Modern tasarıma ve olağanüstü kullanıcı deneyimine sahip, gelişmiş .",
    fullDescription:
      "Bu çevrimiçi mağaza, sorunsuz ve tatmin edici bir alışveriş deneyimi sağlamak için en son teknolojiler kullanılarak geliştirildi. Sağlam bir içerik yönetim sistemi, akıllı bir sistem ve gelişmiş satış analitiği içerir. Proje, modern ve kullanımı kolay bir kullanıcı arayüzüne sahip kapsamlı bir e-ticaret platformu ve gelişmiş bir ürün ve sipariş yönetim sistemi sağlamayı amaçlamaktadır.",
    image: "/images/projects/local/project-artwin-screenshot.webp",
    youtubeVideo: "https://www.youtube.com/embed/LtP5HDSfcmw",
    category: "ecommerce",
    technologies: ["nextjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "2 أشهر",
    rating: 4.8,
    // AI-relevant data
    aiData: {
      price: "650$",
      clientType: "شركة أثاث تركية",
      complexity: "متقدم",
      teamSize: "4 مطورين",
      keyFeatures: [
        "كتالوج منتجات تفاعلي ثلاثي الأبعاد",
        "نظام تحكم ذكي",
        "دعم اللغة التركية والإنجليزية",
        "تصميم متجاوب مع كل الشاشات",
        "نظام إدارة الاحصائيات",
      ],
      clientFeedback:
        "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية",
    },
    reviews: [
      {
        id: "1",
        author: "أحمد محمد",
        email: "ahmed@example.com",
        rating: 5,
        comment:
          "موقع رائع جداً، التصميم احترافي والأداء ممتاز. تجربة التسوق سلسة ومريحة جداً.",
        date: "2024-01-15",
      },
      {
        id: "2",
        author: "فاطمة علي",
        email: "fatima@example.com",
        rating: 4,
        comment:
          "تجربة مستخدم رائعة، سهولة في الاستخدام وتصميم جذاب. أنصح بالتعامل مع هذا الفريق.",
        date: "2024-01-10",
      },
    ],
    liveUrl: "https://www.artwin.store",
    githubUrl: "https://www.artwin.store",
    objectives: [
      "Develop a modern and user-friendly user interface",
      "Improve user experience and increase conversion rates",
      "Ensure high performance and rapid response",
      "Implement security and protection best practices",
    ],
    challenges: [
      "Improve application performance to handle large amounts of data",
      "Ensure compatibility with all browsers and devices",
      "Implement an advanced security system to protect user data",
      "Develop a scalable API",
    ],
    features: [
      "Responsive design that works across all devices",
      "Advanced content management system",
      "Real-time analytics and reporting",
      "Multilingual",
      "Search engine optimization (SEO)",
      "Communication via WhatsApp",
    ],
  },

  {
    id: "websitemy-portfolio",
    title: "موقع WebSiteMy الرسمي",
    description:
      "موقع شركة تطوير المواقع الإلكترونية - معرض إنجازات تقنية احترافي",
    fullDescription:
      "تم تطوير الموقع الرسمي لشركة WebSiteMy باستخدام أحدث التقنيات لعرض خدمات الشركة ومشاريعها بطريقة احترافية. يتضمن الموقع مساعد ذكي متطور، معرض تفاعلي للمشاريع، ونظام إدارة محتوى متقدم. المشروع يهدف إلى توفير تجربة مستخدم استثنائية مع واجهة حديثة وسهلة الاستخدام، بالإضافة إلى تحسين محركات البحث للوصول لأكبر عدد من العملاء المحتملين.",
    image: "https://www.websitemy.com/images/logo.png",
    youtubeVideo: "https://www.youtube.com/embed/7CkTvbUweG0",
    category: "saas",
    technologies: ["react", "nestjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "شهرين ",
    rating: 4.8,
    aiData: {
      price: "600$",
      clientType: "موقع شركة تطوير مواقع إلكترونية",
      complexity: "متوسط",
      teamSize: "2 مطورين",
      keyFeatures: [
        "مساعد ذكي متطور بتقنية الذكاء الاصطناعي",
        "معرض تفاعلي لعرض المشاريع والإنجازات",
        "نظام إدارة محتوى متقدم ولوحة تحكم",
        "تصميم متجاوب مع جميع أحجام الشاشات",
        "تحسين محركات البحث (SEO) المتقدم",
        "نظام تقييمات وآراء العملاء",
      ],
      clientFeedback: "تحسين الوصول للعملاء بنسبة 85% وزيادة الطلبات بنسبة 60%",
    },
    reviews: [],
    liveUrl: "https://www.websitemy.com",
    githubUrl: "https://github.com/MemoSy",
    objectives: [
      "تطوير موقع احترافي يعكس هوية الشركة التقنية",
      "عرض المشاريع والخدمات بطريقة تفاعلية وجذابة",
      "تطبيق مساعد ذكي لتحسين تجربة العملاء",
      "تحسين الوصول والظهور في محركات البحث",
    ],
    challenges: [
      "تطوير مساعد ذكي يفهم السياق ويقدم إجابات دقيقة",
      "تصميم واجهة مستخدم احترافية تعكس هوية الشركة",
      "تطبيق نظام إدارة محتوى مرن وقابل للتوسع",
      "ضمان الأداء العالي وسرعة التحميل",
    ],
    features: [
      "مساعد ذكي متطور بتقنية الذكاء الاصطناعي",
      "معرض تفاعلي لعرض المشاريع والإنجازات",
      "نظام إدارة محتوى متقدم ولوحة تحكم",
      "تصميم متجاوب مع جميع أحجام الشاشات",
      "تحسين محركات البحث (SEO) المتقدم",
      "نظام تقييمات وآراء العملاء",
    ],
  },

  {
    id: "pro-camz",
    title: "Pro Camz ",
    description: "متجر الكتروني متكامل لبيع الكميرات و مستلزماتها متعدد اللغات",
    fullDescription:
      "تم تطوير هذا المتجر الإلكتروني باستخدام أحدث التقنيات لضمان تجربة تسوق سلسة ومرضية. يتضمن نظام إدارة محتوى قوي، نظام ذكي، وتحليلات مبيعات متقدمة. المشروع يهدف إلى توفير منصة شاملة للتجارة الإلكترونية مع واجهة مستخدم حديثة وسهلة الاستخدام، بالإضافة إلى نظام إدارة متقدم للمنتجات والطلبات.",
    image: "/images/projects/local/project-1.webp",
    youtubeVideo: "https://www.youtube.com/embed/bcTyXAuDjWg",
    category: "ecommerce",
    technologies: ["nextjs", "nesjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "2 أشهر",
    rating: 4.8,
    aiData: {
      price: "550$",
      clientType: "متجر الكتروني لبيع الكميرات ومستلزماتها  ",
      complexity: "متوسط",
      teamSize: "2 مطورين",
      keyFeatures: [
        "تصميم متجاوب يعمل على جميع الأجهزة",
        " تواصل مباشر عبر الوتساب",
        "لوحة تحكم بسيطة",
        "نشر واضافة المقالات",
        "تحسين محركات البحث (SEO)",
        "متعدد اللغات",
      ],
      clientFeedback:
        "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية",
    },

    reviews: [
      {
        id: "1",
        author: "أحمد محمد",
        email: "ahmed@example.com",
        rating: 5,
        comment:
          "موقع رائع جداً، التصميم احترافي والأداء ممتاز. تجربة التسوق سلسة ومريحة جداً.",
        date: "2024-01-15",
      },
    ],
    liveUrl: "https://camera-shop-teal.vercel.app/ar",
    githubUrl: "https://camera-shop-teal.vercel.app/ar",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "تصميم متجاوب يعمل على جميع الأجهزة",
      " تواصل مباشر عبر الوتساب",
      "لوحة تحكم بسيطة",
      "نشر واضافة المقالات",
      "تحسين محركات البحث (SEO)",
      "متعدد اللغات",
    ],
  },

  {
    id: "sharekna",
    title: "منصة شاركنا الاجتماعية ",
    description: "منصة تواصل اجتماعي ذكية وآمنة",
    fullDescription:
      "منصة اجتماعية مبتكرة تتيح للمستخدمين التعبير بحرية في بيئة خالية من التنمر والتقييمات السطحية. تعتمد على نظام ذكي يبرز التعليقات المفيدة ويقدم تلخيصات فورية للمحتوى، مما يوفر تجربة تواصل أكثر عمقًا وسرعة.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D22AQGUvd0rRP6wIg/feedshare-shrink_2048_1536/B4DZU.tmg9GcAs-/0/1740513897150?e=1759363200&v=beta&t=G_hvP1CYXBYix0sIP8_aRJw0JYCD0anuFUjAWNZa88k",
    youtubeVideo: "https://www.youtube.com/embed/z_F3Gg7wU9U",
    category: "social",
    technologies: ["nextjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "يوم 25 ",
    rating: 4.1,
    aiData: {
      price: "1200$",
      clientType: "منصة تواصل اجتماعي ذكية وآمنة ",
      complexity: "متوسط",
      teamSize: "1 مطورين",
      keyFeatures: [
        "منصة اجتماعية بدون تنمر ",
        "بدون لايك وديسلايك التركيز على الفكرة فقط ",
        "حرية تعبير كاملة للجميع ",
        "التعليقات المفيدة تتصدر تلقائيًا ",
        "تلخيص ذكي فوري للمنشورات والتعليقات ",
      ],
      clientFeedback: " تحسين الكفاءة التشغيلية",
    },

    reviews: [],
    liveUrl: "https://www.sharekna.online",
    githubUrl: "https://www.sharekna.online",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "منصة اجتماعية بدون تنمر ",
      "بدون لايك وديسلايك  التركيز على الفكرة فقط ",
      "حرية تعبير كاملة للجميع ",
      "التعليقات المفيدة تتصدر تلقائيًا ",
      "تلخيص ذكي فوري للمنشورات والتعليقات ",
    ],
  },

  {
    id: "business",
    title: "ذاكرة الشهداء",
    description: "ذاكرة الشهداء - مشروع من القلب إلى القلب",
    fullDescription:
      "موقع ويب مخصص لحفظ ذكريات وقصص شهدائنا الأبطال، حيث يمكن لأي شخص مشاركة قصة شهيد عزيز عليه والاحتفاظ بذكراه للأبد.",
    image: "/images/projects/local/project-youtube.webp",
    youtubeVideo: "https://www.youtube.com/embed/yQmvvSDn8lM",
    category: "service",
    technologies: ["nextjs", "nestjs", "mongodb", "tailwindcss", "typescript"],
    duration: "3 اسابيع",
    rating: 4.6,
    reviews: [
      {
        id: "5",
        author: "نورا أحمد",
        email: "nora@example.com",
        rating: 5,
        comment:
          "التقارير والتحليلات مفيدة جداً لاتخاذ القرارات. واجهة المستخدم بديهية.",
        date: "2024-01-25",
      },
    ],
    aiData: {
      price: "مجاني",
      clientType: "  مؤسسة خيرية",
      complexity: "متوسط",
      teamSize: "2 مطورين",
      keyFeatures: [
        "إضافة معلومات الشهيد (الاسم، التاريخ، المكان، الصور، القصة)",
        "نظام موافقة لضمان المحتوى المحترم",
        "بحث متقدم عن الشهداء بالاسم أو التاريخ أو المدينة",
        "باركود فريد لكل شهيد لسهولة المشاركة",
        "نظام تعليقات محمي بالذكاء الاصطناعي",
        "إمكانية مشاركة الذكريات والتقدير",
      ],
      clientFeedback:
        "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية",
    },
    liveUrl: "https://websitemy.com",
    githubUrl: "https://websitemy.com",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "إضافة معلومات الشهيد (الاسم، التاريخ، المكان، الصور، القصة)",
      "نظام موافقة لضمان المحتوى المحترم",
      "بحث متقدم عن الشهداء بالاسم أو التاريخ أو المدينة",
      "باركود فريد لكل شهيد لسهولة المشاركة",
      "نظام تعليقات محمي بالذكاء الاصطناعي",
      "إمكانية مشاركة الذكريات والتقدير",
    ],
  },

  {
    id: "social-network",
    title: "منصة  codelam",
    description: "منصة تواصل اجتماعي مع ميزات متقدمة وحماية للخصوصية",
    fullDescription:
      "شبكة اجتماعية مبتكرة تركز على الخصوصية والأمان. تتضمن ميزات التواصل المشفر، المشاركة الذكية، وأدوات بناء المجتمعات. المنصة تهدف إلى توفير بيئة آمنة ومحفزة للتواصل الاجتماعي مع احترام خصوصية المستخدمين وحماية بياناتهم.",
    image:
      "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeVideo: "https://www.youtube.com/embed/bcTyXAuDjWg",
    category: "social",
    technologies: ["nextjs", "mongodb", "javascript", "tailwindcss"],
    duration: "",
    aiData: {
      price: "1500$",
      clientType: "منصة اجتماعية",
      complexity: "متقدم",
      teamSize: "2 مطورين",
      keyFeatures: [
        "الصفحة الرئيسية التفاعلية بموجز ذكي للمقالات والمنشورات والأخبار في الوقت الفعلي ",
        "صفحة مشاريع البرمجة لتبادل وحل مشكلات الترميز مع المجتمع ",
        "متعدد لللغات ، نظام الالوان ، نظام التقييم",
        "صفحة المتجر لاستبدال النقاط بأشياء رائعة (قيد الإنشاء) ",
        "صفحة الملف الشخصي لعرض درجاتك وتصنيفاتك واتصالاتك وأصدقائك وكل نشاطك في مكان واحد ",
      ],
      clientFeedback:
        "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية",
    },
    rating: 4.6,
    reviews: [
      {
        id: "8",
        author: "عمر حسن",
        email: "omar@example.com",
        rating: 5,
        comment:
          "تطبيق مميز مع أمان عالي وتجربة رائعة. الخصوصية محمية بشكل ممتاز.",
        date: "2024-01-30",
      },
    ],
    liveUrl: "https://codelam.site",
    githubUrl: "https://codelam.site",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "الصفحة الرئيسية التفاعلية بموجز ذكي للمقالات والمنشورات والأخبار في الوقت الفعلي ",
      "صفحة مشاريع البرمجة لتبادل وحل مشكلات الترميز مع المجتمع ",
      "متعدد لللغات ، نظام الالوان ، نظام التقييم",
      "صفحة المتجر لاستبدال النقاط بأشياء رائعة (قيد الإنشاء) ",
      "صفحة الملف الشخصي لعرض درجاتك وتصنيفاتك واتصالاتك وأصدقائك وكل نشاطك في مكان واحد ",
    ],
  },
  {
    id: "aleppo-complaints",
    title: "شكاوي حلب ",
    description:
      "منصة لتقديم الشكاوى وتحسين التواصل بين المواطنين والجهات المعنية",
    fullDescription:
      'منصة "صوت حلب" تهدف إلى تحسين التواصل بين المواطنين والجهات المعنية، ومعالجة القضايا الخدمية بكفاءة وسرعة. تم تنفيذ المشروع في مدة قياسية بلغت أربعة أيام كمرحلة أولى، ويشمل خيارات مبتكرة لتقديم الشكاوى وإضافات فريدة لتحسين تجربة المستخدم',
    image: "/images/projects/local/project-ww.webp",
    youtubeVideo: "https://www.youtube.com/embed/pAZlIZjtQUk",
    category: "opensource",
    technologies: ["nextjs", "TypeScript", "Tailwind CSS", "mongodb", "Vercel"],
    duration: "20 يوم",
    rating: 4.1,
    reviews: [],
    // AI-relevant data
    aiData: {
      price: "مجاني ",
      clientType: "مجلس مدينة حلب والمواطنين",
      complexity: "متوسط",
      teamSize: "2 مطورين",
      keyFeatures: [
        "نظام تقديم الشكاوى التفاعلي",
        "تتبع حالة الشكوى في الوقت الفعلي",
        "لوحة تحكم للجهات المعنية",
        "إشعارات فورية",
        "تصنيف الشكاوى حسب النوع والمنطقة",
      ],
      clientFeedback:
        "تحسن ملحوظ في التواصل بين المواطنين والبلدية، وزيادة كفاءة معالجة الشكاوى",
      specialRequirements: [
        "الأمان والخصوصية",
        "دعم العربية",
        "سهولة الاستخدام لجميع الأعمار",
      ],
    },
    liveUrl: "https://aleppo.vercel.app",
    githubUrl: "https://github.com/MemoSy/aleppo",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "نظام تقديم الشكاوى التفاعلي",
      "تتبع حالة الشكوى في الوقت الفعلي",
      "لوحة تحكم للجهات المعنية",
      "إشعارات فورية",
      "تصنيف الشكاوى حسب النوع والمنطقة",
    ],
  },
  {
    id: "national-network-media",
    title: "الشبكة الوطنية للإعلام",
    description: "منصة إعلامية اخبارية",
    fullDescription:
      "منصة إعلامية متطورة تهدف لدعم التحول الرقمي في سوريا. تتميز بتصميم استثنائي وواجهة متجاوبة مع جميع أحجام الشاشات، وتقدم محتوى إعلامي هادف عبر مقالات وصور وفيديوهات وبودكاست.",
    image: "/images/projects/local/project-sara.webp",
    youtubeVideo: "https://www.youtube.com/embed/Hlw4cJAAqGk",
    category: "news",
    technologies: ["nextjs", "TypeScript", "Tailwind CSS", "mongodb"],
    duration: "شهرين",
    rating: 4.9,
    aiData: {
      price: "550$",
      clientType: " منصة اخبارية سورية",
      complexity: "متقدم",
      teamSize: "3 مطورين",
      keyFeatures: [
        "نظام ادارة محتوى متقدم",
        "دعم مرئيات متكامل",
        "لوحة تحكم سهلة ",
        "نظام تعليقات بدون تسجيل دخول",
        "مشاركة المقالات على منصات التواصل الاجتماعي",
        "تحسين محركات البحث (SEO)",
      ],
      clientFeedback:
        "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية",
    },
    reviews: [],
    liveUrl: "https://www.nationalsy.com/",
    githubUrl: "https://www.nationalsy.com",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "نظام ادارة محتوى متقدم",
      "دعم مرئيات متكامل",
      "لوحة تحكم سهلة ",
      "نظام تعليقات بدون تسجيل دخول",
      "مشاركة المقالات على منصات التواصل الاجتماعي",
      "تحسين محركات البحث (SEO)",
    ],
  },

  {
    id: "national-network-media-opensource",
    title: "الشبكة الوطنية للإعلام",
    description: "منصة إعلامية اخبارية ",
    fullDescription:
      "منصة إعلامية متطورة تهدف لدعم التحول الرقمي في سوريا. تتميز بتصميم استثنائي وواجهة متجاوبة مع جميع أحجام الشاشات، وتقدم محتوى إعلامي هادف عبر مقالات وصور وفيديوهات وبودكاست.",
    image: "/images/projects/local/project-sara-2.webp",
    youtubeVideo: "https://www.youtube.com/embed/Hlw4cJAAqGk",
    category: "opensource",
    technologies: ["nextjs", "TypeScript", "Tailwind CSS", "mongodb"],
    duration: "شهرين",
    rating: 4.9,
    aiData: {
      price: "550$",
      clientType: " منصة اخبارية سورية",
      complexity: "متقدم",
      teamSize: "3 مطورين",
      keyFeatures: [
        "نظام ادارة محتوى متقدم",
        "دعم مرئيات متكامل",
        "لوحة تحكم سهلة ",
        "نظام تعليقات بدون تسجيل دخول",
        "مشاركة المقالات على منصات التواصل الاجتماعي",
      ],
      clientFeedback:
        "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية",
    },
    reviews: [],
    liveUrl: "https://www.nationalsy.com",
    githubUrl: "https://www.nationalsy.com",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "نظام ادارة محتوى متقدم",
      "دعم مرئيات متكامل",
      "لوحة تحكم سهلة ",
      "نظام تعليقات بدون تسجيل دخول",
      "مشاركة المقالات على منصات التواصل الاجتماعي",
    ],
  },

  {
    id: "saas-platform",
    title: "مرافقي للذكي",
    description:
      "تطبيق الرعاية الصحية الذكية - معلومات مفصلة عن الأدوية + دقة في البحث",
    fullDescription:
      "مرافقي الذكي ليس مجرد تطبيق عادي ... رفيقك الصحي الشخصي الذي يرافقك في رحلتك نحو حياة أكثر صحة وسعادة 💖",
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/486236260_544696361977329_6887452373071879288_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LqREc9LIJI8Q7kNvwGQHR62&_nc_oc=AdkTOzgfVu8Nof44AUIJuMMICkZotWCr5IxsAYjtJgDlFzia6u0BCakkgCs7bEyEylY&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=OELJaIb19gzt0HqtGcZOBA&oh=00_AfXKq3SlGJXrXd53dIE3mEqn1jw6HEvDHqM3LBThGcyDNw&oe=68BA33E4",
    youtubeVideo: "https://www.youtube.com/embed/WZCu-RzEQBY",
    category: "saas",
    technologies: ["Next.js", "Prisma", "Vercel", "TypeScript", "Tailwind"],
    duration: "شهرين",
    rating: 4.8,
    reviews: [],
    aiData: {
      price: "999$",
      clientType: " منصة رعاية صحية ذكية ",
      complexity: "متوسط",
      teamSize: "3 مطورين",
      keyFeatures: [
        "دقة في المعلومة + لمسة إنسانية: معلومات موثوقة، وتفاعلات الأدوية، ودعم نفسي كله في مكان واحد.",
        'طبيب افتراضي "يعرفك": تحليل دقيق لتاريخك الصحي لتقديم نصائح مخصصة لك.',
        "لا تنسى أي شيء: تذكيرات بالأدوية، متابعة الجرعات، وتحويل عاداتك إلى إحصائيات ملهمة.",
        "لغتك ... بكل بساطة: نفهم تحديات المصطلحات الطبية المعقدة ونتحدث إليك بلغة واضحة ومباشرة.",
      ],
      clientFeedback:
        "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية",
    },
    liveUrl: "https://www.morafiqi.pro",
    githubUrl: "https://www.morafiqi.pro/",
    objectives: [
      "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
      "تحسين تجربة المستخدم وزيادة معدل التحويل",
      "ضمان الأداء العالي والاستجابة السريعة",
      "تطبيق أفضل ممارسات الأمان والحماية",
    ],
    challenges: [
      "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
      "ضمان التوافق مع جميع المتصفحات والأجهزة",
      "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
      "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
    ],
    features: [
      "دقة في المعلومة + لمسة إنسانية: معلومات موثوقة، وتفاعلات الأدوية، ودعم نفسي .",
      'طبيب افتراضي "يعرفك": تحليل دقيق لتاريخك الصحي لتقديم نصائح مخصصة لك.',
      "لا تنسى أي شيء: تذكيرات بالأدوية، متابعة الجرعات، وتحويل عاداتك إلى إحصائيات ملهمة.",
      "لغتك ... بكل بساطة: نفهم تحديات المصطلحات الطبية المعقدة ونتحدث إليك بلغة واضحة ومباشرة.",
    ],
  },
];

// Function to get translated service categories
export const getServiceCategories = (): ServiceCategory[] => {
  const t = i18n.t.bind(i18n);

  return [
    {
      id: "opensource",
      title: t("projectTabs.categories.opensource.title"),
      subtitle: "كود يلهم العالم",
      icon: "",
      description: t("projectTabs.categories.opensource.description"),
      projects: projects.filter((p) => p.category === "opensource"),
    },
    {
      id: "ecommerce",
      title: t("projectTabs.categories.ecommerce.title"),
      subtitle: "منصات تجارية تحقق الأرباح",
      icon: "🛒",
      description: t("projectTabs.categories.ecommerce.description"),
      projects: projects.filter((p) => p.category === "ecommerce"),
    },
    {
      id: "social",
      title: t("projectTabs.categories.social.title"),
      subtitle: "ربط العالم بالابتكار",
      icon: "🌐",
      description: t("projectTabs.categories.social.description"),
      projects: projects.filter((p) => p.category === "social"),
    },
    {
      id: "saas",
      title: t("projectTabs.categories.saas.title"),
      subtitle: "حلول متقدمة",
      icon: "💰",
      description: t("projectTabs.categories.saas.description"),
      projects: projects.filter((p) => p.category === "saas"),
    },
    {
      id: "news",
      title: t("projectTabs.categories.news.title"),
      subtitle: "اخبار و مقالات ",
      icon: "📰",
      description: t("projectTabs.categories.news.description"),
      projects: projects.filter((p) => p.category === "news"),
    },
    {
      id: "service",
      title: t("projectTabs.categories.service.title"),
      subtitle: "خدمي",
      icon: "💚",
      description: t("projectTabs.categories.service.description"),
      projects: projects.filter((p) => p.category === "service"),
    },
  ];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "opensource",
    title: "مفتوحة المصدر",
    subtitle: "كود يلهم العالم",
    icon: "",
    description: "مشاريع برمجية مفتوحة المصدر تساهم في تطوير المجتمع التقني",
    projects: projects.filter((p) => p.category === "opensource"),
  },
  // {
  //   id: "business",
  //   title: "صفحات شخصية",
  //   subtitle: "تقنيات تحول الأفكار لواقع",
  //   icon: "💼",
  //   description: "حلول تقنية متخصصة لإدارة الأعمال وتحسين الإنتاجية",
  //   projects: projects.filter((p) => p.category === "business"),
  // },
  {
    id: "ecommerce",
    title: "التجارة الإلكترونية",
    subtitle: "منصات تجارية تحقق الأرباح",
    icon: "🛒",
    description:
      "متاجر إلكترونية احترافية بتقنيات دفع آمنة وتجربة مستخدم متميزة",
    projects: projects.filter((p) => p.category === "ecommerce"),
  },
  // {
  //   id: "education",
  //   title: "المنصات التعليمية",
  //   subtitle: "مستقبل التعلم الرقمي",
  //   icon: "🎓",
  //   description: "منصات تعليمية تفاعلية مع تقنيات الذكاء الاصطناعي",
  //   projects: projects.filter((p) => p.category === "education"),
  // },
  {
    id: "social",
    title: "الشبكات الاجتماعية",
    subtitle: "ربط العالم بالابتكار",
    icon: "🌐",
    description: "منصات تواصل اجتماعي مع ميزات متقدمة وحماية الخصوصية",
    projects: projects.filter((p) => p.category === "social"),
  },
  {
    id: "saas",
    title: "مشاريع ربحية",
    subtitle: "حلول متقدمة",
    icon: "💰",
    description: "برمجية كخدمة مع إدارة شاملة و لوحة تحكم احترافية ",
    projects: projects.filter((p) => p.category === "saas"),
  },
  {
    id: "news",
    title: "منصات اخبارية",
    subtitle: "اخبار و مقالات ",
    icon: "📰",
    description: "برمجية كخدمة مع إدارة شاملة و لوحة تحكم احترافية ",
    projects: projects.filter((p) => p.category === "news"),
  },
  {
    id: "service",
    title: "مشاريع خدمية",
    subtitle: "خدمي",
    icon: "💚",
    description: "برمجية كخدمة مع إدارة شاملة و لوحة تحكم احترافية ",
    projects: projects.filter((p) => p.category === "service"),
  },
];
