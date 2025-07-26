"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ---------- data imports ----------
import {
  tablet as tablet_en,
  capsule as capsule_en,
  soft_gel as soft_gel_en,
  edrops as edrops_en,
  liquidOral as liquidOral_en,
  ointment as ointment_en,
  injection as injection_en,
  effervescent as effervescent_en,
  herbal as herbal_en,
  neutraceutal as neutraceutal_en,
} from "@/data/genericProducts_en";

import {
  tablet as tablet_ru,
  capsule as capsule_ru,
  soft_gel as soft_gel_ru,
  edrops as edrops_ru,
  liquidOral as liquidOral_ru,
  ointment as ointment_ru,
  injection as injection_ru,
  effervescent as effervescent_ru,
  herbal as herbal_ru,
  neutraceutal as neutraceutal_ru,
} from "@/data/genericProducts_ru";

import {
  tablet as tablet_fr,
  capsule as capsule_fr,
  soft_gel as soft_gel_fr,
  edrops as edrops_fr,
  liquidOral as liquidOral_fr,
  ointment as ointment_fr,
  injection as injection_fr,
  effervescent as effervescent_fr,
  herbal as herbal_fr,
  neutraceutal as neutraceutal_fr,
} from "@/data/genericProducts_fr";

import {
  tablet as tablet_es,
  capsule as capsule_es,
  soft_gel as soft_gel_es,
  edrops as edrops_es,
  liquidOral as liquidOral_es,
  ointment as ointment_es,
  injection as injection_es,
  effervescent as effervescent_es,
  herbal as herbal_es,
  neutraceutal as neutraceutal_es,
} from "@/data/genericProducts_es";

// ---------- per-language category maps ----------
const categoryMapByLanguage = {
  en: {
    tablet: tablet_en,
    capsule: capsule_en,
    soft_gel: soft_gel_en,
    edrops: edrops_en,
    liquidOral: liquidOral_en,
    ointment: ointment_en,
    injection: injection_en,
    effervescent: effervescent_en,
    herbal: herbal_en,
    neutraceutal: neutraceutal_en,
  },
  ru: {
    tablet: tablet_ru,
    capsule: capsule_ru,
    soft_gel: soft_gel_ru,
    edrops: edrops_ru,
    liquidOral: liquidOral_ru,
    ointment: ointment_ru,
    injection: injection_ru,
    effervescent: effervescent_ru,
    herbal: herbal_ru,
    neutraceutal: neutraceutal_ru,
  },
  fr: {
    tablet: tablet_fr,
    capsule: capsule_fr,
    soft_gel: soft_gel_fr,
    edrops: edrops_fr,
    liquidOral: liquidOral_fr,
    ointment: ointment_fr,
    injection: injection_fr,
    effervescent: effervescent_fr,
    herbal: herbal_fr,
    neutraceutal: neutraceutal_fr,
  },
  es: {
    tablet: tablet_es,
    capsule: capsule_es,
    soft_gel: soft_gel_es,
    edrops: edrops_es,
    liquidOral: liquidOral_es,
    ointment: ointment_es,
    injection: injection_es,
    effervescent: effervescent_es,
    herbal: herbal_es,
    neutraceutal: neutraceutal_es,
  },
};

export default function GenericProducts() {
  const { t, language } = useLanguage();

  /* ---------- dataset merge ---------- */
  const categoryMap = categoryMapByLanguage[language];
  const allData = useMemo(
    () =>
      Object.entries(categoryMap).flatMap(([type, items]) =>
        (items || []).map((item) => ({ ...item, type }))
      ),
    [categoryMap]
  );

  /* ---------- state ---------- */
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  /* ---------- filtering ---------- */
  useEffect(() => {
    let filtered =
      selectedType === "all"
        ? allData
        : allData.filter((item) => item.type === selectedType);

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.Product.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.Composition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const start = (currentPage - 1) * itemsPerPage;
    setFilteredProducts(filtered.slice(start, start + itemsPerPage));
  }, [selectedType, searchTerm, currentPage, allData]);

  const totalItems = allData.filter((item) => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesSearch =
      item.Product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Composition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(totalItems.length / itemsPerPage);

  return (
    <div className="pt-28">
      {/* ---------- Hero ---------- */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl font-bold text-gray-900">
              {t("genericProducts")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>

            {/* 🔤 translated tagline */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("genericTagline")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- Filters ---------- */}
      <section className="py-6 bg-white sticky top-16 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {/* Category dropdown */}
          <select
            value={selectedType}
            onChange={(e) => {
              setCurrentPage(1);
              setSelectedType(e.target.value);
            }}
            className="border border-gray-300 rounded-full px-5 py-2 text-gray-700"
          >
            <option value="all">{t("allTypes")}</option>
            {Object.keys(categoryMap).map((type) => (
              <option key={type} value={type}>
                {t(`category.${type}`)}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ---------- Table ---------- */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* header bar */}
            <div className="p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-2xl font-bold flex items-center">
              <Package className="w-6 h-6 mr-3" />
              {t("showing")} {filteredProducts.length} {t("of")}{" "}
              {totalItems.length} {t("products")}
            </div>

            {/* data table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      {t("sno")}
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      {t("type")}
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      {t("product")}
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      {t("composition")}
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-700">
                      {t("packing")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr
                      key={`${product.type}-${product.SNo}`}
                      className="hover:bg-yellow-50"
                    >
                      <td className="px-6 py-4">{product.SNo}</td>
                      <td className="px-6 py-4">
                        {t(`category.${product.type}`)}
                      </td>
                      <td className="px-6 py-4">{product.Product}</td>
                      <td className="px-6 py-4">{product.Composition}</td>
                      <td className="px-6 py-4">{product.Packing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4" />
                  {t("noProducts")}
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 py-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full border bg-white text-gray-700 hover:bg-yellow-100 disabled:opacity-50"
              >
                « {t("previous")}
              </button>
              <span className="text-sm font-medium text-gray-700">
                {t("page")} {currentPage} {t("of")} {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full border bg-white text-gray-700 hover:bg-yellow-100 disabled:opacity-50"
              >
                {t("next")} »
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
