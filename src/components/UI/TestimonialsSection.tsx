import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, User, Building, Calendar } from 'lucide-react';
import { gsap } from 'gsap';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
  results: string[];
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'أحمد محمد السعيد',
      position: 'مدير التسويق الرقمي',
      company: 'شركة التقنية المتقدمة',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      comment: 'تجربة استثنائية مع فريق محترف جداً. تم تسليم المشروع في الوقت المحدد وبجودة تفوق التوقعات. الموقع الجديد ساهم في زيادة مبيعاتنا بنسبة 150% خلال 3 أشهر فقط.',
      project: 'متجر إلكتروني متكامل',
      date: '2024-01-15',
      results: ['زيادة المبيعات 150%', 'تحسين تجربة المستخدم', 'تقليل معدل الارتداد 60%']
    },
    {
      id: '2',
      name: 'فاطمة علي الزهراني',
      position: 'مؤسسة ومديرة تنفيذية',
      company: 'أكاديمية المستقبل التعليمية',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      comment: 'منصة تعليمية رائعة غيرت طريقة تقديم التعليم لدينا. الطلاب أصبحوا أكثر تفاعلاً والمعلمون يجدون سهولة في إدارة المحتوى. نظام التتبع والتحليلات مفيد جداً.',
      project: 'منصة تعليمية تفاعلية',
      date: '2024-02-10',
      results: ['زيادة التفاعل 200%', 'تحسين الأداء الأكاديمي', 'توفير الوقت 40%']
    },
    {
      id: '3',
      name: 'خالد عبدالرحمن',
      position: 'مدير تقنية المعلومات',
      company: 'مجموعة الأعمال الذكية',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      comment: 'لوحة التحكم التي طوروها لنا ساعدتنا في تنظيم عملياتنا بشكل كامل. التقارير والتحليلات دقيقة ومفيدة جداً لاتخاذ القرارات الاستراتيجية.',
      project: 'نظام إدارة الأعمال',
      date: '2024-01-28',
      results: ['تحسين الكفاءة 80%', 'توحيد العمليات', 'تقليل الأخطاء 90%']
    },
    {
      id: '4',
      name: 'نورا أحمد الغامدي',
      position: 'مديرة التطوير',
      company: 'شركة الابتكار التقني',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4,
      comment: 'فريق متميز ومبدع. التطبيق الذي طوروه لنا حقق نجاحاً كبيراً في السوق. التصميم جذاب والأداء ممتاز. نتطلع للتعاون معهم في مشاريع قادمة.',
      project: 'تطبيق جوال متقدم',
      date: '2024-02-05',
      results: ['تحميل +50K', 'تقييم 4.8 نجوم', 'نمو المستخدمين 300%']
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

  const handleTestimonialChange = (testimonial: Testimonial) => {
    if (testimonial.id !== activeTestimonial.id) {
      // GSAP animation for smooth transition
      gsap.to('.testimonial-content', {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setActiveTestimonial(testimonial);
          gsap.to('.testimonial-content', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            آراء عملائنا
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            اكتشف تجارب عملائنا الناجحة والنتائج المذهلة التي حققناها معاً
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="testimonial-content bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
              
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {renderStars(activeTestimonial.rating)}
                <span className="text-gray-400 mr-2">({activeTestimonial.rating}/5)</span>
              </div>

              {/* Comment */}
              <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 relative z-10">
                "{activeTestimonial.comment}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                />
                <div>
                  <h4 className="text-xl font-bold text-white">{activeTestimonial.name}</h4>
                  <p className="text-cyan-400">{activeTestimonial.position}</p>
                  <p className="text-gray-400 text-sm">{activeTestimonial.company}</p>
                </div>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400 text-sm">المشروع</span>
                  </div>
                  <p className="text-white font-medium">{activeTestimonial.project}</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400 text-sm">تاريخ التسليم</span>
                  </div>
                  <p className="text-white font-medium">
                    {new Date(activeTestimonial.date).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="mt-6">
                <h5 className="text-white font-semibold mb-3">النتائج المحققة:</h5>
                <div className="flex flex-wrap gap-2">
                  {activeTestimonial.results.map((result, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-[42px]"
          >
            {testimonials.map((testimonial) => (
              <motion.button
                key={testimonial.id}
                onClick={() => handleTestimonialChange(testimonial)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeTestimonial.id === testimonial.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50'
                    : 'bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.company}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">4.9/5</div>
              <div className="text-gray-400">متوسط التقييم</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-gray-400">رضا العملاء</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
              <div className="text-gray-400">مشروع ناجح</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400">دعم فني</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;