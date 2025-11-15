"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Script from "next/script"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useToast } from "@/hooks/use-toast"

// Schéma de validation avec Zod
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  website: z.string().max(0).optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cfToken, setCfToken] = useState<string | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const { toast } = useToast()

  useEffect(() => {
    ;(window as any).onTurnstileSuccess = (token: string) => {
      setCfToken(token)
    }
    return () => {
      try {
        ;(window as any).onTurnstileSuccess = undefined
      } catch {}
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ ...data, cfToken: cfToken || undefined }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue")
      }

      // Succès
      toast({
        title: "Message envoyé !",
        description: result.message || "Votre message a été envoyé avec succès.",
        variant: "default",
      })

      // Réinitialiser le formulaire
      reset()
      setCfToken(null)
    } catch (error) {
      // Erreur
      toast({
        title: "Erreur",
        description:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = useMemo(
    () => [
      {
        icon: Phone,
        title: "Téléphone",
        value: "+223 71 65 18 04",
        link: "tel:+22371651804",
      },
      {
        icon: Mail,
        title: "Email",
        value: "Cisssekou1234@gmail.com",
        link: "mailto:Cisssekou1234@gmail.com",
      },
      {
        icon: MapPin,
        title: "Adresse",
        value: "Bamako, Mali",
        link: "#",
      },
    ],
    []
  )

  return (
    <section ref={elementRef} id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-sm font-medium text-foreground">Contact</span>
          </div>
          <h2
            className={`font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 text-balance transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Parlons de votre projet
          </h2>
          <p
            className={`text-lg text-muted-foreground leading-relaxed text-pretty transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Vous avez un projet en tête ? N'hésitez pas à nous contacter. Notre équipe vous répondra dans les plus brefs
            délais.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className={`bg-card border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 transition-all duration-300 hover:bg-primary/20 hover:scale-110 hover:rotate-3">
                    <info.icon className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-lg font-display text-foreground">{info.title}</CardTitle>
                  <CardDescription>
                    <a
                      href={info.link}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {info.value}
                    </a>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card
            className={`lg:col-span-2 bg-card border-border hover:border-primary/30 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-display text-foreground">Envoyez-nous un message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Turnstile (optionnel si clé présente) */}
                {siteKey ? (
                  <div className="space-y-2">
                    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
                    <div
                      className="cf-turnstile"
                      data-sitekey={siteKey}
                      data-callback="onTurnstileSuccess"
                    />
                  </div>
                ) : null}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  {...register("website")}
                />
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nom complet <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    {...register("name")}
                    disabled={isSubmitting}
                    className={`bg-background border-border text-foreground transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/10 ${
                      errors.name ? "border-destructive" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    {...register("email")}
                    disabled={isSubmitting}
                    className={`bg-background border-border text-foreground transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/10 ${
                      errors.email ? "border-destructive" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre projet..."
                    rows={6}
                    {...register("message")}
                    disabled={isSubmitting}
                    className={`bg-background border-border text-foreground resize-none transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/10 ${
                      errors.message ? "border-destructive" : ""
                    }`}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
