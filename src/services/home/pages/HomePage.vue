<script setup>
import { ArrowRight, CalendarCheck2, CheckCircle2, Sparkles } from 'lucide-vue-next'

const emit = defineEmits(['navigate'])
</script>

<template>
  <div class="page page-home">
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow"><Sparkles :size="15" aria-hidden="true" /> 내 일정에 맞춘 식사 구독</p>
        <h1>잘 먹는 일상을,<br />가볍게 이어가요.</h1>
        <p class="hero-description">
          필요한 날에 맞춰 메뉴를 고르고, 챱챱이 준비한 식사를 정기적으로 받아보세요.
        </p>
        <div class="hero-actions">
          <button class="button button-primary" type="button" @click="emit('navigate', 'plans')">
            플랜 살펴보기 <ArrowRight :size="18" aria-hidden="true" />
          </button>
          <button class="text-button" type="button" @click="emit('navigate', 'menu')">
            이번 주 메뉴 보기
          </button>
        </div>
      </div>

      <div
        class="hero-photo-placeholder"
        role="img"
        aria-label="챱챱 식사 구독 히어로 사진이 들어갈 자리"
      >
        <span>사진이 필요한 곳입니다.</span>
      </div>
    </section>

    <section class="section-block">
      <div class="section-heading">
        <div>
          <p class="section-kicker">CHOPCHOP ROUTINE</p>
          <h2>구독은 어렵지 않아요</h2>
        </div>
      </div>
      <div class="routine-grid">
        <article class="routine-card">
          <span class="routine-number">01</span>
          <CalendarCheck2 :size="24" aria-hidden="true" />
          <h3>내 일정에 맞춰 설정</h3>
          <p>플랜과 배송 요일을 먼저 선택해요.</p>
        </article>
        <article class="routine-card">
          <span class="routine-number">02</span>
          <CheckCircle2 :size="24" aria-hidden="true" />
          <h3>포함 메뉴를 구성</h3>
          <p>플랜 범위 안에서 원하는 메뉴를 담아요.</p>
        </article>
        <article class="routine-card routine-card--accent">
          <span class="routine-number">03</span>
          <Sparkles :size="24" aria-hidden="true" />
          <h3>정기적으로 받아보기</h3>
          <p>다음 배송과 결제 일정도 한눈에 확인해요.</p>
        </article>
      </div>
    </section>

    <section class="plan-prompt">
      <div>
        <p class="section-kicker">FOR YOUR ROUTINE</p>
        <h2>나에게 맞는 플랜부터<br />찾아볼까요?</h2>
      </div>
      <button class="button button-secondary" type="button" @click="emit('navigate', 'plans')">
        플랜 비교하기
      </button>
    </section>
  </div>
</template>
