import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Réalisations - Light Service | Projets et études de cas",
  description:
    "Découvrez une sélection de nos projets: développement web et mobile, maintenance, sécurité, intégrations.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Réalisations - Light Service",
    description:
      "Quelques projets phares menés pour nos clients: performance, fiabilité et sécurité.",
    url: "https://lightservice.tech/projects",
    images: [
      { url: "https://lightservice.tech/placeholder.jpg", width: 1200, height: 630, alt: "Réalisations" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réalisations - Light Service",
    description:
      "Quelques projets phares menés pour nos clients: performance, fiabilité et sécurité.",
    images: ["https://lightservice.tech/placeholder.jpg"],
  },
}

export default function ProjectsPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lightservice.tech/" },
      { "@type": "ListItem", position: 2, name: "Réalisations", item: "https://lightservice.tech/projects" },
    ],
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Projects />
      <Footer />
      <Script
        id="breadcrumb-projects"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  )
}
