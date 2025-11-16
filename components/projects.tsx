"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { projects } from "@/lib/projects-data"

export function Projects() {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      <section ref={elementRef} id="realisations" className="py-20 lg:py-32 bg-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-sm font-medium text-foreground">Nos réalisations</span>
            </div>
            <h2
              className={`font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 text-balance transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Projets qui font notre fierté
            </h2>
            <p
              className={`text-lg text-muted-foreground leading-relaxed text-pretty transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Découvrez quelques-unes de nos réalisations récentes et la valeur que nous apportons à nos clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`bg-card border-border overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden bg-secondary/20">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-primary font-medium mb-2 transition-all duration-300 group-hover:translate-x-1">
                    {project.category}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                  <Button
                    onClick={() => openProjectModal(project)}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 p-0 group/btn"
                  >
                    Voir le projet
                    <ExternalLink
                      className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                      size={16}
                    />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={`text-center transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary bg-transparent hover:scale-105 transition-all duration-300"
            >
              Voir plus de projets
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-foreground">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-primary font-medium">{selectedProject?.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={selectedProject?.image || "/placeholder.svg"}
                alt={selectedProject?.title || "Projet"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Description du projet</h4>
              <p className="text-muted-foreground leading-relaxed">{selectedProject?.details}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Technologies utilisées</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Durée du projet</h4>
              <p className="text-muted-foreground">{selectedProject?.duration}</p>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                onClick={scrollToContact}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Discuter d'un projet similaire
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="flex-1">
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
