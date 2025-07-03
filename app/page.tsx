import RabbitAnimation from '@/components/RabbitAnimation'
import WebsiteCard from '@/components/WebsiteCard'
import ProfileSection from '@/components/ProfileSection'

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
    <main className="min-h-screen" style={{background: 'linear-gradient(135deg, rgba(255, 253, 250, 0.9) 0%, rgba(243, 244, 246, 0.9) 100%)'}}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <RabbitAnimation />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            私が作成したウェブサイトやプロジェクトの一覧です。
            <br />
            それぞれのプロジェクトで新しい技術に挑戦し、学んだことを形にしています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {websites.map((website, index) => (
            <WebsiteCard
              key={index}
              title={website.title}
              description={website.description}
              url={website.url}
              tags={website.tags}
            />
          ))}
        </div>
      </div>

      {/* プロフィール・自己紹介セクション */}
      <ProfileSection />

      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          © 2024 Rock it Pokke! All rights reserved.
        </p>
      </div>
    </main>
  )
}