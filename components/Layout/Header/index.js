/* eslint-disable @next/next/no-img-element */
import Image from 'next/future/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link, Navbar } from '@nextui-org/react';

import { navLinks } from '@/lib/constants';

import logo from '@/public/hF.svg';

import CTAButtons from './CTAButtons';

export default function Header() {
  const { pathname } = useRouter();
  return (
    <Navbar
      variant='sticky'
      css={{
        '& .nextui-navbar-container': {
          maxWidth: '82rem',
          px: '$8',
        },
      }}
    >
      <Navbar.Brand css={{ ai: 'center', cursor: 'pointer' }}>
        <NextLink href='/' passHref>
          <Link>
            <Image width={150} height={50} src={logo} alt='logo' priority />
          </Link>
        </NextLink>
      </Navbar.Brand>
      <Navbar.Content
        hideIn='xs'
        gap='$18'
        variant='underline-rounded'
        enableCursorHighlight
      >
        {navLinks.map(({ href, text }, index) => (
          <NextLink key={index} href={href} passHref>
            <Navbar.Link
              isActive={pathname === href}
              css={{ fs: '$lg!important', fontWeight: '$semibold!important' }}
            >
              {text}
            </Navbar.Link>
          </NextLink>
        ))}
      </Navbar.Content>
      <Navbar.Content gap='$6'>
        <CTAButtons />
        <Navbar.Toggle
          showIn='xs'
          hideIn='mdMin'
          aria-label='toggle navigation'
        />
      </Navbar.Content>
      <Navbar.Collapse>
        {navLinks.map(({ href, text }, index) => (
          <Navbar.CollapseItem key={index}>
            <Link
              color='inherit'
              css={{
                minWidth: '100%',
              }}
              href={href}
            >
              {text}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
