import { defineSlotRecipe } from '@pandacss/dev';

export const cardHeaderRecipe = defineSlotRecipe({
  className: 'card-header',
  slots: [
    'root',
    'caption',
    'title',
    'bottom',
    'metadata',
    'item',
    'separator',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '200px',
      minWidth: '0',
    },
    caption: {
      width: '100%',
      minWidth: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'content.neutral.default',
      fontFamily: 'sans',
      fontSize: 't4',
      lineHeight: 't4',
      fontWeight: 'regular',
      order: 1,
    },
    title: {
      width: '100%',
      minWidth: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'content.neutral.strong',
      fontFamily: 'sans',
      fontSize: 't6',
      lineHeight: 't7',
      fontWeight: 'bold',
      order: 2,
    },
    bottom: {
      width: '100%',
      minWidth: '0',
      marginTop: '4',
      order: 3,
    },
    metadata: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      gap: '4',
      width: '100%',
      minWidth: '0',
      overflow: 'hidden',
    },
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
      gap: '4',
      paddingBlock: '2',
      color: 'content.brand.default',
      fontFamily: 'sans',
      fontSize: 't4',
      lineHeight: 't4',
      fontWeight: 'regular',
    },
    separator: {
      display: 'inline-flex',
      alignItems: 'center',
      color: 'content.brand.default',
      fontFamily: 'sans',
      fontSize: 't4',
      lineHeight: 't4',
      fontWeight: 'regular',
    },
  },
  variants: {
    captionPosition: {
      bottom: {
        caption: {
          order: 2,
        },
        title: {
          order: 1,
        },
      },
      none: {
        caption: {
          display: 'none',
        },
      },
    },
    hasBottom: {
      true: {},
      false: {
        bottom: {
          display: 'none',
        },
      },
    },
  },
  defaultVariants: {
    captionPosition: 'bottom',
    hasBottom: true,
  },
});
