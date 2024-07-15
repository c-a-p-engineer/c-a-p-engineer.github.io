---
title: "【Docker】SchemaSpy を使って自動的にER図を生成する"
date: 2022-03-31T02:30:00+09:00
LastMod: 2022-10-10T16:30:00+09:00
description: "Docker で SchemaSpy を使って自動的にER図を生成する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
- DB
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】SchemaSpy を使って自動的にER図を生成する
Docker で SchemaSpy を使って自動的にER図を生成する。

{{< notice warning >}}
**注意**
※2022/10/10追記
この記事の内容が動作しなくなっています。
<a href="/tech/2022/10/10/docker-schemaspy/" target="_blank" rel="nofollow noopener">【Docker】SchemaSpy を使って自動的にER図を生成する（2022/10/10 改良版</a> を見てください。
{{< /notice >}}

## docker-compose
```yml:docker-compose.yml
version: '3'

services: 
    mysql:
      container_name: mysql
      image: mysql:5.7
      command:
        - --sql-mode=NO_ENGINE_SUBSTITUTION
      volumes:
        - ./.data/mysql:/var/lib/mysql
        - ./.docker/mysql/init:/docker-entrypoint-initdb.d
      ports:
        - "3306:3306"
      environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: database
        MYSQL_USER: develop
        MYSQL_PASSWORD: p@ssw0rd
        TZ: 'Asia/Tokyo'

    schemaspy:
      container_name: schemaspy
      image: schemaspy/schemaspy:6.1.0
      volumes:
        - ./schemaspy/output:/output
        - ./schemaspy/meta:/meta
      depends_on:
        - mysql
      command: >
        java -jar schemaspy.jar
        -t mysql
        -dp /drivers
        -host mysql
        -port 3306
        -db database
        -u develop
        -p p@ssw0rd
        -s database
        -meta /meta/schemameta.xml
        -connprops useSSL\\=false
```

### SchemaSpy の起動オプション
* `-t` : データベース種別
* `-dp` : ドライバーパス
* `-host` : DBホスト
* `-port` : ポート番号
* `-db` : DB名
* `-u` : ユーザ名
* `-p` : パスワード
* `-s` : スキーマ名
* `-meta` : 手動でリレーションなどを連携するためのメタファイル（なければ不要

## 実行
Dockerを起動。
```
docker-compose up -d --build
```

起動後にSchemaSpyがDBに接続してDBの解析結果を `schemaspy/output` にアウトプット結果をHTMLで出力してくれます。

SchemaSpy のコンテナは解析が終わると終了するようになっています。
そのため、必要に応じて個別に起動する場合は以下のコマンドを実行すると再出力してくれます。
```
docker-compose up -d --build schemaspy
```

## 参考
* <a href="https://schemaspy.readthedocs.io/en/latest/index.html" target="_blank" rel="nofollow noopener">SchemaSpy</a>
* <a href="https://github.com/schemaspy/schemaspy" target="_blank" rel="nofollow noopener">schemaspy/schemaspy: SchemaSpy code home</a>
