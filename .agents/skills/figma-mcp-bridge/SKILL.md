---
name: figma-mcp-bridge
description: Figma MCP 미승인 클라이언트(opencode 등)에서 승인된 CLI(Claude Code, Codex, Gemini CLI)를 tmux 브릿지로 사용하여 Figma MCP 도구에 접근하는 스킬. Figma 디자인 파일 조회, 컴포넌트 구조 파악, 디자인 컨텍스트 추출이 필요할 때 사용한다.
---

# Figma MCP Bridge

## 사전 확인 (최우선)

이 스킬의 브릿지 절차를 실행하기 **전에**, 현재 환경에서 Figma MCP 도구(`mcp__figma__get_design_context` 등)에 직접 접근 가능한지 확인한다.

- **직접 접근 가능** → 이 스킬의 브릿지를 사용하지 않고 네이티브 Figma MCP 도구를 직접 호출한다.
- **직접 접근 불가** → 아래 절차를 따른다.

## 언제 이 스킬을 사용할지

다음 상황에서 이 스킬을 사용한다:

- Figma 컴포넌트의 디자인 컨텍스트(레이아웃, 색상, 타이포그래피 등)를 추출해야 할 때
- Figma 디자인을 코드로 변환하기 위한 정보가 필요할 때
- Figma Variables(디자인 토큰)를 조회해야 할 때

다음 상황에서는 이 스킬 대신 **Figma REST API를 직접 사용**한다 (MCP 호출 한도를 소비하지 않음):

- 단순히 파일의 페이지 목록만 필요할 때
- 대량의 노드를 순회해야 할 때

## 백엔드 선택 절차

Figma MCP가 승인한 CLI 도구 중 하나를 브릿지 프록시로 사용한다. 아래 절차에 따라 사용할 백엔드를 결정한다.

### 설치된 CLI 확인

다음 명령으로 설치된 백엔드를 확인한다:

```bash
which claude 2>/dev/null && echo "claude: installed"
which codex 2>/dev/null && echo "codex: installed"
which gemini 2>/dev/null && echo "gemini: installed"
```

### 백엔드 결정

- **1개 이상 설치됨** → 사용자에게 묻는다:
  > "다음 CLI가 설치되어 있습니다: [설치된 목록]. Figma MCP 브릿지로 사용할 수 있는 CLI가 있나요? (해당 서비스의 구독 및 인증이 완료된 상태여야 합니다)"
  - 사용자가 설치된 목록 중 하나를 선택하면 → 해당 백엔드를 사용한다.
  - 설치되지 않은 다른 서비스를 구독 중이라고 하면 → 해당 CLI를 설치한 후 사용한다.
  - 사용 가능한 것이 없다고 하면 → 아래 "아무것도 설치되지 않음" 절차를 따른다.
- **아무것도 설치되지 않음** → 사용자에게 묻는다:
  > "Figma MCP 브릿지로 사용할 CLI가 설치되어 있지 않습니다. 구독 중인 서비스가 있나요?"
  >
  > 1. **Anthropic (Claude Pro/Max)** → Claude Code 설치 후 사용
  > 2. **OpenAI (ChatGPT Plus/Pro)** → Codex 설치 후 사용
  > 3. **Google (Gemini)** → Gemini CLI 설치 후 사용
  > 4. **없음** → Gemini CLI 설치 후 사용 (Google API 키 무료 티어로 사용 가능)

백엔드가 결정되면 아래 전제 조건에서 해당 백엔드의 설정을 따른다.

### 백엔드 참조

| 백엔드 | 패키지 | 필요 구독 |
|---|---|---|
| Claude Code | `@anthropic-ai/claude-code` | Anthropic 유료 (Pro/Max) 또는 API 크레딧 |
| Codex | `@openai/codex` | OpenAI 유료 (Plus/Pro) 또는 API 크레딧 |
| Gemini CLI | `@google/gemini-cli` | Google API 키 (유료 구독 또는 무료 티어) |

## 전제 조건

### 공통

- `tmux` 설치

### Claude Code

- macOS 환경 필요 (Figma MCP 인증 정보가 macOS Keychain에 저장됨)

1. 설치:
   ```bash
   npm i -g @anthropic-ai/claude-code
   ```
2. Figma MCP 서버 등록:
   ```bash
   claude mcp add --transport http --scope user figma https://mcp.figma.com/mcp
   ```
3. Figma 인증:
   `claude` 실행 → `/mcp` → `figma` 선택 → `Authenticate` → 브라우저에서 Figma 로그인

### Codex

1. 설치:
   ```bash
   npm i -g @openai/codex
   ```
2. Codex 인증:
   ```bash
   codex login
   ```
3. Figma MCP 서버 등록 — `~/.codex/config.toml`에 추가:
   ```toml
   [mcp_servers.figma]
   url = "https://mcp.figma.com/mcp"
   ```
4. 첫 연결 시 브라우저에서 Figma 로그인이 필요할 수 있다.

### Gemini CLI

1. 설치:
   ```bash
   npm i -g @google/gemini-cli
   ```
2. 인증:
   ```bash
   export GEMINI_API_KEY="your-key"
   ```
   또는 `gemini` 실행 후 "Sign in with Google" 선택
3. Figma MCP 서버 등록 — `~/.gemini/settings.json`에 추가:
   ```json
   {
     "mcpServers": {
       "figma": {
         "httpUrl": "https://mcp.figma.com/mcp"
       }
     }
   }
   ```
4. 첫 연결 시 브라우저에서 Figma 로그인이 필요할 수 있다.

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
tmux has-session -t figma-bridge 2>/dev/null
```

**세션이 있으면** → Step 2로 이동하여 idle 상태인지 확인한다.

**세션이 없으면** → 새로 생성하고 백엔드 CLI를 실행한다:

```bash
tmux new-session -d -s figma-bridge -x 200 -y 50
```

| 백엔드 | 실행 명령 |
|---|---|
| Claude Code | `tmux send-keys -t figma-bridge "claude --allowedTools 'mcp__figma*'" Enter` |
| Codex | `tmux send-keys -t figma-bridge "codex --ask-for-approval never" Enter` |
| Gemini CLI | `tmux send-keys -t figma-bridge "gemini --approval-mode=yolo" Enter` |

- 세션 이름은 `figma-bridge`로 고정한다.
- 생성 후 Step 2에서 준비 완료를 확인한다.

### Step 2: CLI 준비 확인

세션을 새로 만들었든 기존 세션을 재사용하든, 프롬프트 전송 전에 반드시 idle 상태인지 확인한다.

새 세션을 만든 경우 CLI 부팅에 수 초가 걸리므로 대기 후 확인한다:

```bash
sleep 6 && tmux capture-pane -t figma-bridge -p | tail -10
```

기존 세션을 재사용하는 경우 바로 확인한다:

```bash
tmux capture-pane -t figma-bridge -p | tail -10
```

백엔드별 idle 상태 표시:

| 백엔드 | idle 프롬프트 | 유니코드 |
|---|---|---|
| Claude Code | `❯` | U+276F |
| Codex | `›` | U+203A |
| Gemini CLI | `>` | U+003E |

- 해당 프롬프트가 보이면 idle 상태 — Step 3으로 진행.
- CLI가 아직 응답 중이면 완료될 때까지 대기한다.
- 신뢰 확인 프롬프트가 나오면 Enter로 승인한다.

### Step 3: 프롬프트 전송

```bash
tmux send-keys -t figma-bridge "<프롬프트 내용>" Enter
```

프롬프트 작성 규칙:
- `fileKey`를 반드시 포함한다
- `nodeId`가 있으면 포함한다
- 원하는 정보를 구체적으로 명시한다

### Step 4: 도구 사용 승인

| 백엔드 | 승인 방식 |
|---|---|
| Claude Code | 첫 호출 시 수동 승인 필요 (아래 참고) |
| Codex | `--ask-for-approval never`로 자동 승인됨 |
| Gemini CLI | `--approval-mode=yolo`로 자동 승인됨 |

Claude Code의 경우 첫 번째 MCP 도구 호출에서 승인 다이얼로그가 나타난다:

```bash
# "Yes, and don't ask again" 선택 (j로 이동 후 Enter)
tmux send-keys -t figma-bridge "j"
tmux send-keys -t figma-bridge Enter
```

첫 번째 호출에서 "don't ask again"을 선택하면 이후 같은 도구는 자동 승인된다.

### Step 5: 응답 수집

idle 프롬프트가 다시 나타날 때까지 폴링하여 응답을 수집한다.

```bash
# 5초 간격 폴링, 최대 1분 대기 (generate_figma_design 사용 시 seq 1 36으로 3분까지 확장)
for i in $(seq 1 12); do
  tmux capture-pane -t figma-bridge -p | tail -3 | grep -q '❯\|›\|>' && break
  sleep 5
done
tmux capture-pane -t figma-bridge -p -S -200 | tail -80
```

- 응답이 오는 즉시 수집한다 (불필요한 대기 없음).
- `generate_figma_design` 호출 시에는 `seq 1 36` (5초 × 36 = 3분)으로 타임아웃을 확장한다.
- `-S -200`: 스크롤백 버퍼 200줄까지 캡처. 응답이 길면 `-S` 값을 늘린다.

### Step 6: 세션 정리

작업이 완전히 끝났을 때만 정리한다. 추가 조회가 예상되면 세션을 유지한다.

| 백엔드 | 종료 명령 |
|---|---|
| Claude Code | `tmux send-keys -t figma-bridge "/exit" Enter` |
| Codex | `tmux send-keys -t figma-bridge C-c` |
| Gemini CLI | `tmux send-keys -t figma-bridge C-c` |

```bash
tmux kill-session -t figma-bridge
```

## MCP 호출 제한

- Figma 플랜에 따라 MCP 도구 호출 횟수에 제한이 있다
- 제한 초과 시 `You've reached the Figma MCP tool call limit` 에러가 반환된다
- **제한 도달 시**: MCP 사용을 중단하고 아래 REST API 섹션의 방법으로 전환한다. REST API 사용에는 별도의 Figma Personal Access Token(`FIGMA_PAT`)이 필요하다
- `get_design_context`는 스크린샷을 포함하므로 호출 비용이 높다. `excludeScreenshot: true`로 비용을 줄일 수 있다

## 인증 만료 시

MCP 호출이 인증 에러(`401`, `Authentication failed` 등)를 반환하면 OAuth 토큰이 만료된 것이다.

백엔드별 재인증 절차:

| 백엔드 | 재인증 방법 |
|---|---|
| Claude Code | `claude` 실행 → `/mcp` → `figma` → `Authenticate` → 브라우저 로그인 |
| Codex | `codex login`으로 재인증 후 Figma MCP 재연결 |
| Gemini CLI | `gemini` 실행 후 재인증 또는 API 키 갱신 |

기존 tmux 세션을 정리하고 "MCP 브릿지 실행 절차"의 Step 1부터 다시 시작한다.

## Figma MCP 도구 목록

| 도구 | 용도 | 비고 |
|------|------|------|
| `get_design_context` | React+Tailwind 기반 디자인→코드 변환 | **가장 많이 사용**. 비용 높음 |
| `get_metadata` | 레이어 구조 메타데이터 (ID, 이름, 위치, 크기) | 가벼운 사전 조회용 |
| `get_screenshot` | 선택 영역 스크린샷 캡처 | 시각적 레퍼런스용 |
| `get_variable_defs` | 디자인 토큰 (색상, 간격, 타이포그래피) | 변수/스타일 조회 |
| `get_figjam` | FigJam 다이어그램 → XML + 스크린샷 | FigJam 전용 |
| `generate_diagram` | Mermaid 구문 → FigJam 다이어그램 생성 | 파일 컨텍스트 불필요 |
| `get_code_connect_map` | Figma↔코드 컴포넌트 매핑 조회 | Code Connect |
| `add_code_connect_map` | Figma↔코드 매핑 추가 | **호출 제한 없음** |
| `create_design_system_rules` | 디자인 시스템 rules 파일 생성 | 1회성 설정 |
| `get_code_connect_suggestions` | Code Connect 매핑 제안 | Figma 주도 호출 |
| `send_code_connect_mappings` | 매핑 확인/확정 | Figma 주도 호출 |
| `whoami` | 인증된 사용자 정보 조회 | 리모트 서버 전용. 호출 제한 없음 |
| `generate_figma_design` | 웹앱 UI → Figma 디자인 캡처 | 리모트 서버 + 일부 클라이언트만. 호출 제한 없음 |

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
