// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Script from "next/script"; // Import the Script component

export const metadata: Metadata = {
  title: "Isshaan Healthcare",
  description: "Explore Isshaan Healthcare's range of quality pharmaceutical products.",
  openGraph: {
    title: "Isshaan Healthcare",
    description: "Explore Isshaan Healthcare's range of quality pharmaceutical products.",
    url: "https://isshaan-healthcare.vercel.app/",
    siteName: "Isshaan Healthcare",
    images: [
      {
        url: "/logo.png", // Replace with your own image path
        width: 1200,
        height: 630,
        alt: "Isshaan Healthcare Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  // 1. Google Search Console Verification Meta Tag
  verification: {
    google: "xlRAMLT2GFBV8zaZ6_aR2YUdXPenEb1vMr75tG7Tvdw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-tag-manager-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WRVT2KDB');
            `,
          }}
        />

        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-NEHSB3PP1R"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NEHSB3PP1R');
            `,
          }}
        />
      </head>
      <body>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRVT2KDB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }} // Use style object for React
          ></iframe>
        </noscript>

        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}