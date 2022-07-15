import Skeleton from 'react-loading-skeleton';
import NextLink from 'next/link';
import { PlusSmIcon } from '@heroicons/react/outline';
import { Avatar, Button, Grid, Popover } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';

import 'react-loading-skeleton/dist/skeleton.css';

import { HeroIcon } from '@/components/GlobalComponents';

import { CTAButtons } from './HeaderStyles';
import NavItems from './NavItems';
import UserDropDown from './UserDropDown';

export default function NavMenu() {
  const { data: session, status } = useSession();

  return (
    <>
      <NavItems />
      <CTAButtons>
        {status === 'loading' && (
          <>
            <Grid
              xs={12}
              css={{
                '@md': {
                  d: 'block!important',
                  minWidth: '100px',
                },
                '@xsMax': {
                  d: 'none!important',
                },
              }}
            >
              <Skeleton borderRadius={14} height={40} />
            </Grid>
            <Grid
              xs={12}
              css={{
                d: 'block!important',
                minWidth: '40px',
              }}
            >
              <Skeleton circle height={40} />
            </Grid>
          </>
        )}
        {status === 'authenticated' && (
          <>
            <Grid xs={0} sm={12}>
              <NextLink href='/listing/new' passHref>
                <Button
                  as='a'
                  auto
                  icon={
                    <HeroIcon>
                      <PlusSmIcon />
                    </HeroIcon>
                  }
                >
                  List
                </Button>
              </NextLink>
            </Grid>
            <Popover placement='bottom-right' disableAnimation>
              <Popover.Trigger>
                <Avatar
                  pointer
                  size='md'
                  src={session?.user.image}
                  referrerPolicy='no-referrer'
                  text={session?.user?.name?.split(' ')[0][0]}
                />
              </Popover.Trigger>
              <Popover.Content>
                <UserDropDown session={session} />
              </Popover.Content>
            </Popover>
          </>
        )}
        {status === 'unauthenticated' && (
          <Button auto onClick={signIn}>
            Sign in
          </Button>
        )}
      </CTAButtons>
    </>
  );
}
