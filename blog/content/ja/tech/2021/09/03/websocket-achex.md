---
title: "無料で使える WebSocket サーバー「Achex」"
date: 2021-09-03T10:00:00+09:00
description: "無料で使える WebSocket サーバー「Achex」を使用してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- JavaScript
categories: 
- JavaScript
image: images/thumbnail/javascript.png
---

# 無料で使える WebSocket サーバー「Achex」
無料で使える WebSocket サーバー「Achex」を使用してみました。
<a href="https://achex.ca/" target="_blank" rel="nofollow noopener">Achex</a>

こちらは簡単に使用することが可能なのでチャットシステムなど簡単に作れそうです。
ただし、使用する際はフリーのサーバーなのでセキュリティが必要なものにはおすすめしません。

## サンプル
簡単なチャットシステムです。
複数のブラウザで開けばチャットが出来ます。
また他に開いている人が居ればやり取りが出来ます。
古いログは表示されません。
<div id="id" style="width:100%;border:solid 1px #FFFFFF;"></div>
<input id="msg" type="text" style="width:80%;" value=""/> <button id="send" type="button" onclick="sendChat()">送信</button>
<div id="chat" style="width:100%;height:300px;border:solid 1px #FFFFFF;overflow:auto;"></div>
<script>
var chat = document.getElementById("chat");
// ID生成
var id = Math.random().toString(32).substring(2);
document.getElementById("id").innerHTML = 'ID : ' + id;
// WS接続（Achexへ接続）
ws = new WebSocket("wss://cloud.achex.ca/chat");
// WS接続
ws.onopen = e => {
  console.log('open');
  chat.innerHTML = 'You ID : ' + id + '（' + getDateTime() + '）';
  // 認証（auth, passwordは何でもOK）
	ws.send(JSON.stringify({"auth": "hoge", "password": "1234"}));
  // 
  ws.send(JSON.stringify({"to": "hoge", "id": id, "message": 'Login'}));
}
// メッセージ受信
ws.onmessage = e => {
  console.log('message');
  console.log(e);
  var obj = JSON.parse(e.data);
  if(obj.auth == 'OK'){
    // 認証OK
    return;
  }
  addChat(obj.id, obj.message);
}
// WS切断
ws.onclosed = e => {
  console.log('closed');
  ws.send(JSON.stringify({"to": "hoge", "id": id, "message": 'Logout'}));
}
// メッセージ送信
function sendChat(){
  let msgElem = document.getElementById("msg");
  let msg = msgElem.value;
  msgElem.value = "";
  ws.send(JSON.stringify({"to": "hoge", "id": id, "message": msg}));
}
// チャット
function addChat(id, msg){
  chat.innerHTML = id + ' : ' + msg + '（' + getDateTime() + '）' + '<br>' + chat.innerHTML;
}
// 1桁の数字を0埋めで2桁にする
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
};
// 日時取得 YYYY/MM/DD HH:DD:MI:SS形式で取得
var getDateTime = function() {
  var date = new Date();
  var year = date.getFullYear();
  var month = toDoubleDigits(date.getMonth() + 1);
  var day = toDoubleDigits(date.getDate());
  var hour = toDoubleDigits(date.getHours());
  var min = toDoubleDigits(date.getMinutes());
  var sec = toDoubleDigits(date.getSeconds());
  return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
};
</script>

## サンプルソース
``` html:index.html
<div id="id" style="width:100%;border:solid 1px #FFFFFF;"></div>
<input id="msg" type="text" style="width:80%;" value=""/> <button id="send" type="button" onclick="sendChat()">送信</button>
<div id="chat" style="width:100%;height:300px;border:solid 1px #FFFFFF;overflow:auto;"></div>
<script>
var chat = document.getElementById("chat");
// ID生成
var id = Math.random().toString(32).substring(2);
document.getElementById("id").innerHTML = 'ID : ' + id;
// WS接続（Achexへ接続）
ws = new WebSocket("wss://cloud.achex.ca/chat");
// WS接続
ws.onopen = e => {
  console.log('open');
  chat.innerHTML = 'You ID : ' + id + '（' + getDateTime() + '）';
  // 認証（auth, passwordは何でもOK）
	ws.send(JSON.stringify({"auth": "hoge", "password": "1234"}));
  // 
  ws.send(JSON.stringify({"to": "hoge", "id": id, "message": 'Login'}));
}
// メッセージ受信
ws.onmessage = e => {
  console.log('message');
  console.log(e);
  var obj = JSON.parse(e.data);
  if(obj.auth == 'OK'){
    // 認証OK
    return;
  }
  addChat(obj.id, obj.message);
}
// WS切断
ws.onclosed = e => {
  console.log('closed');
  ws.send(JSON.stringify({"to": "hoge", "id": id, "message": 'Logout'}));
}
// メッセージ送信
function sendChat(){
  let msgElem = document.getElementById("msg");
  let msg = msgElem.value;
  msgElem.value = "";
  ws.send(JSON.stringify({"to": "hoge", "id": id, "message": msg}));
}
// チャット
function addChat(id, msg){
  chat.innerHTML = id + ' : ' + msg + '（' + getDateTime() + '）' + '<br>' + chat.innerHTML;
}
// 1桁の数字を0埋めで2桁にする
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
};
// 日時取得 YYYY/MM/DD HH:DD:MI:SS形式で取得
var getDateTime = function() {
  var date = new Date();
  var year = date.getFullYear();
  var month = toDoubleDigits(date.getMonth() + 1);
  var day = toDoubleDigits(date.getDate());
  var hour = toDoubleDigits(date.getHours());
  var min = toDoubleDigits(date.getMinutes());
  var sec = toDoubleDigits(date.getSeconds());
  return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
};
</script>
```

## 参考
* <a href="https://achex.ca/" target="_blank" rel="nofollow noopener">Achex</a>
* <a href="https://developer.mozilla.org/ja/docs/Web/API/WebSocket" target="_blank" rel="nofollow noopener">WebSocket - Web API | MDN</a>

