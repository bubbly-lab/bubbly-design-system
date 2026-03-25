# Problems — icon-package

## [2026-03-25] Session Start

No blockers yet.

## [2026-03-25] F3 Manual QA
- Unresolved QA mismatch: the scenario-2 verification command is not deterministic for validating filled/outline branching because alphabetical first-file selection may hit a single-variant icon.
- Until the verification target is constrained to a known dual-variant icon (for example `IconHome.tsx`) or the expectation is reworded, the manual QA verdict should remain reject on the strict scenario definition.
