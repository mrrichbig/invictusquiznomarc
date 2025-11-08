"use client"

import { useState, useEffect, useRef } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingVSL() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 300 && !isMinimized && hasStarted) {
        setIsMinimized(true)
      } else if (scrollPosition <= 300 && isMinimized) {
        setIsMinimized(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMinimized, hasStarted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setIsClosed(true)
    }

    video.addEventListener("ended", handleEnded)
    return () => video.removeEventListener("ended", handleEnded)
  }, [])

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
      setHasStarted(true)
    }
  }

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setIsClosed(true)
  }

  if (isClosed) return null

  return (
    <>
      {/* Full Screen VSL */}
      {!isMinimized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-cyber-entrance">
          <div className="relative w-full max-w-4xl mx-4">
            <div className="relative rounded-2xl overflow-hidden cyber-border-glow shadow-2xl">
              <video
                ref={videoRef}
                className="w-full aspect-video bg-cyber-darker"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                {/* <source src="/vsl.mp4" type="video/mp4" /> */}
                <div className="absolute inset-0 flex items-center justify-center bg-cyber-darker">
                  <p className="text-cyber-gray-400 text-center">Adicione seu vídeo VSL aqui</p>
                </div>
              </video>

              {!isPlaying && !hasStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-cyber-fade-up">
                  <Button
                    onClick={handlePlay}
                    className="h-20 w-20 rounded-full bg-cyber-red hover:bg-cyber-red-light shadow-2xl transform hover:scale-110 transition-all duration-500 cyber-glow-intense group animate-cyber-button-ready"
                  >
                    <Play className="h-10 w-10 text-white ml-1 group-hover:animate-cyber-typing" />
                  </Button>
                </div>
              )}

              {hasStarted && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-cyber-card/80 hover:bg-cyber-red border border-cyber hover:border-cyber-light backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 cyber-glow z-10"
                >
                  <X className="h-5 w-5 text-cyber-gray-200 hover:text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Minimized Floating VSL */}
      {isMinimized && hasStarted && (
        <div className="fixed bottom-6 right-6 z-50 animate-cyber-scale-in">
          <div className="relative w-80 rounded-lg overflow-hidden cyber-border-glow shadow-2xl">
            <video ref={videoRef} className="w-full aspect-video bg-cyber-darker" autoPlay />

            <button
              onClick={handleClose}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-cyber-card/90 hover:bg-cyber-red border border-cyber hover:border-cyber-light backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="h-4 w-4 text-cyber-gray-200 hover:text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
