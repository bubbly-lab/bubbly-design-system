# Decisions — icon-package

## [2026-03-25] Session Start

### Architecture Decisions (from plan)
- React components only (no raw SVG export)
- `filled` prop (boolean) for outline/filled variant toggle
- `size` prop defaults to `1em`
- `currentColor` for color inheritance
- Figma REST API for extraction (not MCP — to avoid call limits)
- tsdown build (ESM + CJS + dts)
- Vitest for build script tests only
- No IconProvider/Context
- No CSS output
- No Storybook
- Generated components committed to git

### Component Template Pattern
- `'use client'` directive
- `forwardRef<SVGSVGElement, IconProps>`
- `aria-hidden={hasA11y ? undefined : true}` + `role={hasA11y ? 'img' : undefined}`
- `displayName` explicitly set
- `filled ? <filled paths> : <outline paths>` conditional rendering
