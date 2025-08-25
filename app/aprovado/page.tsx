"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Target, Sparkles } from "lucide-react"

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
      className={`min-h-screen ${isMobile ? "mobile-bg-simple" : "bg-gradient-to-br from-black via-red-950 to-black"} ${isMobile ? "flex flex-col justify-start items-center py-4" : "flex items-center justify-center"} p-4 relative overflow-hidden ${isMobile ? "pt-4" : "pt-8"}`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Floating particles with varied sizes */}
        {[...Array(isMobile ? 12 : 30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float-mobile ${
              i % 3 === 0
                ? "w-2 h-2 bg-red-500/60"
                : i % 3 === 1
                  ? "w-1 h-1 bg-red-400/40"
                  : "w-1.5 h-1.5 bg-red-300/50"
            } ${isMobile && i > 8 ? "mobile-particles" : ""}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Elegant floating geometric shapes */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={`shape-${i}`}
                className={`absolute border border-red-500/20 animate-float-rotate ${
                  i % 2 === 0 ? "w-8 h-8 rotate-45" : "w-6 h-6 rotate-12"
                }`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Success Binary - Clean version */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-red-500/15 text-xs font-mono animate-binary-flow">
              SUCCESS_APPROVED_INVICTUS
            </div>
            <div
              className="absolute bottom-1/3 right-1/4 text-red-400/15 text-xs font-mono animate-binary-flow"
              style={{ animationDelay: "2s" }}
            >
              ELITE_ACCESS_GRANTED
            </div>
          </div>
        )}

        {/* Elegant glowing orbs */}
        {!isMobile && (
          <>
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse-mobile"></div>
            <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-pulse-mobile delay-mobile-500"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-red-600/15 rounded-full blur-xl animate-pulse-mobile delay-1000"></div>
          </>
        )}
      </div>

      <Card
        className={`${isMobile ? "max-w-md w-full mt-4" : "max-w-3xl"} w-full border-2 border-red-500/60 shadow-2xl bg-black/70 backdrop-blur-md transition-all duration-1500 relative overflow-hidden ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 via-red-600/5 to-transparent"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/40 via-red-400/40 to-red-600/40 rounded-lg blur-sm animate-pulse-mobile"></div>

        <CardContent className={`${isMobile ? "p-8" : "p-12 md:p-16"} text-center relative z-10`}>
          {/* Enhanced Success Icon */}
          <div className={`${isMobile ? "mb-8" : "mb-12"}`}>
            <div className="relative inline-block group">
              <div className="absolute -inset-12 bg-gradient-to-r from-red-500/30 via-red-600/20 to-red-500/30 rounded-full blur-3xl animate-pulse-mobile"></div>
              <div className="absolute -inset-8 bg-gradient-to-r from-red-400/40 to-red-600/40 rounded-full blur-2xl animate-pulse-mobile delay-500"></div>
              <CheckCircle
                className={`${isMobile ? "h-20 w-20" : "h-28 w-28"} text-green-500 mx-auto animate-success-mobile drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500`}
              />
              <Sparkles
                className={`absolute -top-2 -right-2 ${isMobile ? "h-6 w-6" : "h-8 w-8"} text-yellow-400 animate-star-twinkle`}
              />
            </div>
          </div>

          {/* Enhanced Title */}
          <h1
            className={`${isMobile ? "text-3xl" : "text-4xl md:text-5xl"} font-modern font-bold text-white mb-8 transition-all duration-1000 delay-mobile-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            } text-elegant-shadow`}
          >
            PARABÉNS, INVICTO!
          </h1>

          {/* Enhanced Code Reveal with Typewriter */}
          <div
            className={`${isMobile ? "mb-8" : "mb-12"} transition-all duration-1500 delay-mobile-400 ${
              showCode ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              className={`bg-gradient-to-r from-red-500/20 via-red-600/10 to-red-700/20 rounded-xl ${isMobile ? "p-6" : "p-8"} border border-red-500/50 relative overflow-hidden backdrop-blur-sm group hover:border-red-400/70 transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3
                className={`${isMobile ? "text-lg" : "text-xl"} font-modern font-bold text-white mb-3 relative z-10 flex items-center justify-center gap-2`}
              >
                <Target className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-red-500 animate-pulse-mobile`} />
                SEU CÓDIGO INVICTO
              </h3>

              <div
                className={`${isMobile ? "text-2xl" : "text-3xl"} font-mono font-bold text-red-400 tracking-wider relative z-10 text-hacker-glow group-hover:text-red-300 transition-colors duration-500`}
              >
                {showTypewriter ? typewriterCode : codigoInvicto}
                {showTypewriter && typewriterCode.length < codigoInvicto.length && (
                  <span className="animate-blink-mobile">|</span>
                )}
              </div>

              <p
                className={`${isMobile ? "text-sm" : "text-base"} text-gray-400 mt-3 relative z-10 font-modern group-hover:text-gray-300 transition-colors duration-500`}
              >
                Guarde este código, ele é único e individual
              </p>
            </div>
          </div>

          {/* Enhanced Message */}
          <div
            className={`space-y-6 ${isMobile ? "mb-8" : "mb-12"} transition-all duration-1000 delay-mobile-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p className={`${isMobile ? "text-lg" : "text-xl"} font-modern text-gray-200 leading-relaxed`}>
              Suas respostas foram registradas e serão analisadas pela{" "}
              <span className="text-red-400 font-bold animate-pulse-mobile bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                Equipe Invictus
              </span>
              .
            </p>

            <p className={`${isMobile ? "text-base" : "text-lg"} font-modern text-gray-300 leading-relaxed`}>
              Em breve entraremos em contato através do seu{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                email
              </span>{" "}
              informando se você foi aprovado ou não.
            </p>
          </div>

          {/* Enhanced Benefits */}
          <div
            className={`bg-gradient-to-br from-red-950/30 via-red-900/10 to-red-950/30 rounded-xl ${isMobile ? "p-6 mb-8" : "p-8 mb-12"} border border-red-500/30 relative overflow-hidden transition-all duration-1500 delay-mobile-500 backdrop-blur-sm hover:border-red-400/50 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <h3
              className={`${isMobile ? "text-xl" : "text-2xl"} font-modern font-bold text-white mb-6 flex items-center justify-center gap-3 relative z-10`}
            >
              <Star className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-red-500 animate-pulse-mobile`} />O que você
              pode receber:
            </h3>

            <ul className={`text-left space-y-4 text-gray-200 relative z-10 ${isMobile ? "text-base" : "text-lg"}`}>
              {[
                "Acesso restrito à Comunidade Invictus",
                "Estratégias de domínio em Marketing Digital",
                "Networking com mentes fora da curva",
                "Suporte da elite por trás do jogo",
              ].map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 group/item animate-fade-in-mobile font-modern leading-relaxed hover:bg-red-500/10 rounded-lg p-2 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <CheckCircle
                    className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-green-500 flex-shrink-0 animate-pulse-mobile group-hover/item:scale-110 transition-transform duration-300`}
                  />
                  <span className="group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Next Steps */}
          <div
            className={`space-y-8 transition-all duration-1500 delay-mobile-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div
              className={`bg-gradient-to-r from-red-500/15 via-red-600/5 to-red-700/15 rounded-xl ${isMobile ? "p-5" : "p-6"} border border-red-500/40 relative overflow-hidden backdrop-blur-sm group hover:border-red-400/60 transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <Target
                className={`${isMobile ? "h-6 w-6" : "h-7 w-7"} text-red-500 mx-auto mb-3 animate-pulse-mobile relative z-10 group-hover:scale-110 transition-transform duration-300`}
              />
              <p
                className={`${isMobile ? "text-sm" : "text-base"} text-gray-300 relative z-10 font-modern leading-relaxed group-hover:text-white transition-colors duration-300`}
              >
                Aguarde nosso contato. A análise das respostas pode levar até 24 horas.
              </p>
            </div>
          </div>

          {/* Enhanced Achievement Badge */}
          <div
            className={`mt-8 inline-block transition-all duration-1500 delay-mobile-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              className={`bg-gradient-to-r from-red-500/25 via-red-600/10 to-red-700/25 rounded-full ${isMobile ? "px-6 py-3" : "px-8 py-4"} border border-red-500/60 relative overflow-hidden backdrop-blur-sm group hover:border-red-400/80 transition-all duration-500 hover:scale-105`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <span
                className={`text-red-400 font-modern font-bold ${isMobile ? "text-sm" : "text-base"} relative z-10 animate-glow-mobile tracking-wide group-hover:text-red-300 transition-colors duration-300`}
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
