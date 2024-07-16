---
title: "Bootstrap 5で作るレスポンシブ対応ヘッダーメニューバー"
date: 2024-07-16T12:50:00+09:00
description: "Bootstrap 5で簡単にレスポンシブ対応のヘッダーメニューバーを作成するメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- CSS
categories: 
- CSS
image: images/thumbnail/CSS3_logo_and_wordmark.svg
---

# Bootstrap 5で作るレスポンシブ対応ヘッダーメニューバー

Bootstrap 5で簡単にレスポンシブ対応のヘッダーメニューバーを作成するメモ

## サンプルコード

実現するためのサンプルコードです。

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <!-- ナビゲーションバーの開始 -->
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <!-- トグルボタン -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- ナビゲーションバー -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    <!-- BootstrapのJSを読み込み -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
```

## コード解説

- **Navbar構造**:
  - `navbar-expand-lg`クラスにより、画面幅が大きい場合は通常のナビゲーションバーとして機能します。
  - `navbar-toggler`ボタンがクリックされると、ナビゲーションバーが折りたたまれた状態から展開されます。
  - `collapse navbar-collapse`クラスにより、画面幅が広い場合はメニューが通常のナビゲーションバーとして表示されます。

## 参考

- <a href="https://getbootstrap.com/docs/5.2/components/navbar/" target="_blank" rel="nofollow noopener">Navbar Bootstrap 5</a>
