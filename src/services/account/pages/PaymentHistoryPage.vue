<script setup>
import { ChevronRight, ReceiptText } from 'lucide-vue-next'
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
      <p class="section-kicker">PAYMENT HISTORY</p>
      <h1>결제 내역을 확인해요.</h1>
      <p>가격이 확정되기 전까지 결제 금액은 ‘가격 미정’으로 표시합니다.</p>
    </section>

    <section class="history-list" aria-label="결제 내역">
      <button
        v-for="payment in appStore.paymentHistory"
        :key="payment.id"
        class="history-list-item"
        type="button"
        @click="emit('navigate', 'wf-032')"
      >
        <span class="history-list-item__icon">
          <ReceiptText :size="20" aria-hidden="true" />
        </span>
        <span class="history-list-item__main">
          <span>
            <strong>{{ payment.description }}</strong>
            <small>{{ payment.paidAt }} · {{ payment.paymentMethod }}</small>
          </span>
          <span class="history-list-item__aside">
            <StatusBadge :status="payment.status" />
            <b>{{ payment.amountLabel }}</b>
          </span>
        </span>
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </section>
  </div>
</template>
