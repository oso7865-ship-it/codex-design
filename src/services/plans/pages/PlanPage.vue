<script setup>
import { Check, ChevronRight, Sparkles } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'

const appStore = useAppStore()
const emit = defineEmits(['navigate'])

const plans = [
  {
    id: 'trial',
    eyebrow: '처음이라면',
    name: '체험 플랜',
    description: '챱챱을 가볍게 경험해 보고 싶은 분',
    items: ['1주간 이용', '메뉴 3개 선택', '자동 전환 없음'],
  },
  {
    id: 'solo',
    eyebrow: 'RECOMMENDED',
    name: 'Solo 플랜',
    description: '내 식사 리듬을 만들고 싶은 1인 가구',
    items: ['2주 단위 구독', '주차별 3개 이상', '메뉴별 추가금 없음'],
    recommended: true,
  },
  {
    id: 'family',
    eyebrow: '함께 먹어요',
    name: 'Family 플랜',
    description: '더 넉넉한 식사를 준비하고 싶은 가족',
    items: ['2주 단위 구독', '주차별 6개 이상', '메뉴별 추가금 없음'],
  },
]

function selectPlan(planId) {
  appStore.beginSubscriptionApplication(planId)
  emit('navigate', 'wf-013')
}

function openPlanDetail(planId) {
  if (planId === 'solo') {
    emit('navigate', 'wf-011')
    return
  }

  if (planId === 'trial') {
    emit('navigate', 'wf-012')
  }
}
</script>

<template>
  <div class="page plan-page">
    <section class="page-intro page-intro--centered">
      <p class="eyebrow"><Sparkles :size="15" aria-hidden="true" /> PLAN</p>
      <h1>나에게 맞는 식사 리듬을<br />선택해 보세요.</h1>
      <p>
        플랜에 포함된 메뉴를 선택해 구성합니다. 메뉴별 가격은 표시하지 않으며, 플랜 가격은 현재 준비
        중이에요.
      </p>
    </section>

    <section class="plan-assurance">
      <div>
        <p class="section-kicker">HOW IT WORKS</p>
        <h2>선택은 가볍게,<br />구성은 자유롭게.</h2>
      </div>
      <div class="plan-assurance__items">
        <p>
          <strong>메뉴별 가격 없음</strong>
          <span>플랜 안에서 메뉴를 구성해요.</span>
        </p>
        <p>
          <strong>다음 결제부터 변경</strong>
          <span>현재 회차는 그대로 이용할 수 있어요.</span>
        </p>
        <p>
          <strong>해지는 다음 결제 전까지</strong>
          <span>다음 정기결제만 제외됩니다.</span>
        </p>
      </div>
    </section>

    <section class="plan-grid">
      <article
        v-for="plan in plans"
        :key="plan.id"
        class="plan-card"
        :class="{ 'plan-card--recommended': plan.recommended }"
      >
        <div class="plan-card__top">
          <span class="plan-eyebrow">{{ plan.eyebrow }}</span>
          <span v-if="plan.recommended" class="recommendation-badge">추천</span>
        </div>
        <h2>{{ plan.name }}</h2>
        <p>{{ plan.description }}</p>
        <div class="plan-price">
          <span>플랜 가격</span>
          <strong>가격 미정</strong>
        </div>
        <ul>
          <li v-for="item in plan.items" :key="item">
            <Check :size="17" aria-hidden="true" />
            {{ item }}
          </li>
        </ul>
        <button
          v-if="plan.id !== 'family'"
          class="text-button"
          type="button"
          @click="openPlanDetail(plan.id)"
        >
          플랜 상세 보기
          <ChevronRight :size="16" aria-hidden="true" />
        </button>
        <button
          class="button"
          :class="plan.recommended ? 'button-trial' : 'button-secondary'"
          type="button"
          @click="selectPlan(plan.id)"
        >
          {{ plan.recommended ? 'Solo 플랜 시작하기' : '이 플랜 선택' }}
          <ChevronRight :size="18" aria-hidden="true" />
        </button>
      </article>
    </section>

    <aside class="notice-box notice-box--info">
      <strong>가격 안내</strong>
      <p>플랜 가격과 배송비는 결제 전 백엔드의 견적 결과를 기준으로 표시됩니다.</p>
    </aside>
  </div>
</template>
