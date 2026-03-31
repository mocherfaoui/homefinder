import NextLink from 'next/link';
import { Divider, Grid, Link, Text } from '@nextui-org/react';

import { navLinks, sideBarMenu } from '@/lib/constants';

import Layout from '@/components/Layout';
import { ListContainer, Wrapper } from '@/components/shared';

export default function SiteMapPage() {
  return (
    <Layout pageTitle='Sitemap'>
      <Wrapper as='section'>
        <Grid.Container>
          <Grid xs={12}>
            <Text h3>HomeFinder Sitemap</Text>
          </Grid>
          <Grid xs={12}>
            <Divider css={{ mb: '$15', mt: '$7' }} />
          </Grid>
          <Grid.Container xs={12}>
            <Grid xs={12} sm={4} direction='column'>
              <Text h4>Main / Navigation</Text>
              <ListContainer>
                <li>
                  <NextLink href='/' passHref legacyBehavior>
                    <Link underline>Home</Link>
                  </NextLink>
                </li>
                {navLinks.map(({ href, text }, index) => (
                  <li key={index}>
                    <NextLink href={href} passHref legacyBehavior>
                      <Link underline>{text}</Link>
                    </NextLink>
                  </li>
                ))}
                <li>
                  <NextLink href='/listing/new' passHref legacyBehavior>
                    <Link underline>List</Link>
                  </NextLink>
                </li>
              </ListContainer>
            </Grid>
            <Grid xs={12} sm={4} direction='column'>
              <Text h4>Account</Text>
              <ListContainer>
                {sideBarMenu.map(({ title, href }, index) => (
                  <li key={index}>
                    <NextLink href={href} passHref legacyBehavior>
                      <Link underline>{title}</Link>
                    </NextLink>
                  </li>
                ))}
                <li>
                  <NextLink href='/my/discussions' passHref legacyBehavior>
                    <Link underline>My Discussions</Link>
                  </NextLink>
                </li>
                <li>
                  <NextLink href='/auth/signin' passHref legacyBehavior>
                    <Link underline>Sign In</Link>
                  </NextLink>
                </li>
              </ListContainer>
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Wrapper>
    </Layout>
  );
}
