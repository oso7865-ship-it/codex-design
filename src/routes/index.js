import { createRouter, createWebHashHistory } from 'vue-router'
import { pageCatalog } from './pageCatalog'

// 동적 import는 방문한 페이지의 코드만 내려받아 첫 화면의 파일 크기를 줄입니다.
const AddressFormPage = () => import('../domain/account/pages/AddressFormPage.vue')
const AddressListPage = () => import('../domain/account/pages/AddressListPage.vue')
const AccountSettingsPage = () => import('../domain/account/pages/AccountSettingsPage.vue')
const AdminAccessPage = () => import('../domain/admin/pages/AdminAccessPage.vue')
const AdminDashboard = () => import('../domain/admin/pages/AdminDashboard.vue')
const AdminNotificationPage = () => import('../domain/admin/pages/AdminNotificationPage.vue')
const AdminWorkspacePage = () => import('../domain/admin/pages/AdminWorkspacePage.vue')
const AuthPage = () => import('../domain/auth/pages/AuthPage.vue')
const CustomerSupportPage = () => import('../domain/home/pages/CustomerSupportPage.vue')
const DeliveryDetailPage = () => import('../domain/account/pages/DeliveryDetailPage.vue')
const DeliveryEditPage = () => import('../domain/subscription/pages/DeliveryEditPage.vue')
const DeliveryHistoryPage = () => import('../domain/account/pages/DeliveryHistoryPage.vue')
const HomePage = () => import('../domain/home/pages/HomePage.vue')
const MenuDetailPage = () => import('../domain/menu/pages/MenuDetailPage.vue')
const MenuListPage = () => import('../domain/menu/pages/MenuListPage.vue')
const MenuBuilder = () => import('../domain/menu/pages/MenuBuilder.vue')
const MyPage = () => import('../domain/account/pages/MyPage.vue')
const MyProfilePage = () => import('../domain/account/pages/MyProfilePage.vue')
const NotificationPage = () => import('../domain/account/pages/NotificationPage.vue')
const PaymentDetailPage = () => import('../domain/account/pages/PaymentDetailPage.vue')
const PaymentHistoryPage = () => import('../domain/account/pages/PaymentHistoryPage.vue')
const PaymentMethodListPage = () => import('../domain/account/pages/PaymentMethodListPage.vue')
const PaymentMethodRegistrationPage = () =>
  import('../domain/account/pages/PaymentMethodRegistrationPage.vue')
const PlanChangePage = () => import('../domain/subscription/pages/PlanChangePage.vue')
const PlanDetailPage = () => import('../domain/plans/pages/PlanDetailPage.vue')
const PlanPage = () => import('../domain/plans/pages/PlanPage.vue')
const RefundChatPage = () => import('../domain/account/pages/RefundChatPage.vue')
const RefundHistoryPage = () => import('../domain/account/pages/RefundHistoryPage.vue')
const SubscriptionCancelPage = () =>
  import('../domain/subscription/pages/SubscriptionCancelPage.vue')
const SubscriptionFlowPage = () => import('../domain/subscription/pages/SubscriptionFlowPage.vue')
const SubscriptionListPage = () => import('../domain/subscription/pages/SubscriptionListPage.vue')
const SubscriptionPage = () => import('../domain/subscription/pages/SubscriptionPage.vue')
const SubscriptionRoundDetailPage = () =>
  import('../domain/subscription/pages/SubscriptionRoundDetailPage.vue')
const SubscriptionRoundsPage = () =>
  import('../domain/subscription/pages/SubscriptionRoundsPage.vue')
const LegalDocumentPage = () => import('../domain/home/pages/LegalDocumentPage.vue')
const SystemStatePage = () => import('../domain/home/pages/SystemStatePage.vue')

const authRoutes = pageCatalog
  .filter((page) => ['002', '003', '004', '005', '006', '007'].includes(page.id))
  .map((page) => ({
    path: `/wf-${page.id}`,
    name: `wf-${page.id}`,
    component: AuthPage,
    props: { pageId: page.id },
    meta: { layout: 'minimal' },
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
    // 실제 서비스에서 사용하는 인증 진입점입니다. 기존 wf 경로는 와이어프레임 확인용으로 유지합니다.
    {
      path: '/login',
      name: 'login',
      component: AuthPage,
      props: { pageId: '002' },
      meta: { layout: 'minimal' },
    },
    {
      path: '/signup',
      name: 'signup',
      component: AuthPage,
      props: { pageId: '003' },
      meta: { layout: 'minimal' },
    },
    { path: '/menu', name: 'menu', component: MenuListPage },
    {
      path: '/subscribe/menu',
      name: 'subscribe-menu',
      component: MenuBuilder,
      meta: { layout: 'minimal' },
    },
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
    {
      path: '/plans/family',
      name: 'plan-family-detail',
      component: PlanDetailPage,
      props: { planId: 'family' },
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
    { path: '/mypage/notifications', name: 'notifications', component: NotificationPage },
    {
      path: '/mypage/account-settings',
      name: 'account-settings',
      component: AccountSettingsPage,
    },
    { path: '/mypage/profile', name: 'wf-027', component: MyProfilePage },
    { path: '/mypage/addresses', name: 'wf-028', component: AddressListPage },
    { path: '/mypage/addresses/new', name: 'wf-029', component: AddressFormPage },
    { path: '/mypage/payment-methods', name: 'wf-030', component: PaymentMethodListPage },
    {
      path: '/mypage/payment-methods/register',
      name: 'payment-method-register',
      component: PaymentMethodRegistrationPage,
    },
    { path: '/mypage/payments', name: 'wf-031', component: PaymentHistoryPage },
    { path: '/mypage/payments/detail', name: 'wf-032', component: PaymentDetailPage },
    { path: '/mypage/deliveries', name: 'wf-033', component: DeliveryHistoryPage },
    { path: '/mypage/deliveries/detail', name: 'wf-034', component: DeliveryDetailPage },
    { path: '/mypage/refunds', name: 'wf-035', component: RefundHistoryPage },
    { path: '/mypage/refunds/chat', name: 'wf-036', component: RefundChatPage },
    { path: '/admin', name: 'admin', component: AdminDashboard },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminAccessPage,
      props: { mode: 'login' },
      meta: { area: 'admin' },
    },
    {
      path: '/admin/access-denied',
      name: 'admin-access-denied',
      component: AdminAccessPage,
      props: { mode: 'denied' },
      meta: { area: 'admin' },
    },
    {
      path: '/admin/session-expired',
      name: 'admin-session-expired',
      component: AdminAccessPage,
      props: { mode: 'expired' },
      meta: { area: 'admin' },
    },
    {
      path: '/admin/notifications',
      name: 'admin-notifications',
      component: AdminNotificationPage,
      meta: { area: 'admin' },
    },
    ...adminRoutes,
    {
      path: '/subscribe/delivery',
      name: 'wf-013',
      component: SubscriptionFlowPage,
      props: { step: 1 },
      meta: { layout: 'minimal' },
    },
    {
      path: '/subscribe/address',
      name: 'wf-014',
      component: SubscriptionFlowPage,
      props: { step: 2 },
      meta: { layout: 'minimal' },
    },
    {
      path: '/subscribe/confirm',
      name: 'wf-016',
      component: SubscriptionFlowPage,
      props: { step: 4 },
      meta: { layout: 'minimal' },
    },
    {
      path: '/subscribe/payment',
      name: 'wf-017',
      component: SubscriptionFlowPage,
      props: { step: 5 },
      meta: { layout: 'minimal' },
    },
    {
      path: '/subscribe/result',
      name: 'wf-018',
      component: SubscriptionFlowPage,
      props: { step: 6 },
      meta: { layout: 'minimal' },
    },
    {
      path: '/subscribe/complete',
      name: 'wf-019',
      component: SubscriptionFlowPage,
      props: { step: 7 },
      meta: { layout: 'minimal' },
    },
    {
      path: '/support',
      name: 'customer-support',
      component: CustomerSupportPage,
    },
    {
      path: '/terms',
      name: 'terms',
      component: LegalDocumentPage,
      props: { documentType: 'terms' },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: LegalDocumentPage,
      props: { documentType: 'privacy' },
    },
    {
      path: '/location-terms',
      name: 'location-terms',
      component: LegalDocumentPage,
      props: { documentType: 'location' },
    },
    {
      path: '/service-error',
      name: 'service-error',
      component: SystemStatePage,
      props: { state: 'error' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: SystemStatePage,
      props: { state: 'not-found' },
    },
  ],
})

export default router
