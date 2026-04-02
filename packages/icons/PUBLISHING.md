# @bubbly-design-system/icons 배포 가이드

이 문서는 `@bubbly-design-system/icons` 패키지의 릴리스 워크플로우를 설명합니다.

배포는 [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC) 기반으로, npm 토큰 없이 GitHub Actions에서 자동으로 이루어집니다.

---

## 릴리스 워크플로우

Changesets를 통해 자동으로 배포가 관리됩니다.

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

## 수동 배포 (비상시)

CI가 실패하거나 긴급 수정이 필요한 경우, `main` 브랜치에서 로컬로 직접 배포할 수 있습니다.

```bash
npm login
pnpm build
cd packages/icons
npm pack --dry-run              # tarball 내용 확인
npm publish --access public     # 실제 배포
```

*참고: pnpm은 기본적으로 `main`/`master` 브랜치에서만 publish를 허용합니다.*
