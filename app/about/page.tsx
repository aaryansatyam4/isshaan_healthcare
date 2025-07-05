"use client";

import { motion } from "framer-motion";
import { Award, Target, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
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

  const leadership = [
    {
      name: "Arvind Kumar",
      position: t("leadershipTeam.arvind.position"),
      image: "/bhaia.jpg",
      bio: t("leadershipTeam.arvind.bio"),
    },
    {
      name: "Shubhaankar Sonnjay Singh",
      position: t("leadershipTeam.shubhaankar.position"),
      image: "/bhaia.jpg",
      bio: t("leadershipTeam.shubhaankar.bio"),
    },
  ];

  return (
    <div className="pt-16">
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

            <motion.div className="relative" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <img src="/placeholder.svg?height=600&width=600" alt="Company Overview" className="rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent rounded-2xl"></div>
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
              { icon: <Target />, title: "excellence", text: "excellenceText" },
              { icon: <Eye />, title: "innovation", text: "innovationText" },
              { icon: <Heart />, title: "compassion", text: "compassionText" },
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

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("our")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {t("journey")}
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">{item.year}</div>
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("leadership")}</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                className="w-full sm:w-2/3 md:w-1/3 lg:w-1/4 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                }}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-100"
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-yellow-600 font-semibold mb-4">{leader.position}</p>
                <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("certifications")}</h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {["ISO 9001:2015", "FDA Approved", "WHO GMP", "CE Marking"].map((cert, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center p-8 bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{cert}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
