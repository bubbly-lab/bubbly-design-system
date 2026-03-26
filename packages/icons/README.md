# @bubbly-design-system/icons

Bubbly Design System의 아이콘 패키지. 39개의 React SVG 컴포넌트를 제공합니다.

- **Tree-shakeable** — 사용한 아이콘만 번들에 포함
- **`currentColor` 기반** — CSS `color` 속성으로 색상 제어
- **`filled` prop** — outline/filled 두 가지 variant 전환
- **접근성** — `title`, `aria-label` 지원, 기본 `aria-hidden`
- **Server Components 호환** — `'use client'` 지시어 포함

---

## 설치

```bash
pnpm add @bubbly-design-system/icons
```

peer dependency로 React 18 이상이 필요합니다.

---

## 사용법

### 기본

```tsx
import { IconHome, IconSearch } from '@bubbly-design-system/icons';

export function MyComponent() {
  return (
    <div>
      <IconHome />
      <IconSearch />
    </div>
  );
}
```

### 크기 (`size`)

기본값은 `'1em'`으로, 부모 요소의 `font-size`를 따릅니다.

```tsx
<IconHome size={24} />        // 24px
<IconHome size="1.5rem" />    // 1.5rem
<IconHome size="2em" />       // 부모 font-size의 2배
```

### 색상

`color` CSS 속성을 통해 제어합니다. 아이콘은 `currentColor`를 사용하므로 별도 prop 없이 CSS만으로 색상이 적용됩니다.

```tsx
// CSS로 제어
<IconHome style={{ color: '#FF5733' }} />
<IconHome className="text-blue-500" />  // Tailwind

// SVG 속성 직접 전달도 가능
<IconHome fill="red" />
```

### Filled variant (`filled`)

outline/filled 두 가지 variant를 가진 아이콘은 `filled` prop으로 전환합니다. 기본값은 `false` (outline).

```tsx
<IconHome />              // outline (기본)
<IconHome filled />       // filled
<IconHome filled={true} />
```

`filled` prop이 없는 아이콘(단일 variant)은 prop을 받아도 무시됩니다.

### 접근성

기본적으로 `aria-hidden={true}`가 적용됩니다. 아이콘이 의미를 전달해야 하는 경우 `title` 또는 `aria-label`을 사용하세요.

```tsx
// 장식용 (기본) — 스크린 리더가 무시
<IconHome />

// 의미 있는 아이콘 — title로 설명 제공
<IconHome title="홈으로 이동" />

// aria-label 사용
<button aria-label="홈으로 이동">
  <IconHome />
</button>

// aria-labelledby 사용
<IconHome aria-labelledby="home-label" />
```

### ref 전달

모든 아이콘은 `forwardRef`로 구현되어 있어 `SVGSVGElement` ref를 전달할 수 있습니다.

```tsx
const ref = useRef<SVGSVGElement>(null);
<IconHome ref={ref} />
```

### SVG 속성 전달

`IconProps`는 `React.SVGAttributes<SVGElement>`를 확장하므로 모든 SVG 속성을 그대로 전달할 수 있습니다.

```tsx
<IconHome
  className="my-icon"
  style={{ verticalAlign: 'middle' }}
  onClick={() => console.log('clicked')}
/>
```

---

## 아이콘 목록

총 39개. 이름은 camelCase이며 컴포넌트는 `Icon` 접두사를 붙입니다 (예: `home` → `IconHome`).

### Outline + Filled (9개)

`filled` prop으로 variant 전환 가능.

| 이름 | 컴포넌트 |
|------|----------|
| home | `IconHome` |
| userCircle | `IconUserCircle` |
| lock | `IconLock` |
| mail | `IconMail` |
| location | `IconLocation` |
| pencil | `IconPencil` |
| bubble | `IconBubble` |
| questionCircle | `IconQuestionCircle` |
| infoCircle | `IconInfoCircle` |

### Outline only (27개)

| | | |
|--|--|--|
| `IconPlus` | `IconMinus` | `IconSearch` |
| `IconClose` | `IconCloseCircle` | `IconCheck` |
| `IconMenu` | `IconFilter` | `IconKebab` |
| `IconBullet` | `IconWarningCircle` | `IconReload` |
| `IconLoading` | `IconLink` | `IconCopy` |
| `IconExternalLink` | `IconImgNone` | `IconUnlock` |
| `IconTime` | `IconArrowRight` | `IconArrowLeft` |
| `IconArrowUp` | `IconArrowDown` | `IconChevronRight` |
| `IconChevronLeft` | `IconChevronUp` | `IconChevronDown` |

### Filled only (3개)

| 이름 | 컴포넌트 |
|------|----------|
| star | `IconStar` |
| starHalf | `IconStarHalf` |
| starEmpty | `IconStarEmpty` |

---

## TypeScript

```ts
import type { IconProps } from '@bubbly-design-system/icons';
```

```ts
interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  size?: string | number;   // 기본값: '1em'
  filled?: boolean;         // 기본값: false
  title?: string;           // 접근성용 SVG <title>
}
```

---

## 기여 가이드

### 아이콘 추가/수정 방법

`src/icons/` 파일을 직접 수정하지 마세요. 아이콘은 파이프라인을 통해 자동 생성됩니다.

**파이프라인 구조:**

```
SVG 소스 (외부)
    ↓ scripts/fetch-figma.ts
svg/{name}/{variant}.svg          ← 원본 SVG (git 추적)
    ↓ scripts/optimize-svgs.ts    (SVGO v4)
svg/{name}/{variant}.svg          ← 최적화된 SVG (in-place)
    ↓ scripts/generate-components.ts
src/icons/Icon{Name}.tsx          ← 생성된 컴포넌트 (git 추적)
    ↓ scripts/generate-exports.ts
src/index.ts                      ← barrel export (git 추적)
```

**전체 파이프라인 실행:**

```bash
# 루트 .env에 FIGMA_PAT, FIGMA_FILE_KEY 필요
pnpm --filter @bubbly-design-system/icons generate
```

**개별 스크립트 실행 (packages/icons/ 에서):**

```bash
npx tsx scripts/fetch-figma.ts        # SVG 다운로드
npx tsx scripts/optimize-svgs.ts      # SVGO 최적화
npx tsx scripts/generate-components.ts # React 컴포넌트 생성
npx tsx scripts/generate-exports.ts   # barrel index.ts 생성
```

### 아이콘 추가

1. `scripts/icon-manifest.json`에 항목 추가:
   ```json
   "newIcon": {
     "outline": "NODE_ID",
     "filled": "NODE_ID"
   }
   ```
   variant가 하나뿐이면 해당 key만 작성합니다.
2. 파이프라인 실행: `pnpm --filter @bubbly-design-system/icons generate`
3. 생성된 파일 커밋

### 환경 설정

루트 `.env` 파일에 다음 값이 필요합니다:

```bash
# .env (루트)
FIGMA_PAT=your_figma_personal_access_token
FIGMA_FILE_KEY=your_figma_file_key
```

`.env.example`을 참고하세요.

### 빌드 및 테스트

```bash
# 빌드
pnpm --filter @bubbly-design-system/icons build

# 타입 체크
pnpm --filter @bubbly-design-system/icons check-types

# 테스트 (빌드 스크립트 단위 테스트)
pnpm --filter @bubbly-design-system/icons test
```

### 코드 구조

```
packages/icons/
├── scripts/
│   ├── fetch-figma.ts          # SVG 다운로드 (외부 소스)
│   │                           # 429 rate limit 자동 재시도 (Retry-After)
│   ├── optimize-svgs.ts        # SVGO v4 최적화 (in-place)
│   │                           # width/height 제거, currentColor 변환
│   ├── generate-components.ts  # SVG → React 컴포넌트 코드 생성
│   ├── generate-exports.ts     # src/index.ts barrel export 생성
│   ├── generate.ts             # 위 4개를 순서대로 실행하는 오케스트레이터
│   ├── icon-manifest.json      # 아이콘 이름 → nodeId 매핑
│   └── __tests__/              # 빌드 스크립트 단위 테스트 (Vitest)
├── src/
│   ├── types.ts                # IconProps 인터페이스
│   ├── index.ts                # barrel export (자동 생성)
│   └── icons/                  # 아이콘 컴포넌트 (자동 생성, git 추적)
├── svg/                        # 최적화된 원본 SVG (자동 생성, git 추적)
├── dist/                       # 빌드 출력 (gitignore)
├── tsdown.config.ts            # ESM + CJS + dts 빌드 설정
└── vitest.config.ts            # 테스트 설정
```

### 컴포넌트 생성 규칙

`generate-components.ts`가 각 아이콘을 다음 규칙으로 변환합니다:

- **이름**: `{camelCase}` → `Icon{PascalCase}` (예: `arrowLeft` → `IconArrowLeft`)
- **`filled` prop**: outline + filled 둘 다 있는 아이콘만 조건부 렌더링. 단일 variant 아이콘은 prop을 받아도 무시
- **SVG 변환**: kebab-case 속성 → camelCase (예: `fill-rule` → `fillRule`), `xmlns` 제거
- **접근성**: `title`/`aria-label`/`aria-labelledby` 중 하나라도 있으면 `role="img"`, 없으면 `aria-hidden={true}`
