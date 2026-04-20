import { defineSlotRecipe } from '@pandacss/dev';

export const autocompleteRecipe = defineSlotRecipe({
  className: 'autocomplete',
  slots: ['root', 'header', 'body'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      fontFamily: 'sans',
    },
    header: {
      width: '100%',
      paddingBlock: '8',
      paddingInline: '0',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
  variants: {
    type: {
      modal: {
        root: {
          width: '586px',
          maxWidth: '586px',
          maxHeight: '560px',
          overflow: 'auto',
          backgroundColor: 'surface.floating.subtle',
          borderRadius: 'r400',
          paddingInline: '24',
          paddingBlock: '16',
        },
      },
      fullScreen: {
        root: {
          width: '100%',
        },
      },
    },
    state: {
      default: {},
      loading: {
        body: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingBlock: '80',
        },
      },
      empty: {},
    },
  },
  defaultVariants: {
    type: 'modal',
    state: 'default',
  },
});
