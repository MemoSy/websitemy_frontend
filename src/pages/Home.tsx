import SEO from "../components/SEO/SEO";
import ProjectTabs from "../components/UI/ProjectTabs";
import TestimonialsSection from "../components/UI/TestimonialsSection";
import StackCards from "../components/UI/StackCards";

// Import Home Page Sections
import {
  HeroSection,
  ServicesSection,
  WhyChooseUsSection,
  CurrentProjectsSection,
  FAQSection,
} from "../components/Home/sections";

const HomeNew = () => {
  return (
    <>
      <SEO
        title="WebsiteMy - ����� ������ ��� ����� ��� ���� ������ ����� 40%"
        description="����� ������ ������� �� ���� ���� ��� ����� ����� | ����� + ����� + ������� + ����� 24/7"
        keywords="����� �����, ����� �����, ������� �����, ���� ����� ���"
        url="/"
      />

      {/* Hero Section - ��� ����� */}
      <HeroSection />

      {/* Services Section - ��� ����� */}
      <ServicesSection />

      {/* Why Choose Us Section - ��� ����� */}
      {/* <WhyChooseUsSection /> */}

      {/* How We Work - Stack Cards Effect */}
      <StackCards />

      {/* Current Projects Section - ��� ����� */}
      <CurrentProjectsSection />

      {/* Portfolio - ���� ������� */}
      <ProjectTabs />

      {/* Testimonials - ����� ����� */}
      <TestimonialsSection />

      {/* FAQ Section - ��� ����� */}
      <FAQSection />
    </>
  );
};

export default HomeNew;
