# 작업 리포트: 챱챱 메인 캐러셀·콘텐츠 보강

> 정정(2026-08-04): 헤더 적용 스킬의 "Browser"는 하네스에 존재하지 않는 스킬명이다.  
> 실체는 브라우저 자동화 도구를 사용한 실측 검증으로 확인되었으며(사용자 확인),  
> 해당 절차는 skills/browser-qa/SKILL.md 정식 스킬로 승격되었다(하네스 ADR-042). 이후 Report는 browser-qa로 기록한다.

> 작성일: 2026-08-02  
> 패키징/배포일: 해당 없음  
> 작업 범위: M  
> 적용 스킬: UI/UX Design, Verification Loop, Browser, Terminal Ops  
> 적용 Gate: UI/UX Gate  
> 위험도: 일반  
> 위험 작업 여부: 아니오

---

> Superseded note: This is a historical record. For current decisions, follow `reports/_LATEST.md` and `GENERAL_HARNESS/05.WORKING_CONTEXT.md`.

## 0. 작업 범위 확인

| 항목 | 내용 |
|---|---|
| 요청 요약 | 메인 히어로를 서비스 소개·체험 플랜 2장 캐러셀로 변경하고 메뉴, FAQ, 최종 구독 CTA를 추가한다. 기본 HTML 태그 설명은 제외하고 영역·함수·낯선 Vue 문법과 의미형 태그에만 주석을 작성한다. |
| 수정 대상 | `src/domain/home/pages/HomePage.vue`, `src/domain/home/components/*`, 메인에서 더 이상 사용하지 않는 `src/style.css` 규칙 |
| 제외 대상 | 메뉴·플랜·구독·계정·관리자 페이지의 기능 변경, 실제 API 연결, 실제 메뉴 사진, 새 라이브러리 설치 |
| 근거 | 2026-08-02 사용자 피드백과 메인 페이지 구성 협의, 기존 `menuItems`·`planDetails` 예시 데이터와 라우트 |
| 적용 스킬/Gate | UI/UX Design, Verification Loop, Browser, Terminal Ops / UI/UX Gate, UI/UX Checklist |
| 위험도 | 일반 |
| 검증 방법 | 대상 파일 Prettier 검사, production build, `git diff --check`, 320·390·768·1280px 브라우저 배치 및 상호작용 확인 |
| 한계 | 메뉴·FAQ 내용은 프론트 예시 데이터이며 운영 API가 연결되지 않았다. 자동화된 컴포넌트·E2E 테스트 환경은 없다. |

## 1. 작업 요약

- 오른쪽 사진 자리였던 고정 히어로를 전체 폭 2장 수동 캐러셀로 변경했다.
- 첫 슬라이드는 기존 서비스 소개를 유지하고 두 번째 슬라이드는 체험 플랜을 안내한다.
- 캐러셀은 이전·다음 버튼, 페이지 표시, 모바일 스와이프와 키보드 포커스를 제공한다.
- 이용 방법, 이번 주 메뉴, FAQ, 최종 구독 CTA를 메인 전용 컴포넌트로 분리했다.
- 메뉴 사진 영역은 실제 사진을 대신하지 않고 `[사진이 필요한 곳입니다.]`로 표시했다.
- 메뉴 목록의 하단 스크롤바를 숨기고 양옆 화살표로 카드 한 장씩 이동하며, 이동할 수 없는 방향의 버튼은 제거하도록 보완했다.
- `이번 주 메뉴 전체 보기`를 브랜드 컬러와 화살표 이동 효과가 있는 주요 CTA로 정리했다.
- `<div>`, `<p>`, `<button>` 설명은 제외하고 함수, Vue 문법, `section`·`nav`·접근성 속성에만 학습용 주석을 작성했다.

## 2. 변경 파일

| 파일 | 변경 내용 | 이유 |
|---|---|---|
| `src/domain/home/pages/HomePage.vue` | 메인 전용 컴포넌트 조립 구조로 단순화 | 한 파일에 긴 코드가 쌓이지 않게 함 |
| `src/domain/home/components/HomeHeroCarousel.vue` | 2장 수동 캐러셀과 반응형 레이아웃 | 서비스 소개와 체험 플랜을 같은 히어로에서 안내 |
| `src/domain/home/components/HomeRoutineSection.vue` | 기존 이용 방법 3단계 분리 | 기존 내용을 보존하면서 역할을 분명히 함 |
| `src/domain/home/components/HomeMenuCarousel.vue` | 메뉴 카드 한 칸 이동, 경계별 화살표 표시, 숨긴 스크롤바와 전체 보기 CTA | 메인에서 실제 메뉴를 직관적으로 탐색할 수 있게 함 |
| `src/domain/home/components/HomeFaqSection.vue` | 5개 FAQ 단일 펼침과 고객지원 연결 | 메인 안에서 핵심 정책을 바로 확인하게 함 |
| `src/domain/home/components/HomeSubscriptionCta.vue` | Solo 시작과 플랜 비교 행동 분리 | 페이지 마지막 전환 행동의 우선순위를 명확히 함 |
| `src/style.css` | 더 이상 사용하는 컴포넌트가 없는 옛 메인 규칙 제거 | scoped 스타일과 충돌할 수 있는 레거시 제거 |

## 3. 검증 결과

| 검증 항목 | 결과 | 비고 |
|---|---|---|
| 대상 파일 Prettier | PASS | 변경한 Vue·CSS 파일 모두 통과 |
| Production build | PASS | Vite production build 성공 |
| `git diff --check` | PASS | 공백 오류 없음 |
| PC 1280px | PASS | 가로 넘침 없음, 히어로·메뉴 3열·FAQ·CTA 확인 |
| 태블릿 768px | PASS | 가로 넘침 없음, 메뉴 2열 카드 폭 확인 |
| 모바일 390px | PASS | 가로 넘침 없음, 2장 캐러셀과 하단 내비게이션 확인 |
| 최소 모바일 320px | PASS | 제목 고립 줄바꿈 수정, 가로 넘침 없음 |
| 히어로 이동 | PASS | 1·2번 표시와 `translateX` 상태 전환 확인 |
| 메뉴 이동 | PASS | PC·모바일에서 카드 너비와 16px 간격만큼 한 장씩 이동 확인 |
| 메뉴 경계 화살표 | PASS | 첫 위치에서 이전 버튼 없음, 마지막 위치에서 다음 버튼 없음 확인 |
| 메뉴 스크롤바 | PASS | PC·모바일 `offsetHeight - clientHeight = 0` 확인 |
| FAQ 동작 | PASS | 한 질문만 `aria-expanded=true`로 펼쳐짐 |
| 전체 프로젝트 Prettier | WARN | 이번 변경과 무관한 기존 49개 파일의 줄바꿈 형식 차이로 실패. 범위 밖 일괄 수정은 하지 않음 |
| 자동화 테스트 | WARN | 프로젝트에 컴포넌트·E2E 테스트 명령이 없음 |

## 4. Checklist 결과

| Checklist | 결과 | Report 반영 |
|---|---|---|
| UI/UX Checklist | PASS | 사용자 목표, 행동 우선순위, 반응형, 키보드 조작, 레이블, 색상 외 상태 전달 확인 |

## 5. 발견된 문제

| 심각도 | 문제 | 처리 |
|---|---|---|
| Major | 모바일에서 flex 항목이 수축해 옆 슬라이드가 함께 보임 | `flex: 0 0 100%`로 수정 후 320·390px 재검증 PASS |
| Minor | 320px에서 제목 마지막 글자만 새 줄에 남음 | 모바일 제목 크기를 유동형으로 조정 후 재검증 PASS |
| Minor | 자동 캐러셀에 별도 일시정지 제어가 없음 | 자동 전환을 제거하고 버튼·점·스와이프 수동 방식으로 변경 |

## 6. 미해결 항목

- 실제 메뉴 이미지와 운영 메뉴 API 연결이 필요하다.
- FAQ 문구는 최종 배송·결제 정책 확정 후 백엔드 정책과 다시 대조해야 한다.
- 프로젝트 전체 Prettier 줄바꿈 문제는 별도 범위로 정리해야 한다.
- 자동화된 컴포넌트·E2E 테스트 환경이 필요하다.

## 7. Working Context 반영 여부

- 반영 필요: 아니오
- 반영 내용: 메인 단일 화면 개선이며 다음 도메인 작업 판단은 이 Report와 `_LATEST.md`로 추적한다.

## 8. 다음 작업

- 사용자가 전달한 배송 희망일, 메뉴 선택 주차 구분, 결제 수단 등록, 변경 마감과 구독 해지 위치 피드백을 도메인별로 반영한다.

## 9. FAQ 디자인 보완 검수

- 일반 안내 영역이라는 색상 역할에 맞춰 Primary, Primary Soft, Surface, Border, Text 계열만 사용하고 체험·추천 전용 Secondary 색상은 사용하지 않았다.
- 질문을 개별 카드로 분리하고 열린 항목에만 Primary 테두리와 배경을 적용했다.
- 질문 번호, 답변 표식, 원형 펼침 아이콘, 전체 질문 보기 CTA의 상태 표현을 일관되게 정리했다.
- PC 1280px에서 다른 질문을 선택했을 때 `aria-expanded=true`인 항목이 정확히 하나만 유지됨을 확인했다.
- 모바일 390px에서 `scrollWidth`와 `clientWidth`가 모두 375px로 측정되어 가로 넘침이 없음을 확인했다.
- 변경 컴포넌트 Prettier와 Vite production build가 PASS했다.
- FAQ 외곽은 Primary Soft를 유지하고 내부 카드는 따뜻한 아이보리와 베이지 회색 구분선으로 분리했다. 겹쳐 보이던 질문 버튼의 기본 테두리는 제거했으며 PC 1280px에서 색상 대비와 가로 넘침을 재검증했다.

## 10. 이번 주 메뉴 레이아웃 변경

- 기존 가로 카드 캐러셀과 이동 화살표를 제거하고 `추천 메뉴 1개 + 일반 메뉴 3개`의 편집형 레이아웃으로 교체했다.
- 가격, 할인율, 장바구니, 찜 기능은 구독 서비스 범위와 맞지 않아 포함하지 않았다.
- 메뉴 사진 영역은 실제 이미지 대신 `[사진이 필요한 곳입니다.]` 표기를 유지했다.
- PC 1280px에서 추천 영역과 오른쪽 메뉴 목록 높이가 모두 604px로 일치했다.
- 모바일 390px에서는 추천 메뉴 다음에 일반 메뉴가 세로로 이어지며 가로 넘침이 없음을 확인했다.
- 이 변경으로 앞서 기록한 메뉴 캐러셀 이동·화살표·스크롤바 검증 항목은 더 이상 적용되지 않는다.
- 팀 피드백에 따라 메뉴 카드, 사진 대체 영역, 상태 배지를 Primary 올리브 단색 계열로 통일했다. 카드와 사진 영역은 `Primary Soft`, 추천 배지는 `Primary`, 일반 배지는 Primary 테두리를 사용하며 별도의 유채색은 추가하지 않았다.

## 11. 히어로 캐러셀 컨트롤 개선

- 검은 기본 버튼 테두리를 제거하고 히어로 배경과 연결되는 둥근 캡슐형 컨트롤로 변경했다.
- 서비스 소개 슬라이드는 Primary·Primary Soft, 체험 슬라이드는 Secondary·Secondary Soft로 컨트롤 색상이 자동 전환된다.
- 화살표, 페이지 표시, 현재 페이지 번호의 크기와 간격을 통일하고 키보드 포커스도 현재 슬라이드 포인트 색으로 표시한다.
- 5173 개발 화면에서 첫 슬라이드 `01 / 02`와 체험 슬라이드 `02 / 02`의 색상 및 상태 전환을 확인했다.
