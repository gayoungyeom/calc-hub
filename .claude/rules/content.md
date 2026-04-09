# 콘텐츠 작성 규칙

## KR 콘텐츠 기준

### 직군별 가이드 섹션 (Phase 4-2)

- 최소 1,500자 (공백 포함)
- 필수 포함 항목:
  1. 해당 직군의 소득 신고 방법 (사업소득 vs 근로소득 구분)
  2. 주요 경비처리 항목 (5개+, 구체적 예시 포함)
  3. 절세 팁 (2~3개)
  4. 신고 절차 요약
- 톤: 전문적이되 쉬운 설명. 세무사가 아닌 일반인이 읽는다고 가정.
- 금액 예시는 현실적인 범위 사용 (과장 금지)

### FAQ 작성

- 질문: 실제 검색어 기반, 구어체 (예: "유튜버도 종합소득세 신고해야 하나요?")
- 답변: 2~4문장, 핵심만. 불필요한 서론 없이 바로 답변.
- 최소 3개, 권장 4~5개

### YMYL 면책 규칙

- 모든 계산기/가이드 페이지에 면책 문구 필수
- KR: "본 계산기는 참고용이며, 정확한 세액은 세무사 상담 또는 홈택스를 이용하세요."
- US: "This calculator provides estimates only. Consult a tax professional for accurate filing."
- AuthorityBlock의 disclaimer로 이미 포함되어 있으므로 별도 추가 불필요

## US 콘텐츠 기준

- 영어 작성, 자연스러운 미국식 영어
- deduction guide: 직군별 공제 항목 5개+
- FAQ: 3~5개, IRS 규정 기반

## 콘텐츠 데이터 위치

- KR 롱테일: `src/config/longtail/kr-pages.json`
- US 롱테일: `src/config/longtail/us-pages.json`
- KR 근로소득: `src/config/longtail/kr-earned-income-pages.json`
- KR 부가세: `src/config/longtail/kr-vat-pages.json`
- KR 퇴직금: `src/config/longtail/kr-severance-pages.json`

## 가이드 콘텐츠 (Phase 5-1)

- 라우트: `/kr/guide/[slug]`
- 최소 2,000자
- 구조: 도입 → 본문 (소제목 3개+) → 계산기 CTA → FAQ
- 계산기 내부 링크 필수 포함
- Schema.org Article 또는 HowTo 구조화 데이터 추가
