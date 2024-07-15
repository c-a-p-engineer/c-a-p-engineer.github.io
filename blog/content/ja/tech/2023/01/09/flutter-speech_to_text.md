---
title: "【Flutter】マイクを使って音声をテキスト化してみる"
date: 2023-01-09T17:00:00+09:00
description: "Flutter でマイクを使って音声をテキスト化してみる"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】マイクを使って音声をテキスト化してみる
Flutter でマイクを使って音声をテキスト化してみる
今回 <a href="https://pub.dev/packages/speech_to_text/versions/6.1.1" target="_blank" rel="nofollow noopener">speech_to_text 6.1.1</a> を使用してみます。
## パッケージインストール
以下のコマンドを使用してパッケージを取得します。
```
flutter pub add speech_to_text
```

## サンプルコード
サンプルコードはこちらを使用します。
<a href="https://pub.dev/packages/speech_to_text#complete-flutter-example" target="_blank" rel="nofollow noopener">speech_to_text # Complete Flutter example</a> 

音声認識をしている際に自動的にセッションが切れますのでご注意してください。
体感としては20～30秒程度で切れました。

<a href="https://pub.dev/packages/speech_to_text/example" target="_blank" rel="nofollow noopener">speech_to_text example</a> にセッションの秒数を指定するやり方が載っていました。 

ちなみにWebで確認致しましたが**Firefoxで試したところ動きませんでした。**
**Chromeでは動作しました。**

```dart:/lib/main.dart
import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  SpeechToText _speechToText = SpeechToText();
  bool _speechEnabled = false;
  String _lastWords = '';

  @override
  void initState() {
    super.initState();
    _initSpeech();
  }

  /// 音声認識を初期化
  void _initSpeech() async {
    _speechEnabled = await _speechToText.initialize();
    setState(() {});
  }

  /// 音声認識を開始
  void _startListening() async {
    await _speechToText.listen(onResult: _onSpeechResult);
    setState(() {});
  }

  /// 音声認識を停止
  void _stopListening() async {
    await _speechToText.stop();
    setState(() {});
  }

  /// 音声認識した文字を取得する
  void _onSpeechResult(SpeechRecognitionResult result) {
    setState(() {
      _lastWords = result.recognizedWords;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Speech Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              padding: EdgeInsets.all(16),
              child: Text(
                'Recognized words:',
                style: TextStyle(fontSize: 20.0),
              ),
            ),
            Expanded(
              child: Container(
                padding: EdgeInsets.all(16),
                child: Text(
                  // 音声認識された単語を表示
                  _speechToText.isListening
                      ? '$_lastWords'
                      : _speechEnabled
                          ? 'Tap the microphone to start listening...'
                          : 'Speech not available',
                ),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed:
            // 音声認識 ON/OFF
            _speechToText.isNotListening ? _startListening : _stopListening,
        tooltip: 'Listen',
        child: Icon(_speechToText.isNotListening ? Icons.mic_off : Icons.mic),
      ),
    );
  }
}
```

サンプルを実行するとこんなふうになります。（声は載せたくないのでGifでご勘弁ください
![stt_sample](/tech/2023/01/09/flutter-speech_to_text/stt_sample.gif "stt_sample") 

精度としてはまぁまぁな感じです。

## 参考
*  <a href="https://pub.dev/packages/speech_to_text" target="_blank" rel="nofollow noopener">speech_to_text | Flutter Package</a>
