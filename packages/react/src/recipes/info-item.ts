import { defineSlotRecipe } from '@pandacss/dev';

export const infoItemRecipe = defineSlotRecipe({
  className: 'info-item',
  slots: ['root', 'icon', 'label'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4',
      paddingBlock: '2',
      flexShrink: 0,
      minWidth: '0',
      color: 'inherit',
    },
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontSize: '16px',
      color: 'inherit',
    },
    label: {
      textStyle: 'label2-regular',
      color: 'inherit',
      minWidth: '0',
    },
  },
});
