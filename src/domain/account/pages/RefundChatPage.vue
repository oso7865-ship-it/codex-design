<script setup>
import { nextTick, ref } from 'vue'
import { ArrowUp, Headphones, Paperclip } from 'lucide-vue-next'
import PageBackButton from '../../../shared/components/navigation/PageBackButton.vue'
import StatusBadge from '../../../shared/components/feedback/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const message = ref('')
const chatLog = ref([
  {
    id: 1,
    sender: 'agent',
    text: '안녕하세요. 챱챱 상담사입니다. 환불을 원하는 결제 내역과 사유를 확인해 드릴게요.',
    time: '오전 10:02',
  },
  {
    id: 2,
    sender: 'user',
    text: '다음 배송이 시작되기 전에 구독 결제 환불을 상담하고 싶어요.',
    time: '오전 10:03',
  },
])
const chatEnd = ref(null)

async function sendMessage() {
  const trimmedMessage = message.value.trim()

  if (!trimmedMessage) {
    return
  }

  chatLog.value.push({
    id: Date.now(),
    sender: 'user',
    text: trimmedMessage,
    time: '방금',
  })
  message.value = ''

  // nextTick은 새 메시지가 화면에 그려진 다음 스크롤하도록 실행 순서를 기다립니다.
  await nextTick()
  chatEnd.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="page management-page chat-page">
    <PageBackButton label="환불 내역으로" @back="emit('navigate', 'wf-035')" />

    <section class="page-intro">
      <p class="section-kicker">REFUND SUPPORT</p>
      <h1>환불 상담</h1>
      <p>결제와 배송 상태를 확인한 뒤 상담사가 가능한 처리 방법을 안내합니다.</p>
    </section>

    <aside class="chat-order-summary">
      <span><Headphones :size="21" aria-hidden="true" /></span>
      <div>
        <small>상담 대상 결제</small>
        <strong>PAY-202607-0012 · Solo 플랜</strong>
        <p>결제 금액: 가격 미정 · 신한카드 ···· 1234</p>
      </div>
      <StatusBadge status="환불 검토" />
    </aside>

    <section class="chat-panel" aria-label="환불 상담 메시지">
      <div class="chat-messages" aria-live="polite">
        <div
          v-for="item in chatLog"
          :key="item.id"
          class="chat-message"
          :class="`chat-message--${item.sender}`"
        >
          <strong>{{ item.sender === 'agent' ? '챱챱 상담사' : '나' }}</strong>
          <p>{{ item.text }}</p>
          <small>{{ item.time }}</small>
        </div>
        <span ref="chatEnd"></span>
      </div>

      <form class="chat-composer" @submit.prevent="sendMessage">
        <button type="button" aria-label="파일 첨부" disabled>
          <Paperclip :size="20" aria-hidden="true" />
        </button>
        <label>
          <span class="sr-only">상담 메시지</span>
          <textarea
            v-model="message"
            rows="1"
            placeholder="상담 내용을 입력해 주세요."
            @keydown.enter.exact.prevent="sendMessage"
          />
        </label>
        <button
          class="chat-send-button"
          type="submit"
          :disabled="!message.trim()"
          aria-label="전송"
        >
          <ArrowUp :size="19" aria-hidden="true" />
        </button>
      </form>
    </section>

    <p class="form-help">상담 연결과 파일 첨부는 고객지원 시스템 연결 후 사용할 수 있습니다.</p>
  </div>
</template>
