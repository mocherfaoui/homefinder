/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';

import { Wrapper } from '@/components/GlobalComponents';

import { HeaderContainer, NavBar } from './HeaderStyles';
import NavItems from './NavItems';
import NavMenu from './NavMenu';

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Head>
        <style type="text/css">
          {`
    .hamburger-react{
        display:none;
    }
    @media screen and (max-width: 640px){
        .hamburger-react{
            display:inline-block;
        }
    }
    `}
        </style>
      </Head>
      <HeaderContainer isOpen={isOpen}>
        <Wrapper>
          <NavBar>
            <NextLink href="/" passHref>
              <img src="/logo.svg" alt="logo" />
            </NextLink>
            <NavMenu isOpen={isOpen} handleToggle={handleToggle} />
          </NavBar>
          <NavItems isOpen={isOpen} />
        </Wrapper>
      </HeaderContainer>
    </>
  );
}
