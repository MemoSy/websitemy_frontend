import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  MessageSquare, 
  Search,
  Filter,
  RefreshCw
} from "lucide-react";
import { 
  getAllChats, 
  adminLogout,
  ChatData 
} from "../utils/adminService";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [chats, setChats] = useState<ChatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'today' | 'week'>('all');
  const [error, setError] = useState<string | null>(null);
  const retryCountRef = useRef(0);

  useEffect(() => {
    // Fetch data on mount
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    console.log('🔍 Fetching data... Retry count:', retryCountRef.current);
    
    try {
      const chatsData = await getAllChats();
      setChats(chatsData);
      retryCountRef.current = 0; // Reset retry count on success
      console.log('✅ Data fetched successfully:', chatsData.length, 'chats');
    } catch (error: any) {
      console.error('❌ Error fetching data:', error);
      
      // Handle authentication errors
      if (error.message === 'UNAUTHORIZED' || error.message === 'NO_TOKEN') {
        retryCountRef.current += 1;
        console.log('🔑 Auth error. Retry count:', retryCountRef.current);
        
        // Don't logout - this might be a backend issue or different token requirements
        // Just show error and let user manually logout or retry
        if (retryCountRef.current >= 2) {
          console.log('⚠️ Multiple auth failures - showing error');
          setError('فشل تحميل البيانات بسبب مشكلة في الصلاحيات. جرب تسجيل الخروج والدخول مرة أخرى.');
          return;
        }
        
        // Give it a moment and retry automatically once
        if (retryCountRef.current === 1) {
          console.log('🔄 Retrying in 1000ms...');
          setError('جاري إعادة المحاولة...');
          setTimeout(() => fetchData(), 1000);
          return;
        }
        
        setError('فشل في تحميل البيانات. حاول مرة أخرى.');
      } else if (error.message === 'REQUEST_TIMEOUT') {
        setError('انتهت مهلة الطلب. يرجى التحقق من اتصالك بالإنترنت.');
      } else {
        setError('فشل في تحميل البيانات. حاول مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    onLogout();
  };

  const filteredChats = chats.filter(chat => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      chat.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some(msg => msg.text.toLowerCase().includes(searchTerm.toLowerCase())) ||
      chat.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

    // Date filter
    const now = new Date();
    const chatDate = new Date(chat.createdAt);
    
    let matchesDate = true;
    if (filterBy === 'today') {
      matchesDate = chatDate.toDateString() === now.toDateString();
    } else if (filterBy === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = chatDate >= weekAgo;
    }

    return matchesSearch && matchesDate;
  });


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          <div className="text-white text-xl">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">لوحة التحكم الإدارية</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={fetchData}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-1/3 border-l border-gray-700 bg-gray-900/30 overflow-hidden flex flex-col">
          {/* Controls */}
          <div className="p-4 border-b border-gray-700">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث في المحادثات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">جميع المحادثات</option>
                <option value="today">اليوم</option>
                <option value="week">هذا الأسبوع</option>
              </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-gray-800 rounded-lg p-2">
                <div className="text-cyan-400 font-bold">{filteredChats.length}</div>
                <div className="text-xs text-gray-400">محادثات</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-2">
                <div className="text-purple-400 font-bold">
                  {filteredChats.reduce((sum, chat) => sum + chat.totalMessages, 0)}
                </div>
                <div className="text-xs text-gray-400">رسائل</div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-red-900/50 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
                <p className="text-center mb-2">{error}</p>
                <button
                  onClick={fetchData}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">لا توجد محادثات</p>
                </div>
              </div>
            ) : (
              filteredChats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                  selectedChat?._id === chat._id ? 'bg-gray-800' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-cyan-400">
                    {chat.sessionId.substring(0, 20)}...
                  </span>
                  <span className="text-xs text-gray-400">
                    {chat.totalMessages} رسائل
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-green-400 flex items-center space-x-1 space-x-reverse">
                    <span>📍</span>
                    <span>{chat.city}, {chat.country}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mb-2 line-clamp-2">
                  {chat.messages[chat.messages.length - 1]?.text.substring(0, 100)}...
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(chat.createdAt).toLocaleDateString('us-US')}</span>
                  <div className="flex space-x-1 space-x-reverse">
                    {chat.keywords.slice(0, 2).map((keyword) => (
                      <span key={keyword} className="bg-gray-700 px-2 py-1 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-gray-900/50 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1">
                      معرف الجلسة: {selectedChat.sessionId}
                    </h2>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span>📍</span>
                        <span className="text-green-400 font-medium">
                          {selectedChat.city}, {selectedChat.country}
                        </span>
                      </div>

                      <div>تاريخ الإنشاء: {new Date(selectedChat.createdAt).toLocaleString('us-US')}</div>
                      <div>آخر نشاط: {new Date(selectedChat.lastActivity).toLocaleString('us-US')}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-400 mb-2">الكلمات المفتاحية:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedChat.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {selectedChat.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.isUser
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-800 text-gray-100 border border-gray-700'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {new Date(message.timestamp).toLocaleTimeString('ar-SA')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">اختر محادثة لعرضها</p>
                <p className="text-sm">انقر على إحدى المحادثات في القائمة الجانبية</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
