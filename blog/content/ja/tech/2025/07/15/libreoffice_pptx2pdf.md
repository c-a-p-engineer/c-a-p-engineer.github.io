---
title: "LibreOfficeでサクッとPPTX→PDF化！"
date: 2025-07-16T02:00:00+09:00
description: LibreOfficeのCLIを使えばコマンド一発でPPTXをPDFに変換できます。
draft: false
enableToc: true
enableTocContent: true
tags: 
- PDF
categories: 
- PDF
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# LibreOfficeでサクッとPPTX→PDF化！

LibreOfficeのCLIを使えばコマンド一発でPPTXをPDFに変換できます。
「とりあえずPDF化できればOK」という場合はこちらがオススメ。Pythonのスクリプト例も紹介します。

---

# LibreOfficeでサクッとPPTX→PDF化！

まずはLibreOfficeのCLIを使えばコマンド一発でPPTXをPDFに変換できます。
「とりあえずPDF化できればOK」という場合はこちらがおすすめ。ついでにPythonで自クリしてみたい人向けにスクリプト例も紹介します。

---

## LibreOfficeのインストール

変換コマンドを利用するには、LibreOfficeを事前にインストールしてください。

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install -y libreoffice
```

---

## Bash／ShellからLibreOfficeを呼び出す

PowerShellでもBashでも同じ感覚で使えます。フォルダ内のPPTXを一括PDF化するワンライナー例：

```bash
# ディレクトリ指定（省略時は./pptx→./pdf）
INPUT_DIR=${1:-./pptx}
OUTPUT_DIR=${2:-./pdf}

mkdir -p "$OUTPUT_DIR"
for f in "$INPUT_DIR"/*.pptx; do
  echo "変換中: $f"
  libreoffice --headless --convert-to pdf --outdir "$OUTPUT_DIR" "$f"
  echo "→ 完了: $OUTPUT_DIR/$(basename "${f%.*}.pdf")"
done
```

* `--headless` でGUIレス
* `--convert-to pdf` でPDF化
* `--outdir` で出力先指定

### ワンライナー版

```bash
 for f in ./*.pptx; do libreoffice --headless --convert-to pdf --outdir ./ "$f"; done
```

---

## Pythonからちょっとだけラップ

「Pythonスクリプトで他処理と組み合わせたい」ならこんな感じで。LibreOfficeコマンドを呼ぶだけなので依存は変わりません。

```python
#!/usr/bin/env python3
import subprocess
from pathlib import Path
import argparse
import sys

def convert_pptx_to_pdf(pptx_path: str, output_dir: str):
    pptx = Path(pptx_path)
    if not pptx.exists():
        print(f"[Error] ファイルが見つかりません: {pptx}")
        sys.exit(1)

    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    cmd = [
        "libreoffice",
        "--headless",
        "--convert-to", "pdf",
        "--outdir", str(out_dir),
        str(pptx),
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"[OK] {pptx.name} → {out_dir / (pptx.stem + '.pdf')}")
    except subprocess.CalledProcessError as e:
        print(f"[Error] 変換失敗: {pptx.name}\n{e.stderr.decode()}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="PPTX→PDF変換 (LibreOffice CLI)")
    parser.add_argument("-i", "--pptx-file", required=True)
    parser.add_argument("-o", "--output-dir", default="pdf")
    args = parser.parse_args()
    convert_pptx_to_pdf(args.pptx_file, args.output_dir)

if __name__ == "__main__":
    main()
```

* `python convert.py -i sample.pptx -o ./pdf` で動きます。
* LibreOfficeは裏で同じコマンドを実行しているだけです。

---

## フォントに関する注意点

* 文書で利用しているフォントがシステムにインストールされていない場合、LibreOfficeは自動で代替フォントを適用します。
* 代替フォントではレイアウトが崩れたり、文字幅が変わる可能性があるため、変換前に必要なフォントをインストールしておくことを推奨します。
* 特に日本語フォントは環境依存が大きいため、「IPA明朝」「源ノ角ゴシック」などのオープンソースフォントを事前に設定しておくと安心です。
