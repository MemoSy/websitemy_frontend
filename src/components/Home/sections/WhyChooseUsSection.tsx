import { useEffect, useRef } from "react";
import {
  Clock,
  Shield,
  DollarSign,
  Zap,
  TrendingUp,
  Palette,
  Headphones,
  Smartphone,
} from "lucide-react";

const WhyChooseUsSection = () => {
  const containerRef = useRef(null);
  const isPausedRef = useRef(false);

  const features = [
    {
      icon: Clock,
      iconColor: "text-cyan-400",
      bgGradient: "from-cyan-500/20 to-purple-500/20",
      borderColor: "border-cyan-400/30",
      hoverBorder: "hover:border-cyan-400",
      statGradient: "from-cyan-400 to-purple-500",
      stat: "98%",
      title: "تسليم في الوقت",
      description: "نلتزم بمواعيد التسليم المتفق عليها"
    },
    {
      icon: Shield,
      iconColor: "text-purple-500",
      bgGradient: "from-purple-500/30 to-cyan-500/20",
      borderColor: "border-purple-500",
      hoverBorder: "hover:border-purple-500",
      statGradient: "from-purple-500 to-cyan-400",
      stat: "6 أشهر",
      title: "ضمان جودة مجاني",
      description: "ضمان كامل على خدماتنا لمدة 6 أشهر",
      featured: true
    },
    {
      icon: DollarSign,
      iconColor: "text-cyan-400",
      bgGradient: "from-cyan-500/20 to-purple-500/20",
      borderColor: "border-cyan-400/30",
      hoverBorder: "hover:border-cyan-400",
      statGradient: "from-cyan-400 to-purple-500",
      stat: "0",
      title: "تكاليف خفية",
      description: "أسعار شفافة بدون مفاجآت"
    },
    {
      icon: Zap,
      iconColor: "text-emerald-400",
      bgGradient: "from-emerald-400/20 to-cyan-500/20",
      borderColor: "border-emerald-400/30",
      hoverBorder: "hover:border-emerald-400",
      statGradient: "from-emerald-400 to-cyan-400",
      stat: "<2s",
      title: "سرعة فائقة",
      description: "تحميل أقل من ثانيتين"
    },
    {
      icon: TrendingUp,
      iconColor: "text-cyan-400",
      bgGradient: "from-cyan-500/20 to-purple-500/20",
      borderColor: "border-cyan-400/30",
      hoverBorder: "hover:border-cyan-400",
      statGradient: "from-cyan-400 to-purple-500",
      stat: "+100%",
      title: "تحسين SEO",
      description: "زيادة في ظهور موقعك على محركات البحث"
    },
    {
      icon: Palette,
      iconColor: "text-purple-500",
      bgGradient: "from-purple-500/20 to-cyan-500/20",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500",
      statGradient: "from-purple-500 to-cyan-400",
      stat: "100%",
      title: "تصميمات حصرية",
      description: "مخصص لهوية علامتك التجارية"
    },
    {
      icon: Headphones,
      iconColor: "text-emerald-400",
      bgGradient: "from-emerald-400/20 to-cyan-500/20",
      borderColor: "border-emerald-400/30",
      hoverBorder: "hover:border-emerald-400",
      statGradient: "from-emerald-400 to-cyan-400",
      stat: "24/7",
      title: "دعم مستمر",
      description: "دعم فني على مدار الساعة"
    },
    {
      icon: Smartphone,
      iconColor: "text-cyan-400",
      bgGradient: "from-cyan-500/20 to-purple-500/20",
      borderColor: "border-cyan-400/30",
      hoverBorder: "hover:border-cyan-400",
      statGradient: "from-cyan-400 to-purple-500",
      stat: "100%",
      title: "تصميم متجاوب",
      description: "يعمل على جميع الأجهزة بسلاسة"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame;
    let position = 0;
    const speed = 0.3; // سرعة أبطأ وأكثر سلاسة

    const animate = () => {
      if (!isPausedRef.current) {
        position -= speed;
        
        // عندما تنتهي المجموعة الأولى، نعيد للبداية بسلاسة
        if (position <= -50) {
          position = 0;
        }
        
        container.style.transform = `translateX(${position}%)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    const handleMouseEnter = () => { isPausedRef.current = true; };
    const handleMouseLeave = () => { isPausedRef.current = false; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const renderCard = (feature, idx) => {
    const Icon = feature.icon;
    const baseClasses = feature.featured
      ? `flex-shrink-0 w-72 bg-gradient-to-br from-slate-800 to-slate-900 border-2 ${feature.borderColor} rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/30`
      : `flex-shrink-0 w-72 bg-slate-800 border border-white/5 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${feature.hoverBorder} hover:shadow-cyan-400/15`;

    return (
      <div key={idx} className={baseClasses}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 bg-gradient-to-br ${feature.bgGradient} border-2 ${feature.borderColor} rounded-xl flex items-center justify-center`}>
            <Icon className={`w-7 h-7 ${feature.iconColor}`} />
          </div>
          <div className={`text-4xl font-black bg-gradient-to-r ${feature.statGradient} bg-clip-text text-transparent`}>
            {feature.stat}
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    );
  };

  return (
    <section className="py-16 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-block px-6 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4">
            لماذا نحن الأفضل
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            مميزات تجعلنا الخيار الأمثل لمشروعك
          </h2>
          <p className="text-slate-400 leading-relaxed">
            نجمع بين الخبرة والجودة والالتزام لتقديم أفضل تجربة
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={containerRef} 
            className="flex gap-4 pb-4 px-2"
            style={{ 
              width: '200%',
              transition: 'none'
            }}
          >
            {features.map((f, i) => renderCard(f, `set1-${i}`))}
            {features.map((f, i) => renderCard(f, `set2-${i}`))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="animate-pulse">قف بالمؤشر لإيقاف الحركة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;