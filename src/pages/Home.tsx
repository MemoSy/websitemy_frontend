import SEO from "../components/SEO/SEO";
import ProjectTabs from "../components/UI/ProjectTabs";
import TestimonialsSection from "../components/UI/TestimonialsSection";
import StackCards from "../components/UI/StackCards";
import { Helmet } from "react-helmet-async";

// Import Home Page Sections
import {
  HeroSection,
  ServicesSection,
  CurrentProjectsSection,
  FAQSection,
} from "../components/Home/sections";

// FAQ Data for Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ما هي تكلفة تصميم موقع إلكتروني؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "تبدأ أسعارنا من 250$ للمواقع الشخصية، 500$ للمتاجر الإلكترونية، و1000$ لتطبيقات الستارت أب. نقدم حالياً خصم 40% على جميع الخدمات."
      }
    },
    {
      "@type": "Question",
      "name": "كم يستغرق تطوير موقع إلكتروني؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "يعتمد على حجم المشروع. المواقع الشخصية: 1-2 أسبوع، المتاجر الإلكترونية: 2-4 أسابيع، تطبيقات الستارت أب: 4-6 أسابيع."
      }
    },
    {
      "@type": "Question",
      "name": "هل تقدمون دعم فني بعد التسليم؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، نقدم دعم فني مجاني لمدة 3 أشهر بعد التسليم، ودعم مستمر على مدار الساعة لعملائنا."
      }
    },
    {
      "@type": "Question",
      "name": "ما هي التقنيات التي تستخدمونها؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نستخدم أحدث التقنيات: React, Next.js, TypeScript, Node.js, NestJS, MongoDB, وغيرها من التقنيات الحديثة حسب متطلبات المشروع."
      }
    },
    {
      "@type": "Question",
      "name": "هل يمكنني طلب تعديلات بعد التسليم؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "بالتأكيد! نقدم مراجعات متعددة حتى الرضا التام، ونستمر في تقديم التعديلات خلال فترة الدعم الفني."
      }
    }
  ]
};

const HomeNew = () => {
  return (
    <>
      <SEO
        title="WebSiteMy | تصميم مواقع احترافية وتطوير متاجر إلكترونية - خصم 40%"
        description="شركة WebSiteMy لتصميم وتطوير المواقع الإلكترونية والمتاجر الرقمية. نقدم حلول ويب متكاملة: تصميم احترافي، برمجة متقدمة، استضافة آمنة، دعم فني 24/7. أسعار تبدأ من 250$"
        keywords="تصميم مواقع, تطوير مواقع, متجر إلكتروني, برمجة مواقع, تصميم متاجر, شركة تصميم مواقع, أفضل شركة تطوير ويب, تصميم مواقع احترافية, WebSiteMy, موقع شخصي, تطبيق ستارت أب"
        url="/"
      />
      
      {/* FAQ Schema for Rich Results */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

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

      {/* Programming Experts Testimonials - آراء خبراء البرمجة */}
      <TestimonialsSection />

      {/* FAQ Section - الأسئلة الشائعة */}
      <FAQSection />
    </>
  );
};

export default HomeNew;