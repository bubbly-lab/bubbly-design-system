# Contributing

Bubbly Design System의 PR 작성 규칙입니다. 코드 스타일 등 그 외 규칙은 [`AGENTS.md`](./AGENTS.md)를 참고해주세요.

- [PR 제목](#pr-제목)
- [PR 본문](#pr-본문)
- [커밋](#커밋)
- [머지 전략](#머지-전략)
- [릴리스 & Changeset](#릴리스--changeset)
- [리뷰 & 머지 플로우](#리뷰--머지-플로우)

## PR 제목

형식: `type(scope): 설명`

### Type

| Type       | 용도                                               |
| ---------- | -------------------------------------------------- |
| `feat`     | 새 기능 / 컴포넌트 / 공개 API 추가                  |
| `fix`      | 버그 수정                                           |
| `docs`     | 문서 전용 변경                                      |
| `refactor` | 동작 변경 없는 구조 개선                            |
| `test`     | 테스트 추가/수정                                    |
| `chore`    | 그 외 (의존성 · 빌드 · CI · 잡무)                   |

Breaking change는 `type!(scope):` 또는 본문에 `BREAKING CHANGE:` footer를 사용합니다.

### Scope

| Scope           | 대상                                    |
| --------------- | --------------------------------------- |
| `icons`         | `@bubbly-design-system/icons`           |
| `react`         | `@bubbly-design-system/react`           |
| `design-tokens` | `@bubbly-design-system/design-tokens`   |

루트 설정 · 워크플로우 · 공용 문서처럼 특정 패키지에 속하지 않는 변경은 scope를 생략합니다. 여러 패키지에 걸친 변경도 scope를 생략하고, 범위는 Changes에 기술합니다.

## PR 본문

템플릿은 [`.github/pull_request_template.md`](./.github/pull_request_template.md)에서 자동으로 채워집니다. 섹션 구성:

1. **Summary** — 이 PR이 무엇을 하는지 간결하게. _(필수)_
2. **Changes** — 구체적으로 무엇을 / 왜 바꿨는지. _(필수)_
3. **Screenshots** — 시각 변경이 있을 때 Before/After. _(조건부)_
4. **Testing** — 수행한 검증 커맨드 또는 체크리스트. _(권장)_
5. **Related Issues** — 연결된 이슈나 PR. `Closes #N`, `Follows #N`. _(선택)_

해당 없는 섹션은 통째로 지웁니다. 억지로 채우지 않아도 됩니다.

### 작성 원칙

- 본문은 한국어를 기본으로 하지만, 영어도 허용합니다.
- PR은 작고 하나의 목적에 집중되도록 유지합니다.
- 설계 결정이나 다른 방안 대비 선택한 이유는 Changes에 함께 적습니다.
- AI가 생성한 요약을 그대로 붙여넣지 않습니다. 직접 다듬어서 씁니다.

### Figma 링크 정책

Figma 파일은 private이므로 **PR 본문이나 스크린샷에 Figma URL을 포함하지 않습니다.** 대신:

- 대상 컴포넌트 이름을 정확히 표기합니다.
- 스크린샷이 필요하면 직접 첨부합니다. Figma 메타데이터가 함께 노출되지 않도록 주의합니다.

## 커밋

- 커밋 메시지도 PR 제목과 동일한 Conventional Commits 형식을 권장합니다.
- 브랜치 내 커밋은 리뷰 편의를 위한 것이고, main에는 Squash 머지로 하나의 커밋만 남습니다.

## 머지 전략

- **Squash merge를 기본**으로 합니다.
- Squash 커밋 메시지는 PR 제목을 그대로 사용합니다.

## 릴리스 & Changeset

- `@bubbly-design-system/icons`만 npm에 배포되며, [Changesets](https://github.com/changesets/changesets)로 버전을 관리합니다.
- **`icons` 패키지에 대한 변경이 포함된 PR에는 `.changeset/*.md` 파일을 반드시 포함합니다.**
  ```bash
  pnpm changeset
  ```
- `react` / `design-tokens`는 배포 대상이 아니므로 Changeset이 필요하지 않습니다. (`.changeset/config.json`의 `ignore` 목록 참고)
- 애매하면 Changeset을 추가해두는 쪽이 안전합니다.

## 리뷰 & 머지 플로우

- 머지 전 리뷰 승인 요건은 GitHub 브랜치 보호 설정을 따릅니다.
- 리뷰 코멘트는 처리하거나 답변한 뒤 resolve합니다.
