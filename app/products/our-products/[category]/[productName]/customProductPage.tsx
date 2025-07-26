// components/products/customProductPage.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Package, CheckCircle, Users, Info, FlaskConical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface Product {
  id: number
  name: string
  type: string
  image?: string
  packing: string
  composition: string
  shelfLife: string
  status?: string
  registeredCountries?: string
  targetGroup?: string
  dosage?: {
    children?: string
    adults?: string
  }
  benefits?: string[]
  indications?: string[]
  usageInstructions?: string[]
  precautions?: string[]
  sideEffects?: string[]
  storage?: string | string[]
  disclaimer?: string
  customDetailPage?: boolean
  ingredients?: string[]
  howToUse?: string[]
  youtubeLink?: string
  color: string | string[]
  slogan1?:string
  slogan2?:string
}

export default function CustomProductPage({ product }: { product: Product }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'directions' | 'ingredients'>('directions');
  const [isSlogan2Expanded, setIsSlogan2Expanded] = useState(false);


  return (
    <div className="pt-28 bg-white min-h-screen">
      {/* Breadcrumb */}
      <section className="py-5 bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t("back")}</span>
            </button>
            <div className="text-gray-400">/</div>
            <Link
              href="/products/our-products"
              className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
            >
              {t("ourProducts")}
            </Link>
            <div className="text-gray-400">/</div>
            <Link
              href={`/products/our-products/${product.type.toLowerCase()}`}
              className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
            >
              {t(`category.${product.type}`)}
            </Link>
            <div className="text-gray-400">/</div>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Hero Section with Video - Dynamic Color Theme */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: Array.isArray(product.color) 
            ? `linear-gradient(135deg, ${product.color[0]}, ${product.color[1]}, ${product.color[2]})`
            : product.color || 'blue'
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            {/* Left side - Simple Text Content */}
            <div className="lg:w-1/2 space-y-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold"
              >
                {t(`category.${product.type}`)}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-white"
              >
                {product.name}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-blue-100 leading-relaxed max-w-lg"
              >
                {product.slogan1}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-4"
              >
                <Link
                  href="#product-details"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("viewDetails")}
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </motion.div>
            </div>

            {/* Right side - YouTube Video Embed or Product Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                {product.youtubeLink ? (
                  <iframe
                    className="w-full h-[400px] rounded-2xl"
                    src={(() => {
                      // Convert YouTube watch URLs to embed format
                      if (product.youtubeLink.includes("youtube.com/watch?v=")) {
                        const videoId = product.youtubeLink.split("v=")[1]?.split("&")[0];
                        return videoId ? `https://www.youtube.com/embed/${videoId}` : product.youtubeLink;
                      } else if (product.youtubeLink.includes("youtu.be/")) {
                        const videoId = product.youtubeLink.split("youtu.be/")[1]?.split("?")[0];
                        return videoId ? `https://www.youtube.com/embed/${videoId}` : product.youtubeLink;
                      }
                      
                      // Return as-is if already in embed format or other format
                      return product.youtubeLink;
                    })()}
                    title={`${product.name} Product Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="bg-white/20 backdrop-blur-sm p-8 h-[400px] flex items-center justify-center">
                    <img
                      src={`/${product.image || "placeholder.svg"}`}
                      onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            {/* Left side - Product Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <img
                  src={`/${product.image || "placeholder.svg"}`}
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  alt={product.name}
                  className="w-full h-[400px] object-contain"
                />
              </div>
            </motion.div>

            {/* Right side - Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-1/2 space-y-6"
            >
              <div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h2>
                {product.slogan2 && (
                  <div className="text-lg text-gray-600 leading-relaxed">
                    {product.slogan2.length > 150 ? (
                      <>
                        <p className="inline">
                          {isSlogan2Expanded ? product.slogan2 : `${product.slogan2.slice(0, 150)}...`}
                        </p>
                        <button
                          onClick={() => setIsSlogan2Expanded(!isSlogan2Expanded)}
                          className="inline-block ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        >
                          {isSlogan2Expanded ? t('readLess') : t('readMore')}
                        </button>
                      </>
                    ) : (
                      <p>{product.slogan2}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {product.targetGroup && (
                  <div className="bg-white rounded-xl p-4">
                    <Users className="w-8 h-8 text-orange-600 mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">{t("targetGroup")}</h4>
                    <p className="text-gray-600 text-sm">{product.targetGroup}</p>
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      {product.benefits && (
        <section id="product-details" className="py-8">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">
                {t("keyBenefits")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Product Composition Section */}
      <section className="py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">
              {t("productComposition")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start space-x-4">
                  <FlaskConical className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("activeIngredients")}</h3>
                    <p className="text-gray-700 leading-relaxed">{product.composition}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start space-x-4">
                  <Package className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("packaging")}</h3>
                    <p className="text-gray-700 leading-relaxed">{product.packing}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Group Section */}
      {product.targetGroup && (
        <section className="py-8">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm max-w-2xl"
            >
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("targetGroup")}</h3>
                  <p className="text-gray-700">{product.targetGroup}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Dosage Information Section */}
      {product.dosage && (product.dosage.children || product.dosage.adults) && (
        <section className="py-8">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">
                {t("dosageInformation")}
              </h2>
              <div className="bg-white rounded-xl p-6 shadow-sm ">
                <div className="space-y-6">
                  {product.dosage.children && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Users className="w-6 h-6 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">{t("children")}</h3>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 ml-8">
                        <p className="text-gray-700">{product.dosage.children}</p>
                      </div>
                    </div>
                  )}
                  {product.dosage.adults && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Users className="w-6 h-6 text-purple-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">{t("adults")}</h3>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 ml-8">
                        <p className="text-gray-700">{product.dosage.adults}</p>
                      </div>
                    </div>
                  )}
                </div>         
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* How to Use & Ingredients Section */}
      <section className="py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-2xl p-8 shadow-sm"
          >
            {/* Toggle Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('directions')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'directions' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t("howToUse")}
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'ingredients' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {t("ingredients")}
              </button>
            </div>

            {/* Directions Tab */}
            {activeTab === 'directions' && (
              <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-black mb-2">{t("howToUse")}</h3>
                {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700">
                    Take with water. Do not exceed stated dose. If symptoms persist for more than 3 days, consult your healthcare professional.
                  </p>
                </div> */}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                        1
                      </div>
                      <h3 className="font-semibold text-gray-900">{t("step1")}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Take one tablet from the blister pack</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                        2
                      </div>
                      <h3 className="font-semibold text-gray-900">{t("step2")}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Swallow with a full glass of water</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                        3
                      </div>
                      <h3 className="font-semibold text-gray-900">{t("step3")}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Take after meals for best results</p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Ingredients Tab */}
            {activeTab === 'ingredients' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">{t("activeIngredients")}</h3>
                  <p className="text-gray-700 mb-4">{product.composition}</p>
                </div>

                {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">{t("allergenInformation")}</h4>
                  <p className="text-yellow-700">
                    This product may contain trace amounts of lactose. If you have any known allergies or sensitivities, please check with your healthcare professional before use.
                  </p>
                </div> */}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Storage Instructions Section */}
      {product.storage && (
        <section className="py-8">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-xl lg:text-2xl font-bold text-blue-900 mb-6">
                {t("storageInstructions")}
              </h2>
              <ul className="space-y-3">
                {(Array.isArray(product.storage) ? product.storage : [product.storage]).map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Info className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{instruction}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Us Section */}
      <section 
        className="py-8 relative overflow-hidden"
        style={{
          background: Array.isArray(product.color) 
            ? `linear-gradient(135deg, ${product.color[0]}, ${product.color[1]}, ${product.color[2]})`
            : product.color || 'blue'
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t("needMoreInformation")}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("contactHealthcareTeam")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ color: Array.isArray(product.color) ? product.color[0] : product.color || 'blue' }}
            >
              {t("contactUs")}
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

