# 접근성 색상 대비 부채 (a11y contrast debt)

> 생성: Storybook a11y 게이트(`@storybook/addon-a11y` + `addon-vitest`) 도입 과정에서 자동 검출.
> 상태: **해결됨 (2026-06-18)** — 디자이너가 `color.neutral.500`을 `#717187`→`#85859b`로 조정해 AA 통과. 아래 본문은 이력 기록.

## 추적 중인 부채

1. ~~**`content.neutral.subtle` 보조 텍스트** (다크 배경, 3.43:1)~~ → **✅ 해결됨 (2026-06-18)**: neutral.500을 #85859b로 조정해 AA 통과, 19개 스토리 `todo` 해제. 아래 §요약 ~ §"토큰 수정 후 할 일"은 이력 기록.
2. **Solid 버튼의 흰 텍스트** (브랜드·크리티컬 CTA) — 문서 하단 §"부채 2". 마크업 형태 때문에 현재 게이트엔 **잡히지 않는 잠재 부채**. **이번 릴리스 제외(후속 처리), 권장 수정안 기록됨.**

> 아래 §요약 ~ §"토큰 수정 후 할 일"은 **부채 1** 기준 서술입니다.

## 요약

Storybook 스토리를 axe로 검사하는 a11y CI 게이트(`parameters.a11y.test = 'error'`)를
도입한 결과, **단일 디자인 토큰** `content.neutral.subtle`(= `color.neutral.500`,
`#717187` / `rgb(113 113 135)`)이 다크 배경에서 **WCAG 2.1 AA 텍스트 대비 기준
(4.5:1)을 충족하지 못하는** 것이 확인되었습니다.

이는 코드(마크업/ARIA) 결함이 아니라 **디자인 토큰 값 자체**가 기준에 미달하는
문제입니다. 따라서 코드 수정으로는 해결할 수 없고, 토큰 값 변경(=디자인 시안 변경)이
필요하며 디자이너 합의가 선행되어야 합니다.

해당 토큰을 사용하는 19개 스토리는 게이트를 빨갛게 만들지 않도록
`parameters.a11y.test = 'todo'`로 표시했었습니다.

**해결 (2026-06-18)**: 디자이너가 `color.neutral.500`을 `#717187`(rgb 113 113 135)
→ `#85859b`(rgb 133 133 155)로 조정했습니다. `content.neutral.subtle` 대비가
다크 surface(`#1f1f27`)에서 3.44 → **4.54**, 탭/배경(`#16161b`)에서 3.79 → **5.0**으로
AA(4.5:1)를 통과합니다. 코드 primitive를 동기화하고 19개 스토리의 `todo` 표시를 모두
제거했습니다.

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

---

## 부채 2 — Solid 버튼 흰 텍스트 (브랜드·크리티컬 CTA)

> 출처: Figma 시안 정합성 전수조사(#54) 중 발견. 현재 a11y 게이트에는 **검출되지 않는 잠재 부채**.
> 상태: **이번 릴리스 제외 (2026-06, 팀 합의)** — 후속 처리로 미룸. 게이트를 막지 않고 토큰 변경도 없어 배포 영향 없음. 아래 §"권장 수정안"이 정해지면 디자이너가 Figma에 반영 후 코드 토큰을 맞춘다.

`type=solid` 버튼은 흰 텍스트(`static.white` = `#ffffff`)를 브랜드/크리티컬 배경 위에
올리는데, 그 대비가 WCAG 2.1 AA 텍스트 기준에 미달합니다. 버튼 라벨은 16px semibold =
**일반 텍스트 스케일**이라 4.5:1이 요구됩니다.

| 버튼 | 배경 토큰 | 배경 값 | 흰 텍스트 대비 | AA 정상(4.5) | AA 큰텍스트(3.0) |
|---|---|---|---|---|---|
| brand / solid | `surface.brand.default` | `violet.400` `#8566ff` | **3.93:1** | ❌ | ✅ |
| brand / solid (hover) | `surface.brand.default-hover` | `violet.300` `#9989fc` | **2.86:1** | ❌ | ❌ |
| critical / solid | `surface.critical.default` | `red.400` `#ff6363` | **2.91:1** | ❌ | ❌ |

- brand/solid는 일반 텍스트(4.5)엔 미달하나 큰 텍스트(3.0)는 통과 — 경계선.
- **critical/solid는 큰 텍스트 기준(3.0)마저 미달**이고, **hover 시 brand도 3.0 미달**이라
  brand 단독보다 시급합니다.
- IconButton solid는 비텍스트(아이콘) 대비 기준(3:1)이 적용돼 흰 아이콘 on 브랜드는
  통과하지만, critical(2.91)·hover는 동일하게 위험합니다.

### 왜 게이트에 안 잡히나

axe는 텍스트가 `<button>`의 **직접 자식**일 때 이 버튼들의 대비를 플래그하지 않습니다
(현 구현이 그러함). #54에서 라벨을 `<span>`으로 감싸자 axe가 같은 대비(3.93)를 즉시
플래그해 인터랙션/a11y 테스트 12건이 실패했고, 해당 변경을 revert했습니다. 즉
**대비 미달 자체는 실재하지만, 마크업 형태 때문에 게이트가 우연히 통과**하고 있는 상태입니다.

### 해결 옵션 (디자인팀 결정 필요)

1. **solid 버튼 텍스트 색 조정** — 흰색 대신 대비가 충분한 색. 단, 흰 텍스트가
   브랜드 아이덴티티의 핵심이면 부적합할 수 있음.
2. **배경 토큰을 어둡게** — `surface.brand.default`(violet.400) /
   `surface.critical.default`(red.400)를 더 어두운 단계로. 4.5:1을 만족하려면 상당히
   어두워져 브랜드 톤이 크게 바뀜.
3. **현행 유지(부채로 관리)** — 본 문서로 추적. 일차 CTA가 AA 미달로 남음.

권장: 최소한 **critical/solid(2.91)와 hover 상태(2.86)** 부터 디자이너와 재검토.
일차 CTA의 대비라 사용자 영향이 큽니다.

### 권장 수정안 (옵션 2 기준 — 배포 미정, 후속용)

ramp에서 흰 텍스트(`#ffffff`)로 AA 4.5:1을 처음 넘기는 단계는 **violet은 500, red는 600**입니다. 이를 기준으로 한 구체안:

| 토큰 | 현재 | → 제안 | 제안 시 대비 |
|---|---|---|---|
| `surface.brand.default` | violet.400 `#8566ff` (3.93) | violet.500 `#6b4ee1` | **5.52** ✅ |
| `surface.brand.default-hover` | violet.300 `#9989fc` (2.86) | violet.600 `#5a3ecb` | **7.03** ✅ |
| `surface.critical.default` | red.400 `#ff6363` (2.91) | red.600 `#e51d1d` | **4.64** ✅ |
| `surface.critical.default-hover` | red.300 `#ff8f8f` (2.19) | red.700 `#c11414` | **6.22** ✅ |

- 현재 hover가 default보다 **더 밝은** 단계(violet/red 300)라 대비가 가장 낮다. hover는 default보다 한 단계 어둡게 가는 방향이 자연스럽다.
- 위는 "solid 채움" surface에만 해당. subtle(20% 불투명) 계열·아이콘 등은 영향 없음.
- ⚠️ `surface.brand/critical.default`를 통째로 바꾸면 brand 채움이 쓰이는 다른 사용처(태그 등)도 함께 어두워진다. 그게 부담이면 **solid 버튼 전용 surface 토큰을 신설**하는 방안도 있다 — 전역 변경 vs 전용 토큰은 디자이너 결정 사항.

### 참고

- 이 부채는 디자인 토큰(브랜드 색) 값 문제라 코드로는 해결 불가, 시안 변경이 필요합니다.
- 게이트에 강제로 노출하려면 버튼 라벨을 span으로 감싸면 되나, 그러면 위 대비가 CI를
  빨갛게 만들므로 **토큰 수정과 함께** 진행해야 합니다.
