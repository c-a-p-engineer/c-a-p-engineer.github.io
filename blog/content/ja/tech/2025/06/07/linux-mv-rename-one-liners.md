---
title: "【Linux】シェルでファイルを一括リネーム：ワンライナー集"
date: 2025-06-07T03:30:00+09:00
description: Linuxの `mv`コマンドとシェルのワンライナーが役立ちます。
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# 【Linux】シェルでファイルを一括リネーム：ワンライナー集

GUIで複数ファイルを1つずつリネームするのは面倒……。
そんなときこそLinuxの `mv`コマンドとシェルのワンライナーが役立ちます。

この記事では、`mv`だけを使って以下のようなファイルリネームを一括で実行する方法を紹介します：

* 拡張子の一括変更
* ファイル名の一括置換
* 接頭辞・接尾辞の追加
* 連番付与
* 大文字小文字変換 など

---

## 前提環境と注意点

* **シェル**：bash または zsh 推奨
* **対象ファイル名に空白や特殊文字**が含まれる場合は `"$f"` で囲むこと（安全のため）
* **dry-run** で確認したいときは `echo mv ...` に変えて実行するのがおすすめ

---

## 拡張子を一括変更

例：`.txt` → `.md`

```bash
for f in *.txt; do mv "$f" "${f%.txt}.md"; done
```

---

## ファイル名の先頭に接頭辞を追加

例：`sample.txt` → `new_sample.txt`

```bash
for f in *; do mv "$f" "new_$f"; done
```

---

## ファイル名の末尾に接尾辞を追加

例：`report.csv` → `report_backup.csv`

```bash
for f in *.csv; do mv "$f" "${f%.csv}_backup.csv"; done
```

---

## 文字列を一括置換

例：`draft_` → `final_`

```bash
for f in draft_*; do mv "$f" "${f/draft_/final_}"; done
```

> `${f/old/new}` は1箇所のみ、`${f//old/new}` で全置換。

---

## 空白をアンダースコアに変換

```bash
for f in *\ *; do mv "$f" "${f// /_}"; done
```

---

## 連番でリネーム

例：`image_001.jpg`, `image_002.jpg`

```bash
n=1; for f in *.jpg; do mv "$f" "$(printf 'image_%03d.jpg' "$n")"; ((n++)); done
```

---

## ファイル名をすべて小文字に変換

```bash
for f in *; do mv "$f" "$(echo "$f" | tr 'A-Z' 'a-z')"; done
```

---

## ファイル名をすべて大文字に変換

```bash
for f in *; do mv "$f" "$(echo "$f" | tr 'a-z' 'A-Z')"; done
```

---

## 拡張子だけを大文字に

例：`.jpg` → `.JPG`

```bash
for f in *.jpg; do mv "$f" "${f%.jpg}.JPG"; done
```

---

## 拡張子のないファイルに追加

例：`LICENSE` → `LICENSE.txt`

```bash
for f in *; do [[ "$f" != *.* ]] && mv "$f" "$f.txt"; done
```

---

## dry-runで動作確認したい場合

`mv` を `echo mv` に置き換えると、**実際に移動せずコマンドだけを出力**できます。

```bash
for f in *.txt; do echo mv "$f" "${f%.txt}.md"; done
```

---

## まとめ

* `mv` + `for` + パラメータ展開で、柔軟な一括リネームが可能
* `.bashrc` や `.zshrc` に関数として登録しておくと再利用が楽
* 慣れるまでは `echo` でのdry-run確認をおすすめ
