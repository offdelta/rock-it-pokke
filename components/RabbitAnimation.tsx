'use client'

import Image from 'next/image'

export default function RabbitAnimation() {
  return (
    <div className="relative w-[70vw] md:w-[50vw] lg:w-[50vw] max-w-2xl mx-auto mb-8">
      <Image
        src="/pokkeinthepochet.gif"
        alt="Pokke in the Pocket Animation"
        width={800}
        height={600}
        className="w-full h-auto"
        priority
      />
      <h1 className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg whitespace-nowrap">
        Rock it Pokke!
      </h1>
    </div>
  )
}