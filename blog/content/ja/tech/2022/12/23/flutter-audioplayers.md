---
title: "【Flutter】AudioPlayers を使って音を出す"
date: 2022-12-23T01:20:00+09:00
description: "Flutter でAudioPlayersを使って音を出す方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】AudioPlayers を使って音を出す
Flutter でAudioPlayersを使って音を出す方法
<a href="https://pub.dev/packages/audioplayers/install" target="_blank" rel="nofollow noopener">audioplayers</a> というパッケージを使用します。

## 環境 
* Flutter 3.3.8
* <a href="https://pub.dev/packages/audioplayers" target="_blank" rel="nofollow noopener">audioplayers</a> 1.1.1

## インストール
まずは以下のコマンドを実行して `audioplayers` のインストールをします。
```
flutter pub add audioplayers
```

### 音ファイルを配置する
`audio` フォルダをプロジェクト直下に作成します。
再生したい音ファイルをその中に入れます。

### 設定ファイルを編集
`pubspec.yaml` ファイルを編集します。
```yaml:pubspec.yaml {linenos=table,hl_lines=[5]}
flutter:

  assets:
    # 音ファイルを指定する場合
    - audio/sample.mp3
```

### サンプルコード
サンプルコードはこちらになります。
カウンターアプリのボタンを押す毎に音が出るようになっています。

ファイルの指定に `DeviceFileSource` を使用していますが音ファイルのソース指定には以下のものが使用できます。
* <a href="https://pub.dev/documentation/audioplayers/latest/audioplayers/AssetSource-class.html" target="_blank" rel="nofollow noopener">AssetSource class - audioplayers library - Dart API</a>
* <a href="https://pub.dev/documentation/audioplayers/latest/audioplayers/BytesSource-class.html" target="_blank" rel="nofollow noopener">BytesSource class - audioplayers library - Dart API</a>
* <a href="https://pub.dev/documentation/audioplayers/latest/audioplayers/DeviceFileSource-class.html" target="_blank" rel="nofollow noopener">DeviceFileSource class - audioplayers library - Dart API</a>
* <a href="https://pub.dev/documentation/audioplayers/latest/audioplayers/UrlSource-class.html" target="_blank" rel="nofollow noopener">UrlSource class - audioplayers library - Dart API</a>


```dart:/lib/main.dart {linenos=table,hl_lines=[2,34,38]}
import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  // オーディアプレイヤーを宣言
  final player = AudioPlayer();

  void _incrementCounter() {
    // 音ファイルを指定して再生
    player.play(DeviceFileSource("audio/sample.mp3"));
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}

```

## 参考
* <a href="https://pub.dev/packages/audioplayers" target="_blank" rel="nofollow noopener">audioplayers  | Flutter Packages</a>
