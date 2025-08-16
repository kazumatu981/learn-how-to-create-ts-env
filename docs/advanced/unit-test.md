# テストフレームワークを有効にする

## Jest実行環境をインストールする

```bash :no-line-numbers
npm install -D jest ts-jest
```

## Jest実行環境を設定する

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

## Jestの型情報をインストール

```bash :no-line-numbers
npm install -D @types/jest @jest/globals
```

## 試しにテストコードを書いてみる

## テストを実行してみる

## Visual Studio Code をJestデバッグ環境にする
