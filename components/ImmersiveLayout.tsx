'use client'

import { useEffect, useState, useRef } from 'react'
import ProfileSection from './ProfileSection'
import ArcCarousel from './ArcCarousel'
import CircularCarousel from './CircularCarousel'

export default function ImmersiveLayout() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(800)
  const [isClient, setIsClient] = useState(false)
  // 初回スクロール開始フラグ
  const [started, setStarted] = useState(false)
  // ロゴ表示（初回スクロールで表示開始）
  const [showLogo, setShowLogo] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // クライアントサイドでのみ実行
    setIsClient(true)

    const handleScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      if (!started && y > 0) {
        setStarted(true)
        setShowLogo(true)
      }
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    // 初期設定
    setWindowHeight(window.innerHeight)
    setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [started])


  // スクロール量に基づいた各フェーズの高さ（vh比率で調整）
  const heroStageHeight = windowHeight * 1.85
  const heroHoldHeight = windowHeight * 1.6
  const heroFadeHeight = windowHeight * 1.1
  const carouselStageHeight = windowHeight * 1.2
  const carouselHoldHeight = windowHeight * 2.3
  const carouselFadeHeight = windowHeight * 0.9
  const profileIntroHeight = windowHeight * 1.3
  const profileHoldHeight = windowHeight * 2.8

  const heroHoldEnd = heroStageHeight + heroHoldHeight
  const carouselStageEnd = heroHoldEnd + heroFadeHeight + carouselStageHeight
  const carouselHoldEnd = carouselStageEnd + carouselHoldHeight
  const carouselFadeEnd = carouselHoldEnd + carouselFadeHeight
  const profileIntroStart = carouselFadeEnd
  const profileIntroEnd = profileIntroStart + profileIntroHeight
  const timelineEnd = profileIntroEnd + profileHoldHeight

  const heroProgressRaw = heroStageHeight > 0 ? scrollY / heroStageHeight : 0
  const heroProgress = Math.min(Math.max(heroProgressRaw, 0), 1)
  const carouselProgress = Math.min(
    Math.max((scrollY - heroHoldEnd) / (carouselStageHeight || 1), 0),
    1
  )
  const carouselFadeOutProgress = Math.min(
    Math.max((scrollY - carouselHoldEnd) / (carouselFadeHeight || 1), 0),
    1
  )
  const profileProgress = Math.min(
    Math.max((scrollY - profileIntroStart) / (profileIntroHeight || 1), 0),
    1
  )

  // ロゴアニメーション - 小さい状態から画面の半分サイズまで拡大
  const logoOpacity = 1 // 常に表示
  // スクロール進行度に応じてスケールを計算（0.1から0.64まで＝従来最大の80%）
  const logoScale = 0.1 + (heroProgress * 0.54) // 10%→64% にスケール
  
  // ロゴの位置（中央に固定）
  const logoTranslateY = 0
  
  // テキストアニメーション - ロゴがある程度大きくなってから表示
  const textStartPoint = 0.4 // 40%進行時点でテキスト表示開始（ロゴがある程度大きくなってから）
  const textWindow = Math.max(1 - textStartPoint, 0.0001)
  const textEnvelope = Math.max(0, Math.min((heroProgressRaw - textStartPoint) / textWindow, 1))
  const sectionOpacity = textEnvelope

  const textProgress = Math.pow(textEnvelope, 1.25)
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const lineDelayStep = 0.3
  const baseLineDuration = 0.9
  const maxLineOffset = 32

  const getLineStyle = (index: number) => {
    const start = index * lineDelayStep
    const remainingWindow = Math.max(1 - start, 0.0001)
    const effectiveDuration = Math.min(baseLineDuration, remainingWindow)
    const progress = Math.max(0, Math.min((textProgress - start) / effectiveDuration, 1))
    const eased = easeOutCubic(progress)

    return {
      opacity: eased,
      transform: `translateY(${(1 - eased) * maxLineOffset}px)`
    }
  }

  const textLines = [
    {
      id: 'lead-word',
      className: 'm-0 text-base md:text-lg leading-[1.8] text-[#6a4e2e]',
      content: (
        <span className="font-extrabold md:font-black tracking-tight" style={{ fontSize: '1.1em' }}>
          マ ポッシュ
        </span>
      )
    },
    {
      id: 'pronunciation',
      className: 'm-0 text-xs md:text-sm tracking-[0.35em] text-[#6a4e2e]',
      style: { marginBottom: '0.6em' },
      content: '【フランス語で”私のポケット”】'
    },
    {
      id: 'line-1',
      className: 'm-0 text-base md:text-lg leading-[1.9] text-[#6a4e2e]',
      content: 'あなたの想いを、ポケットへ。'
    },
    {
      id: 'line-2',
      className: 'm-0 text-base md:text-lg leading-[1.85] text-[#6a4e2e]',
      style: { marginTop: '0.1em' },
      content: 'いつでも開ける、私だけの宝箱サイト。'
    }
  ]
  
  // ヒーローのフェードアウト（カルーセル表示に合わせてゆっくり消える）
  const heroFadeProgress = Math.min(
    Math.max((scrollY - heroHoldEnd) / (heroFadeHeight || 1), 0),
    1
  )
  const boxOpacityFade = Math.max(1 - heroFadeProgress, 0)

  const baseWindowHeight = windowHeight || 1
  const timelineTotalHeight = timelineEnd

  const containerMinHeight = Math.max(timelineTotalHeight, baseWindowHeight * 8)

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: `${containerMinHeight}px` }}>
      {/* Section 1: Hero with Logo */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden" style={{ zIndex: 1, backgroundColor: '#a1cbb9' }}>
        {/* ロゴ+テキスト統合ボックス */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            // 初回スクロールまでは何も表示しない
            opacity: started ? boxOpacityFade : 0,
            transition: 'opacity 0.5s ease-out',
            transform: 'translateY(-8vh)'
          }}
        >
        
          {/* ロゴ部分 */}
          <div
            style={{
              opacity: showLogo ? logoOpacity : 0,
              transform: `translateY(${logoTranslateY}px) scale(${logoScale})`,
              transition: showLogo ? 'opacity 0.5s ease-in' : 'none', // 表示時のみフェードイン
            }}
          >
            <img
              src="/img/ma-poche-logo.png"
              alt="ma poche Logo"
              style={{ height: '40vh', width: 'auto' }}
            />
          </div>

          {/* テキスト部分 */}
          <div
            style={{
              opacity: sectionOpacity,
              transform: 'translateY(0px)',
              transition: 'none', // スクロールに直接連動
            }}
          >
            <div className="text-center max-w-3xl mx-auto px-4">
              <div className="mt-2 flex flex-col items-center gap-2.5">
                {textLines.map((line, index) => {
                  const animationStyle = getLineStyle(index)
                  return (
                    <p
                      key={line.id}
                      className={line.className}
                      style={{
                        ...(line.style || {}),
                        opacity: animationStyle.opacity,
                        transform: animationStyle.transform,
                        willChange: 'transform, opacity'
                      }}
                    >
                      {line.content}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* カルーセル - ロゴとテキストがフェードアウト後に表示 */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: carouselProgress > 0 ? Math.max(1 - carouselFadeOutProgress, 0) : 0,
            transition: 'opacity 0.5s ease-in-out',
            zIndex: carouselProgress > 0 ? 2 : -1,
            backgroundColor: '#a1cbb9',
            pointerEvents: carouselProgress > 0.2 && carouselFadeOutProgress < 0.8 ? 'auto' : 'none',
          }}
        >
          {carouselProgress > 0 && (
            <ArcCarousel scrollProgress={carouselProgress} fadeOutProgress={carouselFadeOutProgress} />
          )}
        </div>
      </div>

      {/* Section 2: Profile Section */}
      <div 
        className="fixed inset-0 w-full h-screen overflow-y-auto"
        style={{ 
          zIndex: profileProgress > 0 ? 20 : -1,
          opacity: profileProgress,
          transform: `translateY(${Math.max(100 - profileProgress * 100, 0)}px)`,
          transition: 'all 0.5s ease-out',
          pointerEvents: profileProgress > 0.2 ? 'auto' : 'none',
        }}
      >
        <ProfileSection scrollProgress={profileProgress} />
      </div>

      {/* スクロールボタン：初回は中央、開始後は右下へ */}
      <div
        className="fixed z-50 transition-all duration-500 ease-out"
        style={
          started
            ? {
                right: '2rem',
                bottom: '2rem',
                transform: 'scale(0.85)',
              }
            : {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }
        }
      >
        <button
          onClick={() => {
          const y = window.scrollY
          const vh = window.innerHeight

          // 初回クリック時は“スクロール開始”扱いにして少しだけ進める
          if (!started && y <= 0) {
            setStarted(true)
            setShowLogo(true)
            window.scrollTo({ top: Math.max(1, vh * 0.1), behavior: 'smooth' })
            return
          }

          let nextScrollPosition = 0
          const heroTarget = heroHoldEnd
          const carouselTarget = carouselHoldEnd
          const profileTarget = profileIntroStart + profileIntroHeight * 0.85
          const finalTarget = Math.max(timelineEnd - vh * 0.2, 0)

          if (y < heroHoldEnd) {
            // ヒーローフェーズ中 → ホールド終端へ
            nextScrollPosition = heroTarget
          } else if (y < carouselHoldEnd) {
            // カルーセル表示〜ホールド中 → ホールド終端へ
            nextScrollPosition = carouselTarget
          } else if (y < profileIntroEnd) {
            // プロフィール導入へ少し先行してスクロール
            nextScrollPosition = profileTarget
          } else if (y < finalTarget) {
            // プロフィールの残りを一気に表示
            nextScrollPosition = finalTarget
          } else {
            // 最後はトップへ戻る
            nextScrollPosition = 0
          }
          window.scrollTo({ top: nextScrollPosition, behavior: 'smooth' })
        }}
          className="border-2 p-3 rounded-lg shadow-sm transition-shadow duration-300 ease-out floating-scroll-bounce"
          style={{
            // 色をテキストの茶色(#6a4e2e)に統一
            background: 'rgba(106, 78, 46, 0.08)',
            borderImage: 'none',
            borderColor: '#6a4e2e',
            color: '#6a4e2e',
            // 影を控えめに（茶色トーン）
            boxShadow: '0 2px 8px rgba(106, 78, 46, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(10px)',
          }}
          aria-label="次のセクションへスクロール"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold mb-1 tracking-wide">Scroll</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
