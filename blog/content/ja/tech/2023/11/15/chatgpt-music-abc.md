---
title: 【ChatGPT】ABC記譜法を利用して音楽を作る方法
date: 2023-11-15T04:00:00+09:00
description: ChatGPTにABC記譜法を利用して音楽を作らせてみます。
draft: false
enableToc: true
enableTocContent: true
tags: 
- AI
- ChatGPT
- 音楽
categories: 
- AI
image: images/thumbnail/ai_robot.jpg
---

# 【ChatGPT】ABC記譜法を利用して音楽を作る方法

ChatGPTにABC記譜法を利用して音楽を作らせてみます。ABC記譜法は、シンプルで読みやすい音楽表記法です。主にフォークや伝統音楽に使用されていますが、どんなジャンルの音楽にも適用可能です。今回は、ChatGPTを活用してABC記譜法で音楽を作成する方法についてご紹介します。

## ABC記譜法とは？

ABC記譜法は、音楽をテキスト形式で表現する方法です。各音符はアルファベットや記号で表され、リズムや拍子、キー（調）などの情報も簡潔に記述できます。この方法は、コンピュータでの作業に適しており、特別な楽譜ソフトウェアがなくても音楽の作成や共有が可能です。

<a href="https://ja.wikipedia.org/wiki/ABC%E8%A8%98%E8%AD%9C%E6%B3%95" target="_blank" rel="nofollow noopener">ABC記譜法 - Wikipedia</a>

基本は以下のような構造です。細かなものに対してはWikipediaなどを見てみてください。

```text
X: 1
T: ドレミファソラシド（タイトル）
C: 作曲者名
M: 4/4
L: 1/4
K: C
%%MIDI program 1 1 % ピアノ
%%MIDI program 2 25 % アコースティックギター
%%MIDI program 3 41 % バイオリン
V:1
C D E F | G A B c ]
w: ド レ ミ ファ ソ ラ シ ド
V:2 
C D E F | G A B c ]
w: ド レ ミ ファ ソ ラ シ ド
V:3 %%MIDI program 41 % バイオリン
C D E F | G A B c ]
w: ド レ ミ ファ ソ ラ シ ド

```

`MIDI program` では指定することで再生時の楽器を指定できます。
<a href="https://ja.wikipedia.org/wiki/General_MIDI#Melodic_sounds" target="_blank" rel="nofollow noopener">Melodic sounds</a>

### abcjs: Quick Editor

ABC記譜法をものを実際にすぐ聞けるようにするライブエディターです。
<a href="https://editor.drawthedots.com/" target="_blank" rel="nofollow noopener">abcjs: Quick Editor</a>

## ChatGPTを使ったABC記譜法の利用法

ChatGPTを使用すると、指定した条件に基づいてABC記譜法の楽譜を作成ができます。たとえば、特定のジャンルやキーでの曲作り、特定の楽器を用いた作曲など、さまざまなリクエストに応じて楽譜を生成することが可能です。

### プロンプトのテンプレート

音楽初心者の方にもわかりやすいように、以下のテンプレートを用意しました。このテンプレートを使って、ChatGPTに具体的な音楽作成のリクエストを行うことができます。

```text
ABC記法楽譜作成リクエスト

ABC記法で以下の要件の楽譜を作成してください。
- どんな曲か
- 曲の長さ
- 使用楽器

複数パートがある時でも1つにまとめてください。
%%MIDI program で音源を設定してください。
プログラミングを使用しないでください。
```

※ **プログラミングを使用しないでください。** を入れないとPython使って書いたりしようとすることがあります。

### 作成例

ここでは、具体的なリクエスト例として以下のように依頼してみます。

```text
ABC記法楽譜作成リクエスト

ABC記法で以下の要件の楽譜を作成してください。
- 童謡
- 30秒
- ピアノ
- 複数パート

複数パートがある時でも1つにまとめてください。
%%MIDI program で音源を設定してください。
プログラミングを使用しないでください。
```

という条件で楽譜を作成しました。

```text
X:1
T:童謡のメロディ
M:4/4
L:1/4
Q:1/4=120
%%MIDI program 0
K:C
C2 E2 | G4 | A2 G2 | F4 | E2 G2 | C4 | D2 E2 | C4 |

X:2
T:童謡の伴奏
M:4/4
L:1/4
Q:1/4=120
%%MIDI program 0
K:C
[C2E2] [G,2B,2] | [G,2B,2] [G,2B,2] | [A,2C2] [G,2B,2] | [F,2A,2] [F,2A,2] | [E,2G,2] [C2E2] | [C2E2] [C2E2] | [D2F2] [E2G2] | [C2,E2,G2] [C2,E2,G2] |
```

このまま使用するとメロディと伴奏が別れてしまうので下記のように1つにまとめます。

30秒と指定したのですが…これで約15秒の曲が完成。

```text
X:1
T:童謡のメロディ
M:4/4
L:1/4
Q:1/4=120
%%MIDI program 0
K:C
V:1
C2 E2 | G4 | A2 G2 | F4 | E2 G2 | C4 | D2 E2 |
%%MIDI program 0
V:2
[C2E2] [G,2B,2] | [G,2B,2] [G,2B,2] | [A,2C2] [G,2B,2] | [F,2A,2] [F,2A,2] | [E,2G,2] [C2E2] | [C2E2] [C2E2] | [D2F2] [E2G2]
```

もう少し明るくなどChatGPTに色々編集を依頼した結果がこちらになります。
だいぶ要望に近いものができあがりました。

```text
X:1
T:明るい童謡風メロディ
M:4/4
L:1/8
Q:1/4=140
%%MIDI program 0
V:1
GABc d2ed | c2B2 A4 | GABc d2ed | c2A2 G4 |
e2e2 f2g2 | a2g2 f4 | e2e2 f2g2 | a2f2 g4 |
c'2ba g2fe | d2c2 B4 | c'2ba g2fe | d2c2 B4 |
c'2ba g2fe | d2c2 B4 | e2d2 c2B2 | A6 z2 |
V:2
z4 G4 | E2C2 D4 | z4 G4 | E2C2 D4 |
z4 A4 | F2D2 G4 | z4 A4 | F2D2 G4 |
z4 e4 | c2A2 B4 | z4 e4 | c2A2 B4 |
z4 e4 | c2A2 B4 | z4 c4 | G,6 z2 |
```

## まとめ

ChatGPTを使ってABC記譜法で音楽を作成すること自体は簡単ですが、そこから修正していく作業などは基本的な音楽知識がないと難しくなっていきます。
お試しでテンプレートを使用して具体的なリクエストを行い、オリジナルの楽譜を作成してみましょう。

ちなみにプラグインで音楽ファイルを作ってくれたりもするのですが、ダウンロード→聞くという作業がとても手間になるので僕は出力したものをライブエディターで確認するという流れでやりました。
