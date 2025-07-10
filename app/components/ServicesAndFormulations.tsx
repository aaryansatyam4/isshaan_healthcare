"use client";

import { motion } from "framer-motion";
import {
  Building,
  Tag,
  FileText,
  Pill,
  Heart,
  Home,
  FilePenLine,
  Users,
  ClipboardCheck,
  FileSignature,
  RefreshCw,
  Icon as LucideIcon,
} from "lucide-react";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Data for the sections with translation keys
const finishedFormulations = [
  {
    icon: Building,
    textKey: "formulations_item1",
  },
  {
    icon: Tag,
    textKey: "formulations_item2",
  },
  {
    icon: FileText,
    textKey: "formulations_item3",
  },
  {
    icon: Pill,
    textKey: "formulations_item4",
  },
  {
    icon: Heart,
    textKey: "formulations_item5",
  },
];

const ourServices = [
  {
    icon: Home,
    textKey: "services_item1",
  },
  {
    icon: FilePenLine,
    textKey: "services_item2",
  },
  {
    icon: Users,
    textKey: "services_item3",
  },
  {
    icon: ClipboardCheck,
    textKey: "services_item4",
  },
  {
    icon: FileSignature,
    textKey: "services_item5",
  },
  {
    icon: RefreshCw,
    textKey: "services_item6",
  },
];

// Reusable sub-component for each item in the grid
interface ServiceItemProps {
  icon: LucideIcon;
  text: string;
  index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon: Icon, text, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group flex flex-col items-center text-center p-4 transition-all duration-300 cursor-pointer"
    >
      <motion.div 
        className="flex items-center justify-center h-20 w-20 mb-4 rounded-full bg-yellow-100 group-hover:bg-yellow-200 transition-colors duration-300"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          delay: index * 0.2,
        }}
      >
        <Icon className="w-10 h-10 text-yellow-600 transition-colors duration-300" strokeWidth={1.5} />
      </motion.div>
      <p className="text-sm text-gray-700 font-medium leading-snug">{text}</p>
    </motion.div>
  );
};


// Main Component
export default function ServicesAndFormulations() {
  const { t } = useLanguage();

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
    <motion.section 
      className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-16 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Centered Layout */}
        <div className="flex flex-col items-center text-center space-y-20">
          
          {/* Section 1: Formulations */}
          <motion.div 
            className="w-full"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          >
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {t("weDeliver")}
            </h2>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {t("broadRangeTitle")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {t("finishedFormulationsTitle")}
              </span>
            </h3>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
              {finishedFormulations.map((item, index) => (
                <ServiceItem key={item.textKey} icon={item.icon} text={t(item.textKey)} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Section 2: Services */}
          <motion.div 
            className="w-full"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
          >
            <h3 className="text-3xl font-bold text-gray-900">
              {t("ourTitle")}{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {t("servicesTitle")}
              </span>
            </h3>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {ourServices.map((item, index) => (
                <ServiceItem key={item.textKey} icon={item.icon} text={t(item.textKey)} index={index + finishedFormulations.length} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
