<script setup>
import { computed, ref } from 'vue'
import { AlertTriangle, ChevronLeft, Minus, Plus } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'

const appStore = useAppStore()
const emit = defineEmits(['navigate'])

const props = defineProps({
  mode: {
    type: String,
    default: 'application',
  },
})

const menus = [
  { id: 1, name: '바질 닭가슴살 도시락', type: 'BALANCED' },
  { id: 2, name: '단호박 소불고기 도시락', type: 'BALANCED' },
  { id: 3, name: '두부 채소 비빔밥', type: 'VEGETARIAN' },
  { id: 4, name: '연어 포케', type: '준비 중', disabled: true },
]

// 회차 변경 화면에서는 저장 전 값을 보호하기 위해 현재 수량을 새 객체로 복사해 사용합니다.
const draftMenuQuantities = ref({
  ...(props.mode === 'delivery'
    ? appStore.currentSubscription.menuQuantities
    : appStore.subscriptionApplication.menuQuantities),
})

const activeMenuQuantities = computed(() =>
  props.mode === 'delivery'
    ? draftMenuQuantities.value
    : appStore.subscriptionApplication.menuQuantities,
)

const selectedMenuCount = computed(() =>
  Object.values(activeMenuQuantities.value).reduce((total, quantity) => total + quantity, 0),
)
const displayedPlanName = computed(() => {
  const planId =
    props.mode === 'delivery' ? appStore.currentSubscription.planId : appStore.selectedPlan
  return planId === 'family' ? 'Family' : 'Solo'
})
const requiredMenuCount = computed(() =>
  props.mode === 'delivery' ? appStore.currentMinimumMenuCount : appStore.minimumMenuCount,
)
const hasEnoughMenus = computed(() => selectedMenuCount.value >= requiredMenuCount.value)

function changeQuantity(menuId, change) {
  if (props.mode === 'delivery') {
    const currentQuantity = draftMenuQuantities.value[menuId]
    draftMenuQuantities.value[menuId] = Math.max(0, currentQuantity + change)
    return
  }

  appStore.changeMenuQuantity(menuId, change)
}

function moveToConfirmation() {
  if (!hasEnoughMenus.value) {
    return
  }

  if (props.mode === 'delivery') {
    appStore.replaceMenuQuantities(draftMenuQuantities.value)
    emit('navigate', 'subscription')
    return
  }

  emit('navigate', 'wf-016')
}
</script>

<template>
  <div class="page page-menu-builder">
    <button
      v-if="mode === 'delivery'"
      class="back-button"
      type="button"
      @click="emit('navigate', 'subscription')"
    >
      <ChevronLeft :size="18" aria-hidden="true" />
      내 구독으로
    </button>

    <section class="page-intro">
      <p class="section-kicker">
        {{ mode === 'delivery' ? 'EDIT DELIVERY MENU' : 'STEP 3 OF 5' }}
      </p>
      <h1>
        {{ mode === 'delivery' ? '이번 회차 메뉴를' : '이번 주에는 무엇을' }}<br />
        {{ mode === 'delivery' ? '변경해주세요.' : '받아볼까요?' }}
      </h1>
      <p>
        <strong>{{ displayedPlanName }} 플랜</strong>에 포함된 메뉴를 골라주세요. 메뉴 선택으로 플랜
        가격은 변하지 않습니다.
      </p>
    </section>

    <div class="selection-progress" aria-label="메뉴 선택 수량">
      <div>
        <span>이번 회차 메뉴</span>
        <strong>{{ selectedMenuCount }} / {{ requiredMenuCount }}개 이상</strong>
      </div>
      <div class="progress-track">
        <span
          :style="{ width: `${Math.min((selectedMenuCount / requiredMenuCount) * 100, 100)}%` }"
        ></span>
      </div>
      <p v-if="hasEnoughMenus">최소 수량을 충족했어요. 더 담아도 메뉴별 추가금은 없어요.</p>
      <p v-else>최소 {{ requiredMenuCount - selectedMenuCount }}개를 더 선택해주세요.</p>
    </div>

    <aside class="notice-box notice-box--warning">
      <AlertTriangle :size="20" aria-hidden="true" />
      <div>
        <strong>수량 제한 안내</strong>
        <p>준비 중인 메뉴는 선택할 수 없어요. 재고와 수량 제한은 최종 신청 전 다시 확인됩니다.</p>
      </div>
    </aside>

    <section class="menu-grid" aria-label="메뉴 선택">
      <article
        v-for="menu in menus"
        :key="menu.id"
        class="menu-card"
        :class="{ 'is-disabled': menu.disabled }"
      >
        <div class="menu-card__image">[사진이 필요한 곳입니다.]</div>
        <div class="menu-card__body">
          <span class="menu-type">{{ menu.type }}</span>
          <h2>{{ menu.name }}</h2>
          <p>{{ menu.disabled ? '현재 준비 중인 메뉴예요.' : '플랜 포함 메뉴' }}</p>
          <div class="quantity-control" :aria-label="`${menu.name} 수량`">
            <button
              type="button"
              :disabled="activeMenuQuantities[menu.id] === 0 || menu.disabled"
              aria-label="수량 줄이기"
              @click="changeQuantity(menu.id, -1)"
            >
              <Minus :size="16" aria-hidden="true" />
            </button>
            <strong>{{ activeMenuQuantities[menu.id] }}</strong>
            <button
              type="button"
              :disabled="menu.disabled"
              aria-label="수량 늘리기"
              @click="changeQuantity(menu.id, 1)"
            >
              <Plus :size="16" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </section>

    <div class="mobile-action-bar">
      <div>
        <span>이번 회차</span>
        <strong>{{ selectedMenuCount }}개 선택</strong>
      </div>
      <button
        class="button button-primary"
        type="button"
        :disabled="!hasEnoughMenus"
        @click="moveToConfirmation"
      >
        {{ mode === 'delivery' ? '변경 저장하기' : '다음 단계' }}
      </button>
    </div>
  </div>
</template>
