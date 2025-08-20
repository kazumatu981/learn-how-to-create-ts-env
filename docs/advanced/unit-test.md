# テストフレームワークを有効にする

TypeScriptのライブラリを開発する場合、そのライブラリがいつでも期待通り動作していることを確認できるようにしておくほうが望ましいです。
そのライブラリを実際呼び出して、そのライブラリが**あらかじめ定められたふるまいをするか**を確認します。

たとえば、計算機クラス( `Calculator` ) が加算というメソッド (`add()`) を実装していたとします。
期待通りの動作というと、`4` と `7` を渡すと `11` を返却してほしいです。
この場合、あらかじめ以下のようなテストコードを書いておいて、実際動作させてその通りになっているかを確認します。

```typescript title="簡単なテストコード"
test('4 + 7 = 11 になるはず', () => {
  const expected = 11
  const actual = Calculator.add(4, 7);

  expect(actual).toEqual(expected);
});
```

このようなテストコードを記述する環境がテストフレームワークです。
ここでは、安定的に人気があるテストフレームワークの `Jest` を紹介します。

::: info
`Jest` はもともと、React.js 用のテストフレームワークです。
しかし、テストフレームワークとして洗練されているため、通常のTypeScriptのプロジェクトでも活用される事例が多いです。
:::

## Jest実行環境をインストールする

まずは、プロジェクトに `jest` を導入します。
今回開発するのはTypeScriptで開発するので、テストコードもTypeScriptで記述できるように、`ts-jest`もインストールします。
`npm install` コマンドでインストールをします。

```bash :no-line-numbers
npm install -D jest ts-jest
```

## Jest実行環境を設定する

次に、ts-jest用に設定ファイルを作ります。
自分で作成しても構いませんが、`ts-jest` には初期設定を出力するコマンドがあるので、それで生成します。

```bash :no-line-numbers
npx ts-jest config:init
```

```text :no-line-numbers
my-project
  + dist
  + node_modules
  + src
  + jest.config.js   // [!code ++]
  + package-lock.json
  + package.json
  + tsconfig.json
```

このように、ルートディレクトリに、 `jest.config.js` が出力されました。
これで、テストを実行する環境が整いました。

::: warning
出力されたものそのままでも動作をしますが、TypeScriptでは `require()` 文は推奨されていないので、`import`文に置き換えましょう。

```javascript title="jest.config.js"
const { createDefaultPreset } = require("ts-jest"); // [!code --]
import { createDefaultPreset } from "ts-jest";      // [!code ++]

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};
```

:::

## Jestの型情報をインストール

テストコードを書くためには、テストフレームワークの型情報が必要になります。
これらの型情報は `@types/jest` と `@jest/globals` というライブラリにあります。

`npm install` コマンドでこれらをインストールしましょう。

```bash :no-line-numbers
npm install -D @types/jest @jest/globals
```

## テスト対象コードを書く

テスト対象となるライブラリを記述します。
ここでは簡単のために、引数でもらった2つの変数を足し合わせ、どちらかが負であれば例外が発生する関数を実装します。

```typescript title="src/mathOperator.ts"
export function add(a:number, b:number):number {
  if( a < 0 || b < 0) {
    throw new Error('負の数は扱えません');
  }
  return a + b;
}
```

## 試しにテストコードを書いてみる

それでは、作成した `add()` 関数が、期待通り実装されているかを確認します。
`add()`に様々な引数を渡してみて、期待通りに動作するかを確認します。

例えば、 `1` と `2` を引数に渡すと `3` になるはずです。

```typescript title='__tests__/mathOperator.test.ts'
import {describe, test, expect} from '@jest/globals';
import {add} from '../src/mathOperator';

describe('add()のテストをします', ()=>{
  test('正の数は足し算できます 1 + 2 =3', ()=>{
    const expected = 3
    const actual = add(1, 2);
    expect(actual).toEqual(expected); 
  });
  test('正の数は足し算できます 1 + 0 =1', ()=>{
    const expected = 1
    const actual = add(1, 0);
    expect(actual).toEqual(expected); 
  });
  test('負の数があると例外です: 第一引数', ()=>{
    expect(()=>{
    add(-21, 3);
    }).toThrow();
  });
  test('負の数があると例外です: 第二引数', ()=>{
    expect(()=>{
      add(1, -1);
    }).toThrow();
  });
  test('負の数があると例外です: 両方', ()=>{
    expect(()=>{
      add(-21, -30);
    }).toThrow();
  });

});
```

| Jestの型     | 機能概要                                                                |
| ------------ | ----------------------------------------------------------------------- |
| `describe`   | 複数のテストをまとめて一塊とする関数                                    |
| `it`, `test` | テスト一件分を表す関数                                                  |
| `expect`     | テスト結果を評価して、評価の結果不正であれば例外を`throw`するメソッド |

このように、Jest の関数を呼び出すことで、実装した関数の妥当性を確認していきます。

## テストを実行してみる

```bash :no-line-numbers
npx jest
```

## Visual Studio Code をJestデバッグ環境にする
