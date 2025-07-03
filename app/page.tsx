import RabbitAnimation from '@/components/RabbitAnimation'
import WebsiteCard from '@/components/WebsiteCard'

const websites = [
  {
    title: "Mayu MyCraft",
    description: "クリエイティブなハンドメイド作品を紹介するサイトです。オリジナルデザインの雑貨や小物を展開しています。",
    url: "https://mayu-mycraft.com",
    tags: ["ハンドメイド", "デザイン", "EC", "クリエイティブ"],
  },
  {
    title: "Sakura Saku",
    description: "桜をテーマにした美しいウェブサイトです。日本の伝統的な美意識とモダンなデザインを融合させました。",
    url: "https://sakura-saku.com",
    tags: ["デザイン", "日本文化", "ビジュアル", "コンテンツ"],
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <RabbitAnimation />
          <h1 className="text-5xl font-bold mb-4" style={{color: '#243b53'}}>
            Rock it Pokke!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            私が作成したウェブサイトやプロジェクトの一覧です。
            <br />
            それぞれのプロジェクトで新しい技術に挑戦し、学んだことを形にしています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {websites.map((website, index) => (
            <WebsiteCard
              key={index}
              title={website.title}
              description={website.description}
              url={website.url}
              tags={website.tags}
              image={website.image}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm">
            © 2024 Rock it Pokke! All rights reserved.
          </p>
        </div>
      </div>
    </main>
  )
}