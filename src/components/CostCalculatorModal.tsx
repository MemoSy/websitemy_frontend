import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Globe,
  ShoppingCart,
  Code,
  Palette,
  Heart,
  User,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Send,
  Languages,
  CreditCard,
  Layout,
  Smartphone,
  Percent,
} from "lucide-react";
import { soundEffects } from "../utils/soundEffects";

interface CostCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string; // الخدمة المختارة مسبقاً من بطاقات الخدمات
}

// أنواع المشاريع مع الأسعار (مطابقة للخدمات في ServicesSection)
const projectTypes = [
  {
    id: "personal",
    icon: Globe,
    price: 300,
    titleAr: "تطوير المواقع الشخصية",
    titleEn: "Personal Website Development",
    descAr: "مواقع سريعة وآمنة تعكس هويتك المهنية",
    descEn: "Fast & secure sites reflecting your identity",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    price: 500,
    titleAr: "بناء المتاجر الإلكترونية",
    titleEn: "E-commerce Store",
    descAr: "متاجر متكاملة تزيد مبيعاتك",
    descEn: "Complete stores to boost your sales",
    featured: true,
  },
  {
    id: "startup",
    icon: Code,
    price: 1000,
    titleAr: "تطبيقات Startup",
    titleEn: "Startup Applications",
    descAr: "نحول فكرتك إلى تطبيق احترافي",
    descEn: "Turn your idea into a professional app",
  },
  {
    id: "branding",
    icon: Palette,
    price: 250,
    titleAr: "تجديد الهوية البصرية",
    titleEn: "Visual Identity Renewal",
    descAr: "تصميم عصري يعكس تطور علامتك",
    descEn: "Modern design reflecting your brand",
  },
  {
    id: "community",
    icon: Heart,
    price: 0,
    titleAr: "مبادرة العطاء المجتمعي",
    titleEn: "Community Giving Initiative",
    descAr: "خدمات مجانية للمؤسسات الخيرية",
    descEn: "Free services for charitable organizations",
    free: true,
  },
];

// الميزات الإضافية
const additionalFeatures = [
  {
    id: "multiLanguage",
    icon: Languages,
    price: 35,
    titleAr: "دعم متعدد اللغات",
    titleEn: "Multi-language Support",
  },
  {
    id: "payment",
    icon: CreditCard,
    price: 50,
    titleAr: "نظام دفع إلكتروني",
    titleEn: "Payment System",
  },
  {
    id: "advancedDashboard",
    icon: Layout,
    price: 50,
    titleAr: "لوحة تحكم متقدمة",
    titleEn: "Advanced Dashboard",
  },
  {
    id: "mobileApp",
    icon: Smartphone,
    price: 25,
    titleAr: "تطبيق موبايل",
    titleEn: "Mobile App",
  },
];

const CostCalculatorModal = ({ isOpen, onClose, preSelectedService }: CostCalculatorModalProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // الخطوة الحالية
  const [step, setStep] = useState(1);

  // بيانات الخطوة 1
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: preSelectedService || "",
  });

  // بيانات الخطوة 2
  const [designLevel, setDesignLevel] = useState<"normal" | "professional">(
    "normal"
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // تحديث نوع المشروع عند تغيير preSelectedService
  useEffect(() => {
    if (preSelectedService && isOpen) {
      setFormData(prev => ({ ...prev, projectType: preSelectedService }));
      soundEffects.playPop(); // صوت فتح Modal
    }
  }, [preSelectedService, isOpen]);

  // حساب التكلفة
  const calculateCost = () => {
    const project = projectTypes.find((p) => p.id === formData.projectType);
    if (!project) return 0;

    let basePrice = project.price;

    // إضافة 50% للتصميم الاحترافي
    if (designLevel === "professional") {
      basePrice = basePrice * 1.5;
    }

    // إضافة أسعار الميزات
    let featuresPrice = 0;
    selectedFeatures.forEach((featureId) => {
      const feature = additionalFeatures.find((f) => f.id === featureId);
      if (feature) {
        featuresPrice += feature.price;
      }
    });

    let total = basePrice + featuresPrice;

    // خصم 10% إذا اختار كل الميزات
    if (selectedFeatures.length === additionalFeatures.length) {
      total = total * 0.9;
    }

    return Math.round(total);
  };

  // التحقق من صحة الخطوة 1
  const isStep1Valid = () => {
    // إذا كانت هناك خدمة مختارة مسبقاً، نتحقق فقط من الاسم ورقم الموبايل
    const hasProjectType = preSelectedService || formData.projectType !== "";
    return (
      formData.name.trim() !== "" &&
      formData.phone.trim() !== "" &&
      hasProjectType
    );
  };

  // تبديل الميزة
  const toggleFeature = (featureId: string) => {
    soundEffects.playClick(); // صوت نقرة
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId]
    );
  };

  // إرسال إلى واتساب
  const sendToWhatsApp = () => {
    soundEffects.playSend(); // صوت إرسال
    const project = projectTypes.find((p) => p.id === formData.projectType);
    const projectName = isRTL ? project?.titleAr : project?.titleEn;
    const designText =
      designLevel === "professional"
        ? isRTL
          ? "احترافي"
          : "Professional"
        : isRTL
          ? "عادي"
          : "Normal";

    const featuresText = selectedFeatures
      .map((fId) => {
        const feature = additionalFeatures.find((f) => f.id === fId);
        return isRTL ? feature?.titleAr : feature?.titleEn;
      })
      .join(", ");

    const allFeaturesSelected =
      selectedFeatures.length === additionalFeatures.length;
    const discountText = allFeaturesSelected
      ? isRTL
        ? "\n🎁 خصم 10% (اختيار جميع الميزات)"
        : "\n🎁 10% Discount (all features selected)"
      : "";

    const message = isRTL
      ? `🚀 *طلب حساب تكلفة مشروع*

👤 *الاسم:* ${formData.name}
📱 *رقم الموبايل:* ${formData.phone}
${formData.email ? `📧 *البريد الإلكتروني:* ${formData.email}` : ""}

📦 *نوع المشروع:* ${projectName}
🎨 *مستوى التصميم:* ${designText}
${featuresText ? `✨ *الميزات الإضافية:* ${featuresText}` : ""}
${discountText}

💰 *التكلفة التقديرية:* $${calculateCost()}

⚠️ _هذه تكلفة تقديرية وقد تختلف حسب تفاصيل المشروع النهائية_`
      : `🚀 *Project Cost Calculation Request*

👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
${formData.email ? `📧 *Email:* ${formData.email}` : ""}

📦 *Project Type:* ${projectName}
🎨 *Design Level:* ${designText}
${featuresText ? `✨ *Additional Features:* ${featuresText}` : ""}
${discountText}

💰 *Estimated Cost:* $${calculateCost()}

⚠️ _This is an estimated cost and may vary based on final project details_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905313345111?text=${encodedMessage}`, "_blank");
    onClose();
  };

  // إعادة تعيين عند الإغلاق
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({ name: "", phone: "", email: "", projectType: preSelectedService || "" });
      setDesignLevel("normal");
      setSelectedFeatures([]);
    }
  }, [isOpen, preSelectedService]);

  // صوت فتح Modal عند الفتح بدون خدمة مختارة مسبقاً
  useEffect(() => {
    if (isOpen && !preSelectedService) {
      soundEffects.playPop();
    }
  }, [isOpen, preSelectedService]);

  // منع التمرير عند فتح المودال
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-[#0A0E27] border border-[#00D9FF]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(0,217,255,0.2)] ${
          isRTL ? "text-right" : "text-left"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0A0E27]/95 backdrop-blur-sm border-b border-[#00D9FF]/10 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border border-[#00D9FF]/30 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isRTL ? "حساب تكلفة المشروع" : "Project Cost Calculator"}
              </h2>
              <p className="text-[#A0AEC0] text-sm">
                {isRTL ? `الخطوة ${step} من 2` : `Step ${step} of 2`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#A0AEC0]" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="h-2 bg-[#1A1F3A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] transition-all duration-500"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            /* الخطوة 1: معلومات التواصل + نوع المشروع */
            <div className="space-y-6">
              {/* معلومات التواصل */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-[#00D9FF]" />
                  {isRTL ? "معلومات التواصل" : "Contact Information"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* الاسم */}
                  <div className="relative">
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"}`}
                    >
                      <User className="w-5 h-5 text-[#A0AEC0]" />
                    </div>
                    <input
                      type="text"
                      placeholder={isRTL ? "الاسم الكامل *" : "Full Name *"}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full bg-[#1A1F3A] border border-[#00D9FF]/20 rounded-xl py-3 text-white placeholder-[#A0AEC0] focus:border-[#00D9FF] focus:outline-none transition-colors ${
                        isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                      }`}
                    />
                  </div>

                  {/* رقم الموبايل */}
                  <div className="relative">
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"}`}
                    >
                      <Phone className="w-5 h-5 text-[#A0AEC0]" />
                    </div>
                    <input
                      type="tel"
                      placeholder={isRTL ? "رقم الموبايل *" : "Phone Number *"}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full bg-[#1A1F3A] border border-[#00D9FF]/20 rounded-xl py-3 text-white placeholder-[#A0AEC0] focus:border-[#00D9FF] focus:outline-none transition-colors ${
                        isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                      }`}
                    />
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div className="relative">
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-4" : "left-4"}`}
                  >
                    <Mail className="w-5 h-5 text-[#A0AEC0]" />
                  </div>
                  <input
                    type="email"
                    placeholder={
                      isRTL
                        ? "البريد الإلكتروني (اختياري)"
                        : "Email (optional)"
                    }
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full bg-[#1A1F3A] border border-[#00D9FF]/20 rounded-xl py-3 text-white placeholder-[#A0AEC0] focus:border-[#00D9FF] focus:outline-none transition-colors ${
                      isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                    }`}
                  />
                </div>
              </div>

              {/* نوع المشروع - يظهر فقط إذا لم تكن هناك خدمة مختارة مسبقاً */}
              {!preSelectedService ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-[#00D9FF]" />
                    {isRTL ? "نوع المشروع" : "Project Type"}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map((project) => {
                      const Icon = project.icon;
                      const isSelected = formData.projectType === project.id;

                      return (
                        <button
                          key={project.id}
                          onClick={() =>
                            setFormData({ ...formData, projectType: project.id })
                          }
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? "border-[#00D9FF] bg-[#00D9FF]/10"
                              : "border-[#1A1F3A] bg-[#1A1F3A] hover:border-[#00D9FF]/50"
                          } ${project.featured ? "ring-2 ring-[#00D9FF]/30" : ""}`}
                        >
                          {project.featured && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white text-[10px] font-bold rounded-full">
                              {isRTL ? "الأكثر طلباً" : "Popular"}
                            </span>
                          )}
                          {project.free && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#00FFA3] text-[#0A0E27] text-[10px] font-bold rounded-full">
                              {isRTL ? "مجاني" : "Free"}
                            </span>
                          )}
                          <Icon
                            className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-[#00D9FF]" : "text-[#A0AEC0]"}`}
                          />
                          <p
                            className={`font-semibold text-sm ${isSelected ? "text-white" : "text-[#A0AEC0]"}`}
                          >
                            {isRTL ? project.titleAr : project.titleEn}
                          </p>
                          <p className="text-[#00D9FF] font-bold mt-1">
                            {project.price === 0
                              ? isRTL
                                ? "مجاني"
                                : "Free"
                              : `$${project.price}`}
                          </p>
                          {isSelected && (
                            <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-[#00FFA3]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* عرض الخدمة المختارة مسبقاً كبطاقة ثابتة */
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-[#00D9FF]" />
                    {isRTL ? "الخدمة المطلوبة" : "Selected Service"}
                  </h3>
                  {(() => {
                    const selectedProject = projectTypes.find(p => p.id === preSelectedService);
                    if (!selectedProject) return null;
                    const Icon = selectedProject.icon;
                    return (
                      <div className="p-4 rounded-xl border-2 border-[#00D9FF] bg-[#00D9FF]/10 flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#00D9FF]/20 to-[#6C5CE7]/20 border border-[#00D9FF]/30 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-[#00D9FF]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white">
                            {isRTL ? selectedProject.titleAr : selectedProject.titleEn}
                          </p>
                          <p className="text-[#A0AEC0] text-sm">
                            {isRTL ? selectedProject.descAr : selectedProject.descEn}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                            {selectedProject.price === 0 ? (isRTL ? "مجاني" : "Free") : `$${selectedProject.price}`}
                          </p>
                          <p className="text-[#A0AEC0] text-xs">
                            {isRTL ? "يبدأ من" : "Starting from"}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* زر المتابعة */}
              <button
                onClick={() => { soundEffects.playSlide(); setStep(2); }}
                disabled={!isStep1Valid()}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isStep1Valid()
                    ? "bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]"
                    : "bg-[#1A1F3A] text-[#A0AEC0] cursor-not-allowed"
                }`}
              >
                <span>{isRTL ? "التالي" : "Next"}</span>
                <ArrowIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* الخطوة 2: التخصيص والميزات */
            <div className="space-y-6">
              {/* مستوى التصميم */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00D9FF]" />
                  {isRTL ? "مستوى التصميم" : "Design Level"}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDesignLevel("normal")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      designLevel === "normal"
                        ? "border-[#00D9FF] bg-[#00D9FF]/10"
                        : "border-[#1A1F3A] bg-[#1A1F3A] hover:border-[#00D9FF]/50"
                    }`}
                  >
                    <p
                      className={`font-semibold ${designLevel === "normal" ? "text-white" : "text-[#A0AEC0]"}`}
                    >
                      {isRTL ? "تصميم عادي" : "Normal Design"}
                    </p>
                    <p className="text-[#A0AEC0] text-sm mt-1">
                      {isRTL ? "السعر الأساسي" : "Base price"}
                    </p>
                    {designLevel === "normal" && (
                      <CheckCircle className="w-5 h-5 text-[#00FFA3] mx-auto mt-2" />
                    )}
                  </button>

                  <button
                    onClick={() => setDesignLevel("professional")}
                    className={`p-4 rounded-xl border-2 transition-all relative ${
                      designLevel === "professional"
                        ? "border-[#00D9FF] bg-[#00D9FF]/10"
                        : "border-[#1A1F3A] bg-[#1A1F3A] hover:border-[#00D9FF]/50"
                    }`}
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white text-[10px] font-bold rounded-full">
                      +50%
                    </span>
                    <p
                      className={`font-semibold ${designLevel === "professional" ? "text-white" : "text-[#A0AEC0]"}`}
                    >
                      {isRTL ? "تصميم احترافي" : "Professional Design"}
                    </p>
                    <p className="text-[#A0AEC0] text-sm mt-1">
                      {isRTL ? "تصميم مميز ومتقدم" : "Premium design"}
                    </p>
                    {designLevel === "professional" && (
                      <CheckCircle className="w-5 h-5 text-[#00FFA3] mx-auto mt-2" />
                    )}
                  </button>
                </div>
              </div>

              {/* الميزات الإضافية */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Layout className="w-5 h-5 text-[#00D9FF]" />
                    {isRTL ? "ميزات إضافية" : "Additional Features"}
                  </h3>
                  {selectedFeatures.length === additionalFeatures.length && (
                    <span className="flex items-center gap-1 text-[#00FFA3] text-sm font-semibold">
                      <Percent className="w-4 h-4" />
                      {isRTL ? "خصم 10%!" : "10% OFF!"}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {additionalFeatures.map((feature) => {
                    const Icon = feature.icon;
                    const isSelected = selectedFeatures.includes(feature.id);

                    return (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-[#00D9FF] bg-[#00D9FF]/10"
                            : "border-[#1A1F3A] bg-[#1A1F3A] hover:border-[#00D9FF]/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected
                                ? "bg-[#00D9FF]/20"
                                : "bg-white/5"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${isSelected ? "text-[#00D9FF]" : "text-[#A0AEC0]"}`}
                            />
                          </div>
                          <div className={`${isRTL ? "text-right" : "text-left"} flex-1`}>
                            <p
                              className={`font-semibold text-sm ${isSelected ? "text-white" : "text-[#A0AEC0]"}`}
                            >
                              {isRTL ? feature.titleAr : feature.titleEn}
                            </p>
                            <p className="text-[#00D9FF] font-bold text-sm">
                              +${feature.price}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-[#00FFA3]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* تلميح الخصم */}
                {selectedFeatures.length > 0 &&
                  selectedFeatures.length < additionalFeatures.length && (
                    <p className="text-[#A0AEC0] text-sm text-center">
                      💡{" "}
                      {isRTL
                        ? `اختر ${additionalFeatures.length - selectedFeatures.length} ميزات أخرى للحصول على خصم 10%`
                        : `Select ${additionalFeatures.length - selectedFeatures.length} more features for 10% discount`}
                    </p>
                  )}
              </div>

              {/* ملخص التكلفة */}
              <div className="bg-[#1A1F3A] rounded-xl p-6 border border-[#00D9FF]/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#A0AEC0]">
                    {isRTL ? "التكلفة التقديرية" : "Estimated Cost"}
                  </span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] bg-clip-text text-transparent">
                      ${calculateCost()}
                    </span>
                    {selectedFeatures.length === additionalFeatures.length && (
                      <span className="block text-[#00FFA3] text-sm">
                        {isRTL ? "(شامل خصم 10%)" : "(includes 10% off)"}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[#A0AEC0] text-xs">
                  ⚠️{" "}
                  {isRTL
                    ? "هذه تكلفة تقديرية وقد تختلف حسب تفاصيل المشروع النهائية"
                    : "This is an estimated cost and may vary based on final project details"}
                </p>
              </div>

              {/* أزرار التنقل */}
              <div className="flex gap-4">
                <button
                  onClick={() => { soundEffects.playSlide(); setStep(1); }}
                  className="flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 bg-[#1A1F3A] text-[#A0AEC0] hover:bg-[#1A1F3A]/80 transition-all"
                >
                  <BackArrowIcon className="w-5 h-5" />
                  <span>{isRTL ? "رجوع" : "Back"}</span>
                </button>

                <button
                  onClick={sendToWhatsApp}
                  className="flex-[2] py-4 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D9FF] to-[#6C5CE7] text-white hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>
                    {isRTL ? "إرسال عبر واتساب" : "Send via WhatsApp"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostCalculatorModal;
