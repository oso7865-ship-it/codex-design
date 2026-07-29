<script setup>
import { computed } from 'vue'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'
import StatusBadge from '../../../shared/components/ui/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
const delivery = computed(() => appStore.deliveryHistory[0])
const deliveryAddress = computed(() => {
  return appStore.addresses.find((address) => address.name === delivery.value.addressName)
})
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton label="배송 내역으로" @back="emit('navigate', 'wf-033')" />

    <section class="page-intro">
      <p class="section-kicker">DELIVERY DETAIL</p>
      <h1>배송 상세</h1>
      <p>배송 번호 {{ delivery.id }}</p>
    </section>

    <section class="detail-card">
      <div class="detail-card__heading">
        <strong>{{ delivery.addressName }} 배송</strong>
        <StatusBadge :status="delivery.status" />
      </div>
      <dl class="detail-list">
        <div>
          <dt>배송 예정일</dt>
          <dd>{{ delivery.deliveryDate }}</dd>
        </div>
        <div>
          <dt>메뉴 수량</dt>
          <dd>{{ delivery.menuCount }}개</dd>
        </div>
        <div>
          <dt>받는 분</dt>
          <dd>{{ deliveryAddress.recipient }} · {{ deliveryAddress.phone }}</dd>
        </div>
        <div>
          <dt>배송지</dt>
          <dd>{{ deliveryAddress.address }}</dd>
        </div>
      </dl>
    </section>

    <aside class="notice-box notice-box--info">
      <div>
        <strong>배송 조회 연동 예정</strong>
        <p>필요한 정보: 배송사, 송장번호, 배송 단계 조회 API</p>
      </div>
    </aside>
  </div>
</template>
