"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
/* data imports */
import { commerciallyAvailableProducts as commerciallyAvailableProducts_en } from "@/data/commerciallyAvailableProducts_en";
import { commerciallyAvailableProducts as commerciallyAvailableProducts_ru } from "@/data/commerciallyAvailableProducts_ru";
import { commerciallyAvailableProducts as commerciallyAvailableProducts_fr } from "@/data/commerciallyAvailableProducts_fr";
import { commerciallyAvailableProducts as commerciallyAvailableProducts_es } from "@/data/commerciallyAvailableProducts_es";

const PRODUCTS_PER_PAGE = 15;

export default function OurProducts() {
  const { t, language } = useLanguage();

  /* ––– local state ––– */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  /* ––– data set per language ––– */
  const productsByLang = {
    en: commerciallyAvailableProducts_en,
    ru: commerciallyAvailableProducts_ru,
    fr: commerciallyAvailableProducts_fr,
    es: commerciallyAvailableProducts_es,
  } as const;

  const products = productsByLang[language];
  const categories = [...new Set(products.map((p) => p.type))];

  /* ––– filtering ––– */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory ? p.type === selectedCategory : true;
      const q = searchTerm.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.registeredCountries.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const pageSlice = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  /* ––– animations ––– */
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="pt-28">
      {/* ───────── Hero ───────── */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-25 animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            {t("our")}{" "}
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              {t("products")}
            </span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("ourProductsTagline")}
          </p>
        </div>
      </section>

      {/* ───────── Filters ───────── */}
      <section className="py-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* category chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Chip
              active={selectedCategory === null}
              onClick={() => {
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
            >
              {t("allProducts")}
            </Chip>

            {categories.map((c) => (
              <Chip
                key={c}
                active={selectedCategory === c}
                onClick={() => {
                  setSelectedCategory(c);
                  setCurrentPage(1);
                }}
              >
                {t(`category.${c}`)}
              </Chip>
            ))}
          </div>

          {/* search */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={t("searchPlaceholderProducts")}
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-yellow-500"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Product cards ───────── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t("productList")}
            </h2>
            <p className="text-gray-600">
              {filtered.length} {t("matchingProducts")}
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pageSlice.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden h-full flex flex-col"
              >
                {/* image + badges */}
                <div className="relative">
                  <img
                    src={`/${p.image || "placeholder.svg"}`}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                    loading="lazy"
                  />
                  {/* <Badge side="right">{p.status}</Badge>
                  <Badge side="left">{t(`category.${p.type}`)}</Badge> */}
                </div>

                {/* card text */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                  <div className="text-sm text-gray-600 mt-2 flex-1 space-y-1">
                    <InfoLine label={t("composition")} text={p.composition} />
                    <InfoLine label={t("packing")} text={p.packing} />
                  
                  </div>

                  {/* details button */}
                  <div className="pt-4 mt-auto border-t border-gray-100">
                    <Link
                      href={`/products/our-products/${p.type.toLowerCase()}/${p.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg font-semibold text-center block hover:from-yellow-600 hover:to-yellow-700 transition-all"
                    >
                      {t("viewDetails")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ───────── Pagination ───────── */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <PageBtn
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t("previous")}
              </PageBtn>

              <span className="text-sm font-medium text-gray-700">
                {t("page")} {currentPage} {t("of")} {totalPages}
              </span>

              <PageBtn
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                {t("next")}
                <ChevronRight className="w-4 h-4 ml-1" />
              </PageBtn>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ───────── small helper components ───────── */
const Chip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({
  active,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
      active
        ? "bg-yellow-100 border-yellow-500 text-yellow-800"
        : "bg-white border-gray-300 text-gray-700 hover:bg-yellow-50 hover:border-yellow-300"
    }`}
  >
    {children}
  </button>
);

const Badge: React.FC<{ side: "left" | "right"; children: React.ReactNode }> = ({ side, children }) => (
  <div
    className={`absolute top-4 ${side}-4 px-3 py-1 rounded-full text-xs font-semibold ${
      side === "right" ? "bg-green-100 text-green-800" : "bg-yellow-500 text-white"
    }`}
  >
    {children}
  </div>
);

const InfoLine: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <p>
    <span className="font-semibold">{label}:</span>{" "}
    {text.length > 80 ? `${text.substring(0, 80)}…` : text}
  </p>
);

const PageBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className="flex items-center px-4 py-2 rounded-lg border text-sm font-medium bg-white hover:bg-yellow-50 disabled:opacity-50"
  />
);
