#!/bin/bash
# PLAN.md → CLAUDE.md 상태 자동 동기화
set -e

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
PLAN="$PROJECT_DIR/PLAN.md"
CLAUDE="$PROJECT_DIR/CLAUDE.md"
TMP_STATUS=$(mktemp)
TMP_CLAUDE=$(mktemp)

cleanup() { rm -f "$TMP_STATUS" "$TMP_CLAUDE"; }
trap cleanup EXIT

[ -f "$PLAN" ] || exit 0
[ -f "$CLAUDE" ] || exit 0
grep -q '^## 현재 상태' "$CLAUDE" || exit 0

# --- PLAN.md 파싱 ---

# "← 현재 진행 중" 마커가 있는 Phase
CURRENT_LINE=$(grep -n '← 현재 진행 중' "$PLAN" | head -1)
[ -z "$CURRENT_LINE" ] && exit 0

PHASE_LINE_NUM=$(echo "$CURRENT_LINE" | cut -d: -f1)
PHASE_TITLE=$(echo "$CURRENT_LINE" | sed 's/^[0-9]*:## //' | sed 's/ ← 현재 진행 중//')

# 현재 Phase 범위 (다음 ## 까지)
NEXT_PHASE_LINE=$(awk -v start="$((PHASE_LINE_NUM + 1))" 'NR > start && /^## / { print NR; exit }' "$PLAN")
[ -z "$NEXT_PHASE_LINE" ] && NEXT_PHASE_LINE=$(wc -l < "$PLAN" | tr -d ' ')

# 최상위 task 카운트 (- [x] / - [ ] 로 시작하는 것만)
CHECKED=$(sed -n "${PHASE_LINE_NUM},${NEXT_PHASE_LINE}p" "$PLAN" | grep -c '^- \[x\]' || true)
UNCHECKED=$(sed -n "${PHASE_LINE_NUM},${NEXT_PHASE_LINE}p" "$PLAN" | grep -c '^- \[ \]' || true)
TOTAL=$((CHECKED + UNCHECKED))

if [ "$TOTAL" -eq 0 ]; then
  PROGRESS="진행 상황 없음"
else
  PCT=$((CHECKED * 100 / TOTAL))
  PROGRESS="${CHECKED}/${TOTAL} tasks (${PCT}%)"
fi

TODAY=$(date +%Y-%m-%d)

# --- 새 "현재 상태" 섹션 생성 ---
cat > "$TMP_STATUS" << ENDSTATUS
## 현재 상태 (${TODAY})

- **현재 Phase:** ${PHASE_TITLE}
- **진행률:** ${PROGRESS}
ENDSTATUS

# sub-phase별 상태 추가
sed -n "${PHASE_LINE_NUM},${NEXT_PHASE_LINE}p" "$PLAN" | grep '^### ' | while read -r subline; do
  SUB_TITLE=$(echo "$subline" | sed 's/^### //')
  SUB_LINE=$(grep -n "^### ${SUB_TITLE}$" "$PLAN" | head -1 | cut -d: -f1)
  [ -z "$SUB_LINE" ] && continue

  NEXT_SUB=$(awk -v start="$((SUB_LINE + 1))" 'NR > start && /^### / { print NR; exit }' "$PLAN")
  [ -z "$NEXT_SUB" ] && NEXT_SUB="$NEXT_PHASE_LINE"

  SUB_CHECKED=$(sed -n "${SUB_LINE},${NEXT_SUB}p" "$PLAN" | grep -c '^- \[x\]' || true)
  SUB_UNCHECKED=$(sed -n "${SUB_LINE},${NEXT_SUB}p" "$PLAN" | grep -c '^- \[ \]' || true)
  SUB_TOTAL=$((SUB_CHECKED + SUB_UNCHECKED))

  if [ "$SUB_TOTAL" -gt 0 ] && [ "$SUB_UNCHECKED" -eq 0 ]; then
    echo "  - ~~${SUB_TITLE}~~ done" >> "$TMP_STATUS"
  elif [ "$SUB_CHECKED" -gt 0 ]; then
    echo "  - ${SUB_TITLE} (${SUB_CHECKED}/${SUB_TOTAL})" >> "$TMP_STATUS"
  else
    echo "  - ${SUB_TITLE}" >> "$TMP_STATUS"
  fi
done

# --- CLAUDE.md 섹션 교체 ---

# "## 현재 상태" 시작 행과 다음 "## " 시작 행 찾기
STATUS_START=$(grep -n '^## 현재 상태' "$CLAUDE" | head -1 | cut -d: -f1)
STATUS_END=$(awk -v start="$((STATUS_START + 1))" 'NR > start && /^## / { print NR; exit }' "$CLAUDE")

if [ -z "$STATUS_END" ]; then
  # "현재 상태"가 마지막 섹션인 경우
  head -n "$((STATUS_START - 1))" "$CLAUDE" > "$TMP_CLAUDE"
  cat "$TMP_STATUS" >> "$TMP_CLAUDE"
else
  # 현재 상태 이전 + 새 상태 + 나머지
  head -n "$((STATUS_START - 1))" "$CLAUDE" > "$TMP_CLAUDE"
  cat "$TMP_STATUS" >> "$TMP_CLAUDE"
  echo "" >> "$TMP_CLAUDE"
  tail -n "+${STATUS_END}" "$CLAUDE" >> "$TMP_CLAUDE"
fi

# 결과가 비어있지 않으면 교체
if [ -s "$TMP_CLAUDE" ]; then
  cp "$TMP_CLAUDE" "$CLAUDE"
fi

exit 0
