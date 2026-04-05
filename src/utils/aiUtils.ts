import { SYSTEM_PROMPT } from "./knowledgeDocument";
import type { StoredMessage } from "./sessionManager";

// Backend AI proxy URL (avoids CORS from browser direct calls)
const AI_PROXY_URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/chat/ai-proxy`
  : "https://websitemy-backend.vercel.app/chat/ai-proxy";

/**
 * callAI — الدالة الوحيدة لاستدعاء الذكاء الاصطناعي.
 *
 * تُرسل للـ AI:
 *   1. وثيقة المعرفة الكاملة (SYSTEM_PROMPT) كـ system message
 *   2. تاريخ المحادثة بالكامل للسياق (من localStorage)
 *   3. الرسالة الجديدة للمستخدم
 *
 * الـ AI نفسه يفهم السياق ويربط الأسئلة — لا حاجة لكود تحليل.
 */
export async function callAI(
  history: StoredMessage[], // تاريخ المحادثة من sessionManager
  newMessage: string,       // رسالة المستخدم الجديدة
): Promise<string> {
  // بناء مصفوفة الرسائل بالتنسيق الصحيح لـ z.ai
  const messages: Array<{ role: string; content: string }> = [
    { role: "system", content: SYSTEM_PROMPT },
    // آخر 20 رسالة (10 أزواج) — كافٍ للسياق وضمن حدود التوكن
    ...history.slice(-20).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: newMessage },
  ];

  try {
    const response = await fetch(AI_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      await response.json().catch(() => ({}));
      if (response.status === 429) {
        return "⚠️ الخدمة مشغولة مؤقتاً، يرجى المحاولة بعد لحظة.\n\n📱 للدعم الفوري: +905313345111";
      }
      if (response.status === 504 || response.status === 408) {
        return "⚠️ استغرق الرد وقتاً طويلاً، يرجى المحاولة مرة أخرى.";
      }
      return "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.\n\n📱 +905313345111";
    }

    const data = await response.json();
    return data?.content ?? "";
  } catch {
    return "عذراً، تعذّر الاتصال. يرجى التحقق من الاتصال بالإنترنت والمحاولة مجدداً.\n\n📱 +905313345111";
  }
}
