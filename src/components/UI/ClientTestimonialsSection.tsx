import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Star, Quote, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface ClientTestimonial {
  id: string;
  projectId: string;
  name: string;
  projectName: string;
  image: string;
  comment: string;
  rating: number;
}

const clients: ClientTestimonial[] = [
  {
    id: "1",
    projectId: "comprevende",
    name: "براء بيطار",
    projectName: "Comprevende",
    image: "",
    comment: "تجربة ممتازة في تطوير منصة البيع والشراء الخاصة بنا. الموقع سريع وسهل الاستخدام، واستجاب الفريق لكل متطلباتنا التقنية بمرونة واحترافية عالية.",
    rating: 5,
  },
  {
    id: "2",
    projectId: "emar-home",
    name: "محمد قنطار",
    projectName: "إعمار للتصميم الداخلي",
    image: "",
    comment: "كمكتب تصميم داخلي، كان يهمنا جداً أن يعكس موقعنا الجمالية، والنتيجة كانت موقعاً أنيقاً يستعرض مشاريعنا بأفضل صورة مع لوحة تحكم سهلة وواضحة.",
    rating: 5,
  },
  {
    id: "3",
    projectId: "arabia-swim",
    name: "الكابتن عمران",
    projectName: "أكاديمية أرابيا للسباحة",
    image: "",
    comment: "الموقع الجديد ساهم بشكل كبير في تسهيل تواصل المتدربين معنا. واجهة عرض البرامج الرياضية والتسجيل فيها واضحة، وعكس الروح الرياضية للأكاديمية.",
    rating: 5,
  },
  {
    id: "4",
    projectId: "pro-camz",
    name: "احمد الفارس",
    projectName: "Pro Camz",
    image: "",
    comment: "أداء المتجر الإلكتروني أصبح أكثر سلاسة بعد التصميم الجديد. سرعة تصفح المنتجات وتصنيف المعدات الاحترافية ساعدت عملائنا على إتمام الشراء بخطوات بسيطة.",
    rating: 5,
  },
  {
    id: "5",
    projectId: "gold-cup",
    name: "nyiazi",
    projectName: "جولد كاب - كاسة ذهبية",
    image: "",
    comment: "تصميم الموقع أعطى هوية بصرية رائعة لعلامتنا. الواجهة جذابة وتتناسب تماماً مع تطلعاتنا لعرض منتجاتنا بشكل عصري ومميز. عمل متقن بصراحة.",
    rating: 5,
  }
];

const ClientTestimonialsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = clients.length - 1;
      if (nextIndex >= clients.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Helper to get visible items based on screen size
  const getVisibleItems = () => {
    if (isMobile) {
      return [clients[currentIndex]];
    } else {
      const items = [];
      for (let i = 0; i < 3; i++) {
        items.push(clients[(currentIndex + i) % clients.length]);
      }
      return items;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#0A0E27]/50">
      {/* Aesthetic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 xl:px-0 relative z-10 max-w-7xl">
        
        {/* Section Header with Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className={`max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-4 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-sm font-bold tracking-wide mb-4">
              {t("clients.badge", "آراء عملائنا")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              شركاء <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">النجاح</span>
            </h2>
            <p className="text-gray-400 text-lg">
              نفخر بما حققناه مع عملائنا من مختلف المجالات. استمع إلى تجاربهم وكيف ساهمنا في نقل أعمالهم إلى المستوى التالي.
            </p>
          </div>

          {/* Controls - Desktop (Shows count via dots + arrows) */}
          <div className="hidden lg:flex items-center gap-6 pb-2" dir="ltr">
            <button 
              onClick={() => paginate(isRTL ? -1 : 1)}
              className="w-12 h-12 flex items-center justify-center bg-[#0F172A] border border-gray-700 rounded-full text-white hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Desktop Pagination Dots Indicator */}
            <div className="flex gap-2">
              {clients.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-700'}`}
                  title={`${idx + 1} / ${clients.length}`}
                />
              ))}
            </div>

            <button 
              onClick={() => paginate(isRTL ? 1 : -1)}
              className="w-12 h-12 flex items-center justify-center bg-[#0F172A] border border-gray-700 rounded-full text-white hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Cards Wrapper */}
          <div className="overflow-hidden py-8 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(isRTL ? -1 : 1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(isRTL ? 1 : -1);
                  }
                }}
                className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-3'} gap-8 cursor-grab active:cursor-grabbing`}
              >
                {getVisibleItems().map((client, idx) => (
                  <div 
                    key={`${client.id}-${idx}`}
                    onClick={() => navigate(`/project/${client.projectId}`)}
                    className="bg-[#0F172A]/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 relative group hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer"
                  >
                    <Quote className={`absolute top-6 ${isRTL ? 'left-8' : 'right-8'} w-12 h-12 text-gray-700/30 group-hover:text-cyan-500/10 transition-colors`} />
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative flex-shrink-0 w-16 h-16 rounded-full border-2 border-gray-700 bg-gray-800/50 flex flex-col items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
                        {client.image ? (
                          <img 
                            src={client.image} 
                            alt={client.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{client.name}</h4>
                        <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-md">
                          {client.projectName}
                        </span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(client.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-300 leading-loose text-lg">
                      "{client.comment}"
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls - Mobile Only */}
          <div className="flex justify-center items-center gap-4 mt-8 lg:hidden">
            <button 
              onClick={() => paginate(isRTL ? 1 : -1)}
              className="w-12 h-12 flex items-center justify-center bg-[#0F172A] border border-gray-700 rounded-full text-white hover:bg-cyan-500 hover:border-cyan-400 transition-colors"
            >
              <ChevronRight className={`w-6 h-6 ${isRTL ? '' : 'rotate-180'}`} />
            </button>
            <div className="flex gap-2">
              {clients.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-700'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => paginate(isRTL ? -1 : 1)}
              className="w-12 h-12 flex items-center justify-center bg-[#0F172A] border border-gray-700 rounded-full text-white hover:bg-cyan-500 hover:border-cyan-400 transition-colors"
            >
              <ChevronLeft className={`w-6 h-6 ${isRTL ? '' : 'rotate-180'}`} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientTestimonialsSection;