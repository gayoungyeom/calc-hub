# CLAUDE.md

## 프로젝트 개요

CalcHub — KR/US 세금 계산기 플랫폼. 기획은 `SPEC.md`, 실행 계획은 `PLAN.md` 참조.

## 현재 상태 (2026-04-10)

- **현재 Phase:** Phase 4: SEO 복구 + KR 시장 집중
- **진행률:** 15/25 tasks (60%)
  - 4-1. 사이트맵 + 인덱싱 복구 (1/5)
  - ~~4-2. KR 직군 페이지 콘텐츠 보강~~ done
  - 4-3. 메타 제목/설명 최적화 (3/4)
  - ~~4-4. 계산 정확도 검증~~ done
  - Phase 4 체크포인트

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
npm run build    # 프로덕션 빌드 (SSG 페이지 생성 + next-sitemap)
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
    longtail/    # 롱테일 페이지 데이터 (kr-pages.json, us-pages.json 등)
  insight/       # Insight Engine
  components/    # React 컴포넌트
    authority/   # AuthorityBlock
    common/      # FaqSchema, FaqSection 등
app/             # Next.js App Router (SSG)
  kr/            # KR 페이지 (locale="ko")
  us/            # US 페이지 (locale="en")
__tests__/       # Jest 테스트
```

## 경로 별칭

`@/*` → `./src/*` (tsconfig.json paths)

## 규칙 파일

- `.claude/rules/workflows.md` — 작업 워크플로우 (브랜치, 커밋, PR)
- `.claude/rules/seo.md` — SEO 규칙 (메타, hreflang, Schema.org, 사이트맵)
- `.claude/rules/content.md` — 콘텐츠 작성 규칙 (가이드, FAQ, YMYL 면책)
- `.claude/rules/testing.md` — 테스트 규칙
