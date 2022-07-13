import Skeleton from 'react-loading-skeleton';
import NextLink from 'next/link';
import {
  ChatIcon,
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusSmIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Popover,
  Text,
  User,
} from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';

import 'react-loading-skeleton/dist/skeleton.css';

import { popOverMenu } from '@/lib/constants';
import useMediaQuery from '@/hooks/useMediaQuery';

import { HeroIcon } from '@/components/GlobalComponents';

import { CTAButtons, DropDownLink } from './HeaderStyles';
import NavItems from './NavItems';

export default function NavMenu() {
  const { data: session, status } = useSession();
  const isMobile = useMediaQuery(
    '(max-width: 650px) and (orientation: portrait)'
  );
  const icons = [
    { icon: <PlusSmIcon /> },
    { icon: <HomeIcon /> },
    { icon: <HeartIcon /> },
    { icon: <ChatIcon /> },
  ];
  const popOverMenuWithIcons = popOverMenu.map((menuItem, index) => ({
    ...menuItem,
    icon: icons[index].icon,
  }));
  !isMobile && popOverMenuWithIcons.shift();
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
            <Popover placement='bottom-right'>
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
                <Card>
                  <Card.Header css={{ fd: 'column' }}>
                    <User
                      css={{ pr: '$sm', pl: 0 }}
                      src={session.user.image}
                      name={session.user.name}
                      text={session?.user?.name?.split(' ')[0][0]}
                      description={session.user.email}
                      referrerPolicy='no-referrer'
                    />
                    {!session?.user?.agencyId && (
                      <NextLink href='/agency/new' passHref>
                        <DropDownLink
                          block
                          color='default'
                          css={{
                            fs: '$sm',
                            mt: '$6',
                            border: '$borderWeights$light solid $primary',
                          }}
                        >
                          <HeroIcon>
                            <SwitchVerticalIcon />
                          </HeroIcon>
                          Switch account to Agency
                        </DropDownLink>
                      </NextLink>
                    )}
                    {session?.user?.agencyId && (
                      <Text
                        css={{
                          fs: '$sm',
                          mt: '$6',
                          border: '$borderWeights$light solid $gray400',
                          br: '$xl',
                          p: '$xs',
                        }}
                      >
                        Agency Account
                      </Text>
                    )}
                  </Card.Header>
                  <Divider />
                  <Card.Body css={{ p: '$sm', py: '$xs' }}>
                    {popOverMenuWithIcons.map((menuItem, index) => (
                      <NextLink key={index} href={menuItem.href} passHref>
                        <DropDownLink block color='text'>
                          <HeroIcon>{menuItem.icon}</HeroIcon>
                          {menuItem.title}
                        </DropDownLink>
                      </NextLink>
                    ))}
                  </Card.Body>
                  <Divider />
                  <Card.Footer css={{ px: '$sm', py: '$xs', fs: 'inherit' }}>
                    <DropDownLink block color='text' onClick={signOut}>
                      <HeroIcon>
                        <LogoutIcon />
                      </HeroIcon>
                      Sign out
                    </DropDownLink>
                  </Card.Footer>
                </Card>
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
