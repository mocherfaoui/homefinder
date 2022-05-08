import Select from 'react-select';
import { styled } from '@nextui-org/react';

export const Wrapper = styled('div', {
  maxWidth: '64rem',
  margin: '0 auto',
  padding: '0 $8',
  '@xs': {
    padding: '0',
  },
  main: {
    paddingTop: '$28',
  },
});
export const ReactSelect = styled(Select, {
  '&  .react-select__control': {
    border: 0,
    py: '$1',
    pl: '$5',
    outline: 0,
    boxShadow: 'none',
    color: '$text',
    background: '$accents1',
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
  fontSize: '$xs',
  padding: '0 0 0 $2',
  mb: '$3',
  lineHeight: '$md',
  color: '$black',
});
export const NormalSelect = styled('select', {
  border: 0,
  p: '$2 $5',
  outline: 0,
  boxShadow: 'none',
  color: '$text',
  background: '$accents1',
  br: '$md',
  h: '40px',
  '@sm': {
    mr: '$5',
  },
  '& option': {
    br: '$md',
  },
});
