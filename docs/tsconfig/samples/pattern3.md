# pattern3: ESModule

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "outDir": "dist",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

## ポイント

* module: "ES2020" → ブラウザが理解できる形式。
* moduleResolution: "Bundler" → 相対パスでのモジュール解決を想定（Vite や esbuild 向け）。
* outDir: "dist" → 出力先を明示。
