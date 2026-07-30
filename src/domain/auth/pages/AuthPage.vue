<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-vue-next'

const props = defineProps({
  pageId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['navigate'])
const showPassword = ref(false)
const isSubmitted = ref(false)

const pages = {
  '002': {
    kicker: 'WELCOME BACK',
    title: '챱챱에 로그인해요.',
    description: '구독과 다음 배송 일정을 이어서 관리할 수 있어요.',
    fields: [
      { id: 'email', label: '이메일', type: 'email', autocomplete: 'email' },
      { id: 'password', label: '비밀번호', type: 'password', autocomplete: 'current-password' },
    ],
    action: '로그인',
    next: 'home',
    helper: '계정이 없으신가요?',
    helperAction: '회원가입',
    helperTarget: 'wf-003',
    social: true,
  },
  '003': {
    kicker: 'CREATE ACCOUNT',
    title: '챱챱을 시작해요.',
    description: '배송과 결제 안내를 받을 기본 정보를 입력해 주세요.',
    fields: [
      { id: 'name', label: '이름', type: 'text', autocomplete: 'name' },
      { id: 'email', label: '이메일', type: 'email', autocomplete: 'email' },
      { id: 'password', label: '비밀번호', type: 'password', autocomplete: 'new-password' },
    ],
    action: '회원가입',
    next: 'wf-007',
    helper: '이미 계정이 있으신가요?',
    helperAction: '로그인',
    helperTarget: 'wf-002',
  },
  '004': {
    kicker: 'FIND PASSWORD',
    title: '비밀번호를 다시 설정해요.',
    description: '가입한 이메일로 재설정 안내를 보내드립니다.',
    fields: [{ id: 'email', label: '이메일', type: 'email', autocomplete: 'email' }],
    action: '재설정 메일 보내기',
    next: 'wf-005',
  },
  '005': {
    kicker: 'RESET PASSWORD',
    title: '새 비밀번호를 입력해요.',
    description: '다른 서비스에서 사용하지 않는 비밀번호를 권장합니다.',
    fields: [
      { id: 'password', label: '새 비밀번호', type: 'password', autocomplete: 'new-password' },
      {
        id: 'password-confirm',
        label: '새 비밀번호 확인',
        type: 'password',
        autocomplete: 'new-password',
      },
    ],
    action: '비밀번호 변경',
    next: 'wf-002',
  },
  '006': {
    kicker: 'CONNECT ACCOUNT',
    title: '소셜 계정을 연결해요.',
    description: '기존 챱챱 구독을 유지하면서 더 편하게 로그인할 수 있어요.',
    fields: [{ id: 'email', label: '챱챱 가입 이메일', type: 'email', autocomplete: 'email' }],
    action: '기존 계정 확인',
    next: 'wf-007',
    social: true,
  },
  '007': {
    kicker: 'MORE INFORMATION',
    title: '가입 정보를 완성해요.',
    description: '배송 안내에 필요한 정보만 추가로 확인합니다.',
    fields: [
      { id: 'name', label: '이름', type: 'text', autocomplete: 'name' },
      { id: 'phone', label: '휴대폰 번호', type: 'tel', autocomplete: 'tel' },
    ],
    action: '가입 완료',
    next: 'home',
  },
}

// computed는 현재 pageId에 맞는 화면 설정을 자동으로 골라 줍니다.
const page = computed(() => pages[props.pageId])

function submitForm() {
  isSubmitted.value = true
}

function continueAfterSubmit() {
  emit('navigate', page.value.next)
}
</script>

<template>
  <div class="page auth-page">
    <section class="auth-card">
      <div class="auth-card__intro">
        <p class="section-kicker">{{ page.kicker }}</p>
        <h1>{{ page.title }}</h1>
        <p>{{ page.description }}</p>
      </div>

      <div v-if="isSubmitted" class="auth-result" role="status">
        <span><ShieldCheck :size="30" aria-hidden="true" /></span>
        <strong>예시 화면에서 요청을 확인했어요.</strong>
        <p>실제 인증 결과는 서버 응답을 받은 뒤 다음 화면으로 이동해야 합니다.</p>
        <button class="button button-primary" type="button" @click="continueAfterSubmit">
          다음 화면 보기
          <ArrowRight :size="18" aria-hidden="true" />
        </button>
      </div>

      <form v-else class="auth-form" @submit.prevent="submitForm">
        <label v-for="field in page.fields" :key="field.id" class="form-field">
          <span>{{ field.label }}</span>
          <span class="password-input">
            <input
              :id="field.id"
              :type="field.type === 'password' && showPassword ? 'text' : field.type"
              :autocomplete="field.autocomplete"
              required
            />
            <button
              v-if="field.type === 'password'"
              type="button"
              :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" :size="18" aria-hidden="true" />
              <Eye v-else :size="18" aria-hidden="true" />
            </button>
          </span>
        </label>

        <button
          v-if="pageId === '002'"
          class="auth-forgot-link"
          type="button"
          @click="emit('navigate', 'wf-004')"
        >
          비밀번호를 잊으셨나요?
        </button>

        <button class="button button-primary auth-primary-action" type="submit">
          {{ page.action }}
        </button>

        <template v-if="page.social">
          <div class="auth-divider"><span>또는</span></div>
          <div class="social-login-grid">
            <button class="social-login-button social-login-button--google" type="button">
              G
              <span>Google로 계속</span>
            </button>
            <button class="social-login-button social-login-button--kakao" type="button">
              K
              <span>카카오로 계속</span>
            </button>
          </div>
        </template>
      </form>

      <p v-if="page.helper" class="auth-helper">
        {{ page.helper }}
        <button type="button" @click="emit('navigate', page.helperTarget)">
          {{ page.helperAction }}
        </button>
      </p>

      <p class="form-help">실제 로그인과 소셜 계정 연결은 인증 서버 연동 후 사용할 수 있습니다.</p>
    </section>
  </div>
</template>
