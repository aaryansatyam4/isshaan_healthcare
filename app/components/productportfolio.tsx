"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext"; // ⬅️ NEW
import Image from "next/image";

const portfolioItems = [
  {
    titleKey: "portfolio_title1", // "Pharmaceutical Formulations"
    descriptionKey: "portfolio_desc1", // "Cutting-edge solutions for health and wellness."
    imageUrl: "/form.jpg",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    titleKey: "portfolio_title2", // "Herbal and Nutraceuticals"
    descriptionKey: "portfolio_desc2", // "Natural products for a balanced and healthy lifestyle."
    imageUrl: "/herbal.jpg",
    gradient: "from-amber-400 to-yellow-500",
  },
  {
    titleKey: "portfolio_title3", // "Cosmetics"
    descriptionKey: "portfolio_desc3", // "Innovative formulations for skincare and beauty."
    imageUrl: "/med.jpg", // Using a local image instead of Unsplash
    gradient: "from-orange-400 to-red-500",
  },
];

// --- Reusable Card Component with 3D Flip ---
interface PortfolioCardProps {
  item: typeof portfolioItems[0];
  index: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, index }) => {
  const { t } = useLanguage(); // ⬅️ NEW
  const [isFlipped, setIsFlipped] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="w-full h-96 [perspective:1000px]"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0 }}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full [backface-visibility:hidden] overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={item.imageUrl}
            alt={t(item.titleKey)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {t(item.titleKey)}
            </h3>
          </div>
        </div>

        {/* Back Face - Now uses dynamic gradient */}
        <div
          className={`absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg flex flex-col justify-center items-center p-6 text-center`}
        >
          <h3 className="text-2xl font-bold text-white">{t(item.titleKey)}</h3>
          <p className="mt-2 text-white/90">{t(item.descriptionKey)}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- Main Component ---
export default function ProductsPortfolio() {
  const { t } = useLanguage(); // ⬅️ NEW

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Map through the portfolio items to create cards */}
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.titleKey} item={item} index={index} />
          ))}

          {/* CTA Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: portfolioItems.length * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            className="relative flex flex-col justify-center items-start w-full h-96 p-8 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg overflow-hidden"
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10">
                {/* ✅ FIXED: Changed kebab-case attributes to camelCase for JSX */}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="a" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(2) rotate(45)"><rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,0)"/><path d="M10-5V5M-5 0H5" stroke="white" strokeWidth="0.5" shapeRendering="auto"></path></pattern></defs><rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)"></rect></svg>
            </div>
            <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80">{t('explore')}</p>
                <h3 className="mt-2 text-3xl font-bold">{t('portfolio_cta_title')}</h3>
                <p className="mt-4 text-white/90">
                    {t('portfolio_cta_desc')}
                </p>
                <a
                    href="/products/our-products"
                    className="mt-6 inline-flex items-center bg-white hover:bg-yellow-50 text-yellow-600 px-6 py-3 rounded-full text-md font-semibold shadow-md transition-all duration-300"
                >
                    {t('discoverOurProducts')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
