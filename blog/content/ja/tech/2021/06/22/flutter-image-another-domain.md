---
title: "【Flutter】Flutter web can't load network image from another domain エラーで画像が取得できない場合の対処"
date: 2021-06-22T03:00:00+09:00
description: "Flutter で画像取得を行う際に「Flutter web can't load network image from another domain」が出た時の対処"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# Flutter web can't load network image from another domain エラーで画像が取得できない場合の対処
Flutter で以下のようにして画像を取得しようとした際に別ドメインのためにエラーが発生したので対処しました。

## 失敗コード
`Image.network` を使用するとエラーが発生します。

``` java:main.dart
class MyImage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    String imageUrl = "image_url";
    return Image.network(imageUrl),
  }
}
```

## 対応方法
画像を取得してHTMLを生成するようにして対処を行います。
``` java:main.dart
import 'dart:html';
import 'package:flutter/material.dart';
import 'dart:ui' as ui;

class MyImage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    String imageUrl = "image_url";
    ui.platformViewRegistry.registerViewFactory(
      imageUrl,
      (int _) => ImageElement()..src = imageUrl,
    );
    return HtmlElementView(
      viewType: imageUrl,
    );
  }
}
```

## 参考
* <a href="https://stackoverflow.com/questions/65653801/flutter-web-cant-load-network-image-from-another-domain" target="_blank" rel="nofollow noopener">Flutter web can't load network image from another domain - Stack Overflow</a>