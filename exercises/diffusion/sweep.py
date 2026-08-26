#!/usr/bin/env python3
"""seed を固定したまま steps と cfg だけを振り、結果を並べて比べる演習。

対応する完了条件（ROADMAP.md Phase 0）:
  「workflows/api_vegetable.json の各パラメータについて、なぜその値かを説明できる」

comfyui-vegetable-generator の ComfyUI に対して実行する。
生成した画像は一覧 HTML に並べ、所見を書き込む Markdown の雛形も出す。

依存ライブラリなし（標準ライブラリのみ）。

前提:
  make up などで ComfyUI が起動していること（既定 http://127.0.0.1:8188）

使い方:
  # まず何が実行されるかだけ確認する（サーバ不要）
  python3 sweep.py --workflow ../../../comfyui-vegetable-generator/workflows/api_vegetable.json --dry-run

  # 実行する
  python3 sweep.py --workflow ../../../comfyui-vegetable-generator/workflows/api_vegetable.json

注意:
  CPU 推論では 1 枚あたり数分かかる。既定の 3x3 = 9 枚でも相応の時間が要る。
  最初は --steps 8,24 --cfg 4,11 の 4 枚から始めるとよい。
"""

from __future__ import annotations

import argparse
import json
import pathlib
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid

DEFAULT_SERVER = "http://127.0.0.1:8188"


def find_ksampler(workflow: dict) -> str:
    """KSampler ノードの id を返す。見つからなければ例外。"""
    for node_id, node in workflow.items():
        if node.get("class_type", "").startswith("KSampler"):
            return node_id
    raise SystemExit(
        "KSampler ノードが見つかりません。API 形式のワークフローか確認してください。"
    )


def post_prompt(server: str, workflow: dict, client_id: str) -> str:
    body = json.dumps({"prompt": workflow, "client_id": client_id}).encode()
    req = urllib.request.Request(
        f"{server}/prompt", data=body, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.load(res)["prompt_id"]


def wait_for(server: str, prompt_id: str, timeout_s: int) -> dict:
    """完了するまで /history を叩き続ける。"""
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(f"{server}/history/{prompt_id}", timeout=30) as res:
                history = json.load(res)
            if prompt_id in history:
                return history[prompt_id]
        except urllib.error.URLError:
            pass  # 生成中はつながらないことがある
        time.sleep(3)
    raise TimeoutError(f"{timeout_s} 秒以内に完了しませんでした: {prompt_id}")


def download_images(server: str, result: dict, dest: pathlib.Path, stem: str) -> list[str]:
    saved = []
    for node_output in result.get("outputs", {}).values():
        for i, img in enumerate(node_output.get("images", [])):
            query = urllib.parse.urlencode(
                {
                    "filename": img["filename"],
                    "subfolder": img.get("subfolder", ""),
                    "type": img.get("type", "output"),
                }
            )
            with urllib.request.urlopen(f"{server}/view?{query}", timeout=120) as res:
                data = res.read()
            name = f"{stem}.png" if i == 0 else f"{stem}_{i}.png"
            (dest / name).write_bytes(data)
            saved.append(name)
    return saved


def write_contact_sheet(
    dest: pathlib.Path,
    steps_list: list[int],
    cfg_list: list[float],
    images: dict[tuple[int, float], str],
    seed: int,
) -> pathlib.Path:
    """行 = cfg, 列 = steps の一覧表を HTML で書き出す。"""
    rows = []
    for cfg in cfg_list:
        cells = []
        for steps in steps_list:
            name = images.get((steps, cfg))
            inner = (
                f'<img src="{name}" alt="steps={steps} cfg={cfg}" loading="lazy">'
                if name
                else '<div class="missing">（未生成）</div>'
            )
            cells.append(f"<td>{inner}<div class=cap>steps {steps} / cfg {cfg}</div></td>")
        rows.append(f"<tr><th>cfg {cfg}</th>{''.join(cells)}</tr>")

    head = "".join(f"<th>steps {s}</th>" for s in steps_list)
    html = f"""<!doctype html>
<meta charset="utf-8">
<title>steps / cfg 比較 (seed {seed})</title>
<style>
 body {{ font-family: system-ui, sans-serif; margin: 24px; background: #fafafa; }}
 table {{ border-collapse: collapse; }}
 th, td {{ border: 1px solid #ddd; padding: 8px; text-align: center; vertical-align: top; }}
 th {{ background: #f0f0f0; white-space: nowrap; }}
 img {{ width: 260px; height: auto; display: block; }}
 .cap {{ font-size: 12px; color: #666; margin-top: 6px; }}
 .missing {{ width: 260px; height: 180px; display: grid; place-items: center; color: #999; }}
</style>
<h1>steps / cfg 比較</h1>
<p>seed = {seed}（固定）。seed が同じなので、違いは steps と cfg だけによるものです。</p>
<table><tr><th></th>{head}</tr>{''.join(rows)}</table>
"""
    path = dest / "contact-sheet.html"
    path.write_text(html, encoding="utf-8")
    return path


def write_notes_template(
    dest: pathlib.Path, steps_list: list[int], cfg_list: list[float], seed: int
) -> pathlib.Path:
    lines = [
        "# steps / cfg を振って観察した記録",
        "",
        f"- seed: {seed}（固定）",
        f"- steps: {', '.join(map(str, steps_list))}",
        f"- cfg: {', '.join(map(str, cfg_list))}",
        "",
        "## 観察",
        "",
        "| 変えたもの | 何が変わったか | なぜそうなると考えるか |",
        "| --- | --- | --- |",
        "| steps を増やす |  |  |",
        "| cfg を上げる |  |  |",
        "| cfg を下げる |  |  |",
        "",
        "## api_vegetable.json の既定値について",
        "",
        "既定は steps 24 / cfg 7.0。上の観察を踏まえて、この値が妥当かを書く。",
        "妥当でないと考えるなら、どの値にすべきかと理由を書く。",
        "",
        "- steps 24 の根拠:",
        "- cfg 7.0 の根拠:",
        "- 変えるべきか:",
        "",
        "## わからなかったこと",
        "",
        "-",
    ]
    path = dest / "observations.md"
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def parse_numbers(raw: str, cast):
    return [cast(x.strip()) for x in raw.split(",") if x.strip()]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workflow", required=True, help="API 形式のワークフロー JSON")
    parser.add_argument("--server", default=DEFAULT_SERVER)
    parser.add_argument("--seed", type=int, default=42, help="固定する seed")
    parser.add_argument("--steps", default="8,24,40")
    parser.add_argument("--cfg", default="4,7,11")
    parser.add_argument("--out", default="out", help="出力先ディレクトリ")
    parser.add_argument("--timeout", type=int, default=1800, help="1 枚あたりの上限秒")
    parser.add_argument(
        "--dry-run", action="store_true", help="サーバに接続せず、実行内容だけ表示する"
    )
    args = parser.parse_args()

    steps_list = parse_numbers(args.steps, int)
    cfg_list = parse_numbers(args.cfg, float)

    workflow_path = pathlib.Path(args.workflow).expanduser()
    if not workflow_path.exists():
        raise SystemExit(f"ワークフローが見つかりません: {workflow_path}")
    base_workflow = json.loads(workflow_path.read_text(encoding="utf-8"))
    sampler_id = find_ksampler(base_workflow)
    current = base_workflow[sampler_id]["inputs"]

    dest = pathlib.Path(args.out)
    dest.mkdir(parents=True, exist_ok=True)

    total = len(steps_list) * len(cfg_list)
    print(f"ワークフロー : {workflow_path}")
    print(f"KSampler     : ノード {sampler_id}")
    print(f"既定値       : steps={current.get('steps')} cfg={current.get('cfg')} "
          f"seed={current.get('seed')}")
    print(f"固定する seed: {args.seed}")
    print(f"振る steps   : {steps_list}")
    print(f"振る cfg     : {cfg_list}")
    print(f"生成枚数     : {total} 枚")
    if args.dry_run:
        print("\n--dry-run のため生成は行いません。組み合わせは次のとおりです。")
        for cfg in cfg_list:
            for steps in steps_list:
                print(f"  steps={steps:>3}  cfg={cfg:>5}  seed={args.seed}")

    images: dict[tuple[int, float], str] = {}

    if not args.dry_run:
        client_id = str(uuid.uuid4())
        done = 0
        for cfg in cfg_list:
            for steps in steps_list:
                done += 1
                stem = f"steps{steps}_cfg{cfg}"
                print(f"\n[{done}/{total}] steps={steps} cfg={cfg} を生成中 …")
                wf = json.loads(json.dumps(base_workflow))  # 毎回コピーして汚さない
                wf[sampler_id]["inputs"]["seed"] = args.seed
                wf[sampler_id]["inputs"]["steps"] = steps
                wf[sampler_id]["inputs"]["cfg"] = cfg

                started = time.time()
                prompt_id = post_prompt(args.server, wf, client_id)
                result = wait_for(args.server, prompt_id, args.timeout)
                saved = download_images(args.server, result, dest, stem)
                if saved:
                    images[(steps, cfg)] = saved[0]
                print(f"     完了 {time.time() - started:.0f} 秒 → {saved}")

    sheet = write_contact_sheet(dest, steps_list, cfg_list, images, args.seed)
    notes = write_notes_template(dest, steps_list, cfg_list, args.seed)

    print(f"\n一覧表     : {sheet}")
    print(f"記録の雛形 : {notes}")
    print("\n一覧表をブラウザで開き、observations.md に気づいたことを書いてください。")
    print("書けなかった欄が、まだ説明できていない箇所です。")


if __name__ == "__main__":
    main()
