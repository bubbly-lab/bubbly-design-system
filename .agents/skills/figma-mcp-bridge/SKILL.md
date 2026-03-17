---
name: figma-mcp-bridge
description: Figma MCP가 승인하지 않은 클라이언트(opencode 등)에서 tmux + Claude Code를 브릿지로 사용하여 Figma MCP 도구에 접근하는 스킬. Figma 디자인 파일 조회, 컴포넌트 구조 파악, 디자인 컨텍스트 추출이 필요할 때 사용한다.
---

# Figma MCP Bridge

## 전제 조건

- macOS 환경 (인증 정보가 macOS Keychain에 저장됨)
- `claude` CLI 설치 (`brew install claude-code`)
- `tmux` 설치
- Claude Code에 Figma MCP 서버가 등록되어 있어야 한다:
  ```bash
  claude mcp add --transport http --scope user figma https://mcp.figma.com/mcp
  ```
- Claude Code에서 Figma MCP 인증이 완료되어 있어야 한다:
  - `claude` 실행 → `/mcp` → `figma` 선택 → `Authenticate` → 브라우저에서 Figma 로그인

## 언제 이 스킬을 사용할지

다음 상황에서 이 스킬을 사용한다:

- Figma 컴포넌트의 디자인 컨텍스트(레이아웃, 색상, 타이포그래피 등)를 추출해야 할 때
- Figma 디자인을 코드로 변환하기 위한 정보가 필요할 때
- Figma Variables(디자인 토큰)를 조회해야 할 때

다음 상황에서는 이 스킬 대신 **Figma REST API를 직접 사용**한다 (MCP 호출 한도를 소비하지 않음):

- 단순히 파일의 페이지 목록만 필요할 때
- 대량의 노드를 순회해야 할 때

## Figma URL에서 fileKey 추출

일반 URL:
```
https://www.figma.com/design/<FILE_KEY>/<FILE_NAME>?node-id=<NODE_ID>
```

브랜치 URL (이 경우 `BRANCH_KEY`를 fileKey로 사용):
```
https://www.figma.com/design/<FILE_KEY>/branch/<BRANCH_KEY>/<FILE_NAME>
```

- `fileKey`: `/design/` 바로 뒤의 세그먼트. 브랜치 URL이면 `/branch/` 뒤의 세그먼트를 사용
- `nodeId`: `node-id` 파라미터의 값. `-`를 `:`로 변환 (예: `1-2` → `1:2`)

## MCP 브릿지 실행 절차

### Step 1: tmux 세션 확인 및 생성

먼저 기존 세션이 있는지 확인한다.

```bash
tmux has-session -t claude-figma 2>/dev/null
```

**세션이 있으면** → Step 2로 이동하여 idle 상태인지 확인한다.

**세션이 없으면** → 새로 생성한다:

```bash
tmux new-session -d -s claude-figma -x 200 -y 50
tmux send-keys -t claude-figma "claude --allowedTools 'mcp__figma*'" Enter
```

- 세션 이름은 `claude-figma`로 고정한다.
- `--allowedTools 'mcp__figma*'`로 Figma MCP 도구만 허용한다.
- 생성 후 Step 2에서 준비 완료를 확인한다.

### Step 2: Claude Code 준비 확인

세션을 새로 만들었든 기존 세션을 재사용하든, 프롬프트 전송 전에 반드시 idle 상태인지 확인한다.

새 세션을 만든 경우 Claude Code 부팅에 수 초가 걸리므로 대기 후 확인한다:

```bash
sleep 6 && tmux capture-pane -t claude-figma -p | tail -10
```

기존 세션을 재사용하는 경우 바로 확인한다:

```bash
tmux capture-pane -t claude-figma -p | tail -10
```

- 출력에 `❯` 프롬프트가 보이면 idle 상태 — Step 3으로 진행.
- Claude Code가 아직 응답 중이면 (스피너, `Running…` 등) 완료될 때까지 대기한다.
- 신뢰 확인("Yes, I trust this folder") 프롬프트가 나오면 Enter로 승인한다.

### Step 3: 프롬프트 전송

```bash
tmux send-keys -t claude-figma "<프롬프트 내용>" Enter
```

프롬프트 작성 규칙:
- `fileKey`를 반드시 포함한다
- `nodeId`가 있으면 포함한다
- 원하는 정보를 구체적으로 명시한다

### Step 4: 도구 사용 승인

Claude Code는 MCP 도구 호출 시 승인을 요청한다:

```bash
# "Yes, and don't ask again" 선택 (j로 이동 후 Enter)
tmux send-keys -t claude-figma "j"
tmux send-keys -t claude-figma Enter
```

첫 번째 호출에서 "don't ask again"을 선택하면 이후 같은 도구는 자동 승인된다.

### Step 5: 응답 수집

```bash
# MCP 호출은 30~60초 소요될 수 있음
sleep 60 && tmux capture-pane -t claude-figma -p -S -200 | tail -80
```

- `-S -200`: 스크롤백 버퍼 200줄까지 캡처
- 응답이 길면 `-S` 값을 늘린다

### Step 6: 세션 정리

작업이 완전히 끝났을 때만 정리한다. 추가 조회가 예상되면 세션을 유지한다.

```bash
tmux send-keys -t claude-figma "/exit" Enter
tmux kill-session -t claude-figma
```

## MCP 호출 제한

- Figma 플랜에 따라 MCP 도구 호출 횟수에 제한이 있다
- 제한 초과 시 `You've reached the Figma MCP tool call limit` 에러가 반환된다
- **제한 도달 시**: MCP 사용을 중단하고 아래 REST API 섹션의 방법으로 전환한다
- `get_design_context`는 스크린샷을 포함하므로 호출 비용이 높다. `excludeScreenshot: true`로 비용을 줄일 수 있다

## 인증 만료 시

MCP 호출이 인증 에러(`401`, `Authentication failed` 등)를 반환하면 Figma OAuth 토큰이 만료된 것이다.

재인증 절차:
1. 기존 tmux 세션이 있으면 정리한다
2. Claude Code를 실행하여 재인증한다:
   - `claude` 실행 → `/mcp` → `figma` 선택 → `Authenticate` → 브라우저에서 Figma 로그인
3. 인증 완료 후 MCP 브릿지를 다시 시작한다 (Step 1부터)

## 주요 Figma MCP 도구

| 도구 | 용도 | 비고 |
|------|------|------|
| `get_design_context` | 노드의 디자인 컨텍스트 (코드, 스크린샷, 메타데이터) | **가장 많이 사용**. 비용 높음 |
| `get_metadata` | 노드의 구조 메타데이터 (ID, 이름, 위치, 크기) | 구조 파악용. 비용 낮음 |

## 프롬프트 예시

### 파일 전체 구조 파악

```
Use Figma MCP to inspect this file: https://www.figma.com/design/<FILE_KEY>/<FILE_NAME>
List all pages and give me an overview of what's on each page. Respond in Korean.
```

### 특정 노드의 디자인 컨텍스트 추출

```
Use get_design_context for node 32:3 in file <FILE_KEY>.
Extract all component variants, colors, typography, and spacing values. Respond in Korean.
```

### Variables(디자인 토큰) 조회

```
Use Figma MCP to get all variables/design tokens from file <FILE_KEY>.
List color tokens, spacing tokens, and typography tokens. Respond in Korean.
```

## Figma REST API (MCP 대안)

MCP 호출 한도를 아끼거나, 단순 조회 시에는 REST API를 직접 사용한다.

> `FIGMA_PAT`은 프로젝트 `.env` 파일 또는 환경 변수에 Figma Personal Access Token으로 설정되어 있어야 한다.

### 페이지 목록 조회

```bash
source .env && curl -s \
  -H "X-Figma-Token: $FIGMA_PAT" \
  "https://api.figma.com/v1/files/<FILE_KEY>?depth=1" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for page in data['document']['children']:
    print(f'[{page[\"id\"]}] {page[\"name\"]}')
"
```

### 특정 페이지의 하위 노드 조회

```bash
source .env && curl -s \
  -H "X-Figma-Token: $FIGMA_PAT" \
  "https://api.figma.com/v1/files/<FILE_KEY>/nodes?ids=<NODE_ID>&depth=2" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for nid, node_data in data.get('nodes', {}).items():
    doc = node_data.get('document', {})
    print(f'Page: {doc.get(\"name\")}')
    for child in doc.get('children', []):
        ctype = child.get('type', '?')
        cname = child.get('name', '?')
        count = len(child.get('children', []))
        print(f'  - [{ctype}] {cname} ({count} children)')
"
```
