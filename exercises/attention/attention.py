#!/usr/bin/env python3
"""Attention が何を計算しているかを、数式ではなく数字と図で確かめる演習。

対応する完了条件（ROADMAP.md Phase 0）:
  「Attention の計算を数式ではなく図と言葉で説明したノートがある」

依存ライブラリなし。python3 だけで動く。

  python3 attention.py              # 通常の実行
  python3 attention.py --shuffle    # 語順を入れ替えて比較する
"""

from __future__ import annotations

import argparse
import math
import pathlib

# ---------------------------------------------------------------------------
# 題材
#
# 「猫 が 魚 を 食べ た」という文を使う。
# 埋め込みは学習済みのものではなく、意味を手で決めた 4 次元ベクトル。
# 次元の意味は順に [生き物, 食べ物, 動作, 助詞] とする。
# こうしておくと、Attention が「関係のある語」を拾う様子が数字で追える。
# ---------------------------------------------------------------------------
TOKENS = ["猫", "が", "魚", "を", "食べ", "た"]

EMBEDDINGS: dict[str, list[float]] = {
    #          生き物  食べ物  動作   助詞
    "猫": [1.0, 0.0, 0.0, 0.0],
    "が": [0.0, 0.0, 0.0, 1.0],
    "魚": [0.2, 1.0, 0.0, 0.0],
    "を": [0.0, 0.0, 0.0, 1.0],
    "食べ": [0.3, 0.6, 1.0, 0.0],
    "た": [0.0, 0.0, 0.4, 0.3],
}

DIM = 4

# 内積の大きさが softmax の尖り方を決める。値が小さいと重みが平坦になり
# 図から何も読み取れないので、意味は変えずに全体を定数倍している。
# 実際のモデルでも、学習が進むほどここが尖っていく。
SCALE_UP = 2.0


def matmul_t(a: list[list[float]], b: list[list[float]]) -> list[list[float]]:
    """a @ b.T を返す。行同士の内積。"""
    return [[sum(x * y for x, y in zip(row_a, row_b)) for row_b in b] for row_a in a]


def softmax(row: list[float]) -> list[float]:
    m = max(row)
    exps = [math.exp(v - m) for v in row]  # オーバーフロー避けに最大値を引く
    total = sum(exps)
    return [e / total for e in exps]


def attention(vectors: list[list[float]]) -> tuple[list[list[float]], list[list[float]]]:
    """スケール付き内積 Attention。

    ここでは Q = K = V = 入力（self-attention の最も素朴な形）。
    実際のモデルは Q/K/V それぞれに重み行列を掛けるが、
    「何を計算しているか」を見るぶんにはこれで足りる。
    """
    scores = matmul_t(vectors, vectors)  # 1. 全ペアの内積 = 似ている度合い
    scale = math.sqrt(len(vectors[0]))
    scaled = [[s / scale for s in row] for row in scores]  # 2. 次元数で割る
    weights = [softmax(row) for row in scaled]  # 3. 行ごとに合計 1 へ

    # 4. 重みつき平均で値を混ぜる
    outputs = []
    for w_row in weights:
        mixed = [0.0] * len(vectors[0])
        for w, vec in zip(w_row, vectors):
            for i, v in enumerate(vec):
                mixed[i] += w * v
        outputs.append(mixed)
    return weights, outputs


DIM_NAMES = ["生き物", "食べ物", "動作", "助詞"]


def print_matrix(
    title: str,
    tokens: list[str],
    matrix: list[list[float]],
    cols: list[str] | None = None,
) -> None:
    """cols を省略すると列見出しも tokens になる（正方行列用）。"""
    header = cols if cols is not None else tokens
    print(f"\n{title}")
    print("        " + "".join(f"{c:>8}" for c in header))
    for tok, row in zip(tokens, matrix):
        print(f"{tok:>6}  " + "".join(f"{v:>8.3f}" for v in row))


def print_heatmap(tokens: list[str], weights: list[list[float]]) -> None:
    """端末で見るための濃淡表示。行 = 見ている側、列 = 見られている側。"""
    blocks = "·░▒▓█"
    print("\n重みの濃淡（行が「見ている側」、列が「見られている側」）")
    print("  ※ 行ごとに最大値を █ として正規化している")
    print("        " + "".join(f"{t:>4}" for t in tokens))
    for tok, row in zip(tokens, weights):
        top = max(row)
        cells = "".join(
            f"   {blocks[min(int(v / top * len(blocks)), len(blocks) - 1)]}" for v in row
        )
        print(f"{tok:>6}  {cells}")


def write_svg(tokens: list[str], weights: list[list[float]], path: pathlib.Path) -> None:
    """ノートに貼れる図を書き出す。"""
    n = len(tokens)
    cell, pad = 54, 70
    w = h = pad + cell * n + 20
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'font-family="sans-serif" font-size="13">',
        f'<rect width="{w}" height="{h}" fill="#ffffff"/>',
    ]
    for j, tok in enumerate(tokens):  # 列見出し
        parts.append(
            f'<text x="{pad + cell * j + cell / 2}" y="{pad - 12}" '
            f'text-anchor="middle" fill="#333">{tok}</text>'
        )
    for i, tok in enumerate(tokens):  # 行見出し
        parts.append(
            f'<text x="{pad - 12}" y="{pad + cell * i + cell / 2 + 5}" '
            f'text-anchor="end" fill="#333">{tok}</text>'
        )
    for i, row in enumerate(weights):
        for j, v in enumerate(row):
            # 値が大きいほど濃い青
            alpha = round(v, 3)
            parts.append(
                f'<rect x="{pad + cell * j}" y="{pad + cell * i}" '
                f'width="{cell - 2}" height="{cell - 2}" fill="#1d4ed8" '
                f'fill-opacity="{alpha}" stroke="#e5e7eb"/>'
            )
            parts.append(
                f'<text x="{pad + cell * j + cell / 2 - 1}" y="{pad + cell * i + cell / 2 + 4}" '
                f'text-anchor="middle" font-size="11" '
                f'fill="{"#ffffff" if v > 0.45 else "#374151"}">{v:.2f}</text>'
            )
    parts.append("</svg>")
    path.write_text("\n".join(parts), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--shuffle",
        action="store_true",
        help="語順を入れ替えて、位置情報がないと何が起きるかを見る",
    )
    args = parser.parse_args()

    tokens = list(TOKENS)
    if args.shuffle:
        tokens = ["食べ", "を", "た", "猫", "魚", "が"]

    vectors = [[v * SCALE_UP for v in EMBEDDINGS[t]] for t in tokens]

    print("=" * 68)
    print(f"入力: {' '.join(tokens)}")
    print("埋め込みの各次元の意味: [生き物, 食べ物, 動作, 助詞]")
    print("=" * 68)

    scores = matmul_t(vectors, vectors)
    print_matrix("1. 内積（Q·Kᵀ）= 語どうしの似ている度合い", tokens, scores)

    scale = math.sqrt(DIM)
    print(f"\n2. √次元数 = √{DIM} = {scale:.3f} で割る")
    print("   （次元が増えるほど内積が大きくなり、softmax が尖りすぎるのを防ぐ）")

    weights, outputs = attention(vectors)
    print_matrix("3. softmax 後の重み（各行の合計は 1）", tokens, weights)
    print_heatmap(tokens, weights)
    print_matrix("4. 重みで混ぜた出力", tokens, outputs, cols=DIM_NAMES)

    out = pathlib.Path(__file__).with_name(
        "attention_shuffled.svg" if args.shuffle else "attention.svg"
    )
    write_svg(tokens, weights, out)
    print(f"\n図を書き出しました: {out.name}")

    print("\n" + "-" * 68)
    print("観察してほしいこと")
    print("-" * 68)
    print("・「食べ」の行: 自分自身を除くと 魚 > 猫 > 助詞 の順に重い。")
    print("  「食べる」という動作が、目的語である「魚」を最も強く参照している。")
    print("  重みは学習ではなくベクトルの内積だけから出ていることを確認すること。")
    print()
    print("・どの行も自分自身が最大になっている。これはこの実装が Q=K=V だから。")
    print("  自分との内積が必ず最大になるので、自己参照が勝つ。")
    print("  実際の Transformer が Q/K/V に別々の重み行列を掛けるのは、")
    print("  この「自分ばかり見る」状態から抜け出すためでもある。")
    print()
    print("・「が」と「を」の行は完全に同じ。埋め込みを同じにしたので当然だが、")
    print("  では実際の文で両者を区別するには何が足りないか。")
    print()
    print("・行列は 1 回の掛け算で全ペアぶん求まっている。前の語の計算を待っていない。")
    print("  これが「再帰なしで系列を扱える」ということ。")

    if not args.shuffle:
        print("\n次に --shuffle を付けて実行してください。語順の扱いを検証します。")
        return

    # 語順を変えても各語の出力が変わらないことを、実際に計算して確かめる。
    # （主張を書くだけにせず、数値で示す）
    base_tokens = list(TOKENS)
    base_vectors = [[v * SCALE_UP for v in EMBEDDINGS[t]] for t in base_tokens]
    _, base_outputs = attention(base_vectors)
    base_by_token = dict(zip(base_tokens, base_outputs))

    print("\n" + "-" * 68)
    print("検証: 語順を変えると各語の出力は変わるか")
    print("-" * 68)
    print(f"元の並び:   {' '.join(base_tokens)}")
    print(f"入替えた並び: {' '.join(tokens)}\n")

    worst = 0.0
    for tok, out_vec in zip(tokens, outputs):
        ref = base_by_token[tok]
        diff = max(abs(a - b) for a, b in zip(out_vec, ref))
        worst = max(worst, diff)
        print(f"  {tok:>4}  最大差 {diff:.2e}")

    print(f"\n全語での最大差: {worst:.2e}")
    if worst < 1e-9:
        print("→ 完全に一致した。素の Attention は語順を見ていない。")
        print("  「猫が魚を食べた」と「魚が猫を食べた」を区別できないということ。")
        print("  だから位置エンコーディングを足す必要がある。")
    else:
        print("→ 差が出た。実装を見直すこと。")


if __name__ == "__main__":
    main()
