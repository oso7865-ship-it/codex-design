<script setup>
import { computed, ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import dayjs from 'dayjs'
import { MINIMUM_DELIVERY_DATE_COUNT, isDeliveryDateAvailable } from '../../../utils/deliveryPolicy'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
const weekDays = ['일', '월', '화', '수', '목', '금', '토']
const today = dayjs().startOf('day')
const visibleCycleStart = ref(today.startOf('week'))

const cycleLabel = computed(() => {
  const cycleEnd = visibleCycleStart.value.add(13, 'day')
  const startsAndEndsInSameMonth = visibleCycleStart.value.isSame(cycleEnd, 'month')

  return startsAndEndsInSameMonth
    ? `${visibleCycleStart.value.format('YYYY년 M월')} · 2주 배송 주기`
    : `${visibleCycleStart.value.format('M월 D일')} ~ ${cycleEnd.format('M월 D일')}`
})
const canMovePreviousCycle = computed(() => visibleCycleStart.value.isAfter(today, 'week'))
const calendarWeeks = computed(() =>
  [0, 1].map((weekIndex) => {
    const startDate = visibleCycleStart.value.add(weekIndex * 7, 'day')

    const dates = Array.from({ length: 7 }, (_, dayIndex) => {
      const date = startDate.add(dayIndex, 'day')
      const value = date.format('YYYY-MM-DD')

      return {
        value,
        label: date.format('M월 D일'),
        day: date.date(),
        isUnavailable: !isDeliveryDateAvailable(date, today),
        unavailableReason: date.day() === 0 ? '일요일은 배송 불가' : '지난 날짜는 선택 불가',
      }
    })

    return {
      id: `week-${startDate.format('YYYY-MM-DD')}`,
      title: `${weekIndex + 1}주차`,
      period: `${startDate.format('M월 D일')} ~ ${startDate.add(6, 'day').format('M월 D일')}`,
      dates,
      selectedCount: dates.filter(
        (date) => !date.isUnavailable && props.modelValue.includes(date.value),
      ).length,
    }
  }),
)

function moveCycle(amount) {
  const nextCycleStart = visibleCycleStart.value.add(amount * 2, 'week')

  if (nextCycleStart.isBefore(today, 'week')) {
    return
  }

  visibleCycleStart.value = nextCycleStart
}

function toggleDate(date) {
  if (date.isUnavailable) {
    return
  }

  if (props.modelValue.includes(date.value)) {
    emit(
      'update:modelValue',
      props.modelValue.filter((value) => value !== date.value),
    )
    return
  }

  emit('update:modelValue', [...props.modelValue, date.value].sort())
}
</script>

<template>
  <section class="delivery-date-calendar" aria-label="배송 희망일 선택">
    <header>
      <button
        type="button"
        :disabled="!canMovePreviousCycle"
        aria-label="이전 2주 보기"
        @click="moveCycle(-1)"
      >
        <ChevronLeft :size="18" aria-hidden="true" />
      </button>
      <strong>{{ cycleLabel }}</strong>
      <button type="button" aria-label="다음 2주 보기" @click="moveCycle(1)">
        <ChevronRight :size="18" aria-hidden="true" />
      </button>
    </header>

    <div class="delivery-date-calendar__legend" aria-label="날짜 선택 상태 안내">
      <span><i class="is-available" aria-hidden="true"></i>선택 가능</span>
      <span><i class="is-unavailable" aria-hidden="true"></i>일요일·지난 날짜는 선택 불가</span>
    </div>
    <div class="delivery-date-calendar__weeks">
      <section v-for="week in calendarWeeks" :key="week.id" class="delivery-date-calendar__week">
        <header>
          <strong
            >{{ week.title }} · {{ week.selectedCount }} /
            {{ MINIMUM_DELIVERY_DATE_COUNT }}개</strong
          >
          <span>{{ week.period }}</span>
        </header>
        <div class="delivery-date-calendar__weekdays" aria-hidden="true">
          <span v-for="weekDay in weekDays" :key="weekDay">{{ weekDay }}</span>
        </div>
        <div class="delivery-date-calendar__days">
          <button
            v-for="date in week.dates"
            :key="date.value"
            type="button"
            :disabled="date.isUnavailable"
            :class="{ 'is-selected': modelValue.includes(date.value) }"
            :aria-pressed="modelValue.includes(date.value)"
            :aria-label="`${date.label} ${date.isUnavailable ? date.unavailableReason : modelValue.includes(date.value) ? '선택 해제' : '선택'}`"
            @click="toggleDate(date)"
          >
            {{ date.day }}
          </button>
        </div>
      </section>
    </div>
  </section>
</template>
