# `tsconfig.json` の書き方について

TypeScriptにおける翻訳(トランスパイル)の動作は `tsconfig.json` によって大きく動作が異なります。
特に、 `target`, `module`, `moduleResolution` は、出力される JavaScript の形式やモジュールの解決方法に大きく関わる重要なオプションです。
それぞれの意味と使い分けを、以下にわかりやすく整理しました。

---

## 🎯 `target`: 出力する JavaScript のバージョン

これは TypeScript がコンパイルした後の **JavaScript の言語レベル**を指定します。

| 値                     | 説明                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------- |
| `"ES5"`                | 古いブラウザ向け。`var` や `function` ベース。                                        |
| `"ES6"` / `"ES2015"`   | `let`, `const`, `arrow function`, `class` などが使える。                              |
| `"ES2017"`〜`"ES2022"` | `async/await`, `Object.entries`, `optional chaining` など、よりモダンな構文が使える。 |
| `"ESNext"`             | 最新の ECMAScript 機能をそのまま出力。esbuild や Vite などのモダンツール向け。        |

**選び方のヒント**:
- 古い環境（IEなど）をサポート → `"ES5"`
- Node.js やモダンブラウザ → `"ES2020"` 以上
- esbuild/Vite で後処理 → `"ESNext"`

---

## 📦 `module`: モジュールの形式（import/export の扱い）

これは TypeScript が出力する **モジュールの仕組み**を指定します。

| 値             | 説明 |
|----------------|------|
| `"CommonJS"`   | Node.js の `require()` ベース。npm ライブラリやサーバーサイド向け。 |
| `"ES6"` / `"ES2015"` / `"ES2020"` / `"ESNext"` | `import`/`export` をそのまま使う。ブラウザやモダンツール向け。 |
| `"UMD"`        | CommonJS + AMD の両対応。CDN 配信ライブラリ向け。 |
| `"System"`     | SystemJS 用。あまり使われない。 |

**選び方のヒント**:
- Node.js ライブラリ → `"CommonJS"`
- ブラウザや esbuild/Vite → `"ESNext"` または `"ES2020"`
- 汎用ライブラリ（CDN対応） → `"UMD"`

---

## 🔍 `moduleResolution`: モジュールの解決方法

これは `import` されたファイルを **どう探すか**を指定します。

| 値             | 説明 |
|----------------|------|
| `"Node"`       | Node.js のように `node_modules` や `index.ts` を探す。npm ライブラリ向け。 |
| `"Classic"`    | 古い TypeScript の解決方法。非推奨。 |
| `"Bundler"`    | Vite や esbuild 向け。相対パス中心で、`node_modules` を直接見ない。 |
| `"NodeNext"`   | Node.js の ES Modules 対応（`.mts`, `.cts` など）。 |

**選び方のヒント**:
- npm ライブラリ → `"Node"`
- esbuild/Vite → `"Bundler"`
- Node.js の ES Modules 対応 → `"NodeNext"`

---

## 🧠 まとめ：組み合わせ例

| 用途 | `target` | `module` | `moduleResolution` |
|------|----------|----------|---------------------|
| npm ライブラリ（CommonJS） | `"ES2017"` | `"CommonJS"` | `"Node"` |
| npm ライブラリ（ESM） | `"ES2020"` | `"ESNext"` | `"Node"` |
| ブラウザ（type=module） | `"ES2020"` | `"ES2020"` | `"Bundler"` |
| esbuild バンドル前提 | `"ESNext"` | `"ESNext"` | `"Bundler"` |

