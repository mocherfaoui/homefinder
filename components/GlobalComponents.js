import Select from 'react-select';
import { Grid, keyframes, styled, Text } from '@nextui-org/react';

export const MainWrapper = styled('div', {
  w: '100%',
  '@md': {
    p: '0',
  },
  main: {
    pt: '6.5rem',
    '@md': {
      pt: '7.5rem',
    },
  },
});
export const Wrapper = styled('div', {
  m: '0 auto',
  maxWidth: '82rem',
  w: '100%',
  p: '0 $8',
});
export const ReactSelect = styled(Select, {
  '&  .react-select__control': {
    border: 0,
    py: '$1',
    pl: '$5',
    outline: 0,
    boxShadow: 'none',
    color: '$text',
    background: '$accents0',
    br: '$lg',
  },
  '& .react-select__value-container': { pl: 0, py: 0 },
  '& .react-select__indicator-separator': { mt: '8px' },
  '& .react-select__menu': {
    zIndex: '1000',
    br: '$sm',
  },
});
export const Label = styled('label', {
  display: 'block',
  fontSize: '$sm',
  padding: '0 0 0 $2',
  mb: '$3',
  lineHeight: '$md',
  color: '$black',
});
export const NormalSelect = styled('select', {
  fs: '$sm',
  border: 0,
  p: '$2 $5',
  outline: 0,
  boxShadow: 'none',
  color: '$text',
  background: '$accents0',
  br: '$md',
  h: '40px',

  '& option': {
    br: '$md',
  },
});
export const HeroIcon = styled('span', {
  d: 'inline-flex',
  ai: 'center',
  '& svg': {
    size: '$9',
    flexShrink: 0,
    display: 'block',
    verticalAlign: 'middle',
  },
});
export const ContactDetails = styled(Text, {
  d: 'flex',
  ai: 'center',
  jc: 'center',
  gap: '$2',
  border: '$borderWeights$normal solid $gray300',
  p: '$5',
  br: '$lg',
  w: '100%',
});
export const FlexText = styled(Text, {
  d: 'flex',
  ai: 'center',
  gap: '$3',
});
export const PropertyFeatures = styled(FlexText, {
  fs: '$base',
  '@md': {
    fs: '$lg',
  },
  fontWeight: '$semibold',
});
export const ImageGalleryContainer = styled('div', {
  '& .swiper > .swiper-pagination': {
    p: '$5',
    br: '$sm',
    bg: '$white',
  },
});
export const TopButtonsContainer = styled('div', {
  d: 'flex',
  ai: 'center',
  gap: '$3',
  '& button': {
    borderWidth: '$light',
    bg: 'transparent',
    br: '$rounded',
    p: '$4',
    color: '$gray800',
    borderColor: '$gray400',
  },
  '& button:hover': {
    bg: '$gray50',
    borderColor: '$gray500',
  },
  variants: {
    color: {
      white: {
        '& button': {
          bg: '$accents0',
          color: '$text',
        },
        '& button:hover': {
          bg: '$accents1',
        },
      },
    },
  },
});
export const TextTruncate = styled(Text, {
  wordBreak: 'break-word',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
});
export const VerticalLine = styled('div', {
  width: '1px',
  bg: '$border',
  h: '100%',
  float: 'left',
  mx: 'auto',
});
export const SliderContainer = styled('div', {
  width: '100%',
  '& .swiper': {
    p: '$5',
  },
});

export const FilterContainer = styled('div', {
  d: 'flex',
  fd: 'row',
  gap: '$3',
});
export const FilterSliderContainer = styled('div', {
  w: '100%',
});
export const RatingContainer = styled('div', {
  d: 'flex',
  '& > span > span > .empty-icons': {
    d: 'inline-flex!important',
  },
  '& > span >.react-simple-star-rating': {
    d: 'flex!important',
  },
});
export const FlexDiv = styled('div', {
  d: 'flex',
});
export const ArrowIcon = styled(FlexText, {
  borderWidth: '$normal',
  bg: '$white',
  br: '$rounded',
  p: '$6',
  color: '$gray800',
  borderColor: '$gray400',
  borderStyle: 'solid',
  cursor: 'pointer',
  position: 'absolute',
  zIndex: 10,
  top: '50%',
  '&:hover': {
    bg: '$gray50',
    borderColor: '$gray500',
  },
  '& .swiper-button-disabled': {
    opacity: 0.5,
  },
  variants: {
    arrow: {
      left: {
        left: '5px',
      },
      right: {
        right: '5px',
      },
    },
  },
});
export const FeatureIcon = styled(HeroIcon, {
  borderRadius: '$squared',
  bg: '$white',
  bs: '-2px -2px 6px rgb(255 255 255 / 13%), inset 2px 2px 6px rgb(0 0 0 / 10%), 2px 2px 8px rgb(0 0 0 / 6%);',
  p: '$5',
  '& svg': {
    size: '$15',
  },
});
export const ListContainer = styled('ul', {
  '& li': {
    listStyle: 'none',
  },
});
export const MessageContainer = styled('div', {
  p: '6px 7px 8px 9px',
  br: '$sm',
  maxW: '75%',
  '@md': { maxW: '43%' },
  position: 'relative',
  h: 'fit-content',
  variants: {
    message: {
      in: {
        bg: '$blue100',
        btlr: 0,
        '&::after': {
          w: 0,
          h: 0,
          content: '',
          position: 'absolute',
          top: '0',
          left: '-9px',
          right: 'auto',
          borderColor: 'transparent $blue100 transparent transparent',
          borderStyle: 'solid',
          borderWidth: '0px 10px 10px 0px',
        },
      },
      out: {
        btrr: 0,
        bg: '$green100',
        '&::after': {
          w: '0%',
          h: 0,
          content: '',
          position: 'absolute',
          top: '0',
          right: '-9px',
          left: 'auto',
          borderColor: 'transparent transparent transparent $green100',
          borderStyle: 'solid',
          borderWidth: '0px 0px 10px 10px',
        },
      },
    },
    isSameAuthor: {
      true: {
        btrr: '$sm',
        btlr: '$sm',
        '&::after': {
          display: 'none',
        },
      },
    },
  },
});
export const Div = styled('div', {});

const zoomUp = keyframes({
  '0%': { transform: 'scaleX(0) scaleY(0)' },
  '100%': { transform: 'scaleX(1) scaleY(1)' },
});
const zoomDown = keyframes({
  '0%': { transform: 'scaleX(1) scaleY(1)', opacity: 1 },
  '100%': { transform: 'scaleX(0) scaleY(0)', opacity: 0 },
});
export const ScrollToBottomButton = styled('div', {
  position: 'absolute',
  bottom: '5px',
  right: '15px',
  d: 'inline-flex',
  fd: 'column',
  p: '$5',
  br: '$rounded',
  border: '$borderWeights$normal solid $gray300',
  bg: '$gray50',
  zIndex: 10,
  variants: {
    visible: {
      true: {
        animation: `${zoomUp} .3s`,
        opacity: 1,
        cursor: 'pointer',
      },
      false: {
        animation: `${zoomDown} .3s`,
        opacity: 0,
      },
    },
  },
});
export const MessageDate = styled(Text, {
  fontSize: '0.67rem',
  '@md': {
    fontSize: '0.72rem',
  },
  lineHeight: 'normal',
  bg: '$gray50',
  color: '$gray800!important',
  px: '$4',
  py: '$2',
  m: '0!important',
  br: '$sm',
  fontWeight: '$medium',
  border: '$borderWeights$normal solid $border',
});
export const FiltersArrow = styled(Grid, {
  p: 0,
  position: 'absolute',
  top: 0,
  height: '100%',
  ai: 'center',
  variants: {
    arrow: {
      left: {
        left: '5px',
        '&::after': {
          zIndex: 200,
          content: '',
          height: '60%',
          width: '32px',
          background:
            'linear-gradient(to right,$white,$gray50 10%,rgba(249,249,249,0) 90%)',
        },
      },
      right: {
        right: '5px',
        '&::before': {
          zIndex: 200,
          content: '',
          height: '60%',
          width: '32px',
          background:
            'linear-gradient(to left,$white,$gray50 10%,rgba(249,249,249,0) 90%)',
        },
      },
    },
  },
});
