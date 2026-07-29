<script setup>
import { ChevronRight, Search, SlidersHorizontal } from 'lucide-vue-next'
import { menuItems } from '../../../shared/mocks/prototypeData'
import ContentState from '../../../shared/components/ui/ContentState.vue'

const emit = defineEmits(['navigate'])
</script>

<template>
  <div class="page catalog-page">
    <section class="page-intro page-intro--with-action">
      <div>
        <p class="section-kicker">CHAPCHAP MENU</p>
        <h1>이번 구독에서 만날<br />메뉴를 살펴보세요.</h1>
        <p>메뉴는 플랜에 포함되며 메뉴별 가격은 표시하지 않습니다.</p>
      </div>
      <button class="button button-outline" type="button">
        <SlidersHorizontal :size="18" aria-hidden="true" />
        알레르기 필터
      </button>
    </section>

    <label class="catalog-search">
      <Search :size="19" aria-hidden="true" />
      <span class="sr-only">메뉴 검색</span>
      <input type="search" placeholder="메뉴 이름이나 식단 유형 검색" />
    </label>

    <ContentState state="ready">
      <section class="catalog-menu-grid" aria-label="메뉴 목록">
        <button
          v-for="menu in menuItems"
          :key="menu.id"
          class="catalog-menu-card"
          :class="{ 'is-disabled': !menu.available }"
          type="button"
          :disabled="!menu.available"
          @click="emit('navigate', 'wf-009')"
        >
          <span class="photo-placeholder">[사진이 필요한 곳입니다.]</span>
          <span class="catalog-menu-card__body">
            <small>{{ menu.type }}</small>
            <strong>{{ menu.name }}</strong>
            <span>{{ menu.description }}</span>
            <b>{{ menu.available ? '플랜 포함 메뉴' : '수량 제한' }}</b>
          </span>
          <ChevronRight v-if="menu.available" :size="20" aria-hidden="true" />
        </button>
      </section>
    </ContentState>
  </div>
</template>
