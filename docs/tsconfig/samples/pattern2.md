# pattern2: ESModule

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true,
    "outDir": "dist",
    "moduleResolution": "Node",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

## ポイント

* `module: "ESNext"`: import/export をそのまま維持。
* `moduleResolution: "Node"`: npm ライブラリとしての解決方法。
* `declaration: true`: 型定義を提供。
