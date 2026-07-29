<script setup>
import { ChevronRight, PackageCheck } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'
import StatusBadge from '../../../shared/components/ui/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton @back="emit('navigate', 'mypage')" />

    <section class="page-intro">
      <p class="section-kicker">DELIVERY HISTORY</p>
      <h1>배송 내역을 확인해요.</h1>
      <p>가장 최근 회차부터 배송 상태와 도착 정보를 보여드립니다.</p>
    </section>

    <section class="history-list" aria-label="배송 내역">
      <button
        v-for="delivery in appStore.deliveryHistory"
        :key="delivery.id"
        class="history-list-item"
        type="button"
        @click="emit('navigate', 'wf-034')"
      >
        <span class="history-list-item__icon">
          <PackageCheck :size="20" aria-hidden="true" />
        </span>
        <span class="history-list-item__main">
          <span>
            <strong>{{ delivery.addressName }} 배송</strong>
            <small>{{ delivery.deliveryDate }} · 메뉴 {{ delivery.menuCount }}개</small>
          </span>
          <span class="history-list-item__aside">
            <StatusBadge :status="delivery.status" />
            <b>{{ delivery.addressName }}</b>
          </span>
        </span>
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </section>
  </div>
</template>
