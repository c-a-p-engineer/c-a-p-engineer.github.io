---
title: 難解プログラミングの Whitespace を触ってみる
date: 2023-12-10T03:30:00+09:00
description: スペース、タブ、改行のみで書く難解プログラミングの Whitespace を触ってみる
draft: false
enableToc: true
enableTocContent: true
tags: 
- 難解プログラミング言語
categories: 
- 難解プログラミング言語
image: images/thumbnail/esolang.jpg
---

# 難解プログラミングの Whitespace を触ってみる

スペース、タブ、改行のみで書く難解プログラミングの Whitespace を触ってみる。
このプログラミング言語、勉強するしたりするのはだいぶ辛いものに…
- <a href="https://ja.wikipedia.org/wiki/Whitespace" target="_blank" rel="nofollow noopener">Whitespace - Wikipedia</a>

## 環境構築

構築しなくてもオンラインエディタが存在します。
<a href="https://tio.run/#whitespace" target="_blank" rel="nofollow noopener">Whitespace - Try It Online</a>

GitHub からコードをインストールすることも可能ですが僕はDockerで構築いたしました。

- <a href="https://github.com/hostilefork/whitespacers" target="_blank" rel="nofollow noopener">whitespace - GitHub</a>
- <a href="https://hub.docker.com/r/esolang/whitespace" target="_blank" rel="nofollow noopener">esolang/whitespace - Docker Hub</a>


```bash
docker run -it --rm -it esolang/whitespace
```

Whitespaceの実行環境を含むDockerイメージをダウンロードしてコンテナ内に入ってくれます。

## 文法
IMP (Instruction Modification Parameter)、コマンド、パラメータの3つ組で命令を表現する
数値は二進記数法で表現する。
[Space]が0で、[Tab]が1で、[LF]が終端記号です。

- [Space] スタック操作
- [Tab][Space] 演算
- [Tab][Tab] ヒープアクセス
- [LF] フロー制御
- [Tab][LF] I/O

### スタック操作
- [Space] 数値：数値をスタックに積む
- [LF][Space]：スタックの一番上を複製する
- [LF][Tab]：スタックの1番目と2番目を交換する
- [LF][LF]：スタックの一番上の物を捨てる

### 演算
- [Space][Space]：加算
- [Space][Tab]：引き算
- [Space][LF]：かけ算
- [Tab][Space]：割り算
- [Tab][Tab]：剰余

### コメント
コメントはありませんがスペース、タブ、改行以外はすべて無視するので普通に文字を書いていけば問題ないです。

ただしコメント部分にスペースなどを入れてしまうと読み取られてしまうのでご注意ください。

## サンプルコード

実際に動かしてみます。

英語版のWikipediaにいい感じのサンプルコードがあったのでそちらを使用します。
- <a href="https://en.wikipedia.org/wiki/Whitespace_(programming_language)#Sample_code" target="_blank" rel="nofollow noopener">Sample Code</a>

以下のコードは `Hello, world!` と出力してくれます。

コンテナ内で vi を使うかDockerにマウントしてやってください。

```ws:hello.ws
S S S T	S S T	S S S L:Push_+1001000=72='H'_onto_the_stack
T	L
S S :Output_'H';_S S S T	T	S S T	S T	L:Push_+1100101=101='e'_onto_the_stack
T	L
S S :Output_'e';_S S S T	T	S T	T	S S L:+1101100=108='l'
T	L
S S S S S T	T	S T	T	S S L:+1101100=108='l'
T	L
S S S S S T	T	S T	T	T	T	L:+1101111=111='o'
T	L
S S S S S T	S T	T	S S L:+101100=44=','
T	L
S S S S S T	S S S S S L:+100000=32=Space
T	L
S S S S S T	T	T	S T	T	T	L:+1110111=119='w'
T	L
S S S S S T	T	S T	T	T	T	L:+1101111=111='o'
T	L
S S S S S T	T	T	S S T	S L:+1110010=114='r'
T	L
S S S S S T	T	S T	T	S S L:+1101100=108='l'
T	L
S S S S S T	T	S S T	S S L=+1100100=100='d'
T	L
S S S S S T	S S S S T	L:+100001=33='!'
T	L
S S :Output_'!';_L
L
L:End_the_program
```

実行する際は `whitespace [ファイル名]` で実行されます。

## 感想
可読性最悪、コードはとても分かりづらく、それはそれでおもしろいですね。

## 参考

- <a href="https://web.archive.org/web/20150618184706/http://compsoc.dur.ac.uk/whitespace/tutorial.php" target="_blank" rel="nofollow noopener">Whitespace - Tutorial</a>
- <a href="https://ja.wikipedia.org/wiki/Whitespace" target="_blank" rel="nofollow noopener">Whitespace - Wikipedia</a>
- <a href="https://github.com/hostilefork/whitespacers" target="_blank" rel="nofollow noopener">whitespace - GitHub</a>
- <a href="https://hub.docker.com/r/esolang/whitespace" target="_blank" rel="nofollow noopener">esolang/whitespace - Docker Hub</a>

<script>
setTimeout( 
  async () => {
    console.log(document.querySelectorAll('.language-ws'))
    document.querySelectorAll('.language-ws').forEach(function(element) {
    var html = element.innerHTML
        .replace(/ /g, '<span class="highlight-space">&nbsp;</span>')
        .replace(/\t/g, '<span class="highlight-tab">&Tab;</span>');
    element.innerHTML = html;
    });
}, 2000);
</script>
<style>
.language-ws::before {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 2px 7px;
  width: 100%;
  height: 30px;
  line-height: 1.9;
  font-size: 13.8px;
  font-family: montserrat,sans-serif;
  font-weight: 700;
  display: inline-block;
  content: "Whitespace";
}
.highlight-space {
  background-color: yellow;
}
.highlight-tab {
  background-color: lightblue;
}
</style>