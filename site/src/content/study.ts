/**
 * 現在地（Phase 0）で何を学ぶかの詳細。
 * フェーズが進んだら data.ts の currentPhaseId と合わせてここも差し替える。
 */

export type ResourceKind = "paper" | "article" | "video" | "docs" | "book";

export const resourceKindLabel: Record<ResourceKind, string> = {
  paper: "論文",
  article: "解説",
  video: "動画",
  docs: "ドキュメント",
  book: "書籍",
};

export type ResourceLang = "ja" | "en" | "zh";

export const resourceLangLabel: Record<ResourceLang, string> = {
  ja: "JA",
  en: "EN",
  zh: "ZH",
};

export type Resource = {
  title: string;
  author: string;
  /** 書籍などリンクが無いものは省略する */
  url?: string;
  kind: ResourceKind;
  lang: ResourceLang;
  /** これを読むと何がわかるか */
  note: string;
};

export type StudyItem = {
  id: string;
  title: string;
  /** なぜ今これを学ぶのか。手元のリポジトリとの接続を書く */
  why: string;
  /** 学び終えたときに答えられるようになりたい問い */
  question: string;
  /** 手を動かして確かめること */
  exercise: string;
  resources: Resource[];
};

export const studyIntro =
  "Phase 0 は新しいものを作らず、既に動かして知っていることを説明できる形にする段階です。下の 4 つは、いま手元にあるリポジトリを説明するために必要な順に並べています。上から順に進めれば、後の項目ほど前の項目を前提にできます。参考資料は日本語・英語・中国語を混ぜてあります。英語の原典が重いときは、同じ内容を扱う中国語の教材から入っても構いません。";

export const studyItems: StudyItem[] = [
  {
    id: "transformer",
    title: "Transformer の仕組み",
    why: "この先のフェーズはすべて Transformer の上に乗ります。codex-skills で使っているエージェントも、Phase 2 で作る RAG も、Phase 3 の Tool use も同じ土台です。ここを飛ばすと、以降の「なぜそう動くのか」がすべて暗記になります。",
    question:
      "Attention は何を計算しているのか。なぜ再帰なしで系列を扱えるのか。",
    exercise:
      "短い文を 1 つ選び、各トークンがどのトークンを参照するかを図に描いてみる。数式ではなく矢印で説明できれば十分です。",
    resources: [
      {
        title: "The Illustrated Transformer",
        author: "Jay Alammar",
        url: "https://jalammar.github.io/illustrated-transformer/",
        kind: "article",
        lang: "en",
        note: "まずこれ。図だけで全体像がつかめる。数式は出てこない。",
      },
      {
        title: "But what is a GPT? Visual intro to Transformers",
        author: "3Blue1Brown",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        kind: "video",
        lang: "en",
        note: "同じ内容を動画で。行列演算が何をしているかの直感が得られる。",
      },
      {
        title: "Let's build GPT: from scratch, in code, spelled out",
        author: "Andrej Karpathy",
        url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
        kind: "video",
        lang: "en",
        note: "手を動かす用。写経すると Attention が数十行で書けることがわかる。",
      },
      {
        title: "Attention Is All You Need",
        author: "Vaswani et al., 2017",
        url: "https://arxiv.org/abs/1706.03762",
        kind: "paper",
        lang: "en",
        note: "原典。上の解説を読んだ後なら図 1 と 3.2 節だけでも読める。",
      },
      {
        title: "The Annotated Transformer",
        author: "Harvard NLP",
        url: "https://nlp.seas.harvard.edu/annotated-transformer/",
        kind: "article",
        lang: "en",
        note: "論文の各段落に実装を並べたもの。原典で詰まったら参照する。",
      },
      {
        title: "《动手学深度学习》注意力机制与 Transformer",
        author: "李沐 ほか",
        url: "https://zh.d2l.ai/chapter_attention-mechanisms-and-transformers/transformer.html",
        kind: "docs",
        lang: "zh",
        note: "中文の定番教材。数式と実装が並んでいるので、図解の次に読むならこれ。",
      },
      {
        title: "Transformer论文逐段精读【论文精读】",
        author: "李沐",
        url: "https://www.bilibili.com/video/BV1pu411o7BE",
        kind: "video",
        lang: "zh",
        note: "原論文を 1 段ずつ読み下す動画。英語の原典が重いときの入口になる。",
      },
      {
        title: "Transformers快速入门",
        author: "小昇",
        url: "https://transformers.run/",
        kind: "docs",
        lang: "zh",
        note: "実装寄りの中文教材。Hugging Face を触りながら仕組みを追える。",
      },
    ],
  },
  {
    id: "diffusion",
    title: "Diffusion モデルの仕組み",
    why: "comfyui-vegetable-generator では毎回 steps / cfg / sampler を指定していますが、それぞれが何をしているかは未整理のままです。Phase 1 で生成物を評価するには、まず「どのパラメータが何に効くか」を説明できる必要があります。",
    question:
      "steps を増やすと何が起きるのか。cfg スケールは何と何のバランスを取っているのか。",
    exercise:
      "同じ seed のまま steps と cfg だけを変えた画像を並べ、変化を言葉で説明する。Phase 1 の評価基盤の原型になります。",
    resources: [
      {
        title: "The Illustrated Stable Diffusion",
        author: "Jay Alammar",
        url: "https://jalammar.github.io/illustrated-stable-diffusion/",
        kind: "article",
        lang: "en",
        note: "手元で動かしている SD 1.5 の構成そのものの解説。ここから入る。",
      },
      {
        title: "What are Diffusion Models?",
        author: "Lilian Weng",
        url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/",
        kind: "article",
        lang: "en",
        note: "数式を含む体系的な解説。図解で足りなくなったら読む。",
      },
      {
        title: "Diffusion Course",
        author: "Hugging Face",
        url: "https://huggingface.co/learn/diffusion-course",
        kind: "docs",
        lang: "en",
        note: "手を動かす教材。ノートブックで各工程を分解して試せる。",
      },
      {
        title: "Denoising Diffusion Probabilistic Models",
        author: "Ho et al., 2020",
        url: "https://arxiv.org/abs/2006.11239",
        kind: "paper",
        lang: "en",
        note: "拡散モデルの原典。ノイズを足して戻すという発想の出どころ。",
      },
      {
        title: "High-Resolution Image Synthesis with Latent Diffusion Models",
        author: "Rombach et al., 2022",
        url: "https://arxiv.org/abs/2112.10752",
        kind: "paper",
        lang: "en",
        note: "Stable Diffusion の原典。なぜ潜在空間で拡散させるのかがわかる。",
      },
      {
        title: "Classifier-Free Diffusion Guidance",
        author: "Ho & Salimans, 2022",
        url: "https://arxiv.org/abs/2207.12598",
        kind: "paper",
        lang: "en",
        note: "cfg の正体。プロンプトへの忠実さと多様性のトレードオフの根拠。",
      },
      {
        title: "ComfyUI Documentation",
        author: "Comfy Org",
        url: "https://docs.comfy.org/",
        kind: "docs",
        lang: "en",
        note: "ワークフローの各ノードが上のどの工程に当たるかの対応づけ用。",
      },
      {
        title: "生成扩散模型漫谈（一）：DDPM = 拆楼 + 建楼",
        author: "苏剑林（科学空间）",
        url: "https://kexue.fm/archives/9119",
        kind: "article",
        lang: "zh",
        note: "中文の拡散モデル解説では随一の連載。比喩から数式へ段階的に進む。",
      },
    ],
  },
  {
    id: "vlm",
    title: "VLM と文書理解",
    why: "dots-ocr-demo は起動しただけで止まっています。VLM 系の OCR は文字を 1 文字ずつ認識しているのではなく、画像を条件にテキストを生成しています。この違いを理解しないと、Phase 1 で誤り方を分類できません。",
    question:
      "VLM の OCR はなぜ「それらしいが存在しない文字列」を出すことがあるのか。",
    exercise:
      "わざと読みにくい文書を入力し、出力がどう崩れるかを観察する。崩れ方が古典的 OCR と違うことを確かめます。",
    resources: [
      {
        title: "Vision Language Models Explained",
        author: "Hugging Face",
        url: "https://huggingface.co/blog/vlms",
        kind: "article",
        lang: "en",
        note: "VLM の構成要素と学習方法の概観。最初の 1 本。",
      },
      {
        title: "Learning Transferable Visual Models From Natural Language Supervision",
        author: "Radford et al., 2021",
        url: "https://arxiv.org/abs/2103.00020",
        kind: "paper",
        lang: "en",
        note: "CLIP の原典。画像とテキストを同じ空間に置く発想。Phase 1 の CLIP Score の前提にもなる。",
      },
      {
        title: "Visual Instruction Tuning",
        author: "Liu et al., 2023",
        url: "https://arxiv.org/abs/2304.08485",
        kind: "paper",
        lang: "en",
        note: "LLaVA の論文。視覚エンコーダと言語モデルの繋ぎ方がわかる。",
      },
      {
        title: "OCR-free Document Understanding Transformer",
        author: "Kim et al., 2022",
        url: "https://arxiv.org/abs/2111.15664",
        kind: "paper",
        lang: "en",
        note: "Donut の論文。OCR を介さず文書を直接読む系統の出発点。",
      },
      {
        title: "大模型基础",
        author: "Datawhale",
        url: "https://github.com/datawhalechina/so-large-lm",
        kind: "docs",
        lang: "zh",
        note: "大規模モデル全般の中文教材。VLM 専門ではないが前提知識をまとめて埋められる。",
      },
      {
        title: "机器学习 2023 春（生成式 AI を含む）",
        author: "李宏毅",
        url: "https://speech.ee.ntu.edu.tw/~hylee/ml/2023-spring.php",
        kind: "video",
        lang: "zh",
        note: "スライドと講義動画が公開されている。生成モデル全般を中国語で追える。",
      },
    ],
  },
  {
    id: "evaluation",
    title: "評価指標の基礎",
    why: "現在地の分析で最大の弱点として挙げた「出力を評価できない」を埋めるための準備です。Phase 1 に入る前にここを済ませておかないと、指標を選ぶ段階で手が止まります。",
    question:
      "精度が高いのに使い物にならないのはどういう状況か。生成物にはなぜ正解率が使えないのか。",
    exercise:
      "手元の OCR 出力を 10 件だけ目視で採点し、どういう基準で「良い」と判断したかを言語化する。それが指標の原型になります。",
    resources: [
      {
        title: "Machine Learning Crash Course",
        author: "Google",
        url: "https://developers.google.com/machine-learning/crash-course",
        kind: "docs",
        lang: "en",
        note: "分類の評価指標の章だけで十分。日本語表示に対応している。",
      },
      {
        title: "Metrics and scoring",
        author: "scikit-learn",
        url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
        kind: "docs",
        lang: "en",
        note: "指標の定義と使い分けの一覧。実装しながら参照する用。",
      },
      {
        title: "CLIPScore: A Reference-free Evaluation Metric for Image Captioning",
        author: "Hessel et al., 2021",
        url: "https://arxiv.org/abs/2104.08718",
        kind: "paper",
        lang: "en",
        note: "Phase 1 で使う CLIP Score の原典。正解画像なしで測る発想。",
      },
      {
        title: "GANs Trained by a Two Time-Scale Update Rule Converge to a Local Nash Equilibrium",
        author: "Heusel et al., 2017",
        url: "https://arxiv.org/abs/1706.08500",
        kind: "paper",
        lang: "en",
        note: "FID の初出。画像生成の分布を比べる指標として今も使われる。",
      },
      {
        title: "パターン認識と機械学習",
        author: "C.M. ビショップ",
        kind: "book",
        lang: "ja",
        note: "手元にある書籍。評価と検証の章を辞書的に引く用途で十分です。",
      },
      {
        title: "《动手学深度学习》",
        author: "李沐 ほか",
        url: "https://zh.d2l.ai/",
        kind: "docs",
        lang: "zh",
        note: "過学習・モデル選択・検証の章が該当。中文で通読できる定番教材。",
      },
      {
        title: "LeeDL Tutorial（李宏毅深度学习教程）",
        author: "Datawhale",
        url: "https://datawhalechina.github.io/leedl-tutorial/",
        kind: "docs",
        lang: "zh",
        note: "李宏毅の講義を中文で書き起こした教材。学習の評価まわりの説明が丁寧。",
      },
    ],
  },
];

/** 進め方の目安 */
export const studyOrder = [
  {
    step: "1",
    label: "図解で全体像",
    body: "各項目の最初に挙げた解説記事・動画だけを、4 項目ぶん通しで読む。この時点では論文に入らない。",
  },
  {
    step: "2",
    label: "手元のパラメータと接続",
    body: "Diffusion の項目の演習を行い、workflows/api_vegetable.json の値と結びつける。Phase 0 の完了条件のひとつがここで埋まる。",
  },
  {
    step: "3",
    label: "原典で裏を取る",
    body: "説明していて曖昧だった箇所だけ論文に戻る。最初から全部読もうとしない。",
  },
  {
    step: "4",
    label: "ノートに落とす",
    body: "notes/ に自分の言葉で書く。書けなかった箇所が、まだ理解していない箇所です。",
  },
];
