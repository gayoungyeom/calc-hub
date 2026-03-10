# CalcHub — 실행 계획서 (PLAN)

> SPEC.md 기반 PM 관점 Phase별 실행 TODO 리스트
> 각 태스크는 `[ ]` (미완료) / `[x]` (완료) 로 추적한다.

---

## Phase 1: 기반 구축 (1~2주차)

> **목표:** 개발환경 완성 + 핵심 계산 엔진 구현 + 배포 파이프라인 확보
> **완료 조건:** 빈 페이지가 커스텀 도메인으로 배포되고, 세금 계산 엔진이 테스트를 통과한다.

### 1-1. 인프라 셋업

- [x] 도메인 구매 (Cloudflare Registrar 또는 Namecheap, `.com` 우선)
- [x] GitHub 리포지토리 생성 및 초기 커밋
- [x] Vercel 프로젝트 생성 + GitHub 연결
- [x] 커스텀 도메인 연결 + SSL 확인
- [x] 빈 페이지 배포 확인 (도메인 접속 → 페이지 정상 노출)

### 1-2. 프로젝트 초기화

- [x] Next.js 프로젝트 생성 (`create-next-app`, App Router, TypeScript, Tailwind CSS)
- [x] Jest + ts-jest 설정 (테스트 환경)
- [x] 5계층 폴더 구조 생성
  ```
  src/engine/     — Core Calculation Engine
  src/config/     — Country Config Layer (JSON)
  src/insight/    — Insight Engine
  src/components/ — React 컴포넌트
  app/            — Next.js App Router (SSG)
  __tests__/      — 단위 테스트
  ```
- [x] ESLint + Prettier 설정 (코드 품질 최소 기준)

### 1-3. Config Layer 구축

- [x] Config JSON 스키마 정의 (TypeScript 타입)
- [x] KR 2026 Config JSON 작성 (종합소득세 세율표, 공제 기준)
- [x] US 2026 Config JSON 작성 (Federal brackets, SE Tax, Standard Deduction)
- [x] US State Config 작성 — CA, NY, TX 세율
- [x] Config 로더 유틸리티 구현 (연도별/국가별 JSON 로드)
- [x] `meta.sources` 에 공식 출처 URL 명시 (IRS.gov, 국세청 고시)

### 1-4. Core Calculation Engine

- [x] 공통 계산 인터페이스 설계 (`CalculatorInput` / `CalculatorOutput` 타입)
- [x] KR 종합소득세 계산 함수 구현
  - 소득금액 → 과세표준 → 누진세 산출 → 세액공제 → 결정세액
  - 지방소득세 (10%) 계산
  - 기납부세액 (3.3%) 차감 → 환급/추가납부 산출
- [x] US Federal Tax 계산 함수 구현
  - Filing Status별 Standard Deduction 적용
  - 누진세 Bracket 계산
- [x] US Self-Employment Tax 계산 함수 구현 (15.3%)
- [x] US State Tax 계산 함수 구현 (CA, NY, TX)
- [x] 모든 계산 함수 단위 테스트 작성 + 통과 확인
  - KR: 최소 5개 소득 구간별 테스트 케이스
  - US: Filing Status × State 조합 테스트 케이스

### Phase 1 체크포인트

- [x] `npm run build` 성공
- [x] `npm run test` 전체 통과 (17개)
- [x] Vercel에 빈 페이지 배포 확인
- [ ] 계산 엔진 정확도 수동 검증 (홈택스/IRS 기준 대조)

---

## Phase 2: MVP 배포 (3~4주차)

> **목표:** KR/US 각 1개 계산기 라이브 배포 + SEO 기반 확보 + AdSense 승인 신청
> **완료 조건:** 두 계산기가 프로덕션에서 동작하고, Google에 인덱싱 요청이 완료된다.

### 2-1. KR 계산기 UI

- [x] 입력 폼 React 컴포넌트 구현
  - 연간 총수입, 필요경비, 기납부세액, 부양가족 수, 국민연금/건강보험
  - 기납부세액 자동 계산 토글 (총수입 × 3.3%)
  - 입력값 유효성 검사 (음수, 빈값 처리)
- [x] 결과 표시 컴포넌트 구현
  - 종합소득세, 지방소득세, 기납부세액, **환급/추가납부 예상액** (강조)
- [x] 인사이트 패널 컴포넌트 구현
  - 유효세율 (%)
  - 환급 가능성 추정
  - 직장인 대비 세부담 비교
  - 절세 여지 가이드
- [x] KR 계산기 Next.js 페이지 생성 (`/kr/프리랜서-종합소득세-계산기`)
- [x] 모바일 반응형 확인 (모바일 퍼스트)

### 2-2. US 계산기 UI

- [x] 입력 폼 React 컴포넌트 구현
  - Annual Gross Income, Business Expenses
  - Filing Status (Single / MFJ / HoH) 셀렉트
  - State (CA, NY, TX) 셀렉트
  - Deduction Type (Standard / Itemized) 셀렉트
- [x] 결과 표시 컴포넌트 구현
  - Federal Tax, SE Tax, State Tax, Total Tax, Net Income
- [x] 인사이트 패널 컴포넌트 구현
  - Effective Tax Rate
  - Quarterly Payment Amount
  - SEP IRA Savings
  - Penalty Risk
  - Tax Bracket Position
- [x] US 계산기 Next.js 페이지 생성 (`/us/1099-tax-calculator`)
- [x] 모바일 반응형 확인

### 2-3. 공통 UI/UX

- [x] BaseLayout 구현 (헤더, 푸터, 네비게이션)
- [x] 랜딩 페이지 (`/`) — KR/US 계산기 진입점
- [x] About 페이지 — 운영자 정보 (YMYL E-E-A-T 대응)
- [x] 404 페이지
- [x] 광고 슬롯 컴포넌트 (Phase 3에서 AdSense 코드 삽입, 우선 placeholder)
  - 상단 배너, 결과 아래, 인피드, 하단 앵커 — 4개 위치

### 2-4. SEO & Authority Layer

- [x] `<meta>` 태그 자동 생성 (title, description, canonical)
- [x] Open Graph 태그 (og:title, og:description, og:image)
- [x] Schema.org 구조화 데이터 (FAQPage, HowTo)
- [x] Authority 블록 컴포넌트 구현 (모든 계산기 하단 자동 삽입)
  - 적용 연도 표시
  - 계산식 설명
  - 공식 출처 링크
  - 면책 문구
  - 마지막 업데이트 날짜
- [x] `robots.txt` 작성
- [x] 사이트맵 자동 생성 설정 (`next-sitemap`)
- [x] Lighthouse 성능 측정 → **SEO 점수 90+, Performance 90+** 확인

### 2-5. Programmatic SEO — V1 롱테일 페이지

- [x] 롱테일 페이지 데이터 정의 (JSON/배열)
  - KR 10개: 직군별 (배달기사, 유튜버, 개발자 등) + 소득 구간별
  - US 10개: State별 (CA, NY, TX) + 직군별 (Uber, DoorDash, Developer 등)
- [x] 동적 라우팅 구현 (`[slug]/page.tsx` + `generateStaticParams`)
- [x] 페이지별 고유 title, description, h1 자동 생성
- [x] 내부 링크 — 관련 계산기 상호 연결
- [x] 총 20개 롱테일 페이지 배포 확인

### 2-6. UX 개선 + 다국어 처리

- [x] 로케일 세그먼트 레이아웃 + 동적 lang 설정
  - `src/lib/locale.ts` — `getLocaleFromPath()` 유틸리티
  - `src/app/kr/layout.tsx`, `src/app/us/layout.tsx` — 세그먼트 레이아웃
  - `LocaleUpdater` 클라이언트 컴포넌트로 pathname 기반 `document.documentElement.lang` 동적 설정
- [x] Header 로케일 대응 (`locale` prop, KR/US 네비게이션 분기)
- [x] Footer 로케일 대응 (면책 문구 영어/한국어 분기)
- [x] AuthorityBlock 다국어 지원 (`locale` prop, 라벨 텍스트 분기)
- [x] 루트 랜딩 페이지 이중언어 재설계 (국가 선택 페이지)
- [x] KR/US 개별 홈페이지 생성 (`/kr`, `/us`)
- [x] hreflang 태그 추가 (모든 KR/US 페이지, x-default)
- [x] 다크 모드 토글 (next-themes, class 기반, 전체 컴포넌트 dark: 클래스)
- [x] 다크 모드 색상 개선 (다크 그레이 배경, 커스텀 토큰, 버튼 채도 조정)
- [x] Header/Footer 텍스트 완전 언어 분리 (KR 한국어, US 영어)
- [x] About/Privacy/Terms 페이지 언어 분리 (`/kr/about`, `/us/about` 등 6개 신규)
- [x] 사이트맵 + 메타데이터 검증 (신규 페이지 반영)

### 2-7. 분석 + 광고 기반

- [x] Google Search Console 사이트 등록 + 소유권 인증 _(외부 작업)_
- [x] 사이트맵 제출 _(Search Console 등록 후)_
- [x] GA4 프로퍼티 생성 + 추적 코드 삽입
- [x] 주요 이벤트 추적 설정 (계산 실행, 인사이트 클릭, 관련 계산기 이동)
- [x] **AdSense 승인 신청**
  - [x] 소유권 확인 메타 태그 삽입 (`ca-pub-4343769094636612`)
  - [x] 사전 확인: 콘텐츠 충분성, 면책 문구, 개인정보 처리방침, About 페이지
  - [ ] AdSense 승인 대기 _(외부 작업)_

### Phase 2 체크포인트

- [x] KR 계산기 프로덕션 동작 확인 (5개 소득 구간 수동 테스트)
- [x] US 계산기 프로덕션 동작 확인 (3개 State × 3개 Filing Status)
- [x] Lighthouse: Performance 90+, SEO 90+, Accessibility 90+
- [ ] Search Console 인덱싱 요청 완료 (메인 + 롱테일 20개)
- [x] GA4 이벤트 수신 확인
- [x] AdSense 신청 완료 (소유권 메타 태그 삽입, 승인 대기 중)

---

## Phase 3: 인사이트 강화 + 트래픽 성장 (5~8주차)

> **목표:** Insight Engine 고도화 + 콘텐츠 확장 + 광고 최적화 시작
> **완료 조건:** 인사이트 항목 5개+, 롱테일 30개+, 광고 A/B 테스트 가동

### 3-1. Insight Engine 고도화

- [x] KR 인사이트 추가 (4개 → 7개)
  - 경비율별 세금 변화 시뮬레이션 (5%p, 10%p, 15%p 시나리오)
  - 소득 구간 위치 (현재 세율 + 다음 구간까지 남은 금액)
  - 연도별 세율 변화 비교 (2025 vs 2026)
- [x] US 인사이트 추가 (6개 → 7개)
  - SEP IRA 납입액별 절세 시뮬레이션 (10%, 15%, 25%)
  - Quarterly Payment 스케줄 (Q1~Q4 납부일 + 금액)
  - State 비교 (CA/NY/TX 간 세금 차이)
- [x] 인사이트 항목 총 5개 이상 동작 확인 (KR 7개 / US 7개)

### 3-2. 콘텐츠 확장

- [x] US State 추가: FL, WA (총 5개 주)
  - State Config JSON 추가 (FL, WA — 소득세 없음)
  - State Tax 테스트 추가 (19개 통과)
  - FL, WA 롱테일 페이지 생성
- [x] 직군별 페이지 5개 + 공제 가이드
  - US: Uber Driver, DoorDash Dasher, Freelance Developer, Etsy Seller, Content Creator
  - 직군별 공제 항목 5개씩 가이드 포함
- [x] 롱테일 페이지 총 34개 (KR 18 + US 16)
- [x] 내부 링크 구조 개선
  - 메인 계산기 → 롱테일 6개 링크 (KR/US 모두)
  - 롱테일 → 메인 계산기 링크 (기존 유지)

### 3-3. 광고 수익화

- [ ] AdSense 승인 확인 (미승인 시 대안 검토: Ezoic)
- [ ] AdSense 광고 코드 삽입 (4개 위치)
  - 상단 배너 (728×90 / 반응형)
  - 결과 아래 (336×280 / 반응형) — **핵심 위치**
  - 인피드 (관련 계산기 목록 사이)
  - 하단 앵커
- [ ] A/B 테스트 1: 결과 아래 광고 크기 (336×280 vs 반응형)
- [ ] A/B 테스트 2: 상단 배너 유무 (RPM vs 체류시간 트레이드오프)
- [ ] 모바일 광고 배치 최적화 (트래픽 70%+ 대응)

### 3-4. 기술적 SEO 강화

- [x] 사이트맵 자동 업데이트 확인 (45개 URL, priority 최적화)
- [x] robots.txt 최적화 (/api/, /\_next/ 차단)
- [x] Core Web Vitals 최적화 (viewport export, metadataBase, GA preconnect)
- [ ] Search Console 인덱싱 현황 모니터링 _(외부 작업)_
- [ ] 크롤링 오류 수정 (있을 경우) _(외부 작업)_

### 3-5. 콘텐츠 보강 (FAQ + Schema.org)

- [x] FAQ 컴포넌트 생성 (아코디언 UI + Schema.org FAQPage 구조화 데이터)
- [x] KR 롱테일 18개 페이지에 직군·소득별 FAQ 3~4개씩 추가
- [x] US 롱테일 16개 페이지에 직군·주별 FAQ 3~4개씩 추가
- [x] KR 메인 계산기에 종합소득세 일반 FAQ 5개 추가
- [x] US 메인 계산기에 1099 세금 일반 FAQ 5개 추가
- [x] Google 리치 스니펫 대응 (FAQPage JSON-LD)

### Phase 3 체크포인트

- [x] 인사이트 항목 KR 7개 / US 7개 동작
- [x] 롱테일 페이지 34개 배포 (KR 18 + US 16)
- [ ] AdSense 광고 4개 위치 라이브 _(승인 대기 중)_
- [ ] A/B 테스트 2개 가동 중 _(승인 대기 중)_
- [x] 5개 US State 계산 가능 (CA, NY, TX, FL, WA)

---

## Phase 4: 데이터 분석 + 시장 결정 (9~12주차)

> **목표:** 90일간 축적된 데이터를 분석하여 집중 시장을 결정한다.
> **완료 조건:** KR vs US 비교 리포트 작성 + 집중 시장 선택 + 다음 분기 로드맵 확정

### 4-1. 트래픽 분석

- [ ] GA4 데이터 수집 확인 (최소 4주 데이터)
- [ ] KR vs US 트래픽 비교 리포트
  - 월 방문자 (목표: KR 3,000 / US 2,000)
  - 평균 체류시간 (목표: KR 2분+ / US 2.5분+)
  - 페이지/세션 (목표: KR 1.6+ / US 1.8+)
  - 이탈률
  - 유입 경로 (Organic Search 비율)
- [ ] 페이지별 트래픽 순위 분석 — 고성과 페이지 식별
- [ ] 디바이스 비율 확인 (모바일/데스크톱)

### 4-2. SEO 분석

- [ ] Search Console 키워드 분석
  - 노출 수 / 클릭 수 / CTR / 평균 순위
  - KR vs US 키워드 성과 비교
- [ ] 인덱싱 현황 확인 (30개+ 페이지 인덱싱 목표)
- [ ] 비인덱싱 페이지 원인 분석 + 수정
- [ ] 고성과 키워드 식별 → Phase 2 확장 우선순위 결정

### 4-3. 수익 분석

- [ ] RPM 분석 (국가별, 페이지별)
  - KR RPM 실측치 (목표: $5~8)
  - US RPM 실측치 (목표: $15~25)
- [ ] CTR 분석 (목표: KR 1.5%+ / US 2%+)
- [ ] 광고 위치별 성과 분석
  - 결과 아래 vs 상단 vs 인피드 vs 하단
- [ ] A/B 테스트 결과 정리 → 최적 광고 배치 확정
- [ ] Heatmap 분석 도구 도입 (Hotjar 무료 or Microsoft Clarity)

### 4-4. 시장 결정

- [ ] KR vs US 종합 평가 매트릭스 작성
  ```
  점수 = RPM × 월 트래픽 × 확장 용이성 × (1 / 경쟁 강도)
  ```
- [ ] **집중 시장 결정** (KR or US)
- [ ] 결정 근거 문서화 (데이터 기반)

### 4-5. 다음 분기 계획 수립

- [ ] Phase 2 (장기) 로드맵 상세화
  - 집중 시장 기준 계산기 확장 목록
  - Programmatic SEO 확장 계획 (500페이지 목표)
  - 수익 목표 재설정
- [ ] SPEC.md 업데이트 (90일 분석 결과 반영)

### Phase 4 체크포인트

- [ ] KR/US 비교 분석 리포트 완성
- [ ] 집중 시장 결정 완료 + 근거 문서화
- [ ] 최적 광고 배치 확정
- [ ] Phase 2 로드맵 확정

---

## Phase 5: 집중 확장 (4~6개월) — 장기

> **목표:** 집중 시장에서 계산기 포트폴리오 확장 + 월 5만 방문자
> **완료 조건:** 계산기 10개+, 롱테일 500개+, 월 방문자 5만, 월 수익 100만 원+

### 5-1. KR 신규 계산기 (3개)

**계산기 1: 근로소득세 계산기**

- [x] 계산 엔진 구현 (`src/engine/kr/earned-income-tax.ts`) — 총급여 → 근로소득공제 → 과세표준 → 누진세율 → 산출세액 → 세액공제
- [x] 단위 테스트 작성 (`__tests__/kr-earned-income-tax.test.ts`) — 22개 테스트 (공제 6 + 세액공제 5 + 통합 11)
- [x] UI 구현 — 입력폼 (연봉, 부양가족, 비과세소득, 자녀수, 4대보험), 결과 표시, 인사이트 패널
- [x] 페이지 생성 (`/kr/earned-income-tax-calculator`) + SEO 메타데이터
- [x] 롱테일 페이지 5개 — 연봉 3000/5000/7000만원/1억, 신입사원

**계산기 2: 부가가치세 계산기**

- [x] 계산 엔진 구현 (`src/engine/kr/vat.ts`) — 매출세액 - 매입세액 = 납부세액, 간이과세자 로직
- [x] 단위 테스트 작성 (`__tests__/kr-vat.test.ts`) — 11개 테스트 (일반 5 + 간이 4 + 면세 2)
- [x] UI 구현 — 입력폼 (매출액, 매입액, 과세 유형, 신용카드 비율), 결과 표시
- [x] 페이지 생성 (`/kr/vat-calculator`) + SEO 메타데이터
- [x] 롱테일 페이지 3개 — 간이과세자, 일반과세자, 면세사업자

**계산기 3: 퇴직금 계산기**

- [x] 계산 엔진 구현 (`src/engine/kr/severance.ts`) — 1일 평균임금 × 30일 × (재직일수/365) + 퇴직소득세
- [x] 단위 테스트 작성 (`__tests__/kr-severance.test.ts`) — 8개 테스트
- [x] UI 구현 — 입력폼 (입사일, 퇴사일, 월급, 상여금, 연차수당), 결과 표시
- [x] 페이지 생성 (`/kr/severance-calculator`) + SEO 메타데이터
- [x] 롱테일 페이지 3개 — 1년/3년/10년 근속

### 5-2. US 신규 계산기 (3개)

**계산기 1: W-2 vs 1099 비교 계산기**

- [x] 계산 엔진 구현 (`src/engine/us/w2-vs-1099.ts`) — W-2(FICA 7.65%) vs 1099(SE Tax 15.3%) 비교
- [x] 단위 테스트 작성 (`__tests__/us-w2-vs-1099.test.ts`) — 8개 테스트
- [x] UI 구현 — 입력폼 (연소득, Filing Status, State), side-by-side 비교 결과 표시
- [x] 페이지 생성 (`/us/w2-vs-1099-calculator`) + SEO 메타데이터
- [x] 롱테일 페이지 3개 — $50K/$100K/$150K 비교

**계산기 2: Home Office Deduction 계산기**

- [x] 계산 엔진 구현 (`src/engine/us/home-office.ts`) — Simplified ($5/sqft, max 300) vs Regular (실제 비용 비례)
- [x] 단위 테스트 작성 (`__tests__/us-home-office.test.ts`) — 7개 테스트
- [x] UI 구현 — 입력폼 (집 면적, 오피스 면적, 임대료/모기지, 유틸리티), 두 방법 비교 결과
- [x] 페이지 생성 (`/us/home-office-deduction-calculator`) + SEO 메타데이터
- [x] 롱테일 페이지 3개 — Apartment, House, Coworking 비교

**계산기 3: Mileage Deduction 계산기**

- [x] 계산 엔진 구현 (`src/engine/us/mileage.ts`) — Standard Mileage Rate ($0.67/mi) vs Actual Expenses 비교
- [x] 단위 테스트 작성 (`__tests__/us-mileage.test.ts`) — 8개 테스트
- [x] UI 구현 — 입력폼 (연간 마일수, 차량 비용), 두 방법 비교 결과
- [x] 페이지 생성 (`/us/mileage-deduction-calculator`) + SEO 메타데이터
- [x] 롱테일 페이지 3개 — Uber/DoorDash Driver, Freelancer, Real Estate Agent

### 5-3. Programmatic SEO 대규모 확장

- [ ] 롱테일 자동 생성 시스템 고도화
  - 직군 × 지역 × 연도 × 소득구간 조합 자동화
- [ ] 500페이지+ 자동 생성 + 배포
- [ ] (US) 주별 15개 확장
- [ ] 페이지별 고유 인사이트 자동 생성

### 5-4. 수익 최적화

- [ ] 광고 배치 지속 최적화 (데이터 기반)
- [ ] RPM 높은 페이지 패턴 분석 → 복제
- [ ] 네이티브 광고 / 인피드 광고 테스트

### Phase 5 체크포인트

- [ ] 계산기 10개+ 라이브
- [ ] 롱테일 500페이지+ 배포
- [ ] 월 방문자 5만 달성
- [ ] 월 수익 100만 원+ 달성

---

## Phase 6: 수익 다각화 (7~12개월) — 장기

> **목표:** AdSense 외 수익원 확보 + 월 $3,000+ 달성
> **완료 조건:** Affiliate 수익 발생 + 이메일 리스트 구축 시작

### 6-1. Affiliate 도입

- [ ] 세무 소프트웨어 Affiliate 파트너십 (TurboTax, 삼쩜삼 등)
- [ ] 회계 서비스 Affiliate
- [ ] 계산 결과 페이지에 자연스러운 Affiliate 링크 배치
- [ ] Affiliate 수익 추적 설정

### 6-2. 사용자 리텐션

- [ ] 계산 결과 이메일 저장 기능
- [ ] 금리/세율 변경 알림 서비스 (이메일 리스트)
- [ ] 세무 서비스 연결 (CPA 매칭)

### 6-3. 개발 효율화

- [ ] CLI 툴 개발: JSON 설정만으로 신규 계산기 릴리즈
- [ ] 계산기 템플릿 시스템 구축

### Phase 6 체크포인트

- [ ] AdSense + Affiliate 수익 다각화
- [ ] 월 $3,000+ 달성
- [ ] 이메일 리스트 1,000+ 구독자

---

## Phase 7: 글로벌 확장 (13~18개월) — 장기

> **목표:** 추가 국가 진출 + B2B 가능성 검토

- [ ] 영국(UK) 또는 캐나다(CA) 세금 계산기 추가
- [ ] 일본/동남아 시장 검토
- [ ] 계산 API 일부 공개 (B2B 가능성 검토)
- [ ] 글로벌 도메인/SEO 전략 수립

---

## 부록: 주요 리스크 대응 체크리스트

실행 중 아래 리스크 발생 시 즉시 대응한다.

| 리스크         | 트리거                   | 대응 액션                                      |
| -------------- | ------------------------ | ---------------------------------------------- |
| 세법 변경      | 국세청/IRS 공지          | Config JSON 업데이트 (5분 내) + 메타 날짜 갱신 |
| 계산 오류 신고 | 사용자 피드백            | 즉시 테스트 케이스 추가 + 수정 배포            |
| YMYL 순위 하락 | Search Console 순위 급락 | Authority Layer 강화 + 출처 보강               |
| 트래픽 정체    | 4주 연속 성장 없음       | 롱테일 축 추가 (직군/지역/소득)                |
| RPM 기대 이하  | RPM < 목표의 50%         | Insight Engine 강화 → 체류시간 개선            |
| AdSense 거절   | 승인 거부 통지           | 콘텐츠 보강 후 재신청 / Ezoic 대안 전환        |
| 번아웃         | 2주 이상 진행 멈춤       | 스코프 축소, 자동화 우선, 주 단위 스프린트     |

---

_이 문서는 SPEC.md와 함께 관리되며, 각 Phase 완료 시 체크포인트를 검증하고 다음 Phase로 진행한다._
