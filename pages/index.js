import { Divider, Grid, Text } from '@nextui-org/react';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';
import useIsClient from '@/hooks/useIsClient';

import AboveFooterCard from '@/components/AboveFtrCard';
import Features from '@/components/Features';
import { Wrapper } from '@/components/GlobalComponents';
import HeroArea from '@/components/HeroArea';
import Layout from '@/components/Layout';
import ListingsCarousel from '@/components/ListingsCarousel';
import PopularListings from '@/components/PopularListings';

import { authOptions } from './api/auth/[...nextauth]';

export default function Home({ recentListings, userListings }) {
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
          <AboveFooterCard userListings={userListings} />
        </>
      )}
    </Layout>
  );
}
export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
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
  const userListings = await prisma.listing.count({
    where: {
      ownerId: session?.user?.agencyId ?? '',
    },
    select: {
      _all: true,
    },
  });
  return {
    props: {
      session,
      userListings: JSON.parse(JSON.stringify(userListings)),
      recentListings: JSON.parse(JSON.stringify(recentListings)),
    },
  };
};
