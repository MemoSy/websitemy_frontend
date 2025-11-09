import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MessageSquare, Phone } from "lucide-react";

const FAQSection = () => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-[#0F1729] overflow-hidden" id="faq">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center md:mb-16 mb-8">
          <span className="inline-block px-4 py-2 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full text-[#00D9FF] text-sm font-semibold mb-4">
            الأسئلة الشائعة
          </span>
          <h2 className="text-xl md:text-5xl font-black text-white mb-6">
            كل ما تحتاج <span className="bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">معرفته</span>
          </h2>
          <p className="text-[#A0AEC0] text-xs md:text-lg max-w-2xl mx-auto">
            إجابات واضحة على أكثر الأسئلة تكراراً
          </p>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* السؤال 1 - التكلفة */}
          <div className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
            activeFaqIndex === 0 ? 'border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]' : 'border-[#00D9FF]/10'
          }`}>
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 0 ? null : 0)}
              className="w-full p-6 flex items-center justify-between text-right hover:bg-[#00D9FF]/5 transition-colors"
            >
              <span className="text-lg font-bold text-white flex-1">كم تبلغ تكلفة بناء موقع ويب؟</span>
              <ChevronDown className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                activeFaqIndex === 0 ? 'rotate-180' : ''
              }`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 0 ? 'max-h-[2000px]' : 'max-h-0'
            }`}>
              <div className="px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6">
                <p>تعتمد التكلفة على نوع المشروع ومتطلباته:</p>
                <ul className="space-y-2 pr-6">
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">موقع تعريفي بسيط (5-8 صفحات):</strong> يبدأ من $350
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">موقع شركة متوسط (10-15 صفحة):</strong> يبدأ من $500
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">متجر إلكتروني صغير (حتى 100 منتج):</strong> يبدأ من $700
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">متجر إلكتروني كبير (أكثر من 100 منتج):</strong> يبدأ من $1,500
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">تطبيق ويب مخصص:</strong> يبدأ من $1,200
                  </li>
                </ul>
                <p>نقدم عرض سعر مفصل ومجاني بعد فهم احتياجاتك بدقة.</p>
              </div>
            </div>
          </div>

          {/* السؤال 2 - المدة الزمنية */}
          <div className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
            activeFaqIndex === 1 ? 'border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]' : 'border-[#00D9FF]/10'
          }`}>
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 1 ? null : 1)}
              className="w-full p-6 flex items-center justify-between text-right hover:bg-[#00D9FF]/5 transition-colors"
            >
              <span className="text-lg font-bold text-white flex-1">كم المدة اللازمة لإنشاء الموقع؟</span>
              <ChevronDown className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                activeFaqIndex === 1 ? 'rotate-180' : ''
              }`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 1 ? 'max-h-[2000px]' : 'max-h-0'
            }`}>
              <div className="px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6">
                <p>المدة تعتمد على حجم المشروع وتعقيده:</p>
                <ul className="space-y-2 pr-6">
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">موقع تعريفي بسيط:</strong> 2-3 أسابيع
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">موقع شركة متوسط:</strong> 3-4 أسابيع
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">متجر إلكتروني:</strong> 4-6 أسابيع
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">تطبيق ويب مخصص:</strong> 6-10 أسابيع
                  </li>
                </ul>
                <p>نلتزم بالجدول الزمني المتفق عليه، وإذا تأخرنا نقدم تعويضاً.</p>
              </div>
            </div>
          </div>


          {/* السؤال 4 - تعديل المحتوى */}
          <div className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
            activeFaqIndex === 3 ? 'border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]' : 'border-[#00D9FF]/10'
          }`}>
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 3 ? null : 3)}
              className="w-full p-6 flex items-center justify-between text-right hover:bg-[#00D9FF]/5 transition-colors"
            >
              <span className="text-lg font-bold text-white flex-1">هل يمكنني تعديل محتوى الموقع بنفسي؟</span>
              <ChevronDown className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                activeFaqIndex === 3 ? 'rotate-180' : ''
              }`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 3 ? 'max-h-[2000px]' : 'max-h-0'
            }`}>
              <div className="px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6">
                <p><strong className="text-[#00D9FF]">نعم بالتأكيد!</strong> نبني موقعك بلوحة تحكم سهلة جداً:</p>
                <ul className="space-y-2 pr-6">
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    تعديل النصوص والصور بكل سهولة
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    إضافة وحذف الصفحات
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    إدارة المنتجات (للمتاجر)
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    تحديث المدونة
                  </li>
                </ul>
                <p><strong className="text-white">ندربك مجاناً:</strong></p>
                <ul className="space-y-2 pr-6">
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    جلسة تدريب شخصية (ساعتين)
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    دليل استخدام مصوّر بالفيديو
                  </li>
                
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    دعم فني مستمر لأي استفسار
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* السؤال 5 - الدعم الفني */}
          <div className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
            activeFaqIndex === 4 ? 'border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]' : 'border-[#00D9FF]/10'
          }`}>
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 4 ? null : 4)}
              className="w-full p-6 flex items-center justify-between text-right hover:bg-[#00D9FF]/5 transition-colors"
            >
              <span className="text-lg font-bold text-white flex-1">ماذا يشمل الدعم الفني؟</span>
              <ChevronDown className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                activeFaqIndex === 4 ? 'rotate-180' : ''
              }`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 4 ? 'max-h-[2000px]' : 'max-h-0'
            }`}>
              <div className="px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6">
                <p><strong className="text-[#00D9FF] ">الدعم الفني يشمل:</strong></p>
                <ul className="space-y-2 pr-6">
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white"> شهر دعم مجاني:</strong> إصلاح أي خلل تقني فوراً
                  </li>
     
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">مراقبة الأداء:</strong> نتابع سرعة وأداء الموقع
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    <strong className="text-white">رد سريع:</strong> نرد خلال باسرع وقت  
                  </li>
                </ul>
                <p><strong className="text-white">قنوات الدعم:</strong></p>
                <ul className="space-y-2 pr-6">
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    واتساب (الأسرع)
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    هاتف مباشر
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-right-4 before:text-[#00D9FF] before:text-2xl before:font-bold">
                    البريد الإلكتروني
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-br from-[#00D9FF]/10 to-[#6C5CE7]/10 border border-[#00D9FF]/30 rounded-2xl max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-[#A0AEC0] mb-6">تواصل معنا مباشرة وسنجيب على جميع استفساراتك خلال دقائق</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_40px_rgba(0,217,255,0.8)] transition-all hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              <span>تواصل عبر واتساب</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] px-6 py-3 rounded-xl font-bold hover:bg-[#00D9FF]/10 transition-all hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" />
              <span>اتصل بنا الآن</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
