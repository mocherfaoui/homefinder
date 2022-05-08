import { Link, styled } from '@nextui-org/react';

export const HeaderContainer = styled('header', {
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 3000,
  backgroundColor: '$white',
  normalShadow: '$gray100',
  variants: {
    isOpen: {
      true: {
        position: 'fixed',
        height: '100vh',
        '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)':
          {
            backgroundColor: '$white',
            backdropFilter: 'saturate(180%) blur(20px)',
          },
      },
    },
  },
});
export const NavBar = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '$8 0',
  alignItems: 'center',
  '@md': {
    padding: '$10 0',
  },
});
export const NavItem = styled(Link, {
  color: '$text!important',
  fontWeight: '$bold',
  fontSize: '1.1rem',
});
export const NavContainer = styled('nav', {
  display: 'none',
  variants: {
    isOpen: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        [`& ${NavItem}`]: {
          fontSize: '$sm',
          padding: '$8 0',
        },
      },
      false: {
        display: 'none',
      },
    },
  },
  '@xs': {
    display: 'flex',
    gap: '$15',
  },
});
export const CTAButtons = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
});
export const NavMenuWrapper = styled('div', {});
export const DropDownLink = styled(Link, {
  w:'100%',
  ai: 'center',
  gap: '$3',
  br:'$md!important',
  p:'$xs!important',
  '&:hover': {
    bg: '$gray100',
    opacity: '1',
  },
});
