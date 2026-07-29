<script setup>
import { Plus } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'
import AddressCard from '../components/AddressCard.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton @back="emit('navigate', 'mypage')" />

    <section class="page-intro page-intro--with-action">
      <div>
        <p class="section-kicker">DELIVERY ADDRESS</p>
        <h1>배송지를 관리해요.</h1>
        <p>기본 배송지는 새 구독 신청 때 가장 먼저 선택됩니다.</p>
      </div>
      <button class="button button-primary" type="button" @click="emit('navigate', 'wf-029')">
        <Plus :size="18" aria-hidden="true" />
        배송지 추가
      </button>
    </section>

    <section class="profile-data-list" aria-label="등록된 배송지">
      <AddressCard
        v-for="address in appStore.addresses"
        :key="address.id"
        :address="address"
        @make-default="appStore.setDefaultAddress"
        @edit="emit('navigate', 'wf-029')"
      />
    </section>

    <p class="form-help">필요한 정보: 배송지 조회·등록·수정·삭제 API</p>
  </div>
</template>
