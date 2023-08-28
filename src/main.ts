import { createSSRApp } from "vue"
import App from "./App.vue"
import '@/assets/styles/index.scss'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
