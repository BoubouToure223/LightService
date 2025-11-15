import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Light Service - Solutions IT Professionnelles | Développement Web & Mobile",
  description:
    "Light Service, votre partenaire IT de confiance. Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel. Expertise technique au service de votre entreprise.",
  keywords: [
    "développement web",
    "développement mobile",
    "maintenance informatique",
    "vidéosurveillance",
    "matériel informatique",
    "IT services",
    "Light Service",
    "solutions IT",
  ],
  authors: [{ name: "Light Service" }],
  creator: "Light Service",
  publisher: "Light Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://LightserviceMl.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Light Service - Solutions IT Professionnelles",
    description:
      "Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel. Votre partenaire IT de confiance.",
    url: "https://LightserviceMl.com/",
    siteName: "Light Service",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://LightserviceMl.com/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Light Service - Solutions IT Professionnelles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Light Service - Solutions IT Professionnelles",
    description: "Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel.",
    images: ["https://LightserviceMl.com/placeholder.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/jpeg" href="/logo light-service.jpg" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Light Service",
              description:
                "Solutions IT professionnelles - Développement web et mobile, maintenance informatique, vidéosurveillance",
              url: "https://LightserviceMl.com/",
              logo: "https://LightserviceMl.com/placeholder-logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33-X-XX-XX-XX-XX",
                contactType: "Service client",
                areaServed: "FR",
                availableLanguage: ["French"],
              },
              sameAs: [
                "https://www.facebook.com/lightservice",
                "https://www.linkedin.com/company/lightservice",
                "https://twitter.com/lightservice",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR",
              },
              offers: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Développement Web et Mobile",
                    description: "Création d'applications web et mobile sur mesure",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Maintenance Informatique",
                    description: "Support technique et maintenance de vos systèmes IT",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Vidéosurveillance",
                    description: "Installation et configuration de systèmes de vidéosurveillance",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Matériel Informatique",
                    description: "Vente et configuration de matériel informatique professionnel",
                  },
                },
              ],
            }),
          }}
        />
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
