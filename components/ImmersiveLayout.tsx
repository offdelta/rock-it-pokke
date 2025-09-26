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


  // スクロール量に基づいた計算
  // テキストが表示された後に約1.4画面分ホールド（以前の70%）
  const holdDistance = windowHeight * 1.4
  const heroProgress = Math.min(Math.max(scrollY / windowHeight, 0), 1) // 1画面分でヒーロー完了
  const carouselProgress = Math.min(
    Math.max((scrollY - (windowHeight + holdDistance)) / windowHeight, 0),
    1
  ) // ホールド後にカルーセル
  // カルーセルが出揃った後のホールド
  const carouselHoldDistance = windowHeight * 2
  const carouselFadeOutProgress = Math.min(
    Math.max((scrollY - (windowHeight + holdDistance + windowHeight + carouselHoldDistance)) / (windowHeight * 0.5), 0),
    1
  ) // カルーセルのフェードアウト
  // プロフィール開始を少し早め（1.0 * vh 後）
  const profileProgress = Math.min(
    Math.max((scrollY - (windowHeight + holdDistance + windowHeight + carouselHoldDistance + windowHeight * 1.0)) / (windowHeight * 0.5), 0),
    1
  ) // プロファイルセクション

  // ロゴアニメーション - 小さい状態から画面の半分サイズまで拡大
  const logoOpacity = 1 // 常に表示
  // スクロール進行度に応じてスケールを計算（0.1から0.64まで＝従来最大の80%）
  const logoScale = 0.1 + (heroProgress * 0.54) // 10%→64% にスケール
  
  // ロゴの位置（中央に固定）
  const logoTranslateY = 0
  
  // テキストアニメーション - ロゴがある程度大きくなってから表示
  const textStartPoint = 0.4 // 40%進行時点でテキスト表示開始（ロゴがある程度大きくなってから）
  const sectionOpacity = heroProgress > textStartPoint 
    ? Math.min((heroProgress - textStartPoint) * 2, 1) // より速くフェードイン
    : 0
    
  const textProgress = Math.max(0, Math.min((heroProgress - textStartPoint) * 2, 1))
  const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  // 下から上へのスライドアニメーション（100pxから0pxへ）
  const sectionTranslateY = 100 * (1 - easeInOut(textProgress))
  
  // フェードアウトアニメーション - ホールド後にフェードアウト開始
  const fadeOutStart = windowHeight + holdDistance
  const fadeProgress = scrollY > fadeOutStart 
    ? Math.min((scrollY - fadeOutStart) / (windowHeight * 0.5), 1)  // 0.5画面分でフェードアウト完了
    : 0
    
  const boxOpacityFade = Math.max(1 - fadeProgress, 0)

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '1000vh' }}>
      {/* Section 1: Hero with Logo */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden" style={{ zIndex: 1, backgroundColor: '#a1cbb9' }}>
        {/* ロゴ+テキスト統合ボックス */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            // 初回スクロールまでは何も表示しない
            opacity: started ? boxOpacityFade : 0,
            transition: 'opacity 0.5s ease-out',
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
              style={{ height: '50vh', width: 'auto' }}
            />
          </div>

          {/* テキスト部分 */}
          <div
            style={{
              opacity: sectionOpacity,
              transform: `translateY(${sectionTranslateY}px)`,
              transition: 'none', // スクロールに直接連動
            }}
          >
            <div className="text-center max-w-3xl mx-auto px-4">
              <div className="mt-4 space-y-4">
                <p className="text-base md:text-lg" style={{ 
                  lineHeight: '1.8',
                  color: '#6a4e2e'
                }}>
                  <span className="font-extrabold md:font-black tracking-tight" style={{ fontSize: '1.1em' }}>マ ポッシュ</span>
                  <br />
                  <span style={{ fontSize: '0.7em', display: 'inline-block', marginBottom: '1.4em' }}>【フランス語で”私のポケット”】</span>
                </p>
                <p className="text-base md:text-lg" style={{ 
                  lineHeight: '1.8',
                  color: '#6a4e2e'
                }}>
                  子供の頃に宝物を詰め込んだポケット、<br />
                  <span style={{ display: 'inline-block', marginTop: '0.8em' }}>もう一度膨らませてみませんか。</span>
                </p>
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
          const hold = vh * 1.4
          const carouselHold = vh * 2

          // 初回クリック時は“スクロール開始”扱いにして少しだけ進める
          if (!started && y <= 0) {
            setStarted(true)
            setShowLogo(true)
            window.scrollTo({ top: Math.max(1, vh * 0.1), behavior: 'smooth' })
            return
          }

          // 2回目以降はセクション単位で移動
          // アンカー
          // Hero完了: AHeroEnd = vh
          // Heroホールド終了: AHldEnd = AHeroEnd + hold
          // Carousel表示完了: ACarouselShowEnd = AHldEnd + vh
          // Carouselホールド終了: ACarouselHoldEnd = ACarouselShowEnd + carouselHold
          // Profile開始: AProfile = ACarouselHoldEnd + 1.0*vh（早め）
          const AHeroEnd = vh
          const AHldEnd = AHeroEnd + hold
          const ACarouselShowEnd = AHldEnd + vh
          const ACarouselHoldEnd = ACarouselShowEnd + carouselHold
          const AProfile = ACarouselHoldEnd + vh * 1.0

          let nextScrollPosition = 0
          if (y < AHeroEnd) {
            // Hero中 → Heroホールド終端へ
            nextScrollPosition = AHldEnd
          } else if (y < ACarouselHoldEnd) {
            // Carousel表示〜ホールド中 → ホールド終端へ
            nextScrollPosition = ACarouselHoldEnd
          } else if (y < AProfile) {
            // フェードアウト域 → Profile開始へ（少し先まで）
            nextScrollPosition = AProfile + vh * 0.1
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
