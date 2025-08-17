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

```json title="package.json"
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // [!code ++]
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
}
```

TypeScriptでは、モジュール間の関係を `import` / `export` で記述することが推奨されています。
したがいまして、上記のように `type` 属性は `"module"` としておきましょう。

## `typescript` をインストールする

それでは `npm install` コマンドで `typescript` をインストールしましょう。

```bash
npm install -D typescript
```

```text :no-line-numbers
my-project
 + node_modules       // [!code ++]
 + package-lock.json  // [!code ++]
 + package.json
```

このコマンドを実行すると、上記のように、`node_modules` というフォルダが追加され、ここに`typescript`がインストールされます。
このときインストールしたライブラリと、が依存しているライブラリのバージョン情報は、`package-lock.json` に格納されます。

## `tsconfig.json` を作成する

TypeScriptのトランスパイル(翻訳)の設定について、ルートディレクトリの`tsconfig.json`に格納します。

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
        "noEmit": true,
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "bundler",
        "lib": ["ES2020", "DOM"],
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "exclude": ["node_modules", "dist"]
}
```

今回は、「型チェック」をするだけで、実際のJavaScriptへの翻訳は後で紹介する [バンドラ](./bundler.md) に委譲します。
したがいまして「出力しない」を意味する `noEmit` を `true` にしています。
そのほかのオプションは、Webブラウザで使用できるようにするためのオプションや、型チェックに関するオプションを記載しています。

設定のそれぞれの意味は、
[tsconfig - TypeScript: JavaScript With Syntax For Types.](https://www.typescriptlang.org/tsconfig/)
をご参照ください。

ここではそのままコピー＆ペーストで使ってもらって構いません。

## TypeScriptを作ってみる

それでは、`src` の下にTypeScriptのコードを追加してみましょう

```text :no-line-numbers
my-project
 + node_modules
 + src             // [!code ++]
 |  + greeting.ts  // [!code ++]
 + package-lock.json
 + package.json
 + tsconfig.json
```

```typescript title="src/greeting.ts"
export function greetingToYou(yourName: string): void {
    console.log(`Hello ${yourName}`);
}
```

これは試しのコードなので、なんでも構いません。
上記例は、名前 (`yourName`) を受け取って書式化してコンソールに出力するコードです。

## 型チェックをしてみる

`tsconfig.json` に従って、型チェックをしてみましょう。

```bash :no-line-numbers
npx tsc
```

何も起きません。
型チェックが無事終わったという意味です。

それでは、先ほどの `greeting.ts` を改変して、 `greetingToYou()`の引数から型情報 `string` を外してください。

```typescript title="src/greeting.ts"
export function greetingToYou(yourName: string): void { // [!code --]
export function greetingToYou(yourName): void { // [!code ++]
    console.log(`Hello ${yourName}`);
}
```

```text :no-line-numbers
src/sample001.ts:1:26 - error TS7006: Parameter 'name' implicitly has an 'any' type.

1 export function sayHello(name): void {
                           ~~~~


Found 1 error in src/sample001.ts:1
```

このように、TypeScriptは、 JavaScriptで起きがちな「型違い」のよる思わぬ問題点を回避できるようになります。

## スクリプトの登録

仕上げに、`npm run` コマンドでバンドルできるようにスクリプトを追加します。

```json title="package.json"
{
    "name": "my-project",
    "version": "1.0.0",
    // ...
    "scripts": {
        // ...
        "build:check": "tsc",
        // ...
    }
}
```

これで、`npm run` コマンドで型チェックができるようになりました。

```bash :no-line-numbers
npm run build:check
```
