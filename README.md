# Bubbly Design System

버블리랩의 프로덕트를 위한 디자인 시스템입니다.

## 패키지 구조

| 패키지 | 설명 |
|---|---|
| [`design-tokens`](./packages/design-tokens) | DTCG JSON 디자인 토큰 정의 + 빌드 |
| [`react`](./packages/react) | Panda CSS + Ark UI 기반 React 컴포넌트 (준비 중) |

## 시작하기

Node.js 24 이상과 pnpm이 필요합니다.

```bash
corepack enable    # pnpm 자동 설치 (Node.js 내장)
pnpm install
pnpm build        # design-tokens 빌드 → react 패키지 빌드
```

Storybook으로 컴포넌트를 확인하려면:

```bash
pnpm storybook    # http://localhost:6006
```

## 문서

- [Architecture](./ARCHITECTURE.md) — 기술 스택, 아키텍처 결정사항
- [Roadmap](./ROADMAP.md) — 작업 로드맵
