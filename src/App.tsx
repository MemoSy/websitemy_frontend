import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AnimatedBackground from './components/UI/AnimatedBackground';
import ParticleBackground from './components/UI/ParticleBackground';
import CustomCursor from './components/UI/CustomCursor';
import LoadingSpinner from './components/UI/LoadingSpinner';
import PerformanceMonitor from './components/UI/PerformanceMonitor';

// Lazy loading للصفحات
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AIChat = lazy(() => import('./pages/AIChat'));
const ChatAnalytics = lazy(() => import('./pages/ChatAnalytics'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// مكون Loading مخصص
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" text="جاري التحميل..." />
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
        {/* خلفيات متحركة */}
        <AnimatedBackground />
        <ParticleBackground />
        
        {/* مؤشر مخصص */}
        <CustomCursor />
        
        {/* مراقب الأداء */}
        <PerformanceMonitor />
        
        <div className="relative z-10">
          <Header />
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="/chat-analytics" element={<ChatAnalytics />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;