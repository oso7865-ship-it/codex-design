<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { menuItems } from '../../../shared/mocks/prototypeData'

// defineEmits는 메뉴 전체 보기 요청을 부모 페이지로 전달하는 Vue 문법입니다.
const emit = defineEmits(['navigate'])

// 첫 번째 메뉴는 추천 메뉴로 크게 보여 주고, 나머지는 오른쪽 목록으로 분리합니다.
const recommendedMenu = menuItems[0]
const otherMenus = menuItems.slice(1)
</script>

<template>
  <!-- section은 이번 주 메뉴 미리보기라는 하나의 주제를 가진 영역을 구분합니다. -->
  <section class="home-menu" aria-labelledby="home-menu-title">
    <div class="home-menu__heading">
      <div>
        <p class="section-kicker">THIS WEEK'S MENU</p>
        <h2 id="home-menu-title">이번 주 챱챱 메뉴</h2>
        <p>추천 메뉴와 이번 주에 선택할 수 있는 다른 메뉴를 함께 살펴보세요.</p>
      </div>
    </div>

    <div class="home-menu__showcase">
      <div class="home-menu__recommended">
        <div class="home-menu__recommended-photo">[사진이 필요한 곳입니다.]</div>

        <div class="home-menu__recommended-content">
          <div class="home-menu__recommended-heading">
            <span class="home-menu__recommend-label">이번 주 추천</span>
            <span class="home-menu__type-label">{{ recommendedMenu.type }}</span>
          </div>
          <h3>{{ recommendedMenu.name }}</h3>
          <p>{{ recommendedMenu.description }}</p>
          <strong>{{ recommendedMenu.nutrition }}</strong>
        </div>
      </div>

      <div class="home-menu__others" aria-label="이번 주 다른 메뉴">
        <!-- v-for는 추천 메뉴를 제외한 나머지 메뉴를 같은 가로형 카드로 반복합니다. -->
        <div
          v-for="menu in otherMenus"
          :key="menu.id"
          class="home-menu__other-card"
          :class="{ 'is-disabled': !menu.available }"
        >
          <div class="home-menu__other-photo">[사진이 필요한 곳입니다.]</div>

          <div class="home-menu__other-content">
            <div class="home-menu__other-meta">
              <span>{{ menu.type }}</span>
              <!-- v-if는 선택할 수 없는 메뉴에만 수량 제한 문구를 만드는 Vue 조건부 표시 문법입니다. -->
              <span v-if="!menu.available" class="home-menu__limit-label">수량 제한</span>
            </div>
            <h3>{{ menu.name }}</h3>
            <p>{{ menu.description }}</p>
            <strong>{{ menu.nutrition }}</strong>
          </div>
        </div>
      </div>
    </div>

    <button
      class="button button-primary home-menu__more"
      type="button"
      @click="emit('navigate', 'menu')"
    >
      이번 주 메뉴 전체 보기
      <ArrowRight :size="18" aria-hidden="true" />
    </button>
  </section>
</template>

<style scoped>
/* scoped는 이 파일의 스타일을 메뉴 컴포넌트 안에서만 적용하는 Vue 기능입니다. */
/* 추천 메뉴와 일반 메뉴의 시각적 우선순위를 크기 차이로 전달합니다. */
.home-menu {
  position: relative;
  margin-top: 96px;
}

.home-menu__heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.home-menu__heading h2 {
  margin-top: 7px;
  font-size: 31px;
}

.home-menu__heading > div > p:last-child {
  margin-top: 9px;
  font-size: 14px;
}

.home-menu__showcase {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
  gap: 18px;
  margin-top: 25px;
}

.home-menu__recommended,
.home-menu__other-card {
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-primary-soft);
}

.home-menu__recommended {
  display: grid;
  grid-template-rows: minmax(360px, 1fr) auto;
  border-radius: 24px;
  box-shadow: var(--shadow-soft);
}

.home-menu__recommended-photo,
.home-menu__other-photo {
  display: grid;
  place-items: center;
  background: var(--color-primary-soft);
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.home-menu__recommended-photo {
  min-height: 360px;
  border-bottom: 1px dashed var(--color-border);
}

.home-menu__recommended-content {
  padding: 25px 26px 27px;
}

.home-menu__recommended-heading,
.home-menu__other-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.home-menu__recommend-label,
.home-menu__type-label,
.home-menu__other-meta > span {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
}

.home-menu__recommend-label {
  background: var(--color-primary);
  color: var(--color-text);
}

.home-menu__type-label,
.home-menu__other-meta > span:first-child {
  border-color: var(--color-primary);
  background: transparent;
  color: var(--color-primary-pressed);
}

.home-menu__recommended-content h3 {
  margin-top: 16px;
  font-size: 24px;
}

.home-menu__recommended-content p {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.7;
}

.home-menu__recommended-content strong {
  display: block;
  margin-top: 18px;
  font-size: 13px;
}

.home-menu__others {
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.home-menu__other-card {
  display: grid;
  grid-template-columns: minmax(150px, 38%) minmax(0, 1fr);
  min-height: 192px;
  border-radius: 20px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.home-menu__other-card:not(.is-disabled):hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-soft);
  transform: translateY(-2px);
}

.home-menu__other-card.is-disabled {
  opacity: 0.62;
}

.home-menu__other-photo {
  min-height: 190px;
  border-right: 1px dashed var(--color-border);
}

.home-menu__other-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.home-menu__other-meta {
  color: var(--color-primary-pressed);
}

.home-menu__other-meta .home-menu__limit-label {
  border-color: var(--color-primary-hover);
  background: transparent;
  color: var(--color-text-muted);
}

.home-menu__other-content h3 {
  margin-top: 12px;
  font-size: 17px;
  line-height: 1.35;
}

.home-menu__other-content p {
  display: -webkit-box;
  margin-top: 8px;
  overflow: hidden;
  color: var(--color-text-muted);
  font-size: 12px;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.home-menu__other-content strong {
  display: block;
  margin-top: auto;
  padding-top: 12px;
  font-size: 11px;
}

.home-menu__more {
  width: fit-content;
  display: flex;
  margin: 26px 0 0 auto;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 15px;
}

.home-menu__more svg {
  transition: transform 0.2s ease;
}

.home-menu__more:hover svg {
  transform: translateX(4px);
}

@media (max-width: 960px) {
  .home-menu__showcase {
    grid-template-columns: minmax(0, 1fr);
  }

  .home-menu__recommended {
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    grid-template-rows: minmax(330px, auto);
  }

  .home-menu__recommended-photo {
    min-height: 330px;
    border-right: 1px dashed var(--color-border);
    border-bottom: 0;
  }
}

@media (max-width: 760px) {
  .home-menu {
    margin-top: 68px;
  }

  .home-menu__heading {
    align-items: flex-start;
  }

  .home-menu__heading h2 {
    font-size: 26px;
  }

  .home-menu__showcase {
    gap: 14px;
  }

  .home-menu__recommended {
    display: block;
    border-radius: 20px;
  }

  .home-menu__recommended-photo {
    min-height: 230px;
    border-right: 0;
    border-bottom: 1px dashed var(--color-border);
  }

  .home-menu__recommended-content {
    padding: 22px 20px 24px;
  }

  .home-menu__recommended-content h3 {
    font-size: 21px;
  }

  .home-menu__others {
    grid-template-rows: none;
  }

  .home-menu__other-card {
    grid-template-columns: 112px minmax(0, 1fr);
    min-height: 154px;
    border-radius: 17px;
  }

  .home-menu__other-photo {
    min-height: 152px;
  }

  .home-menu__other-content {
    padding: 16px;
  }

  .home-menu__other-content h3 {
    margin-top: 9px;
    font-size: 15px;
  }

  .home-menu__other-content p {
    display: none;
  }

  .home-menu__other-content strong {
    padding-top: 10px;
  }

  .home-menu__more {
    width: 100%;
    margin-top: 22px;
  }
}

@media (max-width: 380px) {
  .home-menu__other-card {
    grid-template-columns: 96px minmax(0, 1fr);
  }

  .home-menu__other-content {
    padding: 14px;
  }
}
</style>
