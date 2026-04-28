# Bubbly Design System — Agent Guidelines

## Overview

Monorepo with 3 packages: `design-tokens`, `icons`, `react`. Uses pnpm workspaces, Turborepo, Biome, TypeScript strict mode.

- **Node**: >=24 (see `.node-version`)
- **Package manager**: pnpm 10.22.0
- **Linter/Formatter**: Biome (extends `@bubbly-lab/biome-config/base.json`)
- **Build**: tsdown (icons, react), style-dictionary (design-tokens)
- **Test**: Vitest (icons)
- **Storybook**: v10, react-vite (icons on port 6007, react on port 6006)

## Package-Specific Rules

Each package may have its own `AGENTS.md` with rules scoped to that directory. **Always check for and follow these before making changes.**

| Package | Path | Key Rule |
|---------|------|----------|
| `@bubbly-design-system/icons` | [`packages/icons/AGENTS.md`](packages/icons/AGENTS.md) | Most files are auto-generated — do not edit directly |
| `@bubbly-design-system/react` | [`packages/react/AGENTS.md`](packages/react/AGENTS.md) | Stateful Storybook stories: split between `useArgs` (simple controlled props) and named component + `useState` (complex flows) |

## Commands

### Root (runs across all packages via Turborepo)

```bash
pnpm build                # Build all packages
pnpm check-types          # TypeScript type-check all packages
pnpm storybook:react      # Storybook for react package (port 6006)
pnpm storybook:icons      # Storybook for icons package (port 6007)
```

### Per-package

```bash
# Build
pnpm --filter @bubbly-design-system/icons build
pnpm --filter @bubbly-design-system/react build
pnpm --filter @bubbly-design-system/design-tokens build

# Type-check
pnpm --filter @bubbly-design-system/icons check-types

# Test — all tests in a package
pnpm --filter @bubbly-design-system/icons test

# Test — single file
pnpm --filter @bubbly-design-system/icons test -- generate-stories
pnpm --filter @bubbly-design-system/icons test -- generate-components

# Lint/Format (Biome, from root)
pnpm exec biome check .                          # check only
pnpm exec biome check --write .                  # auto-fix
pnpm exec biome check packages/icons/scripts/    # specific directory
```

### Icons pipeline

```bash
# Full pipeline (requires .env with FIGMA_PAT and FIGMA_FILE_KEY)
pnpm --filter @bubbly-design-system/icons generate

# Individual steps (from packages/icons/)
npx tsx scripts/optimize-svgs.ts        # SVGO optimization
npx tsx scripts/generate-components.ts  # SVG → React components
npx tsx scripts/generate-exports.ts     # barrel index.ts
npx tsx scripts/generate-stories.ts     # Storybook stories
```

## Code Style

### Formatting (enforced by Biome)

- **Indent**: 2 spaces
- **Quotes**: single quotes (`'`)
- **Semicolons**: always
- **Trailing commas**: all (including function parameters)
- **Line width**: 80
- **Arrow parens**: as needed (`x => x`, but `(x, y) => x + y`)

### Imports

- Use `type` keyword for type-only imports: `import type { Foo } from './foo'`
- Group: external packages first, then internal (Biome organizes automatically)
- Destructure from `react` directly: `import { forwardRef, type ReactNode } from 'react'`
- For namespace type imports: `import type * as React from 'react'`

### TypeScript

- **Strict mode** is enabled globally — do not weaken it
- **`isolatedDeclarations`** is enabled — all exports must have explicit type annotations
- Never use `@ts-ignore`, `@ts-expect-error`, or `as any` to suppress errors
- Prefer `interface` for object shapes, `type` for unions/intersections/mapped types
- Use `type` keyword in exports when applicable: `export type { ButtonProps }`

### Naming

- **Components**: PascalCase (`Button`, `IconHome`)
- **Files**: kebab-case for utilities (`generate-components.ts`), PascalCase for components matching export name (`IconHome.tsx`)
- **Props types**: `{ComponentName}Props` (`ButtonProps`, `IconProps`)
- **Constants**: UPPER_SNAKE_CASE for module-level constants (`FIGMA_API`, `BATCH_SIZE`)
- **Booleans**: use `is`/`has`/`should` prefix or adjective form (`filled`, `loading`, `disabled`)

### React Patterns

- All components use `'use client'` directive at the top
- Use named function expressions with `forwardRef`:
  ```tsx
  export const Foo = forwardRef<HTMLDivElement, FooProps>(
    function Foo({ ... }, ref) { ... }
  );
  ```
- Prefer `void` for intentionally unused destructured props: `void color;`
- Accessibility: default `aria-hidden={true}` for decorative elements, `role="img"` when `title`/`aria-label` present

### Component Composition Patterns

Figma에서 여러 서브컴포넌트를 조합하는 구조(예: Card = Thumbnail + CardHeader)를 코드로 구현할 때:

- **기본 선택: Composition 패턴** — 컨테이너 컴포넌트가 `children`을 받아 consumer가 직접 서브컴포넌트를 조합
  ```tsx
  <VerticalCard>
    <Thumbnail src="..." ratio="3:4" zoom />
    <CardHeader title="..." caption="..." />
  </VerticalCard>
  ```
- Props passthrough(컨테이너가 서브컴포넌트 props를 받아 내부에서 렌더링)는 composition으로 해결이 어렵거나, 컴포넌트 간 암묵적 연결이 반드시 필요할 때만 사용
- 컨테이너가 hover 등으로 자식 동작에 영향을 줘야 하면, Panda CSS `group` 클래스 + `_groupHover` 조건 활용

### Error Handling

- Scripts use `main().catch(error => { console.error(...); process.exit(1); })` pattern
- No empty catch blocks — always handle or rethrow
- Validate inputs early with clear error messages: `if (!value) throw new Error('X is required')`

### Test Patterns

- Framework: Vitest with `{ globals: true, environment: 'node' }`
- Import explicitly: `import { describe, expect, it } from 'vitest'`
- Pure functions are copied into test files (not imported from scripts) — this is intentional
- Naming: `describe('script-name: functionName', () => { ... })`
- Test real behavior, not implementation details

## Things to Never Do

- Edit auto-generated files in `packages/icons/src/icons/`, `src/stories/`, or `src/index.ts` directly
- Add runtime dependencies where devDependencies suffice (Storybook, test libs, build tools)
- Commit `.env` or secrets — use `.env.example` as reference
- Commit `.sisyphus/` contents (runtime state, gitignored)
- Use `console.log` in production component code (OK in build scripts)
- Suppress TypeScript errors with `as any`, `@ts-ignore`, or `@ts-expect-error`
