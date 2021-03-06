import { useRouter } from 'next/router';
import { Text } from '@nextui-org/react';
import 'swiper/css';

import { Wrapper } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import SearchAndFilters from '@/components/SearchAndFilters';

export default function SearchPage() {
  const router = useRouter();
  const propertyTypeAndStatus = `${
    router.query?.propertyType
  } ${router.query.status?.replace('-', ' ')}`;

  return (
    <Layout pageTitle='Search'>
      <Wrapper>
        <Text h3 css={{ mb: '$7' }}>
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
