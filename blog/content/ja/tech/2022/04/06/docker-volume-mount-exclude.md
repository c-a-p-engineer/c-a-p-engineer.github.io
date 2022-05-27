---
title: "【Docker】volume をマウントする時に特定の一部ディレクトリを除外する"
date: 2022-04-06T07:30:00+09:00
description: "Docker+PHP 環境が遅かったので vendor フォルダを同期しないように volume をマウントする時に特定の一部ディレクトリを除外して対応したメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】volume をマウントする時に一部ディレクトリを除外する
Docker+PHP 環境が遅かったので `vendor` フォルダを同期しないように volume をマウントする時に一部ディレクトリを除外して対応したメモ。

この対応で速度が2倍ほどになりました。
`vendor` 内のファイル数が多いほど効果は高そうです。

## Dokcer PHP の環境が遅い原因
Dockerはホストとコンテナ間でファイル同期の処理が行われるため、同期対象のファイルが多ければ多いほど遅くなる。

## 対処方法
対象方法は大量にファイルが置かれている `vendor` を同期しないように致しました。

### ボリュームを使用する
ホストのからマウントをしないで `volume` を使う。

```yml:docker-compose.yml
version: '3'

services:
  php:
    image: php:8.1-apache
    volumes:
      - ./src:/var/www/html
      # volume mount
      - vendor-valume:/var/www/html/vendor # vendorをvolumeにマウント
    ports:
      - 80:80

# volumes
volumes:
  vendor-valume: # vendor用のvolume
```

### 特定ディレクトリをマウントしない
共有するソースのうち一部を共有しないように設定する。

```yml:docker-compose.yml
version: '3'

services:
  php:
    image: php:8.1-apache
    volumes:
      - ./src:/var/www/html
      # exclude directory
      - /var/www/html/vendor # 除外するディレクトリ
    ports:
      - 80:80

# volumes
volumes:
  vendor-valume: # vendor用のvolume
```

## 参考
<a href="https://kray.jp/blog/dont-have-to-use-react-fc-and-react-vfc/" target="_blank" rel="nofollow noopener">【検証】React.FC と React.VFC はべつに使わなくていい説 &#8211; KRAY Inc</a>
