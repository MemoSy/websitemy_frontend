import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Brain } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { callChatGPT, generateKnowledgeBase } from "../utils/aiUtils";
import { 
  generateSessionId, 
  saveChatSession, 
  updateChatSession, 
  ChatMessage 
} from "../utils/chatService";
import { getCachedUserLocation, LocationData } from "../utils/locationService";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [sessionId] = useState<string>(() => generateSessionId());
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [currentContext, setCurrentContext] = useState<string>(''); // لحفظ السياق الحالي
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! أنا مساعدك الذكي المتخصص في مشاريع WebSiteMy. يمكنني الإجابة على أي أسئلة حول مشاريعنا، الأسعار، التقنيات المستخدمة، أو أي معلومات أخرى تحتاجها. كيف يمكنني مساعدتك اليوم؟",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatSaved, setIsChatSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user location on component mount
  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await getCachedUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting user location:', error);
        // Set default location if geolocation fails
        setUserLocation({ country: 'Unknown', city: 'Unknown' });
      }
    };

    getLocation();
  }, []);

  // دالة لتحديث السياق الحالي بناءً على آخر رسائل المستخدم
  const updateCurrentContext = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    let newContext = currentContext;
    
    if (message.includes('أخبار') || message.includes('إعلام') || message.includes('صحافة')) {
      newContext = 'news';
    } else if (message.includes('متجر') || message.includes('تجارة') || message.includes('متجر إلكتروني')) {
      newContext = 'ecommerce';
    } else if (message.includes('تعليم') || message.includes('منصة تعليمية') || message.includes('دورات')) {
      newContext = 'education';
    } else if (message.includes('شخصي') || message.includes('بروفايل') || message.includes('سيرة ذاتية')) {
      newContext = 'personal';
    } else if (message.includes('اجتماعي') || message.includes('شبكة اجتماعية')) {
      newContext = 'social';
    }
    
    if (newContext !== currentContext) {
      setCurrentContext(newContext);
    }
    
    return newContext;
  };

  // Save chat to database when messages change (but not on first load)
  useEffect(() => {
    const saveChat = async () => {
      if (messages.length > 1 && userLocation) { // Only save if there are more than just the initial message and location is available
        if (!isChatSaved) {
          // First time saving this chat session
          await saveChatSession({
            sessionId,
            messages: messages as ChatMessage[],
            country: userLocation.country,
            city: userLocation.city,
          });
          setIsChatSaved(true);
        } else {
          // Update existing chat session
          await updateChatSession(sessionId, messages as ChatMessage[]);
        }
      }
    };

    saveChat();
  }, [messages, sessionId, isChatSaved, userLocation]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // تحديث السياق الحالي بناءً على رسالة المستخدم
    updateCurrentContext(inputText);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // تحضير تاريخ المحادثة للذكاء الاصطناعي (نستثني الرسالة الترحيبية الأولى)
    const conversationHistory = messages
      .slice(1) // نتجاهل الرسالة الترحيبية الأولى
      .map(msg => ({
        text: msg.text,
        isUser: msg.isUser
      }));

    // إضافة الرسالة الحالية للتاريخ
    conversationHistory.push({
      text: inputText,
      isUser: true
    });

    const aiResponseText = await callChatGPT(
      inputText,
      generateKnowledgeBase(),
      conversationHistory
    );
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText || "آسف، لم أتمكن من الحصول على إجابة دقيقة. يرجى المحاولة مرة أخرى.",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-4 py-4 sm:py-8 max-w-4xl h-screen flex flex-col pt-24 sm:pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-6 flex-shrink-0"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 space-x-reverse mb-2 sm:mb-3">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white">
                المساعد الذكي
              </h1>
              <p className="text-cyan-400 text-xs sm:text-base">مختص في مشاريع WebSiteMy</p>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-base px-2">
            اسأل عن أي مشروع، التقنيات المستخدمة، الأسعار، أو أي معلومات تحتاجها
          </p>
          {isChatSaved && (
            <p className="text-green-400 text-xs mt-2 opacity-75">
              💾 تم حفظ المحادثة تلقائياً
            </p>
          )}
          {currentContext && (
            <p className="text-blue-400 text-xs mt-1 opacity-75">
              🧠 السياق الحالي: {
                currentContext === 'news' ? 'مواقع الأخبار' :
                currentContext === 'ecommerce' ? 'المتاجر الإلكترونية' :
                currentContext === 'education' ? 'المنصات التعليمية' :
                currentContext === 'personal' ? 'المواقع الشخصية' :
                currentContext === 'social' ? 'الشبكات الاجتماعية' : currentContext
              }
            </p>
          )}
        </motion.div>

        {/* Chat Container - ملء الشاشة على الموبايل */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden flex-1 flex flex-col"
        >
          {/* Messages */}
          <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 sm:gap-3 space-x-reverse max-w-[85%] sm:max-w-[80%] ${
                      message.isUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser
                          ? "bg-cyan-500"
                          : "bg-gradient-to-r from-purple-500 to-cyan-500"
                      }`}
                    >
                      {message.isUser ? (
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 ${
                        message.isUser
                          ? "bg-cyan-500 text-white"
                          : "bg-gray-800 text-gray-100 border border-gray-700"
                      }`}
                    >
                      <div className="prose prose-sm sm:prose-base prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="text-sm sm:text-base mb-2 last:mb-0 leading-relaxed">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold text-cyan-400">{children}</strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic text-gray-300">{children}</em>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside my-2 space-y-1.5">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside my-2 space-y-1.5">{children}</ol>
                            ),
                            li: ({ children }) => (
                              <li className="text-sm sm:text-base leading-relaxed">{children}</li>
                            ),
                            code: ({ children }) => (
                              <code className="bg-gray-900 px-1.5 py-0.5 rounded text-cyan-400 text-xs sm:text-sm">
                                {children}
                              </code>
                            ),
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 underline"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString("ar-SA", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2 sm:space-x-3 space-x-reverse">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                      <span className="text-sm sm:text-base">جاري الكتابة...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-3 sm:p-4 flex-shrink-0">
            <div className="flex items-start space-x-2 sm:space-x-3 space-x-reverse gap-2 sm:gap-3">
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-105 flex-shrink-0"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب سؤالك هنا..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none max-h-32 text-sm sm:text-base leading-relaxed"
                  rows={1}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions - سؤالين فقط جنباً إلى جنب */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-3 sm:mt-6 flex-shrink-0"
        >
          <p className="text-gray-400 text-center mb-2 sm:mb-3 text-xs sm:text-base">أسئلة شائعة:</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              "ما هي أسعار المشاريع؟",
              "التقنيات المستخدمة",
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInputText(question)}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-cyan-500/50 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-gray-300 hover:text-cyan-300 transition-all text-xs sm:text-sm font-medium"
              >
                {question}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChat;
