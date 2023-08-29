import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import path from 'path'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: _resolve('./src')
      },
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/var.scss";`
      }
    }
  }
})
