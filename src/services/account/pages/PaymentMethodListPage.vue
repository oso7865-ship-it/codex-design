<script setup>
import { Plus } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'
import PaymentCard from '../components/PaymentCard.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton @back="emit('navigate', 'mypage')" />

    <section class="page-intro page-intro--with-action">
      <div>
        <p class="section-kicker">PAYMENT METHOD</p>
        <h1>결제 수단을 관리해요.</h1>
        <p>민감한 카드 정보는 저장하지 않고 카드사에서 받은 식별값만 사용합니다.</p>
      </div>
      <button class="button button-outline" type="button" disabled>
        <Plus :size="18" aria-hidden="true" />
        카드 추가
      </button>
    </section>

    <section class="profile-data-list" aria-label="등록된 결제 수단">
      <PaymentCard
        v-for="paymentMethod in appStore.paymentMethods"
        :key="paymentMethod.id"
        :payment-method="paymentMethod"
        @make-default="appStore.setDefaultPaymentMethod"
      />
    </section>

    <p class="form-help">필요한 정보: PG사 카드 등록·빌링키 발급 API와 카드 삭제 정책</p>
  </div>
</template>
