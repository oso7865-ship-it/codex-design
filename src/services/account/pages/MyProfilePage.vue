<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()

// 객체 펼침 문법(...)으로 저장된 회원 정보를 복사해 입력 중인 값을 분리합니다.
const form = ref({ ...appStore.memberProfile })
const isSaved = ref(false)

function saveProfile() {
  appStore.updateMemberProfile(form.value)
  isSaved.value = true
}
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton @back="emit('navigate', 'mypage')" />

    <section class="page-intro">
      <p class="section-kicker">MY PROFILE</p>
      <h1>내 정보를 확인하고<br />필요한 내용을 수정해요.</h1>
      <p>로그인 수단은 안전을 위해 이 화면에서 변경하지 않습니다.</p>
    </section>

    <form class="profile-form" @submit.prevent="saveProfile">
      <label class="form-field">
        <span>이름</span>
        <input v-model.trim="form.name" type="text" autocomplete="name" required />
      </label>

      <label class="form-field">
        <span>이메일</span>
        <input v-model.trim="form.email" type="email" autocomplete="email" required />
      </label>

      <label class="form-field">
        <span>휴대폰 번호</span>
        <input v-model.trim="form.phone" type="tel" autocomplete="tel" required />
      </label>

      <label class="form-field">
        <span>가입 방식</span>
        <input :value="form.signInProvider" type="text" disabled />
      </label>

      <p class="form-help">필요한 정보: 회원정보 조회·수정 API와 본인 인증 정책</p>

      <div v-if="isSaved" class="form-success" role="status">
        <Check :size="18" aria-hidden="true" />
        화면의 예시 정보가 저장되었습니다.
      </div>

      <button class="button button-primary" type="submit">변경 내용 저장</button>
    </form>
  </div>
</template>
