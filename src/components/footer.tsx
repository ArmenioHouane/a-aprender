'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, BookOpen } from "lucide-react"
import { RevealWrapper } from "@/components/reveal-wrapper"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      <RevealWrapper direction="up">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Pronto para Começar?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de instrutores que já estão transformando conhecimento em renda. Comece hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                Criar Conta Grátis
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg"
              >
                Agendar Demo
              </Button>
            </div>
          </div>
        </div>
      </RevealWrapper>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <RevealWrapper direction="up" delay={100}>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">A-aprender</span>
                    <span className="text-sm text-gray-400">by DevSolutions</span>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  A plataforma completa para criar, hospedar e vender seus cursos online. Transforme seu conhecimento em
                  uma fonte de renda sustentável.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </RevealWrapper>

            {/* Product */}
            <RevealWrapper direction="up" delay={200}>
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Produto</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Recursos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Preços
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Integrações
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      API
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Segurança
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Atualizações
                    </Link>
                  </li>
                </ul>
              </div>
            </RevealWrapper>

            {/* Support */}
            <RevealWrapper direction="up" delay={300}>
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Suporte</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Central de Ajuda
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Documentação
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Tutoriais
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Webinars
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      Comunidade
                    </Link>
                  </li>
                  <li>
                    <Link href="/status" className="text-gray-400 hover:text-white transition-colors">
                      Status
                    </Link>
                  </li>
                </ul>
              </div>
            </RevealWrapper>

            {/* Newsletter */}
            <RevealWrapper direction="up" delay={400}>
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Receba dicas exclusivas sobre educação online e atualizações da plataforma.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Inscrever-se
                  </Button>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="h-5 w-5" />
                    <Link href="mailto:contato@a-aprender.co.mz" className="hover:text-white transition-colors">
                      contato@a-aprender.co.mz
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Phone className="h-5 w-5" />
                    <Link href="tel:+258999999999" className="hover:text-white transition-colors">
                      (11) 9999-9999
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin className="h-5 w-5" />
                    <span>Maputo, Moçambique</span>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <RevealWrapper direction="up" delay={500}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 A-aprender by DevSolutions. Todos os direitos reservados.
              </p>
              <div className="flex gap-6">
                <Link href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
                <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </footer>
  )
}
