---
title: "【GitHub】GitHub Actions リポジトリチェックアウトを高速化する方法"
date: 2024-07-14T12:30:00+09:00
description: "GitHub Actions のチェックアウトを高速化するための3つの方法のメモ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions リポジトリチェックアウトを高速化する方法

GitHub Actionsは、CI/CDパイプラインを簡単に構築できる強力なツールです。しかし、リポジトリのチェックアウトが遅いと、ワークフロー全体の速度に悪影響を与えることがあります。チェックアウトを高速化するための3つの方法のメモ。

## 浅いチェックアウト（Shallow Checkout）

浅いチェックアウトを行うことで、必要なコミット履歴のみを取得し、時間を短縮できます。これには、`fetch-depth`オプションを使用します。

### 設定方法

以下は、最新の1コミットだけを取得する設定例です：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 1  # 最新の1コミットだけを取得
```

この設定により、不要な履歴の取得を防ぎ、チェックアウトの速度が向上します。

## 特定のブランチやタグをチェックアウト

必要なブランチやタグだけをチェックアウトすることで、ムダなデータのダウンロードを防ぎます。

### 設定方法

以下は、特定のブランチをチェックアウトする設定例です：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout specific branch
        uses: actions/checkout@v4
        with:
          ref: refs/heads/main  # 特定のブランチを指定
```

この方法では、指定したブランチやタグのみが取得され、チェックアウトがより迅速に行われます。

## actions/checkout の最新バージョンを使用

`actions/checkout`アクションの最新バージョンを使用することで、パフォーマンスの改善や新機能を利用できます。常に最新バージョンを使用することが推奨されます。

### 設定方法

以下は、`v4`バージョンを使用する設定例です：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
```

最新バージョンの利用により、最新の最適化やバグ修正が反映された状態でアクションを実行できます。

## まとめ

GitHub Actionsでリポジトリのチェックアウトを高速化するためには、以下の方法を試してみてください：

1. **浅いチェックアウト**：`fetch-depth`オプションを使用して取得するコミットを制限する。
2. **特定のブランチやタグをチェックアウト**：必要なブランチやタグのみをチェックアウトする。
3. **最新バージョンの`actions/checkout`を使用**：常に最新バージョンを使用する。

これらの方法を組み合わせることで、ワークフローの効率を大幅に向上させることができます。

## 参考

- <a href="https://github.com/actions/checkout" target="_blank" rel="nofollow noopener">actions/checkout</a>
