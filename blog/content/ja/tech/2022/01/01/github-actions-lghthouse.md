---
title: "【GitHub】GitHub Actions で Lighthouse を使用して自動的にサイトのSEOなどをチェックする"
date: 2022-01-01T14:00:00+09:00
description: "GitHub Actions で Lighthouse を使用して自動的にサイトのSEOなどをチェックする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions で Lighthouse を使用して自動的にサイトのSEOなどをチェックする
GitHub Actions で Lighthouse を使用して自動的にサイトのSEOなどをチェックする方法。

## Lighthouseを導入する
サンプルの通りにまずは導入してみます。
<a href="https://www.foo.software/docs/lighthouse-check-github-action/examples#basic" target="_blank" rel="nofollow noopener">GitHub Lighthouse#Basic</a>

`urls` には検査対象のURLをカンマ区切りで設定してください。

``` yml:.github/workflows/lighthouse.yml
name: Lighthouse
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Lighthouse
      uses: foo-software/lighthouse-check-action@master
      with:
        urls: 'https://www.foo.software,https://www.google.com'
```

## Lighthouse 特定スコア以下を失敗扱いにする
特定スコア以下を失敗扱いにします。
<a href="https://www.foo.software/docs/lighthouse-check-github-action/examples#failing-workflows-by-enforcing-minimum-scores" target="_blank" rel="nofollow noopener">GitHub Lighthouse#Failing Workflows by Enforcing Minimum Scores</a>

これを行うことでスコアが落ちた時に通知などさせることが出来ます。
`urls` には検査対象のURLをカンマ区切りで設定してください。
``` yml:.github/workflows/lighthouse.yml
name: Lighthouse
on: [pull_request]

jobs:
  lighthouse-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Lighthouse
        uses: foo-software/lighthouse-check-action@master
        id: lighthouseCheck
        with:
          urls: 'https://www.foo.software,https://www.foo.software/contact'
      # 各スコア数値
      - name: Verify Lighthouse Check results
        uses: foo-software/lighthouse-check-status-action@master
        with:
          lighthouseCheckResults: ${{ steps.lighthouseCheck.outputs.lighthouseCheckResults }}
          minAccessibilityScore: "90"
          minBestPracticesScore: "50"
          minPerformanceScore: "50"
          minProgressiveWebAppScore: "50"
          minSeoScore: "50"

      # 失敗時の処理
      - if: failure()
        run: echo failure
```

## 参考
* <a href="https://github.com/marketplace/actions/lighthouse-check" target="_blank" rel="nofollow noopener">Lighthouse Check · Actions · GitHub Marketplace</a>
* <a href="https://www.foo.software/docs/lighthouse-check-github-action/examples" target="_blank" rel="nofollow noopener">Lighthouse Example | Doc</a>
