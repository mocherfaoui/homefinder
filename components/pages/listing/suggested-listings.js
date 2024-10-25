import { Divider, Grid, Text } from '@nextui-org/react';
import useSWR from 'swr';

import { ListingsCarousel } from '@/components/shared';

const fetchWithListing = async (params) => {
  const { url, args } = params;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(args),
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
};

export default function SuggestedListings({ listing }) {
  const { data } = useSWR(
    { url: '/api/suggested-listings', args: listing },
    fetchWithListing
  );

  const { moreFromAgency, recommendedListings } = data || {};

  return (
    <>
      {moreFromAgency && (
        <>
          <Divider css={{ my: '$15', h: 0 }} />
          <Grid.Container>
            <Grid xs={12}>
              <Text h3 transform='capitalize'>
                More From {listing?.owner?.name}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Divider css={{ w: '70px', my: '$3', h: '2px' }} />
            </Grid>
            <Grid xs={12}>
              <ListingsCarousel listings={moreFromAgency} uniqueId='morefrom' />
            </Grid>
          </Grid.Container>
        </>
      )}
      {recommendedListings && (
        <>
          <Divider css={{ my: '$14', h: 0 }} />
          <Grid.Container>
            <Grid xs={12}>
              <Text h3>Recommended Listings</Text>
            </Grid>
            <Grid xs={12}>
              <Divider css={{ w: '70px', my: '$3', h: '2px' }} />
            </Grid>
            <Grid xs={12}>
              <ListingsCarousel
                listings={recommendedListings}
                uniqueId='reclist'
              />
            </Grid>
          </Grid.Container>
        </>
      )}
    </>
  );
}
