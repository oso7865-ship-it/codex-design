# 작업 리포트: 챱챱 서비스별 프론트엔드 구조 개편

> 정정(2026-08-04): 이 Report의 "현재 폴더는 Git 저장소가 아니어서"라는 서술은 사실과 다르다.  
> 해당 작업 시점에 실제로는 Git 연동 및 브랜치·커밋 작업이 수행되었으나 Report에 기록만 누락되었다.  
> 원인은 당시 06.REPORT_TEMPLATE.md에 Git 이력 기록란이 없었던 것이며, 템플릿 보강(현행 §5-1)으로 재발이 차단되었다.  
> 따라서 이 Report의 "되돌릴 수 없음" 전제에 기반한 위험도 판단도 당시 실제보다 보수적으로 읽어야 한다.

> 작성일: 2026-07-30  
> 패키징/배포일: 해당 없음  
> 작업 범위: XL  
> 적용 스킬: Terminal Ops, Verification Loop  
> 적용 Gate: Document Gate  
> 위험도: 구조, 파일 이동  
> 위험 작업 여부: 예 — 사용자가 요청한 서비스별 폴더 분리를 위해 파일 이동 수행

---

> Superseded note: This is a historical record. For current decisions, follow `reports/_LATEST.md` and `GENERAL_HARNESS/05.WORKING_CONTEXT.md`.

## 0. 작업 범위 확인

| 항목 | 내용 |
|---|---|
| 요청 요약 | MSA 구조를 고려해 각 페이지를 서비스별 폴더로 분리한다. |
| 수정 대상 | `src/services`, `src/shared`, `src/legacy`, 라우터 import, 페이지 내부 상대경로 |
| 제외 대상 | 실제 마이크로 프론트엔드 배포, 백엔드 MSA 분리, API 계약 변경, 디자인 변경 |
| 근거 | 사용자의 최신 서비스별 페이지 폴더 분리 요청과 기존 49개 WF 페이지 목록 |
| 적용 스킬/Gate | Terminal Ops, Verification Loop, Document Gate |
| 위험도 | 40개 파일 이동과 기존 빈 폴더 제거를 포함한 구조 작업 |
| 검증 방법 | 이동 전 대상 확인, 이동 후 서비스 경계 검색, Prettier, Vite production build, 하네스 문서 검증 |
| 한계 | 통합 Pinia store와 mock 데이터는 API 계약 전이므로 서비스별로 완전히 분리하지 않음 |

## 1. 작업 요약

- `home`, `auth`, `menu`, `plans`, `subscription`, `account`, `admin` 7개 서비스 폴더를 만들었다.
- 각 서비스 화면을 `src/services/{service}/pages/`로 이동했다.
- 주소·결제 카드와 관리자 사이드바처럼 서비스 전용인 요소는 각 서비스의 `components/`로 이동했다.
- 헤더·푸터와 범용 상태 UI는 `src/shared/components/`에 배치했다.
- 여러 서비스가 사용하는 예시 데이터는 `src/shared/mocks/`로 이동했다.
- 라우트 카탈로그는 일반 데이터가 아니라 라우터 소유 정보이므로 `src/routes/pageCatalog.js`로 이동했다.
- 사용하지 않는 범용 와이어프레임 화면은 `src/legacy/pages/`에 격리했다.
- 이동 후 비어 있던 `src/components/common`, `src/components`, `src/data` 폴더를 제거했다.

## 2. 변경 파일

| 영역 | 변경 내용 | 이유 |
|---|---|---|
| `src/services/home` | 메인 페이지 | 홈 서비스 경계 |
| `src/services/auth` | WF-002~007 인증 페이지 | 인증 서비스 경계 |
| `src/services/menu` | 메뉴 목록·상세·선택 | 메뉴 서비스 경계 |
| `src/services/plans` | 플랜 목록·상세 | 플랜 탐색 경계 |
| `src/services/subscription` | 신청·회차·변경·해지와 체험 Sheet | 구독 서비스 경계 |
| `src/services/account` | 마이페이지와 배송지·결제·배송·환불 | 회원 계정 서비스 경계 |
| `src/services/admin` | 대시보드·운영 화면·사이드바 | 관리자 서비스 경계 |
| `src/shared` | 고객 레이아웃, 범용 UI, mock | 서비스 간 재사용 경계 |
| `src/legacy` | 미사용 WireframePage | 실제 라우트와 과거 코드 분리 |
| `src/routes` | 전체 동적 import와 페이지 카탈로그 | 라우팅 인프라 소유권 명확화 |

## 3. 검증 결과

| 검증 항목 | 결과 | 비고 |
|---|---|---|
| 파일 이동 | PASS | 40개 파일을 확인된 서비스·공용·legacy 경로로 이동 |
| 빈 폴더 제거 | PASS | 내용이 0개인 기존 폴더 3개만 제거 |
| 서비스 간 내부 import | PASS | 다른 `services` 내부를 직접 참조하는 import 0건 |
| 과거 `src/components` 참조 | PASS | 라우터와 페이지에서 기존 경로 참조 없음 |
| 서비스 폴더 설명서 | PASS | 역할·의존 방향·PASS/WARN/FAIL 기준 기록 |
| `npm run build` | PASS | 1886 modules transformed, production build 성공 |
| 500KB 번들 경고 | PASS | 가장 큰 청크 463.77KB |
| 자동화 테스트 | WARN | 테스트 명령이 없음 |

## 4. Checklist 결과

| Checklist | 결과 | Report 반영 |
|---|---|---|
| 구조 경계 수동 검수 | PASS | 서비스 간 직접 import 없음, shared 역의존 없음 |
| Document Gate | PASS | 서비스 구조 설명서의 목적·범위·구조·검수 기준 확인 |
| Verification Loop | WARN | 빌드·포맷은 통과했으나 테스트 없음 |

## 5. 발견된 문제

| 심각도 | 문제 | 처리 |
|---|---|---|
| Major | 모든 페이지가 하나의 `src/components`에 평면 배치 | 7개 서비스별 `pages` 폴더로 분리 |
| Major | 서비스 전용 컴포넌트와 범용 UI가 같은 common 폴더에 혼재 | account·admin 전용 컴포넌트와 shared UI를 분리 |
| Minor | 페이지 카탈로그가 일반 data 영역에 위치 | 라우터 소유 영역으로 이동 |
| Minor | 미사용 WireframePage가 실제 페이지와 혼재 | legacy 영역으로 격리 |

## 6. 미해결 항목

- `src/stores/useAppStore.js`가 여러 서비스의 예시 상태를 함께 보유
- 실제 MSA API 계약 수령 후 서비스별 `api/`, `store/`, `model/` 분리 필요
- 자동화된 import-boundary 검사와 테스트 명령 없음
- 현재 폴더는 Git 저장소가 아니어서 이동 이력을 커밋으로 기록할 수 없음
- 기존 2026-07-21 하네스 Report의 superseded 표시 누락 WARN은 별도 하네스 유지보수 범위

## 7. Working Context 반영 여부

- 반영 필요: 예
- 반영 내용: 서비스별 프론트엔드 페이지 구조와 통합 store의 임시 상태

## 8. 다음 작업

1. 백엔드 서비스 계약에 맞춰 각 서비스 내부에 `api`, `store`, `model`을 추가한다.
2. 통합 Pinia store를 구독·계정·운영 상태로 분리한다.
3. import-boundary 검사와 핵심 라우트 smoke test를 추가한다.
