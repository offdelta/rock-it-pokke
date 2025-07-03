'use client'

import { useEffect, useState } from 'react'

export default function RabbitAnimation() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="rabbit-container relative w-32 h-32 mx-auto mb-8">
      <div className="pocket absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-moss-600 rounded-t-full shadow-inner border-2 border-moss-700"></div>
      <div className={`rabbit absolute ${animate ? 'bottom-2 animate-jump-in' : 'bottom-16 -translate-x-8'} left-1/2 transform -translate-x-1/2 transition-all duration-1000`}>
        <div className="text-6xl">🐰</div>
      </div>
    </div>
  )
}