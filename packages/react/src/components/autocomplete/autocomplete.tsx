'use client';

import { ark } from '@ark-ui/react/factory';
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';
import { cx } from 'styled-system/css';
import { autocomplete } from 'styled-system/recipes';

import { LoadingIndicator } from '../loading-indicator';
import { Result } from '../result';
import { SectionHeader } from '../section-header';

export interface AutocompleteProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  type?: 'modal' | 'fullScreen';
  state?: 'default' | 'loading' | 'empty';
  showHeader?: boolean;
  headerTitle?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  children?: ReactNode;
}

// Figma 빈 상태 Result의 기본 설명 문구.
const DEFAULT_EMPTY_DESCRIPTION = '검색 결과가 없어요.';

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  function Autocomplete(
    {
      type = 'modal',
      state = 'default',
      showHeader = true,
      headerTitle,
      emptyTitle,
      emptyDescription,
      emptyAction,
      children,
      className,
      ...rest
    },
    ref,
  ) {
    const styles = autocomplete({ type, state });

    return (
      <ark.div
        ref={ref}
        className={cx(styles.root, className)}
        aria-busy={state === 'loading' || undefined}
        {...rest}
      >
        {showHeader && headerTitle ? (
          <div className={styles.header}>
            <SectionHeader title={headerTitle} size="medium" />
          </div>
        ) : null}
        <div className={styles.body}>
          {state === 'default' ? children : null}
          {state === 'loading' ? <LoadingIndicator /> : null}
          {state === 'empty' ? (
            <Result
              title={emptyTitle}
              description={emptyDescription ?? DEFAULT_EMPTY_DESCRIPTION}
              action={emptyAction}
            />
          ) : null}
        </div>
      </ark.div>
    );
  },
);
