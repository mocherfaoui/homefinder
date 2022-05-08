import NextLink from 'next/link';

import { NavContainer, NavItem } from './HeaderStyles';

export default function NavItems({ isOpen }) {
  return (
    <NavContainer isOpen={isOpen}>
      <NextLink href="/" passHref>
        <NavItem>Buy</NavItem>
      </NextLink>
      <NextLink href="/" passHref>
        <NavItem>Rent</NavItem>
      </NextLink>
      <NextLink href="/" passHref>
        <NavItem>Contact</NavItem>
      </NextLink>
    </NavContainer>
  );
}
