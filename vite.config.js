import {
    defineConfig
  } from 'vite'
  import vue from '@vitejs/plugin-vue'
  const {
    resolve
  } = require('path')
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [vue()],
    base: "./",
    build: {
      outDir: "docs"
    },
    server: {
      port: 9999,
      open: true,
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx", ".vue"],
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components')
      }
    }
  })