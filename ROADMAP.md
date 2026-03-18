# Roadmap

Bubbly Design System의 앞으로 해야 할 작업 목록입니다.

## Phase 0: 인프라 정비

### 0-1. css 패키지 제거
- `packages/css/` 디렉토리 삭제
- `pnpm-workspace.yaml`에서 제거 (필요 시)
- root `turbo.json`에서 관련 설정 정리

### 0-2. design-tokens 패키지에 Panda 변환 스크립트 추가
- `scripts/to-panda.js` 작성 — DTCG JSON → Panda 토큰 형식 변환
  - `$value` → `value`
  - `$type` 그룹 → Panda 카테고리 (`colors`, `spacing` 등) 매핑
  - alias `{color.violet.400}` → `{colors.violet.400}` 참조 변환
- `build/panda/tokens.ts` 출력
- `package.json`에 `build:panda` 스크립트 추가

### 0-3. react 패키지 재구성
- Panda CSS 설치 및 `panda.config.ts` 설정
- Ark UI 설치
- tsdown 설치 및 `tsdown.config.ts` 설정
- `styled-system/`을 `.gitignore`에 추가
- `panda codegen` → `tsdown` → `panda cssgen` 빌드 파이프라인 구성

### 0-4. Storybook 설정
- `@storybook/react-vite` 설치
- `postcss.config.cjs` 설정 (Panda CSS PostCSS 플러그인, Vite 호환 필수)
- `panda.config.ts`의 `include`에 `.storybook/` 경로 추가
- CSS layer 순서 설정 (`@layer reset, base, tokens, recipes, utilities`)
- 빌드 스크립트에 `panda codegen` 선행 실행 추가

## Phase 1: 첫 번째 컴포넌트 (Button)

### 1-1. Figma에서 Button 디자인 컨텍스트 추출
- `figma-mcp-bridge`를 사용하여 Button 컴포넌트 상세 스타일 추출
- variant 별 색상, 타이포그래피, spacing 값 확인

### 1-2. Button Recipe 정의
- `panda.config.ts`에 `defineRecipe` 작성
- Figma 디자인 기준 variant 정의:
  - `color`: brand, neutral, critical
  - `type`: solid, weak
  - `size`: large (52px), medium (48px), small (40px)
  - `state`: default, hover, focus, disabled, loading (CSS 조건으로 처리)

### 1-3. Button React 컴포넌트 구현
- `styled(ark.button, buttonRecipe)` 패턴 적용
- loading 상태 처리
- icon-only 버튼 지원
- `'use client'` 디렉티브 추가

### 1-4. Button Storybook Stories 작성
- 각 variant/size 조합 시각적 확인
- 인터랙션 상태(hover, focus, disabled, loading) 확인

### 1-5. Button 테스트 작성
- Vitest + Testing Library로 기본 렌더링/인터랙션 테스트

## Phase 2: 컴포넌트 확장

Phase 1이 완료되면 패턴이 확립되므로, 이후 컴포넌트는 동일 패턴으로 추가합니다.
우선순위와 범위는 디자인팀과 협의하여 결정합니다.

## Phase 3: 루미스케이프 적용

- 루미스케이프에 점진적 적용
- 기존 styled-components 컴포넌트를 하나씩 교체
- 호환성 이슈 발견 시 디자인 시스템에 피드백
