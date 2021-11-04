import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  // base: process.env.ELECTRON == 'true' ? './' : '.',
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/renderer') },
      { find: '@main', replacement: path.resolve(__dirname, 'src/main') },
    ],
  },
})
