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
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden pt-8`}>
      {/* Clean Background Effects */}
      <div className="absolute inset-0">
        {/* Minimal floating particles */}
        {[...Array(isMobile ? 5 : 12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 2 === 0 ? "w-1 h-1 bg-red-500/40" : "w-0.5 h-0.5 bg-red-400/30"
            } animate-float-mobile`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Clean geometric grid */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Clean Main Content */}
      <div className={`container mx-auto px-4 ${isMobile ? "py-4" : "py-8"} ${isMobile ? "max-w-full" : "max-w-4xl"}`}>
        <Card
          className={`border border-gray-700/50 shadow-2xl bg-gray-900/80 backdrop-blur-xl transition-all duration-1000 overflow-hidden relative ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>

          <CardContent className={`${isMobile ? "p-6" : "p-12"} relative z-10`}>
            <form onSubmit={handleSubmit} className={`space-y-${isMobile ? "8" : "10"}`}>
              {/* Clean Personal Data Section */}
              <div className={`space-y-${isMobile ? "6" : "8"}`}>
                <h2
                  className={`${isMobile ? "text-xl" : "text-2xl"} font-modern font-bold text-white border-b border-gray-600/50 pb-4 flex items-center gap-3`}
                >
                  <Zap className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-red-500`} />
                  Seus Dados Pessoais
                </h2>

                <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "md:grid-cols-2 gap-8"}`}>
                  <div className="space-y-3">
                    <Label
                      htmlFor="nome"
                      className={`${isMobile ? "text-base" : "text-lg"} font-modern font-semibold text-gray-300`}
                    >
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData((prev) => ({ ...prev, nome: e.target.value }))}
                      className={`${isMobile ? "h-12 text-base" : "h-14 text-lg"} border border-gray-600/50 focus:border-red-500/70 bg-gray-800/60 text-white placeholder:text-gray-500 transition-all duration-300 font-modern rounded-lg backdrop-blur-sm`}
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className={`${isMobile ? "text-base" : "text-lg"} font-modern font-semibold text-gray-300`}
                    >
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`${isMobile ? "h-12 text-base" : "h-14 text-lg"} border border-gray-600/50 focus:border-red-500/70 bg-gray-800/60 text-white placeholder:text-gray-500 transition-all duration-300 font-modern rounded-lg backdrop-blur-sm`}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="whatsapp"
                    className={`${isMobile ? "text-base" : "text-lg"} font-modern font-semibold text-gray-300`}
                  >
                    WhatsApp com DDD *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className={`${isMobile ? "h-12 text-base w-full" : "h-14 text-lg max-w-md"} border border-gray-600/50 focus:border-red-500/70 bg-gray-800/60 text-white placeholder:text-gray-500 transition-all duration-300 font-modern rounded-lg backdrop-blur-sm`}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Clean Questions Section */}
              <div className={`space-y-${isMobile ? "8" : "10"}`}>
                <h2
                  className={`${isMobile ? "text-xl" : "text-2xl"} font-modern font-bold text-white border-b border-gray-600/50 pb-4 flex items-center gap-3`}
                >
                  <Crown className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-red-500`} />
                  Avaliação Exclusiva
                </h2>

                {/* Clean Question 1 */}
                <div className="space-y-4">
                  <Label className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-semibold text-white`}>
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
                    ].map((option) => (
                      <div
                        key={option}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-lg border border-gray-600/50 hover:border-gray-500/70 bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-300 backdrop-blur-sm`}
                      >
                        <RadioGroupItem
                          value={option}
                          id={option}
                          className="border-gray-500/60 text-red-500 w-5 h-5"
                        />
                        <Label
                          htmlFor={option}
                          className={`${isMobile ? "text-sm" : "text-base"} cursor-pointer flex-1 text-gray-300 hover:text-white transition-colors duration-300 font-modern leading-relaxed`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Clean Question 2 */}
                <div className="space-y-4">
                  <Label className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-semibold text-white`}>
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
                    ].map((option) => (
                      <div
                        key={option}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-lg border border-gray-600/50 hover:border-gray-500/70 bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-300 backdrop-blur-sm`}
                      >
                        <RadioGroupItem
                          value={option}
                          id={option}
                          className="border-gray-500/60 text-red-500 w-5 h-5"
                        />
                        <Label
                          htmlFor={option}
                          className={`${isMobile ? "text-sm" : "text-base"} cursor-pointer flex-1 text-gray-300 hover:text-white transition-colors duration-300 font-modern leading-relaxed`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Clean Question 3 */}
                <div className="space-y-4">
                  <Label className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-semibold text-white`}>
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
                    ].map((area) => (
                      <div
                        key={area}
                        className={`flex items-center space-x-4 ${isMobile ? "p-4" : "p-5"} rounded-lg border border-gray-600/50 hover:border-gray-500/70 bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-300 backdrop-blur-sm`}
                      >
                        <Checkbox
                          id={area}
                          checked={formData.areasContato.includes(area)}
                          onCheckedChange={(checked) => handleAreasChange(area, checked as boolean)}
                          className="border-gray-500/60 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 transition-all duration-300 w-5 h-5"
                        />
                        <Label
                          htmlFor={area}
                          className={`${isMobile ? "text-sm" : "text-base"} cursor-pointer flex-1 text-gray-300 hover:text-white transition-colors duration-300 font-modern leading-relaxed`}
                        >
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clean Question 4 */}
                <div className="space-y-4">
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
                    className={`${isMobile ? "min-h-[120px] text-base" : "min-h-[140px] text-lg"} border border-gray-600/50 focus:border-red-500/70 bg-gray-800/60 text-white placeholder:text-gray-500 transition-all duration-300 font-modern rounded-lg leading-relaxed backdrop-blur-sm`}
                    placeholder="Descreva os principais obstáculos que você enfrenta..."
                  />
                </div>
              </div>

              {/* Clean Submit Button */}
              <div className={`pt-${isMobile ? "8" : "10"}`}>
                <Button
                  type="submit"
                  className={`w-full ${isMobile ? "h-14 px-4" : "h-16 px-8"} font-modern font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl transform transition-all duration-500 border border-red-500/50 hover:border-red-400/70 group relative overflow-hidden ${!isMobile ? "hover:scale-105" : ""} rounded-lg`}
                >
                  <div className="flex items-center justify-center w-full">
                    <Crown
                      className={`${isMobile ? "mr-2 h-4 w-4 flex-shrink-0" : "mr-4 h-5 w-5"} transition-all duration-300 relative z-10`}
                    />
                    <span
                      className={`relative z-10 tracking-wide text-center ${isMobile ? "text-sm leading-tight" : "text-lg"}`}
                    >
                      {isMobile ? "SOLICITAR ACESSO À COMUNIDADE" : "SOLICITAR ACESSO À COMUNIDADE INVICTUS"}
                    </span>
                    <Crown
                      className={`${isMobile ? "ml-2 h-4 w-4 flex-shrink-0" : "ml-4 h-5 w-5"} transition-all duration-300 relative z-10`}
                    />
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Clean Footer */}
      <div className="bg-gray-900/60 py-6 border-t border-gray-700/30 relative backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center relative">
          <p className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"} font-modern`}>
            © 2024 Invictus Quiz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
