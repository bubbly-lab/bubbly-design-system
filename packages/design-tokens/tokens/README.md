## About

- token 값들을 담는 json 파일은 [DTCG 포맷](https://www.designtokens.org/tr/third-editors-draft/format/)을 따르는 것을 원칙으로 합니다.
    - 예외적으로 파일 이름은 *.tokens.json (or *.tokens.jsonc) 이여야 합니다. *.tokens 는 사용하지 않습니다.
- `schema.json` 은 에디터 힌팅(자동완성, 구조 검증)을 위한 **구조 전용** JSON Schema 입니다.
    - 토큰/그룹 구조와 `$type` enum 만 검증합니다. `$value` 내용은 검증하지 않습니다.
    - `$value` 타입별 검증은 `npm run validate` (프로그래매틱 검증)이 담당합니다.

## Conventions

### Naming

- 토큰명은 **kebab-case** 를 사용합니다. (예: `title1-bold`, `body1-regular`)
- 그룹명은 **camelCase** 를 허용합니다. CSS/DTCG 프로퍼티명과 일치하는 경우 camelCase가 자연스럽고, JS export 키와의 일관성을 유지합니다. (예: `fontSize`, `lineHeight`, `fontWeight`)
- 그룹명은 **단수형** 을 사용합니다. (예: `color`, `dimension`, `radius`)

### `$type` 선언

- **그룹 레벨 선언을 기본으로 합니다.** DTCG 스펙에 따라 그룹에 선언된 `$type`은 자식 토큰에 상속됩니다.
- 한 그룹 안의 토큰이 모두 같은 타입이면, **그룹에 한 번만** `$type`을 선언합니다.
- 개별 토큰에 `$type`을 선언하는 것은 한 그룹 안에 서로 다른 타입의 토큰이 섞여 있을 때만 사용합니다.

```jsonc
// ✅ 올바른 예: 그룹 레벨 선언
"fontSize": {
  "$type": "dimension",
  "t1": { "$value": "11px" },
  "t2": { "$value": "12px" }
}

// ❌ 잘못된 예: 같은 타입인데 개별 선언
"fontSize": {
  "t1": { "$type": "dimension", "$value": "11px" },
  "t2": { "$type": "dimension", "$value": "12px" }
}
```

### `$schema` 선언

- 모든 토큰 파일의 최상위에 `"$schema": "../schema.json"` 을 선언합니다.
- 이는 에디터의 자동 완성 및 구조 검증(토큰/그룹 형태, `$type` enum)을 위한 것입니다.
- `$value` 내용 검증은 JSON Schema 의 한계(`$type` 상속 처리 불가)로 인해 별도 스크립트에서 수행합니다.

### 토큰 검증

- `npm run validate` 를 실행하면 프로그래매틱 검증이 수행됩니다.
- Style Dictionary 의 `typeDtcgDelegate` 로 `$type` 상속을 해결한 뒤, 각 토큰의 `$value` 가 해당 타입에 맞는지 검증합니다.
- 새 토큰 타입이나 값 포맷을 추가할 때는 `validate-tokens.js` 의 validators 를 함께 업데이트합니다.

### Font

- 이 디자인 시스템의 기본 폰트는 **[Pretendard Variable](https://github.com/orioncactus/pretendard)** 입니다.
- 폰트 로딩은 `assets/font.json` 의 CSS import 토큰으로 처리합니다.
- `text.fonts.default` 토큰이 시스템 기본 폰트를 나타냅니다.
- 폰트는 전역으로 적용합니다. (`body { font-family: var(--text-fonts-default) }` 등)
    - typography 토큰에는 `fontFamily` 를 포함하지 않습니다. 폰트는 전역 관심사이므로 개별 토큰이 들고 다니지 않습니다.

### Typography

- 모든 typography는 별도의 객체로 감싸지 않습니다. (감쌀 경우 build 되는 css에 불필요하게 prefix가 붙습니다.)
- 하나의 typography에 font-weight가 하나라면 아래처럼 선언합니다.

```jsonc
{
  "title1": {
    "$value": {
      "fontWeight": "{fontWeight.bold}",
      "fontSize": "{fontSize.t10}",
      "lineHeight": "{lineHeight.t10}"
    }
  }
```

- 하나의 typography에 font-weight가 여러 개라면 아래와 같이 font-weight를 suffix로 붙입니다.

```jsonc
{
  "body1-bold": {
    "$value": {
      "fontWeight": "{fontWeight.bold}",
      "fontSize": "{fontSize.t6}",
      "lineHeight": "{lineHeight.t7}"
    }
  },
  "body1-regular": {
    "$value": {
      "fontWeight": "{fontWeight.regular}",
      "fontSize": "{fontSize.t6}",
      "lineHeight": "{lineHeight.t7}"
    }
  }
```
