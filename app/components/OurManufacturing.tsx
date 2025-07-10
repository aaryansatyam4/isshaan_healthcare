"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";   // ⬅️ NEW

export default function OurManufacturing() {
  const { t } = useLanguage();                              // ⬅️ NEW

  return (
    <section className="relative py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-100 via-white to-transparent opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl shadow-xl group">
          <img
            src="/plant.jpg"
            alt="Manufacturing Plant"
            className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Text */}
        <div>
          {/* 🔤 Translated heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {t("our")}{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              {t("manufacturingExcellence")}
            </span>
          </h2>

          {/* 🔤 Translated paragraphs (HTML allowed) */}
          <p
            className="text-lg text-gray-700 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("manufacturingText1") }}
          />
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t("manufacturingText2")}
          </p>

     
        </div>
      </div>
    </section>
  );
}
