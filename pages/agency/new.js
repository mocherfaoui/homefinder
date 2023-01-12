import { Card, Grid, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import { getCountries } from '@/lib/db';

import { AgencyForm } from '@/components/forms';
import Layout from '@/components/Layout';
import { Wrapper } from '@/components/shared';

export default function NewAgency({ countries }) {
  const { data: session, status } = useSession();
  const onSubmit = async (newAgency) => {
    await fetch('/api/agency', {
      body: JSON.stringify(newAgency),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  if (session?.user?.agencyId) {
    return (
      <Layout pageTitle='New Agency'>
        <Wrapper>
          <Grid.Container justify='center'>
            <Grid xs={12} sm={6} justify='center'>
              <Card color='warning' bordered css={{ w: 'fit-content' }}>
                <Text
                  span
                  weight='semibold'
                  size='$md'
                  css={{
                    color: '$white',
                    '@xsMax': { fs: '$sm', ta: 'center' },
                  }}
                >
                  You already have an agency account.
                </Text>
              </Card>
            </Grid>
          </Grid.Container>
        </Wrapper>
      </Layout>
    );
  }
  return (
    <Layout pageTitle='New Agency'>
      <Wrapper
        css={{
          '@md': {
            px: '$20',
          },
        }}
      >
        {status === 'authenticated' && (
          <>
            <Text h4>Add a new Agency</Text>
            <Text css={{ color: '$accents6' }}>
              Fill out the form below to add your agency.
            </Text>
            <AgencyForm
              onSubmit={onSubmit}
              countries={countries}
              redirectPath='/'
              newAgencyPage
            />
          </>
        )}
      </Wrapper>
    </Layout>
  );
}
export const getStaticProps = async () => {
  const { countries } = await getCountries();

  return {
    props: {
      countries,
    },
  };
};
