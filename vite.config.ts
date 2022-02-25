import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      template: {  transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/renderer/styles/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/renderer') },
      { find: '@main', replacement: path.resolve(__dirname, 'src/main') },
    ],
  },
})
