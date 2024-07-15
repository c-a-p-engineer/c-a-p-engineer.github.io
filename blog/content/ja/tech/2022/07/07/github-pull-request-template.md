---
title: "【GitHub】Pull Request テンプレートを使用する"
date: 2022-07-07T18:00:00+09:00
description: "GitHub Pull Request テンプレートを作成して使用する方法。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】Pull Request テンプレートを使用する
GitHub Pull Request テンプレートを作成して使用する方法。
これを使用することによってPull Request作成時、項目などの記載ブレが減ります。

## テンプレートを作成する
以下のいずれかに作成すれば適用されます。
* `/.github/pull_request_template.md`
* `/docs/pull_request_template.md`
* `/pull_request_template.md`

僕が作成したテンプレートは下記になります。

```md:.github\pull_request_template.md
# Pull Request
<!-- Pull Requestのタイトル -->

## チケット
<!-- チケットがあればリンク貼る -->

## PRタイプ
<!-- Pull Requestの種類を選択 -->
<!-- 必要なものだけ残す -->
* 🆕新機能
* 🐛バグ対応
* 🧹リファクタリング
* 📖ドキュメント整備
* 💻開発環境
* 🚄インフラ
* ✅テスト

## 概要
<!-- Pull Request 概要・背景など -->

## 変更内容
<!-- 変更点 -->

## 影響範囲
<!-- 影響範囲 -->

## テスト
<!-- テスト手順 -->
<!-- テスト結果 -->

## その他
<!-- レビュワーへの注意点・相談内容・懸念点 -->
```

## 複数のテンプレートを使用する
1. 複数のテンプレートを格納するディレクトリを作成。
  * `/.github/PULL_REQUEST_TEMPLATE/`
2. 複数のテンプレートを作成します。
  * `/.github/PULL_REQUEST_TEMPLATE/template1.md`
  * `/.github/PULL_REQUEST_TEMPLATE/template2.md`
3. Pull Requestを作成する。
4. Pull Request作成時にURLの末尾に `?template=template1.md` を追加。
5. 指定されたテンプレートを使用できる。

## 参考
* <a href="https://docs.github.com/ja/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository" target="_blank" rel="nofollow noopener">リポジトリ用のプルリクエストテンプレートの作成 - GitHub Docs</a>
