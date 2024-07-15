# Hugo Docker環境

# Requirement
* [docker](https://www.docker.com/)
* [Hugo](https://gohugo.io/)

# Install
Docker起動
```
docker-compose up -d --build
```

コンテナに入る
```
docker exec -it blog-hugo bash
```

ブログを作る
```
hugo new site <ブログ名>
```

起動
```
cd <ブログ名>
hugo server
```

ファイル出力
```
hugo
```

ファイル出力（圧縮）
```
hugo --minify
```

ファイル出力（削除 & 出力 & フォルダ移動）
```
rm -rf ../docs;hugo --minify && mv -fv ./public/ ../docs/
```

ブログ確認
```
docker exec -it blog-hugo hugo server
```

トピック生成（現在は生成を中止
```
docker exec -it blog-php php topic.php
```

# Usage
http://localhost:1313

## Use Sample Mermaid
blog\content\ja\tech\2022\03\06\git-rebase-brunch.md

## Shortcodes Sample
blog\themes\zzo\exampleSite\content\en\posts\shortcodes.md

# Note
* [HUGO](https://gohugo.io/) 
* [Zzo – Z Themes Documentation](https://gohugo.io/content-management/syntax-highlighting/)
* [Syntax Highlighting | Hugo](https://zzo-docs.vercel.app/zzo)

## Hugo Themes
* [GitHub Style](https://themes.gohugo.io/github-style/)
* [Zzo](https://themes.gohugo.io/hugo-theme-zzo/)

# Author
* [こぴぺたん](https://twitter.com/c_a_p_engineer)

# License
[MIT license](https://en.wikipedia.org/wiki/MIT_License).
