# 基本環境の構築

本書では、オープンソースを活用して、TypeScriptの開発環境を整備する方法を紹介します。
TypeScript から ECMAScriptのモジュールを生成する環境の構築する環境とブラウザで利用できるJavaScriptバンドラを作成する環境を構築する手順を紹介します。

> 本手順書で示すコマンドは、 `bash` 形式です。
> Windows のコマンドラインやPowerShellをお使いの場合はそちらに翻訳して解釈してください。

## 前提ソフトウェアをインストールする

まずは、環境に最低限必要なソフトウェアをインストールします。
Node.js と Visual Studio Codeをインストールします。

[詳しく見る>>](./install.md)

## TypeScriptトランスパイル環境を作成する

次に、TypeScriptを翻訳して、JavaScriptに翻訳(トランスパイル)できる環境を構築します。
`npm` のパッケージ `typescript` をインストールします。
今回の環境では、`typescript`は型チェックに使います。

[詳しく見る>>](./init-typescript.md)

## バンドラ作成環境を構築する

TypeScriptの出力は一般的に ECMAScript です。
ブラウザで使用する場合は、以下のように`type="module"`が必要になります。

```html
<script type="module" src="someScript.js"></script>
```

ローコード製品のスクリプトを記述する場合など、ECMAScriptが使えない場合があります。
そんなときは、対象のJavaScriptから関連するJavaScriptをひとつにまとめて圧縮し配置することがあります。
こうすることでネットワーク負荷もクライアントのリソースも少なく済むというメリットもあります。
この圧縮は **バンドル** と呼ばれ、この圧縮を実現するソフトが**バンドラ**です。
`esbuild` の環境を構築します。

[詳しく見る>>](./bundler.md)
