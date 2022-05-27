---
title: "【XSLT】文字列の置換を導入"
date: 2021-02-26T09:00:00+09:00
description: "xlstのバージョン1.0では文字列の置換が出来ません。文字列の置換の導入方法をメモ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- XSLT
categories: 
- XSLT
image: images/thumbnail/xlst.png
---

# xlst の バージョン 1.0 では文字列置換が出来ない
こちらの記事（<a href="/blog/2021-02-22-phpunit-xsltproc" target="_blank">【PHP】PHPUnit の出力ログを見やすくHTMLに変換</a>）で ```xsltproc``` を入れてxlstを使用したのですが ```xlstprc``` ではバージョン1.0しかサポートしておらず、文字列の置換が出来ません。
xlstのバージョン1.0では文字の置換は可能なのですが、1文字単位で置換を行うため、**文字列の置換**を導入致しました。

## テンプレート導入
xsltファイル内に以下のテンプレートを追記。

``` xml:string-replace-all.xslt {linenos=table}
<xsl:template name="string-replace-all">
  <xsl:param name="text" />
  <xsl:param name="replace" />
  <xsl:param name="by" />
  <xsl:choose>
    <xsl:when test="contains($text, $replace)">
      <xsl:value-of select="substring-before($text,$replace)" />
      <xsl:value-of select="$by" />
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="substring-after($text,$replace)" />
        <xsl:with-param name="replace" select="$replace" />
        <xsl:with-param name="by" select="$by" />
      </xsl:call-template>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="$text" />
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>
```

## 使用方法
実際に使用してみます。
``` xml:sample.xml {linenos=table}
<xsl:variable name="myVariable">
  <xsl:call-template name="string-replace-all">
    <xsl:with-param name="text" select="'This is a {old} text'" />
    <xsl:with-param name="replace" select="'{old}'" />
    <xsl:with-param name="by" select="'New'" />
  </xsl:call-template>
</xsl:variable>
<xsl:value-of select="$myVariable"/>
```

説明付き
``` xml:sample.xml {linenos=table}
<!-- 変数 myVariable の宣言 -->
<xsl:variable name="myVariable">
  <!-- テンプレート string-replace-all を呼び出す -->
  <xsl:call-template name="string-replace-all">
    <!-- 文字列 -->
    <xsl:with-param name="text" select="'This is a {old} text'" />
    <!-- 置換対象 -->
    <xsl:with-param name="replace" select="'{old}'" />
    <!-- 置換後の文字列 -->
    <xsl:with-param name="by" select="'New'" />
  </xsl:call-template>
</xsl:variable>

<!-- 変換後の文字列 This is a New text を出力 -->
<xsl:value-of select="$myVariable"/>
```

## 参考
* <a href="https://stackoverflow.com/questions/3067113/xslt-string-replace" target="_blank" rel="nofollow noopener">xpath - XSLT string replace - Stack Overflow</a>