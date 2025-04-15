---
title: "【Javascript】 ブラウザだけで音声合成！Web Speech APIの使い方とサンプルコード"
date: 2025-04-16T01:00:00+09:00
description: 「Web Speech API」を使えば、追加ライブラリなしでテキストを音声に変換することが可能です。
draft: false
enableToc: true
enableTocContent: true
tags: 
- JavaScript
categories: 
- JavaScript
image: images/thumbnail/javascript.png
---


# ブラウザだけで音声合成！Web Speech APIの使い方とサンプルコード

最近のブラウザには便利な機能がたくさん搭載されています。その中でも「Web Speech API」を使えば、追加ライブラリなしでテキストを音声に変換することが可能です。

今回は、日本語にも対応した音声読み上げデモアプリを作りながら、使い方とカスタマイズ方法を解説します。

コピペですぐ試せるサンプルコード付きなので、ぜひブラウザで動かしてみてください！

---

## DEMO

<textarea id="text" rows="4" cols="50">こんにちは！これはテストです。</textarea><br />
<label for="voiceSelect">声を選択:</label>
<select id="voiceSelect"></select><br /><br />
<label for="rate">スピード:</label>
<input type="range" id="rate" min="0.5" max="2" value="1" step="0.1"><br />
<label for="pitch">ピッチ:</label>
<input type="range" id="pitch" min="0" max="2" value="1" step="0.1"><br /><br />
<button onclick="speakText()">読み上げる</button>

<script>
const synthesis = window.speechSynthesis;
const voiceSelect = document.getElementById('voiceSelect');

function populateVoices() {
    const voices = synthesis.getVoices().filter(v => v.lang.startsWith('ja'));
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = voice.name;
    voiceSelect.appendChild(option);
    });
}

synthesis.onvoiceschanged = populateVoices;
window.onload = populateVoices;

function speakText() {
    const text = document.getElementById('text').value;
    const utterThis = new SpeechSynthesisUtterance(text);
    const selectedVoice = Array.from(synthesis.getVoices()).find(voice => voice.name === voiceSelect.value);
    const rate = document.getElementById('rate').value;
    const pitch = document.getElementById('pitch').value;

    if (selectedVoice) utterThis.voice = selectedVoice;
    utterThis.rate = rate;
    utterThis.pitch = pitch;
    synthesis.speak(utterThis);
}
</script>

---

## デモで体験しよう！（簡単 HTML サンプル）

まずは動くサンプルコードをご紹介します。下記のコードをコピーして、`.html` ファイルとして保存し、ブラウザで開いてみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Web Speech API デモ</title>
</head>
<body>
  <h1>音声合成デモ (日本語対応)</h1>
  <textarea id="text" rows="4" cols="50">こんにちは！これはテストです。</textarea><br />
  <label for="voiceSelect">声を選択:</label>
  <select id="voiceSelect"></select><br /><br />
  <label for="rate">スピード:</label>
  <input type="range" id="rate" min="0.5" max="2" value="1" step="0.1"><br />
  <label for="pitch">ピッチ:</label>
  <input type="range" id="pitch" min="0" max="2" value="1" step="0.1"><br /><br />
  <button onclick="speakText()">読み上げる</button>

  <script>
    const synthesis = window.speechSynthesis;
    const voiceSelect = document.getElementById('voiceSelect');

    function populateVoices() {
      const voices = synthesis.getVoices().filter(v => v.lang.startsWith('ja'));
      voiceSelect.innerHTML = '';
      voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
      });
    }

    synthesis.onvoiceschanged = populateVoices;
    window.onload = populateVoices;

    function speakText() {
      const text = document.getElementById('text').value;
      const utterThis = new SpeechSynthesisUtterance(text);
      const selectedVoice = Array.from(synthesis.getVoices()).find(voice => voice.name === voiceSelect.value);
      const rate = document.getElementById('rate').value;
      const pitch = document.getElementById('pitch').value;

      if (selectedVoice) utterThis.voice = selectedVoice;
      utterThis.rate = rate;
      utterThis.pitch = pitch;
      synthesis.speak(utterThis);
    }
  </script>
</body>
</html>
```

### ポイント
- テキストを入力して「読み上げる」ボタンを押すだけで音声合成できます。
- 日本語の声がある場合は自動でプルダウンに追加されます。
- スピード（rate）とピッチ（pitch）を自由に変更できます！

---

## コード解説

### 1. 音声合成の準備
```javascript
const synthesis = window.speechSynthesis;
```
ブラウザの音声合成機能を取得します。

### 2. 声のリストを取得して表示
```javascript
function populateVoices() {
  const voices = synthesis.getVoices().filter(v => v.lang.startsWith('ja'));
  // ...
}
```
`getVoices()` で取得した声のリストから日本語の声だけをフィルタリングしています。

### 3. 読み上げ処理
```javascript
function speakText() {
  const utterThis = new SpeechSynthesisUtterance(text);
  // ...
  synthesis.speak(utterThis);
}
```
入力されたテキストを `SpeechSynthesisUtterance` に渡して再生します。

---

## 声のカスタマイズ方法

### 1. スピードを調整する
```javascript
utterThis.rate = rate; // 0.5 ~ 2
```
低くするとゆっくり、高くすると早口になります。

### 2. ピッチを調整する
```javascript
utterThis.pitch = pitch; // 0 ~ 2
```
声の高さを変更できます。高くすると明るい印象に。

### 3. 声を切り替える
```javascript
const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
utterThis.voice = selectedVoice;
```
日本語の声の中から選択して使用できます。

---

## 応用編：さらに便利にする

- **停止機能を追加**
  - 途中で読み上げを停止できるボタンを追加できます！

```html
<button onclick="window.speechSynthesis.cancel()">停止する</button>
```

- **イベントリスナーで完了検知**
  - 読み上げ終了を検知してメッセージ表示も可能です。

```javascript
utterThis.onend = () => alert('読み上げが完了しました！');
```

---


## 参考

- <a href="https://developer.mozilla.org/ja/docs/Web/API/SpeechSynthesis" target="_blank" rel="nofollow noopener">MDN Web Docs - SpeechSynthesis</a>
- <a href="https://developer.mozilla.org/ja/docs/Web/API/SpeechSynthesisUtterance" target="_blank" rel="nofollow noopener">MDN Web Docs - SpeechSynthesisUtterance</a>
- <a href="https://qiita.com/YusukeSama/items/ccaf65d7bac9c0ed9120" target="_blank" rel="nofollow noopener">Web Speech API のサンプルと解説（Qiita）</a>
- <a href="https://caniuse.com/?search=web%20speech%20api" target="_blank" rel="nofollow noopener">Can I use - Web Speech API</a>

---

## まとめ

Web Speech API を使えば、ブラウザだけで簡単に音声合成ができます。今回紹介したサンプルコードをベースに、自分好みにカスタマイズしてみましょう！

読み上げスピードやピッチの調整、停止ボタンの追加など、工夫次第でより便利なアプリが作れますよ。

ぜひあなたのプロジェクトにも活用してみてください！
