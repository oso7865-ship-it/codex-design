<script setup>
import { ref } from 'vue'
import { Check, X } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close', 'navigate'])
const appStore = useAppStore()
const selectedPlan = ref('solo')

const conversionPlans = [
  {
    id: 'solo',
    name: 'Solo',
    description: '나를 위한 규칙적인 식사',
    minimum: '회차별 메뉴 3개 이상',
    recommended: true,
  },
  {
    id: 'family',
    name: 'Family',
    description: '함께 먹는 넉넉한 식사',
    minimum: '회차별 메뉴 6개 이상',
    recommended: false,
  },
]

function closeSheet() {
  appStore.closeTrialSheet()
  emit('close')
}

function startSubscription() {
  appStore.startTrialConversion(selectedPlan.value)
  emit('navigate', 'wf-013')
}
</script>

<template>
  <!-- @click.self는 배경 자체를 눌렀을 때만 실행하고 시트 내부 클릭은 무시합니다. -->
  <div v-if="isOpen" class="bottom-sheet-layer" role="presentation" @click.self="closeSheet">
    <section
      class="trial-bottom-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-sheet-title"
    >
      <div class="sheet-handle"></div>
      <button class="sheet-close" type="button" aria-label="닫기" @click="closeSheet">
        <X :size="21" aria-hidden="true" />
      </button>

      <h2 id="trial-sheet-title">체험 플랜이<br />종료되었습니다.</h2>
      <p>정기 구독을 시작할 플랜을 선택해주세요. 실제 가격은 결제 전에 안내됩니다.</p>

      <div class="trial-plan-options" role="radiogroup" aria-label="정기 구독 플랜 선택">
        <button
          v-for="plan in conversionPlans"
          :key="plan.id"
          class="trial-plan-option"
          :class="{
            'is-selected': selectedPlan === plan.id,
            'is-recommended': plan.recommended,
          }"
          type="button"
          role="radio"
          :aria-checked="selectedPlan === plan.id"
          @click="selectedPlan = plan.id"
        >
          <span class="trial-plan-option__top">
            <small>{{ plan.recommended ? '추천 플랜' : '선택 가능' }}</small>
            <Check v-if="selectedPlan === plan.id" :size="18" aria-hidden="true" />
          </span>
          <strong>{{ plan.name }}</strong>
          <span>{{ plan.description }}</span>
          <span>{{ plan.minimum }}</span>
          <b>가격 미정</b>
        </button>
      </div>

      <div class="sheet-actions">
        <button class="button button-secondary" type="button" @click="closeSheet">
          나중에 결정
        </button>
        <button class="button button-trial" type="button" @click="startSubscription">
          {{ selectedPlan === 'family' ? 'Family' : 'Solo' }} 구독 시작하기
        </button>
      </div>
    </section>
  </div>
</template>
