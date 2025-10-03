'use client'

import React from 'react'
import Image from 'next/image'
import {
  ACCENT_COLOR,
  ACCENT_SURFACE,
  ACCENT_SURFACE_STRONG,
  PRIMARY_BROWN,
  PRIMARY_BROWN_DARK,
} from './theme'

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
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{
          position: 'relative',
          zIndex: 10000,
          boxShadow: '0 28px 60px rgba(0, 0, 0, 0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div
          className="flex justify-between items-center p-6 rounded-t-2xl"
          style={{
            background: `linear-gradient(130deg, ${PRIMARY_BROWN} 0%, ${PRIMARY_BROWN_DARK} 100%)`,
            borderColor: ACCENT_SURFACE_STRONG,
            color: '#fff',
          }}
        >
          <h2 className="text-2xl font-bold tracking-wide" style={{ letterSpacing: '0.08em' }}>
            プロジェクト詳細
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center"
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
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: ACCENT_COLOR, boxShadow: `0 0 0 6px ${ACCENT_SURFACE}` }}
              ></div>
              <span
                className="text-xs uppercase tracking-[0.35em] font-semibold"
                style={{ color: ACCENT_COLOR }}
              >
                Case {project.id}
              </span>
            </div>

            <h3
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: PRIMARY_BROWN, letterSpacing: '-0.01em' }}
            >
              {project.title}
            </h3>

            <div
              className="space-y-4 leading-relaxed mb-6"
              style={{ color: '#5D4E37' }}
            >
              <p>{project.content}</p>
              {project.modalDescription && (
                <p>{project.modalDescription}</p>
              )}
            </div>

            <div
              className="flex justify-between items-center pt-4 border-t"
              style={{ borderTopColor: ACCENT_SURFACE_STRONG }}
            >
              <span
                className="px-3 py-1 rounded-full text-xs font-medium tracking-wide"
                style={{
                  background: ACCENT_SURFACE,
                  color: ACCENT_COLOR,
                  border: `1px solid ${ACCENT_SURFACE_STRONG}`,
                }}
              >
                {project.genre}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: PRIMARY_BROWN }}
              >
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
            className="w-full text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: ACCENT_COLOR,
              boxShadow: '0 16px 30px rgba(77, 111, 77, 0.28)'
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(77, 111, 77, 0.92)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT_COLOR
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="font-semibold">サイトを見る</span>
          </a>
          
          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg transition-all duration-300 font-medium border focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: ACCENT_SURFACE,
              borderColor: ACCENT_COLOR,
              color: ACCENT_COLOR,
              boxShadow: `0 6px 16px ${ACCENT_SURFACE}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(77, 111, 77, 0.18)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT_SURFACE
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
