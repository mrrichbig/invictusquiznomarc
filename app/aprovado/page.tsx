"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Target, Instagram } from "lucide-react"

export default function Aprovado() {
  const [isVisible, setIsVisible] = useState(false)
  const [codigoInvicto, setCodigoInvicto] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [typewriterCode, setTypewriterCode] = useState("")
  const [showTypewriter, setShowTypewriter] = useState(false)

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const timer = setTimeout(() => setIsVisible(true), 300)

    const gerarCodigoInvicto = () => {
      const prefixo = "INV"
      const numeros = Math.floor(Math.random() * 9000) + 1000
      const letras = Math.random().toString(36).substring(2, 5).toUpperCase()
      return `${prefixo}-${numeros}-${letras}`
    }

    const codigo = gerarCodigoInvicto()
    setCodigoInvicto(codigo)

    const codeTimer = setTimeout(() => {
      setShowCode(true)
      setShowTypewriter(true)

      // Typewriter effect for code
      let i = 0
      const typeInterval = setInterval(() => {
        if (i <= codigo.length) {
          setTypewriterCode(codigo.slice(0, i))
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 100)
    }, 1500)

    return () => {
      clearTimeout(timer)
      clearTimeout(codeTimer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <div
      className={`min-h-screen bg-cyber-gradient ${isMobile ? "flex flex-col justify-start items-center py-4" : "flex items-center justify-center"} p-4 relative overflow-hidden ${isMobile ? "pt-4" : "pt-8"}`}
    >
      {/* Enhanced Cyber Background Effects */}
      <div className="absolute inset-0">
        {/* Refined floating particles with entrance animation */}
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0
                ? "w-1 h-1 bg-cyber-red/40"
                : i % 3 === 1
                  ? "w-0.5 h-0.5 bg-cyber-blue/30"
                  : "w-1.5 h-1.5 bg-cyber-green/25"
            } animate-cyber-entrance`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4 + 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
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
            <div className="absolute top-1/4 left-1/4 text-cyber-green/30 text-xs font-mono animate-cyber-fade-up delay-cyber-200">
              [SUCCESS]
            </div>
            <div className="absolute bottom-1/3 right-1/4 text-cyber-blue/30 text-xs font-mono animate-cyber-fade-up delay-cyber-400">
              [APPROVED]
            </div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/20 to-transparent animate-cyber-data-flow"></div>
          </div>
        )}
      </div>

      <Card
        className={`${isMobile ? "max-w-md w-full mt-4" : "max-w-2xl"} w-full cyber-border-glow bg-cyber-gradient-card backdrop-blur-xl transition-all duration-1500 relative overflow-hidden hover-cyber-glow animate-cyber-entrance ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/5 to-transparent"></div>

        <CardContent className={`${isMobile ? "p-8" : "p-12"} text-center relative z-10`}>
          {/* Enhanced Success Icon */}
          <div className={`${isMobile ? "mb-8" : "mb-10"}`}>
            <div className="relative inline-block animate-cyber-success delay-cyber-200">
              <div className="absolute -inset-4 bg-cyber-green/20 rounded-full blur-xl animate-cyber-glow-pulse"></div>
              <CheckCircle
                className={`${isMobile ? "h-16 w-16" : "h-20 w-20"} text-red-500 mx-auto drop-shadow-lg transition-transform duration-500 hover:scale-110 hover-cyber-lift relative z-10 cyber-text-glow`}
              />
            </div>
          </div>

          {/* Enhanced Title */}
          <h1
            className={`${isMobile ? "text-xl" : "text-3xl"} font-modern font-bold text-cyber-gray-100 mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            } cyber-text-glow animate-cyber-slide-in delay-cyber-300`}
          >
            PARABÉNS, INVICTO!
          </h1>

          {/* Enhanced Code Display */}
          <div
            className={`${isMobile ? "mb-8" : "mb-10"} transition-all duration-1500 delay-400 ${
              showCode ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              className={`bg-cyber-card rounded-lg ${isMobile ? "p-6" : "p-8"} cyber-border-glow relative overflow-hidden backdrop-blur-sm hover:cyber-glow-intense transition-all duration-500 hover-cyber-lift animate-cyber-scale-in delay-cyber-400`}
            >
              <h3
                className={`${isMobile ? "text-sm" : "text-lg"} font-modern font-semibold text-cyber-gray-200 mb-3 flex items-center justify-center gap-2`}
              >
                <Target
                  className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-red-500 cyber-text-glow animate-cyber-glow-pulse flex-shrink-0`}
                />
                <span className={`${isMobile ? "text-sm" : ""}`}>SEU CÓDIGO INVICTO</span>
              </h3>

              <div
                className={`${isMobile ? "text-lg" : "text-2xl"} font-mono font-bold text-cyber-red tracking-wider cyber-text-glow hover:animate-cyber-typing cursor-default`}
              >
                {showTypewriter ? typewriterCode : codigoInvicto}
                {showTypewriter && typewriterCode.length < codigoInvicto.length && (
                  <span className="animate-blink-mobile">|</span>
                )}
              </div>

              <p className={`${isMobile ? "text-xs" : "text-sm"} text-cyber-gray-400 mt-3 font-modern`}>
                Guarde este código, ele é único e individual
              </p>
            </div>
          </div>

          {/* Enhanced Message */}
          <div
            className={`space-y-4 ${isMobile ? "mb-8" : "mb-10"} transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p
              className={`${isMobile ? "text-sm leading-relaxed" : "text-lg"} font-modern text-cyber-gray-200 animate-cyber-slide-in delay-cyber-500`}
            >
              Suas respostas foram registradas e serão analisadas pela{" "}
              <span className="text-cyber-red font-semibold cyber-text-glow hover:animate-cyber-typing cursor-default">
                Equipe Invictus
              </span>
              .
            </p>

            <p
              className={`${isMobile ? "text-sm leading-relaxed" : "text-base"} font-modern text-cyber-gray-300 animate-cyber-slide-in delay-cyber-600`}
            >
              Em breve entraremos em contato através do seu{" "}
              <span className="text-cyber-gray-100 font-semibold hover:text-cyber-red transition-colors duration-300 cursor-default">
                email
              </span>{" "}
              informando se você foi aprovado ou não.
            </p>
          </div>

          {/* Enhanced Benefits */}
          <div
            className={`bg-cyber-card/60 rounded-lg ${isMobile ? "p-6 mb-8" : "p-8 mb-10"} cyber-border-glow relative overflow-hidden transition-all duration-1500 delay-500 backdrop-blur-sm hover:cyber-glow group hover-cyber-lift animate-cyber-fade-up delay-cyber-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h3
              className={`${isMobile ? "text-base" : "text-xl"} font-modern font-semibold text-cyber-gray-100 mb-6 flex items-center justify-center gap-2`}
            >
              <Star
                className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-red-500 cyber-text-glow animate-cyber-glow-pulse flex-shrink-0`}
              />
              <span className={`${isMobile ? "text-sm" : ""}`}>O que você pode receber:</span>
            </h3>

            <ul className={`text-left space-y-3 text-cyber-gray-200 ${isMobile ? "text-sm" : "text-base"}`}>
              {[
                "Acesso restrito à Comunidade Invictus",
                "Estratégias de domínio em Marketing Digital",
                "Networking com mentes fora da curva",
                "Suporte da elite por trás do jogo",
              ].map((benefit, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 font-modern leading-relaxed hover:text-cyber-gray-100 transition-colors duration-300 cursor-default hover-cyber-lift animate-cyber-slide-in`}
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <CheckCircle
                    className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-red-500 flex-shrink-0 cyber-text-glow hover:animate-cyber-typing`}
                  />
                  <span className={`${isMobile ? "text-sm leading-relaxed" : ""}`}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Instagram Section */}
          <div
            className={`space-y-4 ${isMobile ? "mb-8" : "mb-10"} transition-all duration-1500 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p
              className={`${isMobile ? "text-sm" : "text-base"} text-cyber-gray-300 font-modern animate-cyber-fade-up delay-cyber-600`}
            >
              Enquanto você espera, aproveita pra dar uma olhada no nosso Insta:
            </p>

            <div className="animate-cyber-scale-in delay-cyber-700">
              <Button
                asChild
                variant="outline"
                className={`${isMobile ? "h-12 px-6" : "h-14 px-8"} bg-cyber-card cyber-border-glow text-cyber-gray-200 hover:bg-cyber-card/80 hover:text-cyber-gray-100 transition-all duration-300 font-modern rounded-lg backdrop-blur-sm hover:cyber-glow group hover-cyber-lift active:animate-cyber-click`}
              >
                <a
                  href="https://www.instagram.com/aordeminvictus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Instagram
                    className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-red-500 group-hover:text-red-400 transition-colors duration-300 group-hover:animate-cyber-typing flex-shrink-0`}
                  />
                  <span className="group-hover:cyber-text-glow transition-all duration-300">@aordeminvictus</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Enhanced Next Steps */}
          <div
            className={`transition-all duration-1500 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div
              className={`bg-cyber-card/40 rounded-lg ${isMobile ? "p-5" : "p-6"} cyber-border-glow relative overflow-hidden backdrop-blur-sm hover:cyber-glow transition-all duration-500 hover-cyber-lift animate-cyber-fade-up delay-cyber-800`}
            >
              <Target
                className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-red-500 mx-auto mb-3 cyber-text-glow animate-cyber-glow-pulse hover:animate-cyber-typing cursor-default`}
              />
              <p className={`${isMobile ? "text-xs leading-relaxed" : "text-sm"} text-cyber-gray-300 font-modern`}>
                Aguarde nosso contato. A análise das respostas pode levar até 24 horas.
              </p>
            </div>
          </div>

          {/* Enhanced Achievement Badge */}
          <div
            className={`mt-8 inline-block transition-all duration-1500 delay-800 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              className={`bg-cyber-card/60 rounded-full ${isMobile ? "px-6 py-3" : "px-8 py-4"} cyber-border-glow relative overflow-hidden backdrop-blur-sm hover:cyber-glow transition-all duration-500 hover-cyber-lift animate-cyber-scale-in delay-cyber-700 cursor-default`}
            >
              <span
                className={`text-cyber-red font-modern font-semibold ${isMobile ? "text-xs" : "text-sm"} tracking-wide cyber-text-glow hover:animate-cyber-typing`}
              >
                QUIZ CONCLUÍDO - AGUARDANDO ANÁLISE
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
