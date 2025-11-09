import { projects, serviceCategories } from "../data/projects";
import { faqData } from "../data/faqData";
import { generateAdvancedSystemPrompt, validateAIResponse, trackOffTopicAttempts, aiGuardRails } from "./aiSystemPrompt";
import { searchFAQ } from "../data/faqData";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend proxy for API calls
});

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
    commonQuestions: faqData.map(faq => ({
      question: faq.question,
      answer: faq.shortAnswer || faq.answer.substring(0, 200),
    })),
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

export const callChatGPT = async (
  currentMessage: string,
  context: AIKnowledgeBase,
  conversationHistory: Array<{text: string, isUser: boolean}> = []
) => {
  try {
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
    let faqContext = '';
    if (relevantFAQs.length > 0) {
      faqContext = `\n\nأسئلة شائعة ذات صلة:\n${relevantFAQs.slice(0, 3).map(faq => 
        `Q: ${faq.question}\nA: ${faq.shortAnswer}`
      ).join('\n\n')}`;
    }

    // بناء تاريخ المحادثة
    const conversationContext = conversationHistory.length > 0 
      ? `تاريخ المحادثة السابقة:
${conversationHistory.slice(-6).map((msg, index) => 
  `${index + 1}. ${msg.isUser ? 'المستخدم' : 'المساعد'}: ${msg.text}`
).join('\n')}

تحليل السياق:
- الموضوع الحالي: ${contextAnalysis.currentTopic || 'عام'}
- آخر مشروع مذكور: ${contextAnalysis.lastMentionedProject || 'لا يوجد'}
${faqContext}

السؤال الحالي: ${currentMessage}`
      : `السؤال: ${currentMessage}${faqContext}`;

    // استخدام System Prompt المتقدم
    const systemPrompt = generateAdvancedSystemPrompt(
      context.companyInfo,
      context.projects.slice(0, 10), // أول 10 مشاريع لتقليل الحجم
      faqData.slice(0, 10) // أول 10 أسئلة شائعة
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user", 
          content: conversationContext
        }
      ],
      max_tokens: aiGuardRails.maxResponseLength,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 
      "آسف، لم أتمكن من الحصول على إجابة دقيقة. يرجى المحاولة مرة أخرى.";
    
    // التحقق من صحة الرد
    const validation = validateAIResponse(response);
    if (!validation.isValid) {
      console.error('AI Response Validation Failed:', validation.errors);
      return `عذراً، هناك مشكلة في تكوين الرد. دعني أوصلك بالفريق للمساعدة:

📱 واتساب: +905313345111
☎️ اتصال: +905313345111

كيف يمكنني مساعدتك بطريقة أخرى؟`;
    }
    
    if (validation.warnings.length > 0) {
      console.warn('AI Response Warnings:', validation.warnings);
    }

    return response;
    
  } catch (error: any) {
    console.error("ChatGPT API Error:", error);
    
    // More specific error handling
    if (error?.status === 401) {
      return "عذراً، مفتاح API غير صحيح. يرجى التحقق من صحة المفتاح.";
    } else if (error?.status === 429) {
      return "⚠️ **عذراً، الخدمة غير متوفرة مؤقتاً**\n\nنفذ رصيد OpenAI API للموقع.\n\n📞 **للحصول على إجابات فورية:**\n- اتصل بنا: **+905313345111** (واتساب)\n- البريد: info@websitemy.com\n\n💡 سنكون سعداء بالإجابة على جميع أسئلتك!";
    } else if (error?.status === 400) {
      return "عذراً، هناك خطأ في الطلب. يرجى المحاولة مرة أخرى.";
    } else if (error?.message) {
      console.error("Detailed error:", error.message);
      return `عذراً، حدث خطأ: ${error.message}`;
    }
    
    return "آسف، حدث خطأ في الاتصال بالخدمة. يرجى المحاولة مرة أخرى.";
  }
};
