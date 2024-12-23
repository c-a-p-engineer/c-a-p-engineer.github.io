---
title: 【Python】簡単にファイルの差分を比較する方法：HTMLで色付き・行番号付きの表示を実現
date: 2024-12-23T12:00:00+09:00
description: ファイルの内容を比較し、その差分を視覚的に分かりやすく表示したい場面はよくあります。コードの変更点を確認したり、設定ファイルの違いをチェックしたりする際に便利です。
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

# 【Python】簡単にファイルの差分を比較する方法：HTMLで色付き・行番号付きの表示を実現

ファイルの内容を比較し、その差分を視覚的に分かりやすく表示したい場面はよくあります。コードの変更点を確認したり、設定ファイルの違いをチェックしたりする際に便利です。この記事では、Python標準ライブラリの`difflib`を活用し、HTML形式で差分を色付き・行番号付きで表示する方法を詳しく解説します。

## Pythonで差分を比較する方法

Pythonにはファイルやテキストの差分を比較するための強力なライブラリ`difflib`が標準で含まれています。このライブラリを使えば、簡単に2つのテキストデータを比較することが可能です。

### difflibとは？
`difflib`はPythonの標準ライブラリで、以下のような機能を提供します。

- 2つの文字列やファイルの差分を簡単に比較できる
- 差分を分かりやすい形式で出力可能（リスト形式やHTML形式など）
- プログラム上で差分の操作が容易

### 基本的な使い方
`difflib`の`ndiff`関数を使うことで、2つの文字列リスト間の差分を計算できます。

```python
import difflib

# サンプルデータ
text1 = ["line1\n", "line2\n", "line3\n"]
text2 = ["line1\n", "line2 modified\n", "line4\n"]

# 差分を取得
diff = difflib.ndiff(text1, text2)
print("\n".join(diff))
```

上記のコードでは、`ndiff`を使って差分を取得し、結果を標準出力に出力しています。次に、この結果をさらに見やすく表示する方法を紹介します。

## サンプルコードの全体像

以下は、2つのファイルを読み込んで差分を取得し、HTML形式で色付き・行番号付きで表示する完全なPythonコードです。

```python
import difflib

# アップロードしたファイルを開いて読み込む
with open("file1.txt", "r") as f1, open("file2.txt", "r") as f2:
    file1_lines = f1.readlines()
    file2_lines = f2.readlines()

# 差分を取得
diff = difflib.ndiff(file1_lines, file2_lines)

# HTML形式で差分を色付きかつ行番号付きで整形
diff_output = "<div style='font-family: monospace;'>"
line_number_1 = 1  # file1の行番号
line_number_2 = 1  # file2の行番号

for line in diff:
    if line.startswith(" "):  # 変更がない行
        diff_output += f"<div style='background-color: #fefefe;'>{line_number_1:04d} | {line_number_2:04d} | {line.strip()}</div>"
        line_number_1 += 1
        line_number_2 += 1
    elif line.startswith("-"):  # 削除された行
        diff_output += f"<div style='background-color: #f8d7da;'>- {line_number_1:04d} | ---- | {line.strip()}</div>"
        line_number_1 += 1
    elif line.startswith("+"):  # 追加された行
        diff_output += f"<div style='background-color: #d4edda;'>+ ---- | {line_number_2:04d} | {line.strip()}</div>"
        line_number_2 += 1

diff_output += "</div>"

# HTMLファイルに出力
output_file = "diff.html"
with open(output_file, "w") as f:
    f.write(diff_output)

# GoogleColabでHTMLで結果を表示
# from IPython.core.display import display, HTML
# display(HTML(diff_output))
```

## コードの詳細解説

### ファイルの読み込み
`with open`を使うことで、2つのテキストファイルを安全に開き、それぞれの行をリスト形式で取得します。

```python
with open("file1.txt", "r") as f1, open("file2.txt", "r") as f2:
    file1_lines = f1.readlines()
    file2_lines = f2.readlines()
```

### 差分取得のロジック
`difflib.ndiff`を使い、2つのファイル間の差分を取得します。この関数は各行の差分を`+`, `-`, ` `（空白）で区別します。

- `+`：file2に追加された行
- `-`：file1から削除された行
- 空白（` `）：変更がない行

### HTML形式で整形する処理
取得した差分をHTMLで整形し、視覚的に分かりやすく表示するためにスタイルを指定しています。背景色を変えることで、変更点を直感的に把握できるようにしています。

```python
if line.startswith(" "):  # 変更がない行
    diff_output += f"<div style='background-color: #fefefe;'>{line_number_1:04d} | {line_number_2:04d} | {line.strip()}</div>"
```

### HTMLで結果を表示

最終的に`diff.html`に出力、`IPython.display`を使ってHTMLの差分をレンダリングします。Jupyter NotebookやGoogle Colabで動作するコードです。

```python
# GoogleColabでHTMLで結果を表示
from IPython.core.display import display, HTML
display(HTML(diff_output))
```

## 実用例と活用シーン

- **開発現場でのコードレビュー**
  変更されたコードの確認を効率的に行えます。
  
- **設定ファイルの違いを比較**
  複数の環境間での設定ファイルの差異を確認するのに役立ちます。

- **教育・学習用途**
  プログラミングの教育現場で、コードの変更点を直感的に伝えるために活用できます。

## 参考

- <a href="https://docs.python.org/3/library/difflib.html" target="_blank" rel="nofollow noopener">Python公式ドキュメント - difflib</a>
