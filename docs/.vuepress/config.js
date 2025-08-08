import { viteBundler } from '@vuepress/bundler-vite'
// import { defaultTheme } from '@vuepress/theme-default'
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: hopeTheme({
    sidebar: [
        {
            text: 'TypeScript開発環境の作り方',
            link: '/index.html'
        },
        {
            text: '構築手順',
            children: [
                {
                    text: '0.前提となるソフトウェアをインストールする',
                    link: '0.install.html'
                },
                {
                    text: '1.TypeScriptトランスパイル環境を作成する',
                    link: '1.init-typescript.html'
                },
                {
                    text:'2. フォーマッタを有効にする',
                    link:'2.formatter.html'
                }
            ]
        }
    ],
    sidebarDepth: 1,
  }),

})
