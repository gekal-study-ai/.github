#!/usr/bin/env python3
"""「精度が高いのに使い物にならない」を、実際に数字で作って確かめる演習。

対応する完了条件（ROADMAP.md Phase 0）:
  「分類タスクで『精度が高いのに使い物にならない』ケースを具体例で説明できる」

題材は野菜の不良品検知。1000 個のうち不良は 20 個（2%）しかない。
この偏りが、指標の選び方をどう変えるかを見る。

依存ライブラリなし。python3 だけで動く。

  python3 metrics.py
"""

from __future__ import annotations

import random

TOTAL = 1000
DEFECT_RATE = 0.02
SEED = 42  # 再現性のため固定


def make_dataset() -> list[int]:
    """1 = 不良品, 0 = 良品。"""
    rng = random.Random(SEED)
    n_defect = int(TOTAL * DEFECT_RATE)
    labels = [1] * n_defect + [0] * (TOTAL - n_defect)
    rng.shuffle(labels)
    return labels


def confusion(truth: list[int], pred: list[int]) -> tuple[int, int, int, int]:
    tp = sum(1 for t, p in zip(truth, pred) if t == 1 and p == 1)
    fp = sum(1 for t, p in zip(truth, pred) if t == 0 and p == 1)
    fn = sum(1 for t, p in zip(truth, pred) if t == 1 and p == 0)
    tn = sum(1 for t, p in zip(truth, pred) if t == 0 and p == 0)
    return tp, fp, fn, tn


def report(name: str, truth: list[int], pred: list[int], comment: str) -> None:
    tp, fp, fn, tn = confusion(truth, pred)
    accuracy = (tp + tn) / len(truth)
    precision = tp / (tp + fp) if (tp + fp) else 0.0
    recall = tp / (tp + fn) if (tp + fn) else 0.0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) else 0.0

    print(f"\n{'─' * 66}")
    print(f"{name}")
    print(f"{'─' * 66}")
    print("            予測:不良  予測:良品")
    print(f"  実際:不良 {tp:>9} {fn:>10}   ← 見逃した数 = {fn}")
    print(f"  実際:良品 {fp:>9} {tn:>10}")
    print()
    print(f"  正解率 (accuracy)  {accuracy:6.1%}   全体のうち当たった割合")
    print(f"  適合率 (precision) {precision:6.1%}   不良と言ったもののうち本当に不良だった割合")
    print(f"  再現率 (recall)    {recall:6.1%}   本当の不良のうち見つけられた割合")
    print(f"  F1                 {f1:6.1%}   適合率と再現率の調和平均")
    print()
    print(f"  → {comment}")


def main() -> None:
    truth = make_dataset()
    n_defect = sum(truth)
    rng = random.Random(SEED + 1)

    print("=" * 66)
    print("題材: 野菜の不良品検知")
    print(f"  全 {TOTAL} 個中、不良品は {n_defect} 個（{n_defect / TOTAL:.1%}）")
    print("=" * 66)

    # 1. 何も検知しない分類器
    report(
        "分類器 A: 「全部良品です」としか言わない",
        truth,
        [0] * TOTAL,
        f"正解率 {1 - n_defect / TOTAL:.1%} は一見立派だが、不良を 1 個も見つけていない。\n"
        "     出荷ラインに置いても何の役にも立たない。これが「精度が高いのに使い物に\n"
        "     ならない」の典型。正解率だけを見ていると気づけない。",
    )

    # 2. そこそこ検知するが取りこぼす分類器
    pred_b = []
    for t in truth:
        if t == 1:
            pred_b.append(1 if rng.random() < 0.60 else 0)  # 不良の 6 割を検知
        else:
            pred_b.append(1 if rng.random() < 0.03 else 0)  # 良品の 3% を誤検知
    report(
        "分類器 B: 不良の 6 割を拾うが、良品も少し巻き込む",
        truth,
        pred_b,
        "正解率は A より下がったのに、実用上は明らかにこちらが有用。\n"
        "     正解率は下がる方向に動きうる。指標の向きと目的の向きは一致しない。",
    )

    # 3. 疑わしきは全部止める分類器
    pred_c = []
    for t in truth:
        if t == 1:
            pred_c.append(1)  # 不良は全部検知
        else:
            pred_c.append(1 if rng.random() < 0.25 else 0)  # 良品の 25% を巻き込む
    report(
        "分類器 C: 疑わしきは全部止める",
        truth,
        pred_c,
        "再現率 100%。不良は 1 個も逃さない。しかし適合率が低く、\n"
        "     止めた大半は良品。検品の手間が跳ね上がる。",
    )

    print(f"\n{'=' * 66}")
    print("考えてほしいこと")
    print("=" * 66)
    print("・A・B・C のどれを選ぶかは、指標だけでは決まらない。")
    print("  「不良を 1 個出荷する損失」と「良品を 1 個止める損失」の比で決まる。")
    print("  その比を決めるのは技術ではなく業務の側。")
    print()
    print("・偏ったデータでは正解率を主指標にしない。多数派に寄せるだけで高く出る。")
    print()
    print("・この構図は Phase 1 でそのまま効いてくる。")
    print("  OCR の精度も、生成画像の良し悪しも、単一の数値では決まらない。")
    print("  『何を損失とみなすか』を先に決めてから指標を選ぶこと。")


if __name__ == "__main__":
    main()
