<script setup>
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'
import StatusBadge from '../../../shared/components/feedback/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton label="결제 내역으로" @back="emit('navigate', 'wf-031')" />

    <section class="page-intro">
      <p class="section-kicker">PAYMENT DETAIL</p>
      <h1>결제 상세</h1>
      <p>결제 번호 {{ appStore.selectedPayment.id }}</p>
    </section>

    <section class="detail-card">
      <div class="detail-card__heading">
        <strong>{{ appStore.selectedPayment.description }}</strong>
        <StatusBadge :status="appStore.selectedPayment.status" />
      </div>
      <dl class="detail-list">
        <div>
          <dt>결제일</dt>
          <dd>{{ appStore.selectedPayment.paidAt }}</dd>
        </div>
        <div>
          <dt>결제 수단</dt>
          <dd>{{ appStore.selectedPayment.paymentMethod }}</dd>
        </div>
        <div>
          <dt>상품 금액</dt>
          <dd>{{ appStore.selectedPayment.amountLabel }}</dd>
        </div>
        <div>
          <dt>배송비</dt>
          <dd>미정</dd>
        </div>
        <div class="detail-list__total">
          <dt>최종 결제 금액</dt>
          <dd>가격 미정</dd>
        </div>
      </dl>
    </section>

    <aside class="notice-box notice-box--info">
      <div>
        <strong>가격 표시는 서버 데이터를 기준으로 해요.</strong>
        <p>플랜 가격과 배송비가 확정되면 백엔드에서 받은 결제 당시 금액을 표시합니다.</p>
      </div>
    </aside>
  </div>
</template>
