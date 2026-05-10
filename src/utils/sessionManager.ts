/**
 * Session Manager — إدارة جلسة المستخدم بناءً على بصمة الجهاز
 *
 * كل زائر له معرّف ثابت مشتق من بصمة جهازه (متصفح + شاشة + منطقة زمنية...).
 * المحادثة تُحفظ في localStorage وتُستعاد تلقائياً عند العودة.
 * لا يبدأ الذكاء الاصطناعي من الصفر — يعرف سياق كل زائر.
 */

const LS_KEY = 'ws_chat_session';

/** الحد الأقصى لعدد الرسائل المحفوظة في التاريخ (20 زوجاً = 40 رسالة) */
const MAX_HISTORY = 40;

export interface StoredMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  sessionId: string;
  messages: StoredMessage[];
  userTurns: number;
}

function countUserTurns(messages: StoredMessage[]): number {
  return messages.reduce((total, message) => {
    return message.role === 'user' ? total + 1 : total;
  }, 0);
}

/**
 * توليد بصمة الجهاز — نفس الجهاز يعطي نفس الرقم دائماً.
 * لا تعتمد على IP (يتغير) بل على خصائص الجهاز والمتصفح.
 */
export function getDeviceFingerprint(): string {
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

export function getDeviceInfo(): Record<string, string | number> {
  try {
    return {
      language: navigator.language,
      languages: navigator.languages?.join(',') || navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      timezoneOffset: new Date().getTimezoneOffset(),
      screen: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      hardwareConcurrency: navigator.hardwareConcurrency ?? 0,
      maxTouchPoints: navigator.maxTouchPoints ?? 0,
      platform: navigator.platform || '',
    };
  } catch {
    return {};
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
      const parsed = JSON.parse(raw) as Partial<ChatSession>;
      if (parsed?.sessionId && Array.isArray(parsed?.messages)) {
        return {
          sessionId: parsed.sessionId,
          messages: parsed.messages,
          userTurns:
            typeof parsed.userTurns === 'number' && Number.isFinite(parsed.userTurns)
              ? Math.max(parsed.userTurns, countUserTurns(parsed.messages))
              : countUserTurns(parsed.messages),
        };
      }
    }
  } catch {
    // البيانات تالفة — ننشئ جلسة جديدة
  }

  const session: ChatSession = {
    sessionId: `ws_${getDeviceFingerprint()}`,
    messages: [],
    userTurns: 0,
  };
  saveSession(session);
  return session;
}

/**
 * حفظ الجلسة في localStorage مع الحفاظ على آخر MAX_HISTORY رسالة فقط.
 */
export function saveSession(session: ChatSession): void {
  try {
    const preservedTurns = Math.max(session.userTurns || 0, countUserTurns(session.messages));
    const trimmed: ChatSession = {
      ...session,
      messages: session.messages.slice(-MAX_HISTORY),
      userTurns: preservedTurns,
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
    userTurns: role === 'user' ? session.userTurns + 1 : session.userTurns,
    messages: [
      ...session.messages,
      { role, content, timestamp: Date.now() },
    ],
  };
  saveSession(updated);
  return updated;
}
