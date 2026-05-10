/**
 * AI System Prompt Configuration
 * تكوين متقدم لتعليمات الذكاء الاصطناعي
 */

export interface AIGuardRails {
  strictMode: boolean;
  maxResponseLength: number;
  allowedTopics: string[];
  blockedTopics: string[];
  escalationTriggers: string[];
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
  };
}

/**
 * قواعد الحماية والتوجيه للـ AI
 */
export const aiGuardRails: AIGuardRails = {
  strictMode: true,
  maxResponseLength: 2000, // عدد الأحرف
  allowedTopics: [
    "مشاريع",
    "أسعار",
    "تقنيات",
    "مدة التطوير",
    "دعم فني",
    "استضافة",
    "تصميم",
    "برمجة",
    "فريق العمل",
    "خدمات",
    "SEO",
    "بوابات دفع",
  ],
  blockedTopics: [
    "سياسة",
    "دين",
    "أمور شخصية",
    "قضايا حساسة",
    "مواضيع خارج نطاق العمل",
  ],
  escalationTriggers: [
    "تواصل",
    "اتصال",
    "رقم",
    "مدير",
    "مسؤول",
    "صاحب",
    "تحدث مع",
    "أريد التحدث",
  ],
  contactInfo: {
    phone: "+905313345111",
    whatsapp: "+905313345111",
    email: "ahmeddalhalabi1@gmail.com",
  },
};

/**
 * System Prompt المتقدم والشامل
 */
export const generateAdvancedSystemPrompt = (
  companyInfo: any,
  projects: any[],
  faqData: any[]
): string => {
  const technologies = Array.isArray(companyInfo?.technologies)
    ? companyInfo.technologies.slice(0, 6).join(", ")
    : "React, Next.js, NestJS, MongoDB";

  const specialties = Array.isArray(companyInfo?.specialties)
    ? companyInfo.specialties.slice(0, 4).join(" | ")
    : "المواقع التعريفية | المتاجر الإلكترونية | المنصات التعليمية";

  const projectSnippets = (projects || [])
    .slice(0, 3)
    .map((project) => {
      const name = project?.title || project?.name || "مشروع";
      const price = project?.price || "حسب المتطلبات";
      const duration = project?.duration || "حسب النطاق";
      return `${name} (سعر تقريبي: ${price}, مدة: ${duration})`;
    })
    .join(" | ");

  const faqSnippets = (faqData || [])
    .slice(0, 3)
    .map((faq) => `${faq?.question || ""} => ${faq?.shortAnswer || ""}`)
    .join(" | ");

  return [
    "أنت مساعد WebSiteMy الذكي.",
    "القاعدة الأهم: رد بنفس لغة المستخدم فقط (AR/EN/TR) بدون خلط.",
    "النطاق المسموح: المشاريع، الأسعار، التقنيات، مدة التطوير، الدعم، الاستضافة، SEO.",
    "ممنوع: السياسة، الدين، المواضيع الشخصية أو أي موضوع خارج خدمات الشركة.",
    "لا تخترع معلومات، وإذا كانت المعلومة غير مؤكدة اطلب التواصل المباشر.",
    `التواصل: واتساب ${aiGuardRails.contactInfo.whatsapp} | هاتف ${aiGuardRails.contactInfo.phone} | بريد ${aiGuardRails.contactInfo.email}.`,
    `التقنيات الأساسية: ${technologies}.`,
    `الخدمات الأساسية: ${specialties}.`,
    `أمثلة مشاريع: ${projectSnippets || "غير متوفر"}.`,
    `FAQ مهم: ${faqSnippets || "غير متوفر"}.`,
    "الرد يكون واضحًا ومباشرًا ومفيدًا وبحد أقصى 250 كلمة.",
  ].join("\n");
};

/**
 * دالة للتحقق من محتوى الرد قبل إرساله
 */
export const validateAIResponse = (
  response: string
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let isValid = true;

  // التحقق من الطول
  if (response.length > 2500) {
    warnings.push("الرد طويل جداً - يفضل اختصاره");
  }

  if (response.length < 20) {
    errors.push("الرد قصير جداً");
    isValid = false;
  }

  // التحقق من المواضيع الممنوعة
  const blockedWords = ["سياسة", "سياسي", "حزب", "انتخابات", "دين", "طائفة"];
  blockedWords.forEach((word) => {
    if (response.toLowerCase().includes(word)) {
      errors.push(`يحتوي على كلمة ممنوعة: ${word}`);
      isValid = false;
    }
  });

  // التحقق من وجود معلومات تواصل صحيحة
  if (response.includes("+90") && !response.includes("+905313345111")) {
    warnings.push("رقم هاتف غير صحيح");
  }

  return { isValid, errors, warnings };
};

/**
 * دالة لتتبع محاولات الخروج عن الموضوع
 */
export const trackOffTopicAttempts = (
  conversationHistory: Array<{ text: string; isUser: boolean }>
): number => {
  let offTopicCount = 0;

  conversationHistory.forEach((msg) => {
    if (!msg.isUser) return;

    const offTopicKeywords = [
      "سياسة",
      "حرب",
      "انتخابات",
      "رئيس",
      "حكومة",
      "دين",
      "مذهب",
      "طائفة",
      "صلاة",
      "طقس",
      "رياضة",
      "كرة قدم",
    ];

    offTopicKeywords.forEach((keyword) => {
      if (msg.text.toLowerCase().includes(keyword)) {
        offTopicCount++;
      }
    });
  });

  return offTopicCount;
};
