import { Collapse, Divider, Grid, Text, User } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import { VerticalLine, Wrapper } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';

import SidebarMenu from './SidebarMenu';

export default function MyPagesLayout({ pageTitle, children }) {
  const { data: session } = useSession();
  return (
    <Layout pageTitle={pageTitle}>
      <Wrapper>
        <Grid.Container
          css={{
            '@xsMax': { gap: '$11' },
            '@lg': {
              minHeight: 'calc(100vh - 230px)',
            },
          }}
        >
          <Grid xs={12} sm={2.5} css={{ d: 'block!important' }}>
            <Grid.Container
              css={{
                '@lg': {
                  position: 'fixed',
                  maxW: '260px',
                },
              }}
            >
              <Grid xs={0} sm={12} css={{ ai: 'baseline' }}>
                <User
                  css={{ p: 0 }}
                  src={session?.user.image}
                  name={session?.user.name}
                  text={session?.user?.name?.split(' ')[0][0]}
                  size='md'
                />
              </Grid>
              <Grid xs={0} sm={12}>
                <Divider css={{ my: '$11' }} />
              </Grid>
              <Grid xs={12} sm={0} css={{ mt: '$6' }}>
                <Collapse
                  bordered
                  title='Menu'
                  css={{
                    w: '100%',
                    '& .nextui-collapse-title': {
                      fs: '$lg',
                    },
                  }}
                >
                  <SidebarMenu />
                </Collapse>
              </Grid>
              <Grid xs={0} sm={12}>
                <SidebarMenu />
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={0} sm={0.5}>
            <VerticalLine />
          </Grid>
          <Grid xs={12} sm={9}>
            <Grid.Container alignContent='flex-start'>
              <Grid xs={12}>
                <Text h3 css={{ mb: '$15' }}>
                  {pageTitle}
                </Text>
              </Grid>
              <Grid.Container
                gap={3}
                css={{
                  p: 0,
                  '@xsMax': {
                    jc: 'center',
                  },
                }}
              >
                {children}
              </Grid.Container>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Wrapper>
    </Layout>
  );
}
