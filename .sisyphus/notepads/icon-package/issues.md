# Issues — icon-package

## [2026-03-25] Session Start

No issues yet.

## [2026-03-25] Task 4: tsx Resolution Scope
- `npx tsx packages/icons/scripts/optimize-svgs.ts` from repo root does not resolve because `tsx` is only available in `packages/icons/`.
- Verified working invocation: `cd packages/icons && npx tsx scripts/optimize-svgs.ts`.

## [2026-03-25] F3 Manual QA
- The prescribed filled-prop smoke test inspects `files[0]` from `packages/icons/src/icons/`.
- On this run, `files[0]` is `IconArrowDown.tsx`, an outline-only icon, so the exact script reports `conditional render: MISSING` even though dual-variant icons do render conditionally.
- Root `pnpm build` succeeds but emits a large warning set from `@bubbly-design-system/react` and transitive type bundles.
