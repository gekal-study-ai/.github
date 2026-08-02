import type { NextConfig } from "next";

// カスタムドメイン (ai-study-workshop.gekal.cn) のルートで配信するため
// basePath / assetPrefix は不要。
// ドメインを使わず https://<org>.github.io/<repo>/ で公開する場合のみ
// basePath と assetPrefix にリポジトリ名を設定すること。
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // TypeScript 7 は Go 実装で、Next.js が既定で使う旧コンパイラ API を
    // 持たない。このフラグで型検査を tsc の CLI 経由に切り替える。
    // TypeScript 6 に戻す場合はこの指定を外してよい。
    useTypeScriptCli: true,
  },
};

export default nextConfig;
