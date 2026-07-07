---
'@bubbly-design-system/react': minor
---

CardHeader/SectionHeader에 loading 상태 추가

두 컴포넌트에 `loading` prop을 추가했습니다. true일 때 텍스트 슬롯을 Skeleton 바로 대체하고 root에 `aria-busy`를 설정합니다.

- **CardHeader**: `captionPosition`·`hasBottom`에 따라 스켈레톤 바 개수와 너비가 조정됩니다.
- **SectionHeader**: `size`에 따라 스켈레톤 바 높이와 간격이 조정되며, 반응형 `size`도 지원합니다. `showCaption=false`면 title 바만 렌더링합니다.
