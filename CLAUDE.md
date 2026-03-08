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

`.claude/rules/workflows.md` 참조.

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
