---
title: "【Flutter】簡単にアニメーションを実現するサンプル"
date: 2023-01-07T01:30:00+09:00
description: "Flutter で簡単にアニメーションを実現するサンプル"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# 【Flutter】簡単にアニメーションを実現するサンプル
Flutter で簡単にアニメーションを実現するサンプル。
今回は公式ドキュメントから動画やサンプルコードがあり簡単に実装ができるものをまとめたものになります。

## 環境
* Flutter 3.3.10

## 大きさを変化させる ScaleTransition
* <a href="https://api.flutter.dev/flutter/widgets/ScaleTransition-class.html" target="_blank" rel="nofollow noopener">ScaleTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/scale_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.ScaleTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.ScaleTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## 表示サイズを変化させる SizeTransition
* <a href="https://api.flutter.dev/flutter/widgets/SizeTransition-class.html" target="_blank" rel="nofollow noopener">SizeTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/size_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.SizeTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.SizeTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## 透過率を変化させる FadeTransition
* <a href="https://api.flutter.dev/flutter/widgets/FadeTransition-class.html" target="_blank" rel="nofollow noopener">FadeTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/fade_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.FadeTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.FadeTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## スクロールリストの透過率を変化させる SliverFadeTransition
* <a href="https://api.flutter.dev/flutter/widgets/SliverFadeTransition-class.html" target="_blank" rel="nofollow noopener">SliverFadeTransition class - widgets library - Dart API</a>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.SliverFadeTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.SliverFadeTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## くるくる回る RotationTransition
* <a href="https://api.flutter.dev/flutter/widgets/RotationTransition-class.html" target="_blank" rel="nofollow noopener">RotationTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/rotation_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.RotationTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.RotationTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## スライドする SlideTransition
* <a href="https://api.flutter.dev/flutter/widgets/SlideTransition-class.html" target="_blank" rel="nofollow noopener">SlideTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/slide_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.SlideTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.SlideTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## 位置座標を変更する AnimatedPositioned
* <a href="https://api.flutter.dev/flutter/widgets/AnimatedPositioned-class.html" target="_blank" rel="nofollow noopener">AnimatedPositioned class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/animated_positioned.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.AnimatedPositioned.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.AnimatedPositioned.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}


## 余白を変化させる AnimatedPadding
* <a href="https://api.flutter.dev/flutter/widgets/AnimatedPadding-class.html" target="_blank" rel="nofollow noopener">AnimatedPadding class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/animated_padding.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.AnimatedPadding.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.AnimatedPadding.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## 位置を変化させる AlignTransition
* <a href="https://api.flutter.dev/flutter/widgets/AlignTransition-class.html" target="_blank" rel="nofollow noopener">AlignTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/align_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.AlignTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.AlignTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## 特定の位置に変化させる PositionedTransition
※`RelativePositionedTransition` と似ています。
* <a href="https://api.flutter.dev/flutter/widgets/PositionedTransition-class.html" target="_blank" rel="nofollow noopener">PositionedTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/positioned_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.PositionedTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.PositionedTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## 特定の位置に変化させる RelativePositionedTransition
※`RelativePositionedTransition` と似ています。
* <a href="https://api.flutter.dev/flutter/widgets/RelativePositionedTransition-class.html" target="_blank" rel="nofollow noopener">RelativePositionedTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/relative_positioned_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.RelativePositionedTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.RelativePositionedTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## テキストのスタイルを変化させる DefaultTextStyleTransition
* <a href="https://api.flutter.dev/flutter/widgets/DefaultTextStyleTransition-class.html" target="_blank" rel="nofollow noopener">DefaultTextStyleTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/animated_default_text_style.mp4" type="video/mp4">
</video>
※動画は <a href="https://api.flutter.dev/flutter/widgets/AnimatedDefaultTextStyle-class.html" target="_blank" rel="nofollow noopener">AnimatedDefaultTextStyle class</a> のものを使用していますが動作は同じです。

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.DefaultTextStyleTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.DefaultTextStyleTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}

## DecoratedBoxを変化させる DecoratedBoxTransition
* <a href="https://api.flutter.dev/flutter/widgets/DecoratedBoxTransition-class.html" target="_blank" rel="nofollow noopener">DecoratedBoxTransition class - widgets library - Dart API</a>

<video style="width:300px; height:378px;" autoplay loop>
<source src="https://flutter.github.io/assets-for-api-docs/assets/widgets/decorated_box_transition.mp4" type="video/mp4">
</video>

{{< expand "サンプルコード" >}}
<a href="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.DecoratedBoxTransition.1&sample_channel=stable&channel=stable" target="_blank" rel="nofollow noopener">DartPad</a>
<iframe style="display:block;width:100%;height:500px;" src="https://dartpad.dev/embed-flutter.html?split=60&run=true&null_safety=true&sample_id=widgets.DecoratedBoxTransition.1&sample_channel=stable&channel=stable">
</iframe>
{{< /expand >}}
