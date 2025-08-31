import { hopeTheme } from "vuepress-theme-hope";

const sidebar = [
    {
        icon: 'home',
        text: 'TypeScript開発環境の作り方',
        link: '/index.html'
    },
    {
        icon: 'person-biking',
        text: '基本環境の構築',
        link: '/basic/index.html',
        children: [
            {
                icon: 'download',
                text: 'Install',
                link: '/basic/install.html'
            },
            {
                icon: 'language',
                text: 'Init project',
                link: '/basic/init-typescript.html'
            },
            {
                icon:'cubes',
                text:'Bundler',
                link:'/basic/bundler.html'
            },
        ]
    },
    {
        icon: 'rocket',
        text: 'より良い環境を目指して',
        link: '/advanced/index.html',
        children: [
            {
                icon:'list-check',
                text:'Formatter',
                link:'/advanced/formatter.html'
            },
            {
                icon:'wand-magic-sparkles',
                text:'Linter',
                link:'/advanced/linter.html'
            },
            {
                icon: 'flask',
                text:'Unit test',
                link:'/advanced/unit-test.html'
            },
        ]
    },
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