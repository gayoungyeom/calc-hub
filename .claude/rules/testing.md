# 테스트 규칙

## 테스트 파일 위치 + 네이밍

- 위치: `__tests__/`
- 네이밍: `{region}-{calculator-type}.test.ts`
  - 예: `kr-tax.test.ts`, `us-home-office.test.ts`

## 테스트 작성 패턴

- `makeInput()` 헬퍼로 테스트 입력 생성 (반복 제거)
- `describe()` 블록으로 기능별 그룹핑
- 테스트 이름은 한국어로 작성 (예: `"소득 0원 → 세금 0원, 환급 0원"`)
- 금액은 `expect().toBe()` 로 정확한 숫자 검증

## 계산 엔진 수정 시

- 반드시 관련 테스트 파일에 케이스 추가 또는 기존 케이스 업데이트
- `npm run test` 전체 통과 확인 후 커밋

## Config JSON 수정 시

- `npm run build` 성공 확인 (SSG 페이지 생성 검증)
