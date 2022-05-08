import { styled } from '@nextui-org/react';

export const Container = styled('div', {
  p: '$15',
  border: '$borderWeights$normal dashed $gray300',
  br: '$lg',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'border-color 0.15s cubic-bezier(.4,0,.2,1);',
  '&:hover': {
    borderColor: '$gray400',
  },
});
