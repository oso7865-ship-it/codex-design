<script setup>
import { Mail, MapPin } from 'lucide-vue-next'

const emit = defineEmits(['navigate'])

const sections = [
  {
    title: '서비스',
    items: [
      { label: '메뉴 보기', route: 'menu' },
      { label: '플랜 보기', route: 'plans' },
      { label: '이용 가이드', route: 'customer-support' },
      { label: '자주 묻는 질문', route: 'customer-support' },
    ],
  },
  {
    title: '안내',
    items: [
      { label: '고객지원', route: 'customer-support' },
      { label: '이용약관', route: 'terms' },
      { label: '개인정보처리방침', route: 'privacy' },
      { label: '위치기반서비스 약관', route: 'location-terms' },
    ],
  },
]
</script>

<template>
  <footer class="customer-footer">
    <div class="customer-footer__main">
      <div class="customer-footer__brand">
        <strong>챱챱</strong>
        <p>내 일정에 맞춘 식사 구독 서비스</p>
        <span>공식 SNS 채널은 서비스 오픈 전에 안내됩니다.</span>
      </div>

      <div v-for="section in sections" :key="section.title" class="customer-footer__links">
        <h2>{{ section.title }}</h2>
        <button
          v-for="item in section.items"
          :key="item.label"
          type="button"
          @click="emit('navigate', item.route)"
        >
          {{ item.label }}
        </button>
      </div>

      <div class="customer-footer__contact">
        <h2>고객센터</h2>
        <p><Mail :size="15" aria-hidden="true" /> 상담 채팅을 이용해 주세요.</p>
        <p><MapPin :size="15" aria-hidden="true" /> 사업장 정보 오픈 전 공개</p>
        <button type="button" @click="emit('navigate', 'customer-support')">
          운영 시간과 문의 방법 보기
        </button>
      </div>
    </div>

    <div class="customer-footer__bottom">
      <p>상호명·대표자명·사업자등록번호·통신판매업 신고번호는 서비스 오픈 전에 공개됩니다.</p>
      <p>© 2026 챱챱. All rights reserved.</p>
    </div>
  </footer>
</template>
