import { Divider, Grid, Text } from '@nextui-org/react';

import prisma from '@/lib/prisma';
import useIsClient from '@/hooks/useIsClient';

import Layout from '@/components/Layout';
import {
  AboveFooterCard,
  Features,
  HeroArea,
  PopularListings,
} from '@/components/pages';
import { ListingsCarousel, Wrapper } from '@/components/shared';

export default function Home({ recentListings }) {
  const isClient = useIsClient();
  return (
    <Layout pageTitle='Homepage'>
      {isClient && (
        <>
          <Wrapper>
            <HeroArea />
            <Grid.Container as='section' css={{ mt: '$12', mb: '$20' }}>
              <Grid xs={12}>
                <Text h3>Recently Added Listings</Text>
              </Grid>
              <Grid xs={12}>
                <Divider css={{ w: '70px', my: '$3', h: '2px' }} />
              </Grid>
              <Grid xs={12}>
                <ListingsCarousel listings={recentListings} uniqueId='rctli' />
              </Grid>
            </Grid.Container>
            <Features />
          </Wrapper>
          <PopularListings />
          <AboveFooterCard />
        </>
      )}
    </Layout>
  );
}
export const getStaticProps = async () => {
  const recentListings = await prisma.listing.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      country: {
        select: {
          label: true,
        },
      },
    },
    take: 6,
  });
  return {
    props: {
      recentListings: JSON.parse(JSON.stringify(recentListings)),
    },
    revalidate: 5,
  };
};
