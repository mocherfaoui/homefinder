import { Text } from '@nextui-org/react';

import { Wrapper } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import SearchAndFilters from '@/components/SearchAndFilters';

export default function ForRentPage() {
  return (
    <Layout pageTitle='Properties For Rent'>
      <Wrapper>
        <Text
          h1
          css={{
            ta: 'center',
            '@xsMax': {
              fs: '$lg',
            },
          }}
        >
          Properties For Rent
        </Text>
        <SearchAndFilters status='for-rent' />
      </Wrapper>
    </Layout>
  );
}
