import { Text } from '@nextui-org/react';

import { Wrapper } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import SearchAndFilters from '@/components/SearchAndFilters';

export default function ForSalePage() {
  return (
    <Layout pageTitle='Properties For Sale'>
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
          Properties For Sale
        </Text>
        <SearchAndFilters status='for-sale' />
      </Wrapper>
    </Layout>
  );
}
