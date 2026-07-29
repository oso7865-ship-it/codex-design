<script setup>
import { ref } from 'vue'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()

const form = ref({
  name: '',
  recipient: '',
  phone: '',
  address: '',
  isDefault: false,
})

function saveAddress() {
  appStore.addAddress(form.value)
  emit('navigate', 'wf-028')
}
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton label="배송지 목록으로" @back="emit('navigate', 'wf-028')" />

    <section class="page-intro">
      <p class="section-kicker">NEW ADDRESS</p>
      <h1>새 배송지를 등록해요.</h1>
      <p>배달 기사님이 쉽게 찾을 수 있도록 정확한 주소를 입력해 주세요.</p>
    </section>

    <form class="profile-form" @submit.prevent="saveAddress">
      <div class="form-grid">
        <label class="form-field">
          <span>배송지 이름</span>
          <input v-model.trim="form.name" type="text" placeholder="예: 우리 집" required />
        </label>
        <label class="form-field">
          <span>받는 분</span>
          <input v-model.trim="form.recipient" type="text" autocomplete="name" required />
        </label>
      </div>

      <label class="form-field">
        <span>휴대폰 번호</span>
        <input
          v-model.trim="form.phone"
          type="tel"
          autocomplete="tel"
          placeholder="010-0000-0000"
          required
        />
      </label>

      <label class="form-field">
        <span>주소</span>
        <textarea
          v-model.trim="form.address"
          rows="3"
          placeholder="도로명 주소와 상세 주소를 입력해 주세요."
          required
        />
      </label>

      <label class="check-field">
        <input v-model="form.isDefault" type="checkbox" />
        <span>기본 배송지로 설정</span>
      </label>

      <p class="form-help">필요한 정보: 도로명 주소 검색 API와 배송 가능 지역 기준</p>
      <button class="button button-primary" type="submit">배송지 저장</button>
    </form>
  </div>
</template>
