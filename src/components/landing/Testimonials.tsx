"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { RevealWrapper } from "@/components/reveal-wrapper"
import { useState } from "react"
import Image from "next/image"

// Depoimentos de instrutores
const instructorTestimonials = [
  {
    name: "Maria Silva",
    role: "Instrutora de Marketing Digital",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Em apenas 6 meses consegui faturar mais de 5.000 MT vendendo meus cursos. A plataforma é incrível e o suporte é excepcional!",
    rating: 4,
    revenue: "20.200+ MT",
  },
  {
    name: "João Santos",
    role: "Desenvolvedor e Instrutor",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "A facilidade para criar e vender cursos é impressionante. Já tenho mais de 20 alunos e continuo crescendo todos os dias.",
    rating: 5,
    revenue: "100+ alunos",
  },
  {
    name: "Fernanda Lima",
    role: "Designer UX/UI",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "A proteção de conteúdo me dá total segurança. Posso focar em criar conteúdo de qualidade sem me preocupar com pirataria.",
    rating: 5,
    revenue: "100% conteúdo protegido",
  },
]

// Depoimentos de alunos
const studentTestimonials = [
  {
    name: "Carlos Oliveira",
    role: "Estudante de Programação",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Consegui mudar de carreira em apenas 6 meses estudando na A-aprender. Os cursos são práticos e os instrutores realmente se importam.",
    rating: 5,
    revenue: "Novo emprego em 6 meses",
  },
  {
    name: "Ana Costa",
    role: "Profissional de Marketing",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "O que mais me impressiona é a qualidade do app mobile. Posso estudar no transporte público, em casa ou no trabalho, a qualquer hora.",
    rating: 5,
    revenue: "95% satisfação",
  },
  {
    name: "Ricardo Mendes",
    role: "Empreendedor",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Os certificados são reconhecidos pelo mercado e me ajudaram a conquistar novos clientes. O investimento valeu cada centavo!",
    rating: 5,
    revenue: "300% ROI",
  },
]

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<"students" | "instructors">("students")
  const testimonials = activeTab === "students" ? studentTestimonials : instructorTestimonials

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <RevealWrapper direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              💬 Depoimentos
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              O Que Nossa Comunidade Diz
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Histórias de sucesso de alunos e instrutores que transformaram suas vidas com a A-aprender.
            </p>

            {/* Tabs para alternar entre alunos e instrutores */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setActiveTab("students")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "students"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Alunos
                </button>
                <button
                  onClick={() => setActiveTab("instructors")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "instructors"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Instrutores
                </button>
              </div>
            </div>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <RevealWrapper key={index} direction="up" delay={index * 100}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:scale-105 relative overflow-hidden h-full">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12 text-purple-500" />
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-700">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        priority={index < 3}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-green-700 dark:text-green-300 text-sm font-medium">
                      📈 {testimonial.revenue}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper direction="up" delay={600}>
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {activeTab === "students"
                ? "Junte-se a milhares de alunos que estão transformando suas carreiras"
                : "Junte-se a milhares de instrutores que estão transformando conhecimento em renda"}
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.7/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avaliação média</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {activeTab === "students" ? "200+" : "5+"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {activeTab === "students" ? "Alunos satisfeitos" : "Instrutores ativos"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                  {activeTab === "students" ? "10+" : "10+"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {activeTab === "students" ? "Cursos disponíveis" : "Cursos disponíveis"}
                </div>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
