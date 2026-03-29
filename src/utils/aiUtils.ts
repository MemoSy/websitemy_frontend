import { projects, serviceCategories } from "../data/projects";
import { faqData } from "../data/faqData";
import {
  generateAdvancedSystemPrompt,
  validateAIResponse,
  trackOffTopicAttempts,
} from "./aiSystemPrompt";
import { searchFAQ } from "../data/faqData";

// Backend AI proxy URL (avoids CORS from browser direct calls)
const AI_PROXY_URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/chat/ai-proxy`
  : "https://websitemy-backend.vercel.app/chat/ai-proxy";

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
  expertise: "تطوير مواقع الويب والتطبيقات الحديثة باستخدام أحدث التقنيات",
  experience: "5+ سنوات خبرة في تطوير المشاريع الاحترافية",
  satisfaction: "98% من عملائنا راضون عن خدماتنا",
  completedProjects: "9+ مشاريع منجزة ومنشورة",
  technologies: [
    "React.js",
    "Next.js",
    "NestJS",
    "MongoDB",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Prisma",
    "Vercel",
  ],
  specialties: [
    "المواقع التعريفية الشخصية والاحترافية",
    "متاجر الكترونية",
    "المنصات التعليمية والأكاديميات",
    "منصات اجتماعية",
    "موقع أعمالي",
    "مواقع خدمية",
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
    answer: `نحن نستخدم أحدث التقنيات الموجودة فعلياً في مشاريعنا المنشورة:

**Frontend (الواجهة الأمامية):**
• React.js - مكتبة قوية لبناء واجهات تفاعلية
• Next.js - إطار عمل React متقدم للأداء العالي والـ SEO
• TypeScript & JavaScript - للكود الآمن والمنظم
• Tailwind CSS - لتصاميم عصرية ومتجاوبة

**Backend (الخادم):**
• NestJS - إطار عمل Node.js احترافي للـ Backend
• MongoDB - قاعدة بيانات NoSQL مرنة وسريعة
• Prisma - ORM حديث لإدارة قواعد البيانات

**Hosting (الاستضافة):**
• Vercel - استضافة سريعة وموثوقة

**لماذا هذه التقنيات بالذات؟**
• ✅ مستخدمة فعلياً في جميع مشاريعنا المنشورة
• ✅ سريعة وآمنة ومثبتة في الإنتاج
• ✅ سهلة الصيانة والتطوير المستقبلي
• ✅ مدعومة بمجتمع كبير ومستمرة التحديث

يمكنك معاينة مشاريعنا الحية لترى هذه التقنيات تعمل في الواقع!`,
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
    commonQuestions: faqData.map((faq) => ({
      question: faq.question,
      answer: faq.shortAnswer || faq.answer.substring(0, 200),
    })),
  };
};

// دالة لتحليل السياق واستخراج المعلومات المهمة
const analyzeContext = (
  conversationHistory: Array<{ text: string; isUser: boolean }>,
) => {
  let currentTopic = "";
  let lastMentionedProject = "";

  // البحث عن آخر موضوع تم مناقشته
  for (let i = conversationHistory.length - 1; i >= 0; i--) {
    const message = conversationHistory[i];
    if (message.isUser) {
      const text = message.text.toLowerCase();

      // تحديد نوع المشروع المطلوب
      if (
        text.includes("أخبار") ||
        text.includes("إعلام") ||
        text.includes("صحافة")
      ) {
        currentTopic = "news";
      } else if (
        text.includes("متجر") ||
        text.includes("تجارة") ||
        text.includes("متجر إلكتروني")
      ) {
        currentTopic = "ecommerce";
      } else if (
        text.includes("تعليم") ||
        text.includes("منصة تعليمية") ||
        text.includes("دورات")
      ) {
        currentTopic = "education";
      } else if (
        text.includes("شخصي") ||
        text.includes("بروفايل") ||
        text.includes("سيرة ذاتية")
      ) {
        currentTopic = "personal";
      } else if (text.includes("اجتماعي") || text.includes("شبكة اجتماعية")) {
        currentTopic = "social";
      }

      if (currentTopic) break;
    } else {
      // البحث عن اسم المشروع في رد المساعد
      const assistantText = message.text;
      if (assistantText.includes("الشبكة الوطنية للإعلام")) {
        lastMentionedProject = "الشبكة الوطنية للإعلام";
      } else if (assistantText.includes("المتجر الذكي")) {
        lastMentionedProject = "المتجر الذكي";
      } else if (assistantText.includes("أكاديمية التعلم")) {
        lastMentionedProject = "أكاديمية التعلم الرقمي";
      }
    }
  }

  return { currentTopic, lastMentionedProject };
};

// دالة لاكتشاف لغة النص
const detectLanguage = (text: string): "ar" | "en" | "tr" => {
  // تنظيف النص من الأرقام والرموز
  const cleanText = text.replace(
    /[0-9\s\.,!?@#$%^&*()_+\-=\[\]{};:'"\|,.<>\/?]/g,
    "",
  );

  // الأحرف العربية
  const arabicChars = (cleanText.match(/[\u0600-\u06FF]/g) || []).length;

  // الأحرف التركية المميزة
  const turkishChars = (cleanText.match(/[çğıöşüÇĞİÖŞÜ]/gi) || []).length;

  // الأحرف اللاتينية
  const latinChars = (cleanText.match(/[a-zA-Z]/g) || []).length;

  // تحديد اللغة بناءً على النسب
  const totalChars = arabicChars + turkishChars + latinChars;

  if (totalChars === 0) return "ar"; // افتراضي

  const arabicRatio = arabicChars / totalChars;
  const turkishRatio = turkishChars / totalChars;

  if (arabicRatio > 0.3) return "ar";
  if (turkishRatio > 0.05 || turkishChars > 2) return "tr"; // التركية لها أحرف مميزة
  return "en"; // افتراضي للإنجليزية
};

export const callChatGPT = async (
  currentMessage: string,
  context: AIKnowledgeBase,
  conversationHistory: Array<{ text: string; isUser: boolean }> = [],
) => {
  try {
    // اكتشاف لغة السؤال
    const detectedLanguage = detectLanguage(currentMessage);
    const languageInstruction =
      detectedLanguage === "ar"
        ? "⚠️ **هام جداً:** يجب أن يكون الرد بالكامل باللغة العربية فقط."
        : detectedLanguage === "en"
          ? "⚠️ **CRITICAL:** Your response must be entirely in English only."
          : "⚠️ **ÇOK ÖNEMLİ:** Yanıtınız tamamen Türkçe olmalıdır.";

    // تحليل السياق
    const contextAnalysis = analyzeContext(conversationHistory);

    // تتبع المحاولات الخارجة عن الموضوع
    const offTopicAttempts = trackOffTopicAttempts(conversationHistory);
    if (offTopicAttempts > 3) {
      return `أعتذر، لكني مختص فقط بالإجابة على أسئلة حول خدمات ومشاريع WebSiteMy.

كيف يمكنني مساعدتك في معرفة المزيد عن:
• المشاريع والأسعار
• التقنيات المستخدمة
• مدة التطوير
• الفريق التقني

📱 للاستفسارات الأخرى: +905313345111`;
    }

    // البحث في الـ FAQ أولاً
    const relevantFAQs = searchFAQ(currentMessage);
    let faqContext = "";
    if (relevantFAQs.length > 0) {
      faqContext = `\n\nأسئلة شائعة ذات صلة:\n${relevantFAQs
        .slice(0, 3)
        .map((faq) => `Q: ${faq.question}\nA: ${faq.shortAnswer}`)
        .join("\n\n")}`;
    }

    // بناء تاريخ المحادثة
    const conversationContext =
      conversationHistory.length > 0
        ? `${languageInstruction}

تاريخ المحادثة السابقة:
${conversationHistory
  .slice(-6)
  .map(
    (msg, index) =>
      `${index + 1}. ${msg.isUser ? "المستخدم" : "المساعد"}: ${msg.text}`,
  )
  .join("\n")}

تحليل السياق:
- الموضوع الحالي: ${contextAnalysis.currentTopic || "عام"}
- آخر مشروع مذكور: ${contextAnalysis.lastMentionedProject || "لا يوجد"}
${faqContext}

السؤال الحالي: ${currentMessage}`
        : `${languageInstruction}

السؤال: ${currentMessage}${faqContext}`;

    // استخدام System Prompt المتقدم
    const systemPrompt = generateAdvancedSystemPrompt(
      context.companyInfo,
      context.projects.slice(0, 10),
      faqData.slice(0, 10),
    );

    // استخدام z.ai API عبر البروكسي في الباك اند
    const response = await fetch(AI_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemPrompt,
        userMessage: conversationContext,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 401) {
        return "عذراً، مفتاح API غير صحيح. يرجى التحقق من صحة المفتاح.";
      } else if (response.status === 429) {
        return "⚠️ **عذراً، الخدمة غير متوفرة مؤقتاً**\n\nتم تجاوز حد الاستخدام المسموح.\n\n📞 **للحصول على إجابات فورية:**\n- اتصل بنا: **+905313345111** (واتساب)\n- البريد: info@websitemy.com\n\n💡 سنكون سعداء بالإجابة على جميع أسئلتك!";
      }

      console.error("AI Proxy Error:", errorData);
      return `عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.\n\n📱 للدعم الفوري: +905313345111`;
    }

    const data = await response.json();
    let aiResponse = data?.content ?? "";

    // التحقق من صحة الرد
    const validation = validateAIResponse(aiResponse);
    if (!validation.isValid) {
      console.error("AI Response Validation Failed:", validation.errors);
      return `عذراً، هناك مشكلة في تكوين الرد. دعني أوصلك بالفريق للمساعدة:

📱 واتساب: +905313345111
☎️ اتصال: +905313345111

كيف يمكنني مساعدتك بطريقة أخرى؟`;
    }

    if (validation.warnings.length > 0) {
      console.warn("AI Response Warnings:", validation.warnings);
    }

    return aiResponse;
  } catch (error: any) {
    console.error("z.ai API Error:", error);

    if (error?.message?.includes("API key")) {
      return "عذراً، مفتاح API غير صحيح. يرجى التحقق من صحة المفتاح.";
    } else if (
      error?.message?.includes("quota") ||
      error?.message?.includes("limit")
    ) {
      return "⚠️ **عذراً، الخدمة غير متوفرة مؤقتاً**\n\nتم تجاوز حد الاستخدام المسموح.\n\n📞 **للحصول على إجابات فورية:**\n- اتصل بنا: **+905313345111** (واتساب)\n- البريد: info@websitemy.com\n\n💡 سنكون سعداء بالإجابة على جميع أسئلتك!";
    } else if (
      error?.message?.includes("blocked") ||
      error?.message?.includes("safety")
    ) {
      return "عذراً، لا أستطيع الإجابة على هذا السؤال. هل يمكنك إعادة صياغته بطريقة أخرى؟\n\n📱 للمساعدة المباشرة: +905313345111";
    } else if (error?.message) {
      console.error("Detailed error:", error.message);
      return `عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.\n\n📱 للدعم الفوري: +905313345111`;
    }

    return "آسف، حدث خطأ في الاتصال بالخدمة. يرجى المحاولة مرة أخرى.\n\n📱 تواصل معنا: +905313345111";
  }
};
