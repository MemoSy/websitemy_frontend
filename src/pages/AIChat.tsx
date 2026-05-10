import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  MessageSquareText,
  Send,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { aiProjects } from "../data/aiKnowledgeBase";
import MayaAvatar from "../components/UI/MayaAvatar";
import { callAI } from "../utils/aiUtils";
import {
  addMessage,
  getOrCreateSession,
  type ChatSession,
} from "../utils/sessionManager";
import { saveChatSession, updateChatSession } from "../utils/chatService";
import { getCachedUserLocation, type LocationData } from "../utils/locationService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  pending?: boolean;
}

const welcomeByLanguage: Record<string, string> = {
  ar: "مرحباً، أنا مايا سكرتيرة WebSiteMy. أنا هنا لمساعدة العملاء والرد على استفساراتهم حول المشاريع، الأسعار، مدة التنفيذ، والتقنيات المناسبة لكل فكرة.",
  tr: "Merhaba, ben Maya - WebSiteMy sekreteriniz. Projeler, fiyatlar, teslim süresi ve teknoloji tercihleri konusunda memnuniyetle yardımcı olurum.",
  en: "Hello, I am Maya, WebSiteMy's secretary. I help clients with project questions, pricing, timelines, and the right technology path for each idea.",
};

const mayaNameByLanguage: Record<string, string> = {
  ar: "مايا",
  tr: "Maya",
  en: "Maya",
};

const mayaIntroByLanguage: Record<string, string> = {
  ar: "سكرتيرة العملاء: ردود دقيقة وسريعة على استفسارات مشاريعك.",
  tr: "Musteri sekreteri: proje sorulariniza hizli ve net yanitlar.",
  en: "Client secretary: clear and fast answers for your project questions.",
};

const autoSaveByLanguage: Record<string, string> = {
  ar: "المحادثة تحفظ تلقائيا",
  tr: "Sohbet otomatik kaydedilir",
  en: "Chat is auto-saved",
};

const quickQuestionsByLanguage: Record<string, string[]> = {
  ar: [
    "ما هي أسعار المشاريع؟",
    "كم يستغرق تنفيذ متجر إلكتروني؟",
    "ما التقنيات التي تستخدمونها؟",
    "أريد موقعاً لشركتي، من أين أبدأ؟",
  ],
  tr: [
    "Proje fiyatları nedir?",
    "Bir online mağaza ne kadar sürer?",
    "Hangi teknolojileri kullanıyorsunuz?",
    "Şirketim için web sitesi istiyorum.",
  ],
  en: [
    "What are the project prices?",
    "How long does an online store take?",
    "Which technologies do you use?",
    "I need a website for my company.",
  ],
};

const MAX_SESSION_QUESTIONS = 15;
const SIMPLE_QUESTION_TOKEN_LIMIT = 50;
const COMPLEX_QUESTION_TOKEN_LIMIT = 100;

const isRTLText = (text: string) => /[\u0600-\u06ff]/.test(text);

const estimateTokens = (text: string) =>
  Math.max(1, Math.ceil((text || "").trim().length / 4));

const isComplexQuestion = (text: string) => {
  const normalized = (text || "").toLowerCase();
  const complexityIndicators = [
    "تفصيل",
    "بالتفصيل",
    "شرح",
    "خطة",
    "خطوات",
    "مقارنة",
    "compare",
    "details",
    "step",
    "roadmap",
    "شرح",
    "نطاق",
  ];

  return (
    normalized.length > 170 ||
    normalized.includes("\n") ||
    complexityIndicators.some((keyword) => normalized.includes(keyword))
  );
};

const getQuestionTokenLimit = (text: string) =>
  isComplexQuestion(text)
    ? COMPLEX_QUESTION_TOKEN_LIMIT
    : SIMPLE_QUESTION_TOKEN_LIMIT;

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizeAssistantText = (text: string): string => {
  if (!text) return text;

  return text
    .replace(/\r\n/g, "\n")
    .replace(/[\u200e\u200f]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const projectUrlEntries = aiProjects.map((project) => {
  const url = project.url.replace(/\/$/, "");
  const domain = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
    }
  })();

  return {
    name: project.name,
    url,
    domain,
    flexibleDomain: domain.split(".").map(escapeRegex).join("\\s*\\.\\s*"),
  };
});

const sessionLimitMessageByLanguage: Record<string, string> = {
  ar: "تم الوصول إلى الحد الأقصى للجلسة (15 سؤال). لمتابعة الاستفسارات تواصل معنا مباشرة: +905313345111",
  tr: "Oturum limiti doldu (15 soru). Devam etmek için doğrudan bizimle iletişime geçin: +905313345111",
  en: "Session limit reached (15 questions). For more requests, please contact us directly: +905313345111",
};

const questionTooLongMessage = (
  language: string,
  estimatedTokens: number,
  tokenLimit: number,
) => {
  if (language === "ar") {
    return `سؤالك طويل جداً لهذه الجلسة المجانية. الحد الحالي ${tokenLimit} توكن تقريباً، بينما سؤالك يساوي ${estimatedTokens} توكن تقريباً. اختصر سؤالك أو قسّمه إلى أكثر من رسالة.`;
  }

  if (language === "tr") {
    return `Sorunuz ücretsiz oturum için çok uzun. Mevcut sınır yaklaşık ${tokenLimit} token, sorunuz ise yaklaşık ${estimatedTokens} token. Lütfen soruyu kısaltın veya birkaç mesaja bölün.`;
  }

  return `Your question is too long for this free session. Current limit is about ${tokenLimit} tokens, while your question is about ${estimatedTokens} tokens. Please shorten it or split it into multiple messages.`;
};

const autolink = (text: string): string => {
  return text
    .replace(
      /(^|[\s(])(\+?(?:90)?5\d{9})(?=$|[\s).,])/g,
      (_match, prefix, phone) => {
        const clean = phone.replace(/\D/g, "");
        return `${prefix}[${phone}](https://wa.me/${clean})`;
      },
    )
    .replace(
      /(^|[\s(])([a-z0-9][a-z0-9-]*\.(?:com|net|org|io|app|site|store|co)(?:\/[^\s)]*)?)/gi,
      (_match, prefix, url) => `${prefix}[${url}](https://${url})`,
    );
};

const normalizeProjectLinks = (text: string): string => {
  const markdownLinkPattern = /(\[[^\]]+\]\([^)]+\))/g;

  return text
    .split(markdownLinkPattern)
    .map((segment) => {
      if (markdownLinkPattern.test(segment)) {
        markdownLinkPattern.lastIndex = 0;
        let fixed = segment;
        for (const project of projectUrlEntries) {
          fixed = fixed.replace(
            new RegExp(`\\((https?:\\/\\/(?:www\\.)?${project.flexibleDomain}\\/?[^)]*)\\)`, "gi"),
            `(${project.url})`,
          );
        }
        return fixed;
      }

      let fixed = segment;
      for (const project of projectUrlEntries) {
        fixed = fixed.replace(
          new RegExp(`https?:\\/\\/(?:www\\.)?${project.flexibleDomain}\\/?`, "gi"),
          `[${project.domain}](${project.url})`,
        );
        fixed = fixed.replace(
          new RegExp(`(^|[\\s(])(?:www\\.)?${project.flexibleDomain}(?=$|[\\s).,،])`, "gi"),
          (_match, prefix) => `${prefix}[${project.domain}](${project.url})`,
        );
      }
      return fixed;
    })
    .join("");
};

const getVisibleLanguage = (language: string) => {
  if (language.startsWith("ar")) return "ar";
  if (language.startsWith("tr")) return "tr";
  return "en";
};

const formatSessionTime = (timestamp: number, language: string) =>
  new Intl.DateTimeFormat(language, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));

function MarkdownMessage({ text, isUser }: { text: string; isUser: boolean }) {
  const normalizedText = isUser ? text : normalizeProjectLinks(normalizeAssistantText(text));

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-3 last:mb-0 whitespace-pre-wrap break-words leading-8 text-[15px] [word-spacing:0.08em] sm:text-base">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className={isUser ? "font-semibold text-white" : "font-semibold text-cyan-200"}>
            {children}
          </strong>
        ),
        ul: ({ children }) => (
          <ul className="my-3 space-y-2 ps-0">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-3 list-decimal space-y-2 ps-5">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-8">{children}</li>,
        code: ({ children }) => (
          <code className="rounded bg-black/35 px-1.5 py-0.5 text-sm text-cyan-100">
            {children}
          </code>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cyan-200 underline decoration-cyan-300/50 underline-offset-4 transition hover:text-white"
          >
            {children}
          </a>
        ),
      }}
    >
      {isUser ? normalizedText : autolink(normalizedText)}
    </ReactMarkdown>
  );
}

export default function AIChat() {
  const { t, i18n } = useTranslation();
  const language = getVisibleLanguage(i18n.language);
  const isPageRTL = i18n.dir() === "rtl";

  const [session, setSession] = useState<ChatSession>(() => getOrCreateSession());
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const messages = useMemo<Message[]>(() => {
    const stored = session.messages.map((message) => ({
      id: String(message.timestamp),
      role: message.role,
      content: message.content,
      timestamp: message.timestamp,
    }));

    if (stored.length > 0) return stored;

    return [
      {
        id: "welcome",
        role: "assistant",
        content: welcomeByLanguage[language],
        timestamp: Date.now(),
      },
    ];
  }, [language, session.messages]);

  const quickQuestions = quickQuestionsByLanguage[language];
  const remainingQuestions = Math.max(0, MAX_SESSION_QUESTIONS - session.userTurns);
  const estimatedInputTokens = estimateTokens(input);
  const activeInputTokenLimit = getQuestionTokenLimit(input);
  const sessionStartedAt = session.messages[0]?.timestamp;

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("native-cursor-page");
    document.body.style.cursor = "auto";

    return () => {
      document.body.classList.remove("native-cursor-page");
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    getCachedUserLocation()
      .then(setLocation)
      .catch(() => setLocation({ country: "Unknown", city: "Unknown" }));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, streamingText, isLoading]);

  useEffect(() => {
    if (!location || session.messages.length === 0) return;

    const payloadMessages = session.messages.map((message) => ({
      id: String(message.timestamp),
      text: message.content,
      isUser: message.role === "user",
      timestamp: new Date(message.timestamp),
    }));

    const save = isSaved
      ? updateChatSession(session.sessionId, payloadMessages)
      : saveChatSession({
          sessionId: session.sessionId,
          messages: payloadMessages,
          country: location.country,
          city: location.city,
        }).then(() => setIsSaved(true));

    save.catch(() => undefined);
  }, [isSaved, location, session.messages, session.sessionId]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 144)}px`;
  }, [input]);

  const sendMessage = useCallback(
    async (forcedText?: string) => {
      const text = (forcedText ?? input).trim();
      if (!text || isLoading) return;

      if (session.userTurns >= MAX_SESSION_QUESTIONS) {
        setSession(
          addMessage(
            session,
            "assistant",
            sessionLimitMessageByLanguage[language],
          ),
        );
        setStreamingText("");
        setInput("");
        textareaRef.current?.focus();
        return;
      }

      const estimatedQuestionTokens = estimateTokens(text);
      const questionTokenLimit = getQuestionTokenLimit(text);

      if (estimatedQuestionTokens > questionTokenLimit) {
        setSession(
          addMessage(
            session,
            "assistant",
            questionTooLongMessage(language, estimatedQuestionTokens, questionTokenLimit),
          ),
        );
        setStreamingText("");
        textareaRef.current?.focus();
        return;
      }

      const withUserMessage = addMessage(session, "user", text);
      setSession(withUserMessage);
      setInput("");
      setStreamingText("");
      setIsLoading(true);

      try {
        const answer = await callAI(
          withUserMessage.messages.slice(0, -1),
          text,
          (partial) => setStreamingText(partial),
          {
            sessionId: withUserMessage.sessionId,
            userTurns: withUserMessage.userTurns,
            estimatedQuestionTokens,
            questionTokenLimit,
          },
        );

        const finalAnswer = answer.trim() || t("aiChat.errorMessage");
        setSession(addMessage(withUserMessage, "assistant", finalAnswer));
      } catch (error) {
        console.error("AI chat error:", error);
        setSession(addMessage(withUserMessage, "assistant", t("aiChat.errorMessage")));
      } finally {
        setIsLoading(false);
        setStreamingText("");
        textareaRef.current?.focus();
      }
    },
    [input, isLoading, language, session, t],
  );

  const canSend =
    input.trim().length > 0 &&
    !isLoading &&
    isOnline &&
    session.userTurns < MAX_SESSION_QUESTIONS &&
    estimatedInputTokens <= activeInputTokenLimit;

  return (
    <section
      dir={isPageRTL ? "rtl" : "ltr"}
      className="h-[100dvh] overflow-hidden bg-[#070b12] px-2 pb-2 pt-20 text-white sm:px-5 sm:pb-5 sm:pt-24"
    >
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-2 overflow-hidden">
        <header className="shrink-0 border-b border-white/10 pb-2">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-3">
              <MayaAvatar size="sm" interactive />
              <div className="min-w-0">
                <h1 className="text-xl font-bold leading-tight sm:text-3xl">
                  {mayaNameByLanguage[language]}
                </h1>
              </div>
            </div>
            <p className="truncate whitespace-nowrap text-xs text-slate-300 sm:text-sm">
              {mayaIntroByLanguage[language]}
            </p>
            <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-slate-500">
              <span className="truncate">
                {sessionStartedAt
                  ? language === "ar"
                    ? `بدأت الجلسة: ${formatSessionTime(sessionStartedAt, i18n.language)}`
                    : language === "tr"
                    ? `Oturum başlangıcı: ${formatSessionTime(sessionStartedAt, i18n.language)}`
                    : `Session started: ${formatSessionTime(sessionStartedAt, i18n.language)}`
                  : ""}
              </span>
              <span className={`shrink-0 whitespace-nowrap ${isSaved ? "text-emerald-300" : "text-slate-400"}`}>
                {autoSaveByLanguage[language]}
              </span>
            </div>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d1320] shadow-2xl shadow-black/30">
            <div className="flex items-center border-b border-white/10 px-4 py-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MessageSquareText className="h-4 w-4 text-cyan-200" />
                <span>{t("aiChat.subtitle")}</span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-5">
              <AnimatePresence initial={false}>
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  const rtl = isRTLText(message.content);
                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 16, scale: 0.985, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, scale: 0.99, filter: "blur(3px)" }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[92%] items-start gap-3 sm:max-w-[78%] ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        {isUser ? (
                          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-500 text-white">
                            <User className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="mt-1 shrink-0">
                            <MayaAvatar size="xs" />
                          </div>
                        )}
                        <div
                          dir={rtl ? "rtl" : "ltr"}
                          className={`rounded-lg px-4 py-3 leading-8 tracking-[0.005em] [word-spacing:0.08em] ${
                            rtl ? "font-arabic readable-arabic" : "mixed-content"
                          } ${
                            isUser
                              ? "bg-cyan-600 text-white"
                              : "border border-white/10 bg-white/[0.055] text-slate-100"
                          }`}
                        >
                          <MarkdownMessage text={message.content} isUser={isUser} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.985, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 flex justify-start"
                >
                  <div className="flex max-w-[92%] items-start gap-3 sm:max-w-[78%]">
                    <div className="mt-1 shrink-0">
                      <MayaAvatar size="xs" />
                    </div>
                    <div
                      dir={isRTLText(streamingText) ? "rtl" : "ltr"}
                      className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-3 text-slate-100"
                    >
                      {streamingText ? (
                        <div className="relative pr-4">
                          <MarkdownMessage text={streamingText} isUser={false} />
                          <motion.span
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                            className="pointer-events-none absolute bottom-1 right-0 text-cyan-200"
                          >
                            ▍
                          </motion.span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
                          {t("aiChat.typing")}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={endRef} />
            </div>

            <form
              className="shrink-0 border-t border-white/10 bg-[#0a101b] p-3 sm:p-4"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={1}
                  placeholder={t("aiChat.inputPlaceholder")}
                  className="min-h-[48px] flex-1 resize-none rounded-lg border border-white/10 bg-white/[0.055] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/15 sm:text-base"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-500 text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  aria-label="Send message"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] leading-5 text-slate-400">
                <span>
                  {language === "ar"
                    ? `الأسئلة المتبقية: ${remainingQuestions}/${MAX_SESSION_QUESTIONS}`
                    : language === "tr"
                    ? `Kalan soru: ${remainingQuestions}/${MAX_SESSION_QUESTIONS}`
                    : `Remaining questions: ${remainingQuestions}/${MAX_SESSION_QUESTIONS}`}
                </span>
                <span
                  className={
                    estimatedInputTokens > activeInputTokenLimit
                      ? "font-medium text-rose-300"
                      : "text-slate-400"
                  }
                >
                  {language === "ar"
                    ? `توكنات السؤال: ${estimatedInputTokens}/${activeInputTokenLimit}`
                    : language === "tr"
                    ? `Soru tokeni: ${estimatedInputTokens}/${activeInputTokenLimit}`
                    : `Question tokens: ${estimatedInputTokens}/${activeInputTokenLimit}`}
                </span>
              </div>
            </form>
          </div>

          <aside className="hidden rounded-lg border border-white/10 bg-[#0d1320] p-4 lg:block lg:self-start">
            <h2 className="mb-3 text-sm font-semibold text-white">
              {t("aiChat.quickQuestions.title")}
            </h2>
            <div className="grid gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  disabled={isLoading || !isOnline || session.userTurns >= MAX_SESSION_QUESTIONS}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-start text-sm leading-5 text-slate-200 transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-3 text-xs leading-5 text-emerald-100">
              ChatGPT is routed through the backend, so your OpenAI key stays on the server.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
