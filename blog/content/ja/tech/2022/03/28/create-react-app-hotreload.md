---
title: "create-react-app で hotreload させる"
date: 2022-03-28T01:30:00+09:00
description: "docker環境で create-react-app で作った環境で hotreload が効かなかったのでその対処方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- React
categories: 
- React
image: images/thumbnail/React_Logo.svg
---

# create-react-app で hotreload させる
docker環境で `create-react-app` で作った環境上で hotreload が効かなかったのでその対処方法。
`create-react-app` のバージョンは `5.0.0` です。

## 原因
原因はホットリロードに必要なソースの変更の監視と適用が出来なかったためです。

### 変更の監視設定
仮想環境では明示的に `CHOKIDAR_USEPOLLING=true` と環境変数を設定しなければ行けないようです。
<a href="https://create-react-app.dev/docs/troubleshooting/#npm-start-doesnt-detect-changes" target="_blank" rel="nofollow noopener">Troubleshooting | Create React App</a>

`.env` に追加すれば解決。

原因はコンテナ上の変更を監視していなかったためのようで設定することによって監視をしてくれるようになるようです。

### 変更の適用
`CHOKIDAR_USEPOLLING=true` によってソースファイルのができるようになりましたが、ソースを変更するとブラウザ上のコンソールで以下のようなエラーが発生しました。

```
WebSocket connection to 'ws://localhost:3000/ws' failed:
```

これはソースの変更をWebsocketを使用して再コンパイルを受け取っているのが原因のようです。

環境変数に `WDS_SOCKET_PORT=0` を設定することWebSocketの無効化ができます。
`.env` に追加すれば解決。

これによって修正されたコードを適用してリアルタイムに画面が変更されるようになります。

## 参考
<a href="https://create-react-app.dev/docs/troubleshooting/#npm-start-doesnt-detect-changes" target="_blank" rel="nofollow noopener">Troubleshooting | Create React App</a>
