'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="w-full py-4 text-center text-xs tracking-wide"
      style={{
        color: '#5D4E37',
        background: 'rgba(189, 221, 207, 0.72)',
        borderTop: '1px solid rgba(93, 78, 55, 0.25)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -2px 8px rgba(93, 78, 55, 0.08)',
      }}
    >
      © {currentYear} ma poche. All rights reserved.
    </footer>
  )
}
