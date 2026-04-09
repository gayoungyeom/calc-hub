# SEO 규칙

## 메타 제목 (title)

- 형식: `{페이지 제목} — CalcHub`
- KR: 연도 + 핵심 키워드 + 혜택/CTA 포함 (예: "유튜버 종합소득세 계산기 2026 — 예상 세금·환급액 즉시 확인")
- US: 직군/주 + 계산기 유형 + 연도 (예: "Uber Driver Tax Calculator 2026")
- 전체 길이 60자 이내 (한글 기준 30자 + " — CalcHub")

## 메타 설명 (description)

- KR: 100~155자 (현재 46~57자로 너무 짧음 — 보강 필요)
- US: 115~155자
- 구조: [타겟 대상] + [핵심 가치] + [CTA]
- 예: "유튜버·크리에이터를 위한 2026년 종합소득세 계산기. 애드센스 수익 신고부터 경비처리, 3.3% 환급 예상액까지 무료로 확인하세요."

## hreflang

- 모든 페이지에 `alternates.languages` 필수: `{ ko, en, "x-default" }`
- KR 페이지 → `ko: /kr/{slug}`, `en: /us` (또는 대응 US 페이지), `x-default: /`
- US 페이지 → `en: /us/{slug}`, `ko: /kr`, `x-default: /`
- 1:1 대응 계산기가 있으면 해당 URL 연결 (예: freelancer-tax ↔ 1099-tax)

## Schema.org 구조화 데이터

- FAQPage: FAQ 항목이 있는 모든 페이지에 `<FaqSchema>` 컴포넌트 필수
- Organization: 루트 layout.tsx에서 1회 선언 (수정 불필요)
- 새 페이지 추가 시 FAQ 최소 3개 포함

## AuthorityBlock

- 모든 계산기/롱테일 페이지 하단에 필수
- props: `taxYear`, `lastUpdated`, `sources` (공식 출처 2개+), `calculationMethod`, `locale`
- KR sources: 국세청(nts.go.kr), 소득세법(law.go.kr)
- US sources: IRS.gov, 관련 Tax Code

## 사이트맵

- `next-sitemap` 으로 자동 생성 (`npm run postbuild`)
- 새 페이지 추가 시 `npm run build` 후 sitemap-0.xml 변경 확인
- priority: 메인 계산기 1.0, 홈 0.9, 롱테일 0.8, 유틸리티(about/privacy/terms) 0.3

## 새 페이지 추가 체크리스트

1. [ ] kr-pages.json 또는 us-pages.json에 데이터 추가
2. [ ] title, description, h1, keywords, faq, deductionGuide 모두 작성
3. [ ] hreflang alternates 설정
4. [ ] FaqSchema + AuthorityBlock 포함 확인
5. [ ] `npm run build` 성공 + sitemap 반영 확인
