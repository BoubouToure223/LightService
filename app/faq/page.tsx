import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script"

export const metadata: Metadata = {
  title: "FAQ - Light Service | Questions fréquentes",
  description:
    "Trouvez les réponses aux questions fréquentes sur nos services: développement web et mobile, maintenance informatique, vidéosurveillance et matériel.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ - Light Service",
    description:
      "Questions fréquentes sur nos services: développement web et mobile, maintenance informatique et sécurité.",
    url: "https://lightservice.tech/faq",
    images: [
      {
        url: "https://lightservice.tech/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "FAQ Light Service",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Light Service",
    description:
      "Questions fréquentes sur nos services: développement web et mobile, maintenance informatique et sécurité.",
    images: ["https://lightservice.tech/placeholder.jpg"],
  },
}

const faqs = [
  {
    q: "Quels services proposez-vous ?",
    a: "Développement web et mobile, maintenance informatique, vidéosurveillance et vente de matériel.",
  },
  {
    q: "Intervenez-vous à distance et sur site ?",
    a: "Oui, selon le besoin : assistance à distance et interventions sur site planifiées.",
  },
  {
    q: "Comment obtenir un devis ?",
    a: "Contactez-nous via le formulaire de contact, nous revenons vers vous rapidement avec une estimation.",
  },
]

export default function FAQPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "/faq" },
    ],
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold">FAQ</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Réponses aux questions fréquentes sur nos prestations et notre accompagnement.
        </p>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-lg border p-4">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Script
        id="breadcrumb-faq"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  )
}
