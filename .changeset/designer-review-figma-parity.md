---
'@bubbly-design-system/react': minor
---

디자이너 검수 라운드 — Figma 시안 정합성 및 컴포넌트 동작 정리

- **Button**: 로딩 인디케이터를 `LoadingIndicator` 컴포넌트로 통일(Figma fill path 정합, 기존보다 얇은 스피너).
- **Thumbnail**: hover zoom을 고정 비율 scale → 컨테이너 크기 무관 8px overscan 모델로 변경(작은 썸네일도 시안대로 확대). Dimmed 오버레이가 둥근 모서리 밖으로 새던 문제 해소.
- **CardHeader**: title·caption을 2줄까지 표시 후 말줄임(Figma `maxLines=2` 정합).
- **Result**: action 버튼에 `color=brand`/`type=weak`/`size=medium` 기본값 주입(consumer 명시 props는 존중).
- **SearchField**: Figma에 없는 `disabled` 상태를 타입(`SearchFieldProps`)에서 제거. (`disabled`를 전달하던 코드는 타입 에러가 발생할 수 있습니다.)
