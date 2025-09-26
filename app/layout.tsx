import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Droid Sans の設定
const droidSans = {
  className: 'font-droid-sans'
}

export const metadata: Metadata = {
  title: 'ma poche',
  description: 'A collection of my websites and projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning style={{ backgroundColor: '#a1cbb9' }}>
        {children}
      </body>
    </html>
  )
}
