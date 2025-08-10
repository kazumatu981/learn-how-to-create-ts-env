# pattern1: CommonJSライブラリ

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

## ポイント

* `module: "CommonJS"`: Node.js の require() に対応。
* `declaration: true`: .d.ts ファイルを生成して型定義を提供。
* `esModuleInterop: true`: import でも require スタイルのモジュールを扱えるように。
