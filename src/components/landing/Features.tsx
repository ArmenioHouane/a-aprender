'use client'
import { Card, CardContent } from "@/components/ui/card"
import { RevealWrapper } from "@/components/reveal-wrapper"
import { Video, DollarSign, BarChart3, Shield, Zap, Users, MessageSquare } from "lucide-react"

const features = [
  {
    icon: Video,
    title: "Criação de Cursos Intuitiva",
    description: "Editor drag-and-drop para criar cursos profissionais com vídeos, textos, quizzes e muito mais.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: DollarSign,
    title: "Monetização Simples",
    description:
      "Defina preços, crie cupons de desconto e receba pagamentos automaticamente via M-Pesa, cartão ou transferência.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: BarChart3,
    title: "Analytics Avançado",
    description: "Acompanhe vendas, engajamento dos alunos e performance dos cursos com relatórios detalhados.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Proteção de Conteúdo",
    description: "Seus vídeos e materiais ficam protegidos contra download e pirataria com nossa tecnologia avançada.",
    color: "from-red-500 to-red-600",
  },
 
  {
    icon: Zap,
    title: "Automações Inteligentes",
    description: "E-mails automáticos, lembretes e muito mais para engajar seus alunos.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Comunidade Integrada",
    description: "Crie uma comunidade exclusiva para seus alunos interagirem e tirarem dúvidas.",
    color: "from-teal-500 to-teal-600",
  },
  
  {
    icon: MessageSquare,
    title: "Suporte 24/7",
    description: "Nossa equipe está sempre disponível para ajudar você e seus alunos via chat, e-mail ou telefone.",
    color: "from-pink-500 to-pink-600",
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <RevealWrapper direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              ✨ Recursos Poderosos
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              Tudo que Você Precisa em Uma Plataforma
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Desde a criação até a venda, a A-aprender oferece todas as ferramentas necessárias para transformar seu
              conhecimento em um negócio próspero.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <RevealWrapper key={index} direction="up" delay={index * 100}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:scale-105 h-full">
                <CardContent className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
