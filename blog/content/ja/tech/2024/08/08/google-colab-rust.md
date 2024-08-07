---
title: Google Colab RustでHello, world!
date: 2024-08-08T02:30:00+09:00
description: Pythonで開発を行っていると、インストール済みのパッケージやその詳細を確認したい場面があります。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
categories: 
- Python
image: images/thumbnail/Rust_programming_language_black_logo.svg.png
image_description: 'Rust Foundation'
---

# Google Colab RustでHello, world!

Google ColabはPythonを中心とした開発環境ですが、Rustのプログラムも実行できます。Google ColabでRustを使用して「Hello, world!」を実行するための手順を詳しく説明します。

## Rustのインストール

まず、Google ColabにRustをインストールします。Rustup（Rustのインストーラ）を使用してインストールします。

以下のコードをGoogle Colabのセルにコピーして実行してください。

```bash
# Rustup (Rustのインストーラ) を使用してRustをインストールします。
!curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# パスを設定します。
import os
os.environ['PATH'] += f":{os.path.expanduser('~')}/.cargo/bin"

# Rustのバージョンを確認して、正しくインストールされたか確認します。
!rustc --version
```

このコードはRustをインストールし、環境変数にRustのバイナリパスを追加し、Rustのバージョンを確認します。

## Rustプログラムの作成

次に、簡単なRustプログラムを作成します。このプログラムは「Hello, world!」と出力するだけのシンプルなものです。

以下のコードを新しいセルにコピーして実行してください。

```python
# Rustプログラムをファイルに書き込みます。
program = """
fn main() {
    println!("Hello, world!");
}
"""
with open('hello_world.rs', 'w') as file:
    file.write(program)
```

このコードは`hello_world.rs`という名前のファイルを作成し、その中にRustの「ハローワールド」プログラムを書き込みます。

## プログラムのコンパイルと実行

最後に、作成したRustプログラムをコンパイルし、実行します。

以下のコードを新しいセルにコピーして実行してください。

```bash
# Rustプログラムをコンパイルします。
!rustc hello_world.rs

# コンパイルされたバイナリを実行します。
!./hello_world
```

このコードは`hello_world.rs`をコンパイルし、生成されたバイナリを実行して「Hello, world!」と表示します。

## まとめ

Google Colab上でRustの「Hello, World!」プログラムを実行することができました。
Rustを使って複雑なプログラムに挑戦してみてください。
