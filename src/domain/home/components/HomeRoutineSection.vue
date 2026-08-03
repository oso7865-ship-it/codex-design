<script setup>
import { CalendarCheck2, CheckCircle2, Sparkles } from 'lucide-vue-next'

// icon에는 실제로 화면에 그릴 Lucide 아이콘 컴포넌트를 담습니다.
const routineSteps = [
  {
    number: '01',
    title: '내 일정에 맞춰 설정',
    description: '플랜과 배송 희망일을 먼저 선택해요.',
    icon: CalendarCheck2,
  },
  {
    number: '02',
    title: '포함 메뉴를 구성',
    description: '플랜 범위 안에서 원하는 메뉴를 담아요.',
    icon: CheckCircle2,
  },
  {
    number: '03',
    title: '정기적으로 받아보기',
    description: '다음 배송과 결제 일정도 한눈에 확인해요.',
    icon: Sparkles,
    accent: true,
  },
]
</script>

<template>
  <!-- section은 구독 이용 순서라는 하나의 주제를 가진 영역을 구분합니다. -->
  <section class="home-routine">
    <div class="section-heading">
      <div>
        <p class="section-kicker">CHOPCHOP ROUTINE</p>
        <h2>구독은 어렵지 않아요</h2>
      </div>
    </div>

    <!-- v-for는 routineSteps의 세 항목을 같은 카드 구조로 반복해서 보여 주는 Vue 문법입니다. -->
    <div class="home-routine__grid">
      <div
        v-for="step in routineSteps"
        :key="step.number"
        class="home-routine__card"
        :class="{ 'home-routine__card--accent': step.accent }"
      >
        <span class="home-routine__number">{{ step.number }}</span>

        <!-- component :is는 배열에 저장한 아이콘을 현재 항목에 맞춰 바꿔 그리는 Vue 문법입니다. -->
        <component :is="step.icon" :size="24" aria-hidden="true" />
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* scoped는 이 파일의 스타일을 이용 방법 컴포넌트 안에서만 적용하는 Vue 기능입니다. */
/* 이용 순서는 세 카드가 한 흐름으로 읽히도록 동일한 높이와 간격을 사용합니다. */
.home-routine {
  margin-top: 88px;
}

.home-routine__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.home-routine__card {
  position: relative;
  min-height: 212px;
  padding: 26px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 22px;
  background: var(--color-surface);
}

.home-routine__card--accent {
  background: var(--color-primary-soft);
}

.home-routine__card svg {
  margin-top: 28px;
  color: var(--color-primary-pressed);
}

.home-routine__card h3 {
  margin-top: 12px;
  font-size: 19px;
}

.home-routine__card p {
  margin-top: 7px;
  font-size: 14px;
}

.home-routine__number {
  position: absolute;
  top: 24px;
  right: 24px;
  color: #b6bea0;
  font-size: 13px;
  font-weight: 800;
}

@media (max-width: 760px) {
  .home-routine {
    margin-top: 58px;
  }

  .home-routine__grid {
    grid-template-columns: 1fr;
  }

  .home-routine__card {
    min-height: 175px;
  }

  .home-routine__card svg {
    margin-top: 19px;
  }
}
</style>
