# packages/react — Agent Guidelines

## Storybook: Stateful Story 컨벤션

상태/이벤트가 필요한 스토리는 두 갈래로 나눠서 작성한다. **상황에 맞는 패턴을 고르고, 한 컴포넌트에서 두 패턴을 섞지 않는다.**

### Pattern A — `useArgs` (단순 controllable prop 데모)

다음 조건에 모두 해당하면 이 패턴을 쓴다.

- 상태가 단일 prop(또는 소수의 평면 prop)에 그대로 매핑됨 — `value`, `checked`, `selected`, `open` 등
- Storybook **Controls 패널에서 직접 조작**할 수 있어야 의미가 있음
- 상태 흐름이 단순한 controlled 컴포넌트 시연

```tsx
import { useArgs } from 'storybook/preview-api';

export const Controlled: Story = {
  args: { value: '제주' },
  render: function Controlled(args) {
    const [{ value }, updateArgs] = useArgs<SearchFieldProps>();
    return (
      <SearchField
        {...args}
        value={value}
        onChange={e => updateArgs({ value: e.target.value })}
      />
    );
  },
};
```

규칙:
- `render`는 반드시 **named function** (`function Controlled(args)`). 화살표 함수 + hook 조합은 ESLint(`react-hooks/rules-of-hooks`)에 걸리고 디버깅 어렵다.
- import는 Storybook 10 기준 `'storybook/preview-api'` (`@storybook/preview-api` 아님).
- Controls 패널에 노출할 필요 없는 prop은 `argTypes: { foo: { table: { disable: true } } }`로 끈다.

### Pattern B — Named component + `useState` (복잡 상태 흐름 데모)

다음 중 하나라도 해당하면 이 패턴을 쓴다.

- 상태가 **배열/오브젝트 mutation** (e.g., 리스트에서 항목 제거, 폼 필드 추가/삭제)
- **다단계 워크플로우** 또는 **로컬 derived state** 가 있음 (loading, errors, optimistic updates)
- Controls 패널에서 조작할 수 없는 인터랙션 (X 버튼 클릭으로 항목 제거 시연 등)

```tsx
const INITIAL_RECENT_ITEMS = ['강남 브런치'];

function DefaultRender(args: AutocompleteProps) {
  const [recentItems, setRecentItems] =
    useState<Array<string>>(INITIAL_RECENT_ITEMS);

  const handleRemove = (item: string) => {
    setRecentItems(prev => prev.filter(i => i !== item));
  };

  return (
    <Autocomplete {...args}>
      {recentItems.map(item => (
        <AutocompleteItem
          key={item}
          title={item}
          trailing={
            <IconButton
              icon={<IconClose />}
              aria-label={`Remove ${item}`}
              onClick={() => handleRemove(item)}
            />
          }
        />
      ))}
    </Autocomplete>
  );
}

const meta: Meta<typeof Autocomplete> = {
  // ...
  render: args => <DefaultRender {...args} />,
};
```

규칙:
- 상태와 로직은 **별도 named function component** 로 추출한다. `render` 안에 nested function component를 정의하지 않는다 — re-mount 동작이 헷갈리고 가독성도 떨어진다.
- `render: args => <DefaultRender {...args} />` 처럼 args만 넘겨 받는다.
- 배열/오브젝트 초기값은 모듈 스코프 상수로 분리 (`INITIAL_RECENT_ITEMS` 등). 모듈 스코프에 mutable state를 두면 stories 간 leak 발생.

### 절대 하지 말 것

- **`useArgs`와 React `useState`를 같은 render 안에서 섞지 않는다.** Storybook hook context와 React hook context가 분리되어 있어 re-render 시 깨질 수 있다. 둘 다 필요하면 둘 다 `'storybook/preview-api'`에서 import한다.
- **인터랙티브 요소를 가진 slot 위에 `aria-hidden="true"` wrapper 두지 않는다.** 자식 컴포넌트의 `aria-label`이 무효화된다 (WCAG 위반).
- **`@storybook/addon-actions`의 `action()`만으로 상태 변화 시연을 대체하지 않는다.** 클릭 시 어떤 시각적 변화가 일어나는지 디자이너/소비자가 확인할 수 있어야 한다.

### 결정 트리

```
이 스토리에 상태가 필요한가?
├─ 아니오 → 그냥 inline 화살표: render: args => <Component {...args} />
└─ 예
   ├─ 단일 prop 동기화 + Controls 패널과 같이 보여주고 싶다 → Pattern A (useArgs)
   └─ 배열/오브젝트 mutation, 다단계 흐름, 또는 Controls로 표현 불가 → Pattern B (named component + useState)
```

## 컴포넌트 작성 규칙

루트 [`AGENTS.md`](../../AGENTS.md)의 React Patterns / Component Composition Patterns / 코드 스타일 규칙을 따른다. 이 파일은 그 규칙 위에 packages/react 한정 규칙만 추가한다.
