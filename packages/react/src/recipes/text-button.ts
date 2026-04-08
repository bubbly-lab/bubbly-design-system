import { defineRecipe } from '@pandacss/dev';

export const textButtonRecipe = defineRecipe({
  className: 'text-button',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans',
    cursor: 'pointer',
    overflow: 'visible',
    position: 'relative',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'content.neutral.default',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    paddingBlock: '2',
    paddingInline: 0,
    transition: 'color 150ms ease-out',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '-4px',
      right: '-4px',
      borderRadius: 'r100',
      backgroundColor: 'state-layer.neutral-hover',
      pointerEvents: 'none',
      opacity: 0,
      transition: 'opacity 150ms ease-out',
    },
    _hover: {
      '&:not([data-disabled])::before': {
        opacity: 1,
      },
    },
    _focusVisible: {
      '&::before': {
        opacity: 1,
        boxShadow:
          '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
      },
    },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      color: 'content.disabled',
    },
  },
  variants: {
    size: {
      large: {
        fontSize: 't6',
        lineHeight: 't6',
        fontWeight: 'semibold',
        '--text-button-icon-size': '20px',
      },
      medium: {
        fontSize: 't6',
        lineHeight: 't6',
        fontWeight: 'regular',
        '--text-button-icon-size': '20px',
      },
      small: {
        fontSize: 't4',
        lineHeight: 't4',
        fontWeight: 'semibold',
        '--text-button-icon-size': '20px',
      },
      xsmall: {
        fontSize: 't2',
        lineHeight: 't2',
        fontWeight: 'regular',
        '--text-button-icon-size': '16px',
      },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});
