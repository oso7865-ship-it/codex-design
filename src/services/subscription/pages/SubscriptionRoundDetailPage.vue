<script setup>
import { AlertTriangle, Pencil } from 'lucide-vue-next'
import { subscriptionRounds } from '../../../shared/mocks/prototypeData'
import PageBackButton from '../../../shared/components/ui/PageBackButton.vue'
import StatusBadge from '../../../shared/components/ui/StatusBadge.vue'

const emit = defineEmits(['navigate'])
const round = subscriptionRounds[0]
</script>

<template>
  <div class="page management-page profile-page">
    <PageBackButton label="회차 목록으로" @back="emit('navigate', 'wf-022')" />

    <section class="page-intro">
      <p class="section-kicker">ROUND DETAIL</p>
      <h1>{{ round.title }}</h1>
      <p>회차 번호 {{ round.id }}</p>
    </section>

    <section class="detail-card">
      <div class="detail-card__heading">
        <strong>회차 상태</strong>
        <StatusBadge :status="round.status" />
      </div>
      <dl class="detail-list">
        <div>
          <dt>배송 예정일</dt>
          <dd>{{ round.deliveryDate }}</dd>
        </div>
        <div>
          <dt>메뉴 구성</dt>
          <dd>바질 닭가슴살 2개 · 단호박 소불고기 1개</dd>
        </div>
        <div>
          <dt>배송지</dt>
          <dd>{{ round.addressName }} · 대구광역시 중구 챱챱로 **</dd>
        </div>
        <div>
          <dt>배송 시간</dt>
          <dd>점심 · 11:00~13:00</dd>
        </div>
        <div>
          <dt>변경 마감</dt>
          <dd>{{ round.changeDeadline }}</dd>
        </div>
      </dl>
    </section>

    <div class="round-detail-actions">
      <button
        class="button button-secondary"
        type="button"
        :disabled="!round.canEdit"
        @click="emit('navigate', 'wf-024')"
      >
        <Pencil :size="17" aria-hidden="true" />
        메뉴 변경
      </button>
      <button
        class="button button-primary"
        type="button"
        :disabled="!round.canEdit"
        @click="emit('navigate', 'wf-025')"
      >
        배송 조건 변경
      </button>
    </div>

    <aside class="notice-box notice-box--warning">
      <AlertTriangle :size="20" aria-hidden="true" />
      <div>
        <strong>변경 마감 안내</strong>
        <p>마감 이후에는 버튼이 비활성화되며 고객센터 확인 없이는 변경할 수 없습니다.</p>
      </div>
    </aside>
  </div>
</template>
