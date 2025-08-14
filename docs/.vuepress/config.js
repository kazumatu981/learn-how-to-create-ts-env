import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { theme } from './theme';

export default defineUserConfig({
  bundler: viteBundler(),
  theme,
})
