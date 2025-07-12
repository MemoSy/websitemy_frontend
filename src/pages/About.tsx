import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'الرؤية',
      description: 'نؤمن بأن كل سوري يستحق حضوراً قوياً على الإنترنت. هدفنا تمكين أصحاب المشاريع والمنتجات من الوصول لعملائهم في أي وقت ومن أي مكان، لأن النجاح لا يعرف الحدود أو التوقيت.'
    },
    {
      icon: Lightbulb,
      title: 'الابتكار',
      description: 'نستخدم أحدث التقنيات العالمية لنقدم لك موقعاً يتفوق على منافسيك. من التصميم المتجاوب إلى الأمان المتقدم، كل تفصيل مدروس ليضمن لك تجربة استثنائية تجذب العملاء وتحقق المبيعات. '
    },
    {
      icon: Users,
      title: 'الفريق',
      description: 'فريقنا مكون من مطورين ومصممين محترفين يفهمون السوق السوري ويعرفون احتياجاتك. نحن لسنا مجرد مزودي خدمة، بل شركاء في نجاحك نقف معك في كل خطوة حتى تحقق أهدافك.'
    },
    {
      icon: Award,
      title: 'الجودة',
      description: 'نلتزم بأعلى معايير الجودة العالمية في كل مشروع. من سرعة التحميل إلى الأمان والحماية، ومن التصميم الجذاب إلى سهولة الاستخدام، نضمن لك موقعاً يضاهي المواقع العالمية بأسعار تناسب السوق المحلي.'
    }
  ];

  const team = [
    {
      name: 'أحمد المبيض',
      role: 'المدير',
      image: 'https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/509606060_24538410302429521_5576451676817606581_n.jpg?stp=c120.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=103&ccb=1-7&_nc_sid=6439a4&_nc_ohc=yMZriAYL8XsQ7kNvwH9z_d5&_nc_oc=AdkydfkbbTOeKgF6lpog2K_aLn_GwAQTjDP8BlHl-TkX6S5TbYoKLSqeqeMkU572AJk&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=Q_o8bDEE51slXmAODNgvtQ&oh=00_AfSWnA6_0DSJJmrWA7Gt6A4jlQ8CrH__16l5s06VS47M_A&oe=6875C774',
      skills: ['مدير عام',]
    },
    {
      name: 'محمود المبيض ',
      role: 'مطور ويب - Full Stack',
      image: 'https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/514078228_619980001115631_3819133287882385004_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ItiEqdijrA8Q7kNvwFmgEKZ&_nc_oc=AdkpglUO8oLYDQmxuh5kStkpIAH150xRaQzSa45mR79S0LXXdIIQ5p53VmQ5UfyonOc&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=Y-p2GAs5-kVfc5H1J-w6sw&oh=00_AfRdatTyv1NNkfXZSfhdDVUlfoC6VzniXEzXHAZEOHUcSA&oe=6873100D',
      skills: ['React', 'Node.js', 'MongoDB', 'next.js']
    },
    {
      name: ' حسن الأبرش',
      role: 'مصمم UI/UX',
      image: 'https://scontent.fist14-1.fna.fbcdn.net/v/t39.30808-6/515014282_4123566981298767_3372271132740174068_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0DiVU73UhhsQ7kNvwHcSDL1&_nc_oc=AdnEAu6FALvzoahddmvQ79pWf8yDaIFzMyN9VNvPU-IZlaW3BZqS8wmV18GeY2LnZYE&_nc_zt=23&_nc_ht=scontent.fist14-1.fna&_nc_gid=D5c7alJRN6zUJHrtIp0f-w&oh=00_AfSjdpEY0FNfGbTxP73KdW9Kh6DEU1fIVsmXcnjcADyQ8Q&oe=687315EE',
      skills: ['Figma', 'Adobe XD', 'User Research']
    },
    {
      name: 'سارة حلاق',
      role: 'مطورة واجهة أمامية ',
      image: 'https://i.ibb.co/Jjs56RvK/sara-logo-2-pdf-2.png',
      skills: ['React','javascrept']
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <SEO 
        title="من نحن - فريق WebSiteMy للتطوير"
        description="تعرف على فريق WebSiteMy المتخصص في تطوير المواقع الإلكترونية. نحن فريق من المطورين المحترفين نسعى لتحويل أفكارك إلى واقع رقمي متميز باستخدام أحدث التقنيات."
        keywords="فريق تطوير, مطورين محترفين, شركة تطوير مواقع, خبرة في التطوير, فريق عمل متخصص"
        url="/about"
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            من نحن
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            نحن شركة تطوير ويب متخصصة في إنشاء حلول رقمية مبتكرة تساعد الشركات والأفراد على تحقيق أهدافهم التقنية. مع خبرة تزيد عن 3 سنوات في السوق، نفخر بتقديم خدمات عالية الجودة تلبي احتياجات عملائنا المتنوعة.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">مهمتنا</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              "نسعى لتحويل الأفكار إلى واقع رقمي متميز من خلال تطوير حلول تقنية مبتكرة تتسم بالجودة والأداء العالي. نؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان وتساهم في تحسين حياته اليومية."
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">قيمنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">فريق العمل</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={`صورة ${member.name} - ${member.role} في فريق WebSiteMy`}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-700 group-hover:border-cyan-500/50 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-cyan-400 mb-4">{member.role}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-600 rounded-full text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 md:p-12 border border-cyan-500/30">
            <h2 className="text-3xl font-bold text-white mb-6">هل لديك مشروع؟</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              نحن هنا لمساعدتك في تحويل فكرتك إلى واقع رقمي متميز. دعنا نتحدث عن مشروعك القادم!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all font-medium text-lg"
            >
              تواصل معنا الآن
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;