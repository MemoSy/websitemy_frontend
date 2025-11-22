import SEO from "../components/SEO/SEO";
import ProjectTabs from "../components/UI/ProjectTabs";
import TestimonialsSection from "../components/UI/TestimonialsSection";
import StackCards from "../components/UI/StackCards";

// Import Home Page Sections
import {
  HeroSection,
  ServicesSection,
  CurrentProjectsSection,
  FAQSection,
} from "../components/Home/sections";

const HomeNew = () => {
  return (
    <>
      <SEO
        title="WebsiteMy - تصميم مواقع ويب احترافية مع خصم يصل لـ 40%"
        description="نصمم ونطور مواقع ويب عصرية وسريعة لنمو أعمالك | تصميم + برمجة + استضافة + دعم فني 24/7"
        keywords="تصميم مواقع, برمجة مواقع, تطوير الويب, مواقع تجارية احترافية"
        url="/"
      />

      {/* Hero Section - الرئيسية  */}
      <HeroSection />

      {/* Services Section - قسم الخدمات */}
      <ServicesSection />

      {/* Portfolio - معرض الأعمال */}
      <ProjectTabs />

      {/* How We Work - Stack Cards Effect */}
      <StackCards />

      {/* Current Projects Section - المشاريع الحالية */}
      <CurrentProjectsSection />

      {/* Testimonials - آراء العملاء */}
      <TestimonialsSection />

      {/* FAQ Section - الأسئلة الشائعة */}
      <FAQSection />
    </>
  );
};

export default HomeNew;