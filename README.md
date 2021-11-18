# MSBox

MSBoxはシンプルなモーダル表示のjsライブラリです。

## 使用方法

### npmでのダウンロード

```bash
$ npm i msbox
```

### ファイル読み込み
css読み込み
```html
<link rel="stylesheet" href="./src/css/msbox.min.css">
```

JavaScript読み込み
```html
<script src="./src/js/msbox.js"></script>
```

## 最もシンプルなモーダル表示方法

```html
<script>
  let msbox = new MSBox();
  msbox.open();
</script>
```
デフォルトでは画面全体を覆うようにして、モーダルが表示されます。

## モーダルの内容変更

```html
<script>
  let msbox = new MSBox({
      contentHtml: '<span>始めまして、S-MSBox!!</span>',
  });
  msbox.open();
</script>
```
contentHtmlオプションにHTML要素を設定することで、そのHTML要素をモーダル内に表示可能です。

## 対象DOM要素を覆うモーダル表示方法

```html
<div id="target" style="position: relative;">
    適用範囲
</div>
<script>
  let msbox = new MSBox({
      target: $('#target'),
      position: 'absolute',
  });
  msbox.open();
</script>
```
オプションとしてtargetを指定することで、その対象DOM要素を覆うようなモーダルを表示できます。  
※この際、対象DOM要素のpositionを'relative'、MSBoxのpositionオプションを'absolute'とする必要があります。  

### targetの指定方法① 直接COM要素指定
```javascript
let msbox = new MSBox({
    target: document.getElementById('target'),
    position: 'absolute',
});
```
上記の様に直接DOM要素を指定できます。

### targetの指定方法② jQuery要素指定
```javascript
let msbox = new MSBox({
    target: $('#target'),
    position: 'absolute',
});
```
上記の様にjQuery要素を指定できます。

### targetの指定方法③ idを指定
```javascript
let msbox = new MSBox({
    target: '#target',
    position: 'absolute',
});
```
上記の様にidセレクタを用いて指定できます。

## Methods 

以下のmethodが使用可能です。

| method | 内容 | 引数 | 戻り値 |
----|----|----|---- 
| open() | モーダルを開く | 無し | MSBox |
| close() | モーダルを閉じる | 無し | MSBox |
| setOption(options) | モーダルのoptionを更新 | options | MSBox |
| init(options) | モーダル自身やoptionを初期化| options | MSBox |
| detach() | モーダルDOM要素を削除 | 無し | MSBox |
| destroy() | detach() and init() | 無し | MSBox |

## Options

以下のoptionが設定可能です。

| option | 内容 | デフォルト |
----|----|---- 
| position | モーダル要素のposition | 'fixed' |
| target | モーダルが表示される要素 | document.querySelector('html body') |
| animation | モーダルが表示時のアニメーションの有無| true |
| animationTime | モーダルが表示時のアニメーション時間(ms)| 200 |
| headerTitle | モーダルのヘッダータイトル | 'Hello MSBox' |
| contentHtml | モーダルコンテンツ内容 | 'Hello World' |
| width | モーダル幅 | '50%' |
| height | モーダル高さ | '50%' |
| zIndex | モーダル全体（透過背景も含む）のz-index | null |
| draggable | モーダルをドラッグで移動可能か | false |
| onOpen | モーダルが開く直前の処理 | function(){} |
| onOpened | モーダルが開いた直後の処理 | function(){} |
| onClose | モーダルが閉じる直前の処理 | function(){} |
| onClosed | モーダルが閉じた直後の処理 | function(){} |

