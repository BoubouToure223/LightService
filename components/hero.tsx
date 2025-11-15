"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Shield, Smartphone } from "lucide-react"
import { useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const scrollToContact = useCallback(() => {
    // Vérifier si on est sur la page d'accueil
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }
    // Sinon, rediriger vers la page contact
    router.push("/contact")
  }, [router])

  const stats = useMemo(
    () => [
      { value: "5+", label: "Années d'expérience" },
      { value: "100+", label: "Projets réalisés" },
      { value: "50+", label: "Clients satisfaits" },
    ],
    []
  )

  return (
    <section id="accueil" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">Solutions IT professionnelles</span>
            </div>

            <h1
              className={`font-display font-bold text-4xl lg:text-6xl text-foreground leading-tight text-balance transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              Votre partenaire numérique de confiance
            </h1>

            <p
              className={`text-lg text-muted-foreground leading-relaxed text-pretty transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Light Service vous accompagne dans vos projets informatiques — développement, maintenance et sécurité.
              Nous transformons vos idées en solutions technologiques performantes.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Button
                onClick={scrollToServices}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
              >
                Nos services
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
              </Button>
              <Button
                onClick={scrollToContact}
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary bg-transparent hover:scale-105 transition-all duration-300"
              >
                Nous contacter
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="font-display font-bold text-3xl text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl" />
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-primary/20 rounded-lg animate-float" />
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-primary/30 rounded-lg animate-float-delayed" />
            <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-primary/10 rounded-lg animate-float" />

            <div
              className={`absolute top-1/4 right-1/4 p-4 bg-card border border-border rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <Code2 className="text-primary" size={32} />
            </div>
            <div
              className={`absolute bottom-1/3 left-1/4 p-4 bg-card border border-border rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Shield className="text-primary" size={32} />
            </div>
            <div
              className={`absolute top-1/2 right-1/3 p-4 bg-card border border-border rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <Smartphone className="text-primary" size={32} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
