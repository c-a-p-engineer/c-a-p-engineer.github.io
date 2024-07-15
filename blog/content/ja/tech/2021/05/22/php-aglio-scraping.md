---
title: "【PHP】PHPでAPIドキュメント（API Blueprint & aglio）をスクレイピングする。"
date: 2021-05-22T07:30:00+09:00
description: "API Blueprint & aglio で出力されたAPIドキュメントをPHPを利用してスクレイピングしてみます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# PHPでAPIドキュメント（API Blueprint & aglio）をスクレイピングする。
`API Blueprint` & `aglio` で出力されたAPIドキュメントをPHPを利用してスクレイピングしてみます。
APIドキュメントを解析 → 自動テスト出来たら良いなと思いやってみました。

## サンプル
サンプルに使用している `default.html` はこちらの `aglio` の `GitHub` のものを使用しています。
* <a href="https://github.com/danielgtaylor/aglio/blob/master/examples/default.html" target="_blank" rel="nofollow noopener">aglio/default.html at master · danielgtaylor/aglio</a>

解析に使用したHTMLはこちらです。
* <a href="https://htmlpreview.github.io/?https://github.com/danielgtaylor/aglio/blob/master/examples/default.html" target="_blank" rel="nofollow noopener">default.html</a>
`default.html` 以外では確認しておりませんので必要な場合は改修をして使用してください。

``` php:scraping.php
<?php

use DOMDocument;
use DOMXPath;

// APIドキュメント読込
$html = file_get_contents('default.html');
$dom = new DOMDocument('1.0', 'UTF-8');
$html = mb_convert_encoding($html, "HTML-ENTITIES", 'auto');
@$dom->loadHTML($html);
$xpath = new DOMXPath($dom);

// 各APIを取得
$content = $xpath->query('//div[contains(@class, "action")]');

$apis = [];
foreach($content as $ivalue){
    // HTML読込
    $idom = new DOMDocument('1.0', 'UTF-8');
    $html = mb_convert_encoding($ivalue->ownerDocument->saveXML($ivalue), "HTML-ENTITIES", 'auto');
    @$idom->loadHTML($html);
    $ixpath = new DOMXPath($idom);
    // method
    $method = $ixpath->query('//a[contains(@class, "method")]');
    // uri
    $uri = $ixpath->query('//span[contains(@class, "uri")]');
    // description
    $description = $ixpath->query('//h4/following-sibling::ul');
    $descriptionStrs = [];
    foreach($description as $value){
        $descriptionStrs[] = $value->nodeValue;
    }

    // Request
    $requestXpath = '//div[contains(@class, "title") and contains(*, "Request")]';
    $requestElements = $ixpath->query($requestXpath);
    $tempRequests = [];
    foreach($requestElements as $key => $elements){
        $i = $key + 1;

        // Header
        $requestHeaderElem = $ixpath->query($requestXpath . '[' . $i . ']/following::div/div/pre');
        $requestHeader = null;
        if(!is_null($requestHeaderElem[0] ?? null)){
            // Headerを各行に分解
            $requestHeader = $requestHeaderElem[0]->ownerDocument->saveXML($requestHeaderElem[0]);
            $requestHeader = strip_tags(str_replace(['<br>', '<br/>'], PHP_EOL, $requestHeader));
        }

        // Body
        $requestBodyElem = $ixpath->query('//div[contains(*, "Request")]/following::div/following::pre/code');

        // Requestの後のResponse数をカウント
        $responseHeaderElem = $ixpath->query($requestXpath . '[' . $i . ']/following::div[contains(@class, "title") and contains(*, "Response")]');
        $tempRequests[] = [
            'requestHeader' => $requestHeader,
            'requestBody' => $requestBodyElem[0]->nodeValue ?? null,
            'beforResponseCount' => count($requestHeaderElem),
        ];
    }

    // Response
    $response = [];
    // Status
    $responseStatus = $ixpath->query('//div[contains(*, "Response")]/strong/code');
    foreach($responseStatus as $key => $elements){
        // Header
        $responseHederElem = $ixpath->query('//div[contains(*, "Response")]/following::div[' . $key . '][contains(@class, "collapse-content")]/div[1]/pre[1]/code');
        $responseHeder = null;
        if(!is_null($responseHederElem[0] ?? null)){
            // Headerを各行に分解
            $responseHeder = $responseHederElem[0]->ownerDocument->saveXML($responseHederElem[0]);
            $responseHeder = explode(PHP_EOL, strip_tags(str_replace(['<br>', '<br/>'], PHP_EOL, $responseHeder)));
        }

        // Body
        $responseBodyElem = $ixpath->query('//div[contains(*, "Response")]/following::div[' . $key . '][contains(@class, "collapse-content")]/div[1]/pre[2]/code');
        $response[] = [
            'responseStatus' => $elements->nodeValue ?? null,
            'responseHeder' => $responseHeder,
            'responseBody' => $responseBodyElem[0]->nodeValue ?? null,
        ];
    }

    // Request に対しての Response を当て込む
    $request = [];
    for($i = (count($tempRequests) - 1); 0 <= $i; $i--){
        $value = $tempRequests[$i];
        $responseCount = $value['beforResponseCount'] - ($tempRequests[($i + 1)]['beforResponseCount'] ?? 0);
        if($responseCount < 0){
            $responseCount = 0;
        }

        $temp = [];
        for($j = $responseCount; 0 < $j; $j--){
            $key = $j - 1;
            $temp[$response[$j]['responseStatus']] = $response[$j];
        }

        $request[] = [
            'requestHeader' => $value['requestHeader'],
            'requestBody' => $value['requestBody'],
            'response' => $temp,
        ];
    }

    // GETのようにRequestがないものの対策
    if(count($tempRequests) == 0){
        $temp = [];
        foreach($response as $value){
            $temp[$value['responseStatus']] = $value;;
        }
        $request[] = [
            'requestHeader' => null,
            'requestBody' => null,
            'response' => $temp,
        ];
    }

    // API毎に整理
    $apis[] = [
        'method' => $method[0]->nodeValue ?? null,
        'uri' => $uri[0]->nodeValue ?? null,
        'description' => implode('', $descriptionStrs),
        'request' => $request,
    ];
}

var_dump($apis);
```


{{< expand "実行結果" >}}
``` php
array:8 [
  0 => array:4 [
    "method" => "GET"
    "uri" => "https://api.example.com/notes"
    "description" => "Get a list of notes."
    "request" => array:1 [
      0 => array:3 [
        "requestHeader" => null
        "requestBody" => null
        "response" => array:1 [
          200 => array:3 [
            "responseStatus" => "200"
            "responseHeder" => null
            "responseBody" => null
          ]
        ]
      ]
    ]
  ]
  1 => array:4 [
    "method" => "POST"
    "uri" => "https://api.example.com/notes"
    "description" => "Create a new note using a title and an optional content body."
    "request" => array:2 [
      0 => array:3 [
        "requestHeader" => "Content-Type: application/json"
        "requestBody" => """
          {\n
            "title": "My new note",\n
            "body": "This is the body"\n
          }
          """
        "response" => array:2 [
          201 => array:3 [
            "responseStatus" => "201"
            "responseHeder" => null
            "responseBody" => null
          ]
          400 => array:3 [
            "responseStatus" => "400"
            "responseHeder" => array:1 [
              0 => "Content-Type: application/json"
            ]
            "responseBody" => """
              {\n
                "error": "Invalid title"\n
              }
              """
          ]
        ]
      ]
      1 => array:3 [
        "requestHeader" => "Content-Type: application/json"
        "requestBody" => """
          {\n
            "title": "My new note",\n
            "body": "This is the body"\n
          }
          """
        "response" => array:2 [
          201 => array:3 [
            "responseStatus" => "201"
            "responseHeder" => null
            "responseBody" => null
          ]
          400 => array:3 [
            "responseStatus" => "400"
            "responseHeder" => array:1 [
              0 => "Content-Type: application/json"
            ]
            "responseBody" => """
              {\n
                "error": "Invalid title"\n
              }
              """
          ]
        ]
      ]
    ]
  ]
  2 => array:4 [
    "method" => "GET"
    "uri" => "https://api.example.com/notes/id?body=false"
    "description" => "Get a single note."
    "request" => array:1 [
      0 => array:3 [
        "requestHeader" => null
        "requestBody" => null
        "response" => array:2 [
          200 => array:3 [
            "responseStatus" => "200"
            "responseHeder" => null
            "responseBody" => null
          ]
          404 => array:3 [
            "responseStatus" => "404"
            "responseHeder" => array:3 [
              0 => "Content-Type: application/json"
              1 => "X-Request-ID: f72fc914"
              2 => "X-Response-Time: 4ms"
            ]
            "responseBody" => null
          ]
        ]
      ]
    ]
  ]
  3 => array:4 [
    "method" => "PUT"
    "uri" => "https://api.example.com/notes/id"
    "description" => "Update a single note by setting the title and/or body.If the value for title or body is null or undefined, then the corresponding value is not modified on the server. However, if you send an empty string instead then it will permanently overwrite the original value."
    "request" => array:2 [
      0 => array:3 [
        "requestHeader" => "Content-Type: application/json"
        "requestBody" => """
          {\n
            "title": "Grocery List (Safeway)"\n
          }
          """
        "response" => array:2 [
          200 => array:3 [
            "responseStatus" => "200"
            "responseHeder" => null
            "responseBody" => null
          ]
          404 => array:3 [
            "responseStatus" => "404"
            "responseHeder" => array:3 [
              0 => "Content-Type: application/json"
              1 => "X-Request-ID: f72fc914"
              2 => "X-Response-Time: 4ms"
            ]
            "responseBody" => null
          ]
        ]
      ]
      1 => array:3 [
        "requestHeader" => "Content-Type: application/json"
        "requestBody" => """
          {\n
            "title": "Grocery List (Safeway)"\n
          }
          """
        "response" => array:2 [
          200 => array:3 [
            "responseStatus" => "200"
            "responseHeder" => null
            "responseBody" => null
          ]
          404 => array:3 [
            "responseStatus" => "404"
            "responseHeder" => array:3 [
              0 => "Content-Type: application/json"
              1 => "X-Request-ID: f72fc914"
              2 => "X-Response-Time: 4ms"
            ]
            "responseBody" => null
          ]
        ]
      ]
    ]
  ]
  4 => array:4 [
    "method" => "DELETE"
    "uri" => "https://api.example.com/notes/id"
    "description" => "Delete a single note"
    "request" => array:1 [
      0 => array:3 [
        "requestHeader" => null
        "requestBody" => null
        "response" => array:2 [
          204 => array:3 [
            "responseStatus" => "204"
            "responseHeder" => null
            "responseBody" => null
          ]
          404 => array:3 [
            "responseStatus" => "404"
            "responseHeder" => array:3 [
              0 => "Content-Type: application/json"
              1 => "X-Request-ID: f72fc914"
              2 => "X-Response-Time: 4ms"
            ]
            "responseBody" => null
          ]
        ]
      ]
    ]
  ]
  5 => array:4 [
    "method" => "GET"
    "uri" => "https://api.example.com/users?name=alice&joinedBefore=2011-01-01&joinedAfter=2011-01-01&sort=joined&limit=25"
    "description" => "Get a list of users. Example:"
    "request" => array:1 [
      0 => array:3 [
        "requestHeader" => null
        "requestBody" => null
        "response" => array:1 [
          200 => array:3 [
            "responseStatus" => "200"
            "responseHeder" => null
            "responseBody" => null
          ]
        ]
      ]
    ]
  ]
  6 => array:4 [
    "method" => "GET"
    "uri" => "https://api.example.com/tags"
    "description" => "Get a list of bars"
    "request" => array:1 [
      0 => array:3 [
        "requestHeader" => null
        "requestBody" => null
        "response" => array:1 [
          200 => array:3 [
            "responseStatus" => "200"
            "responseHeder" => null
            "responseBody" => null
          ]
        ]
      ]
    ]
  ]
  7 => array:4 [
    "method" => "GET"
    "uri" => "https://api.example.com/tags/id"
    "description" => ""
    "request" => array:1 [
      0 => array:3 [
        "requestHeader" => null
        "requestBody" => null
        "response" => array:1 [
          200 => array:3 [
            "responseStatus" => "200"
            "responseHeder" => null
            "responseBody" => null
          ]
        ]
      ]
    ]
  ]
]
```
{{< /expand >}}
