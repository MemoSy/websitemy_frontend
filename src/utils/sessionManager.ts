/**
 * Session Manager — إدارة جلسة المستخدم بناءً على بصمة الجهاز
 *
 * كل زائر له معرّف ثابت مشتق من بصمة جهازه (متصفح + شاشة + منطقة زمنية...).
 * المحادثة تُحفظ في localStorage وتُستعاد تلقائياً عند العودة.
 * لا يبدأ الذكاء الاصطناعي من الصفر — يعرف سياق كل زائر.
 */

const LS_KEY = 'ws_chat_session';

/** الحد الأقصى لعدد الرسائل المحفوظة في التاريخ (10 أزواج = 20 رسالة) */
const MAX_HISTORY = 20;

export interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  sessionId: string;
  messages: StoredMessage[];
}

/**
 * توليد بصمة الجهاز — نفس الجهاز يعطي نفس الرقم دائماً.
 * لا تعتمد على IP (يتغير) بل على خصائص الجهاز والمتصفح.
 */
function generateDeviceFingerprint(): string {
  try {
    const parts = [
      navigator.userAgent,
      navigator.language,
      `${screen.width}x${screen.height}`,
      String(screen.colorDepth),
      String(new Date().getTimezoneOffset()),
      String(navigator.hardwareConcurrency ?? 0),
      String(navigator.maxTouchPoints ?? 0),
    ].join('|');

    // hash بسيط وسريع
    let hash = 0;
    for (let i = 0; i < parts.length; i++) {
      hash = (Math.imul(31, hash) + parts.charCodeAt(i)) | 0;
    }
    return Math.abs(hash).toString(36);
  } catch {
    // fallback إذا كان المتصفح يمنع الوصول
    return Date.now().toString(36);
  }
}

/**
 * تحميل الجلسة الموجودة أو إنشاء جديدة.
 * نفس الجهاز = نفس الجلسة = نفس التاريخ.
 */
export function getOrCreateSession(): ChatSession {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatSession;
      if (parsed?.sessionId && Array.isArray(parsed?.messages)) {
        return parsed;
      }
    }
  } catch {
    // البيانات تالفة — ننشئ جلسة جديدة
  }

  const session: ChatSession = {
    sessionId: `ws_${generateDeviceFingerprint()}`,
    messages: [],
  };
  saveSession(session);
  return session;
}

/**
 * حفظ الجلسة في localStorage مع الحفاظ على آخر MAX_HISTORY رسالة فقط.
 */
export function saveSession(session: ChatSession): void {
  try {
    const trimmed: ChatSession = {
      ...session,
      messages: session.messages.slice(-MAX_HISTORY),
    };
    localStorage.setItem(LS_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage ممتلئ أو غير متاح
  }
}

/**
 * إضافة رسالة للجلسة وحفظها فوراً.
 * يُرجع الجلسة المحدّثة.
 */
export function addMessage(
  session: ChatSession,
  role: 'user' | 'assistant',
  content: string,
): ChatSession {
  const updated: ChatSession = {
    ...session,
    messages: [
      ...session.messages,
      { role, content, timestamp: Date.now() },
    ],
  };
  saveSession(updated);
  return updated;
}
