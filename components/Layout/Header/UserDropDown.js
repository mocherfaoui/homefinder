import NextLink from 'next/link';
import {
  ChatIcon,
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusSmIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline';
import { Card, Divider, Text, User } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

import { popOverMenu } from '@/lib/constants';
import useMediaQuery from '@/hooks/useMediaQuery';

import { HeroIcon } from '@/components/GlobalComponents';

import { DropDownLink } from './HeaderStyles';

export default function UserDropDown({ session }) {
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
  );
}
