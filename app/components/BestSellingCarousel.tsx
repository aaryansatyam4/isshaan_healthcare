"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";   // ⬅️ new

const bestSellingProducts = [
  { id: 1, name: "Remijoint", image: "/remi.jpg", link: "https://www.remijoint.com" },
  { id: 2, name: "Bolnol",    image: "/BolnolTablet.jpg", link: "https://bolnol.vercel.app" },
  { id: 3, name: "Montafex",  image: "/Montafex.jpg",     link: "https://www.montafex.com" },
  { id: 4, name: "Ispanol",   image: "/ispanolplus.jpg",  link: "https://ispanol.uz/" },
  { id: 5, name: "Hepanol",   image: "/Hepanol.png",      link: "https://gepanol.uz/" },
];

export default function BestSellingCarousel() {
  const { t } = useLanguage();                            // ⬅️ new
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 3;
  const total        = bestSellingProducts.length;

  /* auto-scroll - temporarily disabled to prevent maximum update depth error */
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setStartIndex(prev => (prev + visibleCount) % total);
  //   }, 4000);
  //   return () => clearInterval(id);
  // }, []); // Empty dependency array to run only once on mount

  /* slice the window of visible items */
  const visibleProducts = Array.from({ length: visibleCount }, (_, i) =>
    bestSellingProducts[(startIndex + i) % total]
  );

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 🔤 translated heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          {t("bestSelling")}{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            {t("products")}
          </span>
        </h2>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleProducts.map(p => {
            const isExternal = p.link.startsWith("http");
            const card = (
              <div
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                <img src={p.image} alt={p.name} className="w-40 h-40 object-contain mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{p.name}</h3>
              </div>
            );

            return isExternal ? (
              <a key={`link-${p.id}`} href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                {card}
              </a>
            ) : (
              <Link key={`link-${p.id}`} href={p.link} className="block">
                {card}
              </Link>
            );
          })}
        </div>

        {/* pagination dots */}
        <div className="mt-10 flex justify-center gap-3">
          {Array.from({ length: Math.ceil(total / visibleCount) }).map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setStartIndex(i * visibleCount)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                startIndex === i * visibleCount ? "bg-yellow-600 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
