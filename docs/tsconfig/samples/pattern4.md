# pattern4: 

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "outDir": "dist",
    "moduleResolution": "Bundler",
    "isolatedModules": true,
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

## ポイント

* `noEmit: true`: TypeScript は型チェックのみ、出力は esbuild に任せる。
* `isolatedModules: true`: esbuild との互換性を高める。
* `module: "ESNext"`: esbuild が最適な形式に変換する前提。
