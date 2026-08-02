# site

[ROADMAP.md](../ROADMAP.md) の内容を公開するための Next.js 静的サイトです。

公開先: https://ai-study-workshop.gekal.cn

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

`out/` に静的ファイルが出力されます（`output: "export"`）。ローカルで確認する場合:

```bash
npx serve out
```

## デプロイ

`main` ブランチの `site/` 配下が変更されると
[deploy-pages.yml](../.github/workflows/deploy-pages.yml) が実行され、
GitHub Pages へ自動デプロイされます。

## 構成

| パス | 役割 |
| --- | --- |
| `src/content/data.ts` | サイトに表示する内容。**更新はここだけで済む** |
| `src/app/page.tsx` | トップページ（リポジトリ一覧・現在地・フェーズ概要） |
| `src/app/roadmap/page.tsx` | ロードマップ詳細（フェーズごとの学習項目・成果物・完了条件） |
| `src/app/globals.css` | スタイル全般。ライト / ダークは OS 設定に追従 |
| `public/CNAME` | カスタムドメインの指定 |
| `public/.nojekyll` | `_next/` を Jekyll に無視させないため |

内容を更新するときは `src/content/data.ts` と `../ROADMAP.md` の両方を直してください。

## カスタムドメインをやめる場合

`public/CNAME` を削除し、`next.config.ts` に以下を追加します
（`https://gekal-study-ai.github.io/.github/` で配信する場合）。

```ts
basePath: "/.github",
assetPrefix: "/.github",
```
