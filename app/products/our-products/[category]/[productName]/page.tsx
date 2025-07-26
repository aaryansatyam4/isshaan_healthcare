
"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  CheckCircle,
  Users,
  Baby,
  Shield,
  AlertTriangle,
  Thermometer,
  Info,
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import CustomProductPage from "./customProductPage"
import { commerciallyAvailableProducts as commerciallyAvailableProducts_en } from "@/data/commerciallyAvailableProducts_en"
import { commerciallyAvailableProducts as commerciallyAvailableProducts_ru } from "@/data/commerciallyAvailableProducts_ru"
import { commerciallyAvailableProducts as commerciallyAvailableProducts_fr } from "@/data/commerciallyAvailableProducts_fr"
import { commerciallyAvailableProducts as commerciallyAvailableProducts_es } from "@/data/commerciallyAvailableProducts_es"

interface PageProps {
  params: {
    category: string;
    productName: string;
  }
}

export default function ProductDetail({ params }: PageProps) {
  const router = useRouter()
  const { t, language } = useLanguage()

  // Correctly unwrap the params promise
  const unwrappedParams = use(params)
  const { category, productName } = unwrappedParams
  
  // Decode URL-encoded characters
  const decodedProductName = decodeURIComponent(productName || '')
  const decodedCategory = decodeURIComponent(category || '')

  const productDataByLanguage = {
    en: commerciallyAvailableProducts_en,
    ru: commerciallyAvailableProducts_ru,
    fr: commerciallyAvailableProducts_fr,
    es: commerciallyAvailableProducts_es,
  };
  
  const selectedProducts = productDataByLanguage[language];
  
  // First try to find by exact name match in current language
  let product = selectedProducts.find(
    (p) => {
      const normalizedCategory = decodedCategory.toLowerCase();
      const normalizedProductName = decodedProductName.toLowerCase().replace(/\s+/g, "-");
      return (
        p.type.toLowerCase() === normalizedCategory &&
        p.name.toLowerCase().replace(/\s+/g, "-") === normalizedProductName
      );
    }
  );
  
  // If not found, search in all languages to find the product ID
  if (!product && decodedProductName) {
    // Search through all language datasets
    let foundProductId: number | null = null;
    
    for (const [lang, products] of Object.entries(productDataByLanguage)) {
      const foundProduct = products.find(
        (p) => {
          const normalizedCategory = decodedCategory.toLowerCase();
          const normalizedProductName = decodedProductName.toLowerCase().replace(/\s+/g, "-");
          const normalizedPName = p.name.toLowerCase().replace(/\s+/g, "-");
          
          return p.type.toLowerCase() === normalizedCategory && normalizedPName === normalizedProductName;
        }
      );
      
      if (foundProduct) {
        foundProductId = foundProduct.id;
        break;
      }
    }
    
    // If we found a product ID, find the same product in current language
    if (foundProductId !== null) {
      product = selectedProducts.find(p => p.id === foundProductId);
    }
  }
  
  // Final fallback: find first product in category
  if (!product) {
    product = selectedProducts.find(
      (p) => {
        const normalizedCategory = decodedCategory.toLowerCase();
        return p.type.toLowerCase() === normalizedCategory;
      }
    );
  }

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link
            href="/products/our-products"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
          >
            Back to Our Products
          </Link>
        </div>
      </div>
    )
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if(product.customDetailPage){
    return(
      <CustomProductPage product={product}/>
    )
  }
  return (
    <div className="pt-28 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <section className="py-5 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="text-gray-400">/</div>
            <Link
              href="/products/our-products"
              className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
            >
              Our Products
            </Link>
            <div className="text-gray-400">/</div>
            <Link
              href={`/products/our-products/${decodedCategory}`}
              className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
            >
              {decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)}
            </Link>
            <div className="text-gray-400">/</div>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main Product */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <img
                  src={`/${product.image || "placeholder.svg"}`}
                  onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-lg"
                />
              
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">
                    {product.type}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{product.composition}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard icon={Package} title="Packing" value={product.packing} />
                <InfoCard icon={Calendar} title="Shelf Life" value={product.shelfLife} />
                {product.status && <InfoCard icon={Shield} title="Status" value={product.status} />}
                {product.registeredCountries && <InfoCard icon={MapPin} title="Registered Countries" value={product.registeredCountries} />}
              </div>

              {product.targetGroup && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Target Group</h4>
                      <p className="text-blue-700">{product.targetGroup}</p>
                    </div>
                  </div>
                </div>
              )}

            
            </motion.div>
          </div>
        </div>
      </section>

      {/* Extended Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Dosage Information */}
            {product.dosage && (product.dosage.children || product.dosage.adults) && (
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  Dosage Information
                </h3>
                <div className="space-y-4">
                  {product.dosage.children && (
                    <DosageCard icon={Baby} title="Children" value={product.dosage.children} />
                  )}
                  {product.dosage.adults && (
                    <DosageCard icon={Users} title="Adults" value={product.dosage.adults} />
                  )}
                </div>
              </motion.div>
            )}

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <InfoBlock
                title="Benefits"
                icon={CheckCircle}
                iconColor="text-green-600"
                items={product.benefits}
              />
            )}

            {/* Indications */}
            {product.indications && product.indications.length > 0 && (
              <InfoBlock
                title="Indications"
                icon={Info}
                iconColor="text-blue-600"
                items={product.indications}
              />
            )}

            {/* Usage Instructions */}
            {product.usageInstructions && product.usageInstructions.length > 0 && (
              <InfoBlock
                title="Usage Instructions"
                icon={Info}
                iconColor="text-purple-600"
                items={product.usageInstructions}
              />
            )}

            {/* Precautions */}
            {product.precautions && product.precautions.length > 0 && (
              <InfoBlock
                title="Precautions"
                icon={AlertTriangle}
                iconColor="text-yellow-600"
                items={product.precautions}
              />
            )}

            {/* Side Effects */}
            {product.sideEffects && product.sideEffects.length > 0 && (
              <InfoBlock
                title="Side Effects"
                icon={AlertTriangle}
                iconColor="text-red-600"
                items={product.sideEffects}
              />
            )}

            {/* Storage */}
            {product.storage && (
              <InfoBlock
                title="Storage Instructions"
                icon={Thermometer}
                iconColor="text-teal-600"
                items={Array.isArray(product.storage) ? product.storage : [product.storage]}
              />
            )}
          </motion.div>

          {product.disclaimer && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6"
            >
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h4>
                  <p className="text-yellow-700">{product.disclaimer}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">Products</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedProducts
              .filter((p) => p.id !== product.id && p.type === product.type)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/our-products/${relatedProduct.type.toLowerCase()}/${relatedProduct.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={`/${relatedProduct.image || "placeholder.svg"}`}
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{relatedProduct.type}</p>
                  <div className="text-yellow-600 font-semibold text-sm">View Details →</div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// 🔹 Subcomponents
function InfoCard({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
      <Icon className="w-6 h-6 text-yellow-500" />
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  )
}

function DosageCard({ icon: Icon, title, value }: { icon: any; title:string; value: string }) {
  return (
    <div className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-yellow-500 mt-0.5" />
      <div>
        <p className="font-semibold text-gray-900">{title}:</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  )
}

function InfoBlock({ title, icon: Icon, iconColor, items }: { title: string; icon: any; iconColor: string; items: string[] }) {
  return (
    <motion.div variants={{ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } }} className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Icon className={`w-6 h-6 mr-2 ${iconColor}`} />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div className={`w-2 h-2 ${iconColor} rounded-full mt-2 flex-shrink-0`}></div>
            <p className="text-gray-600">{item}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}