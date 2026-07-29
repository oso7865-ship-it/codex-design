<script setup>
import { computed, ref } from 'vue'
import { CheckCircle2, ChevronRight, MapPin, Truck } from 'lucide-vue-next'
import { useAppStore } from '../../../stores/useAppStore'

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['navigate'])
const appStore = useAppStore()

const steps = ['배송', '배송지', '메뉴', '확인', '결제']
const deliveryDays = ['월요일', '수요일', '금요일']
const addresses = [
  {
    id: 'home',
    name: '집',
    address: '대구광역시 중구 챱챱로 12',
  },
]

// ref는 화면에 보여줄 값이 바뀌면 Vue가 화면도 다시 그리게 만드는 반응형 값입니다.
// 여기서는 단계별 입력이 부족할 때만 안내 문구를 표시하는 데 사용합니다.
const validationMessage = ref('')

// computed는 다른 반응형 값이 바뀔 때 결과도 자동으로 다시 계산하는 Vue 문법입니다.
// 선택된 배송지의 이름만 확인 화면에 보여주기 위해 사용합니다.
const selectedAddressName = computed(() => {
  // find는 배열을 앞에서부터 확인해 조건에 맞는 첫 번째 값을 돌려주는 배열 메서드입니다.
  const selectedAddress = addresses.find(
    (address) => address.id === appStore.subscriptionApplication.selectedAddressId,
  )

  return selectedAddress ? selectedAddress.name : '선택 필요'
})

const next = {
  1: 'wf-014',
  2: 'subscribe-menu',
  4: 'wf-017',
  5: 'wf-018',
  6: 'wf-019',
  7: 'subscription',
}

function selectAddress(addressId) {
  appStore.subscriptionApplication.selectedAddressId = addressId
}

function goNext() {
  validationMessage.value = ''

  if (props.step === 1 && appStore.subscriptionApplication.deliveryDays.length === 0) {
    validationMessage.value = '배송받을 요일을 최소 1개 선택해주세요.'
    return
  }

  if (props.step === 2 && !appStore.subscriptionApplication.selectedAddressId) {
    validationMessage.value = '배송지를 선택해주세요.'
    return
  }

  if (props.step === 5 && !appStore.subscriptionApplication.isAutoPaymentAgreed) {
    validationMessage.value = '자동결제 동의 후 결제를 요청할 수 있어요.'
    return
  }

  if (props.step === 6) {
    appStore.completeSubscriptionApplication()
  }

  emit('navigate', next[props.step])
}
</script>

<template>
  <div class="page subscription-flow">
    <ol class="subscription-stepper">
      <li
        v-for="(item, index) in steps"
        :key="item"
        :class="{
          'is-current': index + 1 === step,
          'is-done': index + 1 < step,
        }"
      >
        <span>{{ index + 1 }}</span>
        {{ item }}
      </li>
    </ol>

    <section v-if="step === 1" class="flow-panel">
      <p class="section-kicker">STEP 1</p>
      <h1>받기 좋은 요일과<br />시간을 골라주세요.</h1>
      <div class="choice-grid">
        <button
          v-for="day in deliveryDays"
          :key="day"
          type="button"
          :class="{ 'is-selected': appStore.subscriptionApplication.deliveryDays.includes(day) }"
          @click="appStore.toggleDeliveryDay(day)"
        >
          {{ day }}
        </button>
      </div>
      <label>
        배송 시간
        <select v-model="appStore.subscriptionApplication.deliveryTime">
          <option>점심 · 11:00~13:00</option>
          <option>저녁 · 17:00~19:00</option>
        </select>
      </label>
    </section>

    <section v-else-if="step === 2" class="flow-panel">
      <p class="section-kicker">STEP 2</p>
      <h1>배송지를 선택해주세요.</h1>
      <button
        v-for="address in addresses"
        :key="address.id"
        class="address-choice"
        :class="{
          'is-selected': appStore.subscriptionApplication.selectedAddressId === address.id,
        }"
        type="button"
        @click="selectAddress(address.id)"
      >
        <MapPin :size="21" />
        <span>
          <strong>{{ address.name }}</strong>
          <small>{{ address.address }}</small>
        </span>
        <CheckCircle2
          v-if="appStore.subscriptionApplication.selectedAddressId === address.id"
          :size="20"
        />
      </button>
      <button class="address-choice" type="button" disabled>
        <span>
          <strong>새 배송지 추가</strong>
          <small>필요한 정보: 주소 검색 API</small>
        </span>
        <ChevronRight :size="20" />
      </button>
    </section>

    <section v-else-if="step === 4" class="flow-panel">
      <p class="section-kicker">STEP 4</p>
      <h1>신청 내용을<br />확인해주세요.</h1>
      <dl class="flow-summary">
        <div>
          <dt>플랜</dt>
          <dd>{{ appStore.selectedPlan === 'family' ? 'Family' : 'Solo' }} 플랜 · 가격 미정</dd>
        </div>
        <div>
          <dt>배송</dt>
          <dd>
            {{ appStore.subscriptionApplication.deliveryDays.join('·') }} ·
            {{ appStore.subscriptionApplication.deliveryTime }}
          </dd>
        </div>
        <div>
          <dt>메뉴</dt>
          <dd>{{ appStore.selectedMenuCount }}개 선택</dd>
        </div>
        <div>
          <dt>배송지</dt>
          <dd>{{ selectedAddressName }}</dd>
        </div>
      </dl>
    </section>

    <section v-else-if="step === 5" class="flow-panel">
      <p class="section-kicker">STEP 5</p>
      <h1>결제수단을<br />확인해주세요.</h1>
      <button class="address-choice is-selected" type="button">
        <span>
          <strong>등록된 카드</strong>
          <small>**** **** **** 1234</small>
        </span>
        <CheckCircle2 :size="20" />
      </button>
      <label class="flow-check">
        <input v-model="appStore.subscriptionApplication.isAutoPaymentAgreed" type="checkbox" />
        다음 정기결제에 자동결제하는 것에 동의합니다.
      </label>
      <p class="flow-helper">결제 금액과 배송비는 결제 전 서버 견적 결과를 기준으로 표시됩니다.</p>
    </section>

    <section v-else class="flow-panel flow-result">
      <Truck v-if="step === 6" :size="48" />
      <CheckCircle2 v-else :size="48" />
      <h1>{{ step === 6 ? '결제 결과를 확인 중입니다.' : '구독 신청이 완료되었습니다.' }}</h1>
      <p>
        {{
          step === 6
            ? '결제 처리 결과는 서버 응답 후 표시됩니다.'
            : '다음 배송 일정과 회차는 내 구독에서 확인할 수 있어요.'
        }}
      </p>
    </section>

    <p v-if="validationMessage" class="flow-validation" role="alert">
      {{ validationMessage }}
    </p>

    <div class="mobile-action-bar">
      <div>
        <span>구독 신청</span>
        <strong>{{ step < 6 ? `${step} / 5 단계` : '완료' }}</strong>
      </div>
      <button class="button button-primary" type="button" @click="goNext">
        {{ step === 5 ? '결제 요청하기' : step > 5 ? '내 구독 보기' : '다음 단계' }}
      </button>
    </div>
  </div>
</template>
