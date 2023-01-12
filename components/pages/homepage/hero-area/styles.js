import { Button, styled } from '@nextui-org/react';

export const PurchaseTypeButton = styled(Button, {
  color: '$text!important',
  backgroundColor: '$gray400!important',
  bbrr: 0,
  bblr: 0,
  variants: {
    purchaseType: {
      rent: {
        backgroundColor: '$yellow400!important',
      },
      sale: {
        backgroundColor: '$yellow400!important',
      },
    },
  },
});
