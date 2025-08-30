"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Crown, Zap } from "lucide-react"

export default function InvictusQuiz() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    experiencia: "",
    vendaOnline: "",
    areasContato: [] as string[],
    impedimento: "",
  })

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const timer = setTimeout(() => setIsVisible(true), 200)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.email || !formData.whatsapp) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    // Add haptic feedback on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(100)
    }

    try {
      // Enviar dados para o webhook do Zapier
      const webhookData = new URLSearchParams()
      webhookData.append("email", formData.email)
      webhookData.append("whatsapp", formData.whatsapp)

      await fetch("https://hooks.zapier.com/hooks/catch/23595123/ubwvz6w/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: webhookData.toString(),
      })

      console.log("Dados enviados para o webhook:", {
        email: formData.email,
        whatsapp: formData.whatsapp,
      })
    } catch (error) {
      console.error("Erro ao enviar dados para o webhook:", error)
    }

    console.log("Dados do formulário:", formData)
    router.push("/aprovado")
  }

  const handleAreasChange = (area: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        areasContato: [...prev.areasContato, area],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        areasContato: prev.areasContato.filter((a) => a !== area),
      }))
    }
  }

  return (
    <div className={`min-h-screen bg-cyber-gradient relative overflow-hidden pt-8`}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Refined floating particles with entrance animation */}
        {[...Array(isMobile ? 5 : 12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? "w-1 h-1 bg-cyber-red/40"
                : i % 3 === 1
                  ? "w-0.5 h-0.5 bg-cyber-blue/30"
                  : "w-1.5 h-1.5 bg-cyber-purple/25"
            } animate-cyber-entrance`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3 + 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Enhanced geometric grid */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none opacity-12">
            <div
              className="absolute inset-0 animate-cyber-fade-up"
              style={{
                backgroundImage: `
                linear-gradient(rgba(255, 51, 102, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 51, 102, 0.12) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
                animationDelay: "1s",
              }}
            ></div>
          </div>
        )}

        {/* Enhanced cyber scan lines */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-red/25 to-transparent animate-cyber-data-flow"></div>
          </div>
        )}
      </div>

      {/* Enhanced Main Content */}
      <div className={`container mx-auto px-4 ${isMobile ? "py-4" : "py-8"} ${isMobile ? "max-w-full" : "max-w-4xl"}`}>
        <Card
          className={`cyber-border-glow bg-cyber-gradient-card backdrop-blur-xl transition-all duration-1000 overflow-hidden relative hover-cyber-glow animate-cyber-entrance ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-red/5 to-transparent"></div>

          <CardContent className={`${isMobile ? "p-6" : "p-12"} relative z-10`}>
            <form onSubmit={handleSubmit} className={`space-y-${isMobile ? "8" : "10"}`}>
              {/* Enhanced Personal Data Section */}
              <div className={`space-y-${isMobile ? "6" : "8"}`}>
                <h2
                  className={`${isMobile ? "text-lg" : "text-2xl"} font-modern font-bold text-cyber-gray-100 border-b border-cyber pb-4 flex items-center gap-3 animate-cyber-slide-in delay-cyber-100`}
                >
                  <Zap
                    className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-red-500 cyber-text-glow animate-cyber-glow-pulse flex-shrink-0`}
                  />
                  <span className={`${isMobile ? "text-base" : ""}`}>Seus Dados Pessoais</span>
                </h2>

                <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "md:grid-cols-2 gap-8"}`}>
                  <div className="space-y-3 animate-cyber-fade-up delay-cyber-200">
                    <Label
                      htmlFor="nome"
                      className={`${isMobile ? "text-sm" : "text-lg"} font-modern font-semibold text-cyber-gray-200`}
                    >
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                      className={`${isMobile ? "h-12 text-sm" : "h-14 text-lg"} border-cyber focus:border-cyber-light bg-cyber-card text-cyber-gray-100 placeholder:text-cyber-gray-500 transition-all duration-300 font-modern rounded-lg backdrop-blur-sm focus:cyber-glow hover-cyber-border focus-cyber`}
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="space-y-3 animate-cyber-fade-up delay-cyber-300">
                    <Label
                      htmlFor="email"
                      className={`${isMobile ? "text-sm" : "text-lg"} font-modern font-semibold text-cyber-gray-200`}
                    >
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`${isMobile ? "h-12 text-sm" : "h-14 text-lg"} border-cyber focus:border-cyber-light bg-cyber-card text-cyber-gray-100 placeholder:text-cyber-gray-500 transition-all duration-300 font-modern rounded-lg backdrop-blur-sm focus:cyber-glow hover-cyber-border focus-cyber`}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-3 animate-cyber-fade-up delay-cyber-400">
                  <Label
                    htmlFor="whatsapp"
                    className={`${isMobile ? "text-sm" : "text-lg"} font-modern font-semibold text-cyber-gray-200`}
                  >
                    WhatsApp com DDD *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className={`${isMobile ? "h-12 text-sm w-full" : "h-14 text-lg max-w-md"} border-cyber focus:border-cyber-light bg-cyber-card text-cyber-gray-100 placeholder:text-cyber-gray-500 transition-all duration-300 font-modern rounded-lg backdrop-blur-sm focus:cyber-glow hover-cyber-border focus-cyber`}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Enhanced Questions Section */}
              <div className={`space-y-${isMobile ? "8" : "10"}`}>
                <h2
                  className={`${isMobile ? "text-lg" : "text-2xl"} font-modern font-bold text-cyber-gray-100 border-b border-cyber pb-4 flex items-center gap-3 animate-cyber-slide-in delay-cyber-500`}
                >
                  <Crown
                    className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-red-500 cyber-text-glow animate-cyber-glow-pulse flex-shrink-0`}
                  />
                  <span className={`${isMobile ? "text-base" : ""}`}>Avaliação Exclusiva</span>
                </h2>

                {/* Enhanced Question 1 */}
                <div className="space-y-4 animate-cyber-fade-up delay-cyber-600">
                  <Label
                    className={`${isMobile ? "text-base" : "text-xl"} font-modern font-semibold text-cyber-gray-100`}
                  >
                    1. Qual sua experiência com Marketing Digital?
                  </Label>
                  <RadioGroup
                    value={formData.experiencia}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, experiencia: value }))}
                    className="space-y-3"
                  >
                    {[
                      "Nunca ouvi falar, tô começando do zero",
                      "Já tentei aprender, mas ainda não apliquei nada",
                      "Já tentei vender, mas não tive resultados",
                      "Já faço vendas, mas quero escalar",
                    ].map((option, index) => (
                      <div
                        key={option}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-lg border-cyber-dark hover:border-cyber bg-cyber-card/40 hover:bg-cyber-card/60 transition-all duration-300 backdrop-blur-sm hover:cyber-glow hover-cyber-lift cursor-pointer animate-cyber-slide-in`}
                        style={{ animationDelay: `${700 + index * 100}ms` }}
                      >
                        <RadioGroupItem
                          value={option}
                          id={option}
                          className="border-cyber text-cyber-red w-5 h-5 hover:animate-cyber-typing flex-shrink-0"
                        />
                        <Label
                          htmlFor={option}
                          className={`${isMobile ? "text-sm leading-relaxed" : "text-base"} cursor-pointer flex-1 text-cyber-gray-200 hover:text-cyber-gray-100 transition-colors duration-300 font-modern`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Enhanced Question 2 */}
                <div className="space-y-4 animate-cyber-fade-up delay-cyber-700">
                  <Label
                    className={`${isMobile ? "text-base" : "text-xl"} font-modern font-semibold text-cyber-gray-100`}
                  >
                    2. Você já tentou vender algum produto online?
                  </Label>
                  <RadioGroup
                    value={formData.vendaOnline}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, vendaOnline: value }))}
                    className="space-y-3"
                  >
                    {[
                      "Sim, já tentei, mas não tive vendas",
                      "Sim, já fiz algumas vendas",
                      "Não, nunca tentei vender nada",
                    ].map((option, index) => (
                      <div
                        key={option}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-lg border-cyber-dark hover:border-cyber bg-cyber-card/40 hover:bg-cyber-card/60 transition-all duration-300 backdrop-blur-sm hover:cyber-glow hover-cyber-lift cursor-pointer animate-cyber-slide-in`}
                        style={{ animationDelay: `${800 + index * 100}ms` }}
                      >
                        <RadioGroupItem
                          value={option}
                          id={option}
                          className="border-cyber text-cyber-red w-5 h-5 hover:animate-cyber-typing flex-shrink-0"
                        />
                        <Label
                          htmlFor={option}
                          className={`${isMobile ? "text-sm leading-relaxed" : "text-base"} cursor-pointer flex-1 text-cyber-gray-200 hover:text-cyber-gray-100 transition-colors duration-300 font-modern`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Enhanced Question 3 */}
                <div className="space-y-4 animate-cyber-fade-up delay-cyber-800">
                  <Label
                    className={`${isMobile ? "text-base" : "text-xl"} font-modern font-semibold text-cyber-gray-100`}
                  >
                    3. Com quais áreas do digital você já teve contato? (Múltipla escolha)
                  </Label>
                  <div className="space-y-3">
                    {[
                      "Tráfego pago (anúncios)",
                      "Tráfego orgânico (Instagram, YouTube, TikTok)",
                      "Dropshipping",
                      "Infoprodutos",
                      "Afiliados",
                      "Nada ainda",
                    ].map((area, index) => (
                      <div
                        key={area}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-lg border-cyber-dark hover:border-cyber bg-cyber-card/40 hover:bg-cyber-card/60 transition-all duration-300 backdrop-blur-sm hover:cyber-glow hover-cyber-lift cursor-pointer animate-cyber-slide-in`}
                        style={{ animationDelay: `${900 + index * 80}ms` }}
                      >
                        <Checkbox
                          id={area}
                          checked={formData.areasContato.includes(area)}
                          onCheckedChange={(checked) => handleAreasChange(area, checked as boolean)}
                          className="border-cyber data-[state=checked]:bg-cyber-red data-[state=checked]:border-cyber-red transition-all duration-300 w-5 h-5 hover:animate-cyber-typing flex-shrink-0"
                        />
                        <Label
                          htmlFor={area}
                          className={`${isMobile ? "text-sm leading-relaxed" : "text-base"} cursor-pointer flex-1 text-cyber-gray-200 hover:text-cyber-gray-100 transition-colors duration-300 font-modern`}
                        >
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Question 4 */}
                <div className="space-y-4 animate-cyber-fade-up delay-cyber-700">
                  <Label
                    htmlFor="impedimento"
                    className={`${isMobile ? "text-base" : "text-xl"} font-modern font-semibold text-cyber-gray-100`}
                  >
                    4. O que está te impedindo de vencer hoje?
                  </Label>
                  <Textarea
                    id="impedimento"
                    value={formData.impedimento}
                    onChange={(e) => setFormData((prev) => ({ ...prev, impedimento: e.target.value }))}
                    className={`${isMobile ? "min-h-[120px] text-sm" : "min-h-[140px] text-lg"} border-cyber focus:border-cyber-light bg-cyber-card text-cyber-gray-100 placeholder:text-cyber-gray-500 transition-all duration-300 font-modern rounded-lg leading-relaxed backdrop-blur-sm focus:cyber-glow hover-cyber-border focus-cyber`}
                    placeholder="Descreva os principais obstáculos que você enfrenta..."
                  />
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <div className={`pt-${isMobile ? "8" : "10"} animate-cyber-scale-in delay-cyber-800`}>
                <Button
                  type="submit"
                  className={`w-full ${isMobile ? "h-14 px-4" : "h-16 px-8"} font-modern font-bold bg-gradient-to-r from-cyber-red to-cyber-red-dark hover:from-cyber-red-light hover:to-cyber-red text-white shadow-2xl transform transition-all duration-500 cyber-border-glow group relative overflow-hidden ${!isMobile ? "hover:scale-105 hover-cyber-lift" : ""} rounded-lg animate-cyber-button-ready hover-cyber-glow active:animate-cyber-click`}
                >
                  <div className="absolute inset-0 bg-cyber-red/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 animate-cyber-glow-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="flex items-center justify-center w-full relative z-10">
                    <Crown
                      className={`${isMobile ? "mr-2 h-5 w-5 flex-shrink-0" : "mr-4 h-5 w-5"} text-red-500 transition-all duration-300 group-hover:animate-cyber-typing`}
                    />
                    <span className={`tracking-wide text-center ${isMobile ? "text-sm leading-tight" : "text-lg"}`}>
                      {isMobile ? "SOLICITAR ACESSO À COMUNIDADE" : "SOLICITAR ACESSO À COMUNIDADE INVICTUS"}
                    </span>
                    <Crown
                      className={`${isMobile ? "ml-2 h-5 w-5 flex-shrink-0" : "ml-4 h-5 w-5"} text-red-500 transition-all duration-300 group-hover:animate-cyber-typing`}
                    />
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Footer */}
      <div className="bg-cyber-card/60 py-6 border-t border-cyber-dark relative backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center relative">
          <p
            className={`text-cyber-gray-400 ${isMobile ? "text-xs" : "text-sm"} font-modern animate-cyber-fade-up delay-cyber-600`}
          >
            © 2024 Invictus Quiz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
