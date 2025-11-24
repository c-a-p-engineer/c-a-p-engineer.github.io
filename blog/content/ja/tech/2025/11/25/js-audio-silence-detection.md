---
title: "JavaScriptで音声録音時に無音を検知して自動停止する方法"
date: 2025-11-25T01:00:00+09:00
publishDate: 2025-11-25T01:00:00+09:00
description: "Web Audio APIを使用して、マイク入力から無音を検知し、5秒間続いたら録音を自動終了する実装方法を解説します。"
tags: ["javascript", "audio", "web-audio-api"]
categories: ["tech"]
image: images/thumbnail/javascript.png
draft: false
slug: "js-audio-silence-detection"
---

# JavaScriptで音声録音時に無音を検知して自動停止する方法

音声入力機能を持つWebアプリケーションを開発する際、「ユーザーが話し終わったら自動的に録音を停止したい」という要件はよくあります。今回は、JavaScriptのWeb Audio APIを使って、マイク入力の音量を監視し、一定時間（今回は5秒）無音が続いたら録音を終了する実装方法を紹介します。

## 実装のポイント

1.  **`MediaRecorder`**: 音声の録音に使用します。
2.  **`AudioContext` と `AnalyserNode`**: 音声データの解析（音量取得）に使用します。
3.  **`requestAnimationFrame`**: リアルタイムに音量をチェックするために使用します。

## サンプルコード

以下は、録音開始ボタンを押すと録音が始まり、無音が5秒続くと自動的に停止するサンプルのHTMLとJavaScriptです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>無音検知録音サンプル</title>
</head>
<body>
    <h1>無音検知録音サンプル</h1>
    <button id="startBtn">録音開始</button>
    <button id="stopBtn" disabled>録音停止</button>
    <p id="status">待機中</p>
    <p>無音継続時間: <span id="silenceTime">0.00</span> 秒</p>

    <script>
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const statusEl = document.getElementById('status');
        const silenceTimeEl = document.getElementById('silenceTime');

        let mediaRecorder;
        let audioContext;
        let analyser;
        let microphone;
        let silenceStart = null;
        let isRecording = false;
        let animationId;
        
        // 無音とみなす閾値（0.0〜1.0）。環境に合わせて調整してください。
        const SILENCE_THRESHOLD = 0.02;
        // 録音を停止するまでの無音時間（ミリ秒）
        const SILENCE_DURATION = 5000;

        startBtn.addEventListener('click', startRecording);
        stopBtn.addEventListener('click', stopRecording);

        async function startRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // AudioContextのセットアップ
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                
                // FFTサイズの設定（データ取得の解像度）
                analyser.fftSize = 2048;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                // MediaRecorderのセットアップ
                mediaRecorder = new MediaRecorder(stream);
                
                mediaRecorder.onstart = () => {
                    statusEl.textContent = '録音中...';
                    startBtn.disabled = true;
                    stopBtn.disabled = false;
                    isRecording = true;
                    silenceStart = performance.now();
                    detectSilence(dataArray, bufferLength);
                };

                mediaRecorder.onstop = () => {
                    statusEl.textContent = '録音終了';
                    startBtn.disabled = false;
                    stopBtn.disabled = true;
                    isRecording = false;
                    cancelAnimationFrame(animationId);
                    
                    // ストリームのトラックを停止
                    stream.getTracks().forEach(track => track.stop());
                    if (audioContext && audioContext.state !== 'closed') {
                        audioContext.close();
                    }
                };

                mediaRecorder.ondataavailable = (e) => {
                    // ここで録音データを処理（保存や送信など）
                    console.log('データ取得:', e.data);
                };

                mediaRecorder.start();

            } catch (err) {
                console.error('マイクへのアクセスに失敗しました:', err);
                statusEl.textContent = 'エラー: マイクにアクセスできません';
            }
        }

        function stopRecording() {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
        }

        function detectSilence(dataArray, bufferLength) {
            if (!isRecording) return;

            analyser.getByteTimeDomainData(dataArray);

            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                // 128が中心（無音）なので、振幅を計算
                const x = (dataArray[i] - 128) / 128.0;
                sum += x * x;
            }
            // RMS（二乗平均平方根）を計算して音量とする
            const rms = Math.sqrt(sum / bufferLength);

            const now = performance.now();

            if (rms < SILENCE_THRESHOLD) {
                // 無音の場合
                if (!silenceStart) {
                    silenceStart = now;
                }
                
                const silenceDuration = now - silenceStart;
                silenceTimeEl.textContent = (silenceDuration / 1000).toFixed(2);

                if (silenceDuration > SILENCE_DURATION) {
                    console.log('無音が続いたため自動停止しました');
                    stopRecording();
                    return;
                }
            } else {
                // 音がある場合、タイマーリセット
                silenceStart = now;
                silenceTimeEl.textContent = "0.00";
            }

            animationId = requestAnimationFrame(() => detectSilence(dataArray, bufferLength));
        }
    </script>
</body>
</html>
```

## 解説

### 音量の取得方法
`AnalyserNode.getByteTimeDomainData()` を使用して、波形データを取得しています。このデータは 0〜255 の範囲で、128 が無音（振幅0）の状態です。
各データ点から 128 を引いて正規化し、二乗平均平方根（RMS）を計算することで、現在の音量レベルを算出しています。

### 無音判定ロジック
算出された RMS 値が `SILENCE_THRESHOLD`（閾値）を下回っている場合を「無音」と判定します。
`requestAnimationFrame` ループ内で毎回チェックを行い、無音が続いている時間を計測します。閾値を超えた（音が鳴った）場合は、計測開始時間 `silenceStart` を現在時刻にリセットします。

### 注意点
- **閾値の調整**: マイクの感度や環境ノイズによって適切な `SILENCE_THRESHOLD` は異なります。実際の環境でテストして調整してください。
- **ブラウザの制限**: `AudioContext` はユーザー操作（クリックなど）がないと開始できない場合があります。このサンプルではボタンクリックをトリガーにしているため問題ありません。

## デモ

<button id="startBtn">録音開始</button>
<button id="stopBtn" disabled>録音停止</button>
<p id="status">待機中</p>
<p>無音継続時間: <span id="silenceTime">0.00</span> 秒</p>

<script>
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const statusEl = document.getElementById('status');
    const silenceTimeEl = document.getElementById('silenceTime');

    let mediaRecorder;
    let audioContext;
    let analyser;
    let microphone;
    let silenceStart = null;
    let isRecording = false;
    let animationId;
    
    // 無音とみなす閾値（0.0〜1.0）。環境に合わせて調整してください。
    const SILENCE_THRESHOLD = 0.02;
    // 録音を停止するまでの無音時間（ミリ秒）
    const SILENCE_DURATION = 5000;

    startBtn.addEventListener('click', startRecording);
    stopBtn.addEventListener('click', stopRecording);

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // AudioContextのセットアップ
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            
            // FFTサイズの設定（データ取得の解像度）
            analyser.fftSize = 2048;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // MediaRecorderのセットアップ
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.onstart = () => {
                statusEl.textContent = '録音中...';
                startBtn.disabled = true;
                stopBtn.disabled = false;
                isRecording = true;
                silenceStart = performance.now();
                detectSilence(dataArray, bufferLength);
            };

            mediaRecorder.onstop = () => {
                statusEl.textContent = '録音終了';
                startBtn.disabled = false;
                stopBtn.disabled = true;
                isRecording = false;
                cancelAnimationFrame(animationId);
                
                // ストリームのトラックを停止
                stream.getTracks().forEach(track => track.stop());
                if (audioContext && audioContext.state !== 'closed') {
                    audioContext.close();
                }
            };

            mediaRecorder.ondataavailable = (e) => {
                // ここで録音データを処理（保存や送信など）
                console.log('データ取得:', e.data);
            };

            mediaRecorder.start();

        } catch (err) {
            console.error('マイクへのアクセスに失敗しました:', err);
            statusEl.textContent = 'エラー: マイクにアクセスできません';
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
    }

    function detectSilence(dataArray, bufferLength) {
        if (!isRecording) return;

        analyser.getByteTimeDomainData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            // 128が中心（無音）なので、振幅を計算
            const x = (dataArray[i] - 128) / 128.0;
            sum += x * x;
        }
        // RMS（二乗平均平方根）を計算して音量とする
        const rms = Math.sqrt(sum / bufferLength);

        const now = performance.now();

        if (rms < SILENCE_THRESHOLD) {
            // 無音の場合
            if (!silenceStart) {
                silenceStart = now;
            }
            
            const silenceDuration = now - silenceStart;
            silenceTimeEl.textContent = (silenceDuration / 1000).toFixed(2);

            if (silenceDuration > SILENCE_DURATION) {
                console.log('無音が続いたため自動停止しました');
                stopRecording();
                return;
            }
        } else {
            // 音がある場合、タイマーリセット
            silenceStart = now;
            silenceTimeEl.textContent = "0.00";
        }

        animationId = requestAnimationFrame(() => detectSilence(dataArray, bufferLength));
    }
</script>

## まとめ
Web Audio API を組み合わせることで、単純な録音だけでなく、入力レベルに応じた制御が可能になります。音声入力フォームやボイスメモアプリなどで活用してみてください。
