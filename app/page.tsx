"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroVideoCarousel from "@/components/HeroVideoCarousel";
import BestSellingCarousel from "@/components/BestSellingCarousel";
import OurManufacturing from "@/components/OurManufacturing";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="pt-16">
      {/* ───────── Hero Section ───────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroVideoCarousel />

        {/* floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* three animated circles */}
          {[
            { className: "top-20 left-10 w-20 h-20 bg-yellow-200", dur: 6 },
            { className: "top-40 right-20 w-32 h-32 bg-yellow-300", dur: 8, rev: true },
            { className: "bottom-20 left-1/4 w-16 h-16 bg-yellow-400", dur: 10 },
          ].map((c, i) => (
            <motion.div
              key={i}
              animate={{ y: c.rev ? [20, -20, 20] : [-20, 20, -20] }}
              transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute rounded-full opacity-20 ${c.className}`}
            />
          ))}
        </div>

        {/* hero copy */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {t("heroTitle")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              {t("heroSubtitle")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/about"
                className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>{t("learnMore")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              {/* 🔤 translated */}
              <Link
                href="/products/our-products"
                className="group border-2 border-yellow-500 text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                {t("viewProducts")}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-yellow-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ───────── Other Sections ───────── */}
      <BestSellingCarousel />
      <OurManufacturing />

      {/* Distributor CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("connectWithUs")}
            </h2>

            <p className="text-xl text-yellow-100 max-w-3xl mx-auto leading-relaxed">
              {t("distributorText")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t("connect")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
