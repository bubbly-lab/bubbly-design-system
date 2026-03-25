import { defineRecipe } from '@pandacss/dev';

const disabledStyles = {
  cursor: 'not-allowed',
  backgroundColor: 'surface.disabled',
  color: 'content.disabled',
} as const;

export const buttonRecipe = defineRecipe({
  className: 'button',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans',
    fontWeight: 'semibold',
    cursor: 'pointer',
    overflow: 'clip',
    position: 'relative',
    transition: 'background-color 150ms ease-out',
    outline: 'none',
    border: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
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
      critical: {},
    },
    type: {
      solid: {},
      weak: {},
      outline: {},
    },
    size: {
      large: {
        paddingInline: '24',
        paddingBlock: '14',
        borderRadius: 'r300',
        fontSize: 't6',
        lineHeight: 't6',
        gap: '4',
        '--button-icon-size': '24px',
      },
      medium: {
        paddingInline: '20',
        paddingBlock: '12',
        borderRadius: 'r300',
        fontSize: 't6',
        lineHeight: 't6',
        gap: '4',
        '--button-icon-size': '24px',
      },
      small: {
        paddingInline: '16',
        paddingBlock: '10',
        borderRadius: 'r250',
        fontSize: 't4',
        lineHeight: 't4',
        gap: '4',
        '--button-icon-size': '20px',
      },
    },
  },
  compoundVariants: [
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
    {
      color: 'brand',
      type: 'weak',
      css: {
        backgroundColor: 'surface.brand.subtle',
        color: 'content.brand.default',
        _hover: {
          '&:not(:disabled)': { backgroundColor: 'surface.brand.subtle-hover' },
        },
        '&[data-disabled]': disabledStyles,
      },
    },
    {
      color: 'neutral',
      type: 'weak',
      css: {
        backgroundColor: 'surface.neutral.default',
        color: 'content.neutral.default',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          backgroundColor: 'state-layer.neutral-hover',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 150ms ease-out',
        },
        _hover: {
          '&:not(:disabled)::after': { opacity: 1 },
        },
        '&[data-disabled]': disabledStyles,
      },
    },
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
        '&[data-disabled]': {
          ...disabledStyles,
          borderColor: 'transparent',
        },
      },
    },
    {
      color: 'critical',
      type: 'solid',
      css: {
        backgroundColor: 'surface.critical.default',
        color: 'static.white',
        _hover: {
          '&:not(:disabled)': {
            backgroundColor: 'surface.critical.default-hover',
          },
        },
        '&[data-disabled]': disabledStyles,
      },
    },
  ],
  defaultVariants: {
    color: 'brand',
    type: 'solid',
    size: 'medium',
  },
});
