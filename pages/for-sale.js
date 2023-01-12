import Layout from '@/components/Layout';
import {
  AboveContentTitle,
  SearchAndFilters,
  Wrapper,
} from '@/components/shared';

export default function ForSalePage() {
  return (
    <Layout pageTitle='Properties For Sale'>
      <Wrapper>
        <AboveContentTitle h2 size='$4xl'>
          Properties For Sale
        </AboveContentTitle>
        <SearchAndFilters status='for-sale' />
      </Wrapper>
    </Layout>
  );
}
