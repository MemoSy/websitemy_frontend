import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Globe, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert(t("contact.form.success"));
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.info.email.title"),
      info: t("contact.info.email.value"),
      link: "mailto:ahmeddalhalabi1@gmail.com",
    },
    {
      icon: Phone,
      title: t("contact.info.phone.title"),
      info: t("contact.info.phone.value"),
      link: "tel:+905313345111",
    },
    {
      icon: MapPin,
      title: t("contact.info.address.title"),
      info: t("contact.info.address.value"),
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: t("contact.info.hours.title"),
      info: t("contact.info.hours.value"),
      link: null,
    },
    {
      icon: Globe,
      title: t("contact.info.website.title"),
      info: t("contact.info.website.value"),
      link: "https://www.websitemy.com",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold text-white mb-6 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("contact.title")}
          </h1>
          <p
            className={`text-xl text-gray-400 max-w-2xl mx-auto ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2
                className={`text-2xl font-bold text-white mb-6 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("contact.form.title")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`block text-sm font-medium text-gray-300 mb-2 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {t("contact.form.name")} {t("contact.form.required")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium text-gray-300 mb-2 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      {t("contact.form.email")} {t("contact.form.required")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-gray-300 mb-2 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("contact.form.subject")} {t("contact.form.required")}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    placeholder={t("contact.form.subjectPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-gray-300 mb-2 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("contact.form.message")} {t("contact.form.required")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-white resize-none ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg flex items-center justify-center ${
                    isRTL ? "space-x-reverse" : ""
                  } space-x-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{t("contact.form.submitting")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t("contact.form.submit")}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
              <h2
                className={`text-2xl font-bold text-white mb-14 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("contact.info.title")}
              </h2>

              <div className="space-y-[50px]">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className={`flex items-start gap-4 group ${
                        isRTL ? "flex-row" : "flex-row"
                      }`}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={isRTL ? "text-right" : "text-left"}>
                        <h3 className="font-semibold text-white mb-1">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors"
                          >
                            {item.info}
                          </a>
                        ) : (
                          <p className="text-gray-400">{item.info}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {t("contact.faq.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="font-semibold text-white mb-2">
                  {t("contact.faq.q1.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.q1.answer")}</p>
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="font-semibold text-white mb-2">
                  {t("contact.faq.q2.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.q2.answer")}</p>
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="font-semibold text-white mb-2">
                  {t("contact.faq.q3.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.q3.answer")}</p>
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="font-semibold text-white mb-2">
                  {t("contact.faq.q4.question")}
                </h3>
                <p className="text-gray-400">{t("contact.faq.q4.answer")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
