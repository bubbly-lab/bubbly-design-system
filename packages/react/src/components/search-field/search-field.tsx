'use client';

import { ark } from '@ark-ui/react/factory';
import { IconCloseCircle, IconSearch } from '@bubbly-design-system/icons';
import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  type MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { cx } from 'styled-system/css';
import { searchField } from 'styled-system/recipes';
import { IconButton } from '../icon-button';

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
    const hasValue = isControlled ? Boolean(value) : uncontrolledHasValue;

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
