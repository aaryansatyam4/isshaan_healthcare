"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const timeline = [
    { year: "2007", event: t("timeline.2007") },
    { year: "2010", event: t("timeline.2010") },
    { year: "2013", event: t("timeline.2013") },
    { year: "2016", event: t("timeline.2016") },
    { year: "2019", event: t("timeline.2019") },
    { year: "2022", event: t("timeline.2022") },
    { year: "2024", event: t("timeline.2024") },
  ];
  
  // Translation keys for certifications
  const certificationKeys = [
    "cert_iso",
    "cert_fda",
    "cert_who",
    "cert_ce",
    "cert_ugmp",
    "cert_fssai",
  ];


  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-25 animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              {t("about")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                ISSHAAN
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("aboutSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("companyOverview")}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <p className="text-lg text-gray-600 leading-relaxed">{t("companyOverviewText1")}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t("companyOverviewText2")}</p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">300+</div>
                  <div className="text-gray-600">{t("products")}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-white rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">20+</div>
                  <div className="text-gray-600">{t("countries")}</div>
                </div>
              </div>
            </motion.div>

            <motion.div className="relative aspect-[4/3]" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <div className="relative h-full rounded-2xl shadow-2xl overflow-hidden">
                <Image 
                  src="/companyoverview.jpg" 
                  alt="Company Overview" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("ourCore")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {t("values")}
              </span>
            </h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {[
              { icon: <Target className="w-8 h-8 text-white" />, title: "excellence", text: "excellenceText" },
              { icon: <Eye className="w-8 h-8 text-white" />, title: "innovation", text: "innovationText" },
              { icon: <Heart className="w-8 h-8 text-white" />, title: "compassion", text: "compassionText" },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t(value.title)}</h3>
                <p className="text-gray-600 leading-relaxed">{t(value.text)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-base font-semibold text-yellow-600 uppercase tracking-wider">
                {t("globalStandards")}
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {t("certificationsTitle")}
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {t("certificationsDescription")}
              </p>
            </motion.div>

            {/* Right Column: Certifications Grid */}
            <motion.div
              className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {certificationKeys.map((certKey, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group p-6 bg-white rounded-2xl flex justify-center items-center text-center transition-all duration-300 border-2 border-gray-100 hover:border-yellow-200 hover:shadow-xl hover:-translate-y-1 h-32"
                >
                  <h3 className="text-lg font-semibold text-gray-700 transition-colors duration-300 group-hover:text-gray-900">
                    {t(certKey)}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
