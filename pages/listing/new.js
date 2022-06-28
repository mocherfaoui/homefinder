import { getCountries } from '@/lib/db';

import Layout from '@/components/Layout';
import ListingForm from '@/components/ListingForm';

export default function ListNewHome({ countries }) {
  const onSubmit = (newListing) => {
    fetch('/api/listing', {
      method: 'POST',
      body: JSON.stringify(newListing),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return (
    <Layout pageTitle='New Listing'>
      <ListingForm countries={countries} onSubmit={onSubmit} newListingPage />
    </Layout>
  );
}
export const getStaticProps = async () => {
  const { countries } = await getCountries();
  return {
    props: {
      countries,
    },
  };
};
