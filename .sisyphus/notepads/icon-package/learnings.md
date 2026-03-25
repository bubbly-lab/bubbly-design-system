# Learnings — icon-package

## [2026-03-25] Session Start

### Project Structure
- Monorepo: pnpm + Turborepo
- Existing packages: `packages/design-tokens/`, `packages/react/`
- No `packages/icons/` yet — needs to be created

### Key Patterns from react package
- `packages/react/package.json`: exports with `import`/`require` dual format, `sideEffects: ["*.css"]`
- `packages/react/tsdown.config.ts`: `format: ['esm', 'cjs']`, `fixedExtension: true`, `dts: true`, `treeshake: true`, `deps.neverBundle: ['react', 'react-dom', ...]`
- `packages/react/tsconfig.json`: target ESNext, module ESNext, moduleResolution bundler, jsx react-jsx, strict true

### Figma Info
- FIGMA_PAT: Available in root `.env` — VALIDATED (email: ggamjjik2@mju.ac.kr)
- fileKey: `REDACTED`
- nodeId: `1066:7964` (icon page)

### Build Tool
- tsdown (same as react package)
- turbo.json has `build` task with `dependsOn: ["^build"]`

### Icons Package Requirements
- `sideEffects: false` (NOT `["*.css"]` like react — icons have no CSS)
- peerDependencies: `react >= 18.0.0` only
- No runtime dependencies (no Panda CSS, Ark UI, design-tokens)
- `isolatedDeclarations: true` in tsconfig (for oxc-transform fast dts)

## [2026-03-25] Task 2: ARCHITECTURE.md + README.md Updated
- Removed "Figma 자동화 파이프라인 구축" row from "의도적으로 하지 않는 것" table
- Updated "Figma 동기화" section with icon pipeline description (Figma REST API + SVGO + React generation)
- Updated "패키지 구조" section with icons package (scripts/, src/icons/, dist/)
- Updated README.md package table with icons row
- All QA checks passed:
  - grep -c "Figma 자동화 파이프라인 구축" ARCHITECTURE.md → 0 ✓
  - grep -c "icons/" ARCHITECTURE.md → 2 ✓
  - grep -c "icons" README.md → 1 ✓

## [2026-03-25] Task 1: Package Scaffold Created

### Completed Actions
- ✓ Created `packages/icons/` directory structure with src/ subdirectory
- ✓ Created `packages/icons/package.json` with dual ESM/CJS exports
- ✓ Created `packages/icons/tsconfig.json` with isolatedDeclarations: true
- ✓ Created `packages/icons/src/types.ts` with IconProps interface
- ✓ Created `packages/icons/.gitignore` (dist/, node_modules/)
- ✓ Created root `.env.example` with FIGMA_PAT entry
- ✓ Verified pnpm install succeeds and workspace recognizes package

### Package Configuration
- **Name**: @bubbly-design-system/icons
- **Type**: module (ESM)
- **Exports**: Dual format (ESM + CJS) with type definitions
  - import: ./dist/index.d.mts, ./dist/index.mjs
  - require: ./dist/index.d.cts, ./dist/index.cjs
- **sideEffects**: false (no CSS or side effects)
- **peerDependencies**: react >= 18.0.0 only

### DevDependencies Versions
- svgo: ^4.0.1 (SVG optimization)
- tsx: ^4.21.0 (TypeScript execution)
- tsdown: ^0.21.4 (Build tool)
- vitest: ^4.1.1 (Testing framework)
- typescript: ^5.8.3
- @types/react: ^19.2.14

### QA Results
- ✓ Package name: @bubbly-design-system/icons
- ✓ sideEffects: false
- ✓ IconProps interface correctly defined
- ✓ No runtime dependencies
- ✓ pnpm install succeeds, workspace recognizes package
- ✓ All 4 workspace projects resolved

### Notes
- FIGMA_PAT already in .env, added to .env.example for documentation
- Workspace correctly recognizes new package after pnpm install
- Ready for Task 2: Figma API integration script

## [2026-03-25] Task 3: Figma SVG Extraction Complete
- 39 icons total in Figma (COMPONENT_SET nodes)
- Variant format: fill=false (outline), fill=true (filled)
- Some icons have only one variant (e.g., star, search, close)
- icon-manifest.json maps iconName -> { outline: nodeId, filled: nodeId }
- SVG saved to packages/icons/svg/{iconName}/{variant}.svg
- Script: packages/icons/scripts/fetch-figma.ts
- Run with: node --import tsx/esm packages/icons/scripts/fetch-figma.ts
- FIGMA_PAT read from root .env (../../.env relative to scripts/)

## [2026-03-25] Task 4: SVGO v4 Optimization Complete
- Script: packages/icons/scripts/optimize-svgs.ts
- SVGO config: preset-default (removeViewBox:false, convertPathData:false) + removeDimensions + convertColors(currentColor:true)
- Result: width/height removed, viewBox preserved, currentColor applied
- fill="none" correctly preserved by convertColors plugin
- Run with: npx tsx scripts/optimize-svgs.ts (from packages/icons/)

## [2026-03-25] Task 6: Build Config Complete
- ✓ Created `packages/icons/tsdown.config.ts`
- Config: entry src/index.ts, format esm+cjs, fixedExtension true, dts true, treeshake true
- neverBundle: ['react', 'react/jsx-runtime'] (no react-dom or @ark-ui needed for icons)
- package.json exports already correct: .mjs/.cjs/.d.mts/.d.cts paths match tsdown output
- tsconfig.json already has isolatedDeclarations: true (from Task 1)
- Evidence saved to .sisyphus/evidence/task-6-build-config.txt

## [2026-03-25] Task 7: Full Pipeline + Build Complete
- Orchestrator: packages/icons/scripts/generate.ts
- Run: pnpm --filter @bubbly-design-system/icons generate
- Build: pnpm --filter @bubbly-design-system/icons build
- dist/ contains: index.mjs, index.cjs, index.d.mts, index.d.cts
- Pipeline is idempotent

## [2026-03-25] Task 9: Package Finalization Complete
- ✓ src/index.ts: 39 named exports (IconArrowDown through IconWarningCircle) + IconProps type, no default export
- ✓ package.json: sideEffects: false confirmed
- ✓ turbo.json: generate task added with cache: false (external Figma source)
- ✓ Root pnpm build: SUCCESS (all 3 packages built)
- ✓ dist/ verified: 4 files (index.mjs, index.cjs, index.d.mts, index.d.cts)
- Evidence saved to .sisyphus/evidence/task-9-*.txt

## [2026-03-25] Task 8: Vitest Tests Complete
- ✓ vitest.config.ts: minimal config, node environment
- ✓ optimize-svgs.test.ts: 6 tests covering SVGO config behavior
  - Tests: width/height removal, viewBox preservation, color conversion, fill="none" handling, multiple paths, namespace removal
- ✓ generate-components.test.ts: 19 tests covering pure transformation functions
  - toComponentName: 3 tests (single word, camelCase, capitals)
  - extractSvgContent: 4 tests (extraction, multiple elements, whitespace trim, invalid SVG)
  - svgToJsx: 8 tests (attribute conversion, xmlns removal, xlink/xml handling, multiple attributes, value preservation)
  - component naming: 1 test (valid React names)
- ✓ All 25 tests pass: `pnpm --filter @bubbly-design-system/icons test`
- Evidence saved to .sisyphus/evidence/task-8-*.txt

- 2026-03-25 F1 audit: @bubbly-design-system/icons meets plan checklist; evidence saved to .sisyphus/evidence/f1-compliance.txt and .sisyphus/evidence/f1-must-not-have.txt.

## [2026-03-25] F4 Scope Fidelity Audit
- Scope diff vs main is empty (`git diff --name-only main...HEAD` => 0 files), so there are no unaccounted changes.
- Cross-package contamination checks are clean:
  - `git diff main...HEAD -- packages/react/ | wc -l` => 0
  - `git diff main...HEAD -- packages/design-tokens/ | wc -l` => 0
- Task deliverables for icons package are present and detectable (package scaffold, scripts, svg sources, generated components, build config, tests, turbo generate task).
- Evidence files created:
  - `.sisyphus/evidence/f4-scope-check.txt`
  - `.sisyphus/evidence/f4-no-contamination.txt`

## [2026-03-25] F3 Manual QA
- Clean generate/build pipeline passes end-to-end from a wiped `dist/`, `src/icons/`, and `svg/` state.
- Clean run regenerates 39 TSX icons from 48 fetched Figma variants and produces 4 dist files.
- Idempotency check passes: rerunning generate + build after a successful run does not fail.
- Root `pnpm build` succeeds across all packages, though `@bubbly-design-system/react` still emits many non-fatal bundling warnings.
- Conditional `filled ? ... : ...` rendering exists only on icons that have both outline and filled Figma variants (9 generated components in this run).
