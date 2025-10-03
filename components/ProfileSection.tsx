'use client'

import React from 'react'
import Footer from './Footer'
import { ACCENT_COLOR, ACCENT_SURFACE, ACCENT_SURFACE_STRONG } from './theme'

interface ProfileSectionProps {
  scrollProgress?: number
}

export default function ProfileSection({ scrollProgress = 1 }: ProfileSectionProps) {
  const titleText = '自己紹介'

  const textLines = [
    '「大切なものを、いつでも手元に。」',
    '',
    'スマホ一つで何でも叶う時代だからこそ、',
    'お客様の想いや宝物を、',
    '手のひらサイズのウェブサイトに変えて、',
    'いつでも持ち歩けるようお手伝いします。',
    '',
    '趣味、教室、個人のバイオグラフィなど、',
    '小さなご要望こそ大歓迎です。',
    '',
    'まずはお気軽に、あなたの「大切」についてお聞かせください。',
  ]

  // スクロール進行に合わせて3パート（タイトル→本文→アバター）を順番にスライドアップ
  const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v))
  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
  const p = clamp(scrollProgress)

  const progress = (start: number, duration: number) => clamp((p - start) / duration)

  const titleStart = 0.05
  const titleDuration = 0.3
  const afterTitleGap = 0.07
  const textStart = titleStart + titleDuration + afterTitleGap

  const titleProgress = progress(titleStart, titleDuration)
  const titleOpacity = titleProgress
  const titleY = 50 * (1 - easeInOut(titleProgress))

  const textWindow = 0.45
  const totalLines = textLines.length
  const lineSegment = totalLines > 0 ? textWindow / totalLines : 0
  const lineDuration = lineSegment * 0.92
  const lineGap = lineSegment - lineDuration

  const getLineProgress = (index: number) => {
    if (lineSegment <= 0) return 1
    const lineStart = textStart + index * lineSegment
    return progress(lineStart, lineDuration)
  }

  const textBlockProgress = textWindow > 0 ? progress(textStart, textWindow) : 1
  const textBlockOpacity = textBlockProgress
  const textBlockY = 100 * (1 - easeInOut(textBlockProgress))

  const afterTextGap = 0.05
  const avatarStart = textStart + textWindow + afterTextGap
  const avatarDuration = 0.08
  const avatarProgress = progress(avatarStart, avatarDuration)
  const avatarOpacity = avatarProgress
  const avatarY = 90 * (1 - easeInOut(avatarProgress))

  return (
    <section
      className="relative pt-16 pb-0 px-4"
      style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, #eaf6f2 55%, #c9f1e0 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 mt-8"
          style={{
            color: '#6a4e2e',
            textShadow: '1px 1px 2px rgba(106, 78, 46, 0.2)',
            letterSpacing: '-0.02em',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            transition: 'none',
          }}
        >
          {titleText}
        </h2>

        <div
          className="space-y-4"
          style={{
            opacity: textBlockOpacity,
            transform: `translateY(${textBlockY}px)`,
            transition: 'none',
          }}
        >
          {textLines.map((line, i) => {
            const lineProgress = getLineProgress(i)
            const lineOpacity = lineProgress
            const lineY = 120 * (1 - easeInOut(lineProgress))
            const isSpacer = line.trim().length === 0

            return (
              <div
                key={i}
                style={{
                  opacity: lineOpacity,
                  transform: `translateY(${lineY}px)`,
                  transition: 'none',
                  minHeight: isSpacer ? '1rem' : undefined,
                }}
              >
                {isSpacer ? (
                  <span aria-hidden="true">&nbsp;</span>
                ) : (
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: '#5D4E37' }}>
                    {line}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      
        {/* アバター：テキストの後、十分な余白を取ってから下からスライド表示 */}
        <div
          style={{
            opacity: avatarOpacity,
            transform: `translateY(${avatarY}px)`,
            transition: 'none',
            marginTop: '1.5rem',
            }}
        >
          <div className="flex justify-center">
            <img
              src="/img/pokke-daisy.png"
              alt="プロフィールアバター"
              className="w-32 h-32 object-cover rounded-full border-2 shadow-lg"
              style={{ borderColor: ACCENT_COLOR }}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 w-screen relative left-1/2 -translate-x-1/2">
        <Footer />
      </div>
    </section>
  )
}
