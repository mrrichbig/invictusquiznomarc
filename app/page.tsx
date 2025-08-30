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

  // Splash Screen
  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Background particles for splash */}
        <div className="absolute inset-0">
          {[...Array(isMobile ? 3 : 8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/40 rounded-full animate-float-mobile"
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
              className={`${isMobile ? "h-32 w-32" : "h-48 w-48"} mx-auto transition-all duration-3000 ease-out drop-shadow-2xl ${
                logoAnimationComplete ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-10"
              }`}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative`}>
      {/* Clean Cyber Background Effects */}
      <div className="absolute inset-0">
        {/* Minimal particles */}
        {[...Array(isMobile ? 5 : 15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 2 === 0 ? "w-1 h-1 bg-red-500/40" : "w-0.5 h-0.5 bg-red-400/30"
            } animate-float-mobile`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
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

        {/* Subtle cyber elements */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-red-500/20 text-xs font-mono">[INVICTUS]</div>
            <div className="absolute bottom-1/3 right-1/4 text-red-400/20 text-xs font-mono">[ELITE]</div>
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
          {/* Logo */}
          <div className={`${isMobile ? "mb-8" : "mb-12"} relative`}>
            <div className="relative inline-block group">
              <div
                className={`absolute -inset-8 bg-gradient-to-r from-red-500/20 via-red-600/30 to-red-500/20 rounded-full blur-2xl transition-all duration-1000 ${isMobile ? "animate-pulse-mobile" : "group-hover:blur-3xl animate-pulse-glow"}`}
              ></div>
              <img
                src="/logo.png"
                alt="Logo Invictus"
                className={`${isMobile ? "h-20 w-20" : "h-40 w-40"} mx-auto transition-all duration-1000 ${!isMobile ? "group-hover:scale-110" : ""} drop-shadow-2xl animate-fade-in-up`}
              />
            </div>
          </div>

          {/* Typing Animation */}
          <div className={`${isMobile ? "mb-6" : "mb-8"}`}>
            <div className={`${isMobile ? "h-12" : "h-24"} flex items-center justify-center`}>
              <div className="relative">
                <h1
                  className={`${isMobile ? "text-xl" : "text-3xl md:text-4xl"} font-modern font-bold text-cinematic tracking-wider text-elegant-shadow animate-decrypt`}
                >
                  {typingText}
                  <span
                    className={`inline-block w-1 ${isMobile ? "h-5" : "h-8"} bg-red-400 ml-2 ${isTyping ? "animate-blink-mobile" : "opacity-0"}`}
                  ></span>
                </h1>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div
            className={`${isMobile ? "mb-10" : "mb-16"} max-w-4xl mx-auto transition-all duration-2000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p
              className={`${isMobile ? "text-base px-2" : "text-xl md:text-2xl"} font-modern text-gray-300 leading-relaxed mb-6`}
            >
              Entra quem está pronto. Conteúdo de <span className="text-red-400 font-bold">acesso restrito</span> que
              não existe em nenhum lugar da internet.
            </p>
            <p
              className={`${isMobile ? "text-base px-2" : "text-xl md:text-2xl"} font-modern text-gray-300 leading-relaxed`}
            >
              Se você passar… um <span className="text-red-400 font-bold">acesso que não pode ser comprado</span> será
              revelado.
            </p>
          </div>

          {/* CTA Section */}
          <div
            className={`space-y-8 transition-all duration-2000 delay-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              <Button
                onClick={handleStartQuiz}
                className={`group relative ${isMobile ? "h-14 px-8 text-base w-full max-w-sm mx-auto" : "h-20 px-16 text-xl"} font-modern font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-2xl transform ${!isMobile ? "hover:scale-110" : ""} transition-all duration-500 border border-gray-600/50 hover:border-red-400 overflow-hidden rounded-xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 to-red-600/40 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-button-glow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="flex items-center justify-center">
                  <Zap
                    className={`${isMobile ? "mr-2 h-4 w-4" : "mr-4 h-7 w-7"} group-hover:animate-electric transition-all duration-300 relative z-10`}
                  />
                  <span className="relative z-10 tracking-wide">INICIAR O TESTE INVICTUS</span>
                  <Crown
                    className={`${isMobile ? "ml-2 h-4 w-4" : "ml-4 h-7 w-7"} group-hover:animate-crown-float transition-all duration-300 relative z-10`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`${isMobile ? "mt-12" : "mt-20"} grid grid-cols-3 ${isMobile ? "gap-6 max-w-xs" : "gap-12 max-w-lg"} mx-auto transition-all duration-2000 delay-2000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {[
              { value: "97%", label: "Reprovados", delay: "delay-2000" },
              { value: "3%", label: "Elite", delay: "delay-2200" },
              { value: "∞", label: "Potencial", delay: "delay-2400" },
            ].map((stat, index) => (
              <div key={index} className={`text-center group transition-all duration-1000 ${stat.delay}`}>
                <div
                  className={`${isMobile ? "text-xl" : "text-3xl"} font-modern font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300 animate-counter`}
                >
                  {stat.value}
                </div>
                <div
                  className={`${isMobile ? "text-xs" : "text-sm"} font-modern text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-2`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
    </div>
  )
}
