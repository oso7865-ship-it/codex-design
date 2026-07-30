import { defineStore } from 'pinia'

const emptyMenuQuantities = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
}

const currentMenuQuantities = {
  1: 2,
  2: 1,
  3: 0,
  4: 0,
}

const initialSubscriptionRounds = [
  {
    id: 'ROUND-20260803',
    title: '8월 첫 번째 배송',
    deliveryDate: '2026-08-03',
    status: '주문 마감',
    addressName: '집',
    changeDeadline: '2026-08-01 18:00',
    menuItems: [
      { name: '바질 닭가슴살 덮밥', quantity: 2 },
      { name: '단호박 소불고기 덮밥', quantity: 1 },
    ],
    canEditMenu: false,
    menuEditDisabledReason: '배송 준비가 시작되어 이번 회차의 메뉴 변경이 마감되었습니다.',
    canEditDelivery: false,
    postponeUsed: false,
    postponeOptions: ['2026-08-04', '2026-08-05', '2026-08-06'],
  },
  {
    id: 'ROUND-20260810',
    title: '8월 두 번째 배송',
    deliveryDate: '2026-08-10',
    status: '배송 예정',
    addressName: '집',
    changeDeadline: '2026-08-08 18:00',
    menuItems: [
      { name: '두부 채소 비빔밥', quantity: 1 },
      { name: '바질 닭가슴살 덮밥', quantity: 2 },
    ],
    canEditMenu: true,
    menuEditDisabledReason: '',
    canEditDelivery: true,
    postponeUsed: true,
    postponeOptions: [],
  },
  {
    id: 'ROUND-20260726',
    title: '7월 두 번째 배송',
    deliveryDate: '2026-07-26',
    status: '배송 완료',
    addressName: '집',
    changeDeadline: '마감',
    menuItems: [
      { name: '바질 닭가슴살 덮밥', quantity: 2 },
      { name: '단호박 소불고기 덮밥', quantity: 1 },
    ],
    canEditMenu: false,
    menuEditDisabledReason: '이미 배송이 완료된 회차입니다.',
    canEditDelivery: false,
    postponeUsed: true,
    postponeOptions: [],
  },
]

export const useAppStore = defineStore('app', {
  state: () => ({
    addresses: [
      {
        id: 'home',
        name: '집',
        recipient: '홍길동',
        phone: '010-****-1234',
        address: '대구광역시 중구 챱챱로 12, 101동 1203호',
        isDefault: true,
      },
      {
        id: 'office',
        name: '회사',
        recipient: '홍길동',
        phone: '010-****-1234',
        address: '대구광역시 수성구 식사로 24, 5층',
        isDefault: false,
      },
    ],

    memberProfile: {
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-****-1234',
      signInProvider: '챱챱 자체회원',
    },

    paymentMethods: [
      {
        id: 'card-main',
        brand: '신한카드',
        lastFourDigits: '1234',
        expiresAt: '12/29',
        isDefault: true,
      },
      {
        id: 'card-sub',
        brand: '카카오뱅크',
        lastFourDigits: '7788',
        expiresAt: '08/28',
        isDefault: false,
      },
    ],

    paymentHistory: [
      {
        id: 'PAY-202607-0012',
        paidAt: '2026-07-26',
        description: 'Solo 플랜 정기결제',
        amountLabel: '가격 미정',
        status: '결제 완료',
        paymentMethod: '신한카드 **** 1234',
      },
      {
        id: 'PAY-202607-0004',
        paidAt: '2026-07-12',
        description: 'Solo 플랜 정기결제',
        amountLabel: '가격 미정',
        status: '결제 완료',
        paymentMethod: '신한카드 **** 1234',
      },
    ],

    deliveryHistory: [
      {
        id: 'DEL-202608-0003',
        deliveryDate: '2026-08-03',
        status: '배송 준비',
        addressName: '집',
        menuCount: 3,
      },
      {
        id: 'DEL-202607-0026',
        deliveryDate: '2026-07-26',
        status: '배송 완료',
        addressName: '집',
        menuCount: 3,
      },
    ],

    refundHistory: [],

    subscriptionRounds: initialSubscriptionRounds.map((round) => ({
      ...round,
      menuItems: round.menuItems.map((menu) => ({ ...menu })),
      postponeOptions: [...round.postponeOptions],
    })),

    selectedPaymentId: 'PAY-202607-0012',
    selectedDeliveryId: 'DEL-202608-0003',
    selectedRoundId: 'ROUND-20260803',

    // subscriptionApplication은 신청이 완료되기 전까지만 사용하는 임시 입력값입니다.
    selectedPlan: 'solo',
    subscriptionApplication: {
      deliveryDays: ['월요일'],
      deliveryTime: '점심 · 11:00~13:00',
      selectedAddressId: 'home',
      menuQuantities: { ...emptyMenuQuantities },
      isAutoPaymentAgreed: false,
    },

    // currentSubscription은 실제 내 구독 화면에 표시하는 적용 완료 상태입니다.
    currentSubscription: {
      planId: 'solo',
      status: 'active',
      deliveryDays: ['월요일'],
      deliveryTime: '점심 · 11:00~13:00',
      selectedAddressId: 'home',
      menuQuantities: { ...currentMenuQuantities },
      dates: {
        nextDelivery: '2026-08-03',
        nextPayment: '2026-08-09',
        changeDeadline: '2026-08-01T18:00:00',
      },
    },

    scheduledPlan: '',
    isCancellationScheduled: false,

    // 실제 로그인 API가 연결되기 전까지 비회원 상태를 기본값으로 사용합니다.
    // 체험 종료 안내는 로그인한 체험 사용자에게만 자동으로 보여 줍니다.
    isAuthenticated: false,
    isTrialUser: true,

    // 백엔드 연결 전 체험 종료 응답을 재현하기 위한 예시 상태입니다.
    trialStatus: 'ended',
    hasSeenTrialSheet: false,
    isTrialSheetOpen: false,
  }),

  getters: {
    // Object.values는 객체의 값만 배열로 꺼내고 reduce는 수량을 차례로 더합니다.
    selectedMenuCount: (state) =>
      Object.values(state.subscriptionApplication.menuQuantities).reduce(
        (total, quantity) => total + quantity,
        0,
      ),

    currentMenuCount: (state) =>
      Object.values(state.currentSubscription.menuQuantities).reduce(
        (total, quantity) => total + quantity,
        0,
      ),

    minimumMenuCount: (state) => (state.selectedPlan === 'family' ? 6 : 3),

    currentMinimumMenuCount: (state) => (state.currentSubscription.planId === 'family' ? 6 : 3),

    selectedAddress: (state) => {
      const address = state.addresses.find(
        (address) => address.id === state.currentSubscription.selectedAddressId,
      )

      return (
        address || {
          name: '배송지 선택 필요',
          address: '등록된 배송지가 없습니다.',
        }
      )
    },

    selectedPayment: (state) =>
      state.paymentHistory.find((payment) => payment.id === state.selectedPaymentId) ||
      state.paymentHistory[0],

    selectedDelivery: (state) =>
      state.deliveryHistory.find((delivery) => delivery.id === state.selectedDeliveryId) ||
      state.deliveryHistory[0],

    selectedRound: (state) =>
      state.subscriptionRounds.find((round) => round.id === state.selectedRoundId) ||
      state.subscriptionRounds[0],

    currentRound: (state) => state.subscriptionRounds[0],

    canEditCurrentDelivery: (state) => Boolean(state.subscriptionRounds[0]?.canEditMenu),
  },

  actions: {
    updateMemberProfile(profile) {
      // 객체 펼침 문법(...)은 기존 값 중 전달된 항목만 새 값으로 덮어씁니다.
      this.memberProfile = { ...this.memberProfile, ...profile }
    },

    addAddress(address) {
      const newAddressId = `address-${this.addresses.length + 1}`

      if (address.isDefault) {
        // forEach는 등록된 배송지를 하나씩 확인해 기존 기본 표시를 해제합니다.
        this.addresses.forEach((savedAddress) => {
          savedAddress.isDefault = false
        })
      }

      this.addresses.push({
        ...address,
        id: newAddressId,
        isDefault: address.isDefault || this.addresses.length === 0,
      })
    },

    setDefaultAddress(addressId) {
      this.addresses.forEach((address) => {
        address.isDefault = address.id === addressId
      })
    },

    setDefaultPaymentMethod(paymentMethodId) {
      this.paymentMethods.forEach((paymentMethod) => {
        paymentMethod.isDefault = paymentMethod.id === paymentMethodId
      })
    },

    beginSubscriptionApplication(planId) {
      this.selectedPlan = planId
      this.subscriptionApplication.menuQuantities = { ...emptyMenuQuantities }
      this.subscriptionApplication.isAutoPaymentAgreed = false
    },

    toggleDeliveryDay(day) {
      const { deliveryDays } = this.subscriptionApplication
      const dayIndex = deliveryDays.indexOf(day)

      if (dayIndex >= 0) {
        deliveryDays.splice(dayIndex, 1)
        return
      }

      deliveryDays.push(day)
    },

    changeMenuQuantity(menuId, change) {
      const quantities = this.subscriptionApplication.menuQuantities
      const nextQuantity = Math.max(0, quantities[menuId] + change)
      quantities[menuId] = nextQuantity
    },

    completeSubscriptionApplication() {
      this.currentSubscription.planId = this.selectedPlan
      this.currentSubscription.deliveryDays = [...this.subscriptionApplication.deliveryDays]
      this.currentSubscription.deliveryTime = this.subscriptionApplication.deliveryTime
      this.currentSubscription.selectedAddressId = this.subscriptionApplication.selectedAddressId
      this.currentSubscription.menuQuantities = {
        ...this.subscriptionApplication.menuQuantities,
      }
      this.currentSubscription.status = 'active'
      this.scheduledPlan = ''
      this.isCancellationScheduled = false
      this.trialStatus = 'converted'
    },

    replaceMenuQuantities(quantities) {
      this.currentSubscription.menuQuantities = { ...quantities }
    },

    updateDeliveryConditions({ deliveryDays, deliveryTime, selectedAddressId }) {
      this.currentSubscription.deliveryDays = [...deliveryDays]
      this.currentSubscription.deliveryTime = deliveryTime
      this.currentSubscription.selectedAddressId = selectedAddressId
    },

    selectPayment(paymentId) {
      this.selectedPaymentId = paymentId
    },

    selectDelivery(deliveryId) {
      this.selectedDeliveryId = deliveryId
    },

    selectRound(roundId) {
      this.selectedRoundId = roundId
    },

    postponeRound(roundId, nextDeliveryDate) {
      const round = this.subscriptionRounds.find((item) => item.id === roundId)

      if (!round || round.postponeUsed || !round.postponeOptions.includes(nextDeliveryDate)) {
        return false
      }

      round.deliveryDate = nextDeliveryDate
      round.postponeUsed = true
      round.postponeOptions = []
      return true
    },

    schedulePlanChange(planId) {
      this.scheduledPlan = planId
    },

    scheduleCancellation() {
      this.isCancellationScheduled = true
    },

    openTrialSheet() {
      if (
        this.isAuthenticated &&
        this.isTrialUser &&
        this.trialStatus === 'ended' &&
        !this.hasSeenTrialSheet
      ) {
        this.isTrialSheetOpen = true
        this.hasSeenTrialSheet = true
      }
    },

    previewTrialSheet() {
      if (this.trialStatus === 'ended') {
        this.isTrialSheetOpen = true
      }
    },

    closeTrialSheet() {
      this.isTrialSheetOpen = false
    },

    startTrialConversion(planId) {
      this.beginSubscriptionApplication(planId)
      this.trialStatus = 'converting'
      this.closeTrialSheet()
    },
  },
})
