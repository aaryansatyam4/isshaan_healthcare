"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* data sets */
import { commerciallyAvailableProducts as enData } from "@/data/commerciallyAvailableProducts_en";
import { commerciallyAvailableProducts as ruData } from "@/data/commerciallyAvailableProducts_ru";
import { commerciallyAvailableProducts as frData } from "@/data/commerciallyAvailableProducts_fr";
import { commerciallyAvailableProducts as esData } from "@/data/commerciallyAvailableProducts_es";

export default function CategoryProducts() {
  const router = useRouter();
  const { category } = useParams<{ category: string }>();
  const { t, language } = useLanguage();

  /* choose dataset by language */
  const dataMap = { en: enData, ru: ruData, fr: frData, es: esData } as const;
  const products = dataMap[language];

  /* prepare readable category */
  const categoryName = category ?? "";
  const capCat = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const catLabel = t(`category.${capCat}`) || capCat;

  const categoryProducts = products.filter(
    (p) => p.type.toLowerCase() === categoryName.toLowerCase()
  );

  /* framer presets */
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
  const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="pt-28">
      {/* breadcrumb */}
      <section className="py-5 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t("backToProducts")}</span>
          </button>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-900">{catLabel}</span>
        </div>
      </section>

      {/* hero */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full opacity-25 animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 space-x-2"
          >
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              {catLabel}
            </span>
            <span>{t("products")}</span>
          </motion.h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            {t("categoryPageSubtext").replace("{category}", catLabel.toLowerCase())}
          </p>

          <div className="mt-4 flex items-center justify-center space-x-3 text-lg">
            <Package className="w-6 h-6 text-yellow-500" />
            <span className="font-semibold text-gray-700">
              {categoryProducts.length} {t("productsAvailable")}
            </span>
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categoryProducts.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
               
                  <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">
                    {t(`category.${p.type}`)}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{p.name}</h3>

                  <Info label={t("composition")} text={p.composition} />
                  <Info label={t("packing")} text={p.packing} />

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    {p.shelfLife}
                   
                  </div>

                  <div className="pt-4 border-t">
              

                    <Link
                      href={`/products/our-products/${p.type.toLowerCase()}/${p.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 rounded-lg text-center font-semibold hover:from-yellow-600 hover:to-yellow-700"
                    >
                      {t("viewDetails")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t("noProductsFound")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* helpers */
const Info: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <p className="text-sm text-gray-600">
    <span className="font-semibold">{label}:</span>{" "}
    {text.length > 80 ? `${text.slice(0, 80)}…` : text}
  </p>
);

const Badge: React.FC<{ side: "right"; status: string }> = ({ side, status }) => (
  <span
    className={`absolute top-4 ${side}-4 px-3 py-1 rounded-full text-xs font-semibold ${
      status === "Registered"
        ? "bg-green-100 text-green-800"
        : "bg-yellow-100 text-yellow-800"
    }`}
  >
    {status}
  </span>
);
