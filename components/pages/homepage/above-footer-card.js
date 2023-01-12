import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Grid, Input, Link, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { FlexDiv, Wrapper } from '@/components/shared';

import { fetcher } from '@/utils/fetcher';

export function AboveFooterCard() {
  const { data: session, status } = useSession();
  const isUserAuthenticated = status === 'authenticated';
  const { data: userListings, isLoadingUserListings } = useSWR(
    isUserAuthenticated ? '/api/user/listings' : '',
    fetcher
  );
  const userHasListings = userListings && userListings?.length > 0;
  const [email, setEmail] = useState('');
  const router = useRouter();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    router.push(`/auth/signin?email=${email}`, '/auth/signin');
  };
  return (
    <Wrapper css={{ my: '$20' }}>
      <Grid.Container>
        <Grid xs={12}>
          <Card variant='flat' css={{ bg: '#E3EEF1' }}>
            <Card.Body css={{ p: 0 }}>
              <Grid.Container direction='row' wrap='nowrap'>
                <Grid xs={0} sm={5}>
                  <Card.Image
                    showSkeleton
                    src='/homepage-above-footer.png'
                    height={500}
                    width={600}
                    objectFit='cover'
                    css={{ m: 0 }}
                  />
                </Grid>
                <Grid.Container
                  xs={12}
                  sm={8}
                  justify='flex-start'
                  css={{
                    p: '$20',
                    '@xsMax': {
                      p: '$lg!important',
                      gap: '$12',
                    },
                  }}
                >
                  <Grid xs={12}>
                    <Text
                      h2
                      css={{
                        '@xsMax': {
                          fs: '1.9rem',
                        },
                      }}
                    >
                      List your property for{' '}
                      <Text
                        span
                        css={{
                          fs: 'inherit',
                          p: '$3',
                          br: '$sm',
                          bg: '$blue300',
                          color: '$text',
                        }}
                      >
                        free
                      </Text>
                    </Text>
                  </Grid>
                  <Grid
                    xs={12}
                    justify='center'
                    direction='column'
                    css={{
                      gap: '$8',
                      '& ol > li': {
                        fs: '1.1rem',
                        mb: '$9',
                      },
                    }}
                  >
                    <ol>
                      <li>
                        {session ? <strike>Log in</strike> : 'Log in'}
                        {!session && (
                          <FlexDiv
                            as='form'
                            onSubmit={handleOnSubmit}
                            css={{ mt: '$4' }}
                          >
                            <Input
                              aria-label='email'
                              type='email'
                              placeholder='Enter your email'
                              width='80%'
                              onChange={(e) => setEmail(e.target.value)}
                              contentRight={
                                <Button auto type='submit'>
                                  Go
                                </Button>
                              }
                            />
                          </FlexDiv>
                        )}
                      </li>
                      <li>
                        {!session?.user?.agencyId ? (
                          <>
                            <NextLink href='/agency/new' passHref>
                              <Link underline css={{ d: 'inline-flex' }}>
                                switch{' '}
                              </Link>
                            </NextLink>{' '}
                            to an agency account
                          </>
                        ) : (
                          <strike>switch to an agency account</strike>
                        )}
                      </li>
                      <li>
                        {!userHasListings && !isLoadingUserListings ? (
                          <>
                            <NextLink href='/listing/new' passHref>
                              <Link underline css={{ d: 'inline-flex' }}>
                                start selling
                              </Link>
                            </NextLink>{' '}
                            your properties
                          </>
                        ) : (
                          <strike>start selling your properties</strike>
                        )}
                      </li>
                    </ol>
                    {userHasListings && (
                      <Text size={21} weight='medium'>
                        Congratulations! you've completed the basic steps and
                        started selling.
                      </Text>
                    )}
                  </Grid>
                </Grid.Container>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Wrapper>
  );
}
