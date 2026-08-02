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
};

export default nextConfig;
