<script setup>
import { ref } from 'vue'
import { CalendarDays, ChevronRight, List } from 'lucide-vue-next'
import { subscriptionRounds } from '../../../shared/mocks/prototypeData'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'
import StatusBadge from '../../../shared/components/ui/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const viewMode = ref('list')
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
      <div class="round-calendar__week">
        <span v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day">{{ day }}</span>
      </div>
      <div class="round-calendar__days">
        <button v-for="day in 14" :key="day" type="button" :class="{ 'has-delivery': day === 3 }">
          {{ day }}
          <small v-if="day === 3">배송</small>
        </button>
      </div>
    </section>

    <section v-else class="history-list" aria-label="회차 목록">
      <button
        v-for="round in subscriptionRounds"
        :key="round.id"
        class="history-list-item"
        type="button"
        @click="emit('navigate', 'wf-023')"
      >
        <span class="history-list-item__icon">
          <CalendarDays :size="20" aria-hidden="true" />
        </span>
        <span class="history-list-item__main">
          <span>
            <strong>{{ round.title }}</strong>
            <small>{{ round.deliveryDate }} · 메뉴 {{ round.menuCount }}개</small>
          </span>
          <span class="history-list-item__aside">
            <StatusBadge :status="round.status" />
            <b>{{ round.canEdit ? `변경 마감 ${round.changeDeadline}` : '변경 마감' }}</b>
          </span>
        </span>
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </section>
  </div>
</template>
