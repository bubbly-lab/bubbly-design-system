import { defineSlotRecipe } from '@pandacss/dev';

export const infoListRecipe = defineSlotRecipe({
  className: 'info-list',
  slots: ['root', 'row', 'dot'],
  base: {
    root: {
      display: 'flex',
      width: '100%',
      minWidth: '0',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      color: 'content.neutral.default',
    },
    row: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4',
      flexShrink: 0,
      color: 'inherit',
    },
    dot: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      textStyle: 'label2-regular',
      color: 'inherit',
      userSelect: 'none',
    },
  },
  variants: {
    direction: {
      horizontal: {
        root: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4',
          overflow: 'visible',
        },
      },
      vertical: {
        root: {
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '8',
        },
        row: {
          width: '100%',
        },
      },
    },
    color: {
      neutral: {
        root: {
          color: 'content.neutral.default',
        },
      },
      brand: {
        root: {
          color: 'content.brand.default',
        },
      },
    },
    // Figma's horizontal InfoList frame wraps (layoutWrap=WRAP) by default.
    // `wrapped` owns the wrap behavior so the default can be wrap with an opt-out.
    wrapped: {
      true: {
        root: {
          flexWrap: 'wrap',
          whiteSpace: 'normal',
        },
      },
      false: {
        root: {
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        },
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    color: 'neutral',
    wrapped: true,
  },
});
