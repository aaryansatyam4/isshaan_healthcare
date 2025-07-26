"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const { t } = useLanguage();
  const [state, handleSubmit] = useForm("mvgreoyv");

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  if (state.succeeded) {
    return (
        <div className="pt-28">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white inline-block p-8 rounded-2xl shadow-lg"
                    >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("thankYouMessage")}</h1>
                        <p className="text-gray-600">We'll be in touch with you shortly.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
  }

  return (
    <div className="pt-28">
      {/* ───────── Hero ───────── */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-25 animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              {t("contact")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {t("us")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("contactSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────── Contact Form & Info ───────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t("contactForm")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {t("name")} *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder={t("namePlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                   <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-600 text-sm mt-1" />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {t("email")} *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-600 text-sm mt-1" />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {t("phone")}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                   <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-600 text-sm mt-1" />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {t("message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder={t("messagePlaceholder")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-600 text-sm mt-1" />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>{t("submit")}</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t("getInTouch")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t("getInTouchText")}
                </p>
              </div>

         

              {/* Phone */}
              <motion.div variants={fadeInUp} className="info-card flex items-start space-x-6">
                <IconWrapper>
                  <Phone className="w-6 h-6 text-white" />
                </IconWrapper>
                <CardContent
                  heading={t("phone")}
                  text={t("phoneNumbers")}
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp} className="info-card flex items-start space-x-6">
                <IconWrapper>
                  <Mail className="w-6 h-6 text-white" />
                </IconWrapper>
                <CardContent
                  heading={t("email")}
                  text={t("emailAddresses")}
                />
              </motion.div>

              {/* Hours */}
              <motion.div variants={fadeInUp} className="info-card flex items-start space-x-6">
                <IconWrapper>
                  <Clock className="w-6 h-6 text-white" />
                </IconWrapper>
                <CardContent
                  heading={t("businessHours")}
                  text={t("businessHoursText")}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── Map ───────── */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("find")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {t("us")}
              </span>
            </h2>
            <p className="text-xl text-gray-600">{t("mapSubtitle")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.3979441381575!2d77.387270275802!3d28.617833075672884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefed58b57115%3A0x3f4a8bf5a94daaaa!2sIsshaan!5e0!3m2!1sen!2sin!4v1750330473540!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}

/* ---------- small helpers ---------- */
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
    {children}
  </div>
);

const CardContent: React.FC<{ heading: string; text: string }> = ({
  heading,
  text,
}) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{heading}</h3>
    <p className="text-gray-600 whitespace-pre-line">{text}</p>
  </div>
);
