<script setup>
import { BellRing, CalendarClock, CreditCard, PackageCheck } from 'lucide-vue-next'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'

const emit = defineEmits(['navigate'])

const notifications = [
  {
    id: 1,
    icon: PackageCheck,
    title: '다음 배송이 준비되고 있어요.',
    description: '8월 3일 배송 메뉴 3개가 주문 마감되었습니다.',
    date: '오늘',
    isNew: true,
  },
  {
    id: 2,
    icon: CalendarClock,
    title: '메뉴 변경 마감이 가까워요.',
    description: '8월 10일 회차는 8월 8일 오후 6시까지 변경할 수 있어요.',
    date: '어제',
    isNew: true,
  },
  {
    id: 3,
    icon: CreditCard,
    title: '정기결제가 완료되었어요.',
    description: '결제 금액과 사용한 결제 수단은 결제 내역에서 확인할 수 있어요.',
    date: '7월 26일',
    isNew: false,
  },
]
</script>

<template>
  <div class="page management-page">
    <PageBackButton @back="emit('navigate', 'mypage')" />

    <section class="page-intro">
      <p class="section-kicker">NOTIFICATIONS</p>
      <h1>알림함</h1>
      <p>배송, 결제, 구독 변경과 관련된 중요한 소식을 모아 보여드려요.</p>
    </section>

    <section class="notification-list" aria-label="고객 알림 목록">
      <article
        v-for="notification in notifications"
        :key="notification.id"
        :class="{ 'is-new': notification.isNew }"
      >
        <span class="notification-list__icon">
          <component :is="notification.icon" :size="20" aria-hidden="true" />
        </span>
        <div>
          <strong>{{ notification.title }}</strong>
          <p>{{ notification.description }}</p>
        </div>
        <time>{{ notification.date }}</time>
      </article>
    </section>

    <aside class="notice-box notice-box--info">
      <BellRing :size="19" aria-hidden="true" />
      <div>
        <strong>알림 데이터 연결 예정</strong>
        <p>현재 내용은 화면 배치를 확인하기 위한 예시이며 실제 알림은 서버에서 제공됩니다.</p>
      </div>
    </aside>
  </div>
</template>
