<script setup>
import { LayoutDashboard, LogIn, Menu } from 'lucide-vue-next'

defineProps({
  currentView: {
    type: String,
    default: 'home',
  },
})

// defineEmits는 자식 컴포넌트가 부모 컴포넌트에 사건을 알리는 Vue 문법입니다.
// 이 헤더는 직접 화면을 바꾸지 않고, 메뉴 클릭 사실만 부모에게 전달합니다.
// 부모 App.vue가 받은 navigate 값을 기준으로 실제 화면을 전환합니다.
const emit = defineEmits(['navigate'])
</script>

<template>
  <header class="customer-header">
    <button
      class="brand-button"
      type="button"
      aria-label="챱챱 홈으로"
      @click="emit('navigate', 'home')"
    >
      <span class="brand-mark"><Menu :size="18" aria-hidden="true" /></span>
      <span>챱챱</span>
    </button>

    <nav class="desktop-navigation" aria-label="상단 메뉴">
      <button
        type="button"
        :class="{ 'is-active': currentView === 'menu' }"
        @click="emit('navigate', 'menu')"
      >
        메뉴
      </button>
      <button
        type="button"
        :class="{ 'is-active': currentView === 'plans' }"
        @click="emit('navigate', 'plans')"
      >
        플랜
      </button>
      <button
        type="button"
        :class="{ 'is-active': currentView === 'subscription' }"
        @click="emit('navigate', 'subscription')"
      >
        내 구독
      </button>
      <button
        type="button"
        :class="{ 'is-active': currentView === 'mypage' }"
        @click="emit('navigate', 'mypage')"
      >
        마이
      </button>
    </nav>

    <div class="header-actions">
      <button
        class="header-auth-button"
        type="button"
        aria-label="로그인 화면으로"
        @click="emit('navigate', 'wf-002')"
      >
        <LogIn :size="17" aria-hidden="true" />
        <span>로그인</span>
      </button>
      <button
        class="header-admin-button"
        type="button"
        aria-label="관리자 화면으로"
        @click="emit('navigate', 'admin')"
      >
        <LayoutDashboard :size="17" aria-hidden="true" />
        <span>관리자</span>
      </button>
    </div>
  </header>
</template>
