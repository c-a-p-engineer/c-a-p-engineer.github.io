---
title: "【Flutter】url_launcher でブラウザを開く"
date: 2023-01-15T10:40:00+09:00
description: "Flutter url_launcher でブラウザを開く"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】url_launcher でブラウザを開く
Flutter url_launcher でブラウザを開く
今回 <a href="https://pub.dev/packages/url_launcher/versions/6.1.7" target="_blank" rel="nofollow noopener">url_launcher: 6.1.7</a> を使用してみます。

## パッケージインストール
以下のコマンドを使用してパッケージを取得します。
```
flutter pub add url_launcher
```

## サンプルコード
サンプルコードはこちらを使用します。
<a href="https://pub.dev/packages/url_launcher#example" target="_blank" rel="nofollow noopener">url_launcher # Example</a> 

```dart:/lib/main.dart
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

final Uri _url = Uri.parse('https://flutter.dev');

void main() => runApp(
      const MaterialApp(
        home: Material(
          child: Center(
            child: ElevatedButton(
              onPressed: _launchUrl,
              child: Text('Show Flutter homepage'),
            ),
          ),
        ),
      ),
    );

Future<void> _launchUrl() async {
  if (!await launchUrl(_url)) {
    throw 'Could not launch $_url';
  }
}
```

ブラウザが開くようになりました。
![url_launcher](/tech/2023/01/15/flutter-url_launcher/flutter-url_launcher.gif "url_launcher") 

## 参考
* <a href="https://pub.dev/packages/url_launcher" target="_blank" rel="nofollow noopener">url_launcher | Flutter</a>
