# 작업 리포트: 챱챱 도메인·컴포넌트 폴더 정리

> 작성일: 2026-07-30  
> 패키지/배포일: 해당 없음  
> 작업 범위: L  
> 적용 스킬: Verification Loop  
> 적용 Gate: 해당 없음  
> 위험도: 구조  
> 위험 작업 여부: 아니오

---

## 0. 작업 범위 확인

| 항목 | 내용 |
|---|---|
| 요청 요약 | `services` 폴더를 `domain`으로 변경하고 도메인·컴포넌트 역할별로 파일 정리 |
| 변경 대상 | `src/services`, `src/shared/components`, 라우트와 App import, 구조 안내 문서 |
| 제외 대상 | 화면 디자인, 동작, 라우트 URL, 상태 데이터와 API 계약 |
| 검증 방법 | 이전 경로 검색, Prettier 검사, Vite production build, diff 공백 검사 |

## 1. 최종 구조

```text
src/
├─ domain/
│  ├─ account/
│  │  ├─ pages/
│  │  └─ components/
│  ├─ admin/
│  │  ├─ pages/
│  │  └─ components/
│  ├─ auth/pages/
│  ├─ home/pages/
│  ├─ menu/pages/
│  ├─ plans/pages/
│  ├─ subscription/
│  │  ├─ pages/
│  │  └─ components/
│  └─ README.md
└─ shared/components/
   ├─ layout/
   ├─ navigation/
   └─ feedback/
```

## 2. 분류 기준

| 분류 | 포함 내용 | 기준 |
|---|---|---|
| `domain/*/pages` | 라우트가 직접 표시하는 페이지 | 특정 업무 도메인이 소유하는 화면 |
| `domain/*/components` | AddressCard, PaymentCard, AdminSidebar, TrialBottomSheet | 한 도메인 내부에서만 사용하는 컴포넌트 |
| `shared/components/layout` | CustomerHeader, CustomerFooter | 여러 고객 도메인 화면을 감싸는 공통 레이아웃 |
| `shared/components/navigation` | PageBackButton | 여러 도메인에서 사용하는 이동 컴포넌트 |
| `shared/components/feedback` | ContentState, EmptyState, StatusBadge | 로딩·빈 상태·상태 표시 피드백 컴포넌트 |

## 3. 변경 사항

- `src/services`의 모든 파일을 같은 업무 이름의 `src/domain` 폴더로 이동했다.
- 빈 `src/services` 폴더를 제거했다.
- CustomerHeader와 CustomerFooter를 `shared/components/layout`으로 이동했다.
- PageBackButton을 `shared/components/navigation`으로 이동했다.
- ContentState, EmptyState, StatusBadge를 `shared/components/feedback`으로 이동했다.
- `src/App.vue`와 `src/routes/index.js`의 동적 import 경로를 갱신했다.
- 모든 도메인 페이지의 공통 컴포넌트 import 경로를 갱신했다.
- 구조 안내 문서를 `src/domain/README.md`로 이동하고 용어와 의존 방향을 수정했다.

## 4. 검증 결과

| 검증 항목 | 결과 | 근거 |
|---|---|---|
| `src` 내부 `services/` 참조 | PASS | 검색 결과 없음 |
| `src` 내부 `shared/components/ui` 참조 | PASS | 검색 결과 없음 |
| `npm run format:check` | PASS | 모든 대상 파일 Prettier 형식 통과 |
| `npm run build` | PASS | Vite 8.1.5, 1926개 모듈 변환 완료 |
| `git diff --check` | PASS | 공백 오류 없음 |
| 화면·라우트 동작 변경 | PASS | URL과 컴포넌트 내용은 유지하고 import 경로만 변경 |

## 5. 결정 사항

- 상위 업무 경계 명칭은 `services`가 아니라 `domain`을 사용한다.
- 페이지는 반드시 자신의 도메인 `pages`에 둔다.
- 한 도메인에서만 사용하는 컴포넌트는 해당 도메인의 `components`에 둔다.
- 두 개 이상의 도메인이 재사용하는 컴포넌트만 `shared/components`로 이동한다.
- shared 컴포넌트는 `layout`, `navigation`, `feedback`처럼 역할로 분류한다.
- 과거 Report의 `src/services` 경로는 작성 당시 기록이므로 수정하지 않고, 현재 구조 판단은 이 Report를 기준으로 한다.

## 6. 남은 구조 작업

- 통합 `useAppStore`는 실제 API 경계가 확정되면 `domain/*/stores`로 분리할 수 있다.
- 도메인별 API 모듈이 생기면 `domain/*/api` 또는 `domain/*/repository` 중 하나의 규칙을 확정해야 한다.
- 아직 도메인 전용 컴포넌트가 없는 폴더에는 빈 `components` 폴더를 강제로 만들지 않는다.

