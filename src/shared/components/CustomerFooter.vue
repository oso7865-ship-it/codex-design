<script setup>
import { Mail, MapPin } from 'lucide-vue-next'

const sections = [
  {
    title: '서비스',
    items: ['도시락 정기배송', '서비스 소개', '이용 가이드', '자주 묻는 질문'],
  },
  {
    title: '비즈니스',
    items: ['입점 문의', '제휴 문의', '공급자 가이드'],
  },
]
</script>

<template>
  <footer class="customer-footer">
    <div class="customer-footer__main">
      <div class="customer-footer__brand">
        <strong>챱챱</strong>
        <p>내 일정에 맞춘 식사 구독 서비스</p>
        <span>필요한 정보: 공식 SNS 링크</span>
      </div>

      <div v-for="section in sections" :key="section.title" class="customer-footer__links">
        <h2>{{ section.title }}</h2>
        <span v-for="item in section.items" :key="item"> 필요한 정보: {{ item }} URL </span>
      </div>

      <div class="customer-footer__contact">
        <h2>고객센터</h2>
        <p><Mail :size="15" /> 필요한 정보: 고객센터 이메일</p>
        <p><MapPin :size="15" /> 필요한 정보: 사업장 주소</p>
        <span>필요한 정보: 고객센터 운영 시간·전화번호</span>
      </div>
    </div>

    <div class="customer-footer__bottom">
      <p>필요한 정보: 상호명 · 대표자명 · 사업자등록번호 · 통신판매업 신고번호</p>
      <p>필요한 정보: 이용약관 · 개인정보처리방침 · 위치기반서비스 이용약관 URL</p>
    </div>
  </footer>
</template>
