---
title: "【PHP】共有メモリの活用: キャッシュクラスの作成"
date: 2023-06-10T02:30:00+09:00
description: "PHP で共有メモリの活用方法としてキャッシュクラスの作成を作成してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】共有メモリの活用: キャッシュクラスの作成
PHPでは、共有メモリというメモリの一部を複数のプロセスが共有する機能を利用ができます。
これを利用することで、プロセス間でデータをやり取りしたり、一時的なデータを保存したりすることが可能です。
今回は、この共有メモリを用いてキャッシュの役割を果たすクラスを作成してみました。

## 注意事項
先に言っておきますが、PHPの場合メモリをローカルメモリに入れる意味はほぼないです。
これは複数台構成などになった場合、各サーバーに別々にキャッシュされるためです。
普通に `Memcached` や `Redis` などを使用しましょう。

またキャッシュを永続化してしまった場合、PHPが再起動するまで開放されなくなるのでメモリをずっと確保され続けることになります。
そのためメモリ管理がうまくできないと**大変なことになります**のでご注意ください。

## 環境
PHP8

### 環境構築
面倒なことにメモリを触る `Shmop` は通常を使用することができません。
そのため環境にインストールする必要があります。

僕はDocker環境だったので以下をDockerfileに追記するだけですみました。
```Dockerfile
# Install shmop
RUN docker-php-ext-install shmop
```

## キャッシュクラスのサンプルコード
実際のメモリキャッシュするサンプルコードになります。

```php
<?php

/**
 * 共有メモリを使用したキャッシュクラス
 */
class Cache
{
    /**
     * @var Shmop 共有メモリのID
     */
    private $shm_id;

    /**
     * @var bool 共有メモリの永続性フラグ
     */
    private $is_persistent;

    /**
     * @var bool 共有メモリの永続性フラグ ON
     */
    const PERSISTENT_ON = true;

    /**
     * @var bool 共有メモリの永続性フラグ OFF
     */
    const PERSISTENT_OFF = false;

    /**
     * コンストラクタ
     *
     * @param string $key 共有メモリのキー
     * @param bool $is_persistent 共有メモリの永続性フラグ
     * @param int $max_size 共有メモリの最大サイズ
     */
    public function __construct(string $key, bool $is_persistent = self::PERSISTENT_OFF, int $max_size = 1000)
    {
        $key = ftok(__FILE__, $key);
        $this->shm_id = shmop_open($key, "c", 0644, $max_size);
        $this->is_persistent = $is_persistent;

        if (!$this->shm_id) {
            throw new Exception('Unable to create the shared memory segment.');
        }
    }

    /**
     * 共有メモリにデータと有効期限を書き込む
     *
     * @param mixed $data 書き込むデータ
     * @param int|null $expiry 有効期限（秒数） nullの場合は有効期限なし
     * @throws Exception
     */
    public function put($data, int $expiry = null): void
    {
        $expiryTimestamp = $expiry ? time() + $expiry : null;
        $dataWithExpiry = serialize(['data' => $data, 'expiry' => $expiryTimestamp]);

        if (shmop_write($this->shm_id, $dataWithExpiry, 0) != strlen($dataWithExpiry)) {
            throw new Exception('Was not able to write all of the data into shared memory.');
        }
    }

    /**
     * 共有メモリからデータを取得する
     *
     * @return mixed|null 有効期限内のデータと有効期限の日時秒、データがない場合はnull
     */
    public function get()
    {
        $size = shmop_size($this->shm_id);
        $dataWithExpiry = @unserialize(shmop_read($this->shm_id, 0, $size));

        if ($dataWithExpiry && $dataWithExpiry['expiry'] !== null && $dataWithExpiry['expiry'] < time()) {
            return null;
        }

        return $dataWithExpiry['data'] ?? null;
    }

    /**
     * 共有メモリを削除する
     */
    public function delete(): void
    {
        shmop_delete($this->shm_id);
    }

    /**
     * デストラクタ
     */
    public function __destruct()
    {
        if (!$this->is_persistent) {
            $this->delete();
        }
    }
}

// キャッシュクラスの使用例
$cache = new Cache('a', Cache::PERSISTENT_ON);
$cache->put("Hello, World!", 60);
var_dump($cache->get());

// 他の場所での使用例
$cache2 = new Cache('b', Cache::PERSISTENT_OFF);
var_dump($cache2->get());

```

## 参考
* <a href="https://www.php.net/manual/ja/function.ftok.php" target="_blank" rel="nofollow noopener">ftok</a>: この関数は、ファイルのパス名とプロジェクトIDからシステムIDを生成します。このIDは共有メモリセグメントの生成や、セマフォの作成などに使用されます。
* <a href="https://www.php.net/manual/ja/function.shmop-open.php" target="_blank" rel="nofollow noopener">shmop_open</a>: この関数は、共有メモリセグメントを作成または開きます。既に存在するセグメントを開くには、`ftok`で生成したシステムIDと同じIDを指定します。
* <a href="https://www.php.net/manual/ja/function.shmop-write.php" target="_blank" rel="nofollow noopener">shmop_write</a>: この関数は、共有メモリセグメントにデータを書き込みます。
* <a href="https://www.php.net/manual/ja/function.shmop-read.php" target="_blank" rel="nofollow noopener">shmop_read</a>: この関数は、共有メモリセグメントからデータを読み込みます。
* <a href="https://www.php.net/manual/ja/function.shmop-size.php" target="_blank" rel="nofollow noopener">shmop_size</a>: この関数は、共有メモリセグメントのサイズを取得します。
* <a href="https://www.php.net/manual/ja/function.shmop-delete.php" target="_blank" rel="nofollow noopener">shmop_delete</a>: この関数は、共有メモリセグメントを削除します。
* <a href="https://www.php.net/manual/ja/function.serialize.php" target="_blank" rel="nofollow noopener">serialize</a>: この関数は、PHPの値を保存や送信可能な文字列の表現に変換します。
* <a href="https://www.php.net/manual/ja/function.unserialize.php" target="_blank" rel="nofollow noopener">unserialize</a>: この関数は、`serialize`で生成された文字列表現からPHPの値を再構築します。
