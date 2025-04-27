---
title: "【Python】questionary ｜ 対話型CLIツールを簡単に作る方法 ＆ コード例"
date: 2025-04-27T19:00:00+09:00
description: Pythonでコマンドラインツール（CLI）を作る際、ユーザーと対話するための入力方法に悩んだことはありませんか？そんなときに便利なのが「questionary」というライブラリです。
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

# 【Python】questionary ｜ 対話型CLIツールを簡単に作る方法 ＆ コード例

Pythonでコマンドラインツール（CLI）を作る際、ユーザーと対話するための入力方法に悩んだことはありませんか？  
そんなときに便利なのが「**questionary**」というライブラリです。  
本記事では、**questionary**のインストールから基本的な使い方、そして**7種類のプロンプト**を使ったシンプルで実用的なコード例を紹介します。

---

## questionaryとは？

- Python製の対話型CLIツール作成ライブラリ
- **選択式メニュー**や**入力フォーム**などが簡単に実装可能
- 見た目が美しく、カスタマイズ性も高い

---

## インストール方法

```bash
pip install questionary
```

---

## 基本的なプロンプトの種類と使い方

### 1. テキスト入力（text）

```python
import questionary
answer = questionary.text("あなたの名前は？").ask()
print(f"こんにちは、{answer}さん！")
```

---

### 2. 選択式メニュー（select）

```python
choice = questionary.select(
    "好きな言語を選んでください:",
    choices=["Python", "JavaScript", "Go", "Rust"]
).ask()
print(f"あなたが選んだ言語は: {choice}")
```

---

### 3. 複数選択（checkbox）

```python
features = questionary.checkbox(
    "利用したい機能を選んでください:",
    choices=["ログ保存", "メール通知", "自動バックアップ"]
).ask()
print(f"選択した機能: {', '.join(features)}")
```

---

### 4. 確認ダイアログ（confirm）

```python
confirm = questionary.confirm("本当に削除してもよろしいですか？").ask()
if confirm:
    print("削除しました。")
else:
    print("操作をキャンセルしました。")
```

---

### 5. パス入力（password）

```python
password = questionary.password("パスワードを入力してください:").ask()
print("パスワードを受け付けました。")
```

---

### 6. 自動補完付き入力（autocomplete）

```python
lang = questionary.autocomplete(
    "プログラミング言語を入力してください:",
    choices=["Python", "JavaScript", "Java", "C#", "Go", "Rust"]
).ask()
print(f"あなたが選んだのは: {lang}")
```

---

### 7. 整数選択（rawselect）

```python
number = questionary.rawselect(
    "番号を選んでください:",
    choices=["1", "2", "3", "4"]
).ask()
print(f"選んだ番号: {number}")
```

---

## 実用例：設定ウィザードCLIツール

以下は、様々なプロンプトを活用した「設定ウィザード形式」の簡単なCLIツールの例です。

```python
import questionary

def setup_wizard():
    print("=== 設定ウィザードを開始します ===")

    # 1. ユーザー名を入力
    username = questionary.text("ユーザー名を入力してください:").ask()

    # 2. パスワードを非表示で入力
    password = questionary.password("パスワードを入力してください:").ask()

    # 3. 使用する機能を選択（単一選択）
    feature = questionary.select(
        "使用するメイン機能を選んでください:",
        choices=[
            "ファイル管理",
            "データ分析",
            "Webスクレイピング"
        ]).ask()

    # 4. 複数機能を選択（複数選択）
    addons = questionary.checkbox(
        "追加で使いたい機能を選んでください:",
        choices=[
            "ログ保存",
            "メール通知",
            "ダークモード"
        ]).ask()

    # 5. 確認
    confirm = questionary.confirm("この設定で進めてもよろしいですか？").ask()

    if confirm:
        print("\n=== 設定内容 ===")
        print(f"ユーザー名: {username}")
        print(f"メイン機能: {feature}")
        print(f"追加機能: {', '.join(addons) if addons else 'なし'}")
        print("設定を保存しました。")
    else:
        print("設定をキャンセルしました。")

if __name__ == "__main__":
    setup_wizard()
```

---

## まとめ

- **questionary**は、Pythonで簡単に対話式CLIツールを作れる強力なライブラリ。
- 多彩なプロンプトを活用することで、ユーザーと直感的にやり取り可能。
- シンプルなコードで、実用的なツール開発が可能！

ぜひ、あなたのPythonプロジェクトに**questionary**を取り入れて、より魅力的なCLIツールを作ってみてください！

---

## 参考リンク

<a href="https://github.com/tmbo/questionary" target="_blank" rel="nofollow noopener">questionary</a>