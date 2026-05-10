import {
  buildKnowledgePayload,
  buildSecretarySystemPrompt,
  selectRelevantKnowledge,
} from "../data/aiKnowledgeBase";
import { faqData } from "../data/faqData";
import { getDeviceFingerprint, getDeviceInfo } from "./sessionManager";

const API_BASE_URL = (
  import.meta.env.VITE_BACKEND_URL || "https://websitemy-backend.vercel.app"
).replace(/\/$/, "");
const AI_PROXY_URL = `${API_BASE_URL}/chat/ai-proxy`;
const FAST_OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o";
const ENABLE_AI_STREAMING = (import.meta.env.VITE_ENABLE_AI_STREAMING || "false").toLowerCase() === "true";
const ENABLE_RESPONSE_AUDIT = (import.meta.env.VITE_ENABLE_RESPONSE_AUDIT || "true").toLowerCase() !== "false";
const ENABLE_AUDIT_REPAIR = (import.meta.env.VITE_ENABLE_AUDIT_REPAIR || "true").toLowerCase() !== "false";

const MAX_SESSION_QUESTIONS = 15;

export interface AISessionUsage {
  sessionId: string;
  visitorId?: string;
  deviceInfo?: Record<string, any>;
  userTurns: number;
  estimatedQuestionTokens: number;
  questionTokenLimit: number;
}

type AIHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

type ProxyMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const withDeviceUsage = (sessionUsage?: AISessionUsage) => ({
  ...(sessionUsage || {}),
  visitorId: getDeviceFingerprint(),
  deviceInfo: getDeviceInfo(),
});

const compactText = (text: string, maxChars: number) => {
  const normalized = (text || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxChars) return normalized;
  return `${normalized.slice(0, Math.max(0, maxChars - 1))}…`;
};

const detectLanguage = (text: string): "ar" | "en" | "tr" => {
  const cleanText = text.replace(/[0-9\s.,!?@#$%^&*()_+\-=[\]{};:'"\\|<>/?]/g, "");
  const arabicChars = (cleanText.match(/[\u0600-\u06ff]/g) || []).length;
  const turkishChars = (cleanText.match(/[çğıöşüÇĞİÖŞÜ]/g) || []).length;
  const latinChars = (cleanText.match(/[a-zA-Z]/g) || []).length;
  const totalChars = arabicChars + turkishChars + latinChars;

  if (totalChars === 0) return "ar";
  if (arabicChars / totalChars > 0.3) return "ar";
  if (turkishChars > 1) return "tr";
  return "en";
};

const languageInstruction = (language: "ar" | "en" | "tr") => {
  if (language === "ar") return "اكتب الرد كاملاً باللغة العربية فقط.";
  if (language === "tr") return "Yanıtı tamamen Türkçe yaz.";
  return "Write the entire answer in English only.";
};

const hasOffTopicPattern = (text: string) => {
  const normalized = (text || "").toLowerCase();
  const blocked = [
    "سياسة",
    "حرب",
    "دين",
    "طقس",
    "رياضة",
    "بورصة",
    "اختراق",
    "هكر",
    "ignore previous",
    "forget your instructions",
    "you are now",
    "act as",
    "developer mode",
    "jailbreak",
    "تجاهل تعليماتك",
    "انت الآن",
    "أنت الآن",
    "تصرف ك",
  ];

  return blocked.some((word) => normalized.includes(word));
};

const countOffTopicAttempts = (history: AIHistoryMessage[]) =>
  history.filter((message) => message.role === "user" && hasOffTopicPattern(message.content)).length;

const offTopicFallback = (language: "ar" | "en" | "tr") => {
  if (language === "tr") {
    return "Ben Maya, WebSiteMy sekreteriyim. Genel sohbet çok tatlı ama uzmanlık alanım web projeleri 🙂 Web sitesi, e-ticaret, SaaS ve fiyatlandırma konusunda net destek verebilirim.";
  }

  if (language === "en") {
    return "I am Maya, WebSiteMy's secretary. Casual chat is fun, but my superpower is project guidance. I can help with websites, e-commerce, SaaS platforms, pricing, timelines, and project examples.";
  }

  return "أنا مايا، سكرتيرة WebSiteMy. الدردشة العامة ممتعة، لكن قوتي الحقيقية في توجيه المشاريع 🙂 أقدر أساعدك في المواقع والمتاجر والمنصات والأسعار والمدة مع أمثلة حقيقية.";
};

const normalizeIntentText = (text: string) =>
  (text || "")
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}\s$+.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

type IntentFocus =
  | "ownership"
  | "payment"
  | "pricing"
  | "timeline"
  | "tech"
  | "examples"
  | "contact"
  | "general";

type IntentAnalysis = {
  focus: IntentFocus;
  confidence: "high" | "medium" | "low";
  hasRecentContext: boolean;
  recentUserSummary: string;
};

type ConversationTone = "business" | "chatty";

type ResponseAuditResult = {
  isValid: boolean;
  reasons: string[];
  intent: IntentAnalysis;
};

const MAX_AUDIT_REPAIR_ATTEMPTS = 1;

const includesAnyTerm = (message: string, terms: string[]) => {
  const normalized = normalizeIntentText(message);
  return terms.some((term) => normalized.includes(normalizeIntentText(term)));
};

const buildRecentUserSummary = (conversationHistory: AIHistoryMessage[]) =>
  conversationHistory
    .filter((message) => message.role === "user")
    .slice(-3)
    .map((message) => compactText(message.content, 100))
    .join(" | ");

const analyzeIntent = (
  currentMessage: string,
  conversationHistory: AIHistoryMessage[] = [],
): IntentAnalysis => {
  const compositeText = [
    buildRecentUserSummary(conversationHistory),
    currentMessage,
  ].join(" ");

  const ownershipTerms = [
    "من هو المسؤول",
    "مين المسؤول",
    "المسؤول",
    "من ينفذ",
    "مين ينفذ",
    "من نفذ",
    "الفريق المسؤول",
    "المسؤول عن التنفيذ",
    "who is responsible",
    "who executes",
    "owner",
  ];

  const paymentTerms = [
    "بوابة دفع",
    "بوابه دفع",
    "بوابات الدفع",
    "payment gateway",
    "stripe",
    "paypal",
    "checkout",
    "2checkout",
  ];

  const pricingTerms = ["سعر", "اسعار", "أسعار", "تكلفة", "price", "cost", "budget"];
  const timelineTerms = ["مدة", "مده", "وقت", "كم يستغرق", "timeline", "duration"];
  const techTerms = ["تقنيات", "stack", "technology", "framework", "backend", "frontend"];
  const exampleTerms = ["مثال", "أمثلة", "نماذج", "مشاريع مشابهة", "portfolio", "examples"];
  const contactTerms = ["تواصل", "واتساب", "اتصال", "رقم", "contact", "whatsapp"];

  if (includesAnyTerm(compositeText, ownershipTerms)) {
    return {
      focus: "ownership",
      confidence: "high",
      hasRecentContext: conversationHistory.length > 0,
      recentUserSummary: buildRecentUserSummary(conversationHistory),
    };
  }

  if (includesAnyTerm(compositeText, paymentTerms)) {
    return {
      focus: "payment",
      confidence: "high",
      hasRecentContext: conversationHistory.length > 0,
      recentUserSummary: buildRecentUserSummary(conversationHistory),
    };
  }

  if (includesAnyTerm(compositeText, pricingTerms)) {
    return {
      focus: "pricing",
      confidence: "high",
      hasRecentContext: conversationHistory.length > 0,
      recentUserSummary: buildRecentUserSummary(conversationHistory),
    };
  }

  if (includesAnyTerm(compositeText, timelineTerms)) {
    return {
      focus: "timeline",
      confidence: "high",
      hasRecentContext: conversationHistory.length > 0,
      recentUserSummary: buildRecentUserSummary(conversationHistory),
    };
  }

  if (includesAnyTerm(compositeText, techTerms)) {
    return {
      focus: "tech",
      confidence: "medium",
      hasRecentContext: conversationHistory.length > 0,
      recentUserSummary: buildRecentUserSummary(conversationHistory),
    };
  }

  if (includesAnyTerm(compositeText, exampleTerms)) {
    return {
      focus: "examples",
      confidence: "medium",
      hasRecentContext: conversationHistory.length > 0,
      recentUserSummary: buildRecentUserSummary(conversationHistory),
    };
  }

  if (includesAnyTerm(compositeText, contactTerms)) {
    return {
      focus: "contact",
      confidence: "high",
      hasRecentContext: conversationHistory.length > 0,
      recentUserSummary: buildRecentUserSummary(conversationHistory),
    };
  }

  return {
    focus: "general",
    confidence: "low",
    hasRecentContext: conversationHistory.length > 0,
    recentUserSummary: buildRecentUserSummary(conversationHistory),
  };
};

const detectConversationTone = (
  currentMessage: string,
  conversationHistory: AIHistoryMessage[],
  intent: IntentAnalysis,
): ConversationTone => {
  const normalized = normalizeIntentText(currentMessage);
  const recentContext = normalizeIntentText(buildRecentUserSummary(conversationHistory));

  const chattyTerms = [
    "دردشه",
    "دردشة",
    "سولف",
    "فضول",
    "احكي",
    "حكي",
    "مزحه",
    "نكت",
    "joke",
    "chat",
    "curious",
    "just talking",
    "small talk",
    "who are you",
    "tell me more",
  ];

  const directBusinessTerms = [
    "سعر",
    "تكلفه",
    "project",
    "pricing",
    "timeline",
    "duration",
    "payment",
    "تقنيات",
  ];

  const hasChattySignal = chattyTerms.some(
    (term) => normalized.includes(normalizeIntentText(term)) || recentContext.includes(normalizeIntentText(term)),
  );

  const hasDirectBusinessSignal = directBusinessTerms.some((term) =>
    normalized.includes(normalizeIntentText(term)),
  );

  if (hasChattySignal && !hasDirectBusinessSignal) {
    return "chatty";
  }

  if (intent.focus === "general" && normalized.length < 70 && !hasDirectBusinessSignal) {
    return "chatty";
  }

  return "business";
};

const focusExpectedTerms: Record<IntentFocus, string[]> = {
  ownership: ["مسؤول", "المسؤول", "قيادة", "يقود", "الفريق", "تنفيذ", "احمد", "مدير", "team", "lead"],
  payment: ["بوابة", "دفع", "payment", "gateway", "stripe", "paypal", "checkout"],
  pricing: ["سعر", "تكلفة", "price", "cost", "budget", "$"],
  timeline: ["مدة", "وقت", "اسبوع", "شهر", "timeline", "duration"],
  tech: ["تقنيات", "stack", "technology", "framework", "react", "next", "nestjs"],
  examples: ["مثال", "أمثلة", "مشروع", "projects", "example"],
  contact: ["واتساب", "تواصل", "اتصال", "رقم", "contact", "whatsapp"],
  general: [],
};

const hasIncompleteSentenceSignals = (text: string) => {
  const value = (text || "").trim();
  if (!value) return true;

  const danglingLabel = /(^|\n)\s*(المشروع|السعر|المدة|الفريق|التقنيات|الرابط|project|price|timeline|team|technologies|link)\s*:?\s*($|\n)/i;
  const danglingSeparator = /(^|\n)\s*[^\n]{0,60}[:\-]\s*($|\n)/;
  const brokenToken = /(^|\n)\s*ابط\s*($|\n)/i;

  return danglingLabel.test(value) || danglingSeparator.test(value) || brokenToken.test(value);
};

const auditAssistantResponse = (
  currentMessage: string,
  conversationHistory: AIHistoryMessage[],
  response: string,
): ResponseAuditResult => {
  const reasons: string[] = [];
  const intent = analyzeIntent(currentMessage, conversationHistory);
  const normalizedResponse = normalizeIntentText(response || "");

  if ((response || "").trim().length < 24) {
    reasons.push("response_too_short");
  }

  if (hasIncompleteSentenceSignals(response || "")) {
    reasons.push("incomplete_sentence_signal");
  }

  if (intent.focus !== "general") {
    const expectedTerms = focusExpectedTerms[intent.focus] || [];
    const hasExpected = expectedTerms.some((term) =>
      normalizedResponse.includes(normalizeIntentText(term)),
    );

    if (!hasExpected) {
      reasons.push("intent_mismatch");
    }

    if (intent.focus === "ownership") {
      const timelineHints = ["مده", "اسبوع", "شهر", "timeline", "duration"];
      const hasTimelineOnly =
        timelineHints.some((term) => normalizedResponse.includes(normalizeIntentText(term))) &&
        !["مسؤول", "المسؤول", "فريق", "يقود", "مدير"].some((term) =>
          normalizedResponse.includes(normalizeIntentText(term)),
        );

      if (hasTimelineOnly) {
        reasons.push("ownership_replaced_by_timeline");
      }
    }
  }

  return {
    isValid: reasons.length === 0,
    reasons,
    intent,
  };
};

const fetchAICompletion = async (
  messages: ProxyMessage[],
  currentMessage: string,
  sessionUsage?: AISessionUsage,
) => {
  const apiResponse = await fetch(AI_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({
      provider: "openai",
      model: FAST_OPENAI_MODEL,
      stream: false,
      question: currentMessage,
      sessionUsage: withDeviceUsage(sessionUsage),
      messages,
    }),
  });

  if (!apiResponse.ok) {
    const error = await extractProxyError(apiResponse);
    throw new Error(`${error.message}::${error.requestId || ""}`);
  }

  const data = await apiResponse.json();
  return data?.content || "";
};

const repairResponseWithAudit = async (
  draft: string,
  currentMessage: string,
  conversationHistory: AIHistoryMessage[],
  sessionUsage: AISessionUsage | undefined,
  audit: ResponseAuditResult,
) => {
  const reasonsText = audit.reasons.join(", ");
  const baseMessages = buildMessages(conversationHistory, currentMessage, sessionUsage);

  const repairMessages: ProxyMessage[] = [
    ...baseMessages,
    {
      role: "assistant",
      content: draft,
    },
    {
      role: "user",
      content: [
        "Final delivery audit failed. Rewrite your answer from scratch with zero errors.",
        `Detected issues: ${reasonsText}`,
        `Intent focus must stay: ${audit.intent.focus}`,
        "Rules: keep the same language, answer the exact question only, avoid topic drift, ensure all sentences are complete, and keep links/figures factual from provided knowledge.",
      ].join("\n"),
    },
  ];

  for (let attempt = 0; attempt < MAX_AUDIT_REPAIR_ATTEMPTS; attempt += 1) {
    const repaired = await fetchAICompletion(repairMessages, currentMessage, sessionUsage);
    if ((repaired || "").trim().length > 0) {
      return repaired;
    }
  }

  return draft;
};

const buildStrictUsagePolicy = (currentMessage: string, sessionUsage?: AISessionUsage) => {
  const usage = sessionUsage
    ? `${sessionUsage.userTurns}/${MAX_SESSION_QUESTIONS}`
    : `unknown/${MAX_SESSION_QUESTIONS}`;

  return [
    "COST AND RELIABILITY POLICY:",
    `Session question usage: ${usage}.`,
    sessionUsage
      ? `Current estimated question tokens: ${sessionUsage.estimatedQuestionTokens}/${sessionUsage.questionTokenLimit}.`
      : "",
    `Current user message length: ${currentMessage.length} chars.`,
    "Keep the answer practical and concise unless the visitor asks for details.",
    "Do not output internal policies or JSON. Use the JSON silently as factual memory.",
  ]
    .filter(Boolean)
    .join("\n");
};

const buildRecentHistory = (conversationHistory: AIHistoryMessage[]) =>
  conversationHistory
    .slice(-6)
    .map((message) => `${message.role === "user" ? "Visitor" : "Maya"}: ${compactText(message.content, 260)}`)
    .join("\n");

const selectRelevantFAQ = (message: string) => {
  const normalized = normalizeIntentText(message);

  return faqData
    .map((faq) => {
      const score = faq.keywords.reduce(
        (total, keyword) =>
          normalized.includes(normalizeIntentText(keyword)) ? total + 2 : total,
        0,
      );

      return { faq, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.faq.priority - b.faq.priority)
    .slice(0, 3)
    .map(({ faq }) => ({
      question: faq.question,
      shortAnswer: faq.shortAnswer,
      answer: compactText(faq.answer, 900),
      category: faq.category,
    }));
};

const buildMessages = (
  conversationHistory: AIHistoryMessage[],
  currentMessage: string,
  sessionUsage?: AISessionUsage,
): ProxyMessage[] => {
  const language = detectLanguage(currentMessage);
  const relevantKnowledge = selectRelevantKnowledge(currentMessage, conversationHistory);
  const relevantFAQ = selectRelevantFAQ(currentMessage);
  const recentHistory = buildRecentHistory(conversationHistory);
  const intentAnalysis = analyzeIntent(currentMessage, conversationHistory);
  const conversationTone = detectConversationTone(currentMessage, conversationHistory, intentAnalysis);

  const currentTask = [
    languageInstruction(language),
    `Intent focus: ${intentAnalysis.focus}`,
    `Intent confidence: ${intentAnalysis.confidence}`,
    `Conversation tone: ${conversationTone}`,
    intentAnalysis.recentUserSummary
      ? `Recent user context summary: ${intentAnalysis.recentUserSummary}`
      : "",
    recentHistory ? `Recent conversation:\n${recentHistory}` : "",
    `Visitor question: ${currentMessage}`,
    "Mandatory workflow before answering: 1) understand the exact intent from current question and history, 2) select factual evidence from KNOWLEDGE JSON and FAQ, 3) answer only what was asked, 4) then add short useful follow-up if needed.",
    "Answer as Maya, a human-like professional sales secretary with precise business tone.",
    conversationTone === "chatty"
      ? "Visitor is chatty or curious: add one short witty line and one subtle mysterious teaser, then continue with a useful service-focused answer."
      : "Visitor is business-focused: keep warm professionalism and prioritize clarity over playful style.",
    "If the visitor asks a combined question, answer the primary question first, then add only the minimum relevant details.",
    "For payment gateway questions: say whether we can build it using the FAQ facts. Do not claim a previous project used a live payment gateway unless the selected project explicitly says so.",
    "For ownership/responsibility questions (who executes projects): answer directly from company team hierarchy first, and do not switch to pricing/timeline unless the visitor explicitly asks for them.",
    "If you mention project links, copy exact URLs from KNOWLEDGE JSON using Markdown links. Never add spaces inside URLs and never invent domains.",
    "Do not dump full project cards. Keep it concise, human, and sales-focused.",
    "Quality gate before sending the response: no broken words, no cut sentences, no empty labels, no irrelevant section.",
    "Format cleanly: short paragraphs, simple line breaks, no star symbols, no decorative clutter. Maximum 180 words unless the visitor asks for detail.",
  ]
    .filter(Boolean)
    .join("\n\n");

  return [
    {
      role: "system",
      content: buildSecretarySystemPrompt(),
    },
    {
      role: "system",
      content: buildStrictUsagePolicy(currentMessage, sessionUsage),
    },
    {
      role: "system",
      content: `KNOWLEDGE JSON FOR THIS QUESTION:\n${buildKnowledgePayload(relevantKnowledge)}`,
    },
    {
      role: "system",
      content: `RELEVANT FAQ FACTS:\n${JSON.stringify(relevantFAQ, null, 2)}`,
    },
    {
      role: "user",
      content: currentTask,
    },
  ];
};

const extractProxyError = async (response: Response) => {
  const payload = await response.json().catch(() => ({}));
  const message =
    payload?.details?.message ||
    payload?.details?.error?.message ||
    payload?.error ||
    payload?.message ||
    "unknown";
  const requestId = payload?.requestId || response.headers.get("x-ai-request-id");
  return { message: String(message), requestId };
};

const friendlyError = (message: string, requestId?: string) => {
  const lower = message.toLowerCase();
  const suffix = requestId ? `\n\nرقم تتبع الخطأ: ${requestId}` : "";

  if (
    lower.includes("api key") ||
    lower.includes("invalid_api_key") ||
    lower.includes("unauthorized") ||
    lower.includes("incorrect")
  ) {
    return `مفتاح ChatGPT غير صحيح حالياً. بعد وضع مفتاح OpenAI الحقيقي في Vercel وإعادة نشر الخادم ستعمل الدردشة بشكل طبيعي.${suffix}`;
  }

  if (lower.includes("quota") || lower.includes("rate limit") || lower.includes("429")) {
    return `خدمة الذكاء الاصطناعي وصلت إلى حد الاستخدام مؤقتاً. يمكننا مساعدتك مباشرة عبر واتساب: +905313345111.${suffix}`;
  }

  if (lower.includes("timeout") || lower.includes("abort")) {
    return `استغرقت خدمة الذكاء الاصطناعي وقتاً أطول من المتوقع. أعد المحاولة بسؤال أقصر، أو تواصل معنا مباشرة عبر واتساب: +905313345111.${suffix}`;
  }

  return `حدث خطأ في الاتصال بخدمة ChatGPT. أعد المحاولة بعد قليل، أو تواصل معنا مباشرة عبر واتساب: +905313345111.${suffix}`;
};

export const callChatGPT = async (
  currentMessage: string,
  conversationHistory: AIHistoryMessage[] = [],
  sessionUsage?: AISessionUsage,
): Promise<string> => {
  const language = detectLanguage(currentMessage);

  if (hasOffTopicPattern(currentMessage) || countOffTopicAttempts(conversationHistory) > 2) {
    return offTopicFallback(language);
  }

  try {
    const draft = await fetchAICompletion(
      buildMessages(conversationHistory, currentMessage, sessionUsage),
      currentMessage,
      sessionUsage,
    );

    if (!draft) {
      return friendlyError("empty ai response");
    }

    if (!ENABLE_RESPONSE_AUDIT) {
      return draft;
    }

    const audit = auditAssistantResponse(currentMessage, conversationHistory, draft);
    if (audit.isValid || audit.intent.confidence === "low" || !ENABLE_AUDIT_REPAIR) {
      return draft;
    }

    const repaired = await repairResponseWithAudit(
      draft,
      currentMessage,
      conversationHistory,
      sessionUsage,
      audit,
    );

    const repairedAudit = auditAssistantResponse(currentMessage, conversationHistory, repaired);
    if (repairedAudit.isValid) {
      return repaired;
    }

    return repaired || draft;
  } catch (error: any) {
    console.error("ChatGPT API Error:", error);
    const [message, requestId] = String(error?.message || "network error").split("::");
    return friendlyError(message || "network error", requestId || undefined);
  }
};

export const callAI = async (
  conversationHistory: AIHistoryMessage[],
  currentMessage: string,
  onStream?: (partialText: string) => void,
  sessionUsage?: AISessionUsage,
): Promise<string> => {
  const language = detectLanguage(currentMessage);

  if (hasOffTopicPattern(currentMessage) || countOffTopicAttempts(conversationHistory) > 2) {
    const fallback = offTopicFallback(language);
    onStream?.(fallback);
    return fallback;
  }

  // Non-stream is the default mode to avoid any risk of chunk-level Arabic corruption.
  if (!onStream || !ENABLE_AI_STREAMING) {
    return callChatGPT(currentMessage, conversationHistory, sessionUsage);
  }

  try {
    const apiResponse = await fetch(AI_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        provider: "openai",
        model: FAST_OPENAI_MODEL,
        stream: true,
        question: currentMessage,
        sessionUsage: withDeviceUsage(sessionUsage),
        messages: buildMessages(conversationHistory, currentMessage, sessionUsage),
      }),
    });

    if (!apiResponse.ok) {
      const error = await extractProxyError(apiResponse);
      const response = friendlyError(error.message, error.requestId);
      onStream(response);
      return response;
    }

    if (!apiResponse.body) {
      return callChatGPT(currentMessage, conversationHistory, sessionUsage);
    }

    const reader = apiResponse.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullResponse = "";
    let buffer = "";
    let isDone = false;

    const processSseBlock = (block: string) => {
      const lines = block.split(/\r?\n/);

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith("data:")) continue;

        const data = line.slice(5).trim();
        if (!data) continue;
        if (data === "[DONE]") {
          isDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(data);
          if (parsed?.error) {
            const response = friendlyError(parsed?.message || "stream error", parsed?.requestId);
            onStream(response);
            fullResponse = response;
            isDone = true;
            break;
          }

          const chunk = parsed?.content || "";
          if (chunk) {
            fullResponse += chunk;
            onStream(fullResponse);
          }
        } catch {
          // Ignore malformed fragments. The next complete event will be parsed.
        }
      }
    };

    while (!isDone) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const blocks = buffer.split(/\r?\n\r?\n/);
      buffer = blocks.pop() || "";
      for (const block of blocks) {
        processSseBlock(block);
        if (isDone) break;
      }
    }

    buffer += decoder.decode();
    if (buffer.trim().length > 0 && !isDone) {
      processSseBlock(buffer);
    }

    const responseText = fullResponse || friendlyError("empty ai response");

    if (!fullResponse) {
      return responseText;
    }

    if (!ENABLE_RESPONSE_AUDIT) {
      return responseText;
    }

    const audit = auditAssistantResponse(currentMessage, conversationHistory, responseText);
    if (audit.isValid || audit.intent.confidence === "low" || !ENABLE_AUDIT_REPAIR) {
      return responseText;
    }

    try {
      const repaired = await repairResponseWithAudit(
        responseText,
        currentMessage,
        conversationHistory,
        sessionUsage,
        audit,
      );

      if (repaired && repaired.trim().length > 0) {
        onStream(repaired);
        const repairedAudit = auditAssistantResponse(currentMessage, conversationHistory, repaired);
        if (repairedAudit.isValid) {
          return repaired;
        }
      }
    } catch (repairError) {
      console.warn("Audit repair failed:", repairError);
    }

    return responseText;
  } catch (error: any) {
    console.error("ChatGPT streaming error:", error);
    const response = friendlyError(error?.message || "network error");
    onStream(response);
    return response;
  }
};
