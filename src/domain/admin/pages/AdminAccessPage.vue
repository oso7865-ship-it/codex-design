<script setup>
import { ref } from 'vue'
import { KeyRound, LockKeyhole, ShieldAlert } from 'lucide-vue-next'

const props = defineProps({
  mode: {
    type: String,
    default: 'login',
  },
})

const emit = defineEmits(['navigate'])
const email = ref('')
const password = ref('')

const stateMessages = {
  denied: {
    icon: ShieldAlert,
    kicker: 'ACCESS DENIED',
    title: '관리자 권한이 필요합니다.',
    description: '권한이 있는 운영 계정으로 다시 로그인해 주세요.',
  },
  expired: {
    icon: LockKeyhole,
    kicker: 'SESSION EXPIRED',
    title: '로그인 시간이 만료되었습니다.',
    description: '안전한 운영을 위해 관리자 로그인이 다시 필요합니다.',
  },
}

function submitLogin() {
  // 실제 서비스에서는 서버가 관리자 권한을 확인한 뒤 대시보드로 이동시켜야 합니다.
  emit('navigate', 'admin')
}
</script>

<template>
  <main class="admin-access-page">
    <section v-if="props.mode === 'login'" class="admin-access-card">
      <span class="admin-access-card__mark"><KeyRound :size="24" aria-hidden="true" /></span>
      <p class="section-kicker">CHAPCHAP ADMIN</p>
      <h1>관리자 로그인</h1>
      <p>운영 권한이 있는 계정으로 로그인해 주세요.</p>

      <form class="admin-login-form" @submit.prevent="submitLogin">
        <!-- v-model은 입력값과 JavaScript 변수를 서로 연결하는 Vue 문법입니다. -->
        <label>
          관리자 이메일
          <input v-model.trim="email" type="email" autocomplete="username" required />
        </label>
        <label>
          비밀번호
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>
        <button class="button button-primary" type="submit">관리자 화면으로</button>
      </form>

      <button class="text-button" type="button" @click="emit('navigate', 'home')">
        고객 화면으로 돌아가기
      </button>
    </section>

    <section v-else class="admin-access-card admin-access-card--state">
      <span class="admin-access-card__mark">
        <component :is="stateMessages[props.mode].icon" :size="24" aria-hidden="true" />
      </span>
      <p class="section-kicker">{{ stateMessages[props.mode].kicker }}</p>
      <h1>{{ stateMessages[props.mode].title }}</h1>
      <p>{{ stateMessages[props.mode].description }}</p>
      <button class="button button-primary" type="button" @click="emit('navigate', 'admin-login')">
        관리자 로그인
      </button>
    </section>
  </main>
</template>
