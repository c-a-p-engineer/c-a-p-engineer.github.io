# Gatsby Docker環境

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
docker exec -it hugo bash
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

ファイル出力
```
hugo && mv -fv ./public/ ../docs/
```

# Usage

http://localhost:1313


# Note
* [HUGO](https://gohugo.io/) 

## Hugo Themes
* [Github Style](https://themes.gohugo.io/github-style/)
* [Zzo](https://themes.gohugo.io/hugo-theme-zzo/)

# Author
* [こぴぺたん](https://twitter.com/c_a_p_engineer)

# License
[MIT license](https://en.wikipedia.org/wiki/MIT_License).
