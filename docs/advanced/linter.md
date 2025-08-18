# 静的解析を有効にする

## `eslint`, `typescript-eslint` をインストールする

```bash :no-line-numbers
npm install --save-dev eslint @eslint/js typescript-eslint
```

## 設定をする

```text :no-line-numbers
my-project
 + node_modules
 + src
 + eslint.config.mjs // [!code ++]
 + package-lock.json
 + package.json
 + tsconfig.json
```

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
