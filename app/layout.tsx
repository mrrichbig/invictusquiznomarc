import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Cinzel } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
})

export const metadata: Metadata = {
  title: "Invictus Quiz - A Chave Para Seu Sucesso",
  description:
    "Este não é apenas um quiz. É a chave que separa os sonhadores dos conquistadores. Apenas os verdadeiros INVICTOS conseguem passar.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
