import { createRouter, createWebHashHistory } from 'vue-router'
import { pageCatalog } from './pageCatalog'

// 동적 import는 방문한 페이지의 코드만 내려받아 첫 화면의 파일 크기를 줄입니다.
const AddressFormPage = () => import('../services/account/pages/AddressFormPage.vue')
const AddressListPage = () => import('../services/account/pages/AddressListPage.vue')
const AdminDashboard = () => import('../services/admin/pages/AdminDashboard.vue')
const AdminWorkspacePage = () => import('../services/admin/pages/AdminWorkspacePage.vue')
const AuthPage = () => import('../services/auth/pages/AuthPage.vue')
const DeliveryDetailPage = () => import('../services/account/pages/DeliveryDetailPage.vue')
const DeliveryEditPage = () => import('../services/subscription/pages/DeliveryEditPage.vue')
const DeliveryHistoryPage = () => import('../services/account/pages/DeliveryHistoryPage.vue')
const HomePage = () => import('../services/home/pages/HomePage.vue')
const MenuDetailPage = () => import('../services/menu/pages/MenuDetailPage.vue')
const MenuListPage = () => import('../services/menu/pages/MenuListPage.vue')
const MenuBuilder = () => import('../services/menu/pages/MenuBuilder.vue')
const MyPage = () => import('../services/account/pages/MyPage.vue')
const MyProfilePage = () => import('../services/account/pages/MyProfilePage.vue')
const PaymentDetailPage = () => import('../services/account/pages/PaymentDetailPage.vue')
const PaymentHistoryPage = () => import('../services/account/pages/PaymentHistoryPage.vue')
const PaymentMethodListPage = () => import('../services/account/pages/PaymentMethodListPage.vue')
const PlanChangePage = () => import('../services/subscription/pages/PlanChangePage.vue')
const PlanDetailPage = () => import('../services/plans/pages/PlanDetailPage.vue')
const PlanPage = () => import('../services/plans/pages/PlanPage.vue')
const RefundChatPage = () => import('../services/account/pages/RefundChatPage.vue')
const RefundHistoryPage = () => import('../services/account/pages/RefundHistoryPage.vue')
const SubscriptionCancelPage = () =>
  import('../services/subscription/pages/SubscriptionCancelPage.vue')
const SubscriptionFlowPage = () => import('../services/subscription/pages/SubscriptionFlowPage.vue')
const SubscriptionListPage = () => import('../services/subscription/pages/SubscriptionListPage.vue')
const SubscriptionPage = () => import('../services/subscription/pages/SubscriptionPage.vue')
const SubscriptionRoundDetailPage = () =>
  import('../services/subscription/pages/SubscriptionRoundDetailPage.vue')
const SubscriptionRoundsPage = () =>
  import('../services/subscription/pages/SubscriptionRoundsPage.vue')

const authRoutes = pageCatalog
  .filter((page) => ['002', '003', '004', '005', '006', '007'].includes(page.id))
  .map((page) => ({
    path: `/wf-${page.id}`,
    name: `wf-${page.id}`,
    component: AuthPage,
    props: { pageId: page.id },
  }))

const adminRoutes = pageCatalog
  .filter((page) => page.isAdmin)
  .map((page) => ({
    path: `/admin/wf-${page.id}`,
    name: `wf-${page.id}`,
    component: AdminWorkspacePage,
    props: { pageId: page.id },
    meta: { area: 'admin' },
  }))

// createWebHashHistory는 주소의 # 뒤를 바꿔 화면을 전환하는 Vue Router 방식입니다.
// 별도 서버 설정이 없는 현재 디자인 프로토타입에서도 새로고침 시 화면을 안전하게 다시 찾습니다.
// 예: #/plans 주소는 플랜 화면을 뜻합니다.
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/menu', name: 'menu', component: MenuListPage },
    { path: '/subscribe/menu', name: 'subscribe-menu', component: MenuBuilder },
    { path: '/plans', name: 'plans', component: PlanPage },
    ...authRoutes,
    { path: '/wf-008', name: 'wf-008', component: MenuListPage },
    { path: '/wf-009', name: 'wf-009', component: MenuDetailPage },
    {
      path: '/wf-011',
      name: 'wf-011',
      component: PlanDetailPage,
      props: { planId: 'solo' },
    },
    {
      path: '/wf-012',
      name: 'wf-012',
      component: PlanDetailPage,
      props: { planId: 'trial' },
    },
    { path: '/subscription', name: 'subscription', component: SubscriptionPage },
    { path: '/subscription/list', name: 'wf-020', component: SubscriptionListPage },
    { path: '/subscription/rounds', name: 'wf-022', component: SubscriptionRoundsPage },
    {
      path: '/subscription/rounds/detail',
      name: 'wf-023',
      component: SubscriptionRoundDetailPage,
    },
    {
      path: '/subscription/change-plan',
      name: 'wf-054',
      component: PlanChangePage,
    },
    {
      path: '/subscription/cancel',
      name: 'subscription-cancel',
      component: SubscriptionCancelPage,
    },
    {
      path: '/subscription/delivery/menu',
      name: 'wf-024',
      component: MenuBuilder,
      props: { mode: 'delivery' },
    },
    {
      path: '/subscription/delivery/conditions',
      name: 'wf-025',
      component: DeliveryEditPage,
    },
    { path: '/mypage', name: 'mypage', component: MyPage },
    { path: '/mypage/profile', name: 'wf-027', component: MyProfilePage },
    { path: '/mypage/addresses', name: 'wf-028', component: AddressListPage },
    { path: '/mypage/addresses/new', name: 'wf-029', component: AddressFormPage },
    { path: '/mypage/payment-methods', name: 'wf-030', component: PaymentMethodListPage },
    { path: '/mypage/payments', name: 'wf-031', component: PaymentHistoryPage },
    { path: '/mypage/payments/detail', name: 'wf-032', component: PaymentDetailPage },
    { path: '/mypage/deliveries', name: 'wf-033', component: DeliveryHistoryPage },
    { path: '/mypage/deliveries/detail', name: 'wf-034', component: DeliveryDetailPage },
    { path: '/mypage/refunds', name: 'wf-035', component: RefundHistoryPage },
    { path: '/mypage/refunds/chat', name: 'wf-036', component: RefundChatPage },
    { path: '/admin', name: 'admin', component: AdminDashboard },
    ...adminRoutes,
    {
      path: '/subscribe/delivery',
      name: 'wf-013',
      component: SubscriptionFlowPage,
      props: { step: 1 },
    },
    {
      path: '/subscribe/address',
      name: 'wf-014',
      component: SubscriptionFlowPage,
      props: { step: 2 },
    },
    {
      path: '/subscribe/confirm',
      name: 'wf-016',
      component: SubscriptionFlowPage,
      props: { step: 4 },
    },
    {
      path: '/subscribe/payment',
      name: 'wf-017',
      component: SubscriptionFlowPage,
      props: { step: 5 },
    },
    {
      path: '/subscribe/result',
      name: 'wf-018',
      component: SubscriptionFlowPage,
      props: { step: 6 },
    },
    {
      path: '/subscribe/complete',
      name: 'wf-019',
      component: SubscriptionFlowPage,
      props: { step: 7 },
    },
  ],
})

export default router
