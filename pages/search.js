import { useRouter } from 'next/router';
import { Text } from '@nextui-org/react';
import 'swiper/css';

import Layout from '@/components/Layout';
import { SearchAndFilters, Wrapper } from '@/components/shared';

export default function SearchPage() {
  const router = useRouter();
  const propertyTypeAndStatus = `${
    router.query?.propertyType
  } ${router.query.status?.replace('-', ' ')}`;

  return (
    <Layout pageTitle='Search'>
      <Wrapper>
        <Text h3 size='$3xl' css={{ mb: '$9' }}>
          Searching for{' '}
          {(propertyTypeAndStatus !== 'undefined undefined' &&
            propertyTypeAndStatus) ||
            'something?'}
        </Text>
        <SearchAndFilters />
      </Wrapper>
    </Layout>
  );
}
