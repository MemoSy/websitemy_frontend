import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, TrendingUp, Calendar, Brain, Eye } from "lucide-react";
import { getChatAnalytics } from "../utils/chatService";

interface Analytics {
  totalChats: number;
  totalMessages: number;
  popularKeywords: Array<{ _id: string; count: number }>;
  chatsByDay: Array<{ _id: string; count: number }>;
}

const ChatAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getChatAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 flex items-center justify-center">
        <div className="text-white text-xl">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 xl:px-0 max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                تحليلات المحادثات
              </h1>
              <p className="text-cyan-400">إحصائيات وتحليلات المساعد الذكي</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">إجمالي المحادثات</p>
                <p className="text-2xl font-bold text-white">{analytics?.totalChats || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">إجمالي الرسائل</p>
                <p className="text-2xl font-bold text-white">{analytics?.totalMessages || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">متوسط الرسائل</p>
                <p className="text-2xl font-bold text-white">
                  {analytics?.totalChats ? Math.round(analytics.totalMessages / analytics.totalChats) : 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">محادثات اليوم</p>
                <p className="text-2xl font-bold text-white">
                  {analytics?.chatsByDay?.[0]?.count || 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 space-x-reverse">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>الكلمات المفتاحية الأكثر استخداماً</span>
            </h3>
            <div className="space-y-3">
              {analytics?.popularKeywords?.map((keyword) => (
                <div key={keyword._id} className="flex items-center justify-between">
                  <span className="text-gray-300">{keyword._id}</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                        style={{
                          width: `${(keyword.count / (analytics.popularKeywords[0]?.count || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-cyan-400 font-medium">{keyword.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>النشاط الأخير (7 أيام)</span>
            </h3>
            <div className="space-y-3">
              {analytics?.chatsByDay?.map((day) => (
                <div key={day._id} className="flex items-center justify-between">
                  <span className="text-gray-300">{new Date(day._id).toLocaleDateString('ar-SA')}</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                        style={{
                          width: `${(day.count / (analytics.chatsByDay[0]?.count || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-purple-400 font-medium">{day.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnalytics;
