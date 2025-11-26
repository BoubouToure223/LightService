"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { Facebook, Youtube, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const footerLinks = useMemo(
    () => ({
      navigation: [
        { name: "Accueil", href: "/" },
        { name: "Services", href: "/services" },
        { name: "À propos", href: "/about" },
        { name: "Réalisations", href: "/projects" },
        { name: "Contact", href: "/contact" },
      ],
      social: [
        { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1Gopd2nCdn/?mibextid=wwXIfr" },
        { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@sekoucisse5619" },
        { name: "LinkedIn", icon: Linkedin, href: "http://linkedin.com/in/sékou-amirou-cisse-81b6aa2b3" },
      ],
    }),
    []
  )

  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image
                  src="/logo light-service.jpg"
                  alt="Light Service Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="font-display font-bold text-xl text-foreground">Light Service</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Votre partenaire numérique de confiance pour tous vos projets informatiques. Développement, maintenance et
              sécurité.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} Light Service - Tous droits réservés</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
