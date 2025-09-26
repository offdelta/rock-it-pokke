'use client'

import { useEffect, useState, useRef } from 'react'

export default function ImmersiveHero() {
  const [scrollY, setScrollY] = useState(0)
  const [gifLoaded, setGifLoaded] = useState(false)
  const [gifEnded, setGifEnded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const gifRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const gifElement = gifRef.current
    if (!gifElement) return

    // GIFが一度再生されたら終了とみなす（約3秒後）
    const timer = setTimeout(() => {
      setGifEnded(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [gifLoaded])

  // スクロール量に基づいた計算
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const scrollProgress = Math.min(scrollY / (windowHeight * 2), 1)
  const gifScale = Math.max(1 - scrollProgress * 0.5, 0.5) // 1から0.5までスケール
  const gifOpacity = Math.max(1 - scrollProgress * 0.8, 0.2)
  const logoOpacity = Math.min(scrollProgress * 2, 1)
  const logoTranslateY = Math.max(50 - scrollProgress * 100, 0)

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      {/* Fixed viewport container */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden">
        {/* Full-screen GIF */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${gifScale})`,
            opacity: gifOpacity,
          }}
        >
          <img
            ref={gifRef}
            src="/jumpingpokke.gif"
            alt="Jumping Pokke"
            className="w-full h-full object-cover"
            onLoad={() => setGifLoaded(true)}
          />
        </div>

        {/* Logo that appears after scroll */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            opacity: logoOpacity,
            transform: `translateY(${logoTranslateY}px)`,
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          <img
            src="/img/ma-poche-logo.png"
            alt="ma poche Logo"
            className="w-32 md:w-40 lg:w-48 h-auto mb-8"
          />
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#3E2723' }}>
              ma poche
            </h1>
            <p className="text-lg md:text-xl" style={{ color: '#5D4E37' }}>
              私のポケット
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        {gifEnded && scrollY < 100 && (
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
            style={{ opacity: 1 - scrollY / 100 }}
          >
            <div className="flex flex-col items-center text-gray-600">
              <span className="text-sm mb-2">Scroll</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content appears after scrolling */}
      <div
        className="absolute w-full"
        style={{
          top: '100vh',
          opacity: Math.min(scrollProgress * 2, 1),
          transform: `translateY(${Math.max(50 - scrollProgress * 100, 0)}px)`,
        }}
      >
        <div className="min-h-screen bg-gradient-to-b from-transparent to-[rgb(251,247,235)]">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#3E2723' }}>
                ma poche (マ・ポッシュ)
              </h3>
              <p className="text-sm md:text-base" style={{ color: '#5D4E37', lineHeight: '1.7' }}>
                フランス語で「私のポケット」。<br />
                子供の頃、宝物をしまった小さなポケットのように、<br />
                あなたが大切に育んできたものを<br />
                ウェブサイトという名のポケットに詰め込んでみましょう。<br />
                <span style={{ lineHeight: '3' }}>
                  あなたの歩んできた道が、これからの夢が、形になりますように。
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}