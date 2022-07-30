---
title: "【VSCode】Typo 防止のための 「Code Spell Checker」"
date: 2022-07-30T09:30:00+09:00
description: "Typo 防止のための 「Code Spell Checker」を使う"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Visual Studio Code
categories: 
- エディタ
image: images/thumbnail/Visual_Studio_Code_1.35_icon.svg
image_description: 'Visual Studio Codeは、米国およびその他の国におけるMozillaFoundationの商標です。'
---
# 【VSCode】Typo 防止のための 「Code Spell Checker」
VSCodeにTypo防止のための `Code Spell Checker` を使う

## 導入理由
typoチェックに関してCIに入れようかと考えましたが、それを行なうと開発中にTypoチェックすることなくプルリクなどのタイミングでチェックが走ってから修正。
この流れが大変面倒だなと感じたため、エディタに入れた方が効率的だという考えに至りました。

## Code Spell Checker
`Code Spell Checker` は英語のスペルチェックを行ってくれます。
他にもドイツ語などのバージョンがあります。
<a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker" target="_blank" rel="nofollow noopener">Code Spell Checker</a>

導入したらスペルミスに青い波線が付くようになります。
候補なども出してくれます。

### 単語登録
プロジェクト内としては正しい単語でも青い波線がでるので、解決するには単語登録をする必要があります。
1. 波線をクリック
2. クイックフィックス
3. `Add:"XXXXX" to workspace settings` or `Add:"XXXXX" to user settings`

## 参考
* <a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker" target="_blank" rel="nofollow noopener">Code Spell Checker</a>
