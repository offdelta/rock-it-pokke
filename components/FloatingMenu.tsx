'use client'

import { useState } from 'react'

const BROWN = '#6a4e2e'

const menuItems = [
  {
    href: 'https://www.instagram.com/ma.poche.pokke4/',
    label: 'Instagram',
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    href: 'mailto:magentaismyfavorite@gmail.com',
    label: 'お問い合わせ',
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  }
]

export default function FloatingMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-5 right-5 z-[999] flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex w-52 flex-col gap-2 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur"
          style={{ border: `1px solid ${BROWN}1A` }}
        >
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[#4e351f] transition hover:bg-[#f4e9df]"
            >
              <span className="text-[#6a4e2e]">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="メニューを開閉"
        className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
        style={{ backgroundColor: BROWN, color: '#fff' }}
      >
        <span className="sr-only">メニュー</span>
        <div className="flex flex-col items-center justify-center gap-1.5">
          <span className="block h-0.5 w-6 bg-white rounded-full" />
          <span className="block h-0.5 w-6 bg-white rounded-full" />
          <span className="block h-0.5 w-6 bg-white rounded-full" />
        </div>
      </button>
    </div>
  )
}
