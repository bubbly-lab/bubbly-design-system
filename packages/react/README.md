# @bubbly-design-system/react

Bubbly Design System React components built on [Panda CSS](https://panda-css.com/) and [Ark UI](https://ark-ui.com/).

## 설치

```bash
pnpm add @bubbly-design-system/react
# or
npm install @bubbly-design-system/react
# or
yarn add @bubbly-design-system/react
```

### Peer dependencies

React 18 이상이 필요합니다.

```bash
pnpm add react react-dom
```

`@ark-ui/react`와 `@bubbly-design-system/icons`는 내부에서 함께 설치되므로 별도로 추가할 필요는 없습니다.

## 사용법

### 1. 전역 스타일 import

애플리케이션 엔트리(`main.tsx`, `_app.tsx` 등)에서 번들된 CSS를 한 번 import 합니다.

```tsx
import '@bubbly-design-system/react/styles.css';
```

> Panda CSS의 preflight(CSS 리셋)는 **비활성** 상태입니다. 필요하다면 별도의 리셋(예: `modern-normalize`)을 직접 적용하세요.

### 2. 폰트 설정 (Pretendard)

이 디자인시스템은 **Pretendard** 를 기본 폰트로 가정합니다. 패키지는 폰트를 번들하지 않으므로 (dynamic subsetting 보존 및 중복 로드 회피) 호스트 앱에서 다음 중 한 가지 방법으로 직접 로드해주세요.

#### A. CSS에서 `@import`

```css
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
```

#### B. HTML `<head>` (예: Next.js App Router의 `app/layout.tsx`)

```html
<link
  rel="stylesheet"
  as="style"
  crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
/>
```

#### C. Self-host (npm 패키지)

```bash
pnpm add pretendard
```

```css
@import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
```

> 폰트를 로드하지 않으면 컴포넌트들은 시스템 폰트로 fallback 됩니다 (`sans-serif`).

### 3. 컴포넌트 사용

```tsx
import { Button, SearchField, Tabs, TabItem } from '@bubbly-design-system/react';

export function Example() {
  return (
    <>
      <Button>클릭</Button>
      <SearchField placeholder="검색..." />
      <Tabs defaultValue="a">
        <TabItem value="a" label="탭 A">A 내용</TabItem>
        <TabItem value="b" label="탭 B">B 내용</TabItem>
      </Tabs>
    </>
  );
}
```

## 제공 컴포넌트

| 카테고리 | 컴포넌트 |
|---|---|
| Button | `Button`, `IconButton`, `TextButton` |
| Input | `SearchField`, `Autocomplete`, `AutocompleteItem`, `AutocompleteHighlight`, `highlightMatch` |
| Tabs | `Tabs`, `TabList`, `TabContent`, `TabItem`, `TabItemContent` |
| Card | `VerticalCard`, `HorizontalCard`, `CardHeader`, `Thumbnail` |
| Feedback | `LoadingIndicator`, `Skeleton`, `Result`, `Dimmed` |
| Navigation | `SectionHeader` |
| Layout | `Divider`, `ListRow`, `InfoList`, `InfoItem` |

전체 컴포넌트의 사용 예시와 variant는 Storybook에서 확인할 수 있습니다.

## 설계 노트

- `Autocomplete`는 presentational dropdown 패널입니다. `listbox`/`combobox` role은 부모 입력(예: `SearchField`)에서 직접 연결해야 합니다.
- `ListRow`의 hover 배경은 좌우로 8px bleed 되는 의도된 디자인입니다. 부모에 `overflow: hidden`이 걸려 있으면 잘릴 수 있습니다.
- `IconButton`은 `aria-label`을 필수 prop으로 강제합니다.
- `Button`이 loading 상태일 때 자동으로 `aria-busy` 및 `disabled`가 설정됩니다.

## 기여

이 패키지는 [bubbly-lab/bubbly-design-system](https://github.com/bubbly-lab/bubbly-design-system) 모노레포의 일부입니다. 개발 규약은 루트 [`AGENTS.md`](https://github.com/bubbly-lab/bubbly-design-system/blob/main/AGENTS.md)를 참고하세요.

## 라이선스

MIT
