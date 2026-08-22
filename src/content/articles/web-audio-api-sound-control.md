---
title: "【Javascript】 Web Audio API で音を操ろう！波形・周波数・音量をリアルタイム調整"
date: 2025-04-16T01:00:00+09:00
description: "今回は Web Audio API を使って、ブラウザ上で音を鳴らし、リアルタイムで「波形」「周波数」「音量」をコントロールできるサンプルを紹介します。"
tags: []
categories: []
draft: false
legacySlug: web-audio-api-sound-control
image: "images/thumbnail/javascript.png"
---

# Web Audio API で音を操ろう！波形・周波数・音量をリアルタイム調整

「ブラウザで音を鳴らす」そんなことが簡単にできるのをご存じでしょうか？

今回は **Web Audio API** を使って、ブラウザ上で音を鳴らし、リアルタイムで「波形」「周波数」「音量」をコントロールできるサンプルを紹介します。

この記事を読めば、
- 自分で音を生成できる
- 音の特徴（波形・周波数・音量）を理解できる
- AudioContext の扱い方がわかる

など、音のプログラミングの第一歩を踏み出せますよ！

---


## DEMO

こんな感じのを作ります。

<button id="playStopButton">再生</button>

<div class="control-group">
    <label for="oscillatorTypeSelect">波形タイプ:
        <span class="value-display" id="waveTypeDisplay">Sine</span>
    </label>
    <select id="oscillatorTypeSelect">
        <option value="sine">サイン波</option>
        <option value="square">矩形波</option>
        <option value="sawtooth">のこぎり波</option>
        <option value="triangle">三角波</option>
    </select>
</div>

<div class="control-group">
    <label for="frequencySlider">周波数 (Hz):
        <span class="value-display" id="frequencyValue">440</span>
    </label>
    <input type="range" id="frequencySlider" min="100" max="2000" value="440">
</div>

<div class="control-group">
    <label for="gainSlider">音量:
        <span class="value-display" id="gainValue">0.50</span>
    </label>
    <input type="range" id="gainSlider" min="0" max="1" value="0.5" step="0.01">
</div>

<div id="status">停止中</div>

<script>
let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;

const playStopButton = document.getElementById('playStopButton');
const oscillatorTypeSelect = document.getElementById('oscillatorTypeSelect');
const frequencySlider = document.getElementById('frequencySlider');
const frequencyValueDisplay = document.getElementById('frequencyValue');
const gainSlider = document.getElementById('gainSlider');
const gainValueDisplay = document.getElementById('gainValue');
const waveTypeDisplay = document.getElementById('waveTypeDisplay');
const statusDisplay = document.getElementById('status');

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound() {
    initAudioContext();

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = oscillatorTypeSelect.value;
    oscillator.frequency.setValueAtTime(frequencySlider.value, audioContext.currentTime);
    gainNode.gain.setValueAtTime(gainSlider.value, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    isPlaying = true;
    playStopButton.textContent = '停止';
    playStopButton.classList.add('playing');
    updateStatus();
}

function stopSound() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
        oscillator = null;
        gainNode = null;
    }

    isPlaying = false;
    playStopButton.textContent = '再生';
    playStopButton.classList.remove('playing');
    statusDisplay.textContent = '停止中';
}

function updateStatus() {
    statusDisplay.textContent = `再生中: ${oscillator.type} / ${oscillator.frequency.value} Hz / 音量 ${gainNode.gain.value.toFixed(2)}`;
}

playStopButton.addEventListener('click', () => {
    initAudioContext();
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            isPlaying ? stopSound() : playSound();
        });
    } else {
        isPlaying ? stopSound() : playSound();
    }
});

oscillatorTypeSelect.addEventListener('change', () => {
    waveTypeDisplay.textContent = oscillatorTypeSelect.options[oscillatorTypeSelect.selectedIndex].text;
    if (isPlaying) {
        stopSound();
        setTimeout(playSound, 150);
    }
});

frequencySlider.addEventListener('input', (e) => {
    frequencyValueDisplay.textContent = e.target.value;
    if (isPlaying && oscillator) {
        oscillator.frequency.setValueAtTime(e.target.value, audioContext.currentTime);
        updateStatus();
    }
});

gainSlider.addEventListener('input', (e) => {
    gainValueDisplay.textContent = parseFloat(e.target.value).toFixed(2);
    if (isPlaying && gainNode) {
        gainNode.gain.setValueAtTime(e.target.value, audioContext.currentTime);
        updateStatus();
    }
});
</script>

## Web Audio API の基礎知識

### AudioContext の役割

Web Audio API で音を扱うには、まず「**AudioContext**」を作る必要があります。
これは「音を鳴らすためのオーケストラの指揮者」のような存在です。

```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
```

### OscillatorNode とは

音の発生源となるのが「**OscillatorNode**」です。
オシレーターは特定の波形で音を生成します。

- サイン波（滑らかな音）
- 矩形波（電子音っぽい）
- のこぎり波（荒々しい音）
- 三角波（やわらかい電子音）

### GainNode とは

音の大きさを調整する「**GainNode**」はボリュームコントロールに使います。

```javascript
const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // 音量50%
```

---

## サンプルコードの紹介

### 全体構成

今回のサンプルは以下のようになっています。

- シンプルな HTML & CSS（操作UI）
- JavaScript で音を鳴らす処理
- 波形、周波数、音量を変更できるインタラクティブなデモ

---

## コードのポイント解説

### AudioContext の初期化

```javascript
function initAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}
```

ブラウザによっては `webkitAudioContext` が必要です。

### 音を鳴らす処理（playSound）

```javascript
function playSound() {
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = oscillatorTypeSelect.value;
    oscillator.frequency.setValueAtTime(frequencySlider.value, audioContext.currentTime);
    gainNode.gain.setValueAtTime(gainSlider.value, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    isPlaying = true;
}
```

選んだ波形タイプと周波数・音量をセットして再生します。

### 音を止める処理（stopSound）

```javascript
function stopSound() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        gainNode.disconnect();
    }

    isPlaying = false;
}
```

再生中の音をきれいに止めることができます。

---

## リアルタイムで音を変える

### 波形を変更

波形セレクトボックスのイベントで、再生中なら音を止めて再スタートします。

```javascript
oscillatorTypeSelect.addEventListener('change', () => {
    if (isPlaying) {
        stopSound();
        setTimeout(playSound, 150);
    }
});
```

### 周波数・音量を変更

スライダー操作で即座に反映！

```javascript
frequencySlider.addEventListener('input', (e) => {
    if (isPlaying && oscillator) {
        oscillator.frequency.setValueAtTime(e.target.value, audioContext.currentTime);
    }
});
```

```javascript
gainSlider.addEventListener('input', (e) => {
    if (isPlaying && gainNode) {
        gainNode.gain.setValueAtTime(e.target.value, audioContext.currentTime);
    }
});
```

---

## 実行時エラーを防ぐポイント

### AudioContext.resume() を忘れずに！

最近のブラウザでは「ユーザー操作がないと音が鳴らない」仕様になっています。
そのため、再生ボタンのクリックイベント内で `audioContext.resume()` を呼ぶのがベストです。

```javascript
playStopButton.addEventListener('click', () => {
    audioContext.resume().then(() => {
        playSound();
    });
});
```

### 音が鳴らないときのチェックリスト

- AudioContext を初期化しているか
- AudioContext.resume() を呼んでいるか
- ブラウザのオーディオ設定が有効か
- ボリュームが 0 になっていないか

---

## 🎉 完成版：すべてまとめた実行サンプル

以下のコードを保存してブラウザで開けば、すぐに音を鳴らせるデモが実行できます！

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Audio API 完成サンプル</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
        }
        h2 {
            margin-bottom: 15px;
        }
        button {
            padding: 10px 20px;
            margin-bottom: 20px;
            border: none;
            border-radius: 5px;
            background: #007bff;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
        button.playing {
            background: #dc3545;
        }
        .control-group {
            margin-bottom: 15px;
            text-align: left;
        }
        label {
            font-size: 14px;
            display: block;
            margin-bottom: 5px;
        }
        input[type="range"], select {
            width: 100%;
        }
        .value-display {
            float: right;
            font-weight: bold;
        }
        #status {
            margin-top: 10px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>音を鳴らすサンプル</h2>
        <button id="playStopButton">再生</button>

        <div class="control-group">
            <label for="oscillatorTypeSelect">波形タイプ:
                <span class="value-display" id="waveTypeDisplay">Sine</span>
            </label>
            <select id="oscillatorTypeSelect">
                <option value="sine">サイン波</option>
                <option value="square">矩形波</option>
                <option value="sawtooth">のこぎり波</option>
                <option value="triangle">三角波</option>
            </select>
        </div>

        <div class="control-group">
            <label for="frequencySlider">周波数 (Hz):
                <span class="value-display" id="frequencyValue">440</span>
            </label>
            <input type="range" id="frequencySlider" min="100" max="2000" value="440">
        </div>

        <div class="control-group">
            <label for="gainSlider">音量:
                <span class="value-display" id="gainValue">0.50</span>
            </label>
            <input type="range" id="gainSlider" min="0" max="1" value="0.5" step="0.01">
        </div>

        <div id="status">停止中</div>
    </div>

    <script>
        let audioContext;
        let oscillator;
        let gainNode;
        let isPlaying = false;

        const playStopButton = document.getElementById('playStopButton');
        const oscillatorTypeSelect = document.getElementById('oscillatorTypeSelect');
        const frequencySlider = document.getElementById('frequencySlider');
        const frequencyValueDisplay = document.getElementById('frequencyValue');
        const gainSlider = document.getElementById('gainSlider');
        const gainValueDisplay = document.getElementById('gainValue');
        const waveTypeDisplay = document.getElementById('waveTypeDisplay');
        const statusDisplay = document.getElementById('status');

        function initAudioContext() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function playSound() {
            initAudioContext();

            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            oscillator = audioContext.createOscillator();
            gainNode = audioContext.createGain();

            oscillator.type = oscillatorTypeSelect.value;
            oscillator.frequency.setValueAtTime(frequencySlider.value, audioContext.currentTime);
            gainNode.gain.setValueAtTime(gainSlider.value, audioContext.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start();

            isPlaying = true;
            playStopButton.textContent = '停止';
            playStopButton.classList.add('playing');
            updateStatus();
        }

        function stopSound() {
            if (oscillator) {
                oscillator.stop();
                oscillator.disconnect();
                gainNode.disconnect();
                oscillator = null;
                gainNode = null;
            }

            isPlaying = false;
            playStopButton.textContent = '再生';
            playStopButton.classList.remove('playing');
            statusDisplay.textContent = '停止中';
        }

        function updateStatus() {
            statusDisplay.textContent = `再生中: ${oscillator.type} / ${oscillator.frequency.value} Hz / 音量 ${gainNode.gain.value.toFixed(2)}`;
        }

        playStopButton.addEventListener('click', () => {
            initAudioContext();
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    isPlaying ? stopSound() : playSound();
                });
            } else {
                isPlaying ? stopSound() : playSound();
            }
        });

        oscillatorTypeSelect.addEventListener('change', () => {
            waveTypeDisplay.textContent = oscillatorTypeSelect.options[oscillatorTypeSelect.selectedIndex].text;
            if (isPlaying) {
                stopSound();
                setTimeout(playSound, 150);
            }
        });

        frequencySlider.addEventListener('input', (e) => {
            frequencyValueDisplay.textContent = e.target.value;
            if (isPlaying && oscillator) {
                oscillator.frequency.setValueAtTime(e.target.value, audioContext.currentTime);
                updateStatus();
            }
        });

        gainSlider.addEventListener('input', (e) => {
            gainValueDisplay.textContent = parseFloat(e.target.value).toFixed(2);
            if (isPlaying && gainNode) {
                gainNode.gain.setValueAtTime(e.target.value, audioContext.currentTime);
                updateStatus();
            }
        });
    </script>
</body>
</html>
```

## 参考

- <a href="https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API" target="_blank" rel="nofollow noopener">MDN Web Audio API</a>
- <a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext" target="_blank" rel="nofollow noopener">MDN AudioContext</a>
- <a href="https://developer.mozilla.org/ja/docs/Web/API/OscillatorNode" target="_blank" rel="nofollow noopener">MDN OscillatorNode</a>
- <a href="https://developer.mozilla.org/ja/docs/Web/API/GainNode" target="_blank" rel="nofollow noopener">MDN GainNode</a>
