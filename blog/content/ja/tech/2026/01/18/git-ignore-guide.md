---
title: "【Git】ignore PCや個人、プロジェクトごとの設定方法"
date: 2026-01-18T06:00:00+09:00
description: Gitで開発していると、必ず直面するのが **「どのファイルを無視するか問題」** です。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# ignore PCや個人、プロジェクトごとの設定方法

Gitで開発していると、必ず直面するのが **「どのファイルを無視するか問題」** です。

* チーム全員で無視したいファイル
* 自分の環境だけで無視したいファイル
* すべてのリポジトリ共通で無視したいファイル

Gitには、これらを **レイヤーごとに管理する仕組み** が用意されています。

この記事では、

* `.gitignore`
* `.git/info/exclude`
* グローバル ignore（`core.excludesfile`）

の **役割・違い・使い分け** を解説します。

---

## Gitのignoreは「3階層」で考える

まず全体像です。
Gitのignore設定は、次の **3階層構造** になっています。

<img src="./gitignore.svg"/>

| レイヤー     | ファイル                | 影響範囲         |
| -------- | ------------------- | ------------ |
| プロジェクト共通 | `.gitignore`        | チーム全体        |
| リポジトリ個人用 | `.git/info/exclude` | そのリポジトリの自分だけ |
| 全リポジトリ共通 | グローバルignore         | 自分の全リポジトリ    |

この構造を理解すると、
「どこに何を書くべきか」で迷わなくなります。

---

## .gitignore（プロジェクト共通ルール）

`.gitignore` は **リポジトリに含まれる ignore ファイル** です。

* Git管理される（＝コミットされる）
* チーム全員に適用される
* 最も基本的な ignore 設定

### 代表的な用途

```txt
node_modules/
dist/
.env
.DS_Store
```

* ビルド成果物
* 環境変数ファイル
* OS依存ファイル

👉 **「誰が作業しても不要なもの」** は必ずここに書きます。

---

## .git/info/exclude（リポジトリ個人用）

`.git/info/exclude` は、**そのリポジトリ限定・自分専用** の ignore 設定です。

```
your-repo/
└─ .git/
   └─ info/
      └─ exclude
```

### 特徴

* `.gitignore` と **書き方は同じ**
* Git管理されない
* チームには共有されない

### 使いどころ

```txt
.vscode/
.idea/
local-debug.log
```

* 自分のエディタ設定
* ローカル検証用ファイル
* 一時的な作業ファイル

👉 **「このリポジトリだけ」「自分だけ」** が判断基準です。

---

## グローバルignore（全リポジトリ共通）

グローバルignoreは、**自分のPC上のすべてのGitリポジトリに適用される ignore 設定**です。

### 設定方法

#### ignoreファイルを作成

例（macOS / Linux）：

```bash
~/.config/git/ignore
```

Windows例：

```txt
C:\Users\ユーザー名\.gitignore_global
```

#### Gitに設定を教える

```bash
git config --global core.excludesfile ~/.config/git/ignore
```

### 設定例

```txt
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Logs
*.log
```

👉 **「どのリポジトリでも毎回無視しているもの」** を書きます。

---

## 3つのignoreの使い分けまとめ

| 状況               | 書く場所                |
| ---------------- | ------------------- |
| チーム全員で不要         | `.gitignore`        |
| このリポジトリだけ & 自分だけ | `.git/info/exclude` |
| 全リポジトリ & 自分だけ    | グローバルignore         |

---

## よくある落とし穴

### ❌ すでに追跡されているファイルは無視されない

これは **すべての ignore に共通** です。

対処法：

```bash
git rm --cached file.txt
```

---

### ❌ 個人ルールを `.gitignore` に入れてしまう

* `.vscode/`
* 個人用メモファイル

👉 チームに不要なルールは **exclude or グローバル** に逃がしましょう。

---

## おすすめ運用ルール（実践編）

**結論：この3点を守ると事故らない**

1. `.gitignore` は最小限・厳選
2. 個人都合は `.git/info/exclude`
3. OS・エディタ系はグローバルignore

---

## まとめ

* Gitのignoreは **3階層構造**
* 役割はすべて違う
* 書き方は同じ、責任範囲が違う

> **共有するものは `.gitignore`**
> **個人の都合は外に出さない**

この原則だけ覚えておけばOKです。
