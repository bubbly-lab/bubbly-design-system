# Architecture

Bubbly Design System의 기술적 아키텍처와 주요 의사결정을 기록하는 문서입니다.

중요한 기술적 결정을 내릴 때는 이 문서에 **어떤 맥락에서 결정이 필요했고, 어떤 선택지가 있었으며, 왜 이렇게 결정했는지**를 함께 기록합니다. 결정의 근거가 남아야 나중에 상황이 바뀌었을 때 재검토할 수 있습니다.

## 프로젝트 개요

[루미스케이프](https://www.rumyscape.com/)를 만들 때 구축했던 디자인 시스템을 다른 프로젝트, 다른 플랫폼에서도 사용 가능하도록 만드는 것을 목적으로 합니다.

- 루미스케이프 및 버블리랩 팀의 프로덕트에서 최적으로 사용 가능한 형태를 목표로 합니다.
- 범용 디자인 시스템을 지향하지 않습니다.
- 점진적 적용을 원칙으로 합니다.

## 레퍼런스 디자인 시스템

아키텍처 결정 시 아래 두 디자인 시스템을 주요 레퍼런스로 참고했습니다.

### seed-design (당근)

- 저장소: [daangn/seed-design](https://github.com/daangn/seed-design)
- 규모: 67개 패키지, PR #1300+, 전담팀 운영
- 아키텍처: `Figma → rootage (YAML) → qvism-preset (Recipe) → CSS 생성 → React 컴포넌트`
- 특징:
  - **zero-runtime** — 빌드 타임에 모든 CSS를 생성
  - **Headless + Styled 분리** — `react-headless` (25개 순수 로직) + `react` (70개 스타일 적용)
  - **자체 도구** — rootage (토큰), qvism (Recipe), figma-extractor 등 커스텀 빌드 도구 다수
  - **다중 소비자** — CSS 패키지를 Tailwind 플러그인, 웹뷰, 비-React 앱에서도 활용

### montage-web (원티드랩)

- 저장소: [wanteddev/montage-web](https://github.com/wanteddev/montage-web)
- 규모: 9개 패키지, PR #520+
- 아키텍처: `wds-theme (TS 토큰) → wds-engine (Emotion ThemeProvider) → wds (82개 컴포넌트)`
- 특징:
  - **Emotion 런타임** — `sx` prop 기반 스타일링, `Box` 컴포넌트로 polymorphic 지원
  - **단순한 파이프라인** — TS import만으로 토큰 소비, 별도 빌드 도구 없음
  - **단일 패키지** — 로직과 스타일이 한 패키지에 공존 (Headless 분리 없음)

### 우리의 선택

| 관점 | seed-design | montage-web | BDS |
|---|---|---|---|
| 스타일링 | 순수 CSS 생성 (zero-runtime) | Emotion (런타임) | **Panda CSS (zero-runtime)** |
| Headless | 자체 react-headless | 없음 | **Ark UI (외부 라이브러리)** |
| 토큰 포맷 | 자체 YAML (rootage) | TS 파일 | **DTCG JSON** |
| 빌드 도구 | 자체 (rootage, qvism) | 없음 | **Panda CSS 내장 Recipe** |
| 규모 적합성 | 대기업 전담팀 | 기업 규모 | **사이드프로젝트 팀** |

seed-design의 핵심 패턴(Recipe 기반 컴포넌트, zero-runtime)을 가져가되, 자체 도구 대신 Panda CSS가 내장 제공하는 기능으로 대체합니다. seed-design이 자체 제작한 qvism Recipe 시스템(`variant`, `size`, `compoundVariants`, `defaultVariants`)이 Panda CSS에 `cva`/`sva`/`defineRecipe`로 내장되어 있습니다.

montage-web의 Emotion 런타임 방식은 styled-components와 동일한 RSC 비호환 문제가 있어 채택하지 않았습니다.

## 기술 스택

| 영역 | 기술 | 선택 이유 |
|---|---|---|
| 패키지 관리 | pnpm + Turborepo | 기존 설정 유지 |
| 디자인 토큰 | DTCG JSON | 표준 포맷, Figma 친화적, 도구 독립적 |
| 토큰 → CSS | Style Dictionary | 이메일 등 외부 소비자용 CSS 변수 출력 |
| 스타일링 | Panda CSS | zero-runtime, RSC 호환, Recipe 시스템 내장, 타입 안전 |
| Headless UI | Ark UI | Panda CSS와 같은 팀(Chakra), 검증된 조합 |
| 컴포넌트 빌드 | tsdown | 라이브러리 전용, smart defaults, Rolldown 기반 |
| 문서화 | Storybook (`@storybook/react-vite`) | 컴포넌트 카탈로그 + visual test |
| 린트/포맷 | Biome | 기존 설정 유지 |
| 테스트 | Vitest + Testing Library | 최소한으로 시작, 필요 시 확장 |

## 패키지 구조

```
packages/
├── design-tokens/     ← DTCG JSON 토큰 정의 + Style Dictionary 빌드
│   ├── tokens/        ← Source of truth (DTCG JSON)
│   ├── scripts/
│   │   ├── build.js       ← Style Dictionary → CSS 변수 출력
│   │   └── to-panda.js    ← DTCG → Panda config 변환
│   └── build/
│       ├── css/tokens.css     ← 이메일 등 외부 소비자용
│       └── panda/tokens.ts    ← React 패키지가 소비
│
├── icons/             ← Figma 아이콘 → React 컴포넌트 (NEW)
│   ├── scripts/       ← Figma API + SVGO + React 생성
│   ├── src/icons/     ← 생성된 컴포넌트 (git committed)
│   └── dist/          ← tsdown 빌드 출력
│
└── react/             ← Panda CSS + Ark UI + Storybook
    ├── panda.config.ts    ← design-tokens 빌드 출력을 import
    ├── tsdown.config.ts
    ├── styled-system/     ← Panda codegen 생성물 (gitignore)
    ├── src/
    │   └── components/    ← Ark UI 기반 styled 컴포넌트
    └── .storybook/
```

> `css` 패키지는 제거합니다. 기존 css 패키지는 Style Dictionary 출력물을 복사하는 단순 래퍼였으며, Panda CSS 도입으로 역할이 사라집니다. 이메일 등 외부 소비자용 CSS는 design-tokens 패키지의 빌드 출력(`build/css/tokens.css`)을 직접 참조합니다.

## 토큰 → 컴포넌트 파이프라인

```
Figma (Source of Truth)
  │
  ↓ AI 에이전트 (figma-mcp-bridge)
  │
design-tokens/ (DTCG JSON)
  │
  ├──→ Style Dictionary → build/css/tokens.css   ← 이메일 등 외부 소비자용
  │
  └──→ to-panda.js 변환 → build/panda/tokens.ts
                                │
                                ↓ import
                          react/panda.config.ts
                                │
                                ↓ panda codegen
                          styled-system/ (CSS 변수 + 타입 + 유틸리티)
                                │
                                ↓ import
                          src/components/ (Ark UI + Panda Recipe)
                                │
                                ↓ tsdown build + panda cssgen
                          dist/ (JS 번들 + styles.css)
```

### DTCG → Panda 변환

DTCG JSON과 Panda CSS 토큰 형식의 차이:

| | DTCG | Panda CSS |
|---|---|---|
| 값 키 | `$value` | `value` |
| 타입 | `$type` (그룹 상속) | 카테고리로 구분 (`colors`, `spacing` 등) |
| 참조 | `{color.violet.400}` | `{colors.violet.400}` |

`design-tokens/scripts/to-panda.js`에서 이 변환을 수행합니다.

### 컴포넌트 배포

소비자가 Panda CSS를 설치할 필요 없이 사용할 수 있도록, Static CSS 방식으로 배포합니다.

```ts
// 소비자 코드
import '@bubbly-design-system/react/styles.css'
import { Button } from '@bubbly-design-system/react'
```

## 컴포넌트 개발 패턴

[Park UI](https://github.com/cschroeter/park-ui) (Ark UI + Panda CSS의 레퍼런스 구현체)의 패턴을 따릅니다.

### 패턴 A: 단순 컴포넌트 (Button 등)

```tsx
import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'

export const Button = styled(ark.button, button)
```

### 패턴 B: 복합 컴포넌트 (Checkbox 등)

```tsx
import { Checkbox } from '@ark-ui/react/checkbox'
import { createStyleContext } from 'styled-system/jsx'
import { checkbox } from 'styled-system/recipes'

const { withProvider, withContext } = createStyleContext(checkbox)

export const Root = withProvider(Checkbox.Root, 'root')
export const Control = withContext(Checkbox.Control, 'control')
export const Label = withContext(Checkbox.Label, 'label')
```

### 네임스페이스 export

```tsx
// 내부
export * as Checkbox from './checkbox'

// 소비자 사용
<Checkbox.Root>
  <Checkbox.Control />
  <Checkbox.Label>동의합니다</Checkbox.Label>
</Checkbox.Root>
```

## Figma 동기화

디자인 토큰은 AI 에이전트(`figma-mcp-bridge` 스킬)를 통해 Figma 디자인을 읽고 DTCG 토큰/컴포넌트 코드를 생성합니다.

아이콘은 Figma REST API 기반 스크립트로 자동 추출합니다:

- `pnpm --filter @bubbly-design-system/icons generate` 명령으로 실행
- Figma → SVG 추출 → SVGO 최적화 → React 컴포넌트 생성 파이프라인
- 생성된 컴포넌트는 git에 커밋 (generated code as committed source)

## 다크모드

현재 토큰은 다크 테마 단일 정의입니다. Panda CSS의 `semanticTokens`에서 `value`로 현재 다크 값만 넣되, 이후 라이트 모드가 필요해지면 `{ base: '...', _light: '...' }` 형태로 확장 가능한 구조를 유지합니다.

## DTCG → Panda 변환 결정사항

`design-tokens/scripts/to-panda.js`에서 DTCG 토큰을 Panda CSS 형식으로 변환할 때 적용한 결정사항입니다.

### dimension → spacing + sizes 이중 매핑

DTCG 스펙의 `dimension` 타입은 spacing(padding, gap)과 sizing(width, height) 용도를 구분하지 않습니다. Panda CSS는 이를 `spacing`과 `sizes`로 분리하므로 변환 시 매핑이 필요합니다.

디자인팀에 dimension 토큰을 분리해달라고 요청하지 않기로 했습니다. spacing/sizes 구분은 CSS 프레임워크의 소비 측 관심사이지 디자인 토큰 정의의 관심사가 아니기 때문입니다. 디자인팀은 하나의 dimension 스케일만 관리하고, 변환 스크립트에서 동일한 값을 `spacing`과 `sizes` 양쪽에 출력합니다.

- 디자인 토큰 측: `dimension` 단일 스케일 유지 (변경 없음)
- 변환 스크립트: `spacing`과 `sizes`에 동일한 값을 이중 출력
- 소비 측: `spacing.12` (패딩), `sizes.48` (높이) 용도에 맞게 사용

### semantic token 값 형식 (다크모드 단일)

현재 다크 테마만 지원하므로, semantic token은 plain value 형식을 사용합니다.

```ts
// 현재: plain value
{ value: '{colors.violet.400}' }

// 라이트 모드 추가 시: conditional value로 변경
{ value: { base: '{colors.violet.400}', _light: '{colors.violet.600}' } }
```

라이트 모드가 필요해지면 `to-panda.js`의 출력 형식을 conditional value로 변경하고, DTCG 토큰 파일에 라이트 값을 추가합니다.

## 의도적으로 하지 않는 것

| 하지 않는 것 | 이유 |
|---|---|
| 자체 Headless 레이어 개발 | Ark UI가 대체 |
| 자체 토큰 빌드 도구 개발 | Style Dictionary + Panda CSS로 충분 |
| 자체 CSS 생성 도구 개발 | Panda CSS의 Recipe 시스템이 대체 |
| 런타임 CSS-in-JS | RSC 비호환 (styled-components/Emotion 탈출이 목적) |
| 범용 디자인 시스템 | rumyscape + 버블리랩 프로덕트 최적화에 집중 |
| 모든 것의 자동화 | 사이드프로젝트 팀 규모에서 오히려 작업 시간 증가 |
