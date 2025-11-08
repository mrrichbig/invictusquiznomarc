"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Crown, Zap } from "lucide-react"

export default function Aprovado() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const timer = setTimeout(() => setIsVisible(true), 300)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <div
      className={`min-h-screen bg-cyber-gradient ${isMobile ? "flex flex-col justify-center items-center py-8" : "flex items-center justify-center"} p-4 relative overflow-hidden`}
    >
      {/* Enhanced Cyber Background Effects */}
      <div className="absolute inset-0">
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

        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-cyber-green/30 text-xs font-mono animate-cyber-fade-up delay-cyber-200">
              [ACCESS GRANTED]
            </div>
            <div className="absolute bottom-1/3 right-1/4 text-cyber-blue/30 text-xs font-mono animate-cyber-fade-up delay-cyber-400">
              [ELITE MEMBER]
            </div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green/20 to-transparent animate-cyber-data-flow"></div>
          </div>
        )}
      </div>

      <Card
        className={`${isMobile ? "max-w-lg w-full" : "max-w-3xl w-full"} cyber-border-glow bg-cyber-gradient-card backdrop-blur-xl transition-all duration-1500 relative overflow-hidden hover-cyber-glow animate-cyber-entrance ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-red/10 via-transparent to-cyber-blue/5"></div>

        <CardContent className={`${isMobile ? "p-8" : "p-16"} text-center relative z-10`}>
          {/* Enhanced Icon */}
          <div className={`${isMobile ? "mb-8" : "mb-10"}`}>
            <div className="relative inline-block animate-cyber-success delay-cyber-200">
              <div className="absolute -inset-6 bg-cyber-red/20 rounded-full blur-2xl animate-cyber-glow-pulse"></div>
              <Send
                className={`${isMobile ? "h-16 w-16" : "h-24 w-24"} text-red-500 mx-auto drop-shadow-2xl transition-transform duration-500 hover:scale-110 hover-cyber-lift relative z-10 cyber-text-glow`}
              />
            </div>
          </div>

          {/* Enhanced Title */}
          <h1
            className={`${isMobile ? "text-3xl mb-6" : "text-5xl mb-8"} font-modern font-bold text-cyber-gray-100 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            } cyber-text-glow animate-cyber-slide-in delay-cyber-300 flex items-center justify-center gap-4`}
          >
            <Zap className={`${isMobile ? "h-8 w-8" : "h-12 w-12"} text-red-500 animate-cyber-glow-pulse`} />
            BEM-VINDO À ELITE
          </h1>

          {/* Enhanced Main Message */}
          <div
            className={`space-y-6 ${isMobile ? "mb-10" : "mb-12"} transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <p
              className={`${isMobile ? "text-lg leading-relaxed" : "text-2xl leading-relaxed"} font-modern text-cyber-gray-200 animate-cyber-slide-in delay-cyber-400`}
            >
              A comunidade <span className="text-cyber-gray-100 font-semibold">FREE</span> da Invictus no Telegram é
              onde tudo começa.
            </p>

            <p
              className={`${isMobile ? "text-base leading-relaxed" : "text-xl leading-relaxed"} font-modern text-cyber-gray-300 animate-cyber-slide-in delay-cyber-500`}
            >
              Fique atento à{" "}
              <span className="text-cyber-red font-bold cyber-text-glow hover:animate-cyber-typing cursor-default">
                área de avisos
              </span>
              .
            </p>

            <p
              className={`${isMobile ? "text-lg leading-relaxed" : "text-2xl leading-relaxed"} font-modern text-cyber-gray-200 animate-cyber-slide-in delay-cyber-600`}
            >
              Os escolhidos saberão quando chegar a hora.
            </p>
          </div>

          {/* Enhanced Exclusive Message */}
          <div
            className={`bg-cyber-card/60 rounded-xl ${isMobile ? "p-6 mb-10" : "p-10 mb-12"} cyber-border-glow relative overflow-hidden transition-all duration-1500 delay-700 backdrop-blur-sm hover:cyber-glow-intense group hover-cyber-lift animate-cyber-fade-up delay-cyber-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-red to-transparent"></div>

            <Crown
              className={`${isMobile ? "h-10 w-10" : "h-14 w-14"} text-red-500 mx-auto mb-6 cyber-text-glow animate-cyber-glow-pulse hover:animate-cyber-typing cursor-default`}
            />

            <h3
              className={`${isMobile ? "text-xl mb-4" : "text-3xl mb-6"} font-modern font-bold text-cyber-gray-100 cyber-text-glow`}
            >
              O jogo mudou.
            </h3>

            <p className={`${isMobile ? "text-base" : "text-xl"} text-cyber-gray-300 font-modern leading-relaxed`}>
              Você não está mais jogando o jogo deles.
              <br />
              Agora você faz parte de quem define as regras.
            </p>
          </div>

          {/* Enhanced CTA Button */}
          <div
            className={`transition-all duration-1500 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="animate-cyber-scale-in delay-cyber-800">
              <Button
                asChild
                className={`group ${isMobile ? "h-16 px-8 text-base w-full" : "h-20 px-16 text-xl"} font-modern font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white shadow-2xl transform transition-all duration-500 cyber-border-glow relative overflow-hidden ${!isMobile ? "hover:scale-105 hover-cyber-lift" : ""} rounded-xl animate-cyber-button-ready hover-cyber-glow active:animate-cyber-click`}
              >
                <a
                  href="https://t.me/+your_telegram_group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-4"
                >
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-cyber-glow-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <Send
                    className={`${isMobile ? "h-6 w-6" : "h-8 w-8"} transition-all duration-300 group-hover:animate-cyber-typing relative z-10`}
                  />
                  <span className="tracking-wide relative z-10">ENTRAR NA ORDEM INVICTUS</span>
                </a>
              </Button>
            </div>

            <p
              className={`${isMobile ? "text-xs mt-4" : "text-sm mt-6"} text-cyber-gray-500 font-modern animate-cyber-fade-up delay-cyber-600`}
            >
              O link expira em 24 horas. Não perca sua chance.
            </p>
          </div>

          {/* Enhanced Achievement Badge */}
          <div
            className={`mt-12 inline-block transition-all duration-1500 delay-900 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              className={`bg-cyber-card/60 rounded-full ${isMobile ? "px-6 py-3" : "px-10 py-4"} cyber-border-glow relative overflow-hidden backdrop-blur-sm hover:cyber-glow-intense transition-all duration-500 hover-cyber-lift animate-cyber-scale-in delay-cyber-700 cursor-default group`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-red/0 via-cyber-red/10 to-cyber-red/0 group-hover:via-cyber-red/20 transition-all duration-500"></div>
              <span
                className={`text-cyber-red font-modern font-bold ${isMobile ? "text-xs" : "text-sm"} tracking-wider cyber-text-glow group-hover:animate-cyber-typing relative z-10`}
              >
                STATUS: INVICTO CONFIRMADO
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
