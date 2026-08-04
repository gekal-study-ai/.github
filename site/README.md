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

UI は [MUI](https://mui.com/)（Material UI v9）を使っています。

| パス | 役割 |
| --- | --- |
| `src/content/data.ts` | サイトに表示する内容。**更新はここだけで済む** |
| `src/theme.ts` | MUI テーマ。配色・タイポグラフィ・各コンポーネントの既定値 |
| `src/app/page.tsx` | トップページ（リポジトリ一覧・現在地・フェーズ概要） |
| `src/app/roadmap/page.tsx` | ロードマップ詳細（フェーズごとの学習項目・成果物・完了条件） |
| `src/components/` | ヘッダー・フッター・フェーズ一覧などの共通パーツ |
| `public/CNAME` | カスタムドメインの指定 |
| `public/.nojekyll` | `_next/` を Jekyll に無視させないため |

## デザインの考え方

計器盤のような見た目を狙っています。

- **アクセントはシアン → 紫のグラデーション。** `--accent-1` / `--accent-2` を `theme.ts` の `MuiCssBaseline` で定義し、見出し・ボタン・ノードで使い回します。色を変えるならこの 2 つだけ直せば全体に効きます
- **ラベルと数値は等幅フォント。** `typography.overline` を等幅・大文字・字間広めに設定してあるので、`variant="overline"` を使えば自動的にその見た目になります
- **背景は `GridBackdrop`。** ドットグリッドと 2 つの光のにじみを固定配置しています。`body` を透過させてこれを見せているため、`body` に背景色を付けると隠れます
- **フェーズは 1 本の経路として描きます。** `PhasePipeline` が縦線とノードを描画し、`data.ts` の `currentPhaseId` と一致するフェーズだけ光らせます。**進捗を進めるときはこの定数を変えてください**

### アイコン

`src/app/` に置いた 3 つのファイルを Next.js が自動で `<link>` タグにします。

| ファイル | 用途 |
| --- | --- |
| `icon.svg` | 主。**これが原本** |
| `icon.png` (96px) | SVG ファビコン非対応ブラウザ向けの控え |
| `apple-icon.png` (180px) | iOS のホーム画面用。iOS 側で角を丸めるため角丸なしの版から起こす |

意匠はロードマップのパイプライン（経路と、到達点で光るノード）です。
**16px での判別を最優先**にしているので、要素を増やしたり縦一列に並べたりしないこと
（縦一列だと小サイズで感嘆符に見えます）。

`icon.svg` を編集したら、PNG を作り直します。

```bash
cd site/src/app
sed 's/ rx="15"//g' icon.svg > /tmp/icon-square.svg
rsvg-convert -w 180 -h 180 /tmp/icon-square.svg -o apple-icon.png
rsvg-convert -w 96 -h 96 icon.svg -o icon.png
```

`rsvg-convert` は `brew install librsvg` で入ります。

### TypeScript 7 について

TypeScript 7 は Go 実装で、Next.js が既定で使う旧コンパイラ API を持ちません。
そのため `next.config.ts` で `experimental.useTypeScriptCli` を有効にし、
型検査を `tsc` の CLI 経由に切り替えています。これがないとビルドが落ちます。

型検査自体は従来どおり効きます（`next build` が型エラーを検出して失敗します）。
TypeScript 6 系に戻す場合は、このフラグを外して構いません。

### MUI を使ううえでの注意

- **ライト / ダークは OS 設定に追従します。** テーマの `cssVariables: { colorSchemeSelector: "media" }` によるもので、切り替え UI は持っていません
- **`Stack` に `gap` や `flexWrap` を直接渡せません。** MUI v9 では system props が外れているため `sx` に書きます
- **`containedPrimary` などの色つきスロットはありません。** v9 では廃止されているため、`variants: [{ props, style }]` で指定します
- **`component={NextLink}` を Server Component から渡せません。** 関数を Client Component へ渡すことになりビルドが落ちます。`src/components/LinkBehavior.tsx` をテーマの `defaultProps` に差し込んであるので、各ページでは `href` を渡すだけで next/link 経由の遷移になります

内容を更新するときは `src/content/data.ts` と `../ROADMAP.md` の両方を直してください。

## カスタムドメインをやめる場合

`public/CNAME` を削除し、`next.config.ts` に以下を追加します
（`https://gekal-study-ai.github.io/.github/` で配信する場合）。

```ts
basePath: "/.github",
assetPrefix: "/.github",
```
