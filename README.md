# ma poche 🐰

私が作成したウェブサイトやプロジェクトの一覧サイトです。

## 特徴

- **Next.js 15** と **React 19** を使用
- **Tailwind CSS** でレスポンシブデザイン
- うさぎがポケットに飛び込むアニメーション
- ネイビー、茶色、モスグリーンの落ち着いたカラーパレット
- TypeScript で型安全な開発

## 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI/UX**: カスタムアニメーション、レスポンシブデザイン

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番環境での起動
npm start

# リンターの実行
npm run lint
```

## プロジェクト構成

```
ma-poche/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── RabbitAnimation.tsx
│   └── WebsiteCard.tsx
├── public/
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## カスタマイズ

`app/page.tsx` の `websites` 配列を編集することで、表示するウェブサイトを変更できます。

## デプロイ

このプロジェクトは Vercel、Netlify、その他のNext.js対応ホスティングサービスで簡単にデプロイできます。

## ライセンス

MIT License