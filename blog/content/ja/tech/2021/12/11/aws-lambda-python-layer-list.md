---
title: "【AWS Lambda Python】Python外部ライブラリのLayer一覧"
date: 2021-12-11T02:00:00+09:00
description: "AWS LambdaではPythonのライブラリによってはにLayerにする必要があります。Layerを作成するのも手間なので、すでに存在するLayerを使用しましょう。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
- AWS Lambda
- Python
categories: 
- AWS Lambda
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS Lambda Python】Python外部ライブラリのLayer一覧
AWS LambdaではPythonのライブラリによってはにLayerにする必要があります。
Layerを作成するのも手間なので、すでに存在するLayerを使用しましょう。

## Layer
Layerの情報こちらのGitHubにあります。
<a href="https://github.com/keithrozario/Klayers" target="_blank" rel="nofollow noopener">keithrozario/Klayers: Python Packages as AWS Lambda Layers</a>

### 使用したいLayerを探す方法
1. deployments
2. python バージョン
3. arns
4. リージョン
5. 使用したいパッケージ情報のArnを参照

### 使用可能なLayer
2021/12/11 現在使用可能なLayer一覧
* Cerberus
* aiobotocore
* aiohttp
* ansible
* arrow
* asyncio
* aws-lambda-powertools
* aws-psycopg2
* aws-requests-auth
* aws-xray-sdk
* bcrypt
* beautifulsoup4
* black
* boltons
* boto3
* chevron
* cloudsplaining
* construct
* crhelper
* cryptography
* datadog
* dropbox
* dynamodb-encryption-sdk
* elasticsearch
* envelopes
* exchangelib
* ffmpeg-python
* flashtext
* geopy
* google-auth
* google-auth-oauthlib
* graphene
* grpcio
* gspread
* idna
* itsdangerous
* jellyfish
* jinja2
* jsonschema
* kafka-python
* lambda-cache
* lambda-decorators
* langdetect
* ldap3
* libgthread-so
* loguru
* lxml
* matplotlib
* mpld3
* nltk
* numpy
* opencv-python-headless
* openpyxl
* opensearch-py
* pandas
* paramiko
* parliament
* passlib
* pika
* Pillow
* praw
* pulp
* pyarrow
* pycryptodome
* pydantic
* PyJWT
* pymongo
* PyMUPDF
* PyMySQL
* PyNaCl
* pyOpenSSL
* pyparsing
* pyqldb
* pysftp
* pytesseract
* python-docx
* python-Levenshtein-wheels
* pytz
* PyYAML
* rdklib
* records
* redshift-connector
* reportlab
* requests
* requests-html
* scipy
* shapely
* simplejson
* slackclient
* spacy
* spacy_model_en_small
* spacy_model_es_small
* SQLAlchemy
* tablib
* textdistance
* tinydb
* tldextract
* translate
* tweepy
* twilio
* xarray

## 参考
* <a href="https://github.com/keithrozario/Klayers" target="_blank" rel="nofollow noopener">keithrozario/Klayers: Python Packages as AWS Lambda Layers</a>
