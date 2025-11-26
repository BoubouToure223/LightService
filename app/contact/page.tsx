import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Contact - Light Service | Devis et informations",
  description:
    "Contactez Light Service pour un devis ou des informations sur nos services IT: développement web/mobile, maintenance, sécurité, matériel.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact - Light Service",
    description:
      "Entrer en contact avec Light Service pour vos projets numériques.",
    url: "https://lightservice.tech/contact",
    images: [
      { url: "https://lightservice.tech/placeholder.jpg", width: 1200, height: 630, alt: "Contact" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Light Service",
    description: "Entrer en contact avec Light Service pour vos projets numériques.",
    images: ["https://lightservice.tech/placeholder.jpg"],
  },
}

export default function ContactPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lightservice.tech/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://lightservice.tech/contact" },
    ],
  }

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: "Light Service",
      url: "https://lightservice.tech/",
      logo: "https://lightservice.tech/placeholder-logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33-X-XX-XX-XX-XX",
        contactType: "customer support",
        areaServed: "FR",
        availableLanguage: ["fr"],
      },
    },
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Contact />
      <Footer />
      <Script
        id="breadcrumb-contact"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
    </main>
  )
}
