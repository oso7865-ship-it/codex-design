<script setup>
import {
  Bell,
  ChevronRight,
  CreditCard,
  MapPin,
  PackageCheck,
  ReceiptText,
  RotateCcw,
  UserRound,
} from 'lucide-vue-next'
import { formatDeliveryDate } from '../../../utils/date'
import { useAppStore } from '../../../stores/useAppStore'

const emit = defineEmits(['navigate', 'openTrialSheet'])
const appStore = useAppStore()

const planNames = {
  solo: 'Solo',
  family: 'Family',
  trial: '체험',
}

const links = [
  { label: '내 정보', detail: '이름과 연락처를 관리해요', icon: UserRound, route: 'wf-027' },
  { label: '배송지', detail: '기본 배송지와 추가 주소', icon: MapPin, route: 'wf-028' },
  { label: '결제 수단', detail: '기본 카드와 결제 상태', icon: CreditCard, route: 'wf-030' },
  {
    label: '결제 내역',
    detail: '정기결제 결과와 결제 수단',
    icon: ReceiptText,
    route: 'wf-031',
  },
  {
    label: '배송 내역',
    detail: '회차별 배송 상태와 도착 정보',
    icon: PackageCheck,
    route: 'wf-033',
  },
  {
    label: '환불 내역',
    detail: '환불 요청과 처리 상태',
    icon: RotateCcw,
    route: 'wf-035',
  },
]
</script>

<template>
  <div class="page">
    <section class="mypage-profile">
      <div class="profile-avatar">{{ appStore.memberProfile.name.slice(0, 1) }}</div>
      <div>
        <p>안녕하세요</p>
        <h1>{{ appStore.memberProfile.name }}님</h1>
      </div>
      <button type="button" class="icon-button" aria-label="알림">
        <Bell :size="20" aria-hidden="true" />
      </button>
    </section>

    <section class="account-metrics">
      <div>
        <span>현재 구독</span>
        <strong>{{ planNames[appStore.currentSubscription.planId] }} · 이용 중</strong>
      </div>
      <div>
        <span>다음 배송</span>
        <strong>{{ formatDeliveryDate(appStore.currentSubscription.dates.nextDelivery) }}</strong>
      </div>
    </section>

    <section class="settings-list" aria-label="마이페이지 메뉴">
      <button
        v-for="link in links"
        :key="link.label"
        class="settings-list__item"
        type="button"
        @click="emit('navigate', link.route)"
      >
        <span class="settings-list__icon">
          <component :is="link.icon" :size="20" aria-hidden="true" />
        </span>
        <span>
          <strong>{{ link.label }}</strong>
          <small>{{ link.detail }}</small>
        </span>
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </section>

    <aside class="trial-demo-card">
      <div>
        <p>체험 종료 화면 확인</p>
        <strong>전환 안내 Bottom Sheet</strong>
      </div>
      <button
        class="button button-secondary"
        type="button"
        :disabled="appStore.trialStatus !== 'ended'"
        @click="emit('openTrialSheet')"
      >
        {{ appStore.trialStatus === 'ended' ? '전환 화면 보기' : '전환 진행 중' }}
      </button>
    </aside>

    <button class="admin-link" type="button" @click="emit('navigate', 'admin')">
      관리자 대시보드 보기
    </button>
  </div>
</template>
