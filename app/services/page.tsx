import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Services as ServicesSection } from "@/components/services"
import { Footer } from "@/components/footer"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Services - Light Service | Développement Web & Mobile, Maintenance, Sécurité",
  description:
    "Découvrez nos services: développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel. Expertise technique et accompagnement complet.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services - Light Service",
    description:
      "Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel.",
    url: "https://lightservice.tech/services",
    images: [
      {
        url: "https://lightservice.tech/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Services Light Service",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - Light Service",
    description:
      "Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel.",
    images: ["https://lightservice.tech/placeholder.jpg"],
  },
}

export default function ServicesPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://lightservice.tech/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://lightservice.tech/services",
      },
    ],
  }

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Services IT - Light Service",
    provider: {
      "@type": "Organization",
      name: "Light Service",
      url: "/",
      logo: "/logo light-service.jpg",
    },
    areaServed: "FR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catalogue de services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Développement Web" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Développement Mobile" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance Informatique" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vidéosurveillance" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Matériel Informatique" } },
      ],
    },
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold">Nos Services</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Nous accompagnons votre entreprise sur l’ensemble du cycle: conseil, conception, développement,
          déploiement et maintenance.
        </p>
      </section>
      <ServicesSection />
      <Footer />
      <Script
        id="breadcrumb-services"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Script
        id="service-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
    </main>
  )
}
