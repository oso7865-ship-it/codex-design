# Reports Latest Pointer

> 목적: 같은 날짜의 Report가 여러 개일 때 현재 판단 기준 Report를 명시한다.

## 현재 최신 Report

| 항목 | 값 |
|---|---|
| 최신 판단 기준 | `reports/2026-08-02_chapchap-home-carousel-content_report.md` |
| 기준 | 메인 히어로 2장 캐러셀, 이용 방법, 메뉴 미리보기, FAQ, 최종 구독 CTA로 구성한 현재 고객 메인 화면 |
| 판정 | WARN — 대상 파일 포맷, production build, 320·390·768·1280px 배치와 상호작용은 통과했으나 자동화 테스트가 없고 기존 전체 프로젝트 포맷 WARN이 남아 있음 |
| 주의 | 메뉴·FAQ는 프론트 예시 데이터이며 실제 메뉴 이미지와 운영 API, 최종 배송·결제 정책을 연결한 뒤 다시 검증해야 한다. |

## 읽기 순서

1. `reports/_LATEST.md`
2. 위 표의 최신 Report
3. `05.WORKING_CONTEXT.md`
4. 필요한 경우 이전 Report와 `reports/archive/HISTORY_DIGEST.md`
