# 基本環境の構築

<!-- TODO 内容を見直す  -->
本書では、オープンソースを活用して、TypeScriptの開発環境を整備する方法を紹介します。
TypeScript からブラウザで利用できるJavaScriptバンドラを作成する環境を構築する手順を紹介します。

> 本手順書で示すコマンドは、 `bash` 形式です。
> Windows のコマンドラインやPowerShellをお使いの場合はそちらに翻訳して解釈してください。

## ::download:: 前提ソフトウェアをインストールする

まずは、環境に最低限必要なソフトウェアをインストールします。
Node.js と Visual Studio Codeをインストールします。

[詳しく見る>>](./install.md)

## ::spell-check:: 型チェック環境を作成する

次に、TypeScript の文法を解釈して型情報を確認する環境を整備します。
`npm` のパッケージ `typescript` をインストールします。
今回の環境では、`typescript`は型チェックに使います。

::: tip
一般的に `typescript` は TypeScriptからJavaScriptへの翻訳(トランスパイル)を担いますが、
`esbuild`にはバンドルとともにトランスパイルも同時に行います。
したがって、**本手順ではトランスパイルは`esbuild`に委譲します。**
:::

[詳しく見る>>](./init-typescript.md)

## ::boxes-packing:: バンドラ作成環境を構築する

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
