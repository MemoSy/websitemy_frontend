import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, User, Building, Calendar, Github, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";
import { gsap } from "gsap";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  comment: string;
  project: string;
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
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQGN0NC_RVBs_g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718258849937?e=1757548800&v=beta&t=rxpl4EAzAJFzofiJTW4CXHVxaGhJnAcZNk5nWR91BGc",
      comment:
        "محمود شاب مبدع ومستقبلو واعد بمجال التكنولوجيا. كنت سعيد جداً اني استضفتو بواحدة من حلقات 'مقابلة البرمجة' على قناتي باليوتيوب وابدع بالمقابلة بالرغم من سنه الصغير ونقص الخبرة بالمقابلات البرمجية. كل التوفيق لمحمود في الارتقاء بالمستوى التكنولوجي بالوطن العربي.",
      project: "متجر إلكتروني متكامل",
      facebookUrl: "#",
      twitterUrl: "https://www.instagram.com/tariqelouzeh",
      linkedinUrl: "https://www.linkedin.com/in/tariqelouzeh/",
      githubUrl: "#",
      youtubeUrl: "https://www.youtube.com/@tariqelouzeh",

    },
    {
      id: "2",
      name: "فاطمة علي الزهراني",
      position: "مؤسسة ومديرة تنفيذية",
      company: "أكاديمية المستقبل التعليمية",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      comment:
        "منصة تعليمية رائعة غيرت طريقة تقديم التعليم لدينا. الطلاب أصبحوا أكثر تفاعلاً والمعلمون يجدون سهولة في إدارة المحتوى. نظام التتبع والتحليلات مفيد جداً.",
      project: "منصة تعليمية تفاعلية",
      facebookUrl: "https://www.facebook.com",
      twitterUrl: "https://www.twitter.com",
      linkedinUrl: "https://www.linkedin.com",
      githubUrl: "https://www.github.com",
      youtubeUrl: "https://www.youtube.com",
    },
    {
      id: "3",
      name: " ",
      position: " ",
      company: " ",
      image:
        " data:image/png;base64,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",
      comment:
        " ",
      project: "   ",
      facebookUrl: "https://www.facebook.com",
      twitterUrl: "https://www.twitter.com",
      linkedinUrl: "https://www.linkedin.com",
      githubUrl: "https://www.github.com",
      youtubeUrl: "https://www.youtube.com",
    },
    {
      id: "4",
      name: " ",
      position: " ",
      company: " ",
      image:
        "data:image/png;base64,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",
      comment:
        " ",
      project: " ",
      facebookUrl: "https://www.facebook.com",
      twitterUrl: "https://www.twitter.com",
      linkedinUrl: "https://www.linkedin.com",
      githubUrl: "https://www.github.com",
      youtubeUrl: "https://www.youtube.com",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

  const handleTestimonialChange = (testimonial: Testimonial) => {
    if (testimonial.id !== activeTestimonial.id) {
      // GSAP animation for smooth transition
      gsap.to(".testimonial-content", {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setActiveTestimonial(testimonial);
          gsap.to(".testimonial-content", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-600"
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
            قائمة الشرف
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            مساحة مخصصة لعرض آراء نخبة من أساتذة البرمجة ومطوري الويب
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
            <div className="testimonial-content h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 md:pt-8 border border-gray-700 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>

              {/* Quote Icon */}
              <div className="absolute top-8 left-6 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-gray-700"
                />
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-cyan-400">{activeTestimonial.position}</p>
                  <p className="text-gray-400 text-sm">
                    {activeTestimonial.company}
                  </p>
                </div>
              </div>

              {/* Comment */}
              <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 relative z-10 mt-4" style={{
                lineHeight: "1.6",
              }}>
                "{activeTestimonial.comment}"
              </blockquote>

              {/* Results */}
              <div className="mt-24 space-y-6">
                <h5 className="text-white font-semibold mb-3">
                   منصات التواصل
                </h5>
                <div className="flex flex-wrap gap-9">
                  <a
                    href={activeTestimonial.facebookUrl}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-8 h-8" />
                  </a>
                  <a
                    href={activeTestimonial.linkedinUrl}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin className="w-8 h-8" />
                  </a>
                  <a
                    href={activeTestimonial.twitterUrl}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Twitter className="w-8 h-8" />
                  </a>
                  <a
                    href={activeTestimonial.githubUrl}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a
                    href={activeTestimonial.youtubeUrl}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Youtube className="w-8 h-8" />
                  </a>
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
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50"
                    : "bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30"
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
                  <div className="flex-1 space-y-3">
                    <h4 className="text-white font-medium text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-xs">
                      {testimonial.company}
                    </p>
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
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                24/7
              </div>
              <div className="text-gray-400">دعم فني</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
