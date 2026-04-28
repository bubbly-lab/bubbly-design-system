'use client';

import { ark } from '@ark-ui/react/factory';
import { IconCloseCircle, IconSearch } from '@bubbly-design-system/icons';
import {
  type ChangeEvent,
  type FocusEvent,
  forwardRef,
  type InputHTMLAttributes,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cx } from 'styled-system/css';
import { searchField } from 'styled-system/recipes';
import { IconButton } from '../icon-button';

// Module-level input modality tracker. Browsers' `:focus-visible` heuristic
// always matches for text inputs regardless of how focus arrived, so we
// can't rely on CSS alone to distinguish mouse-focus from keyboard-focus
// when the focused element is an <input type="text"|"search">. Following
// the react-aria pattern: track the user's last input modality globally,
// then read it at focus time. Listeners are attached once per page.
type InputModality = 'pointer' | 'keyboard';
let lastInputModality: InputModality = 'pointer';
let modalityListenersAttached = false;

function ensureModalityListeners(): void {
  if (modalityListenersAttached || typeof window === 'undefined') return;
  modalityListenersAttached = true;
  const setPointer = (): void => {
    lastInputModality = 'pointer';
  };
  const handleKey = (e: KeyboardEvent): void => {
    if (
      e.key === 'Tab' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    ) {
      lastInputModality = 'keyboard';
    }
  };
  window.addEventListener('mousedown', setPointer, true);
  window.addEventListener('touchstart', setPointer, true);
  window.addEventListener('keydown', handleKey, true);
}

export type SearchFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  /**
   * Called after the clear button is clicked.
   * The component clears the input value (dispatching an `input` event so
   * controlled consumers' `onChange` fires with an empty string) and
   * refocuses the input before invoking this callback.
   */
  onClear?: () => void;
  /**
   * `aria-label` for the clear button.
   * @default 'Clear search'
   */
  clearLabel?: string;
};

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onClear,
      className,
      style,
      clearLabel = 'Clear search',
      ...rest
    },
    forwardedRef,
  ) {
    const innerRef = useRef<HTMLInputElement>(null);
    const styles = searchField();

    const isControlled = value !== undefined;
    const [uncontrolledHasValue, setUncontrolledHasValue] = useState(
      Boolean(defaultValue),
    );
    const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
    const hasValue = isControlled ? Boolean(value) : uncontrolledHasValue;

    useEffect(() => {
      ensureModalityListeners();
    }, []);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledHasValue(Boolean(e.target.value));
      onChange?.(e);
    };

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        setIsKeyboardFocus(lastInputModality === 'keyboard');
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        setIsKeyboardFocus(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
      // Prevent implicit form submission when SearchField is inside a <form>.
      e.preventDefault();
      const input = innerRef.current;
      if (!input) return;
      // React swallows direct `input.value = ''` assignments; use the native
      // property setter + synthetic input event so controlled onChange fires.
      const nativeSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      )?.set;
      nativeSetter?.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
      onClear?.();
    };

    const handleRootClick = () => {
      innerRef.current?.focus();
    };

    return (
      <ark.div
        className={cx(styles.root, className)}
        style={style}
        onClick={handleRootClick}
        data-keyboard-focus={isKeyboardFocus ? '' : undefined}
      >
        <span className={styles.icon} aria-hidden>
          <IconSearch />
        </span>
        <input
          {...rest}
          ref={setRefs}
          type="search"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.input}
        />
        {hasValue && (
          <span className={styles.clearButton}>
            <IconButton
              buttonType="standard"
              icon={<IconCloseCircle />}
              aria-label={clearLabel}
              onClick={handleClear}
            />
          </span>
        )}
      </ark.div>
    );
  },
);
