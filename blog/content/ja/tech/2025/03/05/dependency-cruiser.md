---
title: "【Node.js】dependency-cruiser 依存関係を可視化する方法"
date: 2025-03-05T18:00:00+09:00
description: dependency-cruiserは、JavaScript/TypeScriptプロジェクトのモジュール依存関係を解析・可視化するツールです。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Node.js
categories: 
- Node.js
image: images/thumbnail/Node.js_logo.svg
---

# 【Node.js】dependency-cruiser 依存関係を可視化する方法

**dependency-cruiser**は、JavaScript/TypeScriptプロジェクトのモジュール依存関係を解析・可視化するツールです。

## dependency-cruiserの概要

- **用途**: プロジェクト内のモジュール間依存を解析し、循環依存や不要な依存を検出。  
- **メリット**: アーキテクチャの健全性維持、リファクタリングの指標、CI/CDで自動チェックが可能。

## インストール手順

### Graphvizのインストール

GraphvizはDOT形式のグラフをSVG等にレンダリングするために必要です。

- **Ubuntu例**:
  ```bash
  sudo apt-get install graphviz
  ```

### dependency-cruiserのインストール

グローバルまたはプロジェクト内にインストール可能。

- **グローバルインストール**:
  ```bash
  npm install -g dependency-cruiser
  ```
- **プロジェクト内インストール**:
  ```bash
  npm install --save-dev dependency-cruiser
  ```

## 設定ファイルの作成

初期設定は以下のコマンドで簡単に作成できます。
```bash
npx depcruise --init
```
作成された **`.dependency-cruiser.js`** では、`doNotFollow` オプションで特定ディレクトリ（例：`node_modules`）の内部解析を防ぎ、解析結果のノイズを抑えます。

```javascript
doNotFollow: {
  path: ['node_modules', 'test', '.storybooks', '.yarn', '__*', '__*.ts', '@@*']
},
```

## 依存関係グラフの生成

### プロジェクト全体のグラフ生成

以下のコマンドでプロジェクトの依存関係をSVG画像に出力します。
```bash
npx depcruise ./ --output-type dot | dot -T svg > dependency-graph.svg
```
- **解説**:  
  - `npx depcruise ./`：カレントディレクトリの依存関係を解析  
  - `--output-type dot`：Graphviz形式で出力  
  - `dot -T svg`：SVG画像へ変換

### モノレポ対応（各パッケージごとにグラフ生成）

複数パッケージが存在する場合、各フォルダ毎に以下のコマンドで個別グラフを作成します。
```bash
find ./packages -maxdepth 1 -type d -exec bash -c 'dir={}; npx depcruise "$dir" --output-type dot | dot -T svg > "dependency-${dir##*/}-graph.svg"' \;
```
- **ポイント**: 各パッケージのディレクトリ名がファイル名に反映され、管理しやすい出力結果となります。

## ベストプラクティス

- **解析対象の絞り込み**: `includeOnly`や`exclude`オプションを利用し、ソースコード部分のみ解析することでノイズを減少。  
- **外部依存の制限**: `doNotFollow`を設定して、`node_modules`など不要な内部解析を防止。  
- **CI/CD連携**: GitHub Actionsなどに組み込み、依存ルール違反を自動検出することで品質向上につなげる。

## 参考リンク

- <a href="https://github.com/sverweij/dependency-cruiser" target="_blank" rel="nofollow noopener">dependency-cruiser 公式リポジトリ (GitHub)</a>
