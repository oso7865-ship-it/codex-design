# AGENTS.md

> 목적: 이 저장소에서 작업하는 AI 에이전트를 위한 짧은 진입 지도다. 세부 규칙의 Source of Truth는 `GENERAL_HARNESS/`다.

## 시작 순서

1. 실제 파일 상태와 사용자의 최신 요청을 확인한다.
2. 작업 규모를 S/M/L/XL로 판단한다. M 이상 또는 이전 작업을 잇는 경우 `GENERAL_HARNESS/00.QUICK_REF.md`, `reports/_LATEST.md`, `GENERAL_HARNESS/05.WORKING_CONTEXT.md`를 확인한다.
3. 작업 계약에 목표, 수정/제외 대상, 근거, 적용 Skill/Gate, 위험도, 검증 방법을 적는다. Context Pack이 필요하면 이 작업 계약 안에만 넣고 별도 상시 파일을 만들지 않는다.
4. `GENERAL_HARNESS/04.GATEGUARD.md`로 위험도를 판정한 뒤 관련 Skill, Gate, Checklist를 적용한다.

## 우선순위와 안전

충돌 시 `GENERAL_HARNESS/00.HARNESS_RULES.md §3`을 따른다. 안전·보안·데이터 손상·파일 삭제 방지 규칙, 사용자의 최신 명시 요청, 하네스, 작업 계약/GateGuard 순으로 판단한다.

- 요청을 해결하는 최소 변경만 한다. 기존 사용자 변경과 무관한 정리·리팩터링·삭제는 하지 않는다.
- 삭제, 대량 이동, 덮어쓰기, 외부 설치/스크립트 실행은 현재 사용자의 확인 없이는 진행하지 않는다.
- FAIL은 수정 후 같은 검증을 다시 통과해야 한다. 구조·위험 WARN은 근거나 사용자 확인 전 진행하지 않는다.
- UI/UX 구현 작업일 때만 `skills/ui-ux-design/SKILL.md`와 관련 Gate·Checklist를 읽는다. 일반 문서·백엔드 작업에 디자인 규칙을 불필요하게 적용하지 않는다.

## Git과 기록

- Git은 유일한 배포·이력 매체다. 작업 브랜치에 push한 커밋은 공유 가능한 진행 상태이고, `main`에 병합된 커밋만 공식 반영이다.
- 커밋, push, 브랜치 생성, PR 생성은 사용자가 명시적으로 요청한 범위에서만 한다.
- 여러 파일 수정, Gate 적용, 자동 검증, WARN/FAIL, 중단·재개가 있으면 `GENERAL_HARNESS/06.REPORT_TEMPLATE.md`에 따라 Report 필요 여부를 판단한다. L/XL 작업은 Working Context도 갱신한다. 중단 시 Handoff Note를 남긴다.
- `CLAUDE.md`와 이 `AGENTS.md`는 사람과 에이전트의 진입 안내 문서다. 자동 검증 범위에는 넣지 않으며, 내용 품질은 변경 시 수동 검수한다.

## 추가 읽기

- 하네스 자체를 바꾸면: `00.HARNESS_RULES.md`, `03.CONTEXT_BUDGET.md`, `04.GATEGUARD.md`, `08.QUALITY_GATE.md`, `09.AGENT_WORKFLOW.md`, 관련 ADR을 먼저 읽는다.
- 명령 실행은 `GENERAL_HARNESS/skills/terminal-ops/SKILL.md`, Git 작업은 `GENERAL_HARNESS/skills/git-workflow/SKILL.md`를 따른다.
