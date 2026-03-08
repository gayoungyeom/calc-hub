# 작업 워크플로우

## PLAN.md 기반 작업 흐름

PLAN.md를 참조하여 작업을 진행한다. 모든 작업은 아래 흐름을 따른다.

### 1. 작업 시작

- PLAN.md에서 현재 진행할 sub-phase를 확인한다 (예: 2-6, 3-1)
- 해당 sub-phase용 브랜치를 생성한다: `phase{N}/{sub-phase-설명}`
  - 예: `phase2/ux-i18n`, `phase3/insight-engine`

### 2. Task 단위 작업 + 커밋

- Sub-phase 내 각 task를 순서대로 진행한다
- **task 1개 완료 = 커밋 1개**
- 커밋 시:
  - 메시지는 한국어, conventional commits (`feat:`, `fix:`, `refactor:` 등)
  - `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` 포함
  - PLAN.md에서 해당 task를 `[x]`로 체크

### 3. Sub-phase 완료 → PR

- Sub-phase 내 모든 task가 완료되면 PR을 생성한다
- **PR 제목 형식:** `Phase {N}-{M}: {sub-phase 제목}`
  - 예: `Phase 2-6: UX 개선 + 다국어 처리`
  - 예: `Phase 3-1: Insight Engine 고도화`
- PR body에는 완료한 task 목록을 포함한다
- PR 생성 후 main에 머지 → 다음 sub-phase 브랜치 생성 후 작업 계속
