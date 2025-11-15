"use client"

import { CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const values = [
  "Expertise technique reconnue",
  "Accompagnement personnalisé",
  "Solutions innovantes et durables",
  "Réactivité et disponibilité",
] as const

export function About() {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section ref={elementRef} id="apropos" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={`relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden bg-secondary/20 border border-border transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Image
              src="/professionnel.jpg"
              alt="Light Service team"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <span className="text-sm font-medium text-foreground">À propos de nous</span>
            </div>

            <h2
              className={`font-display font-bold text-3xl lg:text-5xl text-foreground text-balance transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              Votre partenaire technologique depuis 2019
            </h2>

            <div
              className={`space-y-4 text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <p>
                <strong className="text-foreground">Light Service</strong> est une entreprise spécialisée dans les
                services informatiques, née de la passion pour la technologie et l'innovation. Notre mission est
                d'accompagner les entreprises dans leur transformation numérique en proposant des solutions adaptées et
                performantes.
              </p>

              <p>
                Nous croyons que la technologie doit être au service de votre réussite. C'est pourquoi nous mettons
                notre expertise technique et notre expérience au profit de vos projets, qu'il s'agisse de développement
                d'applications, de maintenance informatique ou de sécurisation de vos infrastructures.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-3 pt-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <CheckCircle2
                    className="text-primary flex-shrink-0 transition-transform duration-300 hover:scale-125"
                    size={20}
                  />
                  <span className="text-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
