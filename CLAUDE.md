# CLAUDE.md

## 프로젝트 개요

CalcHub — 프리랜서/N잡러를 위한 KR/US 세금 계산기 플랫폼. 자세한 기획은 `SPEC.md`, 실행 계획은 `PLAN.md` 참조.

## 기술 스택

- **프레임워크:** Next.js (App Router, SSG)
- **언어:** TypeScript (strict)
- **스타일링:** Tailwind CSS
- **테스트:** Jest + ts-jest
- **배포:** Vercel
- **패키지 매니저:** npm

## 커밋/PR 규칙

- **커밋 단위:** PLAN.md의 sub-phase 내 개별 task 1개 = 커밋 1개
- **PR 단위:** PLAN.md의 sub-phase (예: 1-2, 1-3, 1-4) 완료 시 PR 1개 생성
- **PR 후 흐름:** PR 생성 → main에 머지 → 다음 sub-phase 브랜치 생성 후 작업 계속
- **브랜치 네이밍:** `phase{N}/{sub-phase-설명}` (예: `phase1/config-layer`)
- **커밋 메시지:** 한국어, conventional commits (`feat:`, `fix:`, `refactor:` 등)
- **Co-Author:** 모든 커밋에 `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` 포함

## 주요 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run test     # Jest 테스트
npm run lint     # ESLint
```

## 프로젝트 구조

```
src/
  engine/        # Core Calculation Engine (순수 함수)
    kr/          # 한국 세금 계산
    us/          # 미국 세금 계산
  config/        # Country Config Layer (JSON)
    kr/
    us/
  insight/       # Insight Engine
  components/    # React 컴포넌트
app/             # Next.js App Router (SSG)
__tests__/       # Jest 테스트
```

## 경로 별칭

`@/*` → `./src/*` (tsconfig.json paths)
