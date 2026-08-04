# Reports Latest Pointer

> 목적: 같은 날짜 Report가 여러 개 있을 때 현재 판단 기준 Report를 명시한다.
> 구조: "하네스 유지보수"와 "부착 프로젝트"는 서로 다른 이력이므로 최신 포인터를 분리해서 관리한다(ADR-041). 한쪽 갱신이 다른 쪽을 superseded로 만들지 않는다.

## 현재 최신 Report

| 이력 | 최신 판단 기준 | 기준 |
|---|---|---|
| 하네스 유지보수 최신 | `reports/2026-08-03_0153_harness-stats-script_report.md` | 성적표 집계 스크립트 추가 및 하네스 동결 선언 이후 상태 |
| 부착 프로젝트 최신 | `reports/2026-08-02_chapchap-home-carousel-content_report.md` | 챱챱(codex-design) 홈 캐러셀·콘텐츠 작업 이후 상태. 2026-08-04 하네스 사본 갱신 때 삭제됐던 프로젝트 Report 10건을 git 이력에서 복원함 |

> 주의: 이전 Report는 과거 의사결정 근거와 변경 증거로만 사용한다. Next Work 판단은 이 파일과 `05.WORKING_CONTEXT.md`를 우선한다.

## 읽기 순서

1. `reports/_LATEST.md`
2. 위 표의 최신 Report
3. `05.WORKING_CONTEXT.md`
4. 필요한 경우 superseded Report를 증거로 확인(원본이 `reports/archive/HISTORY_DIGEST.md`의 삭제 이벤트(`PURGE_EVENT`)에 포함되어 있으면 원본 대신 digest 요약으로 확인 — 외부 검수 M-08/X-09)
