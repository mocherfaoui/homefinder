import { EyeIcon } from '@heroicons/react/outline';
import { Grid } from '@nextui-org/react';
import useSWR from 'swr';

import { FlexText, HeroIcon } from '@/components/GlobalComponents';
import MyPagesLayout from '@/components/Layout/MyLayout';
import ListingCard from '@/components/ListingCard';
import NoAgencyWarning from '@/components/NoAgencyWarning';

import { fetcher } from '@/utils/fetcher';

export default function MyListingsPage() {
  const { data: userListings, isLoading } = useSWR(
    '/api/user/listings',
    fetcher
  );
  return (
    <MyPagesLayout pageTitle='My Listings'>
      {userListings?.map((listing) => (
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
      {!userListings?.length && !isLoading && (
        <Grid xs={12}>
          <NoAgencyWarning />
        </Grid>
      )}
    </MyPagesLayout>
  );
}
