'use client'

export default function PortfolioSection() {
  const portfolioItems = [
    {
      id: 1,
      image: "/img/clients/qdopp-long.jpg",
      title: "多言語対応で世界へ！",
      content: "国際ビジネスコンサルティング企業の英語と日本語両言語対応のWebサイトです。アニメーションをふんだんに使用し、リズミカルで閲覧する人がワクワクするような見た目になっています。",
      genre: "サービス紹介",
      clientType: "企業"
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
      image: null,
      title: "故人の思い出と共に。",
      content: "落ち着いた雰囲気で思い出の写真や作品と共に思い出を活字化して風化させないお手伝い。リンクなどは貼らず、自分用専用のいつでも見られるページです。",
      genre: "思い出ページ・個人用",
      clientType: "主婦"
    }
  ]

  return (
    <section className="pt-48 pb-32 px-4" style={{ backgroundColor: '#98E4D6' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4" style={{color: '#6a4e2e'}}>
          制作実績
        </h2>
        <p className="text-center text-sm text-[#3E2723] mb-20">
          ※掲載中の制作実績は一部抜粋です。
        </p>
        
        <div className="space-y-20">
          {portfolioItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row max-w-4xl mx-auto">
              {/* Image card */}
              <div className="flex-1 h-[500px] md:h-[600px]">
                <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
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
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
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
          ))}
        </div>
      </div>
    </section>
  )
}
