# @bubbly-design-system/icons 패키지 생성

## TL;DR

> **Quick Summary**: Figma에서 SVG 아이콘을 자동 추출하고 React 컴포넌트로 변환하는 `@bubbly-design-system/icons` 패키지를 생성한다. Figma REST API → SVGO 최적화 → React 컴포넌트 생성 스크립트를 구축하고, tsdown으로 빌드한다.
> 
> **Deliverables**:
> - `packages/icons/` — 새 아이콘 패키지 (모노레포 내)
> - Figma → SVG → React 자동화 스크립트 파이프라인
> - `@bubbly-design-system/icons` npm 패키지 (ESM + CJS, tree-shakeable)
> - ARCHITECTURE.md 업데이트 (자동화 파이프라인 규칙 제거)
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 → Task 3 → Task 5 → Task 7 → Task 8 → F1-F4

---

## Context

### Original Request
Figma에서 아이콘을 가져와서 별도 아이콘 패키지로 만들기. 레퍼런스 조사 포함.

### Interview Summary
**Key Discussions**:
- 아이콘 규모: 소규모 (~30개), 향후 확장 가능
- 소비 형태: React 컴포넌트만 (raw SVG 미제공)
- fill 변형: `filled` prop (boolean) — Figma의 fill=false/true와 1:1 대응
- 사이즈: `1em` 기본 + `size` prop (Dimension token 참조에 적합)
- 색상: `currentColor` (부모 컴포넌트에서 color 상속)
- 추출: Figma REST API 스크립트 자동화 (기존 "자동화 안 한다" 규칙 폐기)
- 빌드: tsdown (기존 react 패키지와 동일)
- 테스트: 빌드 스크립트 테스트만
- 패키지명: `@bubbly-design-system/icons`

**Research Findings**:
- Radix Icons: EJS 템플릿, SVGO 최적화, cheerio로 currentColor 주입
- Lucide: IconNode AST, createLucideIcon 팩토리, LucideContext
- Phosphor: Weight Map, CSR/SSR 분리
- montage-web (원티드): **가장 근접한 레퍼런스** — tsdown 빌드, 1em, forwardRef, currentColor
- seed-design (당근): 외부 icon-data 패키지, figma-extractor 도구

### Metis Review
**Identified Gaps** (addressed):
- SVGO v4 사용 (v3 아님) — `preset-default` + overrides 방식 적용
- `displayName` 명시적 설정 필요 — 번들러 안전성
- `isolatedDeclarations: true` — oxc-transform 기반 빠른 dts 생성
- Figma export 시 `svg_simplify_stroke=true` — mask 요소 방지
- Figma variant name 파싱: `"Style=Filled, Size=24"` 형식
- 접근성: `aria-hidden="true"` 기본 + title/aria-label 시 `role="img"` 전환
- Edge cases: fill variant 없는 아이콘, masks/clipPaths, name collision, 빈 SVG, 비-24x24 viewBox

---

## Work Objectives

### Core Objective
Figma 디자인 파일에서 SVG 아이콘을 자동 추출하여, tree-shaking 가능한 React 컴포넌트 패키지(`@bubbly-design-system/icons`)를 생성한다.

### Concrete Deliverables
- `packages/icons/package.json` — 패키지 설정 (ESM + CJS, sideEffects: false)
- `packages/icons/scripts/` — Figma 추출 + SVG 최적화 + React 컴포넌트 생성 스크립트
- `packages/icons/src/icons/` — 생성된 React 아이콘 컴포넌트들 (git committed)
- `packages/icons/src/types.ts` — IconProps 타입 정의
- `packages/icons/src/index.ts` — barrel export
- `packages/icons/tsdown.config.ts` — 빌드 설정
- `packages/icons/tsconfig.json` — TypeScript 설정
- ARCHITECTURE.md — 아이콘 패키지 구조 추가, 자동화 규칙 변경

### Definition of Done
- [ ] `pnpm build` (root)에서 icons 패키지 빌드 성공
- [ ] `dist/` 에 ESM + CJS + 타입 선언 파일 생성됨
- [ ] tree-shaking 동작 확인 (미사용 아이콘 번들에 포함 안 됨)
- [ ] 생성된 아이콘 컴포넌트가 Figma의 아이콘과 1:1 대응
- [ ] `filled` prop으로 outline/filled 전환 가능
- [ ] `size` prop과 `currentColor` 정상 동작

### Must Have
- Figma REST API 기반 SVG 자동 추출 스크립트
- SVGO v4 최적화 (preset-default + removeDimensions + convertColors)
- 각 아이콘별 개별 .tsx 파일 + barrel index.ts
- `forwardRef` + `IconProps` (size, color, filled, title)
- `sideEffects: false` + `"use client"` 디렉티브
- `aria-hidden="true"` 기본, title/aria-label 시 `role="img"` 전환
- tsdown 빌드 (ESM + CJS + dts)
- 빌드 스크립트 테스트 (Vitest)

### Must NOT Have (Guardrails)
- ❌ 런타임 의존성 (react, react-dom 외에 없어야 함 — Panda CSS, Ark UI 등 금지)
- ❌ CSS 출력 (아이콘은 순수 SVG, 스타일시트 불필요)
- ❌ design-tokens 패키지 의존성 (아이콘은 독립적이어야 함)
- ❌ Storybook 설정 (v1 스코프 아님 — 추후 별도 추가)
- ❌ IconProvider/Context (소규모에서 불필요, 추후 확장 가능)
- ❌ 아이콘 갤러리 페이지
- ❌ 애니메이션 아이콘
- ❌ CLI 도구 (단순 스크립트로 충분)
- ❌ 카테고리별 그룹핑/서브패스 export
- ❌ 커스텀 SVGO 플러그인 (내장 플러그인만 사용)
- ❌ AI slop: 과도한 JSDoc, 불필요한 추상화, 제네릭 유틸리티 클래스

---

## Preflight Requirements (MANDATORY — before execution begins)

> 실행 전 반드시 확보해야 하는 외부 입력. 오케스트레이터는 Wave 1 시작 전에 이 목록을 확인한다.

- **`FIGMA_PAT`**: Figma Personal Access Token
  - 위치: **루트 `.env`** 파일에 `FIGMA_PAT=<token>` 형태로 저장 (figma-mcp-bridge 스킬과 동일 위치)
  - 확보 방법: 사용자에게 요청 → Figma Settings > Personal Access Tokens에서 생성
  - 검증: `source .env && curl -s -H "X-Figma-Token: $FIGMA_PAT" "https://api.figma.com/v1/me" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.email ? 'VALID' : 'INVALID')"`
  - **이 토큰 없이는 Task 3, 7의 Figma API 호출이 불가능하므로 실행을 시작하지 않는다.**

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.
> Preflight Requirements가 충족된 후에만 실행을 시작한다.

### Test Decision
- **Infrastructure exists**: NO (icons 패키지는 새로 생성)
- **Automated tests**: Tests-after (빌드 스크립트 테스트만)
- **Framework**: Vitest (ARCHITECTURE.md 기술 스택에 명시)
- **Scope**: 빌드 파이프라인 정상 동작 검증

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Build pipeline**: Use Bash — 스크립트 실행, 파일 생성 확인, 출력 검증
- **React components**: Use Bash (node REPL) — import, 렌더링, prop 확인
- **Package exports**: Use Bash — tsc check, import resolution 검증

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — 기반 설정):
├── Task 1: 패키지 스캐폴딩 + 설정 파일 [quick]
├── Task 2: ARCHITECTURE.md 업데이트 [quick]
└── Task 3: Figma 아이콘 구조 탐색 + SVG 추출 스크립트 [deep]

Wave 2 (After Wave 1 — 핵심 파이프라인):
├── Task 4: SVG 최적화 스크립트 (SVGO v4) [unspecified-high]
├── Task 5: React 컴포넌트 생성 스크립트 [deep]
└── Task 6: 빌드 설정 (tsdown + tsconfig) [quick]

Wave 3 (After Wave 2 — 통합 실행):
└── Task 7: 전체 파이프라인 실행 + 아이콘 생성 [unspecified-high]

Wave 4 (After Wave 3 — 테스트 + 마무리):
├── Task 8: 빌드 스크립트 테스트 (Vitest) [quick]
└── Task 9: barrel export + 패키지 마무리 [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

### Critical Path
Task 1 → Task 3 → Task 5 → Task 7 → Task 8 → F1-F4 → user okay

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1 | — | 3, 4, 5, 6 |
| 2 | — | — |
| 3 | 1 | 5, 7 |
| 4 | 1 | 7 |
| 5 | 1, 3 | 7 |
| 6 | 1 | 7 |
| 7 | 4, 5, 6 | 8, 9 |
| 8 | 7 | F1-F4 |
| 9 | 7 | F1-F4 |
| F1-F4 | 8, 9 | — |

### Agent Dispatch Summary

- **Wave 1**: **3** — T1 → `quick`, T2 → `quick`, T3 → `deep`
- **Wave 2**: **3** — T4 → `unspecified-high`, T5 → `deep`, T6 → `quick`
- **Wave 3**: **1** — T7 → `unspecified-high`
- **Wave 4**: **2** — T8 → `quick`, T9 → `quick`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. 패키지 스캐폴딩 + 설정 파일

  **What to do**:
  - `packages/icons/` 디렉토리 생성
  - `package.json` 작성:
    - name: `@bubbly-design-system/icons`
    - version: `0.0.0`
    - type: `module`
    - exports: ESM + CJS (기존 react 패키지 패턴 따르기)
    - `sideEffects: false` (tree-shaking 필수)
    - peerDependencies: `react >= 18.0.0`
    - devDependencies: `svgo`, `typescript`, `tsdown`, `tsx`, `@types/react`
    - scripts: `build`, `generate` (Figma → React 파이프라인), `test`, `check-types` (`tsc --noEmit`)
  - `.gitignore` 작성: `dist/`, `node_modules/`
  - 루트 `.env.example`에 `FIGMA_PAT=your_figma_personal_access_token` 추가 (이미 없는 경우)
  - `src/types.ts` 작성:
    ```typescript
    import type * as React from 'react';
    
    export interface IconProps extends React.SVGAttributes<SVGElement> {
      children?: never;
      size?: string | number;
      filled?: boolean;
      title?: string;
    }
    ```

  **Must NOT do**:
  - Panda CSS, Ark UI 등 런타임 의존성 추가 금지
  - design-tokens 패키지 의존성 추가 금지
  - Storybook 설정 금지

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 설정 파일만 생성하는 단순 스캐폴딩 작업
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 3, 4, 5, 6
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `packages/react/package.json` — exports 구조, peerDependencies, scripts 패턴을 동일하게 따름 (ESM + CJS dual export, sideEffects 설정)
  - `packages/design-tokens/package.json` — keywords, repository, author 필드 참조

  **External References**:
  - montage-web `packages/wds-icon/package.json` (https://github.com/wanteddev/montage-web) — tsdown 빌드 + sideEffects: false 패턴 참조

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 패키지 스캐폴딩 완성 확인
    Tool: Bash
    Preconditions: packages/icons/ 디렉토리가 없는 상태
    Steps:
      1. ls packages/icons/ — 디렉토리 존재 확인
      2. cat packages/icons/package.json | node -e "const p=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(p.name, p.sideEffects)" — 이름과 sideEffects 확인
      3. cat packages/icons/src/types.ts — IconProps 인터페이스 존재 확인
      4. pnpm install — workspace에서 인식되는지 확인
    Expected Result: package.json에 name="@bubbly-design-system/icons", sideEffects=false, types.ts에 IconProps 인터페이스 존재
    Failure Indicators: pnpm install 실패, sideEffects 누락, types.ts 없음
    Evidence: .sisyphus/evidence/task-1-scaffold.txt

  Scenario: 런타임 의존성 없음 확인
    Tool: Bash
    Preconditions: package.json 작성 완료
    Steps:
      1. node -e "const p=JSON.parse(require('fs').readFileSync('packages/icons/package.json','utf8')); const deps=Object.keys(p.dependencies||{}); console.log(deps.length === 0 ? 'PASS' : 'FAIL: ' + deps.join(','))"
    Expected Result: "PASS" — dependencies 필드가 비어있거나 없음
    Failure Indicators: "FAIL" + 런타임 의존성 목록 출력
    Evidence: .sisyphus/evidence/task-1-no-runtime-deps.txt
  ```

  **Commit**: YES (groups with Task 2)
  - Message: `feat(icons): scaffold icons package and update architecture docs`
  - Files: `packages/icons/package.json`, `packages/icons/tsconfig.json`, `packages/icons/src/types.ts`, `packages/icons/.gitignore`, `.env.example`
  - Pre-commit: `pnpm install`

- [x] 2. ARCHITECTURE.md 업데이트

  **What to do**:
  - "의도적으로 하지 않는 것" 테이블에서 "Figma 자동화 파이프라인 구축 | AI 에이전트가 대체" 행을 **제거**
  - "Figma 동기화" 섹션에 아이콘 파이프라인 설명 추가:
    - 아이콘은 Figma REST API 기반 스크립트로 자동 추출
    - `pnpm --filter @bubbly-design-system/icons generate` 명령으로 실행
    - 생성된 컴포넌트는 git에 커밋 (generated code as committed source)
  - "패키지 구조" 섹션에 icons 패키지 추가:
    ```
    packages/
    ├── design-tokens/
    ├── icons/            ← Figma 아이콘 → React 컴포넌트 (NEW)
    │   ├── scripts/      ← Figma API + SVGO + React 생성
    │   ├── src/icons/    ← 생성된 컴포넌트 (git committed)
    │   └── dist/         ← tsdown 빌드 출력
    └── react/
    ```
  - README.md의 패키지 구조 테이블에 icons 행 추가

  **Must NOT do**:
  - 기존 아키텍처 결정사항 변경 금지 (Figma 자동화 규칙 제거 외)
  - 새로운 아키텍처 결정 추가 금지 (icons 패키지 사실 기술만)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 기존 문서에 소규모 수정/추가만
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: None
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `ARCHITECTURE.md:69-88` — 기존 "패키지 구조" 섹션 형식을 따름
  - `ARCHITECTURE.md:180-184` — "Figma 동기화" 섹션에 아이콘 파이프라인 추가
  - `ARCHITECTURE.md:220-231` — "의도적으로 하지 않는 것" 테이블에서 Figma 자동화 행 제거
  - `README.md:6-10` — 패키지 구조 테이블에 icons 행 추가

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Figma 자동화 규칙 제거 확인
    Tool: Bash (grep)
    Preconditions: ARCHITECTURE.md 수정 완료
    Steps:
      1. grep -c "Figma 자동화 파이프라인 구축" ARCHITECTURE.md
    Expected Result: 0 (해당 행이 완전히 제거됨)
    Failure Indicators: 1 이상 (아직 남아있음)
    Evidence: .sisyphus/evidence/task-2-no-automation-rule.txt

  Scenario: icons 패키지가 문서에 기술됨
    Tool: Bash (grep)
    Preconditions: ARCHITECTURE.md, README.md 수정 완료
    Steps:
      1. grep -c "icons/" ARCHITECTURE.md — 패키지 구조에 icons 존재
      2. grep -c "icons" README.md — README 테이블에 icons 존재
    Expected Result: 각각 1 이상
    Failure Indicators: 0 (문서에 언급 없음)
    Evidence: .sisyphus/evidence/task-2-docs-updated.txt
  ```

  **Commit**: YES (groups with Task 1)
  - Message: `feat(icons): scaffold icons package and update architecture docs`
  - Files: `ARCHITECTURE.md`, `README.md`
  - Pre-commit: N/A

- [x] 3. Figma 아이콘 구조 탐색 + SVG 추출 스크립트

  **What to do**:
  - **Step A: Figma 구조 탐색** (figma-mcp-bridge 또는 REST API 사용):
    - fileKey: `REDACTED`, nodeId: `1066:7964`
    - 아이콘 페이지의 구조 파악: 프레임 계층, 컴포넌트 이름, variant 구조
    - Figma component variant 이름 형식 확인 (예: `"Style=Filled, Size=24"`)
    - 전체 아이콘 목록 + 각 아이콘의 variant 조합 기록
    - 결과를 `packages/icons/scripts/icon-manifest.json`에 저장 (아이콘 이름 → variant 매핑)
  - **Step B: SVG 추출 스크립트** (`packages/icons/scripts/fetch-figma.ts`) 작성:
    - 루트 `.env`에서 `FIGMA_PAT` 읽기 (Preflight에서 확보된 위치)
    - `GET /v1/files/{fileKey}/nodes?ids={nodeId}&depth=3` — 아이콘 페이지 트리 순회
    - COMPONENT 노드 ID 수집 + variant name 파싱 (`"Property=Value"` 형식)
    - `GET /v1/images/{fileKey}?ids={id1,id2,...}&format=svg&svg_simplify_stroke=true&svg_include_id=false` — 단일 배치 호출
    - CDN URL에서 SVG 다운로드 → `packages/icons/svg/{icon-name}/{variant}.svg` 저장
    - 429 에러 시 `Retry-After` 헤더 기반 대기 구현
    - icon-manifest.json 자동 업데이트
  - 스크립트는 `node --import tsx` 또는 `tsx` 로 실행 가능하게 작성

  **Must NOT do**:
  - Figma MCP 호출 한도 낭비 금지 — REST API 우선 사용
  - 한 번에 모든 아이콘 처리 금지 — 배치 처리 (50개 단위)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Figma API 이해 + 구조 탐색 + 스크립트 작성이 복합적으로 필요
  - **Skills**: [`figma-mcp-bridge`]
    - `figma-mcp-bridge`: Figma MCP 도구를 사용하여 아이콘 페이지 구조를 탐색해야 함

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1 — Task 1과 병렬이지만, 스크립트 파일 저장은 Task 1의 디렉토리 생성 후)
  - **Parallel Group**: Wave 1 (with Tasks 1, 2) — 단, 파일 저장은 Task 1 완료 후
  - **Blocks**: Tasks 5, 7
  - **Blocked By**: Task 1 (디렉토리 구조 필요)

  **References**:

  **Pattern References**:
  - Radix Icons `services.ts` (https://github.com/radix-ui/icons) — Figma API 호출 패턴: 파일 트리 순회 → 노드 ID 수집 → 배치 SVG 렌더링
  - montage-web `.github/workflows/figma-icon-sync.yml` (https://github.com/wanteddev/montage-web) — Figma REST API 직접 호출 패턴, 노드 트리 순회

  **API/Type References**:
  - Figma REST API: `GET /v1/files/{key}`, `GET /v1/images/{key}?ids=...&format=svg`
  - Figma rate limit: Tier 1 = 10-20 req/min, `Retry-After` 헤더 처리 필수

  **External References**:
  - `.agents/skills/figma-mcp-bridge/SKILL.md` — Figma MCP 브릿지 사용법, fileKey/nodeId 추출, REST API 대안

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Figma 아이콘 구조 탐색 성공
    Tool: Bash
    Preconditions: 루트 .env에 FIGMA_PAT 설정됨 (Preflight 확인)
    Steps:
      1. cat packages/icons/scripts/icon-manifest.json | node -e "const m=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log('icons:', Object.keys(m).length)"
    Expected Result: "icons: N" (N > 0, Figma 아이콘 수와 일치)
    Failure Indicators: 파일 없음 또는 icons: 0
    Evidence: .sisyphus/evidence/task-3-manifest.txt

  Scenario: SVG 추출 스크립트 실행 + SVG 파일 생성
    Tool: Bash
    Preconditions: 루트 .env에 FIGMA_PAT 설정, icon-manifest.json 존재
    Steps:
      1. node --import tsx packages/icons/scripts/fetch-figma.ts
      2. ls packages/icons/svg/ | head -5 — SVG 디렉토리에 파일 생성 확인
      3. head -3 packages/icons/svg/$(ls packages/icons/svg/ | head -1)/*.svg — SVG 내용 확인
    Expected Result: SVG 파일이 정상적으로 생성되고, 유효한 SVG XML 포함
    Failure Indicators: 스크립트 에러, 빈 디렉토리, 잘못된 SVG
    Evidence: .sisyphus/evidence/task-3-svg-extraction.txt

  Scenario: 429 rate limit 핸들링
    Tool: Bash
    Preconditions: 스크립트에 retry 로직 구현됨
    Steps:
      1. grep -n "Retry-After\|retry\|429" packages/icons/scripts/fetch-figma.ts
    Expected Result: Retry-After 헤더 파싱 + 대기 로직이 코드에 존재
    Failure Indicators: retry 관련 코드 없음
    Evidence: .sisyphus/evidence/task-3-retry-logic.txt
  ```

  **Commit**: YES (groups with Tasks 4, 5, 6)
  - Message: `feat(icons): add Figma extraction and React component generation pipeline`
  - Files: `packages/icons/scripts/fetch-figma.ts`, `packages/icons/scripts/icon-manifest.json`
  - Pre-commit: `tsc --noEmit`

- [x] 4. SVG 최적화 스크립트 (SVGO v4)

  **What to do**:
  - `packages/icons/scripts/optimize-svgs.ts` 작성:
    - `packages/icons/svg/` 디렉토리의 모든 SVG 파일을 읽기
    - SVGO v4 적용:
      ```javascript
      {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false, convertPathData: false } },
          },
          'removeDimensions',  // width/height 제거, viewBox 유지
          {
            name: 'convertColors',
            params: { currentColor: true },  // 모든 색상 → currentColor
          },
        ],
      }
      ```
    - 최적화된 SVG를 같은 위치에 덮어쓰기 (또는 `svg-optimized/` 별도 디렉토리)
    - 최적화 전/후 파일 크기 로깅
  - Edge case 처리:
    - `fill="none"` 보존 (outline 아이콘의 내부 투명 영역)
    - masks/clipPaths가 있는 경우 보존
    - 빈 SVG 파일 감지 → 경고 출력 + 스킵

  **Must NOT do**:
  - 커스텀 SVGO 플러그인 작성 금지 — 내장 플러그인만 사용
  - `convertPathData` 플러그인 사용 금지 — 아이콘 형태가 왜곡될 수 있음

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: SVGO v4 설정 + edge case 처리가 핵심, 중간 복잡도
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 1 (디렉토리 구조)

  **References**:

  **Pattern References**:
  - Radix Icons `services.ts` SVGO 플러그인 리스트 (https://github.com/radix-ui/icons) — 비활성화해야 할 플러그인: `removeViewBox`, `convertPathData`
  - Radix Icons `injectCurrentColor()` — cheerio 기반 fill/stroke 처리, `fill="none"` 보존 패턴

  **External References**:
  - SVGO v4 공식 문서: https://svgo.dev/ — `preset-default` 사용법, `removeDimensions`, `convertColors`
  - Metis 리뷰: SVGO v4에서 `removeViewBox`는 preset-default에서 제거됨 — 하지만 안전을 위해 명시적 override 유지

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: SVG 최적화 성공
    Tool: Bash
    Preconditions: packages/icons/svg/ 에 원본 SVG 파일 존재
    Steps:
      1. node --import tsx packages/icons/scripts/optimize-svgs.ts
      2. head -5 packages/icons/svg/$(ls packages/icons/svg/ | head -1)/*.svg — 최적화된 SVG 확인
    Expected Result: SVG에 width/height 속성 없음, viewBox 존재, currentColor 사용
    Failure Indicators: width/height 잔존, 하드코딩된 색상값 잔존
    Evidence: .sisyphus/evidence/task-4-optimized-svg.txt

  Scenario: fill="none" 보존 확인
    Tool: Bash
    Preconditions: outline 스타일 아이콘이 svg/ 에 존재
    Steps:
      1. grep -r 'fill="none"' packages/icons/svg/ | head -3
    Expected Result: outline 아이콘에 fill="none" 속성이 보존됨
    Failure Indicators: fill="none"이 모두 currentColor로 변환됨
    Evidence: .sisyphus/evidence/task-4-fill-none-preserved.txt
  ```

  **Commit**: YES (groups with Tasks 3, 5, 6)
  - Message: `feat(icons): add Figma extraction and React component generation pipeline`
  - Files: `packages/icons/scripts/optimize-svgs.ts`
  - Pre-commit: `tsc --noEmit`

- [x] 5. React 컴포넌트 생성 스크립트

  **What to do**:
  - `packages/icons/scripts/generate-components.ts` 작성:
    - `icon-manifest.json` 읽기 → 아이콘별 variant 정보 확인
    - 최적화된 SVG 파일 읽기
    - 각 아이콘별 `.tsx` 파일 생성 (`packages/icons/src/icons/{IconName}.tsx`)
    - 컴포넌트 템플릿:
      ```tsx
      'use client';
      
      import { forwardRef } from 'react';
      import type { IconProps } from '../types';
      
      const IconHome = forwardRef<SVGSVGElement, IconProps>(
        function IconHome({ size = '1em', filled = false, color = 'currentColor', title, ...props }, ref) {
          const hasA11y = Boolean(title ?? props['aria-label'] ?? props['aria-labelledby']);
          
          return (
            <svg
              ref={ref}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={size}
              height={size}
              fill="none"
              aria-hidden={hasA11y ? undefined : true}
              role={hasA11y ? 'img' : undefined}
              {...props}
            >
              {title && <title>{title}</title>}
              {filled ? (
                <>{/* filled SVG paths */}</>
              ) : (
                <>{/* outline SVG paths */}</>
              )}
            </svg>
          );
        }
      );
      
      IconHome.displayName = 'IconHome';
      export { IconHome };
      ```
    - SVG 속성 → JSX 변환 (camelCase: `stroke-width` → `strokeWidth`, `fill-rule` → `fillRule`, `clip-path` → `clipPath`)
    - filled variant가 없는 아이콘: `filled` prop 무시 (항상 같은 SVG 렌더링)
    - 아이콘 네이밍: `Icon` prefix + PascalCase (`icon-home` → `IconHome`)
  - `packages/icons/scripts/generate-exports.ts` 작성:
    - `src/icons/` 디렉토리 스캔 → barrel `src/index.ts` 자동 생성
    - 형식: `export { IconHome } from './icons/IconHome';`
    - types re-export: `export type { IconProps } from './types';`

  **Must NOT do**:
  - EJS/Handlebars 등 템플릿 엔진 의존성 추가 금지 — 템플릿 문자열로 충분
  - IconProvider/Context 생성 금지
  - CSS 클래스 또는 스타일 속성 추가 금지

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: SVG → JSX 변환 로직, variant 분기, edge case 처리가 핵심
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6)
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 1 (디렉토리), 3 (manifest + SVG 파일 구조 이해)

  **References**:

  **Pattern References**:
  - Radix Icons `named-icon.tsx.ejs` (https://github.com/radix-ui/icons) — forwardRef + color prop + SVG inline 패턴
  - montage-web `scripts/figma-icon.mjs` (https://github.com/wanteddev/montage-web) — SVG 속성 camelCase 변환 패턴: `.replace(/(stroke|fill|line|clip)-(.)/g, (_, p1, p2) => p1 + p2.toUpperCase())`
  - Radix Icons `services.ts` `readyForJSX()` — props 스프레드, ref 전달 패턴

  **API/Type References**:
  - `packages/icons/src/types.ts:IconProps` — 생성될 컴포넌트가 구현해야 할 인터페이스

  **WHY Each Reference Matters**:
  - Radix의 EJS 템플릿에서 컴포넌트 구조를 참고하되, 템플릿 엔진 대신 문자열 리터럴로 구현
  - montage-web의 SVG → JSX 변환 정규식을 그대로 재사용 가능
  - Phosphor의 `aria-hidden` + `role="img"` 접근성 패턴 적용

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: React 컴포넌트 생성 성공
    Tool: Bash
    Preconditions: 최적화된 SVG 파일 + icon-manifest.json 존재
    Steps:
      1. node --import tsx packages/icons/scripts/generate-components.ts
      2. ls packages/icons/src/icons/ | head -5 — 생성된 .tsx 파일 확인
      3. head -30 packages/icons/src/icons/$(ls packages/icons/src/icons/ | head -1) — 컴포넌트 내용 확인
    Expected Result: 각 아이콘별 .tsx 파일 생성, forwardRef + IconProps 사용, 'use client' 포함
    Failure Indicators: 파일 미생성, JSX 구문 에러, displayName 누락
    Evidence: .sisyphus/evidence/task-5-component-generation.txt

  Scenario: filled prop 분기 확인
    Tool: Bash
    Preconditions: filled variant가 있는 아이콘이 생성됨
    Steps:
      1. grep -l "filled" packages/icons/src/icons/*.tsx | head -1 — filled 분기가 있는 파일 찾기
      2. grep -A3 "filled ?" $(grep -l "filled" packages/icons/src/icons/*.tsx | head -1) — 분기 코드 확인
    Expected Result: `filled ? <filled paths> : <outline paths>` 조건부 렌더링 존재
    Failure Indicators: filled 분기 없음 또는 항상 같은 SVG 렌더링
    Evidence: .sisyphus/evidence/task-5-filled-variant.txt

  Scenario: barrel index.ts 생성 확인
    Tool: Bash
    Preconditions: 아이콘 컴포넌트 생성 완료
    Steps:
      1. node --import tsx packages/icons/scripts/generate-exports.ts
      2. cat packages/icons/src/index.ts | head -10 — export 문 확인
      3. grep -c "export" packages/icons/src/index.ts — export 수 확인
    Expected Result: 모든 아이콘이 named export, IconProps 타입도 re-export
    Failure Indicators: index.ts 없음, export 누락
    Evidence: .sisyphus/evidence/task-5-barrel-export.txt

  Scenario: 접근성 패턴 확인
    Tool: Bash
    Preconditions: 아이콘 컴포넌트 생성됨
    Steps:
      1. grep -c "aria-hidden" packages/icons/src/icons/$(ls packages/icons/src/icons/ | head -1)
      2. grep -c "role" packages/icons/src/icons/$(ls packages/icons/src/icons/ | head -1)
      3. grep -c "title" packages/icons/src/icons/$(ls packages/icons/src/icons/ | head -1)
    Expected Result: 각각 1 이상 — aria-hidden, role, title 패턴 모두 존재
    Failure Indicators: 접근성 관련 코드 없음
    Evidence: .sisyphus/evidence/task-5-a11y.txt
  ```

  **Commit**: YES (groups with Tasks 3, 4, 6)
  - Message: `feat(icons): add Figma extraction and React component generation pipeline`
  - Files: `packages/icons/scripts/generate-components.ts`, `packages/icons/scripts/generate-exports.ts`
  - Pre-commit: `tsc --noEmit`

- [x] 6. 빌드 설정 (tsdown + tsconfig)

  **What to do**:
  - `packages/icons/tsconfig.json` 작성:
    - extends 없음 (독립적 설정)
    - target: ESNext, module: ESNext, moduleResolution: Bundler
    - jsx: react-jsx
    - strict: true
    - `isolatedDeclarations: true` (oxc-transform 기반 빠른 dts 생성)
    - include: `["src"]`
    - outDir: `dist`
  - `packages/icons/tsdown.config.ts` 작성:
    - entry: `src/index.ts`
    - format: `['esm', 'cjs']`
    - dts: true
    - clean: true
    - treeshake: true
    - 기존 react 패키지의 tsdown.config.ts 패턴 참조
  - `package.json`의 exports, main, module, types 필드가 tsdown 출력과 일치하는지 확인

  **Must NOT do**:
  - rollup 별도 설정 추가 금지 — tsdown이 내부적으로 처리
  - preserveModules 같은 고급 설정 금지 — 30개 아이콘에서 불필요

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 기존 react 패키지의 설정을 거의 그대로 복사 + 소수 변경
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5)
  - **Blocks**: Task 7
  - **Blocked By**: Task 1 (package.json 구조)

  **References**:

  **Pattern References**:
  - `packages/react/tsdown.config.ts` — 기존 tsdown 설정을 그대로 참조. entry, format, dts 설정 패턴
  - `packages/react/tsconfig.json` — TypeScript 설정 패턴 참조
  - `packages/react/package.json:19-34` — exports 필드 구조 (ESM + CJS + types)

  **WHY Each Reference Matters**:
  - react 패키지와 동일한 빌드 출력 구조를 유지해야 모노레포 내 일관성 보장
  - tsdown.config.ts의 format, dts, clean 설정을 그대로 따라야 turborepo 캐시가 정상 동작

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: tsdown 빌드 설정 유효성
    Tool: Bash
    Preconditions: tsdown.config.ts, tsconfig.json 작성됨
    Steps:
      1. cat packages/icons/tsdown.config.ts — 설정 확인
      2. cat packages/icons/tsconfig.json — TS 설정 확인
      3. node -e "const p=JSON.parse(require('fs').readFileSync('packages/icons/package.json','utf8')); console.log('exports:', JSON.stringify(p.exports, null, 2))" — exports 구조 확인
    Expected Result: tsdown에 esm+cjs format, tsconfig에 isolatedDeclarations:true, exports에 import/require 경로 존재
    Failure Indicators: 설정 불일치, isolatedDeclarations 누락
    Evidence: .sisyphus/evidence/task-6-build-config.txt
  ```

  **Commit**: YES (groups with Tasks 3, 4, 5)
  - Message: `feat(icons): add Figma extraction and React component generation pipeline`
  - Files: `packages/icons/tsdown.config.ts`, `packages/icons/tsconfig.json`
  - Pre-commit: N/A

- [x] 7. 전체 파이프라인 실행 + 아이콘 생성

  **What to do**:
  - `.env` 파일에 `FIGMA_PAT` 설정 확인 (Preflight에서 이미 확보됨)
  - `packages/icons/scripts/generate.ts` (오케스트레이터 스크립트) 작성:
    - Step 1: `fetch-figma.ts` 실행 → SVG 추출
    - Step 2: `optimize-svgs.ts` 실행 → SVGO 최적화
    - Step 3: `generate-components.ts` 실행 → React 컴포넌트 생성
    - Step 4: `generate-exports.ts` 실행 → barrel index.ts 생성
    - 각 스텝 성공/실패 로깅
    - 멱등성: 재실행 시 기존 생성물을 클린 후 재생성
  - `package.json`의 `generate` 스크립트가 이 파일을 실행하도록 연결
  - **실제 파이프라인 실행**: `pnpm --filter @bubbly-design-system/icons generate`
  - 생성된 아이콘 컴포넌트 결과 검증
  - **빌드 실행**: `pnpm --filter @bubbly-design-system/icons build`
  - `dist/` 출력 확인 (ESM + CJS + dts)

  **Must NOT do**:
  - 생성된 코드 수동 편집 금지 — 재생성 시 덮어써짐
  - dist/ 파일을 git에 커밋 금지

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 전체 파이프라인 통합 실행 + 디버깅이 필요할 수 있음
  - **Skills**: [`figma-mcp-bridge`]
    - `figma-mcp-bridge`: .env에 FIGMA_PAT 설정 또는 Figma MCP 인증 필요 시

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 시작 (Sequential — 전체 통합)
  - **Blocks**: Tasks 8, 9
  - **Blocked By**: Tasks 4, 5, 6

  **References**:

  **Pattern References**:
  - `packages/design-tokens/package.json:21` — `build` 스크립트가 여러 단계를 `&&`로 체이닝하는 패턴 참조
  - montage-web `scripts/figma-icon.mjs` — 전체 파이프라인을 단일 스크립트로 실행하는 패턴

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 전체 파이프라인 성공 실행
    Tool: Bash
    Preconditions: Tasks 1-6 완료, 루트 .env에 FIGMA_PAT 설정 (Preflight 확인)
    Steps:
      1. pnpm --filter @bubbly-design-system/icons generate
      2. ls packages/icons/src/icons/*.tsx | wc -l — 생성된 컴포넌트 수
      3. cat packages/icons/src/index.ts | grep -c "export" — export 수
    Expected Result: exit 0, 아이콘 수 > 0, export 수 = 아이콘 수 + 1 (IconProps)
    Failure Indicators: 스크립트 에러, 0개 아이콘, index.ts 없음
    Evidence: .sisyphus/evidence/task-7-pipeline-run.txt

  Scenario: 빌드 성공 + dist 출력
    Tool: Bash
    Preconditions: 파이프라인 실행 완료
    Steps:
      1. pnpm --filter @bubbly-design-system/icons build
      2. ls packages/icons/dist/ — 빌드 출력 확인
      3. ls packages/icons/dist/*.mjs packages/icons/dist/*.cjs packages/icons/dist/*.d.mts 2>/dev/null | wc -l
    Expected Result: exit 0, dist/에 .mjs + .cjs + .d.mts 파일 존재
    Failure Indicators: 빌드 실패, dist/ 비어있음
    Evidence: .sisyphus/evidence/task-7-build-output.txt

  Scenario: 멱등성 검증 (재실행)
    Tool: Bash
    Preconditions: 첫 번째 파이프라인 실행 완료
    Steps:
      1. pnpm --filter @bubbly-design-system/icons generate — 두 번째 실행
      2. ls packages/icons/src/icons/*.tsx | wc -l — 동일한 아이콘 수
      3. pnpm --filter @bubbly-design-system/icons build — 빌드 성공
    Expected Result: 재실행해도 동일한 결과, 에러 없음
    Failure Indicators: 파일 중복, 에러 발생
    Evidence: .sisyphus/evidence/task-7-idempotent.txt
  ```

  **Commit**: YES (groups with Task 9)
  - Message: `feat(icons): generate icon components from Figma`
  - Files: `packages/icons/scripts/generate.ts`, `packages/icons/src/icons/*.tsx`, `packages/icons/src/index.ts`, `packages/icons/svg/**`
  - Pre-commit: `pnpm --filter @bubbly-design-system/icons build`

- [x] 8. 빌드 스크립트 테스트 (Vitest)

  **What to do**:
  - `packages/icons/vitest.config.ts` 작성 (최소 설정)
  - `packages/icons/scripts/__tests__/` 디렉토리에 테스트 파일 작성:
    - `optimize-svgs.test.ts`:
      - SVGO 최적화 함수를 직접 호출하여 테스트
      - width/height 제거 확인
      - viewBox 보존 확인
      - currentColor 변환 확인
      - `fill="none"` 보존 확인
    - `generate-components.test.ts`:
      - 샘플 SVG + manifest로 컴포넌트 생성 테스트
      - 생성된 코드에 `forwardRef` 포함 확인
      - `'use client'` 디렉티브 포함 확인
      - `displayName` 설정 확인
      - `filled` 분기 존재 확인 (variant가 있는 경우)
      - JSX 속성 camelCase 변환 확인
  - `package.json`의 `test` 스크립트: `vitest run`
  - devDependencies에 `vitest` 추가

  **Must NOT do**:
  - 아이콘 컴포넌트 렌더링 테스트 금지 — 빌드 파이프라인 로직만 테스트
  - 스냅샷 테스트 금지 — 생성된 코드는 파이프라인 변경 시 자연스럽게 바뀜
  - Figma API 호출 테스트 금지 — 외부 의존성, 모킹 복잡도 불필요

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 순수 함수 테스트, 로직이 단순
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 9)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 7

  **References**:

  **Pattern References**:
  - `ARCHITECTURE.md:66` — "Vitest + Testing Library" 기술 스택 명시, "최소한으로 시작" 원칙

  **External References**:
  - Vitest 공식 문서: https://vitest.dev/ — 설정 및 테스트 작성법

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 테스트 전체 통과
    Tool: Bash
    Preconditions: vitest.config.ts + 테스트 파일 작성 완료
    Steps:
      1. pnpm --filter @bubbly-design-system/icons test
    Expected Result: exit 0, 모든 테스트 통과
    Failure Indicators: 테스트 실패, vitest 실행 에러
    Evidence: .sisyphus/evidence/task-8-test-results.txt

  Scenario: SVGO 최적화 테스트 커버리지
    Tool: Bash
    Preconditions: optimize-svgs.test.ts 작성됨
    Steps:
      1. grep -c "it\|test(" packages/icons/scripts/__tests__/optimize-svgs.test.ts
    Expected Result: 4개 이상 테스트 케이스 (width/height 제거, viewBox 보존, currentColor, fill="none")
    Failure Indicators: 테스트 수 < 4
    Evidence: .sisyphus/evidence/task-8-test-coverage.txt
  ```

  **Commit**: YES
  - Message: `test(icons): add build pipeline tests`
  - Files: `packages/icons/vitest.config.ts`, `packages/icons/scripts/__tests__/*`
  - Pre-commit: `pnpm --filter @bubbly-design-system/icons test`

- [x] 9. barrel export + 패키지 마무리

  **What to do**:
  - `packages/icons/src/index.ts` 최종 확인:
    - 모든 아이콘 named export 존재
    - `IconProps` 타입 re-export 존재
    - default export 없음 (tree-shaking 방해)
  - `package.json` 최종 정리:
    - exports 필드가 tsdown 출력과 정확히 매핑
    - `sideEffects: false` 확인
    - keywords에 "icons" 추가
    - 불필요한 필드 제거
  - root `turbo.json`에서 icons 패키지의 `generate` task 추가 (필요 시):
    - `generate`는 캐시하지 않음 (Figma 소스가 외부)
  - root `pnpm build`에서 icons 패키지가 정상 빌드되는지 확인
  - `pnpm --filter @bubbly-design-system/icons build` 최종 실행

  **Must NOT do**:
  - default export 추가 금지
  - dist/ 파일을 git에 커밋 금지
  - 다른 패키지(react, design-tokens)에 변경 가해서는 안 됨

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 최종 확인 + 소규모 조정
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 8)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 7

  **References**:

  **Pattern References**:
  - `packages/react/src/index.ts` — barrel export 패턴 참조 (named export only)
  - `packages/react/package.json:19-34` — exports 필드 구조
  - `turbo.json` — 기존 task 설정 패턴

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: tree-shaking 가능 확인
    Tool: Bash
    Preconditions: 빌드 완료
    Steps:
      1. node -e "const p=JSON.parse(require('fs').readFileSync('packages/icons/package.json','utf8')); console.log('sideEffects:', p.sideEffects)"
      2. grep -c "default export" packages/icons/src/index.ts || echo "0 default exports"
    Expected Result: sideEffects: false, default export 0개
    Failure Indicators: sideEffects 누락 또는 true, default export 존재
    Evidence: .sisyphus/evidence/task-9-treeshake.txt

  Scenario: root 빌드에서 정상 동작
    Tool: Bash
    Preconditions: 패키지 마무리 완료
    Steps:
      1. pnpm build — root에서 전체 빌드
      2. ls packages/icons/dist/ | wc -l — dist 파일 수
    Expected Result: exit 0, dist/ 파일 생성됨
    Failure Indicators: 빌드 에러, dist/ 비어있음
    Evidence: .sisyphus/evidence/task-9-root-build.txt
  ```

  **Commit**: YES (groups with Task 7)
  - Message: `feat(icons): generate icon components from Figma`
  - Files: `packages/icons/src/index.ts`, `packages/icons/package.json`, `turbo.json` (if changed)
  - Pre-commit: `pnpm build`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [x] F1. **Plan Compliance Audit** — `oracle`

  **What to do**:
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist. Compare deliverables against plan.

  **QA Scenarios:**

  ```
  Scenario: Must Have 항목 전수 확인
    Tool: Bash
    Steps:
      1. cat packages/icons/src/types.ts — IconProps에 size, filled, title 존재 확인
      2. grep -r "forwardRef" packages/icons/src/icons/ | wc -l — 모든 아이콘에 forwardRef 사용
      3. grep -r "'use client'" packages/icons/src/icons/ | wc -l — 모든 아이콘에 'use client' 존재
      4. grep -r "aria-hidden" packages/icons/src/icons/ | wc -l — 접근성 패턴 존재
      5. grep -r "displayName" packages/icons/src/icons/ | wc -l — displayName 설정됨
      6. node -e "const p=JSON.parse(require('fs').readFileSync('packages/icons/package.json','utf8')); console.log('sideEffects:', p.sideEffects)"
      7. pnpm --filter @bubbly-design-system/icons build — 빌드 성공
      8. pnpm --filter @bubbly-design-system/icons test — 테스트 통과
    Expected Result: 모든 Must Have 항목 충족, 빌드/테스트 성공
    Evidence: .sisyphus/evidence/f1-compliance.txt

  Scenario: Must NOT Have 위반 검색
    Tool: Bash
    Steps:
      1. node -e "const p=JSON.parse(require('fs').readFileSync('packages/icons/package.json','utf8')); const deps=Object.keys(p.dependencies||{}); console.log(deps.length === 0 ? 'CLEAN' : 'VIOLATION: ' + deps.join(','))" — 런타임 의존성 없음
      2. grep -r "@pandacss\|@ark-ui\|panda" packages/icons/src/ || echo "CLEAN" — Panda/Ark 참조 없음
      3. ls packages/icons/dist/*.css 2>/dev/null && echo "VIOLATION: CSS output found" || echo "CLEAN" — CSS 출력 없음
      4. grep -r "design-tokens" packages/icons/package.json || echo "CLEAN" — design-tokens 의존성 없음
      5. ls packages/icons/.storybook 2>/dev/null && echo "VIOLATION: Storybook found" || echo "CLEAN"
    Expected Result: 모든 항목 "CLEAN"
    Evidence: .sisyphus/evidence/f1-must-not-have.txt
  ```

  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`

  **What to do**:
  Run type check, lint, build, test. Review all changed files for code quality issues and AI slop patterns.

  **QA Scenarios:**

  ```
  Scenario: 빌드 + 린트 + 테스트 통과
    Tool: Bash
    Steps:
      1. pnpm --filter @bubbly-design-system/icons check-types — 타입 체크
      2. pnpm biome check packages/icons/ — 린트/포맷
      3. pnpm --filter @bubbly-design-system/icons build — 빌드
      4. pnpm --filter @bubbly-design-system/icons test — 테스트
    Expected Result: 모든 명령 exit 0
    Evidence: .sisyphus/evidence/f2-build-lint-test.txt

  Scenario: 코드 품질 위반 검색
    Tool: Bash
    Steps:
      1. grep -rn "as any\|@ts-ignore\|@ts-expect-error" packages/icons/src/ || echo "CLEAN"
      2. grep -rn "console\.\(log\|warn\|error\)" packages/icons/src/ || echo "CLEAN"
      3. grep -rn "// TODO\|// FIXME\|// HACK" packages/icons/src/ || echo "CLEAN"
    Expected Result: 모든 항목 "CLEAN" (또는 합리적인 이유가 있는 것만)
    Evidence: .sisyphus/evidence/f2-code-quality.txt
  ```

  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high`

  **What to do**:
  Start from clean state. Execute core pipeline. Test cross-task integration and edge cases.

  **QA Scenarios:**

  ```
  Scenario: 클린 빌드 파이프라인 (end-to-end)
    Tool: Bash
    Steps:
      1. rm -rf packages/icons/dist packages/icons/src/icons packages/icons/svg
      2. pnpm --filter @bubbly-design-system/icons generate — 전체 파이프라인
      3. ls packages/icons/src/icons/*.tsx | wc -l — 아이콘 컴포넌트 수
      4. pnpm --filter @bubbly-design-system/icons build — 빌드
      5. ls packages/icons/dist/ — 출력 확인
    Expected Result: 파이프라인 + 빌드 성공, 아이콘 수 > 0, dist/ 파일 생성
    Evidence: .sisyphus/evidence/f3-e2e-pipeline.txt

  Scenario: filled prop 동작 확인
    Tool: Bash (node REPL)
    Steps:
      1. node -e "const fs=require('fs'); const files=fs.readdirSync('packages/icons/src/icons/').filter(f=>f.endsWith('.tsx')); const content=fs.readFileSync('packages/icons/src/icons/'+files[0],'utf8'); console.log('filled prop:', content.includes('filled') ? 'EXISTS' : 'MISSING'); console.log('conditional render:', content.includes('filled ?') || content.includes('filled?') ? 'EXISTS' : 'MISSING')"
    Expected Result: filled prop: EXISTS, conditional render: EXISTS
    Evidence: .sisyphus/evidence/f3-filled-prop.txt

  Scenario: 멱등성 검증
    Tool: Bash
    Steps:
      1. pnpm --filter @bubbly-design-system/icons generate — 재실행
      2. pnpm --filter @bubbly-design-system/icons build — 재빌드
    Expected Result: exit 0, 에러 없이 동일 결과
    Evidence: .sisyphus/evidence/f3-idempotent.txt

  Scenario: root 빌드 통합
    Tool: Bash
    Steps:
      1. pnpm build — root에서 전체 빌드 (turborepo)
    Expected Result: exit 0, 모든 패키지 빌드 성공 (design-tokens, icons, react)
    Evidence: .sisyphus/evidence/f3-root-build.txt
  ```

  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`

  **What to do**:
  For each task: verify implementation matches spec exactly. Check "Must NOT do" compliance. Detect scope creep.

  **QA Scenarios:**

  ```
  Scenario: 변경 범위 확인
    Tool: Bash
    Steps:
      1. git diff --name-only main...HEAD — 변경된 파일 목록
      2. git diff --name-only main...HEAD | grep -v "^packages/icons/" | grep -v "^ARCHITECTURE.md" | grep -v "^README.md" | grep -v "^pnpm-lock.yaml" | grep -v "^turbo.json" — 예상 외 변경 파일
    Expected Result: 예상 외 변경 파일 0개 (icons 패키지 + ARCHITECTURE.md + README.md + pnpm-lock + turbo.json만 변경)
    Failure Indicators: 다른 패키지(react, design-tokens) 파일 변경됨
    Evidence: .sisyphus/evidence/f4-scope-check.txt

  Scenario: Must NOT do 교차 오염 확인
    Tool: Bash
    Steps:
      1. git diff main...HEAD -- packages/react/ | wc -l — react 패키지 변경 없음
      2. git diff main...HEAD -- packages/design-tokens/ | wc -l — design-tokens 패키지 변경 없음
    Expected Result: 각각 0 라인
    Failure Indicators: 0이 아닌 경우 교차 오염
    Evidence: .sisyphus/evidence/f4-no-contamination.txt
  ```

  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

| Group | Message | Files | Pre-commit Check |
|-------|---------|-------|-----------------|
| Task 1+2 | `feat(icons): scaffold icons package and update architecture docs` | `packages/icons/package.json`, `packages/icons/tsconfig.json`, `ARCHITECTURE.md` | `tsc --noEmit` |
| Task 3+4+5+6 | `feat(icons): add Figma extraction and React component generation pipeline` | `packages/icons/scripts/*`, `packages/icons/tsdown.config.ts` | `pnpm --filter @bubbly-design-system/icons build` |
| Task 7+9 | `feat(icons): generate icon components from Figma` | `packages/icons/src/**` | `pnpm --filter @bubbly-design-system/icons build` |
| Task 8 | `test(icons): add build pipeline tests` | `packages/icons/scripts/__tests__/*` | `vitest run` |

---

## Success Criteria

### Verification Commands
```bash
# 패키지 빌드 성공
pnpm --filter @bubbly-design-system/icons build  # Expected: exit 0, dist/ 생성

# 타입 체크 통과
pnpm --filter @bubbly-design-system/icons check-types  # Expected: exit 0

# 테스트 통과
pnpm --filter @bubbly-design-system/icons test  # Expected: all tests pass

# tree-shaking 확인 (dist 파일 구조)
ls packages/icons/dist/  # Expected: ESM + CJS + .d.ts 파일들

# 아이콘 개수 확인
ls packages/icons/src/icons/*.tsx | wc -l  # Expected: Figma 아이콘 수와 일치
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] Build script tests pass
- [ ] Generated icons match Figma source
- [ ] `filled` prop toggles outline/filled SVG
- [ ] `size` prop and `currentColor` work correctly
- [ ] ARCHITECTURE.md updated with icon package info
