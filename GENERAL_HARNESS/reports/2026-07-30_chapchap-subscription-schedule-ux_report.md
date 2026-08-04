# 작업 리포트: 챱챱 구독 일정·내역 UX 요구사항 반영

> 정정(2026-08-04): 헤더 적용 스킬의 "Browser"는 하네스에 존재하지 않는 스킬명이다.  
> 실체는 브라우저 자동화 도구를 사용한 실측 검증으로 확인되었으며(사용자 확인),  
> 해당 절차는 skills/browser-qa/SKILL.md 정식 스킬로 승격되었다(하네스 ADR-042). 이후 Report는 browser-qa로 기록한다.

> 작성일: 2026-07-30  
> 패키징/배포일: 해당 없음  
> 작업 범위: L  
> 적용 스킬: UI/UX Design, Verification Loop, Browser  
> 적용 Gate: UI/UX Gate  
> 위험도: 구조, 결제 화면 상태 변경  
> 위험 작업 여부: 아니오

---

## 0. 작업 범위 확인

| 항목 | 내용 |
|---|---|
| 요청 요약 | 배송 가능 요일 확대, 자동결제 동의 선택화, 주문 마감 상태, 회차별 메뉴 달력, 배송 일정 1회 미루기, 해지 진입 위계 조정, 선택한 결제·배송 내역 상세 연결 |
| 수정 대상 | 구독 신청, 내 구독, 회차 목록·상세, 배송 조건, 결제·배송 내역, Pinia 상태, 공통 CSS |
| 제외 대상 | 백엔드 API, 실제 주문 마감 계산, 결제 승인, 환불 정책, 데이터 영속 저장 |
| 근거 | 2026-07-30 사용자 전달 디자인 요구사항 |
| 적용 스킬/Gate | UI/UX Design, Verification Loop, Browser, UI/UX Gate |
| 위험도 | 구조, 결제 화면 상태 변경 |
| 검증 방법 | Prettier, Vite production build, 데스크톱·390px 모바일 브라우저 조작, 콘솔 오류 확인 |
| 한계 | 현재 데이터는 새로고침하면 초기화되는 프론트엔드 예시 상태이며 서버 정책 판정은 구현하지 않음 |

## 1. 작업 요약

- 배송 희망일을 월요일부터 토요일까지 6개 요일로 확대했다.
- 자동결제 동의를 선택 항목으로 표시하고, 미동의 상태에서도 결제 결과 단계로 이동하도록 변경했다.
- 회차 상태를 Pinia 한 곳에서 관리하고 주문 마감 회차의 메뉴·배송 조건 변경 버튼을 비활성화했다.
- 2026년 8월 달력의 배송일에 메뉴 이름을 표시하고, 모바일에서는 좌우 스크롤로 이름을 읽을 수 있게 했다.
- 회차당 한 번만 사용할 수 있는 배송 일정 미루기 인라인 패널을 추가했다.
- 구독 해지는 내 구독 하단의 `기타 구독 관리`로 위계를 낮추되 명확한 이름과 접근 경로는 유지했다.
- 해지 화면에는 배송 일정 미루기와 플랜 변경 대안을 먼저 제시했다.
- 결제·배송·회차 목록에서 선택한 항목 ID를 Pinia에 저장해 해당 상세 화면을 표시하도록 변경했다.
- 더 이상 사용하지 않는 중복 회차 mock 데이터를 제거했다.

## 2. 변경 파일

| 파일 | 변경 내용 | 이유 |
|---|---|---|
| `src/stores/useAppStore.js` | 회차 상태, 선택 ID, 일정 미루기 action·getter 추가 | 화면별 중복 상태 제거와 선택 상세 연결 |
| `src/services/subscription/pages/SubscriptionFlowPage.vue` | 6개 배송 요일, 자동결제 선택 항목 | 신청 요구사항 반영 |
| `src/services/subscription/pages/SubscriptionPage.vue` | 마감 사유와 기타 구독 관리 | 상태 이해와 해지 진입 위계 조정 |
| `src/services/subscription/pages/SubscriptionRoundsPage.vue` | 메뉴명 달력과 선택 회차 이동 | 날짜별 신청 메뉴 확인 |
| `src/services/subscription/pages/SubscriptionRoundDetailPage.vue` | 마감 버튼과 1회 일정 미루기 | 회차별 변경 정책 표현 |
| `src/services/subscription/pages/DeliveryEditPage.vue` | 6개 요일과 선택 회차 편집 권한 | 회차 상태 일관성 |
| `src/services/subscription/pages/SubscriptionCancelPage.vue` | 일정 미루기·플랜 변경 대안 | 투명한 이탈 방지 UX |
| `src/services/account/pages/*HistoryPage.vue` | 선택 ID 저장 후 상세 이동 | 누른 내역과 상세 일치 |
| `src/services/account/pages/*DetailPage.vue` | 선택된 결제·배송 표시 | 최신 내역 고정 오류 제거 |
| `src/shared/mocks/prototypeData.js` | 미사용 회차 mock 제거 | 회차 데이터 Source of Truth 단일화 |
| `src/style.css` | 신규 상태·달력·미루기·해지 위계 반응형 스타일 | 모바일 우선 가독성과 조작 가능성 확보 |

## 3. 검증 결과

| 검증 항목 | 결과 | 비고 |
|---|---|---|
| `npm run format:check` | PASS | 모든 Vue·JS·CSS 파일이 Prettier 규칙 통과 |
| `npm run build` | PASS | 1918 modules transformed, 빌드 오류 없음 |
| 배송 요일 6개 렌더링 | PASS | 월·화·수·목·금·토 확인 |
| 자동결제 미동의 이동 | PASS | 체크하지 않고 `#/subscribe/result` 이동, 검증 오류 없음 |
| 주문 마감 상태 | PASS | 메뉴 변경·배송 조건 변경 비활성화와 사유 표시 |
| 날짜별 메뉴 달력 | PASS | 8월 3일·10일 메뉴 이름과 상세 이동 확인 |
| 배송 일정 미루기 | PASS | 8월 3일→4일 변경 후 버튼 비활성화와 사용 완료 문구 확인 |
| 선택 결제 상세 | PASS | 7월 12일 선택 시 `PAY-202607-0004` 표시 |
| 선택 배송 상세 | PASS | 7월 26일 선택 시 `DEL-202607-0026` 표시 |
| 390px 모바일 달력 | PASS | 좌우 스크롤과 두 줄 메뉴 이름 확인 |
| 브라우저 콘솔 | PASS | error·warning 0건 |
| 자동화 테스트 | WARN | 프로젝트에 단위·컴포넌트·E2E 테스트 명령이 없음 |

## 4. Checklist 결과

| Checklist | 결과 | Report 반영 |
|---|---|---|
| UI/UX Checklist | PASS | 상태, 비활성 사유, 모바일 조작, 명확한 해지 경로 확인 |
| Stack Profile | PASS | Vue 3 + JavaScript + Pinia, 고객 화면 커스텀 UI 유지 |
| Verification Loop | WARN | 빌드와 실제 브라우저 조작은 통과했으나 자동화 테스트 없음 |

## 5. 발견된 문제

| 심각도 | 문제 | 처리 |
|---|---|---|
| Major | 회차 mock과 Pinia 데이터가 중복되면 화면별 상태가 갈릴 수 있음 | 사용하지 않는 회차 mock을 제거하고 Pinia로 통일 |
| Minor | 390px 7열 달력에서 메뉴명이 한 글자 수준으로 잘림 | 모바일 달력을 좌우 스크롤 구조로 바꾸고 메뉴명을 두 줄 표시 |
| Minor | 상세 화면이 항상 첫 번째 결제·배송을 표시함 | 목록 클릭 시 선택 ID를 저장하고 getter로 상세 연결 |

## 6. 미해결 항목

- 주문 마감·배송 시작 여부는 백엔드가 내려주는 상태 또는 마감 시각을 기준으로 판정해야 한다.
- 일정 미루기 가능 날짜, 회차당 사용 횟수, 변경 이력은 서버에서 검증하고 저장해야 한다.
- 선택 ID는 현재 SPA 메모리에만 있으므로 직접 상세 URL 접근 정책과 API 조회 방식을 정해야 한다.
- 자동결제 동의를 선택으로 두는 최종 결제·약관 정책은 결제사 및 법무 기준 확인이 필요하다.
- 기존 PrimeVue 5 라이선스 서명 WARN은 이 작업의 범위 밖이며 여전히 별도 해결이 필요하다.

## 7. Working Context 반영 여부

- 반영 필요: 예
- 반영 내용: 회차 상태 단일화, 선택 내역 상세 연결, 일정 미루기 정책, 해지 UX 원칙, 백엔드 연동 큐

## 8. 다음 작업

1. 회차·주문 마감·일정 미루기 API 계약을 정의한다.
2. 서비스별 Pinia store 분리 시 subscription·account 선택 상태를 각각 이동한다.
3. 직접 상세 URL 접근과 새로고침 시 ID 복구 방식을 라우트 파라미터 기준으로 설계한다.
4. 단위·컴포넌트·E2E 테스트 환경을 추가한다.

