<script setup>
import { CircleAlert, Home, RotateCcw } from 'lucide-vue-next'

const props = defineProps({
  state: {
    type: String,
    default: 'not-found',
  },
})

const emit = defineEmits(['navigate'])

const states = {
  'not-found': {
    kicker: '404',
    title: '요청한 페이지를 찾을 수 없어요.',
    description: '주소가 변경되었거나 더 이상 제공하지 않는 페이지일 수 있어요.',
  },
  error: {
    kicker: 'SERVICE ERROR',
    title: '화면을 불러오지 못했어요.',
    description: '잠시 후 다시 시도해 주세요. 문제가 계속되면 고객지원으로 알려 주세요.',
  },
}
</script>

<template>
  <div class="system-state-page">
    <CircleAlert :size="34" aria-hidden="true" />
    <p class="section-kicker">{{ states[props.state].kicker }}</p>
    <h1>{{ states[props.state].title }}</h1>
    <p>{{ states[props.state].description }}</p>
    <div class="system-state-page__actions">
      <button class="button button-primary" type="button" @click="emit('navigate', 'home')">
        <Home :size="18" aria-hidden="true" />
        홈으로
      </button>
      <button
        class="button button-outline"
        type="button"
        @click="emit('navigate', 'customer-support')"
      >
        <RotateCcw :size="18" aria-hidden="true" />
        고객지원
      </button>
    </div>
  </div>
</template>
