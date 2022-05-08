import NextLink from 'next/link';
import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusSmIcon,
} from '@heroicons/react/outline';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Link,
  Popover,
  User,
} from '@nextui-org/react';
import { Cross as Hamburger } from 'hamburger-react';
import { signOut, useSession } from 'next-auth/react';

import { CTAButtons, DropDownLink, NavItem } from './HeaderStyles';
import NavItems from './NavItems';

export default function NavMenu({ isOpen, handleToggle }) {
  const { data: session, status } = useSession();
  return (
    <>
      <NavItems />
      <CTAButtons>
        {/* <NextLink href="/" passHref>
          <NavItem>List</NavItem>
        </NextLink> */}
        {status === 'authenticated' && (
          <Popover placement="bottom-right">
            <Popover.Trigger>
              <Avatar
                css={{ cursor: 'pointer' }}
                size="md"
                src={session.user.image}
                referrerPolicy="no-referrer"
              />
            </Popover.Trigger>
            <Popover.Content>
              <Card>
                <Card.Header>
                  <User
                    css={{ pr: '$sm', pl: 0 }}
                    src={session.user.image}
                    name={session.user.name}
                    description={session.user.email}
                    referrerPolicy="no-referrer"
                  />
                </Card.Header>
                <Divider />
                <Card.Body css={{ p: '$sm' }}>
                  <NextLink href="/" passHref>
                    <DropDownLink block color="text">
                      <PlusSmIcon height="20" width="20" />
                      List a property
                    </DropDownLink>
                  </NextLink>
                  <NextLink href="/" passHref>
                    <DropDownLink block color="text">
                      <HomeIcon
                        style={{ height: '1.25rem', width: '1.25rem' }}
                      />
                      My Listings
                    </DropDownLink>
                  </NextLink>
                  <NextLink href="/" passHref>
                    <DropDownLink block color="text">
                      <HeartIcon
                        style={{ height: '1.25rem', width: '1.25rem' }}
                      />
                      Favorites
                    </DropDownLink>
                  </NextLink>
                </Card.Body>
                <Divider />
                <Card.Footer css={{ p: '$sm', fs: 'inherit' }}>
                  <DropDownLink block color="text" onClick={signOut}>
                    <LogoutIcon
                      style={{ height: '1.25rem', width: '1.25rem' }}
                    />
                    Sign out
                  </DropDownLink>
                </Card.Footer>
              </Card>
            </Popover.Content>
          </Popover>
        )}
        {status === 'unauthenticated' && <Button auto>Sign in</Button>}
        <Hamburger size={24} toggled={isOpen} toggle={handleToggle} />
      </CTAButtons>
    </>
  );
}
