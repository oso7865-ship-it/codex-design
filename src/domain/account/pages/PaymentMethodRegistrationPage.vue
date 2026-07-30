<script setup>
import { CheckCircle2, CreditCard, ExternalLink, ShieldCheck } from 'lucide-vue-next'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'

const emit = defineEmits(['navigate'])
</script>

<template>
  <div class="page management-page payment-register-page">
    <PageBackButton @back="emit('navigate', 'wf-030')" />

    <section class="page-intro">
      <p class="section-kicker">ADD PAYMENT METHOD</p>
      <h1>새 결제 수단을 등록해요.</h1>
      <p>안전한 카드 등록을 위해 결제사 보안 화면으로 이동합니다.</p>
    </section>

    <section class="payment-register-card">
      <span class="payment-register-card__icon">
        <CreditCard :size="28" aria-hidden="true" />
      </span>
      <div>
        <h2>등록 전에 확인해 주세요.</h2>
        <ul>
          <li><CheckCircle2 :size="17" aria-hidden="true" /> 본인 명의 카드를 준비해 주세요.</li>
          <li>
            <CheckCircle2 :size="17" aria-hidden="true" /> 카드 번호는 챱챱 서버에 저장되지
            않습니다.
          </li>
          <li>
            <CheckCircle2 :size="17" aria-hidden="true" /> 완료 후 이 화면으로 자동 복귀합니다.
          </li>
        </ul>
      </div>
    </section>

    <aside class="notice-box notice-box--info">
      <ShieldCheck :size="20" aria-hidden="true" />
      <div>
        <strong>결제사 연결 전 안내</strong>
        <p>현재는 디자인 단계이므로 실제 카드 등록 대신 기존 결제 수단 화면으로 돌아갑니다.</p>
      </div>
    </aside>

    <button
      class="button button-primary payment-register-action"
      type="button"
      @click="emit('navigate', 'wf-030')"
    >
      결제사 보안 화면으로 이동
      <ExternalLink :size="18" aria-hidden="true" />
    </button>
  </div>
</template>
