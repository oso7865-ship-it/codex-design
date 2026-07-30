# 프론트엔드 도메인 구조

이 폴더는 백엔드 MSA의 도메인 경계를 Vue 화면 구조에 먼저 반영한 영역입니다.
각 도메인은 자신의 `pages/`와 도메인 전용 `components/`를 소유하고, 여러 도메인이 함께 쓰는 UI만 `src/shared/`를 사용합니다.

| 도메인 | 담당 화면 |
|---|---|
| `home` | 메인 |
| `auth` | 로그인, 회원가입, 비밀번호, 소셜 계정 |
| `menu` | 메뉴 목록·상세, 메뉴 선택 |
| `plans` | 플랜 목록·상세 |
| `subscription` | 구독 신청, 구독·회차 관리, 변경·해지 |
| `account` | 마이페이지, 프로필, 배송지, 결제·배송·환불 내역과 상담 |
| `admin` | 관리자 대시보드와 운영 화면 |

## 의존 방향

```text
routes
  → domain/*/pages
    → domain/*/components
    → shared/components/layout · shared/components/navigation · shared/components/feedback
    → stores · api · utils
```

- 한 도메인의 페이지가 다른 도메인의 내부 컴포넌트를 직접 가져오지 않습니다.
- 공통이라는 이유만으로 도메인 전용 컴포넌트를 `shared`로 올리지 않습니다.
- `src/stores/useAppStore.js`는 API 계약이 없는 현재 프로토타입에서만 사용하는 통합 예시 상태입니다.
  실제 MSA API가 확정되면 서비스별 store와 API 모듈로 분리합니다.
- 사용하지 않는 과거 범용 화면은 `src/legacy/`에 격리하며 라우터에서 참조하지 않습니다.

## 구조 검수 기준

- PASS: 모든 실제 페이지가 담당 도메인의 `pages/`에 있습니다.
- PASS: 도메인 전용 컴포넌트는 해당 도메인의 `components/`에 있습니다.
- PASS: `shared`는 어떤 `domain` 내부 코드에도 의존하지 않습니다.
- PASS: 한 도메인이 다른 도메인의 내부 컴포넌트를 직접 import하지 않습니다.
- PASS: 라우트 import와 production build가 모두 정상입니다.
- WARN: 통합 Pinia store를 서비스별 store로 아직 분리하지 않은 프로토타입 상태입니다.
- FAIL: 과거 `src/components/` 경로 또는 `legacy` 페이지를 실제 라우트가 참조합니다.
