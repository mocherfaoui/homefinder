import NextLink from 'next/link';
import { Divider, Grid, Link, Text } from '@nextui-org/react';

import { navLinks } from '@/lib/constants';

import { Wrapper } from '@/components/shared';

export default function Footer() {
  return (
    <Grid.Container as='footer' css={{ pb: '$10', mt: 'auto' }}>
      <Grid xs={12}>
        <Divider css={{ my: '$10' }} />
      </Grid>
      <Wrapper>
        <Grid xs={12}>
          <Grid.Container
            css={{
              '@xsMax': {
                flexFlow: 'column-reverse',
                gap: '$6',
              },
            }}
            wrap='nowrap'
          >
            <Grid
              xs={12}
              sm={8}
              css={{
                '@xsMax': {
                  jc: 'center',
                  mt: '$5',
                },
              }}
            >
              <Text weight='semibold'>HomeFinder © 2022</Text>
            </Grid>
            <Grid xs={12} sm={4}>
              <Grid.Container
                css={{
                  '@md': {
                    '& > div': {
                      jc: 'flex-end',
                    },
                  },
                  '@xsMax': {
                    '& > div': {
                      jc: 'center',
                    },
                  },
                }}
              >
                {navLinks.map(({ text, href }, index) => (
                  <Grid key={index} xs sm>
                    <NextLink href={href} passHref>
                      <Link
                        color='text'
                        underline
                        css={{ fontWeight: '$normal' }}
                      >
                        {text}
                      </Link>
                    </NextLink>
                  </Grid>
                ))}
                <Grid xs={3.6}>
                  <NextLink href='/sitemap' passHref>
                    <Link
                      color='text'
                      underline
                      css={{ fontWeight: '$normal' }}
                    >
                      Sitemap
                    </Link>
                  </NextLink>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Grid>
      </Wrapper>
    </Grid.Container>
  );
}
