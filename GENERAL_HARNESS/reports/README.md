# Reports README

> 목적: Report 누적 시 최신성 판단과 보존 기준을 고정한다.

## 1. 최신 Report 판단 순서

1. `reports/_LATEST.md`에 명시된 Report
2. 파일명에 시간이 있으면 가장 늦은 시간
3. superseded note가 없는 최신 유지보수 Report
4. 판단 불가 시 사용자 또는 maintainer 확인

## 2. 보존 기준

| Report 유형 | 처리 |
|---|---|
| 최신 Report | 현재 Next Work 판단 기준 |
| Superseded Report | 과거 의사결정 근거와 변경 증거로 보관 |
| 오래된 Report | 삭제보다 Working Context 요약 후 증거 보관 우선. **단, 사용자가 명시적으로 요청하면 `06.REPORT_TEMPLATE.md §8`의 예외 절차(요약 선행 보존 + 삭제 이벤트 기록)로 원본을 삭제할 수 있다 — 그 경우 `reports/archive/HISTORY_DIGEST.md`의 삭제 이벤트(`PURGE_EVENT` 블록)가 유일한 근거가 된다(외부 검수 M-08/X-09, ADR-031/034).** |

## 3. Superseded 원칙

새 Report가 이전 Report의 다음 작업이나 상태 판단을 대체하면, 이전 Report 상단에 `Superseded note`를 추가한다.
