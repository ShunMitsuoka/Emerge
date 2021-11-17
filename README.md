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

## 対象DOM要素を覆うモーダル表示方法

```html
<div id="target">
    適用範囲
</div>
<script>
  let emerge = new Emerge({
      target: $('#target'),
      position: 'relative',
  });
  emerge.open();
</script>
```
オプションとしてtargetを指定することで、その対象DOM要素を覆うようなモーダルを表示できます。  
※この際、positionオプションを'relative'とする必要があります。  
targetは単純なDOM要素の他、jQueryオブジェクトを渡すことも可能です。
