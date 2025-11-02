import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import GoogleAnalytics from './components/Analytics/GoogleAnalytics';
import GoogleSearchConsole from './components/Analytics/GoogleSearchConsole';

// Lazy loading للصفحات
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AIChat = lazy(() => import('./pages/AIChat'));
const ChatAnalytics = lazy(() => import('./pages/ChatAnalytics'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load heavy UI components after initial render
const AnimatedBackground = lazy(() => import('./components/UI/AnimatedBackground'));
const ParticleBackground = lazy(() => import('./components/UI/ParticleBackground'));
const CustomCursor = lazy(() => import('./components/UI/CustomCursor'));
const PerformanceMonitor = lazy(() => import('./components/UI/PerformanceMonitor'));
const AIAssistantButton = lazy(() => import('./components/UI/AIAssistantButton'));
const FloatingWhatsAppButton = lazy(() => import('./components/UI/FloatingWhatsAppButton'));

// مكون Loading مخصص
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" text="جاري التحميل..." />
  </div>
);

function App() {
  // متغيرات التكوين - يمكنك تحديثها عند الحصول على IDs من Google
  const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
  const GOOGLE_SEARCH_CONSOLE_CODE = import.meta.env.VITE_GSC_VERIFICATION || '';

  return (
    <HelmetProvider>
      <Router>
        {/* Google Analytics */}
        {GOOGLE_ANALYTICS_ID && <GoogleAnalytics measurementId={GOOGLE_ANALYTICS_ID} />}
        
        {/* Google Search Console Verification */}
        {GOOGLE_SEARCH_CONSOLE_CODE && <GoogleSearchConsole verificationCode={GOOGLE_SEARCH_CONSOLE_CODE} />}
        
        <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
          {/* خلفيات متحركة - Lazy loaded */}
          <Suspense fallback={null}>
            <AnimatedBackground />
            <ParticleBackground />
          </Suspense>
          
          {/* مؤشر مخصص - Lazy loaded */}
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
          
          {/* مراقب الأداء - Only in development */}
          {import.meta.env.DEV && (
            <Suspense fallback={null}>
              <PerformanceMonitor />
            </Suspense>
          )}
        
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
                <Route path="/memo-admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          
          {/* مساعد ذكي ثابت في جميع الصفحات - Lazy loaded */}
          <Suspense fallback={null}>
            <AIAssistantButton />
            <FloatingWhatsAppButton />
          </Suspense>
        </div>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;