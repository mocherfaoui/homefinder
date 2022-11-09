import { AboveContentTitle, Wrapper } from '@/components/GlobalComponents';
import Layout from '@/components/Layout';
import SearchAndFilters from '@/components/SearchAndFilters';

export default function ForRentPage() {
  return (
    <Layout pageTitle='Properties For Rent'>
      <Wrapper>
        <AboveContentTitle h2 size='$4xl'>
          Properties For Rent
        </AboveContentTitle>
        <SearchAndFilters status='for-rent' />
      </Wrapper>
    </Layout>
  );
}
