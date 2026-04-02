# @bubbly-design-system/icons 배포 가이드

이 문서는 `@bubbly-design-system/icons` 패키지의 첫 배포와 이후 자동화된 릴리스 워크플로우를 설명합니다.

---

## 1. 사전 준비

### npm org 생성

패키지가 `@bubbly-design-system` scope를 사용하므로, npmjs.com에 해당 조직(org)이 먼저 생성되어 있어야 합니다.

1. [npm org 생성 페이지](https://www.npmjs.com/org/create)로 이동합니다.
2. Organization Name에 `bubbly-design-system`을 입력합니다.
3. **Free plan**을 선택합니다 (Public 패키지 배포에 충분합니다).
4. 생성이 완료되면 터미널에서 다음 명령어로 확인합니다:
   ```bash
   npm org ls bubbly-design-system
   ```

### npm 로그인

배포 권한이 있는 계정으로 로그인합니다.

```bash
npm login
```

---

## 2. 첫 배포 (로컬)

Trusted Publishing 설정을 위해 패키지가 npm에 먼저 등록되어야 합니다. 첫 배포는 로컬에서 수동으로 진행합니다.

```bash
git checkout main && git pull
pnpm build
cd packages/icons
npm pack --dry-run              # tarball 내용 확인
npm publish --access public     # 실제 배포
```

### 배포 확인

```bash
npm view @bubbly-design-system/icons
```

[https://www.npmjs.com/package/@bubbly-design-system/icons](https://www.npmjs.com/package/@bubbly-design-system/icons) 페이지가 정상적으로 노출되는지 확인합니다.

---

## 3. Trusted Publishing 설정

첫 배포 후, 토큰 없이 GitHub Actions에서 자동 배포할 수 있도록 Trusted Publishing을 설정합니다.

1. [패키지 설정 페이지](https://www.npmjs.com/package/@bubbly-design-system/icons/access)로 이동합니다.
2. **Trusted Publishers** 섹션에서 **GitHub Actions**를 선택합니다.
3. 다음 정보를 입력합니다:
   | 필드 | 값 |
   |------|-----|
   | Organization or user | `bubbly-lab` |
   | Repository | `bubbly-design-system` |
   | Workflow filename | `release.yml` |
   | Environment name | (비워둠) |
4. **Set up connection** 클릭

설정 후, `release.yml` 워크플로우를 OIDC 방식으로 업데이트해야 합니다. (`NODE_AUTH_TOKEN` 제거, `npm publish --provenance` 사용)

---

## 4. 이후 릴리스 워크플로우 (자동화)

Trusted Publishing 설정 이후에는 Changesets를 통해 자동으로 배포가 관리됩니다.

1. **변경사항 기록**:
   기능 추가나 수정 후 커밋하기 전 다음 명령어를 실행합니다.
   ```bash
   pnpm changeset
   ```
   - 배포할 패키지(`icons`)를 선택합니다.
   - 버전 타입(major, minor, patch)을 선택하고 변경 내용을 입력합니다.
   - 생성된 `.changeset/*.md` 파일을 커밋에 포함하여 PR을 올립니다.

2. **Main 브랜치 Merge**:
   PR이 `main` 브랜치에 머지되면, GitHub Actions가 이를 감지하고 **"Version Packages"**라는 이름의 새로운 PR을 자동으로 생성합니다.

3. **릴리스 실행**:
   - "Version Packages" PR을 머지하면 `release.yml` 워크플로우가 실행됩니다.
   - 자동으로 `package.json` 버전이 업데이트되고, CHANGELOG.md가 생성되며, npm에 패키지가 배포됩니다.

---

## 5. 수동 배포 (비상시)

CI가 실패하거나 긴급 수정이 필요한 경우, `main` 브랜치에서 로컬로 직접 배포할 수 있습니다.

```bash
npm login
pnpm build
cd packages/icons
npm pack --dry-run              # tarball 내용 확인
npm publish --access public     # 실제 배포
```

*참고: pnpm은 기본적으로 `main`/`master` 브랜치에서만 publish를 허용합니다.*
