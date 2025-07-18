"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RevealWrapper } from "@/components/reveal-wrapper"
import { Check, Star, Zap, Users, BookOpen } from "lucide-react"
import { useState } from "react"

// Planos para instrutores
const instructorPlans = [
  {
    name: "Starter",
    price: "2.500",
    currency: "MT",
    period: "/mês",
    description: "Perfeito para começar sua jornada como instrutor",
    features: [
      "Até 3 cursos",
      "Até 100 alunos por curso",
      "Suporte por e-mail",
      "Certificados básicos",
      "Analytics básico",
    ],
    popular: false,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Professional",
    price: "5.000",
    currency: "MT",
    period: "/mês",
    description: "Para instrutores que querem escalar seu negócio",
    features: [
      "Cursos ilimitados",
      "Alunos ilimitados",
      "Suporte prioritário",
      "Analytics avançado",
      "Comunidade integrada",
      "Automações",
      "Proteção de conteúdo",
    ],
    popular: true,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Enterprise",
    price: "12.000",
    currency: "MT",
    period: "/mês",
    description: "Para empresas e grandes organizações",
    features: [
      "Tudo do Professional",
      "White label completo",
      "Suporte 24/7",
      "Gerente de conta dedicado",
      "Integrações customizadas",
      "Relatórios personalizados",
      "Treinamento da equipe",
    ],
    popular: false,
    color: "from-violet-500 to-violet-600",
  },
]

// Planos para alunos
const studentPlans = [
  {
    name: "Básico",
    price: "Grátis",
    currency: "",
    period: "",
    description: "Acesso a conteúdos gratuitos e amostra de cursos",
    features: [
      "Acesso a cursos gratuitos",
      "Amostra de cursos premium",
      "Fórum da comunidade",
      "Perfil básico",
      "Suporte por e-mail",
    ],
    popular: false,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Premium",
    price: "1.200",
    currency: "MT",
    period: "/mês",
    description: "Acesso ilimitado a todos os cursos da plataforma",
    features: [
      "Acesso a todos os cursos",
      "Certificados digitais",
      "Download de materiais",
      "Suporte prioritário",
      "Sem anúncios",
      "Acesso a webinars exclusivos",
    ],
    popular: true,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Empresarial",
    price: "800",
    currency: "MT",
    period: "/usuário/mês",
    description: "Para equipes e empresas que desejam capacitar seus colaboradores",
    features: [
      "Tudo do Premium",
      "Painel de administração",
      "Relatórios de progresso",
      "Conteúdo personalizado",
      "Gerente de sucesso dedicado",
      "Mínimo de 10 usuários",
    ],
    popular: false,
    color: "from-blue-500 to-blue-600",
  },
]

export default function Pricing() {
  const [userType, setUserType] = useState<"student" | "instructor">("student")
  const plans = userType === "student" ? studentPlans : instructorPlans

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <RevealWrapper direction="up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              💰 Preços Transparentes
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              Escolha o Plano Ideal para Você
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Seja você aluno ou instrutor, temos planos que se adaptam às suas necessidades.
            </p>

            {/* Toggle para alternar entre aluno e instrutor */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setUserType("student")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    userType === "student"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <Users className="inline-block mr-2 h-4 w-4" />
                  Para Alunos
                </button>
                <button
                  onClick={() => setUserType("instructor")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    userType === "instructor"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-purple-600 dark:text-purple-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <BookOpen className="inline-block mr-2 h-4 w-4" />
                  Para Instrutores
                </button>
              </div>
            </div>
          </div>
        </RevealWrapper>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <RevealWrapper key={index} direction="up" delay={index * 200}>
              <Card
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 h-full ${
                  plan.popular
                    ? "border-purple-500 shadow-2xl shadow-purple-500/25"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-violet-500 text-white text-center py-2 text-sm font-medium">
                    <Star className="inline h-4 w-4 mr-1" />
                    Mais Popular
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-8"}`}>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.currency && (
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-400 ml-1">{plan.currency}</span>
                    )}
                    <span className="text-gray-600 dark:text-gray-400 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <Button
                    className={`w-full mb-8 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white py-3 text-lg font-medium`}
                  >
                    {plan.popular && <Zap className="mr-2 h-5 w-5" />}
                    {userType === "student" ? "Começar Agora" : "Criar Conta"}
                  </Button>

                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper direction="up" delay={600}>
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Precisa de algo personalizado? Entre em contato conosco.
            </p>
            <Button variant="outline" className="border-2 border-purple-300 dark:border-purple-700">
              Falar com Vendas
            </Button>
          </div>
        </RevealWrapper>

        {/* Seção de perguntas frequentes */}
        <RevealWrapper direction="up" delay={700}>
          <div className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h3>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  Posso ser aluno e instrutor ao mesmo tempo?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim! Você pode ter uma conta que funciona tanto para consumir cursos quanto para criá-los e vendê-los.
                  Basta escolher o plano adequado para cada necessidade.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  Como são feitos os pagamentos aos instrutores?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Os instrutores recebem 70% do valor de cada venda. Os pagamentos são processados mensalmente via
                  transferência bancária, M-Pesa ou outros métodos disponíveis em Moçambique.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  Posso cancelar minha assinatura a qualquer momento?
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Sim, tanto alunos quanto instrutores podem cancelar suas assinaturas a qualquer momento. Para alunos,
                  o acesso permanece até o final do período pago. Para instrutores, os cursos ficarão indisponíveis após
                  o cancelamento.
                </p>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
