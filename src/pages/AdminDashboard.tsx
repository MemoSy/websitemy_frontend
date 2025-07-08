import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  MessageSquare, 
  Search,
  Filter,
  RefreshCw,
  Download
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const chatsData = await getAllChats();
      setChats(chatsData);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const exportChats = () => {
    const dataStr = JSON.stringify(filteredChats, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chats_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">جاري التحميل...</div>
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
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
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
                <div className="text-sm text-gray-300 mb-2 line-clamp-2">
                  {chat.messages[chat.messages.length - 1]?.text.substring(0, 100)}...
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(chat.createdAt).toLocaleDateString('ar-SA')}</span>
                  <div className="flex space-x-1 space-x-reverse">
                    {chat.keywords.slice(0, 2).map((keyword) => (
                      <span key={keyword} className="bg-gray-700 px-2 py-1 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
                      <div>IP: {selectedChat.userIP}</div>
                      <div>تاريخ الإنشاء: {new Date(selectedChat.createdAt).toLocaleString('ar-SA')}</div>
                      <div>آخر نشاط: {new Date(selectedChat.lastActivity).toLocaleString('ar-SA')}</div>
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
