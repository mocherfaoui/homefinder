import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { Grid, Link, Loading, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import Layout from '@/components/Layout';
import { FlexText, HeroIcon, Wrapper } from '@/components/shared';

const ConfirmRequest = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  if (!loading && !session) {
    router.push('/auth/signin');
  }

  return (
    <Layout pageTitle='Confirm Request'>
      <Wrapper>
        <Grid.Container justify='center' css={{ py: '$11' }}>
          {loading ? (
            <Grid xs={12} justify='center'>
              <Loading color=''>Loading</Loading>
            </Grid>
          ) : !session ? (
            <Grid xs={12} justify='center'>
              <Text h3>Redirecting...</Text>
            </Grid>
          ) : (
            <Grid xs={12} sm={6}>
              <Grid.Container css={{ gap: '$5' }}>
                <Grid xs={12} justify='center'>
                  <FlexText h2>
                    <HeroIcon
                      css={{
                        '& svg': {
                          size: '$12',
                        },
                      }}
                    >
                      <CheckCircleIcon />
                    </HeroIcon>
                    You&apos;re logged in!
                  </FlexText>
                </Grid>
                <Grid xs={12} justify='center'>
                  <Text>
                    You can close this window or click{' '}
                    <NextLink href='/' passHref>
                      <Link>this link</Link>
                    </NextLink>{' '}
                    to go back to the homepage.
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
          )}
        </Grid.Container>
      </Wrapper>
    </Layout>
  );
};

export default ConfirmRequest;
