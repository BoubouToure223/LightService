import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"
import Script from "next/script"

// Lazy loading des composants non critiques pour améliorer le First Contentful Paint
const Services = dynamic(() => import("@/components/services").then((mod) => ({ default: mod.Services })), {
  loading: () => <div className="py-20 lg:py-32 bg-secondary/20" />,
})

const About = dynamic(() => import("@/components/about").then((mod) => ({ default: mod.About })), {
  loading: () => <div className="py-20 lg:py-32" />,
})

const Projects = dynamic(() => import("@/components/projects").then((mod) => ({ default: mod.Projects })), {
  loading: () => <div className="py-20 lg:py-32 bg-secondary/20" />,
})

const Contact = dynamic(() => import("@/components/contact").then((mod) => ({ default: mod.Contact })), {
  loading: () => <div className="py-20 lg:py-32" />,
})

export const metadata = {
  title: "Accueil - Light Service | Solutions IT Professionnelles",
  description:
    "Light Service vous accompagne dans tous vos projets informatiques. Développement web et mobile, maintenance IT, vidéosurveillance et vente de matériel. Contactez-nous pour un devis gratuit.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Light Service - Solutions IT Professionnelles",
    description:
      "Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel.",
    url: "https://lightservice.tech/",
    images: [
      { url: "https://lightservice.tech/placeholder.jpg", width: 1200, height: 630, alt: "Accueil" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Light Service - Solutions IT Professionnelles",
    description:
      "Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel.",
    images: ["https://lightservice.tech/placeholder.jpg"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <Script
        id="breadcrumb-home"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lightservice.tech/" },
            ],
          }),
        }}
      />
    </main>
  )
}
