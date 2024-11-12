---
title: "【Python】PowerPointスライドをPNG画像に変換する方法"
date: 2023-11-12T14:30:00+09:00
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

# PythonでPowerPointスライドをPNG画像に変換する方法

プレゼンテーション資料や報告書の一部を画像として保存したいときに、PowerPointスライド（PPTXファイル）をPNG形式の画像に変換する方法はとても便利です。この記事では、Pythonを用いてPPTXファイルをPNG形式に変換する方法を、手順を追って詳しく解説します。

ここでは、Pythonライブラリとシェルコマンドを使って、PowerPointファイルをPDFに変換し、そのPDFからスライドごとにPNG画像を生成する方法を紹介します。この方法は、Google ColabやローカルのPython環境でも実行でき、手軽にプレゼン資料を画像に変換したい場合に役立ちます。

## 必要なライブラリと環境の準備

このコードを実行するには以下のライブラリとツールが必要です。

1. **Pythonライブラリ：**
   - `pdf2image`: PDFから画像に変換するライブラリ
   - `os`: フォルダやファイルパスを操作する標準ライブラリ

2. **ツール：**
   - `unoconv`: PPTXファイルをPDFに変換するためのコマンドラインツール。LibreOfficeを使ってPowerPointをPDFに変換します。
   - `poppler-utils`: PDFから画像に変換する際に必要なツールセット。`pdfinfo` を含む。

これらのライブラリとツールはGoogle Colab上で簡単にセットアップできます。

### インストール方法（Google Colabの場合）

Google Colabで実行する場合、以下のコマンドで必要なツールとライブラリをインストールします。

```python
# pdf2imageのインストール
!pip install pdf2image

# unoconvのインストール
!apt-get install -y unoconv

# pdf2imageとpopplerのインストール
!apt-get install -y poppler-utils
```

ローカル環境での実行も可能ですが、`unoconv`をインストールするためにLibreOfficeが必要になる点に注意してください。

## PowerPointファイルをPDFに変換する方法

まず、PPTXファイルのパスを指定し、出力フォルダを設定します。そして、PPTXファイルをPDFに変換します。

### コード解説

```python
import os

# PPTXファイルのパスを指定
pptx_file_path = "sample.pptx" # ここにPPTXファイルのパスを入力

# 出力フォルダを自動で設定
output_folder = os.path.join(os.path.dirname(pptx_file_path), "slides_images")
os.makedirs(output_folder, exist_ok=True)

# 1. PPTXをPDFに変換
pdf_file_path = pptx_file_path.replace(".pptx", ".pdf")
command = f'unoconv -f pdf "{pptx_file_path}"'
os.system(command)
```

このコードは以下の手順を行います。

1. **PPTXファイルのパス指定**：PowerPointファイルのパスを変数`pptx_file_path`で指定します。
2. **出力フォルダの設定**：変換後のPDFと画像ファイルを保存するフォルダを指定し、存在しない場合は自動でフォルダを作成します。
3. **PPTXからPDFへの変換**：`unoconv`コマンドを使用してPPTXファイルをPDF形式に変換します。

---

## PDFファイルをPNG画像に変換する方法

PDFファイルが生成されたら、次にPDFをスライドごとにPNG形式の画像に変換します。このステップでは`pdf2image`ライブラリを使用して、PDFの各ページを個別のPNGファイルとして保存します。

### コード解説

```python
from pdf2image import convert_from_path

# 2. PDFが存在する場合、PDFを1ページずつ画像に変換
if os.path.exists(pdf_file_path):
    pages = convert_from_path(pdf_file_path, dpi=300)
    for i, page in enumerate(pages):
        image_path = os.path.join(output_folder, f"slide_{i+1}.png")
        page.save(image_path, "PNG")
        print(f"Page {i+1} saved as {image_path}")
else:
    print("PDFファイルが見つかりません。PPTXの変換に失敗している可能性があります。")
```

### 変換の手順

1. **PDFの存在チェック**：`if os.path.exists(pdf_file_path)`でPDFファイルが存在するか確認します。PDFが存在しない場合は、PPTXからPDFへの変換に失敗している可能性があります。
2. **PDFから画像への変換**：`convert_from_path(pdf_file_path, dpi=300)`を使って、PDFの各ページを画像形式で読み込みます。ここで`dpi=300`を設定することで、画像の解像度を調整しています。
3. **PNG画像として保存**：各ページをPNG形式で保存し、スライド番号ごとにファイル名を付けて出力フォルダに保存します。

---

## コード全体

以下は、PPTXファイルをPNG形式の画像に変換するための全コードです。

```python
import os
from pdf2image import convert_from_path

# PPTXファイルのパスを指定
pptx_file_path = "sample.pptx"

# 出力フォルダの自動設定
output_folder = os.path.join(os.path.dirname(pptx_file_path), "slides_images")
os.makedirs(output_folder, exist_ok=True)

# 1. PPTXをPDFに変換
pdf_file_path = pptx_file_path.replace(".pptx", ".pdf")
command = f'unoconv -f pdf "{pptx_file_path}"'
os.system(command)

# 2. PDFが存在する場合、PDFを1ページずつ画像に変換
if os.path.exists(pdf_file_path):
    pages = convert_from_path(pdf_file_path, dpi=300)
    for i, page in enumerate(pages):
        image_path = os.path.join(output_folder, f"slide_{i+1}.png")
        page.save(image_path, "PNG")
        print(f"Page {i+1} saved as {image_path}")
else:
    print("PDFファイルが見つかりません。PPTXの変換に失敗している可能性があります。")
```

## まとめと注意点

このコードを使用することで、PowerPointスライドを簡単にPNG画像に変換できます。

### 注意点
- **PDFファイルの解像度**：`convert_from_path`で指定する`dpi`値を変更することで、出力画像の解像度を調整できますが、高すぎると処理時間が長くなるため注意してください。

以上で、PythonでPPTXファイルをPNG画像に変換する方法の紹介は終了です。ぜひ試してみてください！
