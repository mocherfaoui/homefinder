import { Grid, Text } from '@nextui-org/react';
import useSWR from 'swr';

import MyPagesLayout from '@/components/Layout/MyLayout';
import { ListingCard } from '@/components/shared';

import { fetcher } from '@/utils/fetcher';

export default function MyFavoritesPage() {
  const { data: userFavorites } = useSWR('/api/user/favorites', fetcher);
  return (
    <MyPagesLayout pageTitle='My Favorites'>
      {userFavorites?.map((favorite) => (
        <Grid key={favorite.listingId} xs={12} sm={4}>
          <ListingCard listing={favorite.listing} />
        </Grid>
      ))}
      {userFavorites?.length === 0 && (
        <Grid xs={12}>
          <Text h4>No favorites found</Text>
        </Grid>
      )}
    </MyPagesLayout>
  );
}
