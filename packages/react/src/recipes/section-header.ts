import { defineSlotRecipe } from '@pandacss/dev';

export const sectionHeaderRecipe = defineSlotRecipe({
  className: 'section-header',
  slots: [
    'root',
    'content',
    'titleRow',
    'title',
    'count',
    'caption',
    'trailing',
    'skeletonStack',
    'skeletonTitle',
    'skeletonCaption',
  ],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      minWidth: '0',
      gap: '0',
    },
    content: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      minWidth: '0',
    },
    titleRow: {
      display: 'inline-flex',
      alignItems: 'end',
      minWidth: '0',
      maxWidth: '100%',
      width: 'fit-content',
    },
    title: {
      minWidth: '0',
      flex: '0 1 auto',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: '2',
      fontFamily: 'sans',
    },
    count: {
      flex: '0 0 auto',
      whiteSpace: 'nowrap',
      fontFamily: 'sans',
      color: 'content.neutral.subtle',
    },
    caption: {
      minWidth: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontFamily: 'sans',
      fontSize: 't4',
      lineHeight: 't4',
      fontWeight: 'regular',
      color: 'content.neutral.subtle',
    },
    trailing: {
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      paddingLeft: '8',
    },
    skeletonStack: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minWidth: '0',
    },
    skeletonTitle: {
      width: '140px',
      flexShrink: 0,
    },
    skeletonCaption: {
      width: '100%',
      height: '14px',
    },
  },
  variants: {
    size: {
      large: {
        content: {
          gap: '4',
        },
        titleRow: {
          gap: '6',
        },
        title: {
          fontSize: 't9',
          lineHeight: 't9',
          fontWeight: 'bold',
          color: 'content.neutral.strong',
        },
        count: {
          fontSize: 't9',
          lineHeight: 't9',
          fontWeight: 'regular',
        },
        skeletonStack: {
          gap: '10px',
        },
        skeletonTitle: {
          height: '34px',
        },
      },
      medium: {
        content: {
          gap: '2',
        },
        titleRow: {
          gap: '4',
        },
        title: {
          fontSize: 't7',
          lineHeight: 't7',
          fontWeight: 'bold',
          color: 'content.neutral.strong',
        },
        count: {
          fontSize: 't7',
          lineHeight: 't7',
          fontWeight: 'regular',
        },
        skeletonStack: {
          gap: '8px',
        },
        skeletonTitle: {
          height: '26px',
        },
      },
      small: {
        content: {
          gap: '2',
        },
        titleRow: {
          gap: '4',
        },
        title: {
          fontSize: 't6',
          lineHeight: 't6',
          fontWeight: 'semibold',
          color: 'content.neutral.default',
        },
        count: {
          fontSize: 't6',
          lineHeight: 't6',
          fontWeight: 'regular',
        },
        skeletonStack: {
          gap: '8px',
        },
        skeletonTitle: {
          height: '24px',
        },
      },
    },
    trailing: {
      none: {
        trailing: {
          display: 'none',
        },
      },
      iconButton: {},
      textButton: {},
    },
  },
  defaultVariants: {
    size: 'large',
    trailing: 'none',
  },
});
