---
title: "【Flutter】Flutter Web に 広告（Google Adsense） を入れてみた。"
date: 2021-08-09T17:00:00+09:00
description: "Flutter Webに広告を入れる際にアプリ用のAdMob広告とは別にする必要があり、Google AdSenseの対応してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】Flutter Web に 広告（Google Adsense） を入れてみた。
Flutter Webに広告を入れる際にアプリ用のAdMob広告とは別にする必要があり、Google AdSenseの対応してみました。

## サンプルコード
HTML側とDart側で対応が必要になります。

### HTML
まずはHTML側の対応です。
``` html:web/index.html
<!-- body内に挿入 -->
  <style type="text/css">
    footer{
        width: 100%;
        height: 100px; /* 広告の高さに合わせる */
        background-color: #eeeeee;
        text-align: center;
        padding: 0;

        position: absolute;
        bottom: 0;
        z-index: 100;
    }
  </style>
  <footer id="footer">
    <!-- Google AdSenseタグ -->
  </footer>
```

### Dart
アプリの下部にWebの場合は広告用の枠を取るようにします。
``` dart:lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

// 広告の高さに合わせる
double adHeight = 100;

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();

    // Web判定
    if (kIsWeb) {
      adHeight = 100;
    } else {
      adHeight = 0;
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hello, World',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text("SAMPLE"),
        ),
        body: Center(
            child: Column(
          children: [
            Expanded(flex: 1, child: Text("hello")),
            // 広告の枠
            Container(height: adHeight, color: Colors.red),
          ],
        ),
      ),
    ),
  );
  }
}
```

## 参考
* <a href="https://qiita.com/funeasy-soft/items/2ea0dfc24e160e201d6d" target="_blank" rel="nofollow noopener">flutter web に広告を入れたい - Qiita</a>
