# S-Emerge

S-Emergeはシンプルなモーダル表示のjsライブラリです。

## 最もシンプルなモーダル表示方法

```html
<script>
  let emerge = new Emerge();
  emerge.open();
</script>
```
デフォルトでは画面全体を覆うようにして、モーダルが表示されます。

## モーダルの内容変更

```html
<script>
  let emerge = new Emerge({
      contentHtml: '<span>始めまして、S-Emerge!!</span>',
  });
  emerge.open();
</script>
```
contentHtmlオプションにHTML要素を設定することで、そのHTML要素をモーダル内に表示可能です。

## 対象DOM要素を覆うモーダル表示方法

```html
<div id="target" style="position: relative;">
    適用範囲
</div>
<script>
  let emerge = new Emerge({
      target: $('#target'),
      position: 'absolute',
  });
  emerge.open();
</script>
```
オプションとしてtargetを指定することで、その対象DOM要素を覆うようなモーダルを表示できます。  
※この際、対象DOM要素のpositionを'relative'、Emergeのpositionオプションを'absolute'とする必要があります。  

### targetの指定方法① 直接COM要素指定
```javascript
let emerge = new Emerge({
    target: document.getElementById('target'),
    position: 'absolute',
});
```
上記の様に直接DOM要素を指定できます。

### targetの指定方法② jQuery要素指定
```javascript
let emerge = new Emerge({
    target: $('#target'),
    position: 'absolute',
});
```
上記の様にjQuery要素を指定できます。

### targetの指定方法③ idを指定
```javascript
let emerge = new Emerge({
    target: '#target',
    position: 'absolute',
});
```
上記の様にidセレクタを用いて指定できます。

## Option

以下のoptionが設定可能です。

| option | 内容 | デフォルト |
----|----|---- 
| position | モーダル要素のposition | 'fixed' |
| target | モーダルが表示される要素 | document.querySelector('html body') |
| animation | モーダルが表示時のアニメーションの有無| true |
| animationTime | モーダルが表示時のアニメーション時間(ms)| 200 |
| headerTitle | モーダルのヘッダータイトル | 'Hello Emerge' |
| contentHtml | モーダルコンテンツ内容 | 'Hello World' |
| width | モーダル幅 | '50%' |
| height | モーダル高さ | '50%' |
| zIndex | モーダル全体（透過背景も含む）のz-index | null |
| draggable | モーダルをドラッグで移動可能か | false |
| onOpen | モーダルが開く直前の処理 | function(){} |
| onOpened | モーダルが開いた直後の処理 | function(){} |
| onClose | モーダルが閉じる直前の処理 | function(){} |
| onClosed | モーダルが閉じた直後の処理 | function(){} |

