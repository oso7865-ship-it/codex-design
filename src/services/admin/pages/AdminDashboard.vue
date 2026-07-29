<script setup>
import { ref } from 'vue'
import { ArrowUpRight, BellRing, CreditCard, UsersRound } from 'lucide-vue-next'
import Chart from 'primevue/chart'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import AdminSidebar from '../components/AdminSidebar.vue'

const emit = defineEmits(['navigate'])

const recentSubscriptions = [
  {
    name: '이서연',
    plan: 'Solo',
    nextDelivery: '8월 3일',
    status: '이용 중',
  },
  {
    name: '박민준',
    plan: 'Family',
    nextDelivery: '8월 3일',
    status: '이용 중',
  },
  {
    name: '김하늘',
    plan: 'Solo',
    nextDelivery: '8월 5일',
    status: '결제 확인',
  },
]

const signupChartData = ref({
  labels: ['Google', '카카오', '챱챱 회원', '기타'],
  datasets: [
    {
      data: [42, 31, 19, 8],
      backgroundColor: ['#96A75E', '#F28C28', '#6689A3', '#E1E4DC'],
      borderWidth: 0,
    },
  ],
})

const signupChartOptions = ref({
  cutout: '67%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  maintainAspectRatio: false,
})

const revenueChartData = ref({
  labels: ['3월', '4월', '5월', '6월', '7월', '8월'],
  datasets: [
    {
      data: [16, 22, 24, 29, 35, 42],
      backgroundColor: '#96A75E',
      borderRadius: 7,
      borderSkipped: false,
    },
  ],
})

const revenueChartOptions = ref({
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#7B7F75' },
    },
    y: {
      display: false,
      grid: { display: false },
      border: { display: false },
    },
  },
  maintainAspectRatio: false,
})
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar current-route="admin" @navigate="emit('navigate', $event)" />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="section-kicker">OVERVIEW</p>
          <h1>운영 대시보드</h1>
          <p>오늘의 구독·수익·회원 현황을 빠르게 확인합니다.</p>
        </div>
        <button class="admin-notification" type="button" aria-label="운영 알림">
          <BellRing :size="20" aria-hidden="true" />
          <span>3</span>
        </button>
      </header>

      <section class="admin-kpi-grid">
        <article class="admin-kpi-card">
          <span class="admin-kpi-card__icon">
            <UsersRound :size="21" aria-hidden="true" />
          </span>
          <p>현재 구독자</p>
          <strong>1,248명</strong>
          <small><ArrowUpRight :size="14" aria-hidden="true" /> 지난달 대비 8.4%</small>
        </article>
        <article class="admin-kpi-card">
          <span class="admin-kpi-card__icon admin-kpi-card__icon--orange">
            <CreditCard :size="21" aria-hidden="true" />
          </span>
          <p>이번 달 수익</p>
          <strong>42,680,000원</strong>
          <small><ArrowUpRight :size="14" aria-hidden="true" /> 지난달 대비 12.1%</small>
        </article>
        <article class="admin-kpi-card">
          <span class="admin-kpi-card__icon admin-kpi-card__icon--blue">
            <UsersRound :size="21" aria-hidden="true" />
          </span>
          <p>전체 회원</p>
          <strong>2,936명</strong>
          <small>이번 달 신규 216명</small>
        </article>
      </section>

      <section class="admin-chart-grid">
        <article class="admin-panel signup-panel">
          <div class="admin-panel__heading">
            <div>
              <p class="section-kicker">MEMBER SOURCE</p>
              <h2>가입 경로 분포</h2>
            </div>
            <button type="button">이번 달</button>
          </div>
          <div class="donut-layout">
            <div class="chart-frame chart-frame--donut">
              <Chart type="doughnut" :data="signupChartData" :options="signupChartOptions" />
            </div>
            <ul class="chart-legend">
              <li><span class="legend-dot legend-dot--olive"></span>Google <strong>42%</strong></li>
              <li>
                <span class="legend-dot legend-dot--orange"></span>카카오 <strong>31%</strong>
              </li>
              <li>
                <span class="legend-dot legend-dot--blue"></span>챱챱 회원 <strong>19%</strong>
              </li>
              <li><span class="legend-dot legend-dot--gray"></span>기타 <strong>8%</strong></li>
            </ul>
          </div>
        </article>
        <article class="admin-panel">
          <div class="admin-panel__heading">
            <div>
              <p class="section-kicker">REVENUE</p>
              <h2>월별 수익 추이</h2>
            </div>
            <strong class="chart-value">4,268만원</strong>
          </div>
          <div class="chart-frame chart-frame--bar">
            <Chart type="bar" :data="revenueChartData" :options="revenueChartOptions" />
          </div>
        </article>
      </section>

      <section class="admin-panel admin-table-panel">
        <div class="admin-panel__heading">
          <div>
            <p class="section-kicker">RECENT SUBSCRIPTIONS</p>
            <h2>최근 구독 현황</h2>
          </div>
          <button class="admin-outline-button" type="button" @click="emit('navigate', 'wf-043')">
            전체 보기
          </button>
        </div>
        <DataTable :value="recentSubscriptions" class="admin-data-table">
          <Column field="name" header="회원" />
          <Column field="plan" header="플랜" />
          <Column field="nextDelivery" header="다음 배송" />
          <Column field="status" header="상태" />
        </DataTable>
      </section>
    </main>
  </div>
</template>
