# 静的解析を有効にする

TODO 静的解析とは何かを説明する

## `eslint`, `typescript-eslint` をインストールする

初めに、ESLint をインストールします。
ESLintは、その名の通り ES (ECMAScript)用の Lintツール(静的解析ツール)です。
したがって、今回のようにTypeScriptのプロジェクトはそのまま使えません。

TypeScriptプロジェクトでも使えるようにする、ESLintのプラグインである
`typescript-eslint`もインストールします。

下記のように `npm install` コマンドでインストールしましょう。

```bash :no-line-numbers
npm install --save-dev eslint @eslint/js typescript-eslint
```

ここで `@eslint/js` もインストールしています。
これは、ESLintのJavaScript用ルールセット定義です。
基本的なルールはこちらで準備されているので、必ずインストールしましょう

## 設定をする

インストールが完了したら、設定をします。
プロジェクトルートディレクトリに `eslint.config.mjs` というファイルを作成します。

```text :no-line-numbers
my-project
 + node_modules
 + src
 + eslint.config.mjs // [!code ++]
 + package-lock.json
 + package.json
 + tsconfig.json
```

内容は以下の通りです。

```javascript title="eslint.config.js"
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
    ...tseslint.config({
        files: ['**/*.{ts,tsx}'],
        extends: [eslint.configs.recommended, tseslint.configs.strict],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        rules: {
            // ここにルールのカスタマイズを記述する
        }
    })
];
```

ここで、`rules` には、`recommended` では定義されていないルールを追加します。
特におすすめは、コードメトリックスに関するルールです。下記のようなものがあります。

| ルール名                                   | 概要                           |
| ------------------------------------------ | ------------------------------ |
| `complexity`                               | 関数の循環的複雑度を制限       |
| `max-lines`                                | ファイルの最大行数を制限       |
| `max-lines-per-function`                   | 関数の最大行数を制限           |
| `max-depth`                                | ネストの深さを制限             |
| `max-params`                               | 関数の引数数を制限             |
| `max-statements`                           | 関数内のステートメント数を制限 |
| `no-nested-ternary`                        | 三項演算子のネストを禁止       |
| `no-magic-numbers`                         | マジックナンバーの使用を制限   |

`eslint.config.mjs`の `rules` には以下のように定義します。

```js
{
  "rules": {
    "complexity": ["warn", { "max": 10 }],
    "max-lines": ["warn", {
        "max": 300, "skipBlankLines": true, "skipComments": true
    }],
    "max-lines-per-function": ["warn", {
        "max": 50, "skipBlankLines": true, "skipComments": true
    }],
    "max-depth": ["warn", 4],
    "max-params": ["warn", 4],
    "max-statements": ["warn", 30],
    "no-nested-ternary": "warn",
    "no-magic-numbers": ["warn", {
        "ignore": [0, 1], "detectObjects": false
    }]
  }
}
```

## Lintを試してみる

それでは、ソースコードを編集して、Lintで問題が出るようにしてみましょう。

```javascript title="src/hello.ts"
export function sayHello(id: string, name: string): void {
    const helloDom = document.getElementById(id) as HTMLDivElement | null;
    if (helloDom) {
        helloDom.textContent = `こんにちは ${name} さん`; // [!code --]
        helloDom.textContent = `こんにちは anonymous さん`; // [!code ++]
    } else {
        console.error('要素が見つかりません');
    }
}
```

ここでは、引数 `name` が宣言されているのに、使用されていない課題があります。
このようなチェックは、以下のような「バグの種」を事前に検知してくれます。

* 冗長なコード
* 本当は参照されるべき変数なのにタイプミスで参照していない。

このように変更して以下のコマンドを実行してください。

```bash :no-line-numbers
npx eslint .
```

以下のように `@typescript-eslint/no-unused-vars` という課題が摘出されるはずです。

```text :no-line-numbers
...
your-project-dir/src/hello.ts
  1:38  error  'name' is defined but never used  @typescript-eslint/no-unused-vars
...

```

::: caution
摘出した課題は後回しにせず、摘出した直後に対策してください。
後回しにするとどんどん課題が積み重なって、対処しきれなくなります。

実際筆者がかかわったプロジェクトで、数百～数千の問題が摘出され、このツールの適用をあきらめたプロジェクトがあります。
:::

## ESLint拡張機能をインストールする

Microsoft は Visual Studio Code用の拡張機能として公式に ESLintの拡張機能をリリースしています。
この拡張機能をインストールしておくと、現在開いているプロジェクトに対して自動的にESLintを実行して問題点を確認してくれます。

<VPCard
  title="ESLint"
  link="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint"
  image="https://dbaeumer.gallerycdn.vsassets.io/extensions/dbaeumer/vscode-eslint/3.0.17/1755173326904/Microsoft.VisualStudio.Services.Icons.Default"
  description="Integrates ESLint JavaScript into VS Code."
/>
