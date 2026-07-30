<script setup>
import { computed, ref } from 'vue'
import { AlertTriangle, CalendarClock, Pencil } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'
import StatusBadge from '../../../shared/components/feedback/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
const isPostponePanelOpen = ref(false)
const selectedPostponeDate = ref('')

// computed는 사용자가 목록에서 선택한 회차가 바뀌면 상세 내용도 함께 바꿉니다.
const round = computed(() => appStore.selectedRound)
const canPostpone = computed(() => {
  return !round.value.postponeUsed && round.value.postponeOptions.length > 0
})
const menuDescription = computed(() => {
  return round.value.menuItems.map((menu) => `${menu.name} ${menu.quantity}개`).join(' · ')
})

function openPostponePanel() {
  if (!canPostpone.value) {
    return
  }

  selectedPostponeDate.value = round.value.postponeOptions[0]
  isPostponePanelOpen.value = true
}

function confirmPostpone() {
  const wasPostponed = appStore.postponeRound(round.value.id, selectedPostponeDate.value)

  if (wasPostponed) {
    isPostponePanelOpen.value = false
  }
}
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton label="회차 목록으로" @back="emit('navigate', 'wf-022')" />

    <section class="page-intro">
      <p class="section-kicker">ROUND DETAIL</p>
      <h1>{{ round.title }}</h1>
      <p>회차 번호 {{ round.id }}</p>
    </section>

    <section class="detail-card">
      <div class="detail-card__heading">
        <strong>회차 상태</strong>
        <StatusBadge :status="round.status" />
      </div>
      <dl class="detail-list">
        <div>
          <dt>배송 예정일</dt>
          <dd>{{ round.deliveryDate }}</dd>
        </div>
        <div>
          <dt>메뉴 구성</dt>
          <dd>{{ menuDescription }}</dd>
        </div>
        <div>
          <dt>배송지</dt>
          <dd>{{ round.addressName }} · 대구광역시 중구 챱챱로 **</dd>
        </div>
        <div>
          <dt>배송 시간</dt>
          <dd>점심 · 11:00~13:00</dd>
        </div>
        <div>
          <dt>변경 마감</dt>
          <dd>{{ round.changeDeadline }}</dd>
        </div>
      </dl>
    </section>

    <div class="round-detail-actions">
      <button
        class="button button-secondary"
        type="button"
        :disabled="!round.canEditMenu"
        @click="emit('navigate', 'wf-024')"
      >
        <Pencil :size="17" aria-hidden="true" />
        메뉴 변경
      </button>
      <button
        class="button button-primary"
        type="button"
        :disabled="!round.canEditDelivery"
        @click="emit('navigate', 'wf-025')"
      >
        배송 조건 변경
      </button>
      <button
        class="button button-secondary"
        type="button"
        :disabled="!canPostpone"
        @click="openPostponePanel"
      >
        <CalendarClock :size="17" aria-hidden="true" />
        {{ round.postponeUsed ? '일정 미루기 사용 완료' : '배송 일정 미루기' }}
      </button>
    </div>

    <section v-if="isPostponePanelOpen" class="postpone-panel">
      <div>
        <p class="section-kicker">POSTPONE DELIVERY</p>
        <h2>변경할 배송일을 선택해주세요.</h2>
        <p>한 회차당 한 번만 변경할 수 있으며, 저장 후에는 다시 변경할 수 없습니다.</p>
      </div>
      <div class="postpone-date-grid" role="radiogroup" aria-label="변경할 배송일">
        <label v-for="date in round.postponeOptions" :key="date">
          <input v-model="selectedPostponeDate" type="radio" :value="date" />
          <span>{{ date }}</span>
        </label>
      </div>
      <div class="postpone-panel__actions">
        <button class="button button-secondary" type="button" @click="isPostponePanelOpen = false">
          취소
        </button>
        <button class="button button-primary" type="button" @click="confirmPostpone">
          이 날짜로 변경
        </button>
      </div>
    </section>

    <aside class="notice-box notice-box--warning">
      <AlertTriangle :size="20" aria-hidden="true" />
      <div>
        <strong>변경 마감 안내</strong>
        <p>
          {{ round.menuEditDisabledReason || '마감 전까지 메뉴와 배송 조건을 변경할 수 있습니다.' }}
        </p>
        <p v-if="round.postponeUsed">이 회차는 배송 일정 미루기 1회를 이미 사용했습니다.</p>
      </div>
    </aside>
  </div>
</template>
