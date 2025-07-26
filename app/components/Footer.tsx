"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="Isshaan Logo"
              className="w-25 h-25 object-contain rounded-lg"
            />

            <p className="text-gray-300 text-sm leading-relaxed">
              {t("footerDescription")}
            </p>

            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61578710094532" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/isshaan-healthcare-private-limited/posts/?feedView=all" },
                { Icon: Instagram, href: "https://www.instagram.com/isshaanhealthcarepvtltd/" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">
              {t("quickLinks")}
            </h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
              >
                {t("home")}
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
              >
                {t("about")}
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">
              {t("products")}
            </h3>
            <div className="space-y-2">
              <Link
                href="/products/generic"
                className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
              >
                {t("genericProducts")}
              </Link>
              <Link
                href="/products/our-products"
                className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
              >
                {t("ourProducts")}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">
              {t("contactInfo")}
            </h3>

            <div className="space-y-3 text-sm">
            

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300">+91 9560797536</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300">info@isshaan.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
