import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme({
    sidebar: [
        {
            text: 'TypeScript開発環境の作り方',
            link: '/index.html'
        },
        {
            text: '前提となるソフトウェアをインストールする',
            link: '0.install.html'
        },
        {
            text: 'TypeScriptトランスパイル環境を作成する',
            link: '1.init-typescript.html'
        }
    ],
    sidebarDepth: 1,
  }),
  plugins: [
    prismjsPlugin({
      theme: 'ghcolors',
    }),
  ],
})
