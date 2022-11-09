import Skeleton from 'react-loading-skeleton';
import NextLink from 'next/link';
import { Avatar, Button, Grid, Navbar, Popover } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';

import 'react-loading-skeleton/dist/skeleton.css';

import UserDropDown from './UserDropDown';

export default function CTAButtons() {
  const { data: session, status } = useSession();

  return (
    <>
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
          <Navbar.Item hideIn='xs'>
            <NextLink href='/listing/new' passHref>
              <Button auto as='a' onClick={(e) => e?.preventDefault()}>
                List
              </Button>
            </NextLink>
          </Navbar.Item>
          <Popover placement='bottom-right'>
            <Navbar.Item>
              <Popover.Trigger>
                <Avatar
                  pointer
                  size='md'
                  src={session?.user.image}
                  referrerPolicy='no-referrer'
                  text={session?.user?.name?.split(' ')[0][0]}
                />
              </Popover.Trigger>
            </Navbar.Item>
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
    </>
  );
}
