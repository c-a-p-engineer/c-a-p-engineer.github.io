---
title: "【GitHub】GitHub Actions Debug 設定をする"
date: 2022-07-04T12:00:00+09:00
description: "GitHub Actions Debug 設定を方法。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions Debug 設定をする
GitHub Actions Debug 設定を方法。
GitHub Actions 導入時にはデバッグしやすいように入れておくのが良いでしょう。

## 設定値
* `ACTIONS_RUNNER_DEBUG`
  * Runnerの実行ログ
* `ACTIONS_STEP_DEBUG`
  * Step毎の実行ログ 

## 設定
1. 導入したい `Repository` の `Settings`を選択。
2. 左のメニューの `Secrets` を指定
3. 右上の `New repository secret` を選択。
4. ランナーの診断ロギングの有効化
  1. `Name` に `ACTIONS_RUNNER_DEBUG` を設定。
  2. `Value` に取得した `true` を設定。
5. ステップのデバッグロギングの有効化
  1. `Name` に `ACTIONS_STEP_DEBUG` を設定。
  2. `Value` に取得した `true` を設定。

これで GitHub Actions 上で詳細なログが出力がされます。

## 参考
* <a href="https://docs.github.com/ja/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging" target="_blank" rel="nofollow noopener">デバッグロギングの有効化 - GitHub Docs</a>
