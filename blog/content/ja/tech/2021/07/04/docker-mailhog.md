---
title: "【Docker】MailHog を利用してメールテスト環境を作る"
date: 2021-07-04T10:00:00+09:00
description: "メールの送信テストを行う際にメールアドレスなどの用意が面倒だったため、MailHog を利用してメールテスト環境を作りました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
- Mail
categories: 
- Docker
image: images/thumbnail/docker.png
---

# MailHog を利用してメールテスト環境を作る
メールの送信テストを行う際にメールアドレスなどの用意が面倒だったため、MailHog を利用してメールテスト環境を作りました。

## MailHog
MailHog 
* <a href="https://github.com/mailhog/MailHog" target="_blank" rel="nofollow noopener">mailhog/MailHog: Web and API based SMTP testing</a>

## Docker に MailHog 導入
`docker-compose.yml` に以下を追加
``` docker-compose.yml
  mailhog:
    container_name: mailhog
    image: mailhog/mailhog:latest
    ports:
      - "8025:8025"
      - "1025:1025"
```

### PHP Dockerfile
PHP を利用してメール送信をするため PHP の `Dockerfile` に以下を追加
``` Dockerfile
# mailhog対応
RUN curl -sSLO https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64 \
    && chmod +x mhsendmail_linux_amd64 \
    && mv mhsendmail_linux_amd64 /usr/local/bin/mhsendmail
    && echo 'sendmail_path = "/usr/local/bin/mhsendmail --smtp-addr=mailhog:1025"' > /usr/local/etc/php/conf.d/sendmail.ini
```

`--smtp-addr=mailhog:1025` の箇所は `--smtp-addr=サービス名:SMTPポート番号` になります。

### メール送信
実際にメールを送信してみます。
``` php
php -r "mail('test@example.com', 'テストタイトル', 'テスト本文', 'From: from@example.com');";
```

### メール確認
MailHog の確認画面で送信の確認が出来ます。
<a href="http://localhost:8025/" target="_blank" rel="nofollow noopener">http://localhost:8025/</a>

一覧画面でメールが届いている事を確認
![mailhog-list.png](/assets/blog/tech/2021/07/04/docker-mailhog/mailhog-list.png "mailhog-list.png") 

詳細画面で本文を確認
![mailhog-detail.png](/assets/blog/tech/2021/07/04/docker-mailhog/mailhog-list.png "mailhog-detail.png") 

これでメールのテストが出来ます。