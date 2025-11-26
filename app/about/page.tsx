import type { Metadata } from "next"
import { Header } from "@/components/header"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import Script from "next/script"

export const metadata: Metadata = {
  title: "À propos - Light Service | Notre mission et expertise",
  description:
    "Light Service accompagne les entreprises dans leurs projets IT: développement web et mobile, maintenance, sécurité et matériel.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "À propos - Light Service",
    description:
      "Notre mission: délivrer des solutions IT fiables et performantes pour accélérer votre activité.",
    url: "https://lightservice.tech/about",
    images: [
      { url: "https://lightservice.tech/placeholder.jpg", width: 1200, height: 630, alt: "À propos" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos - Light Service",
    description:
      "Notre mission: délivrer des solutions IT fiables et performantes pour accélérer votre activité.",
    images: ["https://lightservice.tech/placeholder.jpg"],
  },
}

export default function AboutPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lightservice.tech/" },
      { "@type": "ListItem", position: 2, name: "À propos", item: "https://lightservice.tech/about" },
    ],
  }

  return (
    <main className="min-h-screen">
      <Header />
      <About />
      <Footer />
      <Script
        id="breadcrumb-about"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  )
}
