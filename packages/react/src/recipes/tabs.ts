import { tabsAnatomy } from '@ark-ui/react/anatomy';
import { defineSlotRecipe } from '@pandacss/dev';

export const tabsRecipe = defineSlotRecipe({
  className: 'tabs',
  slots: tabsAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    list: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      minWidth: 0,
      backgroundColor: 'background.default',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'border.neutral.default',
    },
    trigger: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '0',
      paddingInline: '20',
      paddingBlock: '12',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'content.neutral.subtle',
      fontFamily: 'sans',
      fontSize: 't6',
      lineHeight: 't6',
      fontWeight: 'semibold',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      flexShrink: 0,
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '2px',
        backgroundColor: 'surface.neutral.inverse',
        pointerEvents: 'none',
        opacity: 0,
        zIndex: 1,
      },
      _focusVisible: {
        boxShadow:
          '0 0 0 2px var(--colors-neutral-600), 0 0 0 4px var(--colors-neutral-50)',
      },
      '&[data-selected]': {
        color: 'content.neutral.strong',
        '&::after': {
          opacity: 1,
        },
      },
    },
    indicator: {
      display: 'none',
    },
    content: {
      outline: 'none',
      color: 'content.neutral.default',
    },
  },
  variants: {
    layout: {
      scrollable: {
        list: {
          overflowX: 'auto',
          overflowY: 'hidden',
        },
        trigger: {
          flex: '0 0 auto',
        },
      },
      fixed: {
        list: {
          overflow: 'hidden',
        },
        trigger: {
          flex: '1 1 0',
        },
      },
    },
    padded: {
      true: {
        list: {
          paddingInline: '20',
        },
      },
      false: {
        list: {
          paddingInline: '0',
        },
      },
    },
  },
  defaultVariants: {
    layout: 'scrollable',
    padded: true,
  },
});
