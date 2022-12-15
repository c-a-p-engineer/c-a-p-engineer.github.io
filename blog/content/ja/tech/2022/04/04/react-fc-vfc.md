---
title: "【React】React.FC、React.VFCを使わない方が良い？"
date: 2022-04-04T05:30:00+09:00
description: "React.FC、React.VFC 色々調べてみたらどちらも使わないほうが良いのではないかと考えになりました"
draft: false
enableToc: true
enableTocContent: true
tags: 
- React
- TypeScript
categories: 
- React
image: images/thumbnail/React_Logo.svg
---

# 【React】React.FC、React.VFCを使わない方が良い？
`React.FC(FunctionComponent)`、`React.VFC(VoidFunctionComponent)` 色々調べてみたらどちらも使わないほうが良いのではないかと考えになりました。

## React FC と VFC の違い

### React FC
`React.FC` の `props` の型定義に暗黙的に `children` が含まれる。
そのため `children` が必要ない場合でも `children` が渡せるため`children` が必要化わからない。

```javascript:sample.tsx
type Props = {
    text:string
}

const Component:React.FC<Props> = ({text}) => {
    return (
        <div>{text}</div>
    )
}

const ParentComponent = () => {
  return (
    <Component text={"test"}>
      // 型定義してなくても使える
      <div>children</div>
    </Component>
  );
}
```
### React VFC
`React.VFC` では `children` が必要な場合は明示する必要があり、不要な場合に渡したらエラーとなる。

```javascript:sample.tsx
type Props = {
    text:string
}

const Component:React.VFC<Props> = ({text}) => {
    return (
        <div>{text}</div>
    )
}

const ParentComponent = () => {
  return (
    <Component text={"test"}>
      // childrenが渡されのでエラー
      <div>children</div>
    </Component>
  );
}
```

`children` 使用時は明示すれば良い。
```javascript:sample.tsx
type Props = {
    text:string,
    children:ReactNode
}

const Component:React.VFC<Props> = ({text}) => {
    return (
        <div>{text}</div>
    )
}

const ParentComponent = () => {
  return (
    <Component text={"test"}>
      // childrenが渡されのでエラー
      <div>children</div>
    </Component>
  );
}
```


## React FC VFC使わなくても大丈夫
無理に `React.FC`、`React.VFC` 使わなくても大丈夫です。
```javascript:sample.tsx
type Props = {
    text:string
}

const Component = (props:Props) => {
    return (
        <div>{props.text}</div>
    )
}

const ParentComponent = () => {
  return (
    <Component text={"test"}>
    </Component>
  );
}
```

## React VFC FC の使用の注意
`React 18` からは **FC の props から children される予定**です。
ですのでバージョンアップする際に `FC` で暗黙的に `children` を使用しているプロジェクトには多大な影響が出ます。

同様の `React.SFC(StatelessFunctionalComponent)` が以前にも `React 16.7`で非推奨になったりしています。

## React VFC FC を使わない理由
Reactの変更で保守コストが上がる可能性などを考えると使う必要がない。
使わざる得ない理由がないは限りとくに使う理由がない。

## 参考
<a href="https://kray.jp/blog/dont-have-to-use-react-fc-and-react-vfc/" target="_blank" rel="nofollow noopener">【検証】React.FC と React.VFC はべつに使わなくていい説 &#8211; KRAY Inc</a>
