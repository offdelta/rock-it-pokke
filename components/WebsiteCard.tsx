interface WebsiteCardProps {
  title: string
  description: string
  url: string
  tags: string[]
  image?: string
}

export default function WebsiteCard({ title, description, url, tags, image }: WebsiteCardProps) {
  return (
    <div className="card hover:shadow-xl transition-shadow duration-300 group">
      {image && (
        <div className="w-full h-48 bg-gray-100 rounded-t-lg mb-4 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2" style={{color: '#6a4e2e'}}>{title}</h3>
      <p className="mb-4 text-sm leading-relaxed" style={{color: '#6a4e2e'}}>{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{backgroundColor: '#e3e8e3', color: '#273827'}}
          >
            {tag}
          </span>
        ))}
      </div>
      
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors duration-200 text-sm font-medium"
        style={{backgroundColor: '#486581'}}
      >
        サイトを見る
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  )
}
