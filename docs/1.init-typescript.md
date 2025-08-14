# TypeScriptトランスパイル環境を作成する

## プロジェクトのルートディレクトリを作成する

まずは、プロジェクトのルートディレクトリを作成します。

```bash :no-line-numbers
# ルートディレクトリ 'my-project' を作成
# 名前はなんでも構いません。
mkdir my-project
```

ルートディレクトリに移動して、`npm` プロジェクトとして初期設定を行います。

```bash
cd my-project
# npm プロジェクトとして初期化します。
npm init -y
```

ルートディレクトリに `package.json`ができました。

```text :no-line-numbers
my-project
 + package.json // [!code ++]
```

それでは早速そのディレクトリをVisual Studio Codeで開いてみましょう。

```bash
cd my-project
code .
```



```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
}
```


## `typescript` をインストールする

```bash
npm install -D typescript
```

```text :no-line-numbers
my-project
 + node_modules       // [!code ++]
 + package-lock.json  // [!code ++]
 + package.json
```

## `tsconfig.json` を作成する

```bash
npx tsc --init
```

```text :no-line-numbers
my-project
 + node_modules
 + package-lock.json
 + package.json
 + tsconfig.json  // [!code ++]
```

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist/esm",
  }
}
```

## TypeScriptを作ってみる

```text :no-line-numbers
my-project
 + node_modules
 + src             // [!code ++]
 |  + greeting.ts  // [!code ++]
 + package-lock.json
 + package.json
 + tsconfig.json
```

```typescript
export function greetingToYou(yourName: string): void {
    console.log(`Hello ${yourName}`);
}
```

## ビルドしてみる

```bash
npx tsc
```

```text :no-line-numbers
my-project
 + dist                  // [!code ++]
 |  + greeting.d.ts      // [!code ++]
 |  + greeting.d.ts.map  // [!code ++]
 |  + greeting.js        // [!code ++]
 |  + greeting.js.map    // [!code ++]
 + node_modules
 + src
 |  + greeting.ts
 + package-lock.json
 + package.json
 + tsconfig.json
```

## 型チェックだけしてみる

```bash
npx tsc --noEmit
```

## クリーン用パッケージのインストール <Badge text="オプション" type="tip" vertical="top" />

オプションとして、古いビルド成果物をクリーンするためのパッケージをインストールします。
`rimraf` は簡単にディレクトリを再帰的に削除するパッケージです。
`npm run build:clean` として、`dist` 以下を削除するようにします。

```bash :no-line-numbers
npm install -D rimraf
```
