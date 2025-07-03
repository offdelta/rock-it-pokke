import RabbitAnimation from '@/components/RabbitAnimation'
import WebsiteCard from '@/components/WebsiteCard'

const websites = [
  {
    title: "Sample Portfolio",
    description: "私のポートフォリオサイトです。React と Next.js を使用して作成しました。",
    url: "https://example.com",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder-image.jpg"
  },
  {
    title: "Blog Site",
    description: "技術的な記事や日常のことを書いているブログサイトです。",
    url: "https://example.com/blog",
    tags: ["Blog", "Markdown", "CMS"],
  },
  {
    title: "E-commerce Demo",
    description: "ECサイトのデモンストレーションです。商品管理や決済機能を実装しました。",
    url: "https://example.com/shop",
    tags: ["E-commerce", "Stripe", "Database"],
  },
  {
    title: "Task Management App",
    description: "タスク管理アプリケーションです。チームでのプロジェクト管理に使用できます。",
    url: "https://example.com/tasks",
    tags: ["Productivity", "React", "Firebase"],
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