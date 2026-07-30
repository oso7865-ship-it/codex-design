# 작업 리포트: 챱챱 플랜 카드 강조 이동

> 작성일: 2026-07-30  
> 패키징/배포일: 해당 없음  
> 작업 범위: S  
> 적용 스킬: UI/UX Design, Verification Loop, Browser  
> 적용 Gate: UI/UX Gate  
> 위험도: 일반  
> 위험 작업 여부: 아니오

---

## 0. 작업 범위 확인

| 항목 | 내용 |
|---|---|
| 요청 요약 | 다른 플랜 카드에 마우스를 올리면 Solo의 강조를 제거하고 해당 카드에 적용하며, 벗어나면 Solo 강조를 복원한다. |
| 수정 대상 | 플랜 페이지 카드 상태와 관련 CSS |
| 제외 대상 | 추천 플랜 변경, 플랜 데이터, 선택·결제 흐름 |
| 근거 | 사용자 제공 플랜 화면과 상호작용 요구사항 |
| 적용 스킬/Gate | UI/UX Design, Verification Loop, Browser, UI/UX Gate |
| 위험도 | 일반 |
| 검증 방법 | Prettier, Vite production build, 브라우저 기본·포커스·복원·모바일 상태 확인 |
| 한계 | 프로젝트에 자동화 테스트 명령이 없음 |

## 1. 작업 요약

- 추천 의미와 현재 상호작용 강조 상태를 분리했다.
- Solo의 `추천` 배지는 항상 유지한다.
- 카드에 마우스가 들어오거나 키보드 포커스가 생기면 테두리·배경·주요 버튼 색상을 해당 카드로 이동한다.
- 카드 밖으로 벗어나면 Solo 카드 강조를 복원한다.
- 모든 카드가 같은 2px 테두리 공간을 사용해 강조 이동 시 크기나 내용 위치가 흔들리지 않게 했다.

## 2. 변경 파일

| 파일 | 변경 내용 | 이유 |
|---|---|---|
| `src/services/plans/pages/PlanPage.vue` | `highlightedPlanId` 상태와 mouse·focus 이벤트 추가 | 추천 상태와 임시 강조 상태 분리 |
| `src/style.css` | `plan-card--highlighted` 스타일과 전환 효과 추가 | 카드 크기를 유지하며 강조 이동 |

## 3. 검증 결과

| 검증 항목 | 결과 | 비고 |
|---|---|---|
| `npm run format` | PASS | Prettier 적용 |
| `npm run build` | PASS | 1918 modules transformed |
| 기본 상태 | PASS | Solo 카드와 Solo CTA만 강조 |
| Family 포커스 상태 | PASS | Solo 강조 제거, Family 카드와 CTA 강조 |
| 카드 밖 포커스 이동 | PASS | Solo 강조 자동 복원 |
| 390px 모바일 | PASS | Solo 기본 추천 강조 유지 |
| 브라우저 콘솔 | PASS | error·warning 0건 |
| 자동화 테스트 | WARN | 테스트 명령 없음 |

## 4. Checklist 결과

| Checklist | 결과 | Report 반영 |
|---|---|---|
| UI/UX Checklist | PASS | hover·focus·모바일 상태와 추천 배지 구분 확인 |
| Verification Loop | WARN | 빌드와 브라우저 검증은 통과했으나 자동화 테스트 없음 |

## 5. 발견된 문제

| 심각도 | 문제 | 처리 |
|---|---|---|
| Minor | 1px 카드가 2px 강조 테두리로 바뀌면 내용이 미세하게 움직일 수 있음 | 모든 카드에 동일한 2px 투명 테두리 공간 적용 |

## 6. 미해결 항목

- 자동화 테스트 환경을 추가하면 hover·focus 상태를 컴포넌트 테스트로 고정할 수 있다.

## 7. Working Context 반영 여부

- 반영 필요: 아니오
- 반영 내용: 단일 화면의 상호작용 보완으로 장기 구조 결정에는 영향 없음

## 8. 다음 작업

- 별도 필수 작업 없음

