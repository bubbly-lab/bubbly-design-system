import { defineRecipe } from '@pandacss/dev';

export const thumbnailRecipe = defineRecipe({
  className: 'thumbnail',
  base: {
    position: 'relative',
    display: 'block',
    overflow: 'clip',
    flexShrink: 0,
    isolation: 'isolate',
    // img 기본 배치는 recipe에서 소유한다(이전에는 컴포넌트 인라인 스타일).
    // 인라인 스타일은 _groupHover overscan보다 우선도가 높아 zoom을 덮어쓴다.
    '& [data-part=img]': {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
      objectFit: 'cover',
    },
  },
  variants: {
    ratio: {
      '1:1': { aspectRatio: '1 / 1' },
      '3:4': { aspectRatio: '3 / 4' },
    },
    radius: {
      '8px': { borderRadius: 'r200' },
      '16px': { borderRadius: 'r400' },
      full: { borderRadius: 'full' },
    },
    // Figma renders a 1px inner border on every Thumbnail variant, but many
    // host compositions (small icon rows, skeleton placeholders) want no
    // border. Expose it as opt-in so consumers can match Figma explicitly.
    hasBorder: {
      true: {
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'border.neutral.subtle',
          pointerEvents: 'none',
          zIndex: 1,
        },
      },
      false: {},
    },
    // Figma zoom은 고정 비율 scale이 아니라 컨테이너 크기와 무관하게 이미지를
    // 좌우·상하 8px씩 넘치게(overscan) 키운다. 따라서 작은 썸네일(예: HorizontalCard
    // 96px → 1.167배)은 큰 썸네일(VerticalCard 300px → 1.053배)보다 비율이 크다.
    // transform: scale(고정비율)로는 이 모델을 재현할 수 없어, hover 시 img를
    // 사방 8px씩 키우고 inset:-8px로 중앙 정렬해 항상 8px overscan을 보장한다.
    zoomed: {
      true: {
        '& [data-part=img]': {
          transition:
            'inset 150ms ease-out, width 150ms ease-out, height 150ms ease-out',
        },
        _groupHover: {
          '& [data-part=img]': {
            inset: '-8px',
            width: 'calc(100% + 16px)',
            height: 'calc(100% + 16px)',
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    ratio: '1:1',
    radius: '8px',
    hasBorder: false,
    zoomed: false,
  },
});
