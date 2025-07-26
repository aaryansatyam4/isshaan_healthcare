"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroVideoCarousel = dynamic(() => import("@/components/OptimizedHeroVideoCarousel"), {
  loading: () => <div className="h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 animate-pulse" />,
  ssr: false,
});

const ServicesAndFormulations = dynamic(() => import("@/components/ServicesAndFormulations"));
const Productportfolio = dynamic(() => import("@/components/productportfolio"));
const OurManufacturing = dynamic(() => import("@/components/OurManufacturing"));

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="pt-28">
      {/* ───────── Hero Section ───────── */}
     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <HeroVideoCarousel />

  {/* optional: dark overlay so white text always pops */}
  <div className="absolute inset-0 bg-black bg-opacity-50" />

  {/* floating shapes… unchanged */}

  {/* hero copy */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
      >
        {t("heroTitle")}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed"
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
        {/* Primary */}
        <Link
          href="/about"
          className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg 
                     hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 
                     shadow-lg flex items-center space-x-2"
        >
          <span>{t("learnMore")}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Secondary */}
     
      </motion.div>
    </motion.div>
  </div>

  {/* scroll indicator… unchanged */}
</section>

      <ServicesAndFormulations/>
      {/* ───────── Other Sections ───────── */}
      <Productportfolio/>
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