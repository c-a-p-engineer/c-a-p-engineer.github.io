---
title: "【Docker】SchemaSpy（スキームスパイ） を使って自動的にER図を生成する（2022/10/10 改良版"
date: 2022-10-10T16:30:00+09:00
description: "Docker で SchemaSpy（スキームスパイ） を使って自動的にER図を生成する（2022/10/10 改良版"
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

# 【Docker】SchemaSpy（スキームスパイ） を使って自動的にER図を生成する（改良版
Docker で SchemaSpy（スキームスパイ） を使って自動的にER図を生成する。（改良版
以前書いた記事（<a href="tech/2022/03/31/docker-schemaspy/" target="_blank" rel="nofollow noopener">【Docker】SchemaSpy を使って自動的にER図を生成する</a>）がSchemaSpyのアップデートのためか動作がおかしくなったため改良版を書きました。

## SchemaSpy を使ってみる
SchemaSpyを使ってみます。

### ファイル構成
以下のようにファイルを構成してください。

```
├─.docker
│   └schemaspy
│      └schemaspy.properties
└─docker-compose.yml
```

### schemaspy.properties

```yml:.docker/schemaspy/schemaspy.properties
# DB type
schemaspy.t=mysql
schemaspy.dp=/drivers
schemaspy.host=mysql
schemaspy.port=3306
schemaspy.db=test
schemaspy.s=test
schemaspy.u=develop
schemaspy.p=p@ssw0rd
```

プロパティ説明
* `schemaspy.t` : データベース種別
* `schemaspy.dp` : ドライバーパス
* `schemaspy.host` : DBホスト
* `schemaspy.port` : ポート番号
* `schemaspy.db` : DB名
* `schemaspy.s` : スキーマ名
* `schemaspy.u` : ユーザ名
* `schemaspy.p` : パスワード

### docker-compose
```yml:docker-compose.yml
version: '3'

services: 
    mysql:
      container_name: mysql
      image: mysql:8.0
      command:
        - --sql-mode=NO_ENGINE_SUBSTITUTION
      volumes:
        - ./.data/mysql:/var/lib/mysql
        - ./.docker/mysql/init:/docker-entrypoint-initdb.d
      ports:
        - "3306:3306"
      environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: test
        MYSQL_USER: develop
        MYSQL_PASSWORD: p@ssw0rd
        TZ: 'Asia/Tokyo'

    schemaspy:
      container_name: schemaspy
      image: schemaspy/schemaspy:snapshot
      volumes:
        - ./.docker/schemaspy/schemaspy.properties:/schemaspy.properties # SchemaSpy Properties File
        - ./schemaspy/output:/output # SchemaSpy Output dir
      depends_on:
        - mysql
      environment:
        SCHEMASPY_OUTPUT: /output # SchemaSpy Output dir
```

## 実行
1. まずはMysqlを起動します。
```
docker-compose up -d --build mysql
```

2. テーブルを作成（SQLはMysql公式サンプル world_x_database を使用<a href="https://dev.mysql.com/doc/index-other.html" target="_blank" rel="nofollow noopener">MySQL :: Other MySQL Documentation</a>

```sql
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` char(35) NOT NULL DEFAULT '',
  `CountryCode` char(3) NOT NULL DEFAULT '',
  `District` char(20) NOT NULL DEFAULT '',
  `Info` json DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `Code` char(3) NOT NULL DEFAULT '',
  `Name` char(52) NOT NULL DEFAULT '',
  `Capital` int DEFAULT NULL,
  `Code2` char(2) NOT NULL DEFAULT '',
  PRIMARY KEY (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `countryinfo`;
CREATE TABLE `countryinfo` (
  `doc` json DEFAULT NULL,
  `_id` varbinary(32) GENERATED ALWAYS AS (json_unquote(json_extract(`doc`,_utf8mb4'$._id'))) STORED NOT NULL,
  `_json_schema` json GENERATED ALWAYS AS (_utf8mb4'{"type":"object"}') VIRTUAL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `countrylanguage`;
CREATE TABLE `countrylanguage` (
  `CountryCode` char(3) NOT NULL DEFAULT '',
  `Language` char(30) NOT NULL DEFAULT '',
  `IsOfficial` enum('T','F') NOT NULL DEFAULT 'F',
  `Percentage` decimal(4,1) NOT NULL DEFAULT '0.0',
  PRIMARY KEY (`CountryCode`,`Language`),
  KEY `CountryCode` (`CountryCode`),
  CONSTRAINT `countrylanguage_ibfk_1` FOREIGN KEY (`CountryCode`) REFERENCES `country` (`Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

3. SchemaSpyを実行
```
docker-compose up -d --build schemaspy
```
`schemaspy/output` のディレクトリにファイルが出力されたら成功です。
出力されたHTMLを見るとテーブル情報を確認ができます。

![schemaspy_001](/tech/2022/10/10/docker-schemaspy/schemaspy_001.png "schemaspy_001")

またER図を出力してくれるのでリレーションの確認もできます。
![schemaspy_002](/tech/2022/10/10/docker-schemaspy/schemaspy_002.png "schemaspy_002")

## 参考
* <a href="https://hub.docker.com/r/schemaspy/schemaspy/" target="_blank" rel="nofollow noopener">schemaspy/schemaspy - Docker Image | Docker Hub</a>
