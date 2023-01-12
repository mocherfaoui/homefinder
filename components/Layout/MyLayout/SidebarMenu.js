import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  HeartIcon,
  HomeIcon,
  OfficeBuildingIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { Link, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import { sideBarMenu } from '@/lib/constants';

import { FlexText, HeroIcon } from '@/components/shared';

import { MenuContainer } from './MyLayoutStyles';

export default function SidebarMenu() {
  const menuIcons = [
    { icon: <HomeIcon /> },
    { icon: <HeartIcon /> },
    { icon: <UserIcon /> },
    { icon: <OfficeBuildingIcon /> },
  ];
  const sideBarMenuWithIcons = sideBarMenu.map((menuItem, index) => ({
    ...menuItem,
    icon: menuIcons[index].icon,
  }));
  const { data: session } = useSession();
  const userHasAgency = session?.user?.agencyId;
  !userHasAgency && sideBarMenuWithIcons.splice(-1);
  const router = useRouter();
  return (
    <MenuContainer>
      {sideBarMenuWithIcons.map((item) => (
        <NextLink key={item.title} href={item.href} passhref>
          <Link color='text'>
            <FlexText as='div'>
              <HeroIcon>{item.icon}</HeroIcon>
              <Text
                css={{
                  fs: '1.1rem',
                  fontWeight: router.asPath === item.href ? '$bold' : '$normal',
                }}
              >
                {item.title}
              </Text>
            </FlexText>
          </Link>
        </NextLink>
      ))}
    </MenuContainer>
  );
}
