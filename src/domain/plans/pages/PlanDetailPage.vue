<script setup>
import { computed } from 'vue'
import { CalendarCheck, ChevronRight, Info, RefreshCcw } from 'lucide-vue-next'
import { planDetails } from '../../../shared/mocks/prototypeData'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'

const props = defineProps({
  planId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
const plan = computed(() => planDetails[props.planId])

function choosePlan() {
  appStore.beginSubscriptionApplication(plan.value.id)
  emit('navigate', 'wf-013')
}
</script>

<template>
  <div class="page plan-detail-page">
    <PageBackButton label="플랜 목록으로" @back="emit('navigate', 'plans')" />

    <section class="plan-detail-hero">
      <div>
        <h1>{{ plan.name }}</h1>
        <p>{{ plan.description }}</p>
        <div class="plan-detail-price">
          <span>정기 구독 가격</span>
          <strong>가격 미정</strong>
          <small>배송비 미정 · 결제 전 서버 견적 기준</small>
        </div>
        <button class="button button-primary" type="button" @click="choosePlan">
          {{ plan.name }} 선택
          <ChevronRight :size="18" aria-hidden="true" />
        </button>
      </div>
      <div class="photo-placeholder photo-placeholder--large">[사진이 필요한 곳입니다.]</div>
    </section>

    <section class="plan-detail-grid">
      <article>
        <CalendarCheck :size="23" aria-hidden="true" />
        <strong>{{ plan.cycle }}</strong>
        <p>{{ plan.minimum }}</p>
      </article>
      <article>
        <RefreshCcw :size="23" aria-hidden="true" />
        <strong>다음 결제부터 변경</strong>
        <p>현재 이용 기간과 확정된 회차는 유지합니다.</p>
      </article>
    </section>

    <section class="plan-benefit-section">
      <div>
        <h2>플랜에 포함되는 기능</h2>
      </div>
      <ul>
        <li v-for="benefit in plan.benefits" :key="benefit">{{ benefit }}</li>
      </ul>
    </section>

    <aside class="notice-box notice-box--info">
      <Info :size="20" aria-hidden="true" />
      <div>
        <strong>가격과 배송 가능 여부</strong>
        <p>플랜 가격·배송비·주소별 배송 가능 여부는 신청 과정에서 서버 응답으로 확정합니다.</p>
      </div>
    </aside>
  </div>
</template>
