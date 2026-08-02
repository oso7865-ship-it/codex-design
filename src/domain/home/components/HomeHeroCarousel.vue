<script setup>
import { ref } from 'vue'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-vue-next'

// defineEmits는 이 컴포넌트가 부모에게 화면 이동을 요청할 때 사용하는 Vue 문법입니다.
const emit = defineEmits(['navigate'])

// 캐러셀의 문구와 이동 위치를 한 배열에서 관리하면 새 슬라이드가 생겨도 화면 코드를 반복하지 않습니다.
const slides = [
  {
    id: 'service-introduction',
    theme: 'routine',
    eyebrow: '내 일정에 맞춘 식사 구독',
    title: '잘 먹는 일상을,\n가볍게 이어가요.',
    description: '필요한 날에 맞춰 메뉴를 고르고, 챱챱이 준비한 식사를 정기적으로 받아보세요.',
    primaryAction: { label: '플랜 살펴보기', route: 'plans' },
    secondaryAction: { label: '이번 주 메뉴 보기', route: 'menu' },
    features: ['원하는 배송 요일', '2주 단위 구독', '메뉴 직접 구성'],
  },
  {
    id: 'trial-plan',
    theme: 'trial',
    eyebrow: '처음이라면 가볍게',
    title: '챱챱을 먼저\n체험해 보세요.',
    description: '정기 구독을 시작하기 전에 원하는 메뉴로 챱챱의 식사 구독을 경험해 보세요.',
    primaryAction: { label: '체험 플랜 시작하기', route: 'wf-012' },
    secondaryAction: { label: '전체 플랜 보기', route: 'plans' },
    features: ['1주 체험', '메뉴 3개 선택', '자동 유료 전환 없음'],
  },
]

// ref는 값이 바뀌면 연결된 화면도 다시 그려 주는 Vue의 반응형 상태입니다.
const currentSlide = ref(0)

const SWIPE_DISTANCE = 48
let touchStartX = 0

// 하단의 페이지 표시를 누르면 해당 번호의 슬라이드로 이동합니다.
function showSlide(index) {
  currentSlide.value = index
}

// 마지막 슬라이드에서 다음을 누르면 첫 번째 슬라이드로 돌아갑니다.
function showNextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

// 첫 번째 슬라이드에서 이전을 누르면 마지막 슬라이드로 이동합니다.
function showPreviousSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

// 손가락이 화면에 닿은 가로 위치를 저장해 스와이프 방향을 계산합니다.
function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].clientX
}

// 손가락 이동 거리가 기준보다 클 때만 슬라이드를 바꿔 작은 터치를 오작동으로 처리하지 않습니다.
function handleTouchEnd(event) {
  const movedDistance = event.changedTouches[0].clientX - touchStartX

  if (Math.abs(movedDistance) >= SWIPE_DISTANCE) {
    if (movedDistance < 0) {
      showNextSlide()
    } else {
      showPreviousSlide()
    }
  }
}
</script>

<template>
  <!-- section은 하나의 주제를 가진 화면 영역을 구분하는 의미형 HTML 태그입니다. -->
  <!-- .passive는 스와이프 중 화면 스크롤을 막지 않고 터치 위치만 읽게 하는 Vue 이벤트 옵션입니다. -->
  <section
    class="home-hero"
    aria-label="챱챱 주요 안내"
    aria-roledescription="캐러셀"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <div class="home-hero__viewport">
      <!--
        v-for는 slides 배열의 항목 수만큼 슬라이드를 반복해서 만듭니다.
        :style은 현재 번호에 따라 슬라이드 묶음을 가로로 이동시키는 Vue 속성 연결 문법입니다.
      -->
      <div class="home-hero__track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="home-hero__slide"
          :class="`home-hero__slide--${slide.theme}`"
          :aria-hidden="currentSlide !== index"
        >
          <div class="home-hero__content">
            <p class="eyebrow">
              <Sparkles :size="15" aria-hidden="true" />
              {{ slide.eyebrow }}
            </p>
            <h1>{{ slide.title }}</h1>
            <p class="home-hero__description">{{ slide.description }}</p>

            <div class="home-hero__actions">
              <!-- tabindex가 -1인 숨은 슬라이드의 버튼은 키보드 탭 순서에서 제외됩니다. -->
              <button
                class="button"
                :class="slide.theme === 'trial' ? 'button-trial' : 'button-primary'"
                type="button"
                :tabindex="currentSlide === index ? 0 : -1"
                @click="emit('navigate', slide.primaryAction.route)"
              >
                {{ slide.primaryAction.label }}
                <ArrowRight :size="18" aria-hidden="true" />
              </button>
              <button
                class="text-button"
                type="button"
                :tabindex="currentSlide === index ? 0 : -1"
                @click="emit('navigate', slide.secondaryAction.route)"
              >
                {{ slide.secondaryAction.label }}
              </button>
            </div>

            <!-- ul과 li는 서로 관련된 특징을 하나의 목록으로 전달하는 의미형 HTML 태그입니다. -->
            <ul class="home-hero__features">
              <li v-for="feature in slide.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- nav는 캐러셀 페이지를 이동하는 조작 버튼 묶음임을 알려 주는 의미형 HTML 태그입니다. -->
    <!-- :class는 체험 슬라이드에서 컨트롤 색상을 Secondary로 바꾸는 Vue 속성 연결 문법입니다. -->
    <nav
      class="home-hero__navigation"
      :class="{ 'home-hero__navigation--trial': slides[currentSlide].theme === 'trial' }"
      aria-label="히어로 슬라이드 이동"
    >
      <button type="button" aria-label="이전 슬라이드" @click="showPreviousSlide">
        <ArrowLeft :size="18" aria-hidden="true" />
      </button>

      <div class="home-hero__indicators">
        <button
          v-for="(slide, index) in slides"
          :key="`${slide.id}-indicator`"
          type="button"
          :class="{ 'is-active': currentSlide === index }"
          :aria-label="`${index + 1}번 슬라이드 보기`"
          :aria-current="currentSlide === index ? 'true' : undefined"
          @click="showSlide(index)"
        />
      </div>

      <span class="home-hero__count" aria-live="polite">
        {{ String(currentSlide + 1).padStart(2, '0') }} /
        {{ String(slides.length).padStart(2, '0') }}
      </span>

      <button type="button" aria-label="다음 슬라이드" @click="showNextSlide">
        <ArrowRight :size="18" aria-hidden="true" />
      </button>
    </nav>
  </section>
</template>

<style scoped>
/* scoped는 이 파일의 스타일이 다른 페이지의 같은 태그나 클래스에 섞이지 않게 제한하는 Vue 기능입니다. */
/* 히어로는 사진 상자 없이 문구와 행동을 전체 폭으로 보여 주는 캐러셀입니다. */
.home-hero {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  background: var(--color-surface);
}

.home-hero__viewport {
  overflow: hidden;
}

.home-hero__track {
  display: flex;
  transition: transform 0.45s ease;
}

.home-hero__slide {
  flex: 0 0 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  padding: 72px 92px 106px;
}

.home-hero__slide--routine {
  background: linear-gradient(135deg, #f2f4e7 0%, #fffdf9 64%, #fff5e9 100%);
}

.home-hero__slide--trial {
  background: linear-gradient(135deg, #fff3e4 0%, #fffaf4 62%, #f3f5e9 100%);
}

.home-hero__content {
  width: min(100%, 780px);
}

.home-hero h1 {
  max-width: 760px;
  margin-top: 18px;
  white-space: pre-line;
  font-size: clamp(42px, 5.4vw, 72px);
  line-height: 1.08;
  letter-spacing: -0.045em;
}

.home-hero__description {
  max-width: 600px;
  margin-top: 22px;
  font-size: 17px;
  line-height: 1.75;
}

.home-hero__actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 32px;
}

.home-hero__features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 36px;
  list-style: none;
}

.home-hero__features li {
  padding: 9px 13px;
  border: 1px solid rgba(125, 142, 73, 0.25);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 700;
}

.home-hero__navigation {
  /* 아래 변수는 슬라이드 성격에 따라 컨트롤 색상만 교체하기 위한 CSS 사용자 정의 속성입니다. */
  --hero-control-accent: var(--color-primary);
  --hero-control-pressed: var(--color-primary-pressed);
  --hero-control-soft: var(--color-primary-soft);
  position: absolute;
  right: 38px;
  bottom: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border: 1px solid var(--hero-control-accent);
  border-radius: 999px;
  background: var(--hero-control-soft);
  box-shadow: 0 12px 30px rgba(40, 45, 31, 0.12);
  backdrop-filter: blur(12px);
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.home-hero__navigation--trial {
  --hero-control-accent: var(--color-secondary);
  --hero-control-pressed: #a35d13;
  --hero-control-soft: var(--color-secondary-soft);
}

.home-hero__navigation > button {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--hero-control-pressed);
  box-shadow: 0 4px 12px rgba(40, 45, 31, 0.1);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.home-hero__navigation > button:hover {
  background: var(--hero-control-accent);
  color: var(--color-text);
  transform: scale(1.06);
}

.home-hero__navigation button:focus-visible {
  outline: 2px solid var(--hero-control-accent);
  outline-offset: 2px;
}

.home-hero__indicators {
  display: flex;
  align-items: center;
  gap: 6px;
}

.home-hero__indicators button {
  width: 8px;
  height: 8px;
  border: 0;
  border-radius: 999px;
  background: var(--color-surface);
  box-shadow: inset 0 0 0 1px var(--hero-control-accent);
  transition:
    width 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.home-hero__indicators button.is-active {
  width: 26px;
  background: var(--hero-control-pressed);
  box-shadow: none;
}

.home-hero__count {
  min-width: 50px;
  color: var(--hero-control-pressed);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-align: center;
}

@media (max-width: 760px) {
  .home-hero {
    border-radius: 23px;
  }

  .home-hero__slide {
    min-height: 530px;
    align-items: flex-start;
    padding: 42px 25px 104px;
  }

  .home-hero h1 {
    font-size: clamp(30px, 9.4vw, 46px);
    line-height: 1.12;
  }

  .home-hero__description {
    margin-top: 18px;
    font-size: 14px;
  }

  .home-hero__actions {
    align-items: stretch;
    flex-direction: column;
    gap: 14px;
    margin-top: 27px;
  }

  .home-hero__actions .button,
  .home-hero__actions .text-button {
    width: 100%;
    min-height: 48px;
    justify-content: center;
  }

  .home-hero__features {
    gap: 7px;
    margin-top: 24px;
  }

  .home-hero__features li {
    padding: 7px 10px;
    font-size: 12px;
  }

  .home-hero__navigation {
    right: 18px;
    bottom: 18px;
    left: 18px;
    justify-content: space-between;
  }
}
</style>
