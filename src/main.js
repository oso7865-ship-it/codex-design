import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from './routes'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(autoAnimatePlugin)

// import.meta.env는 Vite가 .env 파일의 값을 JavaScript에서 읽을 수 있게 제공하는 객체입니다.
// VITE_로 시작하는 값은 브라우저 번들에 포함되므로, PrimeUI처럼 공개 사용을 허용한 키만 넣어야 합니다.
const primeUiLicense = import.meta.env.VITE_PRIMEUI_LICENSE

app.use(PrimeVue, {
  unstyled: true,
  license: primeUiLicense,
})
app.use(router)

// isReady()는 새로고침한 주소에 맞는 페이지를 Vue Router가 찾을 때까지 기다립니다.
// 라우터가 준비된 뒤 앱을 연결하면 다른 페이지가 잠깐 보이는 현상을 줄일 수 있습니다.
router.isReady().then(() => {
  app.mount('#app')
})
