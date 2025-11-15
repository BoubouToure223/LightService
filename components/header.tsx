"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = useMemo(
    () => [
      { name: "Accueil", href: "/" },
      { name: "Services", href: "/services" },
      { name: "FAQ", href: "/faq" },
      { name: "À propos", href: "/about" },
      { name: "Réalisations", href: "/projects" },
      { name: "Contact", href: "/contact" },
    ],
    []
  )

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const headerClassName = useMemo(
    () =>
      `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/98 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-background/95 backdrop-blur-sm border-b border-border"
      }`,
    [scrolled]
  )

  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30">
              <Image
                src="/logo light-service.jpg"
                alt="Light Service Logo"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <span className="font-display font-bold text-xl text-foreground transition-colors duration-300 group-hover:text-primary">
              Light Service
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <Link href="/contact">Demander un devis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground transition-transform duration-300 hover:scale-110"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100 py-4 border-t border-border" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 ${
                  mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms" }}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full hover:scale-105 transition-all duration-300"
            >
              <Link href="/contact" onClick={closeMobileMenu}>
                Demander un devis
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
