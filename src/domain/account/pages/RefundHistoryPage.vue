<script setup>
import { useAppStore } from '../../../stores/useAppStore'
import EmptyState from '../../../shared/components/feedback/EmptyState.vue'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'
import StatusBadge from '../../../shared/components/feedback/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton @back="emit('navigate', 'mypage')" />

    <section class="page-intro">
      <p class="section-kicker">REFUND HISTORY</p>
      <h1>환불 내역을 확인해요.</h1>
      <p>환불 정책이 확정되기 전까지 상담 채팅을 통해 요청을 접수합니다.</p>
    </section>

    <section v-if="appStore.refundHistory.length" class="history-list">
      <div
        v-for="refund in appStore.refundHistory"
        :key="refund.id"
        class="history-list-item history-list-item--static"
      >
        <span class="history-list-item__main">
          <span>
            <strong>{{ refund.title }}</strong>
            <small>{{ refund.date }}</small>
          </span>
          <StatusBadge :status="refund.status" />
        </span>
      </div>
    </section>

    <EmptyState
      v-else
      title="아직 환불 내역이 없어요."
      description="환불이 필요하다면 상담 채팅에서 주문 정보를 확인한 뒤 안내받을 수 있어요."
      action-label="환불 상담 시작"
      @action="emit('navigate', 'wf-036')"
    />
  </div>
</template>
