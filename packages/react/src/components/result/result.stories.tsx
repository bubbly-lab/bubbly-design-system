import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Result } from './result';

const PlaceholderGraphic = () => (
  <svg
    width="140"
    height="80"
    viewBox="0 0 140 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.3535 73.6667V28.1562H90.0719C92.6512 31.7034 93.9306 35.7675 93.9306 40.3976C93.9306 44.1695 92.9984 47.6753 91.1264 50.9455C89.3049 54.113 86.8467 56.6365 83.7328 58.5363L83.0903 58.9283C82.6906 59.1722 82.4908 59.2941 82.4586 59.4901C82.4265 59.6861 82.577 59.8654 82.8779 60.2238L93.5103 72.8871C93.6992 73.1996 93.808 73.5661 93.808 73.958C93.808 75.1019 92.8817 76.0293 91.7392 76.0293L91.702 76.029L81.9366 76.0303V76.0338H55.2072V76.0303H50.5459C49.3205 75.942 48.3537 74.9187 48.3537 73.6693L48.3535 73.6667Z"
      fill="#8566FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.3535 28.1586L48.3537 73.6693L48.3535 73.6716C48.3535 74.9279 49.331 75.9556 50.5661 76.0339H91.9023C92.9688 75.9509 93.8083 75.0581 93.8083 73.969C93.8083 73.3902 93.5712 72.8669 93.1889 72.491H93.3067L83.1485 60.4125C82.9216 60.1427 82.7621 59.9531 82.6787 59.7915L56.1517 28.1586H48.3535Z"
      fill="url(#paint0_linear_6218_663)"
      fillOpacity="0.8"
    />
    <path
      d="M90.4982 28.1562H48.3535L48.3538 37.0908H93.8447L92.7292 32.6235L90.4982 28.1562Z"
      fill="url(#paint1_linear_6218_663)"
    />
    <path
      d="M69.7959 5.44067C82.0654 5.44068 92.0117 15.387 92.0117 27.6565H47.5801C47.5801 15.387 57.5264 5.44067 69.7959 5.44067Z"
      fill="#E29F09"
    />
    <path
      d="M69.7959 5.44373C71.9653 5.44373 74.0619 5.75554 76.0439 6.33533L74.9902 12.222L79.6074 26.2142C79.8823 23.0732 80.7666 16.0609 82.3379 9.32166C88.179 13.3243 92.0117 20.0439 92.0117 27.6595H47.5801C47.5801 20.0432 51.4129 13.3222 57.2549 9.3197C58.8265 16.0596 59.7114 23.0729 59.9863 26.2142L64.6035 12.222L63.5488 6.33533C65.5306 5.75571 67.6268 5.44373 69.7959 5.44373Z"
      fill="#FFC537"
    />
    <path
      d="M59.8563 24.819H47.7567C47.8161 24.3464 47.8907 23.8785 47.9794 23.4156H59.6962C59.7561 23.9183 59.8106 24.3876 59.8563 24.819ZM79.162 24.819H60.4354L60.8983 23.4156H78.6991L79.162 24.819ZM91.6151 23.4156C91.7038 23.8786 91.7793 24.3463 91.8387 24.819H79.7411C79.7868 24.3876 79.8414 23.9183 79.9012 23.4156H91.6151Z"
      fill="#E29F09"
    />
    <path
      d="M69.7959 4C72.0005 4 74.13 4.32138 76.1402 4.9196C78.3298 5.57116 79.6094 7.72671 79.6094 10.0111V20.2158C79.6094 23.5295 76.9231 26.2158 73.6094 26.2158H65.9883C62.6746 26.2158 59.9883 23.5295 59.9883 20.2158V10.0094C59.9883 7.72437 61.2686 5.56832 63.459 4.91736C65.4671 4.32058 67.594 4 69.7959 4Z"
      fill="#FFCA51"
    />
    <rect
      x="45"
      y="24.8219"
      width="49.5938"
      height="5.14652"
      rx="2.57326"
      fill="#FFB619"
    />
    <rect
      x="57.8652"
      y="24.1188"
      width="22.6915"
      height="0.701798"
      fill="#E29F09"
    />
    <path
      d="M18.9489 39.1675L22.5252 43.2934C24.1714 45.3056 26.0145 47.1486 28.0266 48.7949L36.2903 55.2714C37.4188 56.1559 37.8108 57.6893 37.246 59.0072C36.8014 60.0445 35.9747 60.8712 34.9375 61.3157C33.6197 61.8802 32.0868 61.4876 31.2024 60.3593L24.7259 52.0957C23.0796 50.0836 21.2365 48.2405 19.2244 46.5942L15.0978 43.0186L11.2474 39.7178L15.6488 35.3164L18.9489 39.1675ZM32.7036 56.7699C32.096 57.3776 32.096 58.3636 32.7036 58.9713C33.3113 59.5789 34.2967 59.5783 34.9044 58.9706C35.5119 58.363 35.5119 57.3782 34.9044 56.7706C34.2967 56.163 33.3113 56.1624 32.7036 56.7699Z"
      fill="#BABACB"
    />
    <g filter="url(#filter0_d_6218_663)">
      <path
        d="M18.9507 39.1683L18.9935 39.218C18.5938 40.1984 18.0701 41.0358 17.6097 41.6114L13.483 37.4848L15.6506 35.3172L18.9507 39.1683ZM17.6069 41.61C17.012 42.0858 16.1369 42.6281 15.1141 43.0325L15.0996 43.0194L11.2491 39.7186L13.4823 37.4854L17.6069 41.61Z"
        fill="#BABACB"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7787 30.3766C10.2532 29.8511 10.4853 29.0081 11.2283 29.0004C12.9668 28.9831 15.4989 29.5959 17.8864 31.9835C21.1869 35.2843 19.0786 39.7771 17.6116 41.6109L12.9353 36.9346C14.0162 35.8536 14.1873 34.6987 14.1133 34.0136C14.0858 33.7593 13.9413 33.5392 13.7605 33.3583L10.7787 30.3766ZM4.99897 35.2269C5.00657 34.4838 5.84962 34.2518 6.3752 34.7774L9.35692 37.7591C9.53779 37.9399 9.75796 38.0845 10.0122 38.1119C10.6973 38.186 11.8523 38.0147 12.9332 36.9339L17.6088 41.6095C15.7749 43.0765 11.2828 45.1853 7.98207 41.885C5.59455 39.4975 4.98172 36.9654 4.99897 35.2269Z"
      fill="#BABACB"
    />
    <path
      d="M120.393 40.5728L122.863 43.0429L118.664 47.7362L105.812 62.3923C105.08 63.227 103.894 63.496 102.873 63.0586C101.752 62.578 100.858 61.6843 100.378 60.5628C99.9402 59.5423 100.209 58.3563 101.044 57.6243L115.7 44.772L120.393 40.5728Z"
      fill="#BABACB"
    />
    <path
      d="M113.689 47.2751L116.159 49.7452L116.59 50.1759L105.813 62.3973C105.079 63.2292 103.894 63.4962 102.875 63.0592C101.751 62.5779 100.856 61.6812 100.374 60.5581C99.938 59.5398 100.202 58.3549 101.03 57.6191L113.213 46.797L113.689 47.2751Z"
      fill="#6D6D7E"
    />
    <g filter="url(#filter1_d_6218_663)">
      <path
        d="M122.781 43.1905C121.998 43.1688 121.221 42.8627 120.623 42.2652C120.269 41.9107 120 41.503 119.815 41.0685L123.819 37.1428L126.289 39.6129L122.781 43.1905Z"
        fill="#D9D9D9"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M132.531 41.3464C132.921 41.7369 132.921 42.3702 132.531 42.7606L129.005 46.2865C128.615 46.6769 127.981 46.6767 127.591 46.2865L126.041 44.7362C125.65 44.3457 125.65 43.7125 126.041 43.322L125.826 43.5361C126.289 42.8882 125.498 42.091 124.849 42.5417L124.839 42.5514C123.748 43.6425 121.978 43.642 120.887 42.5507L120.618 42.2814C119.13 40.7931 119.13 38.3806 120.618 36.8924L121.337 36.1729C121.203 36.023 121.06 35.8803 120.909 35.7489C118.935 34.0287 117.327 33.1646 116.133 32.7872C115.708 32.653 115.371 31.6042 115.781 31.4296C119.553 29.8243 124.203 33.0224 126.32 35.1378L126.32 35.1371L128.578 37.3944C128.968 37.785 128.968 38.4182 128.578 38.8087L128.791 38.5953C128.326 39.2463 129.128 40.0484 129.779 39.5834L129.566 39.7961C129.957 39.4056 130.59 39.4056 130.981 39.7961L132.531 41.3464Z"
      fill="#BABACB"
    />
    <defs>
      {/* biome-ignore lint/correctness/useUniqueElementIds: SVG internal reference */}
      <filter
        id="filter0_d_6218_663"
        x="7.24915"
        y="32.3171"
        width="15.7444"
        height="15.7153"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_6218_663"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_6218_663"
          result="shape"
        />
      </filter>
      {/* biome-ignore lint/correctness/useUniqueElementIds: SVG internal reference */}
      <filter
        id="filter1_d_6218_663"
        x="113.815"
        y="32.1428"
        width="18.4745"
        height="18.0477"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.215686 0 0 0 0 0.215686 0 0 0 0 0.262745 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_6218_663"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_6218_663"
          result="shape"
        />
      </filter>
      {/* biome-ignore lint/correctness/useUniqueElementIds: SVG internal reference */}
      <linearGradient
        id="paint0_linear_6218_663"
        x1="74.9387"
        y1="31.8688"
        x2="74.9387"
        y2="65.5415"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E7E7E7" stopOpacity="0.4" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      {/* biome-ignore lint/correctness/useUniqueElementIds: SVG internal reference */}
      <linearGradient
        id="paint1_linear_6218_663"
        x1="70.4201"
        y1="28.1569"
        x2="70.4201"
        y2="37.0914"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#413473" stopOpacity="0.78" />
        <stop offset="1" stopColor="#8566FF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const meta: Meta<typeof Result> = {
  title: 'Components/Result',
  component: Result,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: '아직 등록된 후기가 없어요',
    description: '첫번째로 후기를 작성해보세요',
  },
};

export default meta;
type Story = StoryObj<typeof Result>;

export const Default: Story = {};

export const WithBottom: Story = {
  args: {
    bottom: (
      <Button color="brand" type="weak" size="medium">
        후기 작성하기
      </Button>
    ),
  },
};

export const WithVisualItem: Story = {
  args: {
    visualItem: <PlaceholderGraphic />,
    bottom: (
      <Button color="brand" type="weak" size="medium">
        테마 보러가기
      </Button>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: '검색 결과가 없어요',
    description: undefined,
  },
};

export const DescriptionOnly: Story = {
  args: {
    title: undefined,
    description: '잠시 후 다시 시도해주세요',
  },
};

export const ServerMaintenance: Story = {
  args: {
    visualItem: <PlaceholderGraphic />,
    title: '더 나은 서비스를 위한 서버 점검을 하고 있어요',
    description:
      '이용에 불편을 끼쳐 죄송합니다. 서버 점검으로 인해 일시적으로 접속할 수 없습니다. 빠르게 정상화할 수 있도록 최선을 다하겠습니다.',
    bottom: (
      <Button color="brand" type="weak" size="medium">
        메인으로
      </Button>
    ),
  },
};

export const NoSlots: Story = {
  args: {
    title: undefined,
    description: undefined,
    bottom: (
      <Button color="brand" type="weak" size="medium">
        돌아가기
      </Button>
    ),
  },
};
