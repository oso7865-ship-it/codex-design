<script setup>
import { CalendarDays, ChevronRight, Clock3, MapPin, Pencil, ReceiptText } from 'lucide-vue-next'
import { formatDeliveryDate } from '../../../utils/date'
import { useAppStore } from '../../../stores/useAppStore'

const appStore = useAppStore()
const emit = defineEmits(['navigate'])

const planNames = {
  solo: 'Solo',
  family: 'Family',
  trial: '체험',
}
</script>

<template>
  <div class="page">
    <section class="page-intro">
      <p class="section-kicker">MY SUBSCRIPTION</p>
      <h1>내 식사 구독을<br />한눈에 관리하세요.</h1>
      <p>
        이번 회차의 변경 마감은
        <strong
          >{{ formatDeliveryDate(appStore.currentSubscription.dates.changeDeadline) }} 오후
          6시</strong
        >입니다.
      </p>
    </section>

    <aside v-if="appStore.isCancellationScheduled" class="subscription-state-notice">
      <Clock3 :size="20" aria-hidden="true" />
      <div>
        <strong>구독 해지가 예약되어 있어요.</strong>
        <p>현재 이용 기간은 유지되며 다음 정기결제부터 청구되지 않습니다.</p>
      </div>
    </aside>

    <section class="subscription-hero-card">
      <div class="subscription-hero-card__top">
        <span
          class="status-pill"
          :class="
            appStore.isCancellationScheduled ? 'status-pill--warning' : 'status-pill--success'
          "
        >
          {{ appStore.isCancellationScheduled ? '해지 예정' : '이용 중' }}
        </span>
        <button type="button" class="text-button" @click="emit('navigate', 'wf-054')">
          플랜 변경하기
          <ChevronRight :size="15" aria-hidden="true" />
        </button>
      </div>
      <div class="subscription-hero-card__title">
        <div>
          <p>현재 플랜</p>
          <h2>{{ planNames[appStore.currentSubscription.planId] }} 플랜</h2>
        </div>
        <CalendarDays :size="34" aria-hidden="true" />
      </div>
      <p v-if="appStore.scheduledPlan" class="scheduled-change-text">
        다음 결제일부터 {{ planNames[appStore.scheduledPlan] }} 플랜으로 변경됩니다.
      </p>
      <dl class="subscription-details">
        <div>
          <dt>다음 배송</dt>
          <dd>{{ formatDeliveryDate(appStore.currentSubscription.dates.nextDelivery) }}</dd>
        </div>
        <div>
          <dt>다음 결제</dt>
          <dd>
            {{ formatDeliveryDate(appStore.currentSubscription.dates.nextPayment) }} ·
            {{ appStore.isCancellationScheduled ? '결제 예정 없음' : '가격 미정' }}
          </dd>
        </div>
      </dl>
    </section>

    <nav class="subscription-quick-links" aria-label="구독 상세 메뉴">
      <button type="button" @click="emit('navigate', 'wf-020')">
        <ReceiptText :size="19" aria-hidden="true" />
        <span><strong>구독 목록</strong><small>구독 상태 확인</small></span>
        <ChevronRight :size="18" aria-hidden="true" />
      </button>
      <button type="button" @click="emit('navigate', 'wf-022')">
        <CalendarDays :size="19" aria-hidden="true" />
        <span><strong>회차 일정</strong><small>목록과 캘린더</small></span>
        <ChevronRight :size="18" aria-hidden="true" />
      </button>
    </nav>

    <section class="section-block compact-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">NEXT DELIVERY</p>
          <h2>이번 회차 구성</h2>
        </div>
        <button
          class="text-button"
          type="button"
          :disabled="!appStore.canEditCurrentDelivery"
          @click="emit('navigate', 'wf-024')"
        >
          메뉴 변경
          <Pencil :size="15" aria-hidden="true" />
        </button>
      </div>
      <button
        class="delivery-summary-card delivery-summary-card--button"
        type="button"
        :disabled="!appStore.canEditCurrentDelivery"
        @click="emit('navigate', 'wf-024')"
      >
        <span class="delivery-summary-card__icon">
          <ReceiptText :size="23" aria-hidden="true" />
        </span>
        <span>
          <strong>메뉴 {{ appStore.currentMenuCount }}개</strong>
          <small>플랜 안에서 선택한 메뉴 구성이 적용됩니다.</small>
        </span>
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </section>

    <section class="section-block compact-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">DELIVERY CONDITIONS</p>
          <h2>배송 조건</h2>
        </div>
        <button
          class="text-button"
          type="button"
          :disabled="!appStore.canEditCurrentDelivery"
          @click="emit('navigate', 'wf-025')"
        >
          배송 조건 변경
          <Pencil :size="15" aria-hidden="true" />
        </button>
      </div>
      <button
        class="address-card address-card--button"
        type="button"
        :disabled="!appStore.canEditCurrentDelivery"
        @click="emit('navigate', 'wf-025')"
      >
        <MapPin :size="21" aria-hidden="true" />
        <span>
          <strong>{{ appStore.selectedAddress.name }}</strong>
          <small>{{ appStore.selectedAddress.address }}</small>
          <small>
            {{ appStore.currentSubscription.deliveryDays.join('·') }} ·
            {{ appStore.currentSubscription.deliveryTime }}
          </small>
        </span>
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
      <p v-if="!appStore.canEditCurrentDelivery" class="disabled-reason" role="status">
        변경 마감 시간이 지나 이번 회차는 수정할 수 없습니다.
      </p>
    </section>

    <section class="subscription-danger-zone">
      <div>
        <p class="section-kicker">SUBSCRIPTION END</p>
        <h2>구독 해지</h2>
        <p>현재 이용 기간은 유지하고 다음 정기결제부터 중단합니다.</p>
      </div>
      <button
        class="button button-danger-outline"
        type="button"
        :disabled="appStore.isCancellationScheduled"
        @click="emit('navigate', 'subscription-cancel')"
      >
        {{ appStore.isCancellationScheduled ? '해지 예약 완료' : '구독 해지하기' }}
      </button>
    </section>
  </div>
</template>
