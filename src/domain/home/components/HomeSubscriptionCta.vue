<script setup>
import { ArrowRight } from 'lucide-vue-next'

// defineEmits는 구독 시작과 플랜 비교 요청을 부모 페이지로 전달하는 Vue 문법입니다.
const emit = defineEmits(['navigate'])
</script>

<template>
  <!-- section은 메인 안내를 모두 확인한 뒤 구독을 시작하는 마지막 행동 영역입니다. -->
  <section class="home-subscription-cta">
    <div>
      <h2>나에게 맞는 플랜으로<br />식사 루틴을 시작해 보세요.</h2>
      <p>처음 시작한다면 추천 Solo 플랜부터 확인할 수 있어요.</p>
    </div>

    <div class="home-subscription-cta__actions">
      <button class="button button-primary" type="button" @click="emit('navigate', 'wf-011')">
        구독 시작하기
        <ArrowRight :size="18" aria-hidden="true" />
      </button>
      <button class="button button-secondary" type="button" @click="emit('navigate', 'plans')">
        플랜 비교하기
      </button>
    </div>
  </section>
</template>

<style scoped>
/* scoped는 이 파일의 스타일을 마지막 구독 CTA 컴포넌트 안에서만 적용하는 Vue 기능입니다. */
/* 마지막 CTA는 주요 행동과 보조 행동의 시각적 우선순위를 분명하게 나눕니다. */
.home-subscription-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 38px;
  margin-top: 96px;
  padding: 44px 48px;
  border-radius: 25px;
  background: var(--color-secondary-soft);
}

.home-subscription-cta h2 {
  margin-top: 0;
  font-size: 31px;
}

.home-subscription-cta > div > p:last-child {
  margin-top: 12px;
  font-size: 14px;
}

.home-subscription-cta__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
}

@media (max-width: 760px) {
  .home-subscription-cta {
    align-items: stretch;
    flex-direction: column;
    gap: 26px;
    margin-top: 68px;
    padding: 32px 25px;
  }

  .home-subscription-cta h2 {
    font-size: 26px;
  }

  .home-subscription-cta__actions {
    flex-direction: column;
  }

  .home-subscription-cta__actions .button {
    width: 100%;
  }
}
</style>
