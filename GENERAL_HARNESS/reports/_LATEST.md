# Reports Latest Pointer

> 목적: 같은 날짜의 Report가 여러 개일 때 현재 판단 기준 Report를 명시한다.

## 현재 최신 Report

| 항목 | 값 |
|---|---|
| 최신 판단 기준 | `reports/2026-07-30_chapchap-domain-folder-structure_report.md` |
| 기준 | `services`를 `domain`으로 변경하고 도메인·공통 컴포넌트를 역할별로 재분류한 현재 소스 구조 |
| 판정 | PASS — 이전 소스 경로 참조가 없고 형식 검사와 production build가 통과함 |
| 주의 | 과거 Report의 `src/services` 경로는 작성 당시 기록으로 유지한다. 현재 경로와 다음 구조 작업은 이 Report와 `05.WORKING_CONTEXT.md`를 우선한다. |

## 읽기 순서

1. `reports/_LATEST.md`
2. 위 표의 최신 Report
3. `05.WORKING_CONTEXT.md`
4. 필요한 경우 이전 Report와 `reports/archive/HISTORY_DIGEST.md`
