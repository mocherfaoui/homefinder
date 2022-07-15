/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Image from 'next/future/image';
import Head from 'next/head';
import NextLink from 'next/link';
import { Link } from '@nextui-org/react';
import { Cross as Hamburger } from 'hamburger-react';

import { FlexDiv, Wrapper } from '@/components/GlobalComponents';

import logo from '@/public/hF.svg';

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
        <style type='text/css'>
          {`
    .hamburger-react{
        display:none;
    }
    @media screen and (max-width: 640px){
        .hamburger-react{
            display:inline-block;
            right:10px;
        }
        
    }
    `}
        </style>
      </Head>
      <HeaderContainer isOpen={isOpen}>
        <Wrapper css={{ '@xsMax': { p: '0 $8' } }}>
          <NavBar>
            <Hamburger
              direction='right'
              size={24}
              toggled={isOpen}
              toggle={handleToggle}
            />
            <FlexDiv css={{ ai: 'center', cursor: 'pointer' }}>
              <NextLink href='/' passHref>
                <Link>
                  <Image
                    width={150}
                    height={50}
                    src={logo}
                    alt='logo'
                    priority
                  />
                </Link>
              </NextLink>
            </FlexDiv>
            <NavMenu />
          </NavBar>
          <NavItems isOpen={isOpen} />
        </Wrapper>
      </HeaderContainer>
    </>
  );
}
