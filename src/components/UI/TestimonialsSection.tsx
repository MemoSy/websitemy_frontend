import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Facebook, Youtube, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  comment: string;
  project: string;
  language: 'ar' | 'en' | 'tr'; // إضافة اللغة
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Tariq Elouzeh",
      position: "Engineer at Apple",
      company: "Senior Software Automation",
      image: "/images/testimonials/tark.jpeg",
      comment:
        "محمود شاب مبدع ومستقبلو واعد بمجال التكنولوجيا. كنت سعيد جداً اني استضفتو بواحدة من حلقات 'مقابلة البرمجة' على قناتي باليوتيوب وابدع بالمقابلة بالرغم من سنه الصغير ونقص الخبرة بالمقابلات البرمجية.",
      project: "متجر إلكتروني متكامل",
      language: 'ar',
      facebookUrl: "#",
      twitterUrl: "https://www.instagram.com/tariqelouzeh",
      linkedinUrl: "https://www.linkedin.com/in/tariqelouzeh/",
      githubUrl: "#",
      youtubeUrl: "https://www.youtube.com/@tariqelouzeh",
    },
    {
      id: "2",
      name: "Emine Özkan‏",
      position: "İnsan Kaynakları Müdürü",
      company: "Hyper Company",
      image: "/images/testimonials/amina.jpeg",
      comment:
        "Mahmut, hayallerinin peşinden azimle koşan, vizyoner ve çalışkan bir genç. Onu ofisimizde ağırlama fırsatı buldum ve o gün heyecanını, gözlerindeki ışığı yakından gördüm. Kısa zamanda kendisini web tasarım ve yazılım alanında geliştirmesi çok etkileyici.",
      project: "منصة تعليمية تفاعلية",
      language: 'tr',
      facebookUrl: "https://www.facebook.com",
      twitterUrl: "https://www.twitter.com",
      linkedinUrl: "https://www.linkedin.com/in/emine-%C3%B6zkan16/",
      githubUrl: "https://www.github.com",
      youtubeUrl: "https://www.youtube.com",
    },
    {
      id: "3",
      name: "JavaScript Mastery",
      position: "Adrian",
      company: "Founder @jsmastery.pro, GitHub Star",
      image: "/images/testimonials/java.jpeg",
      comment:
        "Keep building, keep sharing - big things start exactly like this. Cheering you on all the way, Mahmoud. You can achieve anything you put your mind to! 🙌",
      project: " ",
      language: 'en',
      facebookUrl: "https://www.facebook.com",
      twitterUrl: "https://x.com/jsmasterypro",
      linkedinUrl: "https://www.linkedin.com/company/javascriptmastery/",
      githubUrl: "https://github.com/adrianhajdin",
      youtubeUrl: "https://www.youtube.com/c/JavaScriptMastery",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-24 bg-[#0A0E27] relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#00FFA3]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* العنوان */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-[#00FFA3]/10 border border-[#00FFA3]/30 rounded-full mb-6">
            <span className="text-[#00FFA3] font-semibold text-sm">قائمة الشرف</span>
          </div>
          <h2 className="text-xl md:text-5xl font-black text-white mb-6 leading-tight">
            ما يقوله{' '}
            <span className="bg-gradient-to-r from-[#6C5CE7] via-[#00D9FF] to-[#00FFA3] bg-clip-text text-transparent">
              خبراء البرمجة
            </span>
          </h2>
          <p className="text-[#A0AEC0] text-xs md:text-xl max-w-3xl mx-auto">
            مساحة مخصصة لعرض آراء نخبة من أساتذة البرمجة ومطوري الويب
          </p>
        </div>

        {/* البطاقات - Desktop */}
        <div className="relative max-w-7xl mx-auto hidden md:block">
          <div className="flex items-center justify-center gap-8">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              
              return (
                <motion.div
                  key={testimonial.id}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer relative"
                  style={{
                    zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.5,
                    x: offset * 20,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TestimonialCard testimonial={testimonial} isActive={isActive} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* البطاقات - Mobile */}
        <div className="relative md:hidden">
          {/* Container للبطاقات */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-gradient-to-br from-[#1A1F3A]/95 to-[#0F1729]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    {/* معلومات الشخص - من اليسار لليمين */}
                    <div className="flex items-center gap-3 mb-6" dir="ltr">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#6C5CE7]/50"
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <h4 className="text-white font-bold text-lg truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#A0AEC0] text-xs truncate">
                          {testimonial.position}
                        </p>
                        <p className="text-[#6C5CE7] text-xs truncate">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* التعليق */}
                    <p 
                      className={`text-[#A0AEC0] text-sm leading-relaxed mb-6 ${
                        testimonial.language === 'ar' ? 'text-right' : 'text-left'
                      }`}
                      dir={testimonial.language === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {testimonial.comment}
                    </p>

                    {/* أيقونات التواصل */}
                    <div className="flex items-center justify-center gap-2 flex-wrap pt-4 border-t border-white/10">
                      {testimonial.githubUrl && testimonial.githubUrl !== "#" && (
                        <a href={testimonial.githubUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Github className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {testimonial.linkedinUrl && (
                        <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Linkedin className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {testimonial.twitterUrl && (
                        <a href={testimonial.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Twitter className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {testimonial.youtubeUrl && (
                        <a href={testimonial.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Youtube className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {testimonial.facebookUrl && testimonial.facebookUrl !== "#" && (
                        <a href={testimonial.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Facebook className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* أزرار التنقل - Mobile */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#6C5CE7]/20 hover:border-[#6C5CE7] transition-all duration-300 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <div className="text-white/60 text-sm font-semibold">
              {activeIndex + 1} / {testimonials.length}
            </div>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#6C5CE7]/20 hover:border-[#6C5CE7] transition-all duration-300 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* مؤشرات البطاقات */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-12 bg-gradient-to-r from-[#6C5CE7] to-[#00D9FF]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// مكون البطاقة المنفصل
const TestimonialCard: React.FC<{ testimonial: Testimonial; isActive: boolean }> = ({ 
  testimonial
}) => {
  const isRTL = testimonial.language === 'ar';
  
  return (
    <div className="w-full md:w-[400px] bg-gradient-to-br from-[#1A1F3A]/95 to-[#0F1729]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:border-[#6C5CE7]/50 transition-all duration-300">
      {/* معلومات الشخص - في الأعلى من اليسار إلى اليمين */}
      <div className="flex flex-row-reverse items-center gap-4 mb-6 pb-6 border-b border-white/10">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-[#6C5CE7]/50 shadow-lg"
        />
        <div className="flex-1 text-right">
          <h4 className="text-white font-bold text-xl mb-1">
            {testimonial.name}
          </h4>
          <p className="text-[#A0AEC0] text-sm line-clamp-1">
            {testimonial.position}
          </p>
          <p className="text-[#6C5CE7] text-xs mt-1 line-clamp-1">
            {testimonial.company}
          </p>
        </div>
      </div>

      {/* التعليق */}
      <div className="mb-8">
        <p 
          className={`text-[#A0AEC0] text-base leading-relaxed min-h-[140px] ${
            isRTL ? 'text-right' : 'text-left'
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {testimonial.comment}
        </p>
      </div>

      {/* أيقونات التواصل الاجتماعي */}
      <div className="flex items-center justify-center gap-3 flex-wrap pt-4 border-t border-white/10">
        {testimonial.githubUrl && testimonial.githubUrl !== "#" && (
          <a
            href={testimonial.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#6C5CE7]/20 hover:border-[#6C5CE7] transition-all duration-300"
          >
            <Github className="w-4 h-4 text-white" />
          </a>
        )}
        {testimonial.linkedinUrl && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00D9FF]/20 hover:border-[#00D9FF] transition-all duration-300"
          >
            <Linkedin className="w-4 h-4 text-white" />
          </a>
        )}
        {testimonial.twitterUrl && (
          <a
            href={testimonial.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00D9FF]/20 hover:border-[#00D9FF] transition-all duration-300"
          >
            <Twitter className="w-4 h-4 text-white" />
          </a>
        )}
        {testimonial.youtubeUrl && (
          <a
            href={testimonial.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0000]/20 hover:border-[#FF0000] transition-all duration-300"
          >
            <Youtube className="w-4 h-4 text-white" />
          </a>
        )}
        {testimonial.facebookUrl && testimonial.facebookUrl !== "#" && (
          <a
            href={testimonial.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2]/20 hover:border-[#1877F2] transition-all duration-300"
          >
            <Facebook className="w-4 h-4 text-white" />
          </a>
        )}
      </div>
    </div>
  );
};

export default TestimonialsSection;
