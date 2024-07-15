---
title: "【Laravel】バリデーションに無名関数を使用してバリデーションを行う"
date: 2022-12-08T01:20:00+09:00
description: "Laravel でバリデーションに無名関数を使用してバリデーションを行う方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# 【Laravel】バリデーションに無名関数を使用してバリデーションを行う
Laravel でバリデーションに無名関数を使用してバリデーションを行う方法メモ
特殊なバリデーションでそこでしか使用しない、わざわざ独自ルールを作るのも手間などの時に使用する方法です。

## サンプル
サンプルとして `title` と `body` の値が同一ならエラーが出るようなものを書きました。
Laravelのドキュメントから改変したもののためControllerで記載するような形になっていますがFormRequestのruleでも同じような書き方は可能です。
```php {linenos=table,hl_lines=["13-21"]}
/**
 * 新ブログポストの保存
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => [
            'required',
            // $attribute 属性
            // $value 値
            // $fail 失敗処理
            function($attribute, $value, $fail) use($request) {
                // title と body の値が同じならエラーとする
                if($request->input('title') == $value){
                    $fail('Error!!' . $attribute);
                }
            }
        ]
    ]);

    // ブログポストは有効
}
```

## 参考
* <a href="https://stackoverflow.com/questions/55198713/how-to-call-laravel-validation-rules-in-a-closure-function-in-laravel" target="_blank" rel="nofollow noopener">php - how to call laravel validation rules in a closure function in laravel? - Stack Overflow</a>
