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
app.use(PrimeVue, { unstyled: true })
app.use(router)

// isReady는 새로고침한 주소의 페이지를 찾을 때까지 기다리는 Vue Router 기능입니다.
// 관리자 주소에서 고객 화면이 잠깐 보이지 않도록 준비가 끝난 뒤 앱을 그립니다.
router.isReady().then(() => {
  app.mount('#app')
})
