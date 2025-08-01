import { projects, serviceCategories } from "../data/projects";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBKhvS66Ly1vvaohyyywqsqmkX4glcJIlw");

export interface CompanyInfo {
  name: string;
  expertise: string;
  experience: string;
  satisfaction: string;
  completedProjects: string;
  technologies: string[];
  specialties: string[];
}

export interface AIKnowledgeBase {
  companyInfo: CompanyInfo;
  projects: any[];
  categories: any[];
  commonQuestions: {
    question: string;
    answer: string;
  }[];
}

export const companyInfo: CompanyInfo = {
  name: "WebSiteMy",
  expertise: "تطوير مواقع الويب والتطبيقات الحديثة",
  experience: "5+ سنوات",
  satisfaction: "98% عملاء راضون",
  completedProjects: "150+ مشروع منجز",
  technologies: [
    "React.js",
    "Next.js",
    "Vue.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Bootstrap",
    "Docker",
    "AWS",
    "Vercel",
  ],
  specialties: [
    "التجارة الإلكترونية",
    "المنصات التعليمية",
    "الشبكات الاجتماعية",
    "المشاريع مفتوحة المصدر",
    "المنصات الإخبارية",
    "الصفحات الشخصية",
  ],
};

export const commonQuestions = [
  {
    question: "ما هي أسعار المشاريع؟",
    answer: `أسعار مشاريعنا تبدأ من 500$ وتصل إلى 3000$ حسب التعقيد والميزات المطلوبة. إليك أمثلة:

• المشاريع البسيطة: 500$ - 1000$ (صفحات شخصية، مواقع تعريفية)
• المشاريع المتوسطة: 1000$ - 2000$ (متاجر إلكترونية بسيطة، منصات تعليمية)
• المشاريع المتقدمة: 2000$ - 3000$ (أنظمة إدارة معقدة، منصات SaaS)

السعر النهائي يعتمد على:
- عدد الصفحات والميزات
- التقنيات المستخدمة
- التصميم المخصص
- التكامل مع أنظمة خارجية`,
  },
  {
    question: "كم تستغرق مدة التطوير؟",
    answer: `مدة التطوير تعتمد على حجم وتعقيد المشروع:

• المشاريع البسيطة: 1-2 أسبوع
• المشاريع المتوسطة: 3-8 أسابيع  
• المشاريع المعقدة: 2-6 أشهر

نحن نلتزم بالمواعيد المحددة ونقدم تحديثات دورية حول تقدم العمل.`,
  },
  {
    question: "ما هي التقنيات التي تستخدمونها؟",
    answer: `نحن نعمل بأحدث التقنيات الحديثة:

**Frontend:**
• React.js & Next.js
• Vue.js
• TypeScript/JavaScript
• Tailwind CSS & Bootstrap

**Backend:**
• Node.js & Express.js
• Python & FastAPI
• MongoDB & PostgreSQL

**DevOps & Hosting:**
• Docker
• AWS & Vercel
• Git & GitHub

نختار التقنية المناسبة لكل مشروع حسب متطلباته.`,
  },
];

export const generateKnowledgeBase = (): AIKnowledgeBase => {
  return {
    companyInfo,
    projects: projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      category: project.category,
      technologies: project.technologies,
      duration: project.duration,
      rating: project.rating,
      features: project.features,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      objectives: project.objectives,
      challenges: project.challenges,
      ...project.aiData,
    })),
    categories: serviceCategories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      subtitle: cat.subtitle,
      description: cat.description,
      projectCount: cat.projects.length,
      projects: cat.projects.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.aiData?.price,
        complexity: p.aiData?.complexity,
      })),
    })),
    commonQuestions,
  };
};




// دالة لتحليل السياق واستخراج المعلومات المهمة
const analyzeContext = (conversationHistory: Array<{text: string, isUser: boolean}>) => {
  let currentTopic = '';
  let lastMentionedProject = '';
  
  // البحث عن آخر موضوع تم مناقشته
  for (let i = conversationHistory.length - 1; i >= 0; i--) {
    const message = conversationHistory[i];
    if (message.isUser) {
      const text = message.text.toLowerCase();
      
      // تحديد نوع المشروع المطلوب
      if (text.includes('أخبار') || text.includes('إعلام') || text.includes('صحافة')) {
        currentTopic = 'news';
      } else if (text.includes('متجر') || text.includes('تجارة') || text.includes('متجر إلكتروني')) {
        currentTopic = 'ecommerce';
      } else if (text.includes('تعليم') || text.includes('منصة تعليمية') || text.includes('دورات')) {
        currentTopic = 'education';
      } else if (text.includes('شخصي') || text.includes('بروفايل') || text.includes('سيرة ذاتية')) {
        currentTopic = 'personal';
      } else if (text.includes('اجتماعي') || text.includes('شبكة اجتماعية')) {
        currentTopic = 'social';
      }
      
      if (currentTopic) break;
    } else {
      // البحث عن اسم المشروع في رد المساعد
      const assistantText = message.text;
      if (assistantText.includes('الشبكة الوطنية للإعلام')) {
        lastMentionedProject = 'الشبكة الوطنية للإعلام';
      } else if (assistantText.includes('المتجر الذكي')) {
        lastMentionedProject = 'المتجر الذكي';
      } else if (assistantText.includes('أكاديمية التعلم')) {
        lastMentionedProject = 'أكاديمية التعلم الرقمي';
      }
    }
  }
  
  return { currentTopic, lastMentionedProject };
};

export const callGeminiAPI = async (
  currentMessage: string,
  context: AIKnowledgeBase,
  conversationHistory: Array<{text: string, isUser: boolean}> = []
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite-preview-06-17",
    });

    // تحليل السياق
    const contextAnalysis = analyzeContext(conversationHistory);

    // بناء تاريخ المحادثة لإرساله مع الطلب
    const conversationContext = conversationHistory.length > 0 
      ? `تاريخ المحادثة السابقة:
${conversationHistory.map((msg, index) => 
  `${index + 1}. ${msg.isUser ? 'المستخدم' : 'المساعد'}: ${msg.text}`
).join('\n')}

تحليل السياق:
- الموضوع الحالي: ${contextAnalysis.currentTopic}
- آخر مشروع مذكور: ${contextAnalysis.lastMentionedProject}

السؤال الحالي: ${currentMessage}`
      : `السؤال: ${currentMessage}`;

    const prompt = `أنت سكرتير محترف لشركة WebSiteMy المتخصصة في تطوير مواقع الويب والتطبيقات. تتحدث بطبيعية كما يتحدث أي سكرتير حقيقي مع العملاء.

لديك الوصول إلى المعلومات التالية:
- معلومات الشركة: ${JSON.stringify(context.companyInfo, null, 2)}
- المشاريع المنجزة: ${JSON.stringify(context.projects, null, 2)}
- فئات الخدمات: ${JSON.stringify(context.categories, null, 2)}

${conversationContext}

قواعد الرد الأساسية:

1. تذكر المحادثة السابقة تماماً:
- اقرأ تاريخ المحادثة بعناية وافهم السياق الكامل
- استخدم تحليل السياق لفهم الموضوع الحالي وآخر مشروع مذكور
- إذا تم الحديث عن نوع معين من المشاريع، تابع الحديث عن نفس النوع
- إذا سأل المستخدم عن "سعر" أو "تكلفة"، اربط ذلك بآخر نوع مشروع تم مناقشته
- إذا طلب "رابط المعاينة"، أعطه رابط آخر مشروع تحدثتم عنه

2. الفهم السياقي الذكي:
- عندما يسأل عن موقع أخبار ثم يسأل عن السعر، يقصد سعر موقع الأخبار
- عندما يسأل عن متجر ثم يسأل عن المدة، يقصد مدة تطوير المتجر
- عندما يقول "كم السعر؟" بدون تحديد، يقصد سعر آخر نوع مشروع تحدثتم عنه
- عندما يقول "أريد رابط المعاينة" يقصد رابط آخر مشروع ذكرته له
- لا تخلط بين أنواع المشاريع - ابق ضمن نفس السياق

3. عدم التكرار والطبيعية:
- لا تكرر العبارات الترحيبية في كل رد
- تحدث بشكل طبيعي كما لو كانت محادثة مستمرة
- لا تعيد تقديم نفسك في كل رد
- استخدم عبارات ربط مثل "كما ذكرت سابقاً" أو "بناءً على ما تحدثنا عنه"

4. الدقة في الإجابة:
- اختر المشروع المناسب تماماً للسياق
- إذا كانت المحادثة عن الأخبار، ابحث في مشاريع الأخبار فقط
- إذا كانت عن التجارة الإلكترونية، ابحث في المتاجر فقط
- إذا كانت عن التعليم، ابحث في المنصات التعليمية فقط

5. استمرارية المحادثة:
- بناءً على السياق، قدم معلومات إضافية مفيدة
- إذا أعطيت سعراً، اقترح الخطوة التالية
- احتفظ بنبرة المحادثة نفسها
- اجعل كل رد يبني على الردود السابقة

6. أمثلة للسياق المتقدم:
- إذا سأل عن "موقع أخبار" ثم "كم السعر؟" → "موقع الأخبار مثل الشبكة الوطنية للإعلام يكلف 500 دولار"
- إذا سأل عن "متجر إلكتروني" ثم "رابط المعاينة؟" → "تفضل رابط المتجر الذكي الذي تحدثنا عنه"
- إذا سأل عن "منصة تعليمية" ثم "المدة؟" → "منصة التعليم تحتاج حوالي 6 أسابيع للتطوير"

7. للاستفسارات المعقدة:
إذا احتاج تفاصيل أكثر تخصصاً، قل: "دعني أوصلك بالمدير للحصول على تفاصيل أكثر دقة +905313345111"

المطلوب: كن سكرتير ذكي يتذكر كل تفاصيل المحادثة ويفهم السياق بعمق، ويتابع من حيث انتهى الحديث، مع الحفاظ على السياق والهدف من المحادثة بدقة تامة.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
};
