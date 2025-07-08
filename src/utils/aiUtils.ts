import { projects, serviceCategories } from "../data/projects";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBKhvS66Ly1vvaohyyywqsqmkX4glcJIlw");

export interface CompanyInfo {
  name: string;
  expertise: string;
  experience: string;
  satisfaction: string;
  completedProjects: string;
  technologies: string[];
  specialties: string[];
}

export interface AIKnowledgeBase {
  companyInfo: CompanyInfo;
  projects: any[];
  categories: any[];
  commonQuestions: {
    question: string;
    answer: string;
  }[];
}

export const companyInfo: CompanyInfo = {
  name: "WebSiteMy",
  expertise: "تطوير مواقع الويب والتطبيقات الحديثة",
  experience: "5+ سنوات",
  satisfaction: "98% عملاء راضون",
  completedProjects: "150+ مشروع منجز",
  technologies: [
    "React.js",
    "Next.js",
    "Vue.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Bootstrap",
    "Docker",
    "AWS",
    "Vercel",
  ],
  specialties: [
    "التجارة الإلكترونية",
    "المنصات التعليمية",
    "الشبكات الاجتماعية",
    "المشاريع مفتوحة المصدر",
    "المنصات الإخبارية",
    "الصفحات الشخصية",
  ],
};

export const commonQuestions = [
  {
    question: "ما هي أسعار المشاريع؟",
    answer: `أسعار مشاريعنا تبدأ من 500$ وتصل إلى 3000$ حسب التعقيد والميزات المطلوبة. إليك أمثلة:

• المشاريع البسيطة: 500$ - 1000$ (صفحات شخصية، مواقع تعريفية)
• المشاريع المتوسطة: 1000$ - 2000$ (متاجر إلكترونية بسيطة، منصات تعليمية)
• المشاريع المتقدمة: 2000$ - 3000$ (أنظمة إدارة معقدة، منصات SaaS)

السعر النهائي يعتمد على:
- عدد الصفحات والميزات
- التقنيات المستخدمة
- التصميم المخصص
- التكامل مع أنظمة خارجية`,
  },
  {
    question: "كم تستغرق مدة التطوير؟",
    answer: `مدة التطوير تعتمد على حجم وتعقيد المشروع:

• المشاريع البسيطة: 1-2 أسبوع
• المشاريع المتوسطة: 3-8 أسابيع  
• المشاريع المعقدة: 2-6 أشهر

نحن نلتزم بالمواعيد المحددة ونقدم تحديثات دورية حول تقدم العمل.`,
  },
  {
    question: "ما هي التقنيات التي تستخدمونها؟",
    answer: `نحن نعمل بأحدث التقنيات الحديثة:

**Frontend:**
• React.js & Next.js
• Vue.js
• TypeScript/JavaScript
• Tailwind CSS & Bootstrap

**Backend:**
• Node.js & Express.js
• Python & FastAPI
• MongoDB & PostgreSQL

**DevOps & Hosting:**
• Docker
• AWS & Vercel
• Git & GitHub

نختار التقنية المناسبة لكل مشروع حسب متطلباته.`,
  },
];

export const generateKnowledgeBase = (): AIKnowledgeBase => {
  return {
    companyInfo,
    projects: projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      category: project.category,
      technologies: project.technologies,
      duration: project.duration,
      rating: project.rating,
      features: project.features,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      objectives: project.objectives,
      challenges: project.challenges,
      ...project.aiData,
    })),
    categories: serviceCategories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      subtitle: cat.subtitle,
      description: cat.description,
      projectCount: cat.projects.length,
      projects: cat.projects.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.aiData?.price,
        complexity: p.aiData?.complexity,
      })),
    })),
    commonQuestions,
  };
};




export const callGeminiAPI = async (
  message: string,
  context: AIKnowledgeBase
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite-preview-06-17",
    });

    const prompt = `
    You are an AI assistant for WebSiteMy, a web development company. 
    You have access to the following information about the company and its projects:
    
    Company Info: ${JSON.stringify(context.companyInfo, null, 2)}
    Projects: ${JSON.stringify(context.projects, null, 2)}
    Categories: ${JSON.stringify(context.categories, null, 2)}
    
    User Question: ${message}
    
    Please provide a helpful, accurate response in Arabic. Focus on the company's projects, 
    services, and capabilities. Be professional and informative.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
};
