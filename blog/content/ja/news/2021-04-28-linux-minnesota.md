---
title: "Linuxカーネルに意図的にバグを混入したとして大学にコミュニティ出禁措置"
date: 2021-04-28T04:30:00+09:00
description: "Linuxカーネルに意図的にバグを混入したとして大学にコミュニティ出禁措置"
draft: false
enableToc: true
enableTocContent: true
tags: 
- バグ
- Linux
categories: 
- バグ
image: images/thumbnail/linux.png
---

# Linuxカーネルに意図的にバグを混入したとして大学にコミュニティ出禁措置

## 対象

* Linuxカーネル

## 製品

* Linuxカーネル

## 発生理由

* 脆弱性の意図的な混入

## 時期

* 2021年04月21日

## 記事
> オープンソースソフトウェアの脆弱(ぜいじゃく)性に関する論文の執筆のため、Linuxカーネルに既知のバグを含むパッチを送信したことを理由に、ミネソタ大学に対して「Linuxカーネル開発への貢献の禁止」、つまり出禁措置が行われました。
> 問題となった論文は「On the Feasibility of Stealthily Introducing Vulnerabilities in Open-Source Software via Hypocrite Commits(偽善者のコミットによりオープンソースソフトウェアに脆弱性が密かに導入される可能性について)」と題されたもの。「オープンソースソフトウェア」とは、つまりLinuxのことで、執筆者らは<a href="https://securitychecklist.net/security/cyber-attack/Use-After-Free.html" target="_blank">Use After Free</a>の脆弱性を導入しようと試みたとのこと。
> 
> カーネルメンテナーのグレッグ・クロー＝ハートマン氏は「コードを見てください、これは起こりえません。既知の無効なパッチを提出するのはやめてください。あなたの教授は、奇妙で奇抜な方法を用いて論文を成立させるため、レビュープロセスをもてあそんでいます。我々の時間を無駄にする、こういったことは許されることではなく、大学に報告しなければなりません」と強く警告。
> 
> ミネソタ大学のAditya Pakki氏からの反応は「誹謗中傷に近い野蛮な非難はやめるようお願いします。これらのパッチは、私が作成した静的アナライザーの一部として送信されたもので、感度は明らかによくありません。フィードバックを期待してパッチを送りました。我々はLinuxカーネルの専門家ではないので、こうした発言を繰り返すのは、聞いていてうんざりです。明らかに手順を間違えています。あなたは先入観が強すぎて、根拠のない主張をして、我々に疑いの余地を与えています。これ以上パッチを送らないのは、歓迎されないからだけではなく、初心者や専門家ではない人に対して威圧的な態度だからです」というものでした。
> 
> これを受けて、ハートマン氏は「Linuxコミュニティは、意図的にバグを導入するような既知のパッチ提出により試されることを評価しません。やりたいなら、実験のための別のコミュニティを探すことをおすすめします」とコメント。「問題を引き起こすことを意図して明らかに不誠実なパッチ提出が行われたため、あなたの大学からの投稿を今後すべて禁止し、以前の投稿を削除する必要があります」と、ミネソタ大学の出禁を通達しました。
> 
> この件についてミネソタ大学は、コンピューターサイエンス部門の学科長であるMats Heimdahl氏と副学科長Loren Terveen氏の連名で、状況を深刻に受け止め、Linuxカーネルコミュニティに懸念を引き起こすような調査方法がなぜ承認されたのかといった経緯を調べ、できるだけ早く報告すると声明を出しています。
> 

### 元記事
* <a href="https://gigazine.net/news/20210422-linux-ban-university/" target="_blank" rel="noopener">Linuxカーネルに意図的にバグを混入したとして大学にコミュニティ出禁措置</a>

### 関連記事
* <a href="https://www.neowin.net/news/linux-bans-university-of-minnesota-for-sending-buggy-patches-in-the-name-of-research/" target="_blank" rel="noopener">Linux bans University of Minnesota for sending buggy patches in the name of research [Update] - Neowin</a><br>Linuxが研究の名の下にバグのあるパッチを送信したとしてミネソタ大学を禁止しました
* <a href="https://cse.umn.edu/cs/statement-cse-linux-kernel-research-april-21-2021" target="_blank" rel="noopener">Statement from CS&E on Linux Kernel research - April 21, 2021 | Department of Computer Science and Engineering | College of Science and Engineering</a><br>Linuxカーネル研究に関するCS＆Eの声明 - 2021年4月21日