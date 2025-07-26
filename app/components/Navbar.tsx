"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    {
      name: t("products"),
      path: "/products",
      hasDropdown: true,
      dropdownItems: [
        { name: t("genericProducts"), path: "/products/generic" },
        { name: t("ourProducts"), path: "/products/our-products" },
      ],
    },
    { name: t("contact"), path: "/contact" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white/90 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Isshaan Healthcare Logo" className="w-36 h-20 object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.hasDropdown ? (
                  <div
                    onMouseEnter={() => setShowProductsDropdown(true)}
                    onMouseLeave={() => setShowProductsDropdown(false)}
                  >
                    <button
                      className={`px-3 py-2 text-base font-normal flex items-center space-x-1 transition-colors ${
                        pathname.startsWith("/products")
                          ? "text-yellow-600 font-semibold"
                          : "text-gray-700 hover:text-yellow-600"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {showProductsDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50"
                        >
                          {item.dropdownItems?.map((d) => (
                            <Link
                              key={d.path}
                              href={d.path}
                              className={`block px-4 py-2 text-base transition-colors ${
                                pathname === d.path
                                  ? "text-yellow-600 bg-yellow-50 font-semibold"
                                  : "text-gray-700 hover:bg-yellow-50 font-normal"
                              }`}
                            >
                              {d.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`relative px-3 py-2 text-base transition-colors ${
                      pathname === item.path
                        ? "text-yellow-600 font-semibold"
                        : "text-gray-700 hover:text-yellow-600 font-normal"
                    }`}
                  >
                    {item.name}
                    {pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Language switcher + mobile icon */}
          <div className="flex items-center space-x-4">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages((s) => !s)}
                className="flex items-center space-x-1 px-3 py-2 text-base font-normal text-gray-700 hover:text-yellow-600 transition-colors"
              >
                <span className="hidden sm:inline">{languages.find((l) => l.code === language)?.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showLanguages && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setShowLanguages(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-base hover:bg-yellow-50 transition-colors ${
                          language === lang.code
                            ? "text-yellow-600 bg-yellow-50 font-semibold"
                            : "text-gray-700 font-normal"
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile burger */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700 hover:text-yellow-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.path}>
                    {item.hasDropdown ? (
                      <>
                        <div className="px-3 py-2 text-base font-normal text-gray-700">{item.name}</div>
                        {item.dropdownItems?.map((d) => (
                          <Link
                            key={d.path}
                            href={d.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-6 py-2 text-base rounded-lg ${
                              pathname === d.path
                                ? "text-yellow-600 bg-yellow-50 font-semibold"
                                : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 font-normal"
                            }`}
                          >
                            {d.name}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`px-3 py-2 text-base rounded-lg ${
                          pathname === item.path
                            ? "text-yellow-600 bg-yellow-50 font-semibold"
                            : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 font-normal"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
