---
title: "【Flutter】StatefulWidgetで引数を使用する方法"
date: 2022-12-16T01:00:00+09:00
description: "Flutter の StatefulWidget で引数を使用する方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】StatefulWidgetで引数を使用する方法
Flutter の StatefulWidget で引数を使用する方法メモ

## サンプル
widgetプロパティを利用して引数を取得する。

```dart:text.dart {linenos=table,hl_lines=[14]}
import 'package:flutter/material.dart';

class SampleText extends StatefulWidget {
  final String text;
  SampleText({this.text});

  @override
  _PageState createState() => _PageState();
}

class _SampleTextState extends State<SampleText> {
  @override
  Widget build(BuildContext context) {
    return Text(widget.text);
  }
}
```

## 参考
* <a href="https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html" target="_blank" rel="nofollow noopener">StatefulWidget class</a>
