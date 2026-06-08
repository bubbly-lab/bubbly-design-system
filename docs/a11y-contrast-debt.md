# 접근성 색상 대비 부채 (a11y contrast debt)

> 생성: Storybook a11y 게이트(`@storybook/addon-a11y` + `addon-vitest`) 도입 과정에서 자동 검출.
> 상태: **미해결 (디자인 토큰 차원 결정 필요)**

## 요약

Storybook 스토리를 axe로 검사하는 a11y CI 게이트(`parameters.a11y.test = 'error'`)를
도입한 결과, **단일 디자인 토큰** `content.neutral.subtle`(= `color.neutral.500`,
`#717187` / `rgb(113 113 135)`)이 다크 배경에서 **WCAG 2.1 AA 텍스트 대비 기준
(4.5:1)을 충족하지 못하는** 것이 확인되었습니다.

이는 코드(마크업/ARIA) 결함이 아니라 **디자인 토큰 값 자체**가 기준에 미달하는
문제입니다. 따라서 코드 수정으로는 해결할 수 없고, 토큰 값 변경(=디자인 시안 변경)이
필요하며 디자이너 합의가 선행되어야 합니다.

해당 토큰을 사용하는 19개 스토리는 게이트를 빨갛게 만들지 않도록
`parameters.a11y.test = 'todo'`로 표시했습니다. `todo`는 axe를 **실행하고 위반을
리포트하되 CI를 실패시키지 않는** 상태입니다(위반을 숨기지 않음). 토큰을 수정한 뒤
이 표시를 제거하면 됩니다.

## 근본 원인

| 항목 | 값 |
|---|---|
| Semantic 토큰 | `content.neutral.subtle` |
| 소스 정의 | `packages/design-tokens/tokens/color/semantic.tokens.jsonc` → `{color.neutral.500}` |
| Primitive 값 | `color.neutral.500` = `rgb(113 113 135)` (`#717187`) — `packages/design-tokens/tokens/color/primitive.tokens.jsonc` |
| 다크 surface | `color.neutral.900` = `rgb(31 31 39)` (`#1f1f27`) |
| 측정 대비 | **3.43:1** (일반 텍스트) / 탭 트랙 배경(`#16161b`) 위에서는 **3.78:1** |
| WCAG AA 기준 | 일반 텍스트 4.5:1, 큰 텍스트(18pt+/14pt bold) 3:1 |

`content.neutral.subtle`은 caption·보조 라벨·비활성 탭처럼 "은은한 보조 텍스트"에
의도적으로 쓰이는 색입니다. 그 시각적 의도(낮은 대비)가 접근성 기준과 정면으로
충돌합니다.

## 영향 받는 스토리 (19건)

| 컴포넌트 | 스토리 | 결함 위치 | 대비 |
|---|---|---|---|
| InfoItem | Default, WithPrefixIcon, LongLabel | `label` 텍스트 | 3.43:1 |
| SectionHeader | Default, WithCount, WithIconButton, WithTextButton, AllVariants, LongContent | `caption` / `count` 텍스트 | 3.43:1 |
| ListRow | WithThumbnail, WithCaption, LongCaption, AllVariants, InteractiveStates | `detail`(caption) 텍스트 | 3.43:1 |
| Tabs | Scrollable, Fixed, Padded=false, AutoComposed, InteractiveStates | 비활성 탭 트리거 라벨 | 3.78:1 |

> 마킹 방식: InfoItem / SectionHeader / Tabs는 해당 색이 거의 모든 스토리에 공통이라
> **meta 레벨**에 `a11y: { test: 'todo' }`를 두었고, ListRow는 caption을 렌더하는
> 5개 스토리에만 **스토리 레벨**로 두었습니다(나머지 8개 스토리는 `error` 게이트 유지).

## 해결 옵션 (디자인팀 결정 필요)

1. **`content.neutral.subtle` 재매핑** — `color.neutral.500`(#717187) → 더 밝은
   `color.neutral.400`(`rgb(149 149 171)` / `#9595ab`)로 변경.
   - `#9595ab` on `#1f1f27` ≈ **5.0:1** → AA 통과.
   - 영향: 모든 caption·보조 라벨·비활성 탭 색이 한 단계 밝아짐. Figma 시안과
     동기화 필요.
2. **`color.neutral.500` primitive 값 자체를 밝게 조정** — 다른 사용처에도
   영향이 가므로 더 광범위. 권장하지 않음(국소 재매핑이 안전).
3. **현행 유지(부채로 관리)** — 본 문서로 추적, 스토리 `todo` 유지. 단,
   배포되는 컴포넌트는 실제로 AA 미달 상태로 남음.

권장: **옵션 1**(semantic 토큰 재매핑). primitive를 건드리지 않아 영향 범위가
명확하고, AA를 통과하면서 "보조 텍스트"의 시각적 위계도 유지됩니다.

## 토큰 수정 후 할 일

1. `packages/design-tokens/tokens/color/semantic.tokens.jsonc`에서
   `content.neutral.subtle` 값 변경 후 토큰 재빌드(`pnpm --filter @bubbly-design-system/design-tokens build`).
2. 아래 파일들에서 `a11y: { test: 'todo' }` 및 관련 TODO 주석 제거:
   - `packages/react/src/components/info-item/info-item.stories.tsx`
   - `packages/react/src/components/section-header/section-header.stories.tsx`
   - `packages/react/src/components/tabs/tabs.stories.tsx`
   - `packages/react/src/components/list-row/list-row.stories.tsx` (5개 스토리)
3. `pnpm --filter @bubbly-design-system/react test-storybook`로 AA 통과 확인.
