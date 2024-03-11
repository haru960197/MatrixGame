# 詰まった部分と解決方法

## `<button>`要素内の文字列を消す

```
<button id="el">
    hoge
    <balloon ~ />
</button>
```
この構造において、hogeの部分を消したかったが、`buttonEl.textContent = ""`とすると、`<balloon>`も消えてしまった。

`textContent`プロパティをの理解が浅かったのが原因。`el.textContent`は、el要素の子要素に含まれるすべての文字列を取得する。よって、`el.textContent = ""`などとするとhogeも`<img />`もすべて消えてしまう。

`el.childNodes[0].textContent = ""`のように、子要素のうち何番目に対して行う処理なのかを明示して`textContent`プロパティを参照しなければならない。

# 技術的学び

- gameStateが同じなら同じ状態になるように型GameStateを定義すべき。

- `<form>`タグ内にボタンを入れておくと、押下したときに画面がリロードされてしまった

- `el.textContent`は、el要素の子要素に含まれるすべての文字列を取得する。