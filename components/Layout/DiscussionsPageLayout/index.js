import { Grid } from '@nextui-org/react';

import { Wrapper } from '@/components/GlobalComponents';

import Layout from '..';

export default function DiscussionsPageLayout({ children }) {
  return (
    <Layout pageTitle='Discussions'>
      <Wrapper>
        <Grid.Container
          css={{
            '@mdMax': {
              minHeight: 'calc(100vh - 6.5rem)',
              alignContent: 'baseline',
            },
            '@md': {
              minHeight: 'calc(100vh - 7.5rem)',
            },
          }}
        >
          {children}
        </Grid.Container>
      </Wrapper>
    </Layout>
  );
}
