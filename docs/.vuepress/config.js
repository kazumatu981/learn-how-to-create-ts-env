import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { theme } from './theme';

export default defineUserConfig({
  // Site configuration
  base: '/learn-how-to-create-ts-env/',
  lang: 'ja-JP',
  title: 'TypeScript開発環境の作り方',
  description: 'TypeScriptの開発環境を構築するためのガイドです。',
  // Theme Config
  theme,
  // Bundler configuration
  bundler: viteBundler(),
  // Common configuration
  dest: './dist',
  temp: './.temp',
  cache: './.cache',
})
