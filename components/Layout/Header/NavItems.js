import NextLink from 'next/link';

import { navLinks } from '@/lib/constants';

import { NavContainer, NavItem } from './HeaderStyles';

export default function NavItems({ isOpen }) {
  return (
    <NavContainer isOpen={isOpen}>
      {navLinks.map(({ href, text }, index) => (
        <NextLink key={index} href={href} passHref>
          <NavItem block>{text}</NavItem>
        </NextLink>
      ))}
    </NavContainer>
  );
}
