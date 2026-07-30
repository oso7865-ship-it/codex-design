<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  CalendarDays,
  CircleUserRound,
  Home,
  LayoutDashboard,
  Package,
  Salad,
} from 'lucide-vue-next'
import CustomerHeader from './shared/components/layout/CustomerHeader.vue'
import CustomerFooter from './shared/components/layout/CustomerFooter.vue'
import TrialBottomSheet from './domain/subscription/components/TrialBottomSheet.vue'
import { useAppStore } from './stores/useAppStore'

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const navigationItems = [
  { id: 'home', label: '홈', icon: Home },
  { id: 'menu', label: '메뉴', icon: Salad },
  { id: 'plans', label: '플랜', icon: Package },
  { id: 'subscription', label: '내 구독', icon: CalendarDays },
  { id: 'mypage', label: '마이', icon: CircleUserRound },
]

// computed는 반응형 값을 조합해 새 값을 만드는 Vue 문법입니다.
// 현재 선택된 화면이 관리자 화면인지 계산합니다.
// 현재 URL의 route 정보가 바뀔 때마다 이 값도 자동으로 다시 계산됩니다.
const isAdminPage = computed(() => route.name === 'admin' || route.meta.area === 'admin')
const activeNavigation = computed(() => {
  const routeName = String(route.name || '')

  if (['menu', 'wf-008', 'wf-009', 'subscribe-menu'].includes(routeName)) {
    return 'menu'
  }

  if (
    [
      'plans',
      'wf-011',
      'wf-012',
      'plan-family-detail',
      'wf-013',
      'wf-014',
      'wf-016',
      'wf-017',
      'wf-018',
      'wf-019',
    ].includes(routeName)
  ) {
    return 'plans'
  }

  if (
    routeName === 'subscription' ||
    routeName === 'subscription-cancel' ||
    ['wf-020', 'wf-022', 'wf-023', 'wf-024', 'wf-025', 'wf-054'].includes(routeName)
  ) {
    return 'subscription'
  }

  // 정규식은 WF-027부터 WF-036까지의 이름인지 한 번에 확인하는 JavaScript 문법입니다.
  if (
    routeName === 'mypage' ||
    ['notifications', 'account-settings', 'payment-method-register'].includes(routeName) ||
    /^wf-0(2[7-9]|3[0-6])$/.test(routeName)
  ) {
    return 'mypage'
  }

  return routeName
})

// onMounted는 App 화면이 처음 브라우저에 그려진 직후 한 번 실행하는 Vue 기능입니다.
// 체험 종료 응답이면서 고객 화면일 때 전환 안내를 최초 1회 자동으로 엽니다.
onMounted(() => {
  if (!isAdminPage.value) {
    appStore.openTrialSheet()
  }
})

function navigate(view) {
  router.push({ name: view })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main class="app-shell" :class="{ 'admin-mode': isAdminPage }">
    <template v-if="isAdminPage">
      <RouterView v-slot="{ Component }">
        <component :is="Component" @navigate="navigate" />
      </RouterView>
    </template>

    <template v-else>
      <CustomerHeader :current-view="activeNavigation" @navigate="navigate" />

      <section class="customer-content">
        <!-- RouterView의 v-slot은 현재 주소와 연결된 페이지 컴포넌트를 꺼내는 문법입니다. -->
        <!-- 여기서는 모든 고객 페이지에 같은 화면 전환 함수와 체험 Sheet 열기 기능을 전달합니다. -->
        <RouterView v-slot="{ Component }">
          <component
            :is="Component"
            @navigate="navigate"
            @open-trial-sheet="appStore.previewTrialSheet"
          />
        </RouterView>
      </section>
      <CustomerFooter @navigate="navigate" />

      <nav class="bottom-navigation" aria-label="주요 메뉴" v-auto-animate>
        <!-- v-auto-animate는 목록의 선택·추가·삭제 변화에 부드러운 움직임을 더하는 지시어입니다. -->
        <!-- 이 코드에서는 하단 메뉴가 화면 상태에 맞게 바뀔 때 이동을 자연스럽게 보여 줍니다. -->
        <button
          v-for="item in navigationItems"
          :key="item.id"
          class="bottom-navigation__item"
          :class="{ 'is-active': activeNavigation === item.id }"
          type="button"
          @click="navigate(item.id)"
        >
          <!-- component :is는 배열에 저장한 아이콘 컴포넌트를 상황에 맞게 화면에 그리는 Vue 문법입니다. -->
          <!-- 이 코드에서는 각 메뉴가 가진 icon 값을 실제 Lucide 아이콘으로 바꿔 보여 줍니다. -->
          <component :is="item.icon" :size="20" stroke-width="1.8" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </template>

    <TrialBottomSheet
      v-if="!isAdminPage"
      :is-open="appStore.isTrialSheetOpen"
      @close="appStore.closeTrialSheet"
      @navigate="navigate"
    />
  </main>
</template>
