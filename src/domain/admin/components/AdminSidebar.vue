<script setup>
const emit = defineEmits(['navigate'])

const groups = [
  {
    label: '대시보드',
    items: [
      { label: '운영 현황', route: 'admin' },
      { label: '운영 알림', route: 'admin-notifications' },
    ],
  },
  {
    label: '상품 운영',
    items: [
      { label: '메뉴 운영', route: 'wf-037' },
      { label: '재고 관리', route: 'wf-039' },
      { label: '배송 설정', route: 'wf-042' },
    ],
  },
  {
    label: '구독 운영',
    items: [
      { label: '구독 목록', route: 'wf-043' },
      { label: '회차 목록', route: 'wf-045' },
      { label: '결제 목록', route: 'wf-047' },
      { label: '배송 목록', route: 'wf-049' },
      { label: '환불 요청', route: 'wf-051' },
    ],
  },
  {
    label: '기록',
    items: [{ label: '감사 이력', route: 'wf-053' }],
  },
]

defineProps({
  currentRoute: {
    type: String,
    default: 'admin',
  },
})
</script>

<template>
  <aside class="admin-sidebar">
    <button class="admin-brand" type="button" @click="emit('navigate', 'admin')">
      챱챱
      <span>ADMIN</span>
    </button>

    <nav aria-label="관리자 메뉴">
      <div v-for="group in groups" :key="group.label" class="admin-nav-group">
        <small>{{ group.label }}</small>
        <button
          v-for="item in group.items"
          :key="item.route"
          type="button"
          :class="{ 'is-active': currentRoute === item.route }"
          @click="emit('navigate', item.route)"
        >
          {{ item.label }}
        </button>
      </div>
    </nav>

    <button class="admin-back-link" type="button" @click="emit('navigate', 'home')">
      고객 화면으로
    </button>
  </aside>
</template>
