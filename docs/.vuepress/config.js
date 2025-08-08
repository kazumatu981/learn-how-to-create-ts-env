import { viteBundler } from '@vuepress/bundler-vite'
// import { defaultTheme } from '@vuepress/theme-default'
import { hopeTheme } from "vuepress-theme-hope";
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: hopeTheme({
    sidebar: [
        {
            icon: 'home',
            text: 'TypeScript開発環境の作り方',
            link: '/index.html'
        },
        {
            icon:"rocket",
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
                }
            ]
        }
    ],
    plugins:{
        icon:{
            assets: "fontawesome-with-brands",
        }
    },
    sidebarDepth: 1,
  }),

})
