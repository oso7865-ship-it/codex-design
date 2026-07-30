<script setup>
import { computed, ref } from 'vue'
import { CalendarDays, ChevronRight, List } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'
import StatusBadge from '../../../shared/components/feedback/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const appStore = useAppStore()
const viewMode = ref('list')

// computed는 회차 데이터가 바뀌면 달력 칸도 자동으로 다시 계산합니다.
const calendarDays = computed(() => {
  const leadingEmptyCells = Array.from({ length: 6 }, (_, index) => ({
    key: `empty-${index}`,
    day: null,
  }))
  const augustDays = Array.from({ length: 31 }, (_, index) => ({
    key: `day-${index + 1}`,
    day: index + 1,
  }))

  return [...leadingEmptyCells, ...augustDays]
})

function findRoundByDay(day) {
  return appStore.subscriptionRounds.find((round) => {
    const [year, month, date] = round.deliveryDate.split('-').map(Number)
    return year === 2026 && month === 8 && date === day
  })
}

function getCalendarMenuLabel(round) {
  if (!round) {
    return ''
  }

  const firstMenuName = round.menuItems[0].name
  const extraMenuCount = round.menuItems.length - 1
  return extraMenuCount > 0 ? `${firstMenuName} 외 ${extraMenuCount}종` : firstMenuName
}

function openRoundDetail(roundId) {
  appStore.selectRound(roundId)
  emit('navigate', 'wf-023')
}
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton label="내 구독으로" @back="emit('navigate', 'subscription')" />

    <section class="page-intro page-intro--with-action">
      <div>
        <p class="section-kicker">DELIVERY ROUNDS</p>
        <h1>회차 일정</h1>
        <p>배송 예정일과 회차별 변경 가능 상태를 확인합니다.</p>
      </div>
      <div class="view-switcher" aria-label="보기 방식">
        <button
          type="button"
          :class="{ 'is-active': viewMode === 'list' }"
          @click="viewMode = 'list'"
        >
          <List :size="17" aria-hidden="true" /> 목록
        </button>
        <button
          type="button"
          :class="{ 'is-active': viewMode === 'calendar' }"
          @click="viewMode = 'calendar'"
        >
          <CalendarDays :size="17" aria-hidden="true" /> 캘린더
        </button>
      </div>
    </section>

    <section v-if="viewMode === 'calendar'" class="round-calendar">
      <header>
        <strong>2026년 8월</strong>
        <span>배송 예정일을 선택하면 상세 화면으로 이동합니다.</span>
      </header>
      <p class="round-calendar__scroll-hint">좌우로 밀어 메뉴 이름과 전체 날짜를 확인하세요.</p>
      <div class="round-calendar__grid">
        <div class="round-calendar__week">
          <span v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day">
            {{ day }}
          </span>
        </div>
        <div class="round-calendar__days">
          <button
            v-for="calendarDay in calendarDays"
            :key="calendarDay.key"
            type="button"
            :class="{
              'is-empty': !calendarDay.day,
              'has-delivery': findRoundByDay(calendarDay.day),
            }"
            :disabled="!findRoundByDay(calendarDay.day)"
            :aria-label="
              findRoundByDay(calendarDay.day)
                ? `${calendarDay.day}일 ${getCalendarMenuLabel(findRoundByDay(calendarDay.day))}`
                : undefined
            "
            @click="
              findRoundByDay(calendarDay.day) && openRoundDetail(findRoundByDay(calendarDay.day).id)
            "
          >
            <span>{{ calendarDay.day }}</span>
            <small v-if="findRoundByDay(calendarDay.day)">
              {{ getCalendarMenuLabel(findRoundByDay(calendarDay.day)) }}
            </small>
          </button>
        </div>
      </div>
    </section>

    <section v-else class="history-list" aria-label="회차 목록">
      <button
        v-for="round in appStore.subscriptionRounds"
        :key="round.id"
        class="history-list-item"
        type="button"
        @click="openRoundDetail(round.id)"
      >
        <span class="history-list-item__icon">
          <CalendarDays :size="20" aria-hidden="true" />
        </span>
        <span class="history-list-item__main">
          <span>
            <strong>{{ round.title }}</strong>
            <small>
              {{ round.deliveryDate }} ·
              {{ getCalendarMenuLabel(round) }}
            </small>
          </span>
          <span class="history-list-item__aside">
            <StatusBadge :status="round.status" />
            <b>
              {{ round.canEditMenu ? `변경 마감 ${round.changeDeadline}` : '메뉴 변경 마감' }}
            </b>
          </span>
        </span>
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </section>
  </div>
</template>
