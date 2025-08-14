import { hopeTheme } from "vuepress-theme-hope";

const sidebar = [
    {
        icon: 'home',
        text: 'TypeScript開発環境の作り方',
        link: '/index.html'
    },
    {
        text: '構築手順',
        children: [
            {
                icon: 'download',
                text: 'Install',
                link: '0.install.html'
            },
            {
                icon: 'language',
                text: 'Init project',
                link: '1.init-typescript.html'
            },
            {
                icon:'list-check',
                text:'formatter',
                link:'2.formatter.html'
            },
            {
                icon:'wand-magic-sparkles',
                text:'linter',
                link:'3.linter.html'
            },
            {
                icon: 'flask',
                text:'unit test',
                link:'4.unit-test.html'
            },
            {
                icon:'cubes',
                text:'bundler',
                link:'5.bundler.html'
            },
        ]
    },
    {
        text: '`tsconfig.json`の設定',
        link: '6.tsconfig/index.html'
    }
];

const markdown = {
    tabs: true,
    highlighter: {
        // 使用するハイライトライブラリを指定
        // ここではPrism.jsを使用
        type: 'prismjs',
        theme:"ghcolors",
        notationDiff: true,
        notationFocus: true,
        notationHighlight:true,
        notationWordHighlight: true,
    },
}

const plugins = {
    // アイコンの設定
    icon: {
        assets: "fontawesome-with-brands",
    },
    // コンポーネントの設定
    components: {
        components: [
            'Badge',
        ]
    },
};

export const theme = hopeTheme({
    sidebar,
    markdown,
    plugins,
});