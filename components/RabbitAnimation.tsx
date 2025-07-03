'use client'

import Image from 'next/image'

export default function RabbitAnimation() {
  return (
    <div className="relative w-[70vw] md:w-[50vw] lg:w-[50vw] max-w-2xl mx-auto mb-8">
      <Image
        src="/gif/pokkeinthepocket.gif"
        alt="Pokke in the Pocket Animation"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
    </div>
  )
}