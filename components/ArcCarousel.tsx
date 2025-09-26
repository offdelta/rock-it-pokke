'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import ProjectModal from './ProjectModal'

interface PortfolioItem {
  id: number
  image: string | null
  title: string
  content: string
  genre: string
  clientType: string
  url?: string
  modalDescription?: string
}

interface CarouselImage {
  id: number
  src: string
  alt: string
  title: string
}

interface ArcCarouselProps {
  scrollProgress?: number
  fadeOutProgress?: number // フェードアウト用の進行度
}

const ArcCarousel: React.FC<ArcCarouselProps> = ({ scrollProgress = 1, fadeOutProgress = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [titleAnimProgress, setTitleAnimProgress] = useState(0)
  const [windowWidth, setWindowWidth] = useState(768)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)

  // ポートフォリオデータ（PortfolioSectionからマッピング）
  const portfolioData: PortfolioItem[] = [
    {
      id: 1,
      image: "/img/clients/qdopp-long.jpg",
      title: "多言語対応で世界へ！",
      content: "国際ビジネスコンサルティング企業の英語と日本語両言語対応のWebサイトです。アニメーションをふんだんに使用し、リズミカルで閲覧する人がワクワクするような見た目になっています。",
      genre: "サービス紹介",
      clientType: "企業",
      url: "https://example.com/project1"
    },
    {
      id: 2,
      image: "/img/clients/mycraft-long.jpg",
      title: "自身の作品をアピール",
      content: "フラワーアレンジメントのアーティストのサイト。たくさんの作品をフィルタリングできるギャラリーとして表示し、SNSリンクも配置、お問い合わせフォームも実装。",
      genre: "作品紹介・教室・SNS",
      clientType: "個人事業主",
      url: "https://example.com/project2"
    },
    {
      id: 3,
      image: "/img/clients/sakurasaku-long.jpg",
      title: "データ収集で情報発信",
      content: "中学受験に関する情報を発信。外部サービスとの連携やSNSリンクも掲載し、よりマーケティング効果の高いサイトです。",
      genre: "統計データ",
      clientType: "自営業",
      url: "https://example.com/project3"
    },
    {
      id: 4,
      image: "/img/clients/hivemind-long.png",
      title: "英語で魅せる作家紹介",
      content: "海外向けに全部英語で。文芸エージェントの登録作家紹介ページです。",
      modalDescription: "文豪をイメージした落ち着いた色合いの中に最低限のアニメーション使いでシンプルに仕上げました。",
      genre: "作家紹介",
      clientType: "文芸エージェント",
      url: "https://hivemindagency.net/"
    },
    {
      id: 5,
      image: "/img/clients/bonsai-long.jpg",
      title: "静謐な盆栽陶芸の世界へ",
      content: "盆栽陶芸家の作品を紹介するギャラリーサイト。素焼きの質感と苔の瑞々しさが伝わるよう、写真を大きく見せる構成にしています。",
      modalDescription: "四季の移ろいを感じさせる落ち着いたモスグリーンと土色をベースに、作品写真が映える余白設計を施しました。WebGLを使った微細なライト演出で、陶器の陰影をほんのりと強調しています。",
      genre: "ギャラリーサイト",
      clientType: "盆栽陶芸家",
      url: "#"
    },
    {
      id: 6,
      image: "/img/ma-poche-logo.png",
      title: "新しいプロジェクト",
      content: "ma pocheの新しいプロジェクトです。あなたの大切な思い出やアイデアを形にするお手伝いをします。どんな小さなことでもお気軽にご相談ください。",
      genre: "新規プロジェクト",
      clientType: "すべての方へ",
      url: "https://example.com/new-project"
    }
  ]

  const images: CarouselImage[] = portfolioData
    .filter(item => item.image) // 画像がある項目のみフィルタリング
    .map((item, index) => ({
      id: index,
      src: item.image!,
      alt: item.title,
      title: item.title
    }))

  const carouselWrapperRef = useRef<HTMLDivElement>(null)

  // タイトルアニメーション用のタイマー
  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / 2000, 1) // 2秒で完了
      
      setTitleAnimProgress(progress)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  // ウィンドウサイズの監視
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 自動スライド機能（3秒ごと）
  useEffect(() => {
    if (titleAnimProgress < 1) return // タイトルアニメーション完了後に開始

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // 3秒ごと

    return () => clearInterval(interval)
  }, [titleAnimProgress, images.length])

  // 次の画像へ移動する関数
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // 前の画像へ移動する関数
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // タイトルアニメーション用のヘルパー関数
  const getTitleCharStyle = (index: number) => {
    const delay = index * 0.2 // 各文字のアニメーション遅延
    const charProgress = Math.max(0, Math.min(1, (titleAnimProgress - delay) / 0.3)) // 0.3秒で完了
    
    return {
      transform: `translateY(${(1 - charProgress) * 50}px)`,
      opacity: charProgress,
      transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
    }
  }

  // カードアニメーション用の進行状態
  const [cardAnimProgress, setCardAnimProgress] = useState(0)

  // カードアニメーション用のタイマー
  useEffect(() => {
    if (titleAnimProgress < 1) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / 2500, 1) // 2.5秒で完了
      
      setCardAnimProgress(progress)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [titleAnimProgress])

  // 画像の位置と角度を計算する関数（currentIndexに基づいて動的配置）
  const getItemStyles = (index: number) => {
    const offset = index - currentIndex
    const absOffset = Math.abs(offset)

    let scale = 1
    let rotateZ = 0 // Z軸回転（傾き）
    let translateX = 0 // X軸移動
    let translateY = 0 // Y軸移動（弧を描くための上下移動）
    let opacity = 1
    let zIndex = 1

    // 大画面（md以上）でのスタイル
    if (windowWidth >= 768) {
      // 循環配置を考慮してoffsetを調整
      let normalizedOffset = offset
      const totalItems = images.length
      if (normalizedOffset > totalItems / 2) {
        normalizedOffset -= totalItems
      } else if (normalizedOffset < -totalItems / 2) {
        normalizedOffset += totalItems
      }

      if (normalizedOffset === 0) {
        // 中央の画像
        scale = 1.05
        rotateZ = 0
        translateX = 0
        translateY = 0
        zIndex = 3
      } else if (normalizedOffset === 1) {
        // 右隣の画像
        scale = 0.9
        rotateZ = 15
        translateX = 250
        translateY = 20
        zIndex = 2
      } else if (normalizedOffset === 2) {
        // 右端の画像
        scale = 0.8
        rotateZ = 30
        translateX = 450
        translateY = 100 // 60から100に変更（より下に配置）
        zIndex = 1
      } else if (normalizedOffset === -1) {
        // 左隣の画像
        scale = 0.9
        rotateZ = -15
        translateX = -250
        translateY = 20
        zIndex = 2
      } else if (normalizedOffset === -2) {
        // 左端の画像
        scale = 0.8
        rotateZ = -30
        translateX = -450
        translateY = 100 // 60から100に変更（より下に配置）
        zIndex = 1
      } else if (Math.abs(normalizedOffset) === 3) {
        // 最外端の画像（少し見える）
        scale = 0.6
        rotateZ = normalizedOffset * 15 // 45度
        translateX = normalizedOffset * 600
        translateY = 100
        zIndex = 0
        opacity = 0.4
      } else {
        // 表示範囲外の画像
        opacity = 0
      }
    } else { // スマホサイズ（md未満）でのスタイル
      // 循環配置を考慮してoffsetを調整
      let normalizedOffset = offset
      const totalItems = images.length
      if (normalizedOffset > totalItems / 2) {
        normalizedOffset -= totalItems
      } else if (normalizedOffset < -totalItems / 2) {
        normalizedOffset += totalItems
      }

      if (normalizedOffset === 0) {
        // 中央の画像
        scale = 1
        rotateZ = 0
        translateX = 0
        translateY = 0
        zIndex = 3
      } else if (normalizedOffset === 1) {
        // 右隣の画像
        scale = 0.9
        rotateZ = 15
        translateX = windowWidth * 0.35
        translateY = 20
        zIndex = 2
      } else if (normalizedOffset === -1) {
        // 左隣の画像
        scale = 0.9
        rotateZ = -15
        translateX = -windowWidth * 0.35
        translateY = 20
        zIndex = 2
      } else if (Math.abs(normalizedOffset) === 2) {
        // 左右端の画像（少し見える）
        scale = 0.7
        rotateZ = normalizedOffset * 25
        translateX = normalizedOffset * windowWidth * 0.5
        translateY = 80 // 40から80に変更（より下に配置）
        zIndex = 1
        opacity = 0.6
      } else {
        // 表示範囲外の画像
        opacity = 0
      }
    }

    // カードアニメーション用のイージング関数
    const easeOutBack = (t: number) => {
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    }

    // 扇形展開アニメーション
    const fanProgress = easeOutBack(cardAnimProgress)
    const initialScale = 0.5 // 初期は小さく
    const initialRotate = 0 // 初期は回転なし
    const initialY = 300 // 初期は下に配置

    // フェードアウト時の逆アニメーション
    const closeFanProgress = 1 - fadeOutProgress // 逆再生
    
    // アニメーション進行に応じてプロパティを補間
    let animatedScale, animatedRotateZ, animatedTranslateX, animatedTranslateY, animatedOpacity
    
    if (fadeOutProgress > 0) {
      // フェードアウト時：扇を閉じる
      animatedScale = initialScale + (scale - initialScale) * closeFanProgress
      animatedRotateZ = rotateZ * closeFanProgress
      animatedTranslateX = translateX * closeFanProgress
      animatedTranslateY = initialY + (translateY - initialY) * closeFanProgress
      animatedOpacity = opacity * closeFanProgress
    } else {
      // 通常時：扇を開く
      animatedScale = initialScale + (scale - initialScale) * fanProgress
      animatedRotateZ = initialRotate + rotateZ * fanProgress
      animatedTranslateX = translateX * fanProgress
      animatedTranslateY = initialY + (translateY - initialY) * fanProgress
      animatedOpacity = cardAnimProgress < 0.3 ? cardAnimProgress / 0.3 : opacity
    }

    return {
      transform: `translateX(${animatedTranslateX}px) translateY(${animatedTranslateY}px) scale(${animatedScale}) rotateZ(${animatedRotateZ}deg)`,
      opacity: animatedOpacity,
      zIndex: zIndex,
      transition: cardAnimProgress >= 1 ? 'transform 0.5s ease-out, opacity 0.3s ease-out' : 'none', // アニメーション完了後はスムーズなトランジション
    }
  }

  const titleText = '制作実績'

  return (
    <div className="flex flex-col items-start justify-start min-h-screen w-full pt-16" style={{ 
      backgroundColor: '#a1cbb9',
      opacity: Math.max(1 - fadeOutProgress, 0),
      transition: 'opacity 0.5s ease-out'
    }}>
      {/* 全体スケール 90% */}
      <div className="w-full" style={{ transform: 'scale(0.9)', transformOrigin: 'center top' }}>
        {/* 見出しは自己紹介と同じくstickyで位置をキープ */}
        <div className="w-full flex justify-center" style={{ position: 'sticky', top: '5rem', zIndex: 5 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 mt-8" style={{
          color: '#6a4e2e',
          textShadow: '1px 1px 2px rgba(106, 78, 46, 0.2)',
          fontWeight: 'bold',
          letterSpacing: '-0.02em'
        }}>
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              style={getTitleCharStyle(index)}
              className="inline-block mx-1"
            >
              {char}
            </span>
          ))}
        </h2>
        </div>
        <div 
          className="relative w-full max-w-7xl mx-auto"
          style={{
            opacity: titleAnimProgress >= 1 ? 1 : 0,
            transform: `translateY(${titleAnimProgress >= 1 ? 0 : 30}px)`,
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            pointerEvents: titleAnimProgress >= 1 ? 'auto' : 'none'
          }}
        >
          {/* カルーセル画像コンテナ */}
          <div
            ref={carouselWrapperRef}
            className="flex items-center justify-center h-[500px] sm:h-[600px] relative transition-all duration-500 ease-in-out"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[300px] h-[450px] sm:w-[350px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out group"
              style={{
                ...getItemStyles(index),
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
              onClick={(e) => {
                e.stopPropagation()
                // フィルタリング後のインデックスを元のデータのインデックスにマッピング
                const originalData = portfolioData.filter(item => item.image)[index]
                if (originalData) {
                  const originalIndex = portfolioData.findIndex(item => item.id === originalData.id)
                  setSelectedProject(portfolioData[originalIndex])
                  setModalOpen(true)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setCurrentIndex(index)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`画像 ${index + 1}: ${image.title}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 300px, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                
                {/* キャプション - 中央の画像のみ表示（白系背景上は茶色テキストに統一） */}
                {index === currentIndex && (
                  <div 
                    className="absolute inset-x-0 bottom-0 p-3 pb-2 text-center"
                    style={{
                      // 白の濃さが途中で偏らないよう、複数段のアルファで滑らかに
                      background: 'linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0) 100%)',
                      minHeight: '84px',
                    }}
                  >
                    <div className="mt-4">
                      <div className="inline-flex items-center justify-center mt-1 mb-1">
                        <span className="text-xs rounded-full px-3 py-1 font-medium" style={{ 
                          color: '#ffffff',
                          background: '#6a4e2e'
                        }}>
                          Case {image.id + 1}
                        </span>
                      </div>
                      <p className="font-semibold text-lg" style={{ color: '#6a4e2e' }}>
                        {image.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* 下部コントロール（矢印＋ドット） */}
        <div 
          className="flex items-center justify-center gap-4 mt-8 pointer-events-auto"
          style={{
            opacity: fadeOutProgress > 0 ? Math.max(1 - fadeOutProgress * 1.5, 0) : cardAnimProgress,
            transform: `translateY(${fadeOutProgress > 0 ? fadeOutProgress * 50 : (1 - cardAnimProgress) * 50}px)`,
            transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="p-2 focus:outline-none"
            style={{ color: '#6a4e2e' }}
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" fill="currentColor" stroke="currentColor"></path>
            </svg>
          </button>
          <div className="flex items-center justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className="w-3 h-3 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
                style={{ background: index === currentIndex ? '#6a4e2e' : 'rgba(106, 78, 46, 0.3)' }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="p-2 focus:outline-none"
            style={{ color: '#6a4e2e' }}
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" fill="currentColor" stroke="currentColor"></path>
            </svg>
          </button>
        </div>

        {/* ドットは上のコントロール内に統合 */}
      </div>

      {/* プロジェクト詳細モーダル - Portalで最上位に表示 */}
      {modalOpen && (
        <div style={{ position: 'fixed', zIndex: 9999 }}>
          <ProjectModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            project={selectedProject}
          />
        </div>
      )}
    </div>
  )
}

export default ArcCarousel
