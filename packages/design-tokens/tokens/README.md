## About

- token 값들을 담는 json 파일은 [DTCG 포맷](https://www.designtokens.org/tr/third-editors-draft/format/)을 따르는 것을 원칙으로 합니다.
    - 예외적으로 파일 이름은 *.tokens.json (or *.tokens.jsonc) 이여야 합니다. *.tokens 는 사용하지 않습니다.
- schema.json 파일은 최소한의 포맷 검증을 위해 사용하는 파일입니다.
    - DTCG 포맷과 완벽히 호환되게 만드는 것이 목표입니다.

## Conventions

### Naming

- reserved name (`$type`, `$value`, `$description` 등) 이 아니라면 **kebab-case** 를 사용합니다.
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
- 이는 에디터의 자동 완성 및 검증 기능을 위한 것입니다.

### Font

- 이 디자인 시스템의 기본 폰트는 **[Pretendard Variable](https://github.com/orioncactus/pretendard)** 입니다.
- 폰트 로딩은 `assets/font.json` 의 CSS import 토큰으로 처리합니다.
- `text.fonts.default` 토큰이 시스템 기본 폰트를 나타냅니다.
- 모든 typography 토큰은 `fontFamily` 에 `"{text.fonts.default}"` 를 참조해야 합니다.
    - 이를 통해 CSS/JS 빌드 결과에 올바른 폰트가 포함됩니다.

### Typography

- 모든 typography는 별도의 객체로 감싸지 않습니다. (감쌀 경우 build 되는 css에 불필요하게 prefix가 붙습니다.)
- 하나의 typography에 font-weight가 하나라면 아래처럼 선언합니다.

```jsonc
{
  "title1": {
    "$value": {
      "fontFamily": "{text.fonts.default}",
      "fontWeight": "{fontWeight.bold}",
      "fontSize": "{fontSize.t10}",
      "lineHeight": "{lineHeight.t10}"
    }
  }
}
```

- 하나의 typography에 font-weight가 여러 개라면 아래와 같이 font-weight를 suffix로 붙입니다.

```jsonc
{
  "body1-bold": {
    "$value": {
      "fontFamily": "{text.fonts.default}",
      "fontWeight": "{fontWeight.bold}",
      "fontSize": "{fontSize.t6}",
      "lineHeight": "{lineHeight.t7}"
    }
  },
  "body1-regular": {
    "$value": {
      "fontFamily": "{text.fonts.default}",
      "fontWeight": "{fontWeight.regular}",
      "fontSize": "{fontSize.t6}",
      "lineHeight": "{lineHeight.t7}"
    }
  }
}
```
