export const site = {
  title: "Study Memo for AI by gekal",
  description:
    "画像生成・文書理解・エージェントを実際に動かしながら AI を学ぶための実験リポジトリ群と、6 フェーズの学習ロードマップ。動かす → 制約を測る → 残す。",
  org: "gekal-study-ai",
  orgUrl: "https://github.com/gekal-study-ai",
  roadmapUrl:
    "https://github.com/gekal-study-ai/.github/blob/main/ROADMAP.md",
  updatedAt: "2026-08-02",
} as const;

export type RepoStatus = "active" | "paused" | "hub" | "planned";

export type Repo = {
  name: string;
  theme: string;
  description: string;
  status: RepoStatus;
  /** 使っている主な技術。カードにタグとして並べる */
  stack: string[];
  learned: string;
  url?: string;
  private?: boolean;
};

export const repos: Repo[] = [
  {
    name: "comfyui-vegetable-generator",
    theme: "画像生成 / Text-to-Image",
    description:
      "ComfyUI のワークフローを API から叩き、野菜 EC の商品画像を生成する。Mac の Docker Compose だけで完結し、コマンドは 4 つ。",
    status: "active",
    stack: ["ComfyUI", "Stable Diffusion 1.5", "Docker Compose", "Python"],
    learned:
      "ワークフロー API の構造、CPU 推論のステップ数と所要時間の関係、再現可能な実行環境の作り方",
    private: true,
  },
  {
    name: "codex-skills",
    theme: "AI エージェント / Tool use",
    description:
      "AI エージェントから再利用できるスキル集。Android のランチャーアイコンを生成・監査する手順を、エージェントが実行できる形に外部化している。",
    status: "active",
    stack: ["Agent Skills", "Codex", "Android"],
    learned: "手順をスキルとして切り出す粒度の決め方、アイコン構成の監査の自動化",
    private: true,
  },
  {
    name: "dots-ocr-demo",
    theme: "文書理解 / VLM",
    description:
      "DOTS OCR を Docker Compose で動かす検証環境。文書画像からのテキスト抽出を試す。精度の測定には未着手。",
    status: "paused",
    stack: ["DOTS OCR", "VLM", "Docker Compose"],
    learned: "VLM 系 OCR の実行環境の立ち上げ",
    private: true,
  },
  {
    name: ".github",
    theme: "ハブ / 公開",
    description:
      "Organization のハブ。学習ロードマップ、学習ノート、そしてこのサイトのソースを置いている。",
    status: "hub",
    stack: ["Next.js", "MUI", "GitHub Actions", "GitHub Pages"],
    learned: "全体像の管理と、静的サイトとしての公開",
    url: "https://github.com/gekal-study-ai/.github",
  },
];

export const statusLabel: Record<RepoStatus, string> = {
  active: "稼働中",
  paused: "検証止まり",
  hub: "ハブ",
  planned: "予定",
};

export const strengths = [
  "推論環境を再現可能な形で組める。どのリポジトリも数コマンドで立ち上がり、依存はコンテナに閉じている。",
  "制約を数値で残す習慣がある。Mac の Docker から GPU が使えないこと、CPU でのステップ数別の所要時間まで実測して記録している。",
];

export const weaknesses = [
  {
    title: "出力を評価できない",
    body: "生成画像も OCR 結果も、良し悪しを判定する指標がどのリポジトリにもない。「動いた」で観測が止まっている。",
  },
  {
    title: "推論しかしていない",
    body: "学習・微調整・量子化といった、モデルの重みに触れる工程を通っていない。既存モデルの利用者の位置に留まっている。",
  },
  {
    title: "LLM アプリの土台がない",
    body: "エージェントの入口はあるが、その下にあるはずの構造化出力・埋め込み検索・コンテキスト設計を通っていない。",
  },
];

/** いま取り組んでいるフェーズ。パイプライン上で強調表示する */
export const currentPhaseId = 0;

export type Phase = {
  id: number;
  title: string;
  tagline: string;
  period: string;
  newRepo: string | null;
  /** そのフェーズで扱う技術用語。タグとして並べる */
  keywords: string[];
  topics: string[];
  deliverables: string[];
  criteria: string[];
};

export const phases: Phase[] = [
  {
    id: 0,
    title: "基礎の言語化",
    tagline: "既に手を動かして知っていることを、説明できる形にする。",
    period: "2026 Q3",
    newRepo: null,
    keywords: ["Transformer", "Attention", "Diffusion", "VLM", "評価指標"],
    topics: [
      "Transformer の構造（Attention、位置エンコーディング、Encoder / Decoder の役割分担）",
      "Diffusion モデルの原理 — 毎回指定している steps / cfg / sampler が何をしているのか",
      "VLM の仕組み — OCR が「文字認識」ではなく「画像を条件にした生成」である点",
      "評価指標の基礎（精度・再現率・F1、損失関数、交差検証）",
    ],
    deliverables: [
      "notes/transformer.md — 図付きで自分の言葉で説明",
      "notes/diffusion.md — ステップ数・CFG スケールと実際の生成結果を並べた検証つき",
      "notes/evaluation-basics.md — 指標の使い分け",
    ],
    criteria: [
      "workflows/api_vegetable.json の各パラメータについて、なぜその値かを説明できる",
      "Attention の計算を数式ではなく図と言葉で説明したノートがある",
      "分類タスクで「精度が高いのに使い物にならない」ケースを具体例で説明できる",
    ],
  },
  {
    id: 1,
    title: "生成物の評価",
    tagline: "「動いた」から「良し悪しを判定できる」へ。最大の弱点を埋める。",
    period: "2026 Q3–Q4",
    newRepo: "image-eval-lab",
    keywords: ["CLIP Score", "CER", "A/B 比較", "seed 固定", "再現性"],
    topics: [
      "画像生成の定量評価（CLIP Score、美的スコア、参照画像との類似度）",
      "OCR の精度評価（文字誤り率 CER、レイアウト再現の評価）",
      "人手評価の設計 — 評価基準の作り方、A/B 比較、評価者間の一致度",
      "再現性の担保（seed 固定、パラメータのバージョン管理）",
    ],
    deliverables: [
      "image-eval-lab — 生成画像を入力にスコア表と比較グリッドを出す",
      "dots-ocr-demo の再開 — 正解データを用意して CER を測る",
      "各リポジトリの README に「評価結果」セクションを追加",
    ],
    criteria: [
      "生成設定を 3 パターン以上比較し、数値と目視の両方で優劣を示した表がある",
      "dots-ocr-demo に 10 枚以上のテスト文書と、その CER 実測値がある",
      "seed とパラメータを指定すれば同じ画像が再現できることをスクリプトで担保している",
    ],
  },
  {
    id: 2,
    title: "LLM アプリ基礎",
    tagline: "エージェントを作る前に、その土台となる要素を単体で押さえる。",
    period: "2026 Q4",
    newRepo: "rag-playground",
    keywords: ["RAG", "Embeddings", "JSON Schema", "Tool 定義", "LLM-as-a-Judge"],
    topics: [
      "プロンプト設計とコンテキスト設計の違い — 何を渡すかの方が、どう書くかより効く",
      "構造化出力（JSON Schema、Tool 定義による型の強制）",
      "埋め込みとベクトル検索 — チャンク分割、検索の失敗パターン",
      "RAG の全体構成と評価 — 検索の再現率と生成の忠実性を分けて測る",
      "LLM-as-a-Judge の落とし穴、コストとレイテンシの見積もり",
    ],
    deliverables: [
      "rag-playground — OCR 結果を題材に、読み取りから回答生成までを一本の線で繋ぐ",
      "notes/rag-failure-modes.md — うまくいかなかったケースの記録",
    ],
    criteria: [
      "OCR → チャンク分割 → 埋め込み → 検索 → 回答生成が 1 コマンドで通る",
      "検索段階と生成段階のどちらが原因で誤答したか切り分けられる",
      "チャンクサイズを 3 種類変えた場合の精度比較が記録されている",
    ],
  },
  {
    id: 3,
    title: "エージェント化",
    tagline: "単発の応答から、道具を使って多段で動く仕組みへ。",
    period: "2027 Q1",
    newRepo: "mcp-servers",
    keywords: ["Tool use", "MCP", "サブエージェント", "成功率", "権限設計"],
    topics: [
      "Tool use の設計 — ツールの粒度、説明文の書き方、失敗時の扱い",
      "MCP（Model Context Protocol）でのサーバー自作",
      "Skill / サブエージェントによる責務分割",
      "エージェントの評価 — 成功率、実行ステップ数、コスト",
      "権限設計と安全側の設計",
    ],
    deliverables: [
      "mcp-servers — 自作 MCP サーバー",
      "codex-skills の拡充 — スキルの書き方の型を README にまとめる",
      "notes/agent-design.md — ツール分割の判断基準",
    ],
    criteria: [
      "自作 MCP サーバーが複数のクライアントから利用できている",
      "「画像を生成し、評価し、基準を満たすまで再生成する」ループが動く",
      "スキルの成功率を 10 回試行で測り、失敗パターンを分類してある",
    ],
  },
  {
    id: 4,
    title: "推論基盤・運用",
    tagline: "ローカルの Mac から出て、性能とコストを扱えるようにする。",
    period: "2027 Q1–Q2",
    newRepo: "inference-bench",
    keywords: ["量子化", "GGUF", "vLLM", "VRAM", "レイテンシ"],
    topics: [
      "量子化（GGUF、AWQ、GPTQ）と精度・速度・メモリのトレードオフ",
      "推論サーバー（vLLM、Ollama、llama.cpp）の使い分け",
      "GPU 環境 — クラウド GPU の調達、VRAM の見積もり、バッチ処理",
      "監視とログ — トークン消費、レイテンシ分布、失敗率",
      "CI での評価自動化",
    ],
    deliverables: [
      "inference-bench — 同一モデルを構成違いで動かしたベンチマーク",
      "comfyui-vegetable-generator の GPU 対応を実際に動かす",
      "Organization 共通の GitHub Actions ワークフローを整備",
    ],
    criteria: [
      "同一タスクを CPU / GPU / 量子化ありなしで比較した実測表がある",
      "クラウド GPU 上で 1 つのワークロードを完走させ、費用を記録してある",
      "いずれかのリポジトリで評価が CI により自動実行されている",
    ],
  },
  {
    id: 5,
    title: "モデルを作る側へ",
    tagline: "ここまでは既存モデルの利用者。ここからモデル自体に手を入れる。",
    period: "2027 Q2 以降",
    newRepo: "finetune-lab",
    keywords: ["LoRA", "QLoRA", "データセット", "損失曲線", "蒸留"],
    topics: [
      "LoRA / QLoRA によるファインチューニング",
      "データセット構築 — 収集、クリーニング、アノテーション、分割",
      "学習の観測（損失曲線、過学習の検知、早期終了）",
      "画像生成側の LoRA 学習と ControlNet",
      "蒸留・小型化",
    ],
    deliverables: [
      "finetune-lab — 野菜 EC 画像のスタイルを固定する LoRA など",
      "notes/dataset-building.md — データ整備の勘所",
    ],
    criteria: [
      "自作データセットで LoRA を学習させ、ベースモデルとの差を Phase 1 の評価基盤で数値比較できている",
      "学習が失敗した際に、データ・ハイパーパラメータ・実装のどこが原因か切り分けられる",
      "学習コストと得られた改善量を対比して記録してある",
    ],
  },
];

export const principles = [
  {
    title: "動くものを作ってから理論に戻る",
    body: "既存リポジトリはすべて「まず Docker で動かす」から始まっている。この進め方を維持する。",
  },
  {
    title: "1 テーマ 1 リポジトリ",
    body: "リポジトリが成果物であり、進捗の単位でもある。",
  },
  {
    title: "完了条件を先に決める",
    body: "各フェーズに「何ができたら次へ進むか」を明記する。学習が発散しないようにするため。",
  },
];
