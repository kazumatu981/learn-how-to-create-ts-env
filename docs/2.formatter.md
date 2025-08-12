# 2. フォーマッタを有効にする

ソースコードには、空白や改行位置など、プログラマに比較的自由にゆだねられています。
しかし、これらが統一されていないとソースコードが読みづらくなります。
多くの場合、プロジェクトや個人で、それらの決まりのようなものを設けてコードを編集します。
筆者もそうですが、大体の場合そういうルールは途中で嫌になったり、細かいルールを忘れて、**ちぐはぐ**なコードを書きがちです。
こういう問題は、プログラムの動作には直接的な問題は与えないことから、 **編集的な課題 (Editorial Problem)** と呼ばれています。

編集的な問題は作りこまないほうが、問題対策や機能エンハンスの際に**読みやすくなり**、対策がはかどります。

編集的な問題を作りこむ前に摘出し、矯正してくれるのがフォーマッタです。
ここでは、TypeScriptプログラマの間でデファクトとなった  `Prettier` の導入手順を示します。

## `prettier` をインストールする

まずは、対象のプロジェクトに `NPM` パッケージの `prettier` をインストールします。
いつものように、`npm install` コマンドで `prettier` をインストールします。

```bash :no-line-numbers
npm install -D prettier
```

## `prettier` を設定する

`prettier`の設定は、以下の二つのテキストファイルからなります。

* `.prettierrc`: 書式のルールを記述するファイルです。
* `.prettierignore`: 対象外ファイルやパターンを指定します。

それぞれのファイルをプロジェクトのルートディレクトリに作成しましょう。

```text :no-line-numbers
my-project
 + dist
 + node_modules
 + src
 + .prettierignore   // [!code ++]
 + .prettierrc       // [!code ++]
 + package-lock.json
 + package.json
 + tsconfig.json
```

### `.prettierrc`の作成

`.prettierrc`では、ソースコードの書式に関するルールを記述します。
以下にサンプルを記載します。

```json title=".prettierrc"
{
    "printWidth": 100,
    "tabWidth": 4,
    "useTabs": false,
    "semi":true,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": false
}
```

それぞれ以下の意味を持ちます。

| プロパティ名     | 内容                                                       | デフォルト値 |
| ---------------- | ---------------------------------------------------------- | ------------ |
| `printWidth`     | コードの幅を指定する。                                     | `80`         |
| `tabWidth`       | タブの幅を指定する。                                       | `2`          |
| `useTabs`        | タブでインデントを行うかどうかを指定する。                 | `false`      |
| `semi`           | セミコロンを末尾に追加するかどうかを指定する。             | `true`       |
| `singleQuote`    | シングルクォーテーションで文字列を囲むかどうかを指定する。 | `true`       |
| `trailingComma`  | 文字列の末尾にカンマを追加するかどうかを指定する。         | `es5`        |
| `bracketSpacing` | ブレース内のスペースを追加するかどうかを指定する。         | `true`       |

ほかにも[多くのプロパティが存在します。](https://prettier.io/docs/options)
基本的には、デフォルトのままでも十分ですが、以下のようなプロジェクト内ルールや慣習に合わせてカスタマイズします。

* 現在の開発環境は最低でもフルHDやWQHDのディスプレイなので、コード幅は80文字では少なすぎる
* JavaScriptは慣習的にタブ幅 `2` であるが現在多くの言語のデファクトは `4` である。

::: tip
コード幅をどのぐらいにするかは、議論の余地はあります。
もちろん`80`では狭すぎますし、いくら解像度が上がったからといっても`200`は広すぎます。
`80` から `120`の間が妥当な範囲と思います。
プロジェクトに合わせて設定してください。
:::

### `.prettierignore`の作成

`.prettierignore`はフォーマッタ除外ファイルを指定します。
トランスパイル後のソースコードや参照している`npm`パッケージを勝手に修正しても意味がありません。
したがって、無視するファイルやディレクトリをこのファイルで指定します。

```text title=".prettierignore"
dist
node_modules
.prettierrc
.prettierignore
package-lock.json
package.json
```

上記サンプルは筆者がよく使う除外ルールです。

## 試しに実行してみる

ここまでで、準備は整いました。
それでは試しにフォーマッタを動作させてみましょう。

### 未フォーマットなファイルを作成してみる

まずは、対象となるソースが必要です。
ルール違反をいっぱいしているソースコード `unformatted.ts` を `src` フォルダの下に作成します。

```text :no-line-numbers
my-project              // [!code focus]
 + ...
 + node_modules
 + src                  // [!code focus]
 |  + unformatted.ts    // [!code focus] // [!code highlight]
 + .prettierignore
 + ...
```

TypeScriptとしては正しいですが、スペースや改行等がでたらめな内容のソースを作成します。

```ts title='src/unformatted.ts'
function someHeavyAction(arg1: string): Promise<number>{
const randNumber = Math.random();
return new Promise(   (resolve)=>{
    console.log('run start:' + arg1)
    setTimeout(()=>{
        console.log("finish:" + arg1)
        resolve(randNumber);
    }, 1000*randNumber);
    })
}
export function runSomeAction(
someArguments: string[])
: Promise<number[]>{
    const resultPromises = someArguments.map(arg =>{
        return someHeavyAction(arg)
    });return Promise.all(resultPromises);
}
```

### フォーマットチェックをする

それでは、プロジェクトルートで、カレントディレクトリ以下のファイルについて、フォーマットの問題を検出できることを確認します。

```bash
npx prettier . --check
```

以下のような結果になりました。

```bash
Checking formatting...
[warn] bundle.mjs
[warn] src/unformatted.ts
[warn] tsconfig.json
[warn] Code style issues found in 3 files. Run Prettier with --write to fix.
```

`unformatted.ts` に問題摘出されていることや `node_modules` 以下のファイルは一件も出力されていないことを確認してください。
このように `--check` オプションを使うと単純にフォーマットのチェックだけをします。

### フォーマットの自動修正をする

次は、フォーマットチェックをしたうえで、その問題を修正します。
以下のコマンドは、`src` 以下のファイルについて、修正するコマンドです。

```bash
npx prettier src --write
```

それでは、実行結果を見てみましょう。

::: tabs

@tab 修正前

```ts title='src/unformatted.ts'
function someHeavyAction(arg1: string): Promise<number>{
const randNumber = Math.random();
return new Promise(   (resolve)=>{
    console.log('run start:' + arg1)
    setTimeout(()=>{
        console.log("finish:" + arg1)
        resolve(randNumber);
    }, 1000*randNumber);
    })
}
export function runSomeAction(
someArguments: string[])
: Promise<number[]>{
    const resultPromises = someArguments.map(arg =>{
        return someHeavyAction(arg)
    });return Promise.all(resultPromises);
}
```

@tab 修正後

```ts title='src/unformatted.ts'
function someHeavyAction(arg1: string): Promise<number> {
    const randNumber = Math.random();
    return new Promise((resolve) => {
        console.log('run start:' + arg1);
        setTimeout(() => {
            console.log('finish:' + arg1);
            resolve(randNumber);
        }, 1000 * randNumber);
    });
}
export function runSomeAction(someArguments: string[]): Promise<number[]> {
    const resultPromises = someArguments.map((arg) => {
        return someHeavyAction(arg);
    });
    return Promise.all(resultPromises);
}
```

:::

スペースや改行位置がきれいに補正されていることがわかります。

## `npm run` コマンドを使ったフォーマットの実行 <Badge text="オプション" type="tip" vertical="top" />

それでは、`npm` コマンドからフォーマットを実行できるように設定しておきましょう。
ルートディレクトリにある `package.json` の `scripts` にフォーマット用のタスクを追加します。

```json title='package.json'
{
    // ...
    "scripts": {
        "format": "npx src --write" // [!code ++]
    }
}
```

上記のように追加しておくと下記の `npm run` コマンドでフォーマットを実行できるようになります。

```bash :no-line-numbers
npm run format
```

## VS Code の拡張機能を使ったフォーマット実行 <Badge text="オプション" type="tip" vertical="top" />

Visual Studio Codeを使えば、上記の `npm run` による実行より気軽にフォーマットを実行できるように設定できます。
Visual Studio Code には Prettierプロジェクト公式の拡張機能があります。
これをインストールして、設定を行えば、**ファイル保存時に自動でフォーマッタが実行される**ようになります。

### 拡張機能のインストール

下記リンクから Prettier 拡張機能をダウンロードおよびインストールを行ってください。

<VPCard
  title="Prettier - Code formatter"
  link="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode"
  image="https://esbenp.gallerycdn.vsassets.io/extensions/esbenp/prettier-vscode/11.0.0/1723648421534/Microsoft.VisualStudio.Services.Icons.Default"
  description="Code formatter using prettier"
/>

### 拡張機能の設定

Visual Studio Code の設定は、「ユーザ設定」と「ワークスペース設定」があります。
「ワークスペース設定」をしておくと、以下のようなメリットがあります。

* `.vscode`以下のファイルをプロジェクトメンバと共有することで設定値を共有できる。
* ほかのワークスペースの設定に影響が出ない。

その反面、ワークスペースごとに設定が必要なため、ワークスペース作成時に少し手間がかかります。

今回は、これらのメリットを享受したいので、「ワークスペース設定」とします。

以下のように、 プロジェクトのルートディレクトリに`.vscode`というフォルダとその中に、`setting.json` というファイルを作成してください。

```text :no-line-numbers
my-project              // [!code focus]
 + .vscode// [!code focus]
 |  + setting.json    // [!code focus] // [!code highlight]
 + dist
 + node_modules
 + src
 + ...
```

JSONの中身には、エディタの動作に関する設定をしてください。
「セーブ時にフォーマットを行う」、「フォーマッタにはPrettierを使う」という意味です。

```json title=".vscode/setting.json"
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

::: tip
もちろん Visual Studio Code の設定はGUIからも設定できます。
GUIから設定する場合は、上記の設定キー `editor.formatOnSave` と `editor.defaultFormatter` を検索して、設定してください。
:::

::: info
実は、この拡張機能を設定すると、`npm` パッケージの`prettier`のインストールは必要ありません。
Visual Studio Codeを使わないプロジェクトメンバや、自動ビルド用にインストールする手順としました。
:::
