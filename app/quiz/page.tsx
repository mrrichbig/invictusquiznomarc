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
    <div
      className={`min-h-screen ${isMobile ? "mobile-bg-simple" : "bg-gradient-to-br from-black via-gray-900 to-red-950"} relative overflow-hidden pt-8`}
    >
      {/* Optimized Background Effects */}
      <div className="absolute inset-0">
        {[...Array(isMobile ? 5 : 15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-red-500/60 rounded-full animate-float-mobile ${isMobile && i > 3 ? "mobile-particles" : ""}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Subtle Hacker Effects */}
        {!isMobile && (
          <>
            {/* Code Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`code-${i}`}
                  className="absolute text-red-500/15 text-xs font-mono animate-code-scroll"
                  style={{
                    left: `${5 + i * 25}%`,
                    animationDelay: `${i * 2}s`,
                  }}
                >
                  <div>function validateInvictus() {"{"}</div>
                  <div>&nbsp;&nbsp;return elite.access;</div>
                  <div>{"}"}</div>
                </div>
              ))}
            </div>

            {/* Network Nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`node-${i}`}
                  className="absolute w-2 h-2 bg-red-500/30 rounded-full animate-network-pulse"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.7}s`,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Elegant Main Content */}
      <div className={`container mx-auto px-4 ${isMobile ? "py-4" : "py-8"} ${isMobile ? "max-w-full" : "max-w-5xl"}`}>
        <Card
          className={`border-2 border-red-500/40 shadow-2xl bg-black/60 backdrop-blur-md transition-all duration-1000 overflow-hidden relative ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-lg blur-sm animate-pulse-mobile"></div>

          <CardContent className={`${isMobile ? "p-6" : "p-12 md:p-16"} relative z-10`}>
            <form onSubmit={handleSubmit} className={`space-y-${isMobile ? "8" : "12"}`}>
              {/* Elegant Personal Data Section */}
              <div className={`space-y-${isMobile ? "6" : "8"}`}>
                <h2
                  className={`${isMobile ? "text-xl" : "text-3xl"} font-modern font-bold text-white border-b-2 border-red-500 pb-4 flex items-center gap-3 animate-slide-up-mobile`}
                >
                  <Zap className={`${isMobile ? "h-5 w-5" : "h-8 w-8"} text-red-500 animate-pulse-mobile`} />
                  Seus Dados Pessoais
                </h2>

                <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "md:grid-cols-2 gap-8"}`}>
                  <div className="space-y-3 animate-fade-in-mobile delay-mobile-100">
                    <Label
                      htmlFor="nome"
                      className={`${isMobile ? "text-base" : "text-lg"} font-modern font-semibold text-gray-200`}
                    >
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                      className={`${isMobile ? "h-14 text-base" : "h-16 text-lg"} border-2 border-red-500/40 focus:border-red-500 bg-black/60 text-white placeholder:text-gray-400 transition-all duration-300 focus-mobile mobile-button touch-action-manipulation font-modern rounded-lg`}
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="space-y-3 animate-fade-in-mobile delay-mobile-200">
                    <Label
                      htmlFor="email"
                      className={`${isMobile ? "text-base" : "text-lg"} font-modern font-semibold text-gray-200`}
                    >
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      id="input-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`${isMobile ? "h-14 text-base" : "h-16 text-lg"} border-2 border-red-500/40 focus:border-red-500 bg-black/60 text-white placeholder:text-gray-400 transition-all duration-300 focus-mobile mobile-button touch-action-manipulation font-modern rounded-lg`}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-3 animate-fade-in-mobile delay-mobile-300">
                  <Label
                    htmlFor="whatsapp"
                    className={`${isMobile ? "text-base" : "text-lg"} font-modern font-semibold text-gray-200`}
                  >
                    WhatsApp com DDD *
                  </Label>
                  <Input
                    id="whatsapp"
                    id="input-whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className={`${isMobile ? "h-14 text-base w-full" : "h-16 text-lg max-w-md"} border-2 border-red-500/40 focus:border-red-500 bg-black/60 text-white placeholder:text-gray-400 transition-all duration-300 focus-mobile mobile-button touch-action-manipulation font-modern rounded-lg`}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Elegant Questions Section */}
              <div className={`space-y-${isMobile ? "8" : "10"}`}>
                <h2
                  className={`${isMobile ? "text-xl" : "text-3xl"} font-modern font-bold text-white border-b-2 border-red-500 pb-4 flex items-center gap-3 animate-slide-up-mobile delay-mobile-400`}
                >
                  <Crown className={`${isMobile ? "h-5 w-5" : "h-8 w-8"} text-red-500 animate-pulse-mobile`} />
                  Avaliação Exclusiva
                </h2>

                {/* Elegant Question 1 */}
                <div className="space-y-5 animate-fade-in-mobile delay-mobile-500">
                  <Label className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-semibold text-white`}>
                    1. Qual sua experiência com Marketing Digital?
                  </Label>
                  <RadioGroup
                    value={formData.experiencia}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, experiencia: value }))}
                    className="space-y-4"
                  >
                    {[
                      "Nunca ouvi falar, tô começando do zero",
                      "Já tentei aprender, mas ainda não apliquei nada",
                      "Já tentei vender, mas não tive resultados",
                      "Já faço vendas, mas quero escalar",
                    ].map((option, index) => (
                      <div
                        key={option}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-xl border border-red-500/30 hover:border-red-500/60 bg-black/40 hover:bg-black/60 transition-all duration-300 group touch-action-manipulation mobile-button backdrop-blur-sm`}
                      >
                        <RadioGroupItem value={option} id={option} className="border-red-500/60 text-red-500 w-5 h-5" />
                        <Label
                          htmlFor={option}
                          className={`${isMobile ? "text-sm" : "text-base"} cursor-pointer flex-1 text-gray-200 group-hover:text-white transition-colors duration-300 font-modern leading-relaxed`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Elegant Question 2 */}
                <div className="space-y-5 animate-fade-in-mobile delay-mobile-500">
                  <Label className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-semibold text-white`}>
                    2. Você já tentou vender algum produto online?
                  </Label>
                  <RadioGroup
                    value={formData.vendaOnline}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, vendaOnline: value }))}
                    className="space-y-4"
                  >
                    {[
                      "Sim, já tentei, mas não tive vendas",
                      "Sim, já fiz algumas vendas",
                      "Não, nunca tentei vender nada",
                    ].map((option, index) => (
                      <div
                        key={option}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-xl border border-red-500/30 hover:border-red-500/60 bg-black/40 hover:bg-black/60 transition-all duration-300 group touch-action-manipulation mobile-button backdrop-blur-sm`}
                      >
                        <RadioGroupItem value={option} id={option} className="border-red-500/60 text-red-500 w-5 h-5" />
                        <Label
                          htmlFor={option}
                          className={`${isMobile ? "text-sm" : "text-base"} cursor-pointer flex-1 text-gray-200 group-hover:text-white transition-colors duration-300 font-modern leading-relaxed`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Elegant Question 3 */}
                <div className="space-y-5 animate-fade-in-mobile delay-mobile-500">
                  <Label className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-semibold text-white`}>
                    3. Com quais áreas do digital você já teve contato? (Múltipla escolha)
                  </Label>
                  <div className="space-y-4">
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
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-xl border border-red-500/30 hover:border-red-500/60 bg-black/40 hover:bg-black/60 transition-all duration-300 group touch-action-manipulation mobile-button backdrop-blur-sm`}
                      >
                        <Checkbox
                          id={area}
                          checked={formData.areasContato.includes(area)}
                          onCheckedChange={(checked) => handleAreasChange(area, checked as boolean)}
                          className="border-red-500/60 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 transition-all duration-300 w-5 h-5"
                        />
                        <Label
                          htmlFor={area}
                          className={`${isMobile ? "text-sm" : "text-base"} cursor-pointer flex-1 text-gray-200 group-hover:text-white transition-colors duration-300 font-modern leading-relaxed`}
                        >
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elegant Question 4 */}
                <div className="space-y-5 animate-fade-in-mobile delay-mobile-500">
                  <Label
                    htmlFor="impedimento"
                    className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-semibold text-white`}
                  >
                    4. O que está te impedindo de vencer hoje?
                  </Label>
                  <Textarea
                    id="impedimento"
                    value={formData.impedimento}
                    onChange={(e) => setFormData((prev) => ({ ...prev, impedimento: e.target.value }))}
                    className={`${isMobile ? "min-h-[120px] text-base" : "min-h-[140px] text-lg"} border-2 border-red-500/40 focus:border-red-500 bg-black/60 text-white placeholder:text-gray-400 transition-all duration-300 focus-mobile touch-action-manipulation font-modern rounded-lg leading-relaxed`}
                    placeholder="Descreva os principais obstáculos que você enfrenta..."
                  />
                </div>
              </div>

              {/* Submit Button - Fixed for Mobile */}
              <div className={`pt-${isMobile ? "8" : "10"} animate-fade-in-mobile delay-mobile-500`}>
                <Button
                  type="submit"
                  className={`w-full ${isMobile ? "h-16 px-4" : "h-20 px-8"} font-modern font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl transform transition-all duration-500 border-2 border-red-500 hover:border-red-400 group relative overflow-hidden mobile-button touch-action-manipulation tap-highlight-none active:animate-button-press rounded-xl ${!isMobile ? "hover:scale-105" : ""}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 to-red-600/40 rounded-xl blur-xl transition-all duration-500 animate-pulse-mobile"></div>
                  <div className="flex items-center justify-center w-full">
                    <Crown
                      className={`${isMobile ? "mr-2 h-4 w-4 flex-shrink-0" : "mr-4 h-6 w-6"} transition-all duration-300 relative z-10`}
                    />
                    <span
                      className={`relative z-10 tracking-wide text-center ${isMobile ? "text-sm leading-tight" : "text-xl"}`}
                    >
                      {isMobile ? "SOLICITAR ACESSO À COMUNIDADE" : "SOLICITAR ACESSO À COMUNIDADE INVICTUS"}
                    </span>
                    <Crown
                      className={`${isMobile ? "ml-2 h-4 w-4 flex-shrink-0" : "ml-4 h-6 w-6"} transition-all duration-300 relative z-10`}
                    />
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Elegant Footer */}
      <div className="bg-black/80 py-8 border-t border-red-500/30 relative backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative">
          <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-sm"} font-modern animate-fade-in-mobile`}>
            © 2024 Invictus Quiz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
