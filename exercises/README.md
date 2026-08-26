# 演習

[ROADMAP.md](../ROADMAP.md) の Phase 0「基礎の言語化」を、読むだけで終わらせないための演習です。

学習ガイドは <https://ai-study-workshop.gekal.cn/learn/> にあります。
このディレクトリはその「手を動かして確かめる」の部分を実際に動く形にしたものです。

## Phase 0 の完了条件との対応

演習は完了条件に 1 対 1 で対応しています。3 つ埋まれば Phase 1 へ進めます。

| 完了条件 | 演習 | サーバ |
| --- | --- | --- |
| Attention の計算を数式ではなく図と言葉で説明したノートがある | [`attention/`](attention/) | 不要 |
| `api_vegetable.json` の各パラメータについて、なぜその値かを説明できる | [`diffusion/`](diffusion/) | **ComfyUI が必要** |
| 分類タスクで「精度が高いのに使い物にならない」ケースを具体例で説明できる | [`evaluation/`](evaluation/) | 不要 |

**依存ライブラリはありません。** すべて python3 の標準ライブラリだけで動きます。
新しく何かをインストールする必要はありません。

---

## attention — Attention が何を計算しているか

```bash
cd attention
python3 attention.py
python3 attention.py --shuffle
```

「猫 が 魚 を 食べ た」の 6 語について、内積 → スケール → softmax → 重みつき平均を
1 段ずつ数字で表示します。ノートに貼れる SVG も書き出します。

見どころは 2 つです。

- **「食べ」の行** — 自分自身を除くと 魚 > 猫 > 助詞 の順に重い。動作が目的語を参照している。
  この重みは学習ではなく、ベクトルの内積だけから出ています。
- **`--shuffle`** — 語順を入れ替えて再計算し、元の結果と突き合わせます。
  各語の出力が完全に一致することを数値で示します。
  **素の Attention は語順を見ていない** ので、位置エンコーディングが要る、という話に繋がります。

## diffusion — steps と cfg が何をしているか

**先に ComfyUI を起動してください**（`comfyui-vegetable-generator` で `make up`）。

```bash
cd diffusion

# 何が実行されるかだけ確認する（サーバ不要）
python3 sweep.py --workflow ../../../comfyui-vegetable-generator/workflows/api_vegetable.json --dry-run

# 実際に生成する。まずは 4 枚から
python3 sweep.py \
  --workflow ../../../comfyui-vegetable-generator/workflows/api_vegetable.json \
  --steps 8,24 --cfg 4,11
```

seed を固定したまま steps と cfg だけを振り、`out/contact-sheet.html` に一覧を作ります。
seed が同じなので、**画像の違いは steps と cfg だけによるもの**です。

あわせて `out/observations.md` という記入用の雛形を書き出します。
既定値 steps 24 / cfg 7.0 が妥当かを、観察に基づいて書く欄があります。ここが完了条件そのものです。

> **時間に注意。** CPU 推論では 1 枚に数分かかります。既定の 3×3 = 9 枚は長時間かかるので、
> まず `--steps 8,24 --cfg 4,11` の 4 枚から始めてください。

## evaluation — 精度が高いのに使い物にならない、とは

```bash
cd evaluation
python3 metrics.py
```

不良品が 2% しかない検品タスクで、3 つの分類器を比べます。

| 分類器 | 正解率 | 再現率 | 適合率 |
| --- | --- | --- | --- |
| A: 全部良品と言う | **98.0%** | 0.0% | 0.0% |
| B: 6 割を拾う | 95.7% | 70.0% | 27.5% |
| C: 疑わしきは全部止める | 76.2% | **100.0%** | 7.8% |

**A は正解率が最も高いのに、不良を 1 個も見つけていません。**
正解率だけを見ていると気づけない、という具体例です。

そして A・B・C のどれを選ぶかは指標だけでは決まりません。
「不良を 1 個出荷する損失」と「良品を 1 個止める損失」の比で決まり、その比を決めるのは業務の側です。
この構図は Phase 1（生成物の評価）でそのまま効いてきます。

---

## 進め方

1. `evaluation` → `attention` の順に実行する（どちらもサーバ不要、数秒で終わる）
2. ComfyUI を起動して `diffusion` を回す（時間がかかるので最後）
3. 気づいたことを [`notes/`](../notes/) に自分の言葉で書く

**ノートは自分で書いてください。** 書けなかった箇所が、まだ理解していない箇所です。
そこを学習ガイドの参考資料に戻って埋める、というのが Phase 0 のやり方です。
