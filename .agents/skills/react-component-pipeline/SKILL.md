---
name: react-component-pipeline
description: packages/react에서 Figma 디자인을 Panda CSS + Ark UI 기반 React 컴포넌트로 구현하는 파이프라인. 새 컴포넌트 생성과 기존 컴포넌트 업데이트 모두 지원한다. Figma URL이나 컴포넌트 이름이 주어졌을 때 사용한다.
---

# React Component Pipeline

`packages/react`에서 Figma 디자인 → Panda CSS + Ark UI React 컴포넌트를 만드는 전체 파이프라인.

## 언제 이 스킬을 사용하는가

- 사용자가 Figma URL과 함께 새 컴포넌트 구현을 요청할 때
- 사용자가 기존 컴포넌트의 variant 추가/변경을 요청할 때
- 사용자가 Figma 변경사항을 코드에 반영해달라고 할 때

## 스택 요약

| 레이어 | 도구 |
|---|---|
| 헤드리스 UI | `@ark-ui/react` (ark.button, ark.div 등) |
| 스타일링 | Panda CSS (`defineRecipe`, `styled()`) |
| 디자인 토큰 | `packages/design-tokens/build/panda/tokens.ts` → `panda.config.ts` |
| 빌드 | `pnpm codegen` → `tsdown` → `pnpm cssgen` |
| 스토리 | Storybook 10, CSF3, `variantMap` 기반 |

## Phase 0: 사전 컨텍스트 수집 (건너뛰지 마라)

구현 전에 반드시 아래 파일들을 읽어서 현재 패턴을 파악한다.

### 필수 참조 파일

```
packages/react/src/recipes/button.ts            # recipe 구조, compound variant 패턴
packages/react/src/components/button/button.tsx  # forwardRef, styled(), props 설계
packages/react/src/components/button/button.stories.tsx  # CSF3 + variantMap 패턴
packages/react/panda.config.ts                   # recipe 등록 방식
packages/design-tokens/build/panda/tokens.ts     # 사용 가능한 semantic token 전체 목록
```

### 토큰 빌드 확인

```bash
ls packages/design-tokens/build/panda/tokens.ts
```

파일이 없으면 `pnpm --filter @bubbly-design-system/design-tokens build`를 먼저 실행한다.

### 이미 같은 이름의 컴포넌트가 있는지 확인

```bash
ls packages/react/src/components/
ls packages/react/src/recipes/
```

- **없으면** → "새 컴포넌트 생성" 흐름 (Phase 1부터)
- **있으면** → "기존 컴포넌트 업데이트" 흐름 (Phase 1-UPDATE부터)

## Phase 1: Figma 스펙 추출

### 1-A: Figma 스크린샷으로 전체 구조 파악 (가장 먼저)

REST API로 데이터를 뽑기 전에, Figma 노드의 스크린샷을 먼저 확인한다. 디자이너가 docs 프레임에 시각적으로만 전달한 정보(레이아웃 가이드, 간격 표기, 상태별 비교, 사용 예시 등)가 있을 수 있고, 이건 JSON에는 담기지 않는다.

Figma URL에서 fileKey와 nodeId를 추출한다:

```
https://www.figma.com/design/<FILE_KEY>/<NAME>?node-id=<NODE_ID>
```

- `node-id`의 `-`를 `:`로 변환 (예: `2604-10660` → `2604:10660`)

**Guard: 안전한 scale 자동 계산 (LLM 8000px 제한)**

LLM의 이미지 처리는 한 변이 8000px을 초과하면 세션이 죽는다. 이미지 요청 전에 노드 크기를 확인하고, 8000px 이하가 되는 scale을 자동 계산한다.

```bash
source .env && curl -s \
  -H "X-Figma-Token: $FIGMA_PAT" \
  "https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids={NODE_ID}&depth=1" \
  | python3 -c "
import json, sys, math
data = json.load(sys.stdin)
node = list(data['nodes'].values())[0]['document']
box = node.get('absoluteBoundingBox', {})
w, h = box.get('width', 0), box.get('height', 0)
max_dim = max(w, h)
if max_dim == 0:
    print('scale=1')
    sys.exit(0)
# 8000px 이하가 되는 최대 scale (0.01~4 범위, 소수점 둘째자리)
safe_scale = min(4, math.floor(8000 / max_dim * 100) / 100)
safe_scale = max(0.01, safe_scale)
print(f'node: {w:.0f}x{h:.0f}')
print(f'scale={safe_scale} -> {w*safe_scale:.0f}x{h*safe_scale:.0f}')
"
```

출력된 `scale` 값을 아래 이미지 요청에 그대로 사용한다.

```bash
source .env && curl -s \
  -H "X-Figma-Token: $FIGMA_PAT" \
  "https://api.figma.com/v1/images/{FILE_KEY}?ids={NODE_ID}&format=png&scale={SAFE_SCALE}"
```

응답의 `images` 객체에서 URL을 받아 `webfetch`나 `look_at` 도구로 내용을 확인한다.

스크린샷에서 확인할 것:

- **Anatomy 섹션**: 컴포넌트 구성 요소 (icon slot, label, badge 등)
- **Layout 섹션**: variant 조합 예시와 상태별 시각 비교 (default, hover, focus, disabled)
- **Size 섹션**: 사이즈별 치수 표기 (icon 크기, padding 등 px 단위 수치)
- **Docs 텍스트**: variant 축 이름/값 목록, 확장 가능성 메모, 특수 규칙
- **숨겨진 정보**: JSON에 없는 디자이너 의도 (예: "이 조합은 이렇게 쓰세요", 사용 맥락 설명)

Figma에 여러 섹션(노드)이 있으면 **모든 섹션의 스크린샷을 확인**한다. 하나의 컴포넌트가 Background/Standard처럼 여러 섹션으로 나뉘어 문서화되어 있을 수 있다.

### 1-B: Figma REST API로 구조 데이터 가져오기

위에서 추출한 fileKey와 nodeId를 사용한다:

```
https://www.figma.com/design/<FILE_KEY>/<NAME>?node-id=<NODE_ID>
```

- `node-id`의 `-`를 `:`로 변환 (예: `2604-10660` → `2604:10660`)

```bash
source .env && curl -s \
  -H "X-Figma-Token: $FIGMA_PAT" \
  "https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids={NODE_ID}&depth=3"
```

결과가 크므로 explore 에이전트에 위임하여 아래를 추출한다:

1. **variant 축과 값**: componentPropertyDefinitions에서 VARIANT 타입 속성
2. **전체 variant 조합 목록**: 각 component의 name 필드 (예: `color=brand, type=solid, size=medium, state=default`)
3. **실제 존재하는 조합 수 vs 이론적 조합 수**: 차이가 크면 유효 조합만 compound variant로 정의
4. **치수**: padding, width, height, cornerRadius
5. **색상 (⚠️ opacity 이중 구조 주의)**:
   - Figma fill에는 opacity가 두 겹: `fills[].color.a` (색상 알파)와 `fills[].opacity` (fill 레벨 불투명도). 실제 표현은 `color.a × fill.opacity`
   - 컴포넌트 레벨 fills → 배경색. **반드시 `fill.opacity`도 추출**. opacity=0이면 투명, opacity=0.2이면 반투명 등
   - 하위 노드 fills (depth 2+) → 아이콘/텍스트 색상. 상태별로 바뀔 수 있으므로 재귀적으로 추출
   - strokes도 동일하게 `stroke.opacity`까지 확인
6. **상태별 차이**: default → hover → focus → disabled에서 배경색, 아이콘 색상, stroke 모두 비교

### 1-C: Figma docs 이미지에서 디자이너 의도 보충

사용자가 별도 docs 이미지를 제공하면 1-A 스크린샷과 교차 확인한다:

- variant 축 이름과 값 (코드 prop 이름의 근거)
- 어떤 조합이 "designed"인지 (예: "3가지 모양으로 구성")
- "추후 확장 가능성" 등 메타 정보
- icon slot이 있으면 어떤 아이콘을 받는지

### 1-D: Figma rgba → semantic token 매핑

**이 단계를 건너뛰면 하드코딩된 색상값이 들어가서 토큰 시스템이 깨진다.**

`packages/design-tokens/build/panda/tokens.ts`를 열고, Figma에서 추출한 rgba 값을 semantic token 이름으로 매핑한다.

매핑 순서:
1. rgba → `tokens.colors`에서 기본 색상 찾기 (예: `rgb(133 102 255)` → `colors.violet.400`)
2. 기본 색상 → `semanticTokens.colors`에서 용도 찾기 (예: `colors.violet.400` → `surface.brand.default`)
3. recipe에는 semantic token 이름만 사용 (예: `backgroundColor: 'surface.brand.default'`)

자주 쓰이는 매핑:

| 용도 | semantic token |
|---|---|
| brand solid 배경 | `surface.brand.default` |
| brand solid hover | `surface.brand.default-hover` |
| ghost/outline hover 배경 | `surface.transparent-hover` |
| neutral 아이콘/텍스트 | `content.neutral.default` |
| outline 테두리 | `border.neutral.default` |
| outline hover 테두리 | `border.neutral.default-hover` |
| disabled 배경 | `surface.disabled` |
| disabled 텍스트/아이콘 | `content.disabled` |
| 흰색 (solid 위) | `static.white` |
| focus ring | `var(--colors-neutral-600)` (inner), `var(--colors-neutral-50)` (outer) |

## Phase 2: 디자인 결정

구현 전에 아래 결정을 확정한다. 모호하면 사용자에게 묻는다.

### 2-A: 컴포넌트 분리 vs 통합

Figma에서 섹션이 나뉘어 있어도 코드에서는 하나의 컴포넌트 + variant가 이 레포의 패턴이다.

**분리 기준**: 동작/접근성 규칙이 다를 때만 분리. 시각 차이만이면 variant로 통합.

### 2-B: prop 이름 결정

| 체크 | 설명 |
|---|---|
| HTML 충돌 | `type`은 `<button>`의 네이티브 속성. 기존 Button이 이미 `type`을 쓰므로 새 축은 다른 이름 사용 (예: `appearance`) |
| 기존 Button 일관성 | 같은 의미의 축은 같은 이름 사용 (color, size 등) |
| Figma 용어 반영 | Figma에서 `ghost`라 하면 `ghost` 사용 (Button의 `weak`와 다른 개념) |

### 2-C: 유효 조합 확인

Figma에서 전체 조합 중 일부만 디자인되어 있으면:

- compound variant는 **디자인된 조합만** 정의 (Button 패턴과 동일)
- 미정의 조합은 base 스타일만 적용됨
- Storybook에서 디자인된 조합을 중심으로 showcase

## Phase 2.5: 브랜치 확인 (코드 수정 전 필수)

파일을 생성하거나 수정하기 **직전에** 반드시 현재 브랜치를 확인한다.

```
git branch --show-current
```

```
현재 브랜치 확인
├─ main인가?
│  ├─ YES → "새 브랜치를 만들까요?"
│  │  ├─ 만든다 → 브랜치 이름 선택 (추천 이름 제시)
│  │  └─ 안 만든다 → main에서 바로 작업
│  │
│  └─ NO → "현재 브랜치({name})에서 작업할까요?"
│     ├─ 이 브랜치에서 작업한다 → 진행
│     ├─ main으로 돌아가서 새 브랜치를 만든다 → 브랜치 이름 선택
│     └─ main으로만 돌아간다 → main에서 작업
```

브랜치 이름 추천 형식: `feat/{kebab-name}` (예: `feat/icon-button`)

**브랜치 전환 시 주의:**
- 이미 변경사항이 있는 상태에서 브랜치를 전환해야 하면, `git stash`가 아니라 변경사항을 **들고 이동**한다
- `git checkout -b {new-branch}` → 현재 uncommitted 변경사항이 그대로 새 브랜치에 붙는다
- 다른 브랜치에서 main을 거쳐 새 브랜치로 가야 하면: `git checkout main && git checkout -b {new-branch}` — unstaged 변경사항은 자동으로 따라온다
- stash는 변경사항이 충돌할 때만 사용하고, 그 경우에도 즉시 `git stash pop`으로 복원한다

## Phase 3: 구현

### 파일 생성 순서 (순서 중요!)

```
1. src/recipes/{kebab-name}.ts              ← recipe 먼저
2. panda.config.ts                          ← recipe 등록
3. `pnpm --filter @bubbly-design-system/react codegen`  ← styled-system 타입 생성
4. src/components/{kebab-name}/{kebab-name}.tsx   ← 컴포넌트
5. src/components/{kebab-name}/index.ts           ← 배럴
6. src/index.ts                                    ← 루트 배럴에 추가
7. src/components/{kebab-name}/{kebab-name}.stories.tsx  ← 스토리
```

**codegen(3번)을 빼먹으면 `styled-system/recipes`에서 import 에러가 난다.**

전체 빌드는 `pnpm --filter @bubbly-design-system/react build`로 codegen → bundle → cssgen을 한번에 돌릴 수 있다.

### 3-A: Recipe 템플릿

```typescript
import { defineRecipe } from '@pandacss/dev';

const disabledStyles = {
  cursor: 'not-allowed',
  backgroundColor: 'surface.disabled',
  color: 'content.disabled',
} as const;

export const {camelName}Recipe = defineRecipe({
  className: '{kebab-name}',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'clip',
    position: 'relative',
    outline: 'none',
    border: 'none',
    userSelect: 'none',
    flexShrink: 0,
    transition: 'background-color 150ms ease-out',
    _focusVisible: {
      boxShadow:
        '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
    },
  },
  variants: {
    // 각 축을 빈 객체로 선언 (스타일은 compoundVariants에서)
  },
  compoundVariants: [
    // 디자인된 조합만 정의
    // 순서: 레이아웃 → 색상/시각 → 상태
  ],
  defaultVariants: {
    // Figma의 기본 variant 값 그대로
  },
});
```

**주의:**
- `base`에 공통 스타일만 (모든 variant에 적용되는 것)
- `variants`에 축 선언. 축 고유 스타일이 있으면 여기에 (예: size별 icon 크기)
- `compoundVariants`에 조합별 색상/padding/border-radius 등
- compound variant 순서: 레이아웃(padding, radius) → 색상 → 특수 상태

### 3-B: Component 템플릿

```tsx
'use client';

import { ark } from '@ark-ui/react/factory';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';
import { styled } from 'styled-system/jsx';
import { {camelName} } from 'styled-system/recipes';

const Styled = styled(ark.{htmlElement}, {camelName});

type StyledProps = Parameters<typeof Styled>[0];

export type {PascalName}Props = Omit<StyledProps, 'children'> & {
  // 컴포넌트 고유 props (loading, icon 등)
};

export const {PascalName} = forwardRef<HTML{Element}Element, {PascalName}Props>(
  function {PascalName}({ /* destructure custom props */ ...props }, ref) {
    return (
      <Styled ref={ref} {...props}>
        {/* children / icon / slot */}
      </Styled>
    );
  },
);
```

**체크리스트:**
- `'use client'` 맨 위
- `forwardRef` + named function expression
- `aria-label` 같은 접근성 필수 props는 required로
- icon slot은 `ReactNode` 타입 (기존 Button 패턴)
- CSS variable로 아이콘 크기 제어: `'--{name}-icon-size': '24px'`
- icon wrapper에 `fontSize: 'var(--{name}-icon-size)'` 필수 — `@bubbly-design-system/icons`는 `size` 기본값이 `1em`이므로, `fontSize`를 설정해야 아이콘이 올바른 크기로 렌더된다
- loading 지원 시 Button의 SpinnerOverlay 패턴 복제

### 3-C: panda.config.ts 등록

```typescript
import { {camelName}Recipe } from './src/recipes/{kebab-name}';

// theme.recipes에 추가
recipes: {
  button: buttonRecipe,
  {camelName}: {camelName}Recipe,  // key = styled-system/recipes에서의 import 이름
},
```

### 3-D: 배럴 export

컴포넌트 배럴 (`src/components/{kebab-name}/index.ts`):
```typescript
export { {PascalName}, type {PascalName}Props } from './{kebab-name}';
```

루트 배럴 (`src/index.ts`):
```typescript
export { {PascalName}, type {PascalName}Props } from './components/{kebab-name}';
```

### 3-E: Storybook 스토리

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { {camelName} } from 'styled-system/recipes';
import { {PascalName} } from './{kebab-name}';

const { variantMap } = {camelName};

const meta: Meta<typeof {PascalName}> = {
  title: 'Components/{PascalName}',
  component: {PascalName},
  argTypes: {
    // variantMap에서 control 자동 생성
    // variant: { control: 'select', options: variantMap.variant },
  },
  args: {
    // 기본 props
  },
};

export default meta;
type Story = StoryObj<typeof {PascalName}>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
// variant 조합 showcase, 상태별 showcase 등
```

**스토리 패턴:**
- 단순 variant: `args`만 바꿔서 export
- 조합 showcase: `render()` 함수에서 `variantMap.{axis}.map()`으로 매트릭스

**아이콘 사용:**
- 스토리에서 아이콘이 필요하면 `@bubbly-design-system/icons`에서 import한다
- 인라인 SVG placeholder를 쓰지 않는다
- react 패키지의 devDependencies에 `@bubbly-design-system/icons`가 있어야 한다 (없으면 `pnpm --filter @bubbly-design-system/react add -D @bubbly-design-system/icons`)
- 예: `import { IconArrowRight, IconPlus } from '@bubbly-design-system/icons';`

## Phase 3-UPDATE: 기존 컴포넌트 업데이트

기존 컴포넌트를 수정할 때는 아래 흐름을 따른다.

### variant 추가/변경

1. `src/recipes/{name}.ts`에서 `variants` 또는 `compoundVariants` 수정
2. `pnpm codegen` 실행 → `styled-system/recipes/{name}.d.ts` 타입 갱신 확인
3. 컴포넌트 코드에 새 props 반영 (필요한 경우)
4. 스토리에 새 variant showcase 추가
5. 빌드 전체 실행

### 스타일 토큰 변경

1. 변경된 Figma rgba → semantic token 다시 매핑
2. recipe의 compound variant에서 해당 토큰 업데이트
3. 빌드 후 `dist/styles.css`에서 변경 확인

### prop 추가

1. 컴포넌트 tsx에서 Props 타입에 추가
2. forwardRef 함수에서 destructure + 사용
3. 스토리에 argTypes/args 추가
4. LSP diagnostics 확인

## Phase 4: 검증

### 빌드 검증

```bash
pnpm --filter @bubbly-design-system/react build
```

성공 기준:
- exit code 0
- `styled-system/recipes/{name}.d.ts` — variant 타입 정확
- `styled-system/recipes/{name}.mjs` — compound variants 포함
- `dist/styles.css` — 클래스 생성됨
- `dist/index.mjs` — export 포함됨

### LSP 검증

변경한 모든 파일에 대해:

```
lsp_diagnostics(filePath, severity="error")
```

에러 0이어야 한다.

### Figma 대비 검증

아래 표를 채워서 self-check한다:

| 항목 | Figma 값 | 구현 값 | 일치 |
|---|---|---|---|
| variant 축 이름/값 | | | |
| 색상 토큰 매핑 | | | |
| padding/size | | | |
| border-radius | | | |
| hover 동작 | | | |
| disabled 동작 | | | |
| focus ring | | | |

불일치 항목이 있으면 수정 후 다시 빌드.

### Storybook 확인 (선택)

```bash
pnpm storybook:react
```

포트 6006에서 `Components/{PascalName}`으로 시각 확인.

## Phase 5: 완료 보고

모든 검증이 끝나면 사용자에게 아래 형식으로 결과를 보고한다.

### 생성한 파일

| 파일 | 역할 |
|---|---|
| `src/recipes/{kebab-name}.ts` | Panda CSS recipe (variant 축, compound variants, 기본값) |
| `src/components/{kebab-name}/{kebab-name}.tsx` | React 컴포넌트 (forwardRef, props, 렌더링 로직) |
| `src/components/{kebab-name}/index.ts` | 컴포넌트 배럴 export |
| `src/components/{kebab-name}/{kebab-name}.stories.tsx` | Storybook 스토리 (variant showcase, 상태별 데모) |

### 수정한 파일

| 파일 | 수정 내용 |
|---|---|
| `panda.config.ts` | `theme.recipes`에 새 recipe 등록 |
| `src/index.ts` | 루트 배럴에 컴포넌트/타입 export 추가 |

### 검증 결과

| 항목 | 결과 |
|---|---|
| `pnpm build` | exit code 0 |
| LSP diagnostics (변경 파일 전체) | 에러 0 |
| `styled-system/recipes/{name}` 타입 생성 | 확인 |
| `dist/styles.css` 클래스 생성 | 확인 |
| `dist/index.mjs` export 포함 | 확인 |
| Figma 대비 검증 표 | 전 항목 일치 |

### Storybook 확인

```bash
pnpm storybook:react
```

포트 6006 → `Components/{PascalName}`에서 시각 확인.

---

## 알려진 함정

| 함정 | 해결 |
|---|---|
| codegen 안 돌림 → import 에러 | recipe 등록 후 반드시 `pnpm codegen` 또는 `pnpm build` |
| Figma rgba를 하드코딩 | 반드시 semantic token으로 변환 |
| Figma 섹션 분리 = 코드 분리? | 아님. 시각 차이만이면 variant로 통합 |
| `type` prop 충돌 | HTML button의 `type`과 겹침. 기존 Button이 이미 사용 중이므로 새 시각 축은 `appearance` 등 사용 |
| compound variant 순서 | 나중에 정의된 게 이김. 레이아웃 → 색상 → 특수 순 |
| Figma에 없는 조합 | compound variant 미정의 → base만 적용. 의도적 |
| xsmall 등 Figma 미확인 값 | 추정치 쓰되 검증 표에 "확인 필요" 표시 |
| Figma fill opacity 누락 | `fills[].color.a`만 보면 안 된다. `fills[].opacity` (fill 레벨)도 있어서 실제 표현은 `color.a × fill.opacity`. opacity=0이면 투명, 0.2이면 반투명. strokes도 동일 |
| 컴포넌트 레벨 fills만 추출 | 아이콘/텍스트 색상은 하위 노드(depth 2+)에 있다. 상태별 색상 변화 확인 시 children fills도 재귀적으로 추출 |
| `borderRadius: 'full'` | `tokens.ts`의 `radii.full` = `999px`. 사용 가능 |
| 스토리에서 인라인 SVG 사용 | `@bubbly-design-system/icons`에서 import한다. 인라인 SVG placeholder를 쓰지 않는다 |
