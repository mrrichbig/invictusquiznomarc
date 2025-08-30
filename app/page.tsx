"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Crown, Zap } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false)

  const socialProofs = [
    {
      name: "Sasuke U.",
      avatar: "/anime-ninja-character-with-dark-hair.png",
      comment: "Isso aqui é de outro nível... nunca vi nada igual na internet",
    },
    {
      name: "Marcus V.",
      avatar: "/professional-gamer-with-headset.png",
      comment: "O conteúdo que está aqui não existe em lugar nenhum",
    },
    {
      name: "Akira T.",
      avatar: "/anime-character-with-spiky-hair.png",
      comment: "Passei no teste e minha vida mudou completamente",
    },
    {
      name: "Diego R.",
      avatar: "/young-man-with-confident-expression.png",
      comment: "Finalmente encontrei o que procurava há anos",
    },
    {
      name: "Natsu D.",
      avatar: "/pink-haired-anime-character.png",
      comment: "Esse acesso vale mais que qualquer curso por aí",
    },
    {
      name: "Rafael S.",
      avatar: "/esports-player-with-gaming-setup.png",
      comment: "O segredo que os 97% nunca vão descobrir",
    },
    {
      name: "Ichigo K.",
      avatar: "/anime-character-with-orange-hair.png",
      comment: "Informações que mudaram minha perspectiva para sempre",
    },
    {
      name: "Carlos M.",
      avatar: "/businessman-with-serious-look.png",
      comment: "Agora entendo porque é acesso restrito",
    },
    {
      name: "Goku S.",
      avatar: "/anime-character-with-spiky-black-hair.png",
      comment: "O poder que estava escondido finalmente revelado",
    },
    {
      name: "Bruno L.",
      avatar: "/tech-professional-glasses.png",
      comment: "Conteúdo exclusivo que não pode ser comprado",
    },
  ]

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Splash screen sequence
    const splashTimer = setTimeout(() => {
      setLogoAnimationComplete(true)
    }, 3000)

    const hideTimer = setTimeout(() => {
      setShowSplash(false)
    }, 5000)

    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, 5500)

    return () => {
      clearTimeout(splashTimer)
      clearTimeout(hideTimer)
      clearTimeout(visibilityTimer)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    if (!showSplash) {
      const animatedTexts = ["acesso restrito"]
      const text = animatedTexts[0]
      setIsTyping(true)
      setTypingText("")

      let i = 0
      const typing = setInterval(
        () => {
          if (i < text.length) {
            setTypingText(text.slice(0, i + 1))
            i++
          } else {
            clearInterval(typing)
            setIsTyping(false)
          }
        },
        isMobile ? 80 : 100,
      )

      return () => clearInterval(typing)
    }
  }, [showSplash, isMobile])

  const handleStartQuiz = () => {
    // Add haptic feedback on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(50)
    }
    router.push("/quiz")
  }

  const SocialProofCarousel = () => {
    const firstRow = socialProofs.slice(0, 5)
    const secondRow = socialProofs.slice(5, 10)

    return (
      <div className={`${isMobile ? "mt-4 mb-4" : "mt-8 mb-8"} overflow-hidden relative`}>
        <div className="space-y-2">
          {/* Primeira linha - rolando para direita */}
          <div className="flex animate-scroll-right whitespace-nowrap">
            {[...firstRow, ...firstRow, ...firstRow].map((proof, index) => (
              <div
                key={`row1-${index}`}
                className={`flex-shrink-0 ${isMobile ? "w-48 mx-1" : "w-64 mx-2"} bg-cyber-darker/80 backdrop-blur-sm border border-red-900/30 rounded-lg ${isMobile ? "p-2" : "p-3"} cyber-border-glow`}
              >
                <div className="flex items-start space-x-2">
                  <img
                    src={proof.avatar || "/placeholder.svg"}
                    alt={proof.name}
                    className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} rounded-full border-2 border-red-800/50 flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-modern font-semibold text-red-400 ${isMobile ? "text-xs" : "text-sm"} mb-1 truncate`}
                    >
                      {proof.name}
                    </div>
                    <div
                      className={`text-cyber-gray-300 ${isMobile ? "text-xs leading-tight" : "text-sm leading-relaxed"} line-clamp-2`}
                    >
                      "{proof.comment}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Segunda linha - rolando para esquerda */}
          <div className="flex animate-scroll-left whitespace-nowrap">
            {[...secondRow, ...secondRow, ...secondRow].map((proof, index) => (
              <div
                key={`row2-${index}`}
                className={`flex-shrink-0 ${isMobile ? "w-48 mx-1" : "w-64 mx-2"} bg-cyber-darker/80 backdrop-blur-sm border border-red-900/30 rounded-lg ${isMobile ? "p-2" : "p-3"} cyber-border-glow`}
              >
                <div className="flex items-start space-x-2">
                  <img
                    src={proof.avatar || "/placeholder.svg"}
                    alt={proof.name}
                    className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} rounded-full border-2 border-red-800/50 flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-modern font-semibold text-red-400 ${isMobile ? "text-xs" : "text-sm"} mb-1 truncate`}
                    >
                      {proof.name}
                    </div>
                    <div
                      className={`text-cyber-gray-300 ${isMobile ? "text-xs leading-tight" : "text-sm leading-relaxed"} line-clamp-2`}
                    >
                      "{proof.comment}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Splash Screen
  if (showSplash) {
    return (
      <div className="min-h-screen bg-cyber-darker flex items-center justify-center relative overflow-hidden">
        {/* Enhanced background particles for splash */}
        <div className="absolute inset-0">
          {[...Array(isMobile ? 3 : 8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyber-red/50 rounded-full animate-cyber-entrance"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Splash Logo */}
        <div className="relative z-10">
          <div className="relative inline-block">
            <img
              src="/logo.png"
              alt="Logo Invictus"
              className={`${isMobile ? "h-32 w-32" : "h-48 w-48"} mx-auto transition-all duration-3000 ease-out drop-shadow-2xl relative z-10 ${
                logoAnimationComplete ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-10"
              }`}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-cyber-gradient overflow-hidden relative`}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Refined particles with staggered entrance */}
        {[...Array(isMobile ? 5 : 15)].map((_, i) => (
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
              animationDelay: `${Math.random() * 5 + 1}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Enhanced geometric grid */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <div
              className="absolute inset-0 animate-cyber-fade-up"
              style={{
                backgroundImage: `
                linear-gradient(rgba(255, 51, 102, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 51, 102, 0.15) 1px, transparent 1px)
              `,
                backgroundSize: "60px 60px",
                animationDelay: "2s",
              }}
            ></div>
          </div>
        )}

        {/* Enhanced cyber scan lines */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-red/30 to-transparent animate-cyber-data-flow"></div>
            <div
              className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent animate-cyber-data-flow"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>
        )}
      </div>

      <div
        className={`container mx-auto px-4 ${isMobile ? "py-6" : "py-8"} min-h-screen flex items-center justify-center relative z-10`}
      >
        <div
          className={`text-center transition-all duration-2000 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
          }`}
        >
          {/* Enhanced Logo - removed hover effects */}
          <div className={`${isMobile ? "mb-8" : "mb-12"} relative animate-cyber-scale-in`}>
            <div className="relative inline-block">
              <img
                src="/logo.png"
                alt="Logo Invictus"
                className={`${isMobile ? "h-20 w-20" : "h-40 w-40"} mx-auto transition-all duration-500 drop-shadow-2xl relative z-10`}
              />
            </div>
          </div>

          {/* Enhanced Typing Animation */}
          <div className={`${isMobile ? "mb-6" : "mb-8"}`}>
            <div className={`${isMobile ? "h-12" : "h-24"} flex items-center justify-center`}>
              <div className="relative animate-cyber-fade-up delay-cyber-200">
                <h1
                  className={`${isMobile ? "text-xl" : "text-3xl md:text-4xl"} font-modern font-bold text-cyber-gradient tracking-wider cyber-text-glow`}
                >
                  {typingText}
                  <span
                    className={`inline-block w-1 ${isMobile ? "h-5" : "h-8"} bg-cyber-red ml-2 ${isTyping ? "animate-blink-mobile animate-cyber-typing" : "opacity-0"}`}
                  ></span>
                </h1>
              </div>
            </div>
          </div>

          {/* Enhanced Subtitle with staggered animation and optimized mobile text */}
          <div
            className={`${isMobile ? "mb-8" : "mb-12"} max-w-4xl mx-auto transition-all duration-2000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p
              className={`${isMobile ? "text-sm px-4 leading-relaxed" : "text-lg md:text-xl leading-relaxed"} font-modern text-cyber-gray-200 mb-4 animate-cyber-slide-in delay-cyber-300`}
            >
              Entra quem está pronto. Conteúdo de{" "}
              <span className="text-cyber-red font-semibold cyber-text-glow hover-cyber-glow transition-all duration-300 cursor-default">
                acesso restrito
              </span>{" "}
              que não existe em nenhum lugar da internet.
            </p>
            <p
              className={`${isMobile ? "text-sm px-4 leading-relaxed" : "text-lg md:text-xl leading-relaxed"} font-modern text-cyber-gray-300 animate-cyber-slide-in delay-cyber-400`}
            >
              Se você passar… um{" "}
              <span className="text-cyber-red font-semibold cyber-text-glow hover-cyber-glow transition-all duration-300 cursor-default">
                acesso que não pode ser comprado
              </span>{" "}
              será revelado.
            </p>
          </div>

          {/* Enhanced CTA Section with uniform icon sizes */}
          <div
            className={`space-y-6 transition-all duration-2000 delay-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative animate-cyber-scale-in delay-cyber-500">
              <Button
                onClick={handleStartQuiz}
                className={`group relative ${isMobile ? "h-12 px-6 text-sm w-full max-w-xs mx-auto" : "h-16 px-12 text-lg"} font-modern font-bold bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-white shadow-2xl transform ${!isMobile ? "hover:scale-105 hover-cyber-lift" : ""} transition-all duration-500 cyber-border-glow overflow-hidden rounded-lg animate-cyber-button-ready hover-cyber-glow active:animate-cyber-click`}
              >
                <div className="absolute inset-0 bg-red-900/30 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 animate-cyber-glow-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="flex items-center justify-center relative z-10">
                  <Zap
                    className={`${isMobile ? "mr-2 h-4 w-4" : "mr-3 h-5 w-5"} text-red-400 transition-all duration-300 group-hover:animate-cyber-typing flex-shrink-0`}
                  />
                  <span className={`tracking-wide ${isMobile ? "text-center leading-tight" : ""}`}>
                    {isMobile ? "INICIAR TESTE" : "INICIAR O TESTE INVICTUS"}
                  </span>
                  <Crown
                    className={`${isMobile ? "ml-2 h-4 w-4" : "ml-3 h-5 w-5"} text-red-400 transition-all duration-300 group-hover:animate-cyber-typing flex-shrink-0`}
                  />
                </div>
              </Button>
            </div>
          </div>

          <div
            className={`transition-all duration-2000 delay-2000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <SocialProofCarousel />
          </div>

          {/* Enhanced Stats with uniform sizing and better mobile optimization */}
          <div
            className={`${isMobile ? "mt-6" : "mt-10"} grid grid-cols-3 ${isMobile ? "gap-3 max-w-xs" : "gap-8 max-w-md"} mx-auto transition-all duration-2000 delay-2500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {[
              { value: "97%", label: "Reprovados", color: "text-red-600", delay: "delay-cyber-600" },
              { value: "3%", label: "Elite", color: "text-red-500", delay: "delay-cyber-700" },
              { value: "∞", label: "Potencial", color: "text-red-700", delay: "delay-cyber-800" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 animate-cyber-fade-up ${stat.delay} hover-cyber-lift cursor-default`}
              >
                <div
                  className={`${isMobile ? "text-xl" : "text-2xl"} font-modern font-bold ${stat.color} group-hover:scale-110 transition-all duration-300 cyber-text-glow group-hover:animate-cyber-typing`}
                >
                  {stat.value}
                </div>
                <div
                  className={`${isMobile ? "text-xs mt-1" : "text-sm mt-2"} font-modern text-cyber-gray-400 group-hover:text-cyber-gray-300 transition-colors duration-300`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
