import { defineRecipe } from '@pandacss/dev';

const disabledStyles = {
  cursor: 'not-allowed',
  backgroundColor: 'surface.disabled',
  color: 'content.disabled',
} as const;

export const iconButtonRecipe = defineRecipe({
  className: 'icon-button',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'clip',
    position: 'relative',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0',
    userSelect: 'none',
    flexShrink: 0,
    transition: 'background-color 150ms ease-out',
    '&[data-disabled]': disabledStyles,
    _focusVisible: {
      boxShadow:
        '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
    },
  },
  variants: {
    color: {
      brand: {},
      neutral: {},
    },
    type: {
      solid: {},
      ghost: {},
      outline: {},
      standard: {},
    },
    shape: {
      square: {},
      round: {},
    },
    size: {
      large: {
        '--icon-button-icon-size': '28px',
      },
      medium: {
        '--icon-button-icon-size': '24px',
      },
      small: {
        '--icon-button-icon-size': '20px',
      },
      xsmall: {
        '--icon-button-icon-size': '20px',
      },
    },
  },
  compoundVariants: [
    // ── Layout: shape + size → padding, border-radius ──────────────
    // Square
    {
      shape: 'square',
      size: 'large',
      css: { padding: '12', borderRadius: 'r300' },
    },
    {
      shape: 'square',
      size: 'medium',
      css: { padding: '12', borderRadius: 'r300' },
    },
    {
      shape: 'square',
      size: 'small',
      css: { padding: '10', borderRadius: 'r250' },
    },
    {
      shape: 'square',
      size: 'xsmall',
      css: { padding: '6', borderRadius: 'r200' },
    },
    // Round
    {
      shape: 'round',
      size: 'large',
      css: { padding: '12', borderRadius: 'full' },
    },
    {
      shape: 'round',
      size: 'medium',
      css: { padding: '12', borderRadius: 'full' },
    },
    {
      shape: 'round',
      size: 'small',
      css: { padding: '10', borderRadius: 'full' },
    },
    {
      shape: 'round',
      size: 'xsmall',
      css: { padding: '6', borderRadius: 'full' },
    },

    // ── Color: brand + solid ───────────────────────────────────────
    {
      color: 'brand',
      type: 'solid',
      css: {
        backgroundColor: 'surface.brand.default',
        color: 'static.white',
        _hover: {
          '&:not(:disabled)': {
            backgroundColor: 'surface.brand.default-hover',
          },
        },
        '&[data-disabled]': disabledStyles,
      },
    },

    // ── Color: neutral + ghost ─────────────────────────────────────
    {
      color: 'neutral',
      type: 'ghost',
      css: {
        backgroundColor: 'transparent',
        color: 'content.neutral.default',
        _hover: {
          '&:not(:disabled)': {
            backgroundColor: 'surface.transparent-hover',
          },
        },
        _focusVisible: {
          backgroundColor: 'surface.transparent-hover',
          boxShadow:
            '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
        },
        '&[data-disabled]': disabledStyles,
      },
    },

    // ── Color: neutral + outline ───────────────────────────────────
    {
      color: 'neutral',
      type: 'outline',
      css: {
        backgroundColor: 'transparent',
        color: 'content.neutral.default',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'border.neutral.default',
        transition:
          'background-color 150ms ease-out, border-color 150ms ease-out',
        _hover: {
          '&:not(:disabled)': {
            backgroundColor: 'surface.transparent-hover',
            borderColor: 'border.neutral.default-hover',
          },
        },
        _focusVisible: {
          backgroundColor: 'surface.transparent-hover',
          boxShadow:
            '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
        },
        '&[data-disabled]': {
          ...disabledStyles,
          borderColor: 'border.disabled',
        },
      },
    },

    // ── Standard type (bare icon, no bg/padding) ───────────────────
    // Must be LAST — overrides layout compounds above
    {
      type: 'standard',
      css: {
        padding: '0',
        backgroundColor: 'transparent',
        borderRadius: '0',
        color: 'content.neutral.subtle',
        transition: 'color 150ms ease-out',
        _hover: {
          '&:not(:disabled)': {
            color: 'content.neutral.default',
          },
        },
        _focusVisible: {
          backgroundColor: 'surface.transparent-hover',
          borderRadius: 'r100',
          color: 'content.neutral.default',
          boxShadow:
            '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
        },
        '&[data-disabled]': {
          cursor: 'not-allowed',
          color: 'content.disabled',
          backgroundColor: 'transparent',
        },
      },
    },
  ],
  defaultVariants: {
    color: 'brand',
    type: 'solid',
    shape: 'square',
    size: 'medium',
  },
});
