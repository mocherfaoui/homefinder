import Layout from '@/components/Layout';
import {
  AboveContentTitle,
  SearchAndFilters,
  Wrapper,
} from '@/components/shared';

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
