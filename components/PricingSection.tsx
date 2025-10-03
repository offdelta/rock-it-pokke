'use client'

import { ACCENT_COLOR, ACCENT_SURFACE } from './theme'

const initialPlans = [
  {
    name: 'シンプルプラン',
    target: '趣味サイト／思い出サイト／まずは最小構成で始めたい方',
    pages: '1〜3ページ',
    price: '¥50,000〜',
    features: [
      'トップページ＋下層ページ（2ページまで）',
      'お問い合わせフォーム',
      'スマホ・タブレット対応'
    ]
  },
  {
    name: 'スタンダードプラン',
    target: '小規模企業・個人事業主・ハンドメイド作家の方',
    pages: '4〜6ページ',
    price: '¥100,000〜',
    features: [
      'シンプルプランの内容一式',
      '下層ページ（5ページまで）',
      'ブログ／お知らせ更新機能',
      '基本的なSEO内部対策',
      'Googleマップ等の埋め込み'
    ]
  },
  {
    name: 'カスタムプラン',
    target: 'デザインや機能にこだわりたい方',
    pages: '要相談',
    price: '¥200,000〜',
    features: [
      'スタンダードプランの内容一式',
      'オリジナルデザインでの制作',
      '簡易予約機能やEC機能などの追加',
      'ご要望に応じた機能実装'
    ]
  }
]

const maintenancePlans = [
  {
    name: 'セルフアップデートプラン',
    target: 'ご自身で更新・管理が可能な方',
    price: '¥0',
    details: [
      'サーバー／ドメインはお客様側で契約・管理',
      '更新作業が必要な際は都度お見積もり'
    ]
  },
  {
    name: 'ライトサポートプラン',
    target: '基本的な維持管理を任せたい方',
    price: '¥3,000〜 / 月',
    details: [
      'サーバー・ドメインの契約代行および更新',
      '月1回のサイトデータバックアップ'
    ]
  },
  {
    name: 'スタンダードサポートプラン',
    target: '維持管理に加えて軽微な更新も任せたい方',
    price: '¥8,000〜 / 月',
    details: [
      'ライトサポートプランの内容一式',
      '月1〜2回の軽微なテキスト修正や画像差し替え',
      'WordPress等のシステムアップデート対応'
    ]
  }
]

const optionItems = [
  {
    name: 'ページ追加',
    price: '¥7,500〜 / 1ページ',
    description: '既存構成に新しいページを追加制作します。'
  },
  {
    name: 'ロゴ制作',
    price: '¥10,000〜',
    description: 'サイトに合わせたオリジナルロゴをデザインします。'
  },
  {
    name: '原稿作成（ライティング）',
    price: '¥5,000〜 / 1ページ',
    description: 'ヒアリング内容をもとに、掲載テキストを作成します。'
  },
  {
    name: '写真撮影・素材提供',
    price: '要相談',
    description: '撮影手配や有料素材の選定・購入を代行（素材費は実費）。'
  },
  {
    name: 'アクセス解析レポート',
    price: '¥3,000 / 月',
    description: 'Googleアナリティクス等でサイトを分析し、月1回のレポートをお届けします。'
  }
]

export default function PricingSection() {
  return (
    <section
      className="relative px-4 pt-16 pb-0 md:pt-20"
      style={{ background: 'linear-gradient(to bottom, #efe4d6 0%, #f2ece4 30%, #f6eee4 60%, rgba(255,255,255,0.98) 100%)' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6a4e2e] mb-6">
            料金体系
          </h2>
          <p className="text-sm md:text-base text-[#5D4E37] leading-relaxed max-w-3xl mx-auto">
            Webサイトの目的や運用体制に合わせて、初期制作・運用保守・オプションを組み合わせてご提案します。
            「ひとまず始めたい」方から「デザインも機能もこだわりたい」方まで柔軟に対応いたします。
          </p>
        </div>

        {/* 初期制作費用 */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-2xl font-semibold text-[#6a4e2e] mb-6">① 初期制作費用</h3>
          <p className="text-sm md:text-base text-[#5D4E37] mb-6">
            サイトの種類や規模に合わせて3つの基本プランをご用意しています。プランは目安ですので、内容のカスタマイズもお気軽にご相談ください。
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {initialPlans.map((plan) => (
              <div key={plan.name} className="flex h-full flex-col rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm backdrop-blur">
                <div className="mb-2 text-sm font-semibold tracking-[0.32em] text-[#6a4e2e]">
                  {plan.name}
                </div>
                <p className="mb-4 text-xs text-[#5D4E37] uppercase">{plan.target}</p>
                <div className="mt-auto space-y-1 text-sm text-[#5D4E37]">
                  <div><span className="font-semibold">ページ数目安:</span> {plan.pages}</div>
                  <div><span className="font-semibold">料金目安:</span> {plan.price}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[#5D4E37]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_COLOR }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/30 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h4 className="text-base md:text-lg font-semibold text-[#6a4e2e] mb-4">初期制作費用に含まれる共通項目</h4>
            <ul className="grid gap-3 text-sm text-[#5D4E37] md:grid-cols-2">
              <li>企画・構成：ヒアリングをもとにサイト構成をご提案</li>
              <li>デザイン：テンプレートをベースに色味や雰囲気をカスタマイズ（カスタムプランはフルオリジナル）</li>
              <li>レスポンシブ対応：PC／スマホ／タブレットで最適表示</li>
              <li>基本的なSEO対策：検索エンジンに見つけてもらいやすい設定</li>
              <li>お問い合わせフォーム設置：ご連絡窓口を標準実装</li>
            </ul>
            <div className="mt-4 text-xs text-[#5D4E37]">
              <p className="font-semibold mb-2">ご注意</p>
              <ul className="space-y-1">
                <li>掲載テキストや写真素材は基本的にご支給ください（制作・手配もオプションで承ります）。</li>
                <li>ロゴ制作や特殊な機能追加は別途お見積もりとなります。</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 運用・保守費用 */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-2xl font-semibold text-[#6a4e2e] mb-6">② 運用・保守費用</h3>
          <p className="text-sm md:text-base text-[#5D4E37] mb-6">
            公開後の管理体制に応じて、3つのサポートプランをご用意しています。セルフ運用から丸ごとおまかせまで幅広く対応します。
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <div key={plan.name} className="flex h-full flex-col rounded-2xl border border-white/30 bg-white/70 p-6 shadow-sm backdrop-blur">
                <div className="text-sm font-semibold tracking-[0.28em] text-[#6a4e2e]">{plan.name}</div>
                <p className="mt-1 text-xs text-[#5D4E37] uppercase">{plan.target}</p>
                <p className="mt-3 text-lg font-semibold text-[#6a4e2e]">{plan.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#5D4E37]">
                  {plan.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_COLOR }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/30 bg-white/70 p-6 text-xs text-[#5D4E37] shadow-sm backdrop-blur">
            <p className="font-semibold mb-2">運用・保守に関するご案内</p>
            <ul className="space-y-1">
              <li>独自ドメインをご利用の場合、年間 ¥1,500〜¥5,000 程度のドメイン費用が別途発生します。ライトサポート以上で管理・更新を代行します。</li>
              <li>サーバー費用（年間 ¥5,000〜¥15,000 程度）は実費でのご負担となります。ライトサポート以上で同様に代行可能です。</li>
              <li>大規模なデザイン変更やページ追加、機能拡張は別途お見積もりで承ります。</li>
            </ul>
          </div>
        </div>

        {/* オプション料金 */}
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-[#6a4e2e] mb-6">③ オプション料金</h3>
          <p className="text-sm md:text-base text-[#5D4E37] mb-6">
            追加したい要素や運用フローに合わせてカスタマイズが可能です。下記以外のご要望も遠慮なくお聞かせください。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {optionItems.map((option) => (
              <div key={option.name} className="rounded-2xl border border-white/30 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-base md:text-lg font-semibold text-[#6a4e2e]">{option.name}</h4>
                  <span className="text-sm font-semibold text-[#6a4e2e]">{option.price}</span>
                </div>
                <p className="mt-2 text-sm text-[#5D4E37] leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-[#5D4E37] text-center">
          お見積もりは無料です。Google スプレッドシートやPDFでの料金表共有も可能ですので、お打ち合わせ時にお申し付けください。
        </p>
      </div>
    </section>
  )
}
