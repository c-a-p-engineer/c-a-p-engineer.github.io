---
title: "【PHP】TCPDF で HTML 上で改ページを行う"
date: 2021-06-18T02:30:00+09:00
description: "PHP の PDF 出力用ライブラリ TCPDF で HTML 上で改ページを行う方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- TCPDF
categories: 
- PHP
image: images/thumbnail/php.png
---

# TCPDF で HTML 上で改ページを行う
PHP の PDF 出力用ライブラリ TCPDF で HTML 上で改ページを行う方法。

## サンプルコード
`<br pagebreak="true"/>` を追加するだけで可能です。
サンプルでは `AddPage()` を一回しかして居ないのに2ページ出てきます。
※ライブラリは別途、自分で入れてください。

```php:tcpdf.php {linenos=table,hl_lines=[12]}
<?php
include "./TCPDF/tcpdf.php"; //ライブラリの読み込み

// 用紙の向き・unit単位・用紙フォーマットを指定します
$tcpdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

$tcpdf->setFont('kozminproregular');
$tcpdf->setPrintHeader(false);
$tcpdf->setPrintFooter(false);
$tcpdf->AddPage();

$html = '<br pagebreak="true"/>';
$tcpdf->WriteHTML($html, true, 0, false, true, 'L');
$tcpdf->Output('test.pdf', 'I');
```


## 参考
* <a href="https://tcpdf.org/examples/example_006/" target="_blank" rel="nofollow noopener">Example 006 : WriteHTML() · TCPDF</a>
* <a href="https://stackoverflow.com/questions/1605860/manual-page-break-in-tcpdf" target="_blank" rel="nofollow noopener">pdf - Manual Page Break in TCPDF - Stack Overflow</a>