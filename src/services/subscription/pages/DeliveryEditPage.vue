<script setup>
import { ref } from 'vue'
import { ChevronLeft, Info, MapPin } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'

const appStore = useAppStore()
const emit = defineEmits(['navigate'])

const availableDays = ['월요일', '수요일', '금요일']
const draftDeliveryDays = ref([...appStore.currentSubscription.deliveryDays])
const draftDeliveryTime = ref(appStore.currentSubscription.deliveryTime)
const draftAddressId = ref(appStore.currentSubscription.selectedAddressId)
const validationMessage = ref('')

function toggleDraftDay(day) {
  const dayIndex = draftDeliveryDays.value.indexOf(day)

  if (dayIndex >= 0) {
    draftDeliveryDays.value.splice(dayIndex, 1)
    return
  }

  draftDeliveryDays.value.push(day)
}

function saveDeliveryConditions() {
  validationMessage.value = ''

  if (draftDeliveryDays.value.length === 0) {
    validationMessage.value = '배송 요일을 최소 1개 선택해주세요.'
    return
  }

  if (!draftAddressId.value) {
    validationMessage.value = '배송지를 선택해주세요.'
    return
  }

  appStore.updateDeliveryConditions({
    deliveryDays: draftDeliveryDays.value,
    deliveryTime: draftDeliveryTime.value,
    selectedAddressId: draftAddressId.value,
  })
  emit('navigate', 'subscription')
}
</script>

<template>
  <div class="page management-page">
    <button class="back-button" type="button" @click="emit('navigate', 'subscription')">
      <ChevronLeft :size="18" aria-hidden="true" />
      내 구독으로
    </button>

    <section class="page-intro">
      <p class="section-kicker">EDIT DELIVERY</p>
      <h1>이번 회차의 배송 조건을<br />변경해주세요.</h1>
      <p>변경 마감 전까지만 저장할 수 있으며 다음 회차에는 별도로 적용되지 않습니다.</p>
    </section>

    <section v-if="appStore.canEditCurrentDelivery" class="delivery-edit-form">
      <fieldset>
        <legend>배송 요일</legend>
        <div class="choice-grid">
          <button
            v-for="day in availableDays"
            :key="day"
            type="button"
            :class="{ 'is-selected': draftDeliveryDays.includes(day) }"
            @click="toggleDraftDay(day)"
          >
            {{ day }}
          </button>
        </div>
      </fieldset>

      <label>
        배송 시간
        <select v-model="draftDeliveryTime">
          <option>점심 · 11:00~13:00</option>
          <option>저녁 · 17:00~19:00</option>
        </select>
      </label>

      <fieldset>
        <legend>배송지</legend>
        <button
          v-for="address in appStore.addresses"
          :key="address.id"
          class="address-choice"
          :class="{ 'is-selected': draftAddressId === address.id }"
          type="button"
          @click="draftAddressId = address.id"
        >
          <MapPin :size="21" aria-hidden="true" />
          <span>
            <strong>{{ address.name }}</strong>
            <small>{{ address.address }}</small>
          </span>
        </button>
      </fieldset>
    </section>

    <aside v-else class="notice-box notice-box--warning management-notice">
      <Info :size="20" aria-hidden="true" />
      <div>
        <strong>변경 마감</strong>
        <p>변경 마감 시간이 지나 이번 회차의 배송 조건을 수정할 수 없습니다.</p>
      </div>
    </aside>

    <p v-if="validationMessage" class="flow-validation" role="alert">
      {{ validationMessage }}
    </p>

    <div v-if="appStore.canEditCurrentDelivery" class="mobile-action-bar">
      <div>
        <span>선택한 배송 요일</span>
        <strong>{{ draftDeliveryDays.length }}개</strong>
      </div>
      <button class="button button-primary" type="button" @click="saveDeliveryConditions">
        변경 저장하기
      </button>
    </div>
  </div>
</template>
