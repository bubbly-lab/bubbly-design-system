---
'@bubbly-design-system/react': patch
---

디자인 검수 후속 — Autocomplete/LoadingIndicator 시안 정합

- **Autocomplete**: loading/empty state를 Figma 시안과 정합. loading 인디케이터를 40px·회색(`content.neutral.default`)으로 조정.
- **LoadingIndicator**: `size` prop 제거 → Panda `width`/`height` style prop을 직접 노출. 숫자 토큰 키(예: `width="40"`)가 dimension 토큰으로 해석됩니다. (`size`를 전달하던 코드는 `width`/`height`로 변경해야 합니다.)
- **Button**: 로딩 인디케이터 크기 지정을 `width`/`height="var(--button-icon-size)"`로 통일.
