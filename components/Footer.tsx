'use client'

import { ACCENT_SURFACE, ACCENT_SURFACE_STRONG } from './theme'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="w-full py-4 text-center text-xs tracking-wide"
      style={{
        color: '#5D4E37',
        background: ACCENT_SURFACE,
        borderTop: `1px solid ${ACCENT_SURFACE_STRONG}`,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 -2px 10px ${ACCENT_SURFACE}`,
      }}
    >
      © {currentYear} ma poche. All rights reserved.
    </footer>
  )
}
