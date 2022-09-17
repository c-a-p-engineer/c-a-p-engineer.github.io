---
title: "【Flutter】Flutter の開発環境を Docker で作ってみた"
date: 2021-06-14T03:00:00+09:00
description: "Flutter を触ってみたくて Flutter の開発環境を Docker で作ってみました"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Flutter
- Docker
categories: 
- Flutter
image: images/thumbnail/Flutter-logo-animation-v1-2.gif
---

# Flutter の開発環境を Docker で作ってみた
Flutter を触ってみたくて Flutter の開発環境を Docker で作ってみました。

## Docker
作った Docker は以下のリポジトリに入れています。
<a href="https://github.com/c-a-p-engineer/docker-flutter" target="_blank" rel="nofollow noopener">c-a-p-engineer/docker-flutter</a>

使用したDocker Image
* <a href="https://hub.docker.com/r/dorowu/ubuntu-desktop-lxde-vnc/" target="_blank" rel="nofollow noopener">dorowu/ubuntu-desktop-lxde-vnc | Docker Hub</a>
大本の Docker Image は以前、以下の記事で紹介したものです。
<a href="/blog/2021-04-11-docker-ubuntu-remote-desktop/" target="_blank" rel="nofollow noopener">【Docker】Ubuntuでリモートデスクトップ</a>

## 使用方法
`README.md` に記載していますが、以下のコマンドだけで開発完了を作れます。

```
docker-compose up -d --build
```

## サンプルまで作る
Docker 内に入る。
```
docker exec -it flutter bash
```

もしくは以下のURLに接続して作業します。（ターミナルを開いてください）
* <a href="http://127.0.0.1:6080/" target="_blank" rel="nofollow noopener">http://127.0.0.1:6080/</a>

1. 作業ディレクトリ
```
cd /src
````

2.サンプル作成
flutter サンプルを作成
```
flutter create .
```

3.サンプル起動
port:55555 でサーバー起動
```
flutter run -d web-server --web-port 55555 --web-hostname 0.0.0.0
```

<a href="http://localhost:5555 " target="_blank" rel="nofollow noopener">http://localhost:5555</a> で確認

4.build
```
flutter build web
```

ビルドしたファイルはアップする事で実際にWebにアップすることで使用することが出来ます。
<a href="/samples/flutter-docker/" target="_blank" rel="nofollow noopener">Flutter Demo</a>

## Andoroid用の設定
Androidの設定
以下の設定を有効にするとAndoroid Studioをインストールします。
`.env.example` → `.env`
`INSTALL_ANDROID=true`

2.Andoroid Studioの起動
Docker build後にDocker内（http://127.0.0.1:6080/）で実行して Andoroid Studio を設定してください。
`/opt/android-studio/bin/studio.sh`

3.Andoroid Studioの設定
起動後
ダイアログの右下のConfigure > Android SDK > タブのSDK Toolsを選択 > Android ADK Command-line Tools をチェック > OK

※初期起動のダイアログでやり忘れたら以下の手順で実行
Andoroid Studio 起動中
ツールバー Tools > SDK Toolsを選択 > Android ADK Command-line Tools をチェック > OK

3.SDKの設定
```
flutter config --android-sdk /root/Android/Sdk
```

`/root/Andorid/Sdk` を適宜変えてください。

4.Androidの設定
```
flutter doctor --android-licenses
```

全て `y` でOKです。

5.インストールの確認
```
flutter doctor
```

以下の画像のようになったら Andoroid の開発環境も整います。
![desktop.png](/assets/blog/tech/2021/06/14/flutter-docker/desktop.png "flutter-doctor-android.png") 

※ただし、Andoroid Studio のエミュレータは現在Docker上では動かないようなのでご注意してください。（Andoroid エミュレータはVM上では動かない模様）