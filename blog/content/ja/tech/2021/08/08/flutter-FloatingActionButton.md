---
title: "【Flutter】FloatingActionButton の位置を調整する"
date: 2021-08-08T09:00:00+09:00
description: "【Flutter】FloatingActionButton の位置を調整する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】FloatingActionButton の位置を調整する
Flutter の `FloatingActionButton` の位置を調整します。

## FloatingActionButton の位置
`margin` と `padding` で可能です。
（必要な方だけで構いません。
```dart {linenos=table,hl_lines=[1,2,3]}
    floatingActionButton: Container(
        margin: const EdgeInsets.only(bottom: 50),
        padding: const EdgeInsets.only(bottom: 50),
        child: FloatingActionButton(
            child: Icon(Icons.remove),
            onPressed: () => null,
        ),
    ), 
```

### EdgeInsets の設定
`EdgeInsets` には以下のようにすると複数の間隔を取ることが出来ます。
```dart {linenos=table,hl_lines=[2]}
    floatingActionButton: Container(
        margin: const EdgeInsets.only(top: 100, left:50),
        child: FloatingActionButton(
            child: Icon(Icons.remove),
            onPressed: () => null,
        ),
    ), 
```

`EdgeInsets` には以下の4つが設定可能です。
* top
* left
* right
* bottom

## 参考
* <a href="https://stackoverflow.com/questions/54172437/flutter-move-floatingactionbutton-up-50-pixels" target="_blank" rel="nofollow noopener">flutter move floatingActionButton up 50 pixels - Stack Overflow</a>
* <a href="https://ttydev.com/2020/11/11/flutter-edgeinsets/" target="_blank" rel="nofollow noopener">【Flutter】Containerのmarginの設定方法 – EdgeInsetsをざっくりまとめる | tty×Dev</a>
