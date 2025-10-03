'use client'

import { useEffect, useRef, useState } from 'react'
import { ACCENT_COLOR, ACCENT_SURFACE, ACCENT_SURFACE_STRONG } from './theme'

export default function PortfolioSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [noteVisible, setNoteVisible] = useState(false)

  useEffect(() => {
    const target = titleRef.current
    if (!target) return

    let timeoutId: number | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          timeoutId = window.setTimeout(() => setNoteVisible(true), 220)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  const portfolioItems = [
    {
      id: 1,
      image: "/img/clients/imaokamachinao-long.png",
      title: "静謐な盆栽陶芸の世界へ",
      content: "世に広まった全作品の情報を集約する『記録の場』を兼ねたデジタルアーカイブです。日英バイリンガルで亡き陶芸作家の創作の軌跡を公開し、その芸術世界を未来へ繋ぐことを目指します。",
      genre: "ギャラリーサイト",
      clientType: "盆栽陶芸家"
    },
    {
      id: 2,
      image: "/img/clients/mycraft-long.jpg",
      title: "自身の作品をアピール",
      content: "フラワーアレンジメントのアーティストのサイト。たくさんの作品をフィルタリングできるギャラリーとして表示し、SNSリンクも配置、お問い合わせフォームも実装。",
      genre: "作品紹介・教室・SNS",
      clientType: "個人事業主"
    },
    {
      id: 3,
      image: "/img/clients/sakurasaku-long.jpg",
      title: "データ収集で情報発信",
      content: "中学受験に関する情報を発信。外部サービスとの連携やSNSリンクも掲載し、よりマーケティング効果の高いサイトです。",
      genre: "統計データ",
      clientType: "自営業"
    },
    {
      id: 4,
      image: "/img/clients/luxelink-long.jpg",
      title: "\"知りたい\"をレポート",
      content: "高級感のある統一されたシンプルな情報サイト。外部サイトの情報を盛り込んで所謂まとめサイトとしての役割を果たしています。",
      genre: "まとめサイト",
      clientType: "退職後のご趣味"
    },
    {
      id: 5,
      image: "/img/clients/qdopp-long.jpg",
      title: "多言語対応で世界へ！",
      content: "国際ビジネスコンサルティング企業の英語と日本語両言語対応のWebサイトです。アニメーションをふんだんに使用し、リズミカルで閲覧する人がワクワクするような見た目になっています。",
      genre: "サービス紹介",
      clientType: "企業"
    }
  ]

  return (
    <section
      className="pt-48 pb-32 px-4"
      style={{
        backgroundColor: '#ffffff',
        borderTop: `1px solid ${ACCENT_SURFACE_STRONG}`,
        boxShadow: `0 -32px 80px ${ACCENT_SURFACE}`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl font-bold text-center mb-4"
          style={{
            color: '#6a4e2e',
            textShadow: '1px 1px 2px rgba(106, 78, 46, 0.2)',
            letterSpacing: '-0.02em',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          制作実績
        </h2>
        <p
          className="text-center text-sm text-[#3E2723] mb-20"
          style={{
            opacity: noteVisible ? 1 : 0,
            transform: noteVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          ※掲載中の制作実績は一部抜粋です。
        </p>
        
        <div className="space-y-20">
          {portfolioItems.map((item) => {
            const isCaseOne = item.id === 1

            return (
            <div key={item.id} className="flex flex-col sm:flex-row max-w-4xl mx-auto">
              {/* Image card */}
              <div className={`flex-1 ${isCaseOne ? 'h-auto' : 'h-[500px] md:h-[600px]'}`}>
                <div className={`w-full ${isCaseOne ? '' : 'h-full'} rounded-lg shadow-lg overflow-hidden`} style={isCaseOne ? { backgroundColor: 'rgba(255,255,255,0.95)' } : undefined}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={isCaseOne ? 'w-full h-auto object-contain' : 'w-full h-full object-cover'}
                      style={isCaseOne ? { display: 'block', margin: '0 auto' } : undefined}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <p className="text-gray-500 text-center px-2">Under Construction</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Text content card */}
              <div className="flex-1 h-[500px] md:h-[600px] relative">
                <div className="w-full h-full bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col justify-center">
                  
                  <div className="space-y-4 sm:space-y-6 text-left pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: ACCENT_COLOR }}></div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">作品詳細</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold" style={{color: '#3E2723'}}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{color: '#5D4E37'}}>
                      {item.content}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-gray-100 px-3 py-1 rounded-full" style={{color: '#486581'}}>
                        {item.genre}
                      </span>
                      <span style={{color: '#b86438'}}>
                        {item.clientType}
                      </span>
                    </div>
                    
                    {/* Customer avatars for specific items */}
                    {item.id === 1 && (
                      <div className="flex justify-center items-center gap-2 pt-4">
                        <img src="/img/avatars/qdopp-man1.png" alt="Customer 1" className="w-24 h-24 object-contain" />
                        <img src="/img/avatars/qdopp-man2.png" alt="Customer 2" className="w-24 h-24 object-contain" />
                        <img src="/img/avatars/qdopp-woman1.png" alt="Customer 3" className="w-24 h-24 object-contain" />
                      </div>
                    )}
                    {item.id === 2 && (
                      <div className="flex justify-center items-center pt-4">
                        <img src="/img/avatars/lady1.png" alt="Customer" className="w-24 h-24 object-contain" />
                      </div>
                    )}
                    {item.id === 3 && (
                      <div className="flex justify-center items-center pt-4">
                        <img src="/img/avatars/qdopp-man1.png" alt="Customer" className="w-24 h-24 object-contain" />
                      </div>
                    )}
                    {item.id === 4 && (
                      <div className="flex justify-center items-center pt-4">
                        <img src="/img/avatars/middle-aged-man1.png" alt="Customer" className="w-24 h-24 object-contain" />
                      </div>
                    )}
                    {item.id === 5 && (
                      <div className="flex justify-center items-center pt-4">
                        <img src="/img/avatars/elder-lady.png" alt="Customer" className="w-24 h-24 object-contain" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}
