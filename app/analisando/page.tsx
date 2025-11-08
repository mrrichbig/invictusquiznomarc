"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Brain, Cpu, Zap, Target, Shield, Crown } from "lucide-react"

export default function Analisando() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const phases = [
    { icon: Brain, label: "Analisando Perfil", color: "text-cyber-blue" },
    { icon: Cpu, label: "Processando Respostas", color: "text-cyber-purple" },
    { icon: Zap, label: "Calculando Potencial", color: "text-cyber-red" },
    { icon: Target, label: "Avaliando Mindset", color: "text-cyber-green" },
    { icon: Shield, label: "Verificando Critérios", color: "text-cyber-red-light" },
    { icon: Crown, label: "Decisão Final", color: "text-cyber-red" },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 60)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev >= phases.length - 1) {
          clearInterval(phaseInterval)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(phaseInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        router.push("/aprovado")
      }, 1500)
    }
  }, [progress, router])

  return (
    <div className="min-h-screen bg-cyber-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {[...Array(isMobile ? 10 : 25)].map((_, i) => (
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
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {!isMobile && (
          <>
            <div className="absolute inset-0 pointer-events-none opacity-15">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255, 51, 102, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 51, 102, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              ></div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-red/30 to-transparent animate-cyber-data-flow"></div>
              <div
                className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent animate-cyber-data-flow"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 ${isMobile ? "w-full max-w-sm" : "max-w-2xl w-full"} cyber-border-glow bg-cyber-gradient-card backdrop-blur-xl rounded-2xl ${isMobile ? "p-8" : "p-12"} animate-cyber-entrance`}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block relative mb-6 animate-cyber-scale-in">
            <div className="absolute -inset-4 bg-cyber-red/20 rounded-full blur-xl animate-cyber-glow-pulse"></div>
            <Brain
              className={`${isMobile ? "h-16 w-16" : "h-20 w-20"} text-cyber-red mx-auto relative z-10 animate-cyber-glow-pulse cyber-text-glow`}
            />
          </div>

          <h1
            className={`${isMobile ? "text-2xl" : "text-4xl"} font-modern font-bold text-cyber-gray-100 mb-4 cyber-text-glow animate-cyber-slide-in`}
          >
            ANALISANDO SUAS RESPOSTAS
          </h1>

          <p className={`${isMobile ? "text-sm" : "text-lg"} text-cyber-gray-300 font-modern animate-cyber-fade-up`}>
            Aguarde enquanto processamos seu perfil...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 animate-cyber-fade-up delay-cyber-200">
          <div className="relative h-4 bg-cyber-card rounded-full overflow-hidden cyber-border-glow">
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyber-red via-cyber-red-light to-cyber-red h-full transition-all duration-300 ease-out cyber-glow"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-cyber-data-flow"></div>
            </div>
          </div>

          <div className="text-center mt-3">
            <span className="text-cyber-red text-2xl font-bold font-mono cyber-text-glow">{progress}%</span>
          </div>
        </div>

        {/* Analysis Phases */}
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            const isActive = index === currentPhase
            const isComplete = index < currentPhase

            return (
              <div
                key={index}
                className={`flex items-center gap-4 ${isMobile ? "p-4" : "p-5"} rounded-lg border transition-all duration-500 animate-cyber-slide-in ${
                  isActive
                    ? "border-cyber bg-cyber-card cyber-glow scale-105"
                    : isComplete
                      ? "border-cyber-dark bg-cyber-card/40 opacity-60"
                      : "border-cyber-dark bg-cyber-card/20 opacity-30"
                }`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div
                  className={`${isMobile ? "h-10 w-10" : "h-12 w-12"} rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "bg-cyber-red/20 cyber-glow-intense"
                      : isComplete
                        ? "bg-cyber-green/20"
                        : "bg-cyber-card/50"
                  }`}
                >
                  <Icon
                    className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} ${isActive ? `${phase.color} animate-cyber-typing cyber-text-glow` : isComplete ? "text-cyber-green" : "text-cyber-gray-500"}`}
                  />
                </div>

                <div className="flex-1">
                  <p
                    className={`${isMobile ? "text-sm" : "text-base"} font-modern font-semibold ${
                      isActive ? "text-cyber-gray-100" : isComplete ? "text-cyber-gray-300" : "text-cyber-gray-500"
                    }`}
                  >
                    {phase.label}
                  </p>
                </div>

                {isComplete && (
                  <div className="animate-cyber-success">
                    <div className="h-6 w-6 rounded-full bg-cyber-green/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-cyber-green cyber-glow"></div>
                    </div>
                  </div>
                )}

                {isActive && (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyber-red animate-cyber-glow-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer Message */}
        <div className="mt-10 text-center animate-cyber-fade-up delay-cyber-800">
          <p className={`${isMobile ? "text-xs" : "text-sm"} text-cyber-gray-400 font-modern`}>
            Este processo garante que apenas os melhores sejam selecionados
          </p>
        </div>
      </div>
    </div>
  )
}
