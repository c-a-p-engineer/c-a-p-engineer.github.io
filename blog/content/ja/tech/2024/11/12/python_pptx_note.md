---
title: "【Python】pptxファイルからノートを抽出する方法"
date: 2024-11-12T14:30:00+09:00
description: プレゼンテーション資料や報告書の一部を画像として保存したいときに、PowerPointスライド（PPTXファイル）をPNG形式の画像に変換する方法はとても便利です。この記事では、Pythonを用いてPPTXファイルをPNG形式に変換する方法を、手順を追って詳しく解説します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Python】pptxファイルからノートを抽出する方法

Pythonを使ってPowerPoint（.pptx）ファイルからスライドごとのノートを抽出する方法について解説します。プレゼンテーションの資料として、スライド内容と併せてノート情報を参照したいケースは多いと思います。このコードでは、`python-pptx`ライブラリを使用してスライドのノートを抽出する方法を紹介します。

## 必要なライブラリと環境設定

このサンプルコードでは、PowerPointファイルを操作するために`python-pptx`ライブラリを使用します。`python-pptx`はPowerPointファイルのスライド内容、ノート、画像などの操作が可能なライブラリです。

### ライブラリのインストール

まず、`python-pptx`ライブラリをインストールします。

```bash
pip install python-pptx
```

また、Google Colabなどのクラウド環境で実行する場合、ファイルパスの指定には注意が必要です。

---

### 2. コードの概要と解説

以下のコードでは、PowerPointファイル内の各スライドのノートを抽出して、ページ番号とノートを対応させた辞書に格納し、結果を出力します。

```python
from pptx import Presentation

# PPTXファイルのパスを指定
pptx_file_path = "sample.pptx"

# プレゼンテーションを読み込み
prs = Presentation(pptx_file_path)

# 各スライドのノートを取得
slide_notes = {}  # ページ番号をキーに
for i, slide in enumerate(prs.slides, start=1):  # start=1で1からカウント
    notes = ""
    if slide.has_notes_slide and slide.notes_slide.notes_text_frame:
        notes = slide.notes_slide.notes_text_frame.text
    slide_notes[i] = notes  # ページ番号をキーとして格納
    print(f"Page {i} Notes: {notes}")

# スライドごとのノートがページ番号で格納されています
```

## 各部分の解説

コードの各部分について詳しく解説します。

### プレゼンテーションファイルの読み込み

```python
from pptx import Presentation
pptx_file_path = "sample.pptx"
prs = Presentation(pptx_file_path)
```

- `Presentation`クラスを使用して、指定したファイルパスのPowerPointファイルを読み込みます。
- `pptx_file_path`には、読み込みたいPowerPointファイルのパスを指定します。

### スライドのノートを抽出

```python
slide_notes = {}
for i, slide in enumerate(prs.slides, start=1):
    notes = ""
    if slide.has_notes_slide and slide.notes_slide.notes_text_frame:
        notes = slide.notes_slide.notes_text_frame.text
    slide_notes[i] = notes
    print(f"Page {i} Notes: {notes}")
```

- `prs.slides`でプレゼンテーション内のスライドにアクセスします。
- `enumerate`関数を使用し、スライドを1から数えるために`start=1`を指定しています。
- `slide.has_notes_slide`でノートが存在するかを確認し、存在する場合には`notes_slide.notes_text_frame.text`でノートのテキストを取得します。
- `slide_notes`辞書に、スライド番号をキーとしてノートを格納します。

---

## 実行結果の確認

このコードを実行すると、各スライドごとにノートが表示されます。

```plaintext
Page 1 Notes: 〇〇についての詳細
Page 2 Notes: 次回の進行内容
Page 3 Notes: 質問と回答の一覧
```

`slide_notes`辞書には、ページ番号をキーとした形式でノートが格納されています。例えば、`slide_notes[1]`で1枚目のスライドのノートにアクセスできます。

---

## 応用例

### 抽出したノートをCSVファイルに出力

ノート情報をCSVファイルとして保存したい場合は、Pythonの`csv`ライブラリを使って出力できます。

```python
import csv

with open("slide_notes.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Slide Number", "Notes"])
    for slide_number, notes in slide_notes.items():
        writer.writerow([slide_number, notes])
```

これにより、スライド番号とノートのテキストがCSV形式で保存され、データの共有や確認がしやすくなります。

## まとめ

この方法を使うことで、PythonでPowerPointファイルからスライドごとのノートを簡単に抽出できるようになります。とくに発表資料や共有資料で、各スライドに関連するメモを確認したい場合に役立ちます。また、抽出したデータを他の形式に変換したり、分析のためにデータベースに保存するなど、幅広い応用が可能です。

- `python-pptx`を使うことでプレゼンテーション資料の自動処理ができ、とくにビジネスシーンや教育の現場での効率化に貢献します。
- 今回のサンプルコードを活用し、資料の自動分析や生成の基礎として役立ててください。

## 参考
- <a href="https://python-pptx.readthedocs.io/en/latest/" target="_blank" rel="nofollow noopener">python-pptx Documentation</a>
