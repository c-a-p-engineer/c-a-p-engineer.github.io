---
title: "【Flutter】画像を表示する"
date: 2022-12-21T01:00:00+09:00
description: "Flutter で画像を表示する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】画像を表示する
Flutter で画像を表示する方法

## 画像を配置する

`images` フォルダをプロジェクト直下に作成します。
表示したい画像をその中に入れます。

## 設定ファイルを編集
`pubspec.yaml` ファイルを編集します。
```yaml:pubspec.yaml {linenos=table,hl_lines=[5,7]}
flutter:

  assets:
    # 画像を指定する場合
    - images/sample.jpg
    # ファルダを指定する場合
    - images/
```

## 実行コード
`Image.asset('images/sample.jpg')` を使用して画像を読み込みます。

```dart:/lib/main.dart {linenos=table,hl_lines=[29]}
import 'package:flutter/material.dart';

const Color darkBlue = Color.fromARGB(255, 18, 32, 47);

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: darkBlue,
      ),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: MyWidget(),
        ),
      ),
    );
  }
}

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Image.asset('images/sample.jpg');
  }
}
```

## 参考
* <a href="https://docs.flutter.dev/development/ui/assets-and-images" target="_blank" rel="nofollow noopener">Adding assets and images | Flutter</a>
