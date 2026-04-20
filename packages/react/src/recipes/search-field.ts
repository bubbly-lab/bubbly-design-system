import { defineSlotRecipe } from '@pandacss/dev';

export const searchFieldRecipe = defineSlotRecipe({
  className: 'search-field',
  slots: ['root', 'icon', 'input', 'clearButton'],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: '8',
      paddingInline: '12',
      paddingBlock: '12',
      borderRadius: 'r300',
      backgroundColor: 'surface.neutral.subtle',
      cursor: 'text',
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
        pointerEvents: 'none',
        transition: 'border-color 150ms ease-out',
      },
      _hover: {
        '&::after': {
          borderColor: 'border.neutral.subtle-hover',
        },
      },
      _focusWithin: {
        boxShadow:
          '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
      },
    },
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: '24px',
      color: 'content.neutral.subtle',
    },
    input: {
      flex: '1',
      minWidth: '0',
      width: '100%',
      padding: '0',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      color: 'content.neutral.strong',
      fontFamily: 'sans',
      textStyle: 'label1-regular',
      _placeholder: {
        color: 'content.neutral.subtle',
      },
      // type="search" ships a native clear affordance in WebKit — hide it; we render our own.
      '&::-webkit-search-cancel-button': {
        appearance: 'none',
      },
      '&::-webkit-search-decoration': {
        appearance: 'none',
      },
    },
    clearButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
  },
});
