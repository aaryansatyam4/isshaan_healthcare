// app/layout.tsx
import type { Metadata } from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./contexts/LanguageContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://isshaan-healthcare.vercel.app'),
  title: "Isshaan Healthcare",
  description: "Explore Isshaan Healthcare's range of quality pharmaceutical products.",
  verification: {
    google: "xlRAMLT2GFBV8zaZ6_aR2YUdXPenEb1vMr75tG7Tvdw",
  },
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WRVT2KDB');`}
        </Script>
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRVT2KDB"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NEHSB3PP1R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NEHSB3PP1R');
          `}
        </Script>
        
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}