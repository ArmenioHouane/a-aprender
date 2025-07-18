'use client'
import { Button } from "@/components/ui/button"
import { RevealWrapper } from "@/components/reveal-wrapper"
import { Play, BookOpen, Users } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-violet-50 dark:from-blue-950 dark:via-purple-950 dark:to-violet-950">
    
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <RevealWrapper direction="left">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  🚀 Plataforma #1 em Educação Online
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-clip-text text-transparent leading-tight">
                  Crie e Venda Seus Cursos Online
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Transforme seu conhecimento em uma fonte de renda. A A-aprender oferece todas as ferramentas
                  necessárias para criar, hospedar e vender seus cursos online com facilidade.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Uma solução <span className="text-blue-600 dark:text-blue-400 font-bold">DevSolutions</span>
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper direction="left" delay={200}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Começar Agora
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-300 dark:border-purple-700 px-8 py-4 text-lg"
                >
                  Ver Demo
                </Button>
              </div>
            </RevealWrapper>

            <RevealWrapper direction="up" delay={400}>
              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Instrutores</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">200+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Estudantes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cursos</div>
                </div>
              </div>
            </RevealWrapper>
          </div>

          <RevealWrapper direction="right" delay={300}>
            <div className="relative">
              <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Curso de JavaScript</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Por João Silva</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">14 alunos</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">5.000 MT</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
