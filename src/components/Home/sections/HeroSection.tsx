import {
  Gift,
  Calculator,
  CheckCircle,
  Star,
  Rocket,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden bg-[#0A0E27] pt-20"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute w-[400px] h-[400px] bg-[#00D9FF] rounded-full blur-[120px] opacity-30 top-[10%] animate-float ${
            isRTL ? "-left-[10%]" : "-right-[10%]"
          }`}
        ></div>
        <div
          className={`absolute w-[500px] h-[500px] bg-[#6C5CE7] rounded-full blur-[120px] opacity-30 top-[50%] animate-float-delayed ${
            isRTL ? "-right-[15%]" : "-left-[15%]"
          }`}
        ></div>
        <div className="absolute w-[350px] h-[350px] bg-[#00FFA3] rounded-full blur-[120px] opacity-30 bottom-[10%] left-[30%] animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className={`space-y-5 ${isRTL ? "text-right" : "text-left"}`}>
            {/* Badge */}
            <div className="inline-flex max-md:mt-5 items-center gap-2 px-4 py-2 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full mb-6 animate-pulse-glow">
              <span className="text-xl">🚀</span>
              <span className="text-[#00D9FF] font-semibold text-sm">
                {t("hero.badge")}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-[17px] md:text-5xl lg:text-3xl font-extrabold text-white leading-tight mb-6">
              {t("hero.title.part1")}{" "}
              <span className="bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                {t("hero.title.highlight")}
              </span>{" "}
              {t("hero.title.part2")}{" "}
              <span className="text-[#00FFA3] text-[17px] md:text-4xl animate-number-pop inline-block">
                {t("hero.title.percentage")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-xl text-[#A0AEC0] leading-relaxed md:!mb-8 !mb-6">
              {t("hero.subtitle.main")}
              <br />
              <span className="text-[#00D9FF] font-semibold">
                {t("hero.subtitle.services")}
              </span>
            </p>

            {/* Features List */}
            <ul className="space-y-3 !mb-8">
              <li
                className={`flex items-center gap-3 text-[#A0AEC0] ${
                  isRTL ? "flex-row" : "flex-row"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm md:text-base">
                  {t("hero.features.delivery")}
                </span>
              </li>
              <li
                className={`flex items-center gap-3 text-[#A0AEC0] ${
                  isRTL ? "flex-row" : "flex-row"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm md:text-base">
                  {t("hero.features.quality")}
                </span>
              </li>
              <li
                className={`flex items-center gap-3 text-[#A0AEC0] ${
                  isRTL ? "flex-row" : "flex-row"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm md:text-base">
                  {t("hero.features.support")}
                </span>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 !mb-8 ${
                isRTL ? "" : "sm:flex-row-reverse"
              }`}
            >
              <button
                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white px-8 py-4 rounded-xl text-sm md:text-base 2xl:text-lg font-semibold hover:shadow-[0_0_40px_rgba(0,217,255,0.8)] transition-all hover:-translate-y-1 ${
                  isRTL ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <Gift className="w-5 h-5" />
                <span>{t("hero.cta.consultation")}</span>
              </button>
              <button
                className={`flex items-center justify-center gap-2 bg-transparent border-2 border-[#00D9FF] text-[#00D9FF] px-8 py-4 rounded-xl text-sm md:text-base 2xl:text-lg font-semibold hover:bg-[#00D9FF]/10 transition-all hover:-translate-y-1 ${
                  isRTL ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <Calculator className="w-5 h-5" />
                <span>{t("hero.cta.calculator")}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center md:gap-2 gap-1.5 text-[#A0AEC0] md:text-sm text-xs">
                <CheckCircle className="md:w-5 md:h-5 h-3.5 w-3.5 text-[#00FFA3]" />
                <span>{t("hero.trust.projects")}</span>
              </div>
              <div className="flex items-center md:gap-2 gap-1.5 text-[#A0AEC0] md:text-sm text-xs">
                <Star className="md:w-5 md:h-5 h-3.5 w-3.5 text-[#00FFA3]" />
                <span>{t("hero.trust.rating")}</span>
              </div>
              <div className="flex items-center md:gap-2 gap-1.5 text-[#A0AEC0] md:text-sm text-xs">
                <Shield className="md:w-5 md:h-5 h-3.5 w-3.5 text-[#00FFA3]" />
                <span>{t("hero.trust.support")}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative animate-float-mockup">
              {/* Website Mockup */}
              <div className="bg-[#1A1F3A] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[#00D9FF]/20">
                {/* Browser Header */}
                <div className="bg-black/30 p-4 flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]"></span>
                  </div>
                  <div className="flex-1 bg-white/5 px-4 py-2 rounded-md text-center text-[#A0AEC0] text-sm">
                    www.websitemy.com
                  </div>
                </div>

                {/* Browser Content */}
                <div className="p-8 md:p-12 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    {/* Growth Chart */}
                    <div className="flex items-end justify-center gap-3 h-48 mb-8">
                      <div
                        className="w-10 bg-gradient-to-t from-[#00D9FF] to-[#6C5CE7] rounded-t-lg animate-grow-bar"
                        style={{ height: "40%" }}
                      ></div>
                      <div
                        className="w-10 bg-gradient-to-t from-[#00D9FF] to-[#6C5CE7] rounded-t-lg animate-grow-bar animation-delay-200"
                        style={{ height: "55%" }}
                      ></div>
                      <div
                        className="w-10 bg-gradient-to-t from-[#00D9FF] to-[#6C5CE7] rounded-t-lg animate-grow-bar animation-delay-400"
                        style={{ height: "70%" }}
                      ></div>
                      <div
                        className="w-10 bg-gradient-to-t from-[#00D9FF] to-[#6C5CE7] rounded-t-lg animate-grow-bar animation-delay-600"
                        style={{ height: "85%" }}
                      ></div>
                      <div
                        className="w-10 bg-gradient-to-t from-[#00D9FF] to-[#6C5CE7] rounded-t-lg animate-grow-bar animation-delay-800 shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                        style={{ height: "100%" }}
                      ></div>
                    </div>

                    {/* Percentage */}
                    <div>
                      <div className="text-5xl md:text-6xl font-black text-[#00FFA3] mb-2 animate-count-up">
                        +40%
                      </div>
                      <div className="text-[#A0AEC0]">زيادة الأرباح</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border border-[#00D9FF]/30 rounded-xl flex items-center justify-center animate-float-element">
                <Rocket className="w-8 h-8 text-[#00D9FF]" />
              </div>
              <div className="absolute bottom-20 -right-8 w-16 h-16 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border border-[#00D9FF]/30 rounded-xl flex items-center justify-center animate-float-element animation-delay-1000">
                <TrendingUp className="w-8 h-8 text-[#00D9FF]" />
              </div>
              <div className="absolute top-1/2 -left-8 w-16 h-16 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border border-[#00D9FF]/30 rounded-xl flex items-center justify-center animate-float-element animation-delay-2000">
                <Shield className="w-8 h-8 text-[#00D9FF]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#00D9FF] rounded-full relative">
          <div className="w-1 h-2 bg-[#00D9FF] rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-scroll"></div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="w-0.5 h-3 bg-[#00D9FF]"></span>
          <span className="w-0.5 h-3 bg-[#00D9FF] opacity-60"></span>
          <span className="w-0.5 h-3 bg-[#00D9FF] opacity-30"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
