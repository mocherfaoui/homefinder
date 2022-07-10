import { EyeIcon } from '@heroicons/react/outline';
import { Grid } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { FlexText, HeroIcon } from '@/components/GlobalComponents';
import MyPagesLayout from '@/components/Layout/MyLayout';
import ListingCard from '@/components/ListingCard';
import NoAgencyWarning from '@/components/NoAgencyWarning';

import { fetcher } from '@/utils/fetcher';

export default function MyListingsPage() {
  const { data: session, status } = useSession();
  const isLoadingSession = status === 'loading';
  const userHasAgency = session?.user?.agencyId;
  const { data: userListings } = useSWR(
    userHasAgency ? '/api/user/listings' : '',
    fetcher
  );
  return (
    <MyPagesLayout pageTitle='My Listings'>
      {userHasAgency &&
        userListings?.map((listing) => (
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
      {!userHasAgency && !isLoadingSession && (
        <Grid xs={12}>
          <NoAgencyWarning />
        </Grid>
      )}
    </MyPagesLayout>
  );
}
