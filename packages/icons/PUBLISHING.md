# @bubbly-design-system/icons 배포 가이드

이 문서는 `@bubbly-design-system/icons` 패키지의 첫 수동 배포 방법과 이후의 자동화된 릴리스 워크플로우를 설명합니다.

---

## 1. npm org 생성

패키지가 `@bubbly-design-system` scope를 사용하므로, npmjs.com에 해당 조직(org)이 먼저 생성되어 있어야 합니다.

1. [npm org 생성 페이지](https://www.npmjs.com/org/create)로 이동합니다.
2. Organization Name에 `bubbly-design-system`을 입력합니다.
3. **Free plan**을 선택합니다 (Public 패키지 배포에 충분합니다).
4. 생성이 완료되면 터미널에서 다음 명령어로 확인합니다:
   ```bash
   npm org ls bubbly-design-system
   ```

---

## 2. npm 로그인

배포 권한이 있는 계정으로 로그인합니다.

```bash
npm login
```
명령어 실행 후 브라우저가 열리면 인증을 완료하세요.

---

## 3. 첫 publish (수동)

첫 배포는 로컬에서 수동으로 진행해야 합니다. npm org가 존재하고 패키지가 npm에 등록된 이후에야 GitHub Actions 자동화가 정상 동작합니다.

1. **최신 빌드 확인**:
   ```bash
   pnpm build
   ```

2. **배포 내용 최종 확인 (Dry Run)**:
   ```bash
   cd packages/icons
   npm pack --dry-run
   ```
   생성될 tarball의 파일 목록을 확인하여 불필요한 파일이 포함되지 않았는지 체크합니다.

3. **실제 배포**:
   ```bash
   # packages/icons 디렉토리에서 실행
   pnpm publish --access public
   ```
   *참고: scope 패키지는 기본적으로 private으로 간주되므로 `--access public` 옵션이 필수입니다.*

---

## 4. 배포 확인

배포가 성공했는지 확인합니다.

1. **CLI 확인**:
   ```bash
   npm view @bubbly-design-system/icons
   ```

2. **웹 확인**:
   [https://www.npmjs.com/package/@bubbly-design-system/icons](https://www.npmjs.com/package/@bubbly-design-system/icons) 페이지가 정상적으로 노출되는지 확인합니다.

---

## 5. GitHub Secret 설정

이후의 자동 배포를 위해 GitHub 저장소에 npm 토큰을 등록해야 합니다.

1. **npm 토큰 생성**:
   - npmjs.com 로그인 → Access Tokens → Generate New Token
   - **Automation** 타입 선택
   - 생성된 토큰 값을 복사합니다.

2. **GitHub 저장소 설정**:
   - GitHub repo → Settings → Secrets and variables → Actions
   - **New repository secret** 클릭
   - Name: `NPM_TOKEN`
   - Value: (복사한 토큰 값 붙여넣기)

---

## 6. 이후 릴리스 워크플로우 (자동화)

첫 배포 이후에는 Changesets를 통해 자동으로 배포가 관리됩니다.

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
