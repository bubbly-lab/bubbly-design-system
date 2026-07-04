# @bubbly-design-system/react

## 0.2.1

### Patch Changes

- d33a27a: 디자인 검수 후속 — Autocomplete/LoadingIndicator 시안 정합

  - **Autocomplete**: loading/empty state를 Figma 시안과 정합. loading 인디케이터를 40px·회색(`content.neutral.default`)으로 조정.
  - **LoadingIndicator**: `size` prop 제거 → Panda `width`/`height` style prop을 직접 노출. 숫자 토큰 키(예: `width="40"`)가 dimension 토큰으로 해석됩니다. (`size`를 전달하던 코드는 `width`/`height`로 변경해야 합니다.)
  - **Button**: 로딩 인디케이터 크기 지정을 `width`/`height="var(--button-icon-size)"`로 통일.

## 0.2.0

### Minor Changes

- f4a10e8: 디자이너 검수 라운드 — Figma 시안 정합성 및 컴포넌트 동작 정리

  - **Button**: 로딩 인디케이터를 `LoadingIndicator` 컴포넌트로 통일(Figma fill path 정합, 기존보다 얇은 스피너).
  - **Thumbnail**: hover zoom을 고정 비율 scale → 컨테이너 크기 무관 8px overscan 모델로 변경(작은 썸네일도 시안대로 확대). Dimmed 오버레이가 둥근 모서리 밖으로 새던 문제 해소.
  - **CardHeader**: title·caption을 2줄까지 표시 후 말줄임(Figma `maxLines=2` 정합).
  - **Result**: action 버튼에 `color=brand`/`type=weak`/`size=medium` 기본값 주입(consumer 명시 props는 존중).
  - **SearchField**: Figma에 없는 `disabled` 상태를 타입(`SearchFieldProps`)에서 제거. (`disabled`를 전달하던 코드는 타입 에러가 발생할 수 있습니다.)
