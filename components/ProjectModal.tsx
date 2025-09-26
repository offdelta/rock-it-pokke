'use client'

import React from 'react'
import Image from 'next/image'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    image: string | null
    title: string
    content: string
    genre: string
    clientType: string
    url?: string
    modalDescription?: string
  } | null
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ 
        zIndex: 9999, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          position: 'relative',
          zIndex: 10000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-[#3E2723]">プロジェクト詳細</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          {/* 画像 */}
          {project.image && (
            <div className="mb-6 w-full h-64 relative rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
              />
            </div>
          )}

          {/* プロジェクト情報 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Case {project.id}</span>
            </div>

            <h3 className="text-xl font-bold text-[#3E2723] mb-4">
              {project.title}
            </h3>

            <div className="space-y-4 text-[#5D4E37] leading-relaxed mb-6">
              <p>{project.content}</p>
              {project.modalDescription && (
                <p>{project.modalDescription}</p>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-[#486581]">
                {project.genre}
              </span>
              <span className="text-sm text-[#b86438] font-medium">
                {project.clientType}
              </span>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="px-6 pb-6 space-y-3">
          {/* サイトを見るボタン */}
          <a
            href={project.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#7f4e01] to-[#8B6239] text-white py-3 rounded-lg hover:from-[#4A320E] hover:to-[#6B4829] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="font-semibold">サイトを見る</span>
          </a>
          
          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg transition-all duration-300 font-medium"
            style={{
              background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(139, 105, 20, 0.1) 100%)',
              border: '1px solid rgba(184, 134, 11, 0.3)',
              color: '#8B6914',
              boxShadow: '0 2px 4px rgba(184, 134, 11, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(184, 134, 11, 0.2) 0%, rgba(139, 105, 20, 0.2) 100%)'
              e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(184, 134, 11, 0.1) 0%, rgba(139, 105, 20, 0.1) 100%)'
              e.currentTarget.style.borderColor = 'rgba(184, 134, 11, 0.3)'
            }}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
