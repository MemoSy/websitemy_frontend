import { Project, ServiceCategory } from "../types";

export const projects: Project[] = [
  {
    id: "ecommerce-luxury",
    title: "المتجر الذكي  ",
    description:
      "منصة تجارة إلكترونية متطورة بتصميم حديث وتجربة مستخدم استثنائية",
    fullDescription:
      "تم تطوير هذا المتجر الإلكتروني باستخدام أحدث التقنيات لضمان تجربة تسوق سلسة ومرضية. يتضمن نظام إدارة محتوى قوي، نظام ذكي، وتحليلات مبيعات متقدمة. المشروع يهدف إلى توفير منصة شاملة للتجارة الإلكترونية مع واجهة مستخدم حديثة وسهلة الاستخدام، بالإضافة إلى نظام إدارة متقدم للمنتجات والطلبات.",
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/508320313_24497356569868228_8666842211716543680_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uXop0GSff2kQ7kNvwHMQOYw&_nc_oc=Adku94XwPikm_95aR4tGZdFuo9TFbfiF_PruY1NSvkRjdZcc98RHE7z5_9n3t1rowuM&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=Mo0FFxHPYglIgvjFyKa5XQ&oh=00_AfSPyuMTmQLO2-vEN3X_PsYgso8dgyzB3r072cedOAS2kQ&oe=6870A168",
    youtubeVideo: "https://www.youtube.com/embed/LtP5HDSfcmw",
    category: "ecommerce",
    technologies: ["nextjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "2 أشهر",
    rating: 4.8,
    // AI-relevant data
    aiData: {
      price: "650$",
      clientType: " متجر للكتروني ذكي",
      complexity: "متقدم",
      teamSize: "3 مطورين",
      keyFeatures: [
        "لغات متعددة",
        "لوحة تحكم متقدمة جدا",
        "نظام تبديل الاستايلات",
        "نظام تقييم المنتجات",
        "نظام تعليقات دون تسجيل",
      ],
      clientFeedback: "تجربة ممتازة وزيادة في المبيعات بنسبة 40%",
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
      {
        id: "3",
        author: "خالد السعيد",
        email: "khalid@example.com",
        rating: 5,
        comment:
          "المتجر يعمل بسرعة عالية ونظام الدفع آمن جداً. خدمة عملاء ممتازة.",
        date: "2024-01-20",
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
      "تصميم متجاوب يعمل على جميع الأجهزة",
      "نظام إدارة محتوى متقدم",
      "تحليلات وتقارير في الوقت الفعلي",
      "نظام دفع آمن ومتعدد الطرق",
      "تحسين محركات البحث (SEO)",
      "نظام إشعارات ذكي",
    ],
  },

  {
    id: "artwin-mobile",
    title: "artwin mobile ",
    description:
      "Modern tasarıma ve olağanüstü kullanıcı deneyimine sahip, gelişmiş .",
    fullDescription:
      "Bu çevrimiçi mağaza, sorunsuz ve tatmin edici bir alışveriş deneyimi sağlamak için en son teknolojiler kullanılarak geliştirildi. Sağlam bir içerik yönetim sistemi, akıllı bir sistem ve gelişmiş satış analitiği içerir. Proje, modern ve kullanımı kolay bir kullanıcı arayüzüne sahip kapsamlı bir e-ticaret platformu ve gelişmiş bir ürün ve sipariş yönetim sistemi sağlamayı amaçlamaktadır.",
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/516749284_24662635610006989_4709968631134916215_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=io_9W1tymLcQ7kNvwFgoibo&_nc_oc=AdkSOriu7FRVq6HGi7ya7a8eW1e3fIZ4kCclSDeEmEZN89Zh3ADVvcMEY-bdnbH8l9U&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=vREQoXneEk1A-_AokG174g&oh=00_AfQfahZBBT0MCx32akAyEjoh4RSM8kFKHcMJkWvtesMjJQ&oe=6870BFBD",
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
    id: "pro-camz",
    title: "Pro Camz ",
    description: "متجر الكتروني لبيع الكميرات و مستلزماتها",
    fullDescription:
      "تم تطوير هذا المتجر الإلكتروني باستخدام أحدث التقنيات لضمان تجربة تسوق سلسة ومرضية. يتضمن نظام إدارة محتوى قوي، نظام ذكي، وتحليلات مبيعات متقدمة. المشروع يهدف إلى توفير منصة شاملة للتجارة الإلكترونية مع واجهة مستخدم حديثة وسهلة الاستخدام، بالإضافة إلى نظام إدارة متقدم للمنتجات والطلبات.",
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/508320313_24497356569868228_8666842211716543680_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uXop0GSff2kQ7kNvwHMQOYw&_nc_oc=Adku94XwPikm_95aR4tGZdFuo9TFbfiF_PruY1NSvkRjdZcc98RHE7z5_9n3t1rowuM&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=Mo0FFxHPYglIgvjFyKa5XQ&oh=00_AfSPyuMTmQLO2-vEN3X_PsYgso8dgyzB3r072cedOAS2kQ&oe=6870A168",
    youtubeVideo: "https://www.youtube.com/embed/bcTyXAuDjWg",
    category: "ecommerce",
    technologies: ["nextjs", "nesjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "2 أشهر",
    rating: 4.8,
    aiData: {
      price: "550$",
      clientType: "متجر الكتروني لبيع الكميرات ومستلزماتها  ",
      complexity: "متوسط",
      teamSize: "3 مطورين",
      keyFeatures: [
        "كتالوج منتجات تفاعلي ثلاثي الأبعاد",
        "نظام ذكي",
        "دعم اللغة التركية والإنجليزية",
        "تكامل مع أنظمة الشحن المحلية",
        "نظام إدارة الموردين",
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
      {
        id: "3",
        author: "خالد السعيد",
        email: "khalid@example.com",
        rating: 5,
        comment:
          "المتجر يعمل بسرعة عالية ونظام الدفع آمن جداً. خدمة عملاء ممتازة.",
        date: "2024-01-20",
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
      "https://media.licdn.com/dms/image/v2/D4D22AQGUvd0rRP6wIg/feedshare-shrink_800/B4DZU.tmg9GcAk-/0/1740513897144?e=1755129600&v=beta&t=E-HGyvPEdziUkVAJshCPZwCChodk45Ki4QxNmIjDHwU",
    youtubeVideo: "https://www.youtube.com/embed/z_F3Gg7wU9U",
    category: "social",
    technologies: ["nextjs", "MongoDB", "TailwindCSS", "typescript"],
    duration: "6 أيام ",
    rating: 4.8,
    aiData: {
      price: "700$",
      clientType: "منصة تواصل اجتماعي ذكية وآمنة ",
      complexity: "متوسط",
      teamSize: "1 مطورين",
      keyFeatures: [
        "منصة اجتماعية بدون تنمر 🚫",
        "بدون لايك وديسلايك – التركيز على الفكرة فقط 💡",
        "حرية تعبير كاملة للجميع 🗣️",
        "التعليقات المفيدة تتصدر تلقائيًا 📈",
        "تلخيص ذكي فوري للمنشورات والتعليقات 📝",
      ],
      clientFeedback: " تحسين الكفاءة التشغيلية",
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
      "منصة اجتماعية بدون تنمر 🚫",
      "بدون لايك وديسلايك – التركيز على الفكرة فقط 💡",
      "حرية تعبير كاملة للجميع 🗣️",
      "التعليقات المفيدة تتصدر تلقائيًا 📈",
      "تلخيص ذكي فوري للمنشورات والتعليقات 📝",
    ],
  },

  {
    id: "business",
    title: "ذاكرة الشهداء",
    description: "ذاكرة الشهداء - مشروع من القلب إلى القلب",
    fullDescription:
      "موقع ويب مخصص لحفظ ذكريات وقصص شهدائنا الأبطال، حيث يمكن لأي شخص مشاركة قصة شهيد عزيز عليه والاحتفاظ بذكراه للأبد.",
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/517409080_626449267135371_7841475971420964745_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3ilNCB_voVMQ7kNvwFWOI3e&_nc_oc=Adm_skX-FojKWb1FuXyDvp6EVOFSDYbkecCYat6cSlsuAAfyyGCNyZMQHgrmqcG6iws&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=flthZgnLKwTSLk_HqEw7ZQ&oh=00_AfTeT6rd_i5M0EqY1DxPOTN9TFRRn8gyIgAjtFBX-CAhFg&oe=68720365",
    youtubeVideo: "https://www.youtube.com/embed/yQmvvSDn8lM",
    category: "service",
    technologies: ["nextjs", "nestjs", "mongodb", "tailwindcss", "typescript"],
    duration: "3 اسابيع",
    rating: 4.9,
    reviews: [
      {
        id: "4",
        author: "محمد خالد",
        email: "mohammed@example.com",
        rating: 5,
        comment:
          "حل شامل ومتكامل، سهل الاستخدام وقوي. ساعدنا كثيراً في تنظيم أعمالنا.",
        date: "2024-01-20",
      },
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
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
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
  // {
  //   id: "learning-platform",
  //   title: "منصة  الذكية",
  //   description: "منصة تعليمية تفاعلية مع نظام تتبع التقدم والتقييمات الذكية",
  //   fullDescription:
  //     "منصة تعليمية حديثة تستخدم الذكاء الاصطناعي لتخصيص تجربة التعلم. تتضمن دروس تفاعلية، اختبارات ذكية، وتتبع شامل للتقدم. المنصة مصممة لتوفير تجربة تعليمية شخصية ومتقدمة مع أدوات تفاعلية متنوعة وإمكانيات تتبع دقيقة لأداء الطلاب.",
  //   image:
  //     "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   youtubeVideo: "https://www.youtube.com/embed/bcTyXAuDjWg",
  //   category: "education",
  //   technologies: [
  //     "React",
  //     "Python",
  //     "TensorFlow",
  //     "Redis",
  //     "WebRTC",
  //     "Socket.io",
  //     "FastAPI",
  //   ],
  //   duration: "5 أشهر",
  //   rating: 4.7,
  //   aiData: {
  //     price: "800$",
  //     clientType: "شركة أثاث تركية",
  //     complexity: "متقدم",
  //     teamSize: "4 مطورين",
  //     keyFeatures: [
  //       "كتالوج منتجات تفاعلي ثلاثي الأبعاد",
  //       "نظام ذكي",
  //       "دعم اللغة التركية والإنجليزية",
  //       "تكامل مع أنظمة الشحن المحلية",
  //       "نظام إدارة الموردين"
  //     ],
  //     clientFeedback: "زيادة الطلبات الدولية بنسبة 60% وتحسين الكفاءة التشغيلية"
  //   },
  //   reviews: [
  //     {
  //       id: "6",
  //       author: "سارة أحمد",
  //       email: "sara@example.com",
  //       rating: 5,
  //       comment:
  //         "منصة رائعة للتعلم، واجهة سهلة ومحتوى ممتاز. التفاعل مع المحتوى مذهل.",
  //       date: "2024-01-25",
  //     },
  //     {
  //       id: "7",
  //       author: "يوسف محمد",
  //       email: "youssef@example.com",
  //       rating: 4,
  //       comment:
  //         "نظام التتبع مفيد جداً ويساعد في متابعة التقدم. تجربة تعليمية متميزة.",
  //       date: "2024-02-01",
  //     },
  //   ],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com/example/project",
  //   objectives: [
  //     "تطوير واجهة مستخدم حديثة وسهلة الاستخدام",
  //     "تحسين تجربة المستخدم وزيادة معدل التحويل",
  //     "ضمان الأداء العالي والاستجابة السريعة",
  //     "تطبيق أفضل ممارسات الأمان والحماية",
  //   ],
  //   challenges: [
  //     "تحسين أداء التطبيق للتعامل مع حجم كبير من البيانات",
  //     "ضمان التوافق مع جميع المتصفحات والأجهزة",
  //     "تطبيق نظام أمان متقدم لحماية بيانات المستخدمين",
  //     "تطوير واجهة برمجة تطبيقات قابلة للتوسع",
  //   ],
  //   features: [
  //     "تصميم متجاوب يعمل على جميع الأجهزة",
  //     "نظام إدارة محتوى متقدم",
  //     "تحليلات وتقارير في الوقت الفعلي",
  //     "نظام دفع آمن ومتعدد الطرق",
  //     "تحسين محركات البحث (SEO)",
  //     "نظام إشعارات ذكي",
  //   ],
  // },
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
    duration: "4 أشهر",
    aiData: {
      price: "1200$",
      clientType: "منصة اجتماعية",
      complexity: "متقدم",
      teamSize: "2 مطورين",
      keyFeatures: [
        "الصفحة الرئيسية التفاعلية بموجز ذكي للمقالات والمنشورات والأخبار في الوقت الفعلي 🏠🧠",
        "صفحة مشاريع البرمجة لتبادل وحل مشكلات الترميز مع المجتمع 💻☕",
        "متعدد لللغات ، نظام الالوان ، نظام التقييم🎨🎁",
        "صفحة المتجر لاستبدال النقاط بأشياء رائعة (قيد الإنشاء) 🛍️😎",
        "صفحة الملف الشخصي لعرض درجاتك وتصنيفاتك واتصالاتك وأصدقائك وكل نشاطك في مكان واحد 👤📈",
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
      {
        id: "9",
        author: "مريم علي",
        email: "mariam@example.com",
        rating: 4,
        comment: "واجهة جميلة وسهلة الاستخدام. ميزات التواصل متطورة جداً.",
        date: "2024-02-05",
      },
    ],
    liveUrl: "https://codelam.tech",
    githubUrl: "https://codelam.tech",
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
      "نظام إدارة محتوى متقدم",
      "تحليلات وتقارير في الوقت الفعلي",
      "نظام دفع آمن ومتعدد الطرق",
      "تحسين محركات البحث (SEO)",
      "نظام إشعارات ذكي",
    ],
  },
  {
    id: "aleppo-complaints",
    title: "شكاوي حلب ",
    description:
      "منصة لتقديم الشكاوى وتحسين التواصل بين المواطنين والجهات المعنية",
    fullDescription:
      'منصة "صوت حلب" تهدف إلى تحسين التواصل بين المواطنين والجهات المعنية، ومعالجة القضايا الخدمية بكفاءة وسرعة. تم تنفيذ المشروع في مدة قياسية بلغت أربعة أيام كمرحلة أولى، ويشمل خيارات مبتكرة لتقديم الشكاوى وإضافات فريدة لتحسين تجربة المستخدم',
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/516404357_24662499733353910_2641557888058806741_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FTp_ik5FP9sQ7kNvwHX-KLN&_nc_oc=Adk9jyhUCueF0p5p10sW-mLsxIeuibH7ZI6sESylssB8wgiU5-ThC_2uc5bTux_S9SM&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=CS4aGQtStH_Vu_621BRl1A&oh=00_AfTVxLOrUZoTVg3noaYxcsjC5xyRoBPK2zRPiQXB2srBsA&oe=6870B44D",
    youtubeVideo: "https://www.youtube.com/embed/pAZlIZjtQUk",
    category: "opensource",
    technologies: ["nextjs", "TypeScript", "Tailwind CSS", "mongodb", "Vercel"],
    duration: "10 ايام",
    rating: 4.9,
    reviews: [],
    // AI-relevant data
    aiData: {
      price: "مجاني - مشروع مجتمعي",
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
      "تصميم متجاوب يعمل على جميع الأجهزة",
      "نظام إدارة محتوى متقدم",
      "تحليلات وتقارير في الوقت الفعلي",
      "نظام دفع آمن ومتعدد الطرق",
      "تحسين محركات البحث (SEO)",
      "نظام إشعارات ذكي",
    ],
  },
  {
    id: "national-network-media",
    title: "الشبكة الوطنية للإعلام",
    description: "منصة إعلامية متكاملة لدعم التحول الرقمي في سوريا",
    fullDescription:
      "منصة إعلامية متطورة تهدف لدعم التحول الرقمي في سوريا. تتميز بتصميم استثنائي وواجهة متجاوبة مع جميع أحجام الشاشات، وتقدم محتوى إعلامي هادف عبر مقالات وصور وفيديوهات وبودكاست.",
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/495157847_575674358879529_7216978117534140260_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uOBVHjlVbGUQ7kNvwEsyrQ9&_nc_oc=AdlVfLjZLJgeXllVBFQIMA0HI8OKbAe4ji_OwHRRJrS9T5tn9LN5xSNL_lyTa9RXfJo&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=vRXfuN3RlgTkMD72jlRofw&oh=00_AfS5Gjb_6Y_vyS99S_0I2OgZGl9Hhagc_E12J8ZEZlvWWg&oe=6870AE35",
    youtubeVideo: "https://www.youtube.com/embed/Hlw4cJAAqGk",
    category: "news",
    technologies: ["nextjs", "TypeScript", "Tailwind CSS", "mongodb"],
    duration: "شهرين",
    rating: 4.9,
    aiData: {
      price: "500$",
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
      "تصميم متجاوب يعمل على جميع الأجهزة",
      "نظام إدارة محتوى متقدم",
      "تحليلات وتقارير في الوقت الفعلي",
      "نظام دفع آمن ومتعدد الطرق",
      "تحسين محركات البحث (SEO)",
      "نظام إشعارات ذكي",
    ],
  },


  {
    id: "national-network-media",
    title: "الشبكة الوطنية للإعلام",
    description: "منصة إعلامية متكاملة لدعم التحول الرقمي في سوريا",
    fullDescription:
      "منصة إعلامية متطورة تهدف لدعم التحول الرقمي في سوريا. تتميز بتصميم استثنائي وواجهة متجاوبة مع جميع أحجام الشاشات، وتقدم محتوى إعلامي هادف عبر مقالات وصور وفيديوهات وبودكاست.",
    image:
      "https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/495157847_575674358879529_7216978117534140260_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uOBVHjlVbGUQ7kNvwEsyrQ9&_nc_oc=AdlVfLjZLJgeXllVBFQIMA0HI8OKbAe4ji_OwHRRJrS9T5tn9LN5xSNL_lyTa9RXfJo&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=vRXfuN3RlgTkMD72jlRofw&oh=00_AfS5Gjb_6Y_vyS99S_0I2OgZGl9Hhagc_E12J8ZEZlvWWg&oe=6870AE35",
    youtubeVideo: "https://www.youtube.com/embed/Hlw4cJAAqGk",
    category: "opensource",
    technologies: ["nextjs", "TypeScript", "Tailwind CSS", "mongodb"],
    duration: "شهرين",
    rating: 4.9,
    aiData: {
      price: "500$",
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
      "تصميم متجاوب يعمل على جميع الأجهزة",
      "نظام إدارة محتوى متقدم",
      "تحليلات وتقارير في الوقت الفعلي",
      "نظام دفع آمن ومتعدد الطرق",
      "تحسين محركات البحث (SEO)",
      "نظام إشعارات ذكي",
    ],
  },

  {
    id: "saas-platform",
    title: "مرافقي للذكي",
    description:
      "تطبيق الرعاية الصحية الذكية - معلومات مفصلة عن الأدوية + دقة في البحث + دعم نفسي",
    fullDescription:
      "مرافقي الذكي ليس مجرد تطبيق عادي ... رفيقك الصحي الشخصي الذي يرافقك في رحلتك نحو حياة أكثر صحة وسعادة 💖",
    image:
      "https://media.licdn.com/dms/image/v2/D4D22AQGk2gmnQyo7Fg/feedshare-shrink_2048_1536/B4DZW_V9UYHYAo-/0/1742671959987?e=1754524800&v=beta&t=bdpeYC7d0WsO3Hy090bbfG_yJo65Uh7jWhEqJ7NNrEI",
    youtubeVideo: "https://www.youtube.com/embed/WZCu-RzEQBY",
    category: "saas",
    technologies: ["Next.js", "Prisma", "Vercel", "TypeScript", "Tailwind"],
    duration: "8 أشهر",
    rating: 4.8,
    reviews: [
      {
        id: "12",
        author: "حسام الدين",
        email: "hossam@example.com",
        rating: 5,
        comment:
          "منصة احترافية ومتكاملة، تلبي جميع احتياجاتنا. نظام الاشتراكات مرن جداً.",
        date: "2024-02-10",
      },
      {
        id: "13",
        author: "رانيا محمد",
        email: "rania@example.com",
        rating: 4,
        comment: "حل شامل وقوي للأعمال. التحليلات والتقارير مفيدة جداً.",
        date: "2024-02-15",
      },
    ],
    aiData: {
      price: "500$",
      clientType: "  منصة رعاية صحية",
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

export const serviceCategories: ServiceCategory[] = [
  {
    id: "opensource",
    title: "مشاريع مفتوحة المصدر",
    subtitle: "كود يلهم العالم",
    icon: "🚀",
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
