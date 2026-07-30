<script setup>
import { CalendarDays, ChevronRight, Plus } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'
import StatusBadge from '../../../shared/components/feedback/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton label="내 구독으로" @back="emit('navigate', 'subscription')" />

    <section class="page-intro page-intro--with-action">
      <div>
        <p class="section-kicker">SUBSCRIPTION LIST</p>
        <h1>내 구독 목록</h1>
        <p>현재 이용 중인 구독과 예약된 변경 상태를 확인합니다.</p>
      </div>
      <button class="button button-primary" type="button" @click="emit('navigate', 'plans')">
        <Plus :size="18" aria-hidden="true" />
        새 플랜 보기
      </button>
    </section>

    <section class="subscription-list-card">
      <span class="subscription-list-card__icon">
        <CalendarDays :size="23" aria-hidden="true" />
      </span>
      <span>
        <small>현재 구독</small>
        <strong>
          {{ appStore.currentSubscription.planId === 'family' ? 'Family' : 'Solo' }} 플랜
        </strong>
        <p>다음 배송 2026-08-03 · 다음 결제 가격 미정</p>
      </span>
      <StatusBadge :status="appStore.isCancellationScheduled ? '해지 예정' : '이용 중'" />
      <button type="button" aria-label="구독 상세 보기" @click="emit('navigate', 'subscription')">
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </section>
  </div>
</template>
