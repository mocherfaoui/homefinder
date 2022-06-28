import { EyeIcon } from '@heroicons/react/outline';
import { Grid } from '@nextui-org/react';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { FlexText, HeroIcon } from '@/components/GlobalComponents';
import MyPagesLayout from '@/components/Layout/MyLayout';
import ListingCard from '@/components/ListingCard';
import NoAgencyWarning from '@/components/NoAgencyWarning';

import { authOptions } from '../api/auth/[...nextauth]';

export default function MyListingsPage({ listings, noAgencyFound }) {
  return (
    <MyPagesLayout pageTitle='My Listings'>
      {listings &&
        listings.map((listing) => (
          <Grid key={listing.id} xs={10} sm={4}>
            <Grid.Container>
              <Grid xs={12}>
                <FlexText>
                  <HeroIcon>
                    <EyeIcon />
                  </HeroIcon>
                  {listing?.views?.totalViews ?? 'No views'}
                </FlexText>
              </Grid>
              <Grid xs={12}>
                <ListingCard listing={listing} />
              </Grid>
            </Grid.Container>
          </Grid>
        ))}
      {noAgencyFound && (
        <Grid xs={12}>
          <NoAgencyWarning />
        </Grid>
      )}
    </MyPagesLayout>
  );
}
export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session.user.agencyId) {
    return { props: { noAgencyFound: true } };
  }

  const listings = await prisma.listing.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: { ownerId: session.user.agencyId },
    include: {
      country: {
        select: {
          label: true,
        },
      },
      views: {
        select: {
          totalViews: true,
        },
      },
    },
  });

  return {
    props: {
      listings: JSON.parse(JSON.stringify(listings)),
    },
  };
};
