import { hopeTheme } from "vuepress-theme-hope";

const sidebar = [
    {
        icon: 'home',
        text: 'TypeScript開発環境の作り方',
        link: '/index.html'
    },
    {
        text: '構築手順',
        link: '/process/index.html',
        children: [
            {
                icon: 'download',
                text: 'Install',
                link: '/process/0.install.html'
            },
            {
                icon: 'language',
                text: 'Init project',
                link: '/process/1.init-typescript.html'
            },
            {
                icon:'list-check',
                text:'formatter',
                link:'/process/2.formatter.html'
            },
            {
                icon:'wand-magic-sparkles',
                text:'linter',
                link:'/process/3.linter.html'
            },
            {
                icon: 'flask',
                text:'unit test',
                link:'/process/4.unit-test.html'
            },
            {
                icon:'cubes',
                text:'bundler',
                link:'/process/5.bundler.html'
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