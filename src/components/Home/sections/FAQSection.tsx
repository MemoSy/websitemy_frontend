import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MessageSquare, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <section
      className="relative py-20 md:py-24 bg-[#0F1729] overflow-hidden"
      id="faq"
    >
      <div className="container mx-auto px-4 xl:px-0 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full text-[#00D9FF] text-sm font-semibold mb-4">
            {t("faq.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            {t("faq.title.part1")}{" "}
            <span className="bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
              {t("faq.title.highlight")}
            </span>
          </h2>
          <p className="text-[#A0AEC0] text-base sm:text-lg max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Container */}
        <div className="max-w-4xl mx-auto space-y-4">
          {/* السؤال 1 - التكلفة */}
          <div
            className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 0
                ? "border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]"
                : "border-[#00D9FF]/10"
            }`}
          >
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 0 ? null : 0)}
              className={`w-full p-6 flex items-center justify-between ${
                isRTL ? "text-right" : "text-left"
              } hover:bg-[#00D9FF]/5 transition-colors`}
            >
              <span className="text-lg font-bold text-white flex-1">
                {t("faq.questions.q1.question")}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                  activeFaqIndex === 0 ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeFaqIndex === 0 ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div
                className={`px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <p>{t("faq.questions.q1.intro")}</p>
                <ul className={`space-y-2 ${isRTL ? "pr-6" : "pl-6"}`}>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q1.pricing.simple")}
                    </strong>{" "}
                    {t("faq.questions.q1.pricing.simplePrice")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q1.pricing.medium")}
                    </strong>{" "}
                    {t("faq.questions.q1.pricing.mediumPrice")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q1.pricing.smallStore")}
                    </strong>{" "}
                    {t("faq.questions.q1.pricing.smallStorePrice")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q1.pricing.largeStore")}
                    </strong>{" "}
                    {t("faq.questions.q1.pricing.largeStorePrice")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q1.pricing.webapp")}
                    </strong>{" "}
                    {t("faq.questions.q1.pricing.webappPrice")}
                  </li>
                </ul>
                <p>{t("faq.questions.q1.conclusion")}</p>
              </div>
            </div>
          </div>

          {/* السؤال 2 - المدة الزمنية */}
          <div
            className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 1
                ? "border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]"
                : "border-[#00D9FF]/10"
            }`}
          >
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 1 ? null : 1)}
              className={`w-full p-6 flex items-center justify-between ${
                isRTL ? "text-right" : "text-left"
              } hover:bg-[#00D9FF]/5 transition-colors`}
            >
              <span className="text-lg font-bold text-white flex-1">
                {t("faq.questions.q2.question")}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                  activeFaqIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeFaqIndex === 1 ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div
                className={`px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <p>{t("faq.questions.q2.intro")}</p>
                <ul className={`space-y-2 ${isRTL ? "pr-6" : "pl-6"}`}>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q2.timeline.simple")}
                    </strong>{" "}
                    {t("faq.questions.q2.timeline.simpleTime")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q2.timeline.medium")}
                    </strong>{" "}
                    {t("faq.questions.q2.timeline.mediumTime")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q2.timeline.store")}
                    </strong>{" "}
                    {t("faq.questions.q2.timeline.storeTime")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q2.timeline.webapp")}
                    </strong>{" "}
                    {t("faq.questions.q2.timeline.webappTime")}
                  </li>
                </ul>
                <p>{t("faq.questions.q2.conclusion")}</p>
              </div>
            </div>
          </div>

          {/* السؤال 4 - تعديل المحتوى */}
          <div
            className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 3
                ? "border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]"
                : "border-[#00D9FF]/10"
            }`}
          >
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 3 ? null : 3)}
              className={`w-full p-6 flex items-center justify-between ${
                isRTL ? "text-right" : "text-left"
              } hover:bg-[#00D9FF]/5 transition-colors`}
            >
              <span className="text-lg font-bold text-white flex-1">
                {t("faq.questions.q4.question")}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                  activeFaqIndex === 3 ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeFaqIndex === 3 ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div
                className={`px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <p>
                  <strong className="text-[#00D9FF]">
                    {t("faq.questions.q4.intro")}
                  </strong>{" "}
                  {t("faq.questions.q4.introText")}
                </p>
                <ul className={`space-y-2 ${isRTL ? "pr-6" : "pl-6"}`}>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q4.features.f1")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q4.features.f2")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q4.features.f3")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q4.features.f4")}
                  </li>
                </ul>
                <p>
                  <strong className="text-white">
                    {t("faq.questions.q4.trainingTitle")}
                  </strong>
                </p>
                <ul className={`space-y-2 ${isRTL ? "pr-6" : "pl-6"}`}>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q4.training.t1")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q4.training.t2")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q4.training.t3")}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* السؤال 5 - الدعم الفني */}
          <div
            className={`bg-[#1A1F3A]/50 border rounded-xl overflow-hidden transition-all duration-300 ${
              activeFaqIndex === 4
                ? "border-[#00D9FF] shadow-[0_5px_20px_rgba(0,217,255,0.15)]"
                : "border-[#00D9FF]/10"
            }`}
          >
            <button
              onClick={() => setActiveFaqIndex(activeFaqIndex === 4 ? null : 4)}
              className={`w-full p-6 flex items-center justify-between ${
                isRTL ? "text-right" : "text-left"
              } hover:bg-[#00D9FF]/5 transition-colors`}
            >
              <span className="text-lg font-bold text-white flex-1">
                {t("faq.questions.q5.question")}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-[#00D9FF] transition-transform duration-300 ${
                  activeFaqIndex === 4 ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeFaqIndex === 4 ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div
                className={`px-6 pb-6 text-[#A0AEC0] space-y-4 mt-6 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <p>
                  <strong className="text-[#00D9FF]">
                    {t("faq.questions.q5.intro")}
                  </strong>
                </p>
                <ul className={`space-y-2 ${isRTL ? "pr-6" : "pl-6"}`}>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q5.support.s1Title")}
                    </strong>{" "}
                    {t("faq.questions.q5.support.s1Text")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q5.support.s2Title")}
                    </strong>{" "}
                    {t("faq.questions.q5.support.s2Text")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    <strong className="text-white">
                      {t("faq.questions.q5.support.s3Title")}
                    </strong>{" "}
                    {t("faq.questions.q5.support.s3Text")}
                  </li>
                </ul>
                <p>
                  <strong className="text-white">
                    {t("faq.questions.q5.channelsTitle")}
                  </strong>
                </p>
                <ul className={`space-y-2 ${isRTL ? "pr-6" : "pl-6"}`}>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q5.channels.c1")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q5.channels.c2")}
                  </li>
                  <li
                    className={`relative ${
                      isRTL
                        ? "before:content-['•'] before:absolute before:-right-4"
                        : "before:content-['•'] before:absolute before:-left-4"
                    } before:text-[#00D9FF] before:text-2xl before:font-bold`}
                  >
                    {t("faq.questions.q5.channels.c3")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ CTA */}
        <div
          className={`mt-16 text-center p-8 bg-gradient-to-br from-[#00D9FF]/10 to-[#6C5CE7]/10 border border-[#00D9FF]/30 rounded-2xl max-w-3xl mx-auto ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            {t("faq.cta.title")}
          </h3>
          <p className="text-[#A0AEC0] mb-6 text-center">
            {t("faq.cta.subtitle")}
          </p>
          <div
            className={`flex flex-wrap gap-4 justify-center ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_40px_rgba(0,217,255,0.8)] transition-all hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t("faq.cta.whatsapp")}</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] px-6 py-3 rounded-xl font-bold hover:bg-[#00D9FF]/10 transition-all hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" />
              <span>{t("faq.cta.call")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
