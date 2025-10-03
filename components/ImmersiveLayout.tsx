'use client'

import ArcCarousel from './ArcCarousel'
import FloatingMenu from './FloatingMenu'
import PricingSection from './PricingSection'
import ProfileSection from './ProfileSection'

const heroLines = [
  {
    key: 'lead-word',
    element: (
      <span className="inline-block text-2xl md:text-3xl font-extrabold tracking-tight text-[#6a4e2e]">
        マ ポッシュ
      </span>
    )
  },
  {
    key: 'pronunciation',
    element: (
      <span className="inline-block text-xs md:text-sm tracking-[0.35em] uppercase text-[#6a4e2e]">
        【フランス語で”私のポケット”】
      </span>
    )
  },
  {
    key: 'line-1',
    element: (
      <p className="text-base md:text-lg leading-relaxed text-[#6a4e2e]">
        あなたの想いを、ポケットへ。
      </p>
    )
  },
  {
    key: 'line-2',
    element: (
      <p className="text-base md:text-lg leading-relaxed text-[#6a4e2e]">
        いつでも開ける、私だけの宝箱サイト。
      </p>
    )
  },
]

export default function ImmersiveLayout() {
  return (
    <div className="flex flex-col">
      <FloatingMenu />
      <section
        className="relative isolate overflow-hidden"
        style={{
          background:
            'linear-gradient(to bottom, #c9f1e0 0%, #bfeae0 35%, #e7f7f3 70%, rgba(255,255,255,0.98) 100%)',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_60%)]" aria-hidden />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
          <img
            src="/img/ma-poche-logo.png"
            alt="ma poche Logo"
            className="mb-10 w-24 max-w-full drop-shadow-md md:w-32"
          />
          <div className="flex flex-col items-center gap-3">
            {heroLines.map((line) => (
              <div key={line.key}>{line.element}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-0 mt-16 md:mt-24">
        <ArcCarousel />
      </section>

      <section className="px-0">
        <PricingSection />
      </section>

      <section className="px-0 mt-32">
        <ProfileSection />
      </section>
    </div>
  )
}
