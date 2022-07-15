import { AboveContentTitle, Wrapper } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import SearchAndFilters from '@/components/SearchAndFilters';

export default function ForSalePage() {
  return (
    <Layout pageTitle='Properties For Sale'>
      <Wrapper>
        <AboveContentTitle h2>Properties For Sale</AboveContentTitle>
        <SearchAndFilters status='for-sale' />
      </Wrapper>
    </Layout>
  );
}
