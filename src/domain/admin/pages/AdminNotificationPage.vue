<script setup>
import { AlertTriangle, CreditCard, PackageX, Warehouse } from 'lucide-vue-next'
import AdminSidebar from '../components/AdminSidebar.vue'

const emit = defineEmits(['navigate'])

const alerts = [
  {
    id: 1,
    icon: PackageX,
    level: '긴급',
    title: '8월 3일 배송 2건의 주소 확인이 필요합니다.',
    description: '주소 누락 또는 공동현관 정보가 없는 주문을 확인해 주세요.',
    action: '배송 목록 보기',
    route: 'wf-049',
  },
  {
    id: 2,
    icon: CreditCard,
    level: '확인',
    title: '정기결제 실패 5건이 발생했습니다.',
    description: '재결제 대상과 고객 안내 상태를 확인해 주세요.',
    action: '결제 목록 보기',
    route: 'wf-047',
  },
  {
    id: 3,
    icon: Warehouse,
    level: '주의',
    title: '단호박 소불고기 도시락 재고가 부족합니다.',
    description: '다음 회차 공개 수량과 대체 메뉴를 검토해 주세요.',
    action: '재고 관리 보기',
    route: 'wf-039',
  },
]
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar current-route="admin-notifications" @navigate="emit('navigate', $event)" />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="section-kicker">OPERATION ALERTS</p>
          <h1>운영 알림</h1>
          <p>배송, 결제, 재고에서 먼저 확인해야 할 항목입니다.</p>
        </div>
      </header>

      <aside class="admin-security-notice">
        <AlertTriangle :size="18" aria-hidden="true" />
        <p>현재 알림은 화면 구성을 위한 예시이며 실제 운영 데이터는 서버에서 제공되어야 합니다.</p>
      </aside>

      <section class="admin-alert-list">
        <article v-for="alert in alerts" :key="alert.id">
          <span class="admin-alert-list__icon">
            <component :is="alert.icon" :size="21" aria-hidden="true" />
          </span>
          <div>
            <small>{{ alert.level }}</small>
            <h2>{{ alert.title }}</h2>
            <p>{{ alert.description }}</p>
          </div>
          <button class="admin-outline-button" type="button" @click="emit('navigate', alert.route)">
            {{ alert.action }}
          </button>
        </article>
      </section>
    </main>
  </div>
</template>
