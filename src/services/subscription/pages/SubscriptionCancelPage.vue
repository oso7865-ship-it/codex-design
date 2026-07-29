<script setup>
import { ref } from 'vue'
import { CalendarCheck, CheckCircle2, ChevronLeft } from 'lucide-vue-next'
import { formatDeliveryDate } from '../../../utils/date'
import { useAppStore } from '../../../stores/useAppStore'

const appStore = useAppStore()
const emit = defineEmits(['navigate'])

const hasConfirmed = ref(false)
const isComplete = ref(false)

function confirmCancellation() {
  if (!hasConfirmed.value) {
    return
  }

  appStore.scheduleCancellation()
  isComplete.value = true
}
</script>

<template>
  <div class="page management-page">
    <button class="back-button" type="button" @click="emit('navigate', 'subscription')">
      <ChevronLeft :size="18" aria-hidden="true" />
      내 구독으로
    </button>

    <section v-if="!isComplete" class="page-intro">
      <p class="section-kicker">CANCEL SUBSCRIPTION</p>
      <h1>구독 해지 전<br />꼭 확인해주세요.</h1>
      <p>해지는 현재 이용 중인 기간을 즉시 종료하지 않습니다.</p>
    </section>

    <section v-if="!isComplete" class="cancel-summary-card">
      <CalendarCheck :size="28" aria-hidden="true" />
      <div>
        <span>현재 이용 종료 예정일</span>
        <strong
          >{{ formatDeliveryDate(appStore.currentSubscription.dates.nextPayment) }} 전까지
          이용</strong
        >
        <p>다음 정기결제부터 결제 및 새 회차 생성이 중단됩니다.</p>
      </div>
    </section>

    <label v-if="!isComplete" class="confirmation-check">
      <input v-model="hasConfirmed" type="checkbox" />
      <span>
        <strong>해지 기준을 확인했습니다.</strong>
        <small>현재 이용 기간은 유지되고 다음 결제부터 중단되는 것에 동의합니다.</small>
      </span>
    </label>

    <section v-if="isComplete" class="management-result" role="status">
      <span class="management-result__icon">
        <CheckCircle2 :size="34" aria-hidden="true" />
      </span>
      <p class="section-kicker">CANCELLATION SCHEDULED</p>
      <h1>구독 해지가 예약되었습니다.</h1>
      <p>현재 이용 기간이 끝난 뒤 다음 정기결제부터 청구되지 않습니다.</p>
      <button class="button button-primary" type="button" @click="emit('navigate', 'subscription')">
        내 구독으로 돌아가기
      </button>
    </section>

    <div v-if="!isComplete" class="mobile-action-bar mobile-action-bar--danger">
      <div>
        <span>다음 결제</span>
        <strong>결제 중단 예정</strong>
      </div>
      <button
        class="button button-danger"
        type="button"
        :disabled="!hasConfirmed"
        @click="confirmCancellation"
      >
        구독 해지 예약하기
      </button>
    </div>
  </div>
</template>
