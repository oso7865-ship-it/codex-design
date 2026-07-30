<script setup>
import { AlertTriangle, Check, ChevronRight, Leaf } from 'lucide-vue-next'
import { menuItems } from '../../../shared/mocks/prototypeData'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'

const emit = defineEmits(['navigate'])
const menu = menuItems[0]
</script>

<template>
  <div class="page detail-feature-page">
    <PageBackButton label="메뉴 목록으로" @back="emit('navigate', 'wf-008')" />

    <section class="menu-detail-hero">
      <div class="photo-placeholder photo-placeholder--large">[사진이 필요한 곳입니다.]</div>
      <div class="menu-detail-copy">
        <p class="section-kicker">{{ menu.type }}</p>
        <h1>{{ menu.name }}</h1>
        <p>{{ menu.description }}</p>
        <span class="included-label"><Check :size="16" aria-hidden="true" /> 플랜 포함 메뉴</span>

        <dl class="menu-facts">
          <div>
            <dt>영양 정보</dt>
            <dd>{{ menu.nutrition }}</dd>
          </div>
          <div>
            <dt>알레르기</dt>
            <dd>{{ menu.allergens }}</dd>
          </div>
        </dl>

        <button class="button button-primary" type="button" @click="emit('navigate', 'plans')">
          플랜에서 선택하기
          <ChevronRight :size="18" aria-hidden="true" />
        </button>
      </div>
    </section>

    <section class="menu-detail-notes">
      <article>
        <Leaf :size="21" aria-hidden="true" />
        <div>
          <strong>메뉴 구성 원칙</strong>
          <p>한 끼의 균형과 구독 중 선택하기 쉬운 구성을 기준으로 준비합니다.</p>
        </div>
      </article>
      <article>
        <AlertTriangle :size="21" aria-hidden="true" />
        <div>
          <strong>알레르기 정보 확인</strong>
          <p>최종 원재료와 교차오염 정보는 실제 상품 라벨과 서버 데이터를 확인해야 합니다.</p>
        </div>
      </article>
    </section>
  </div>
</template>
