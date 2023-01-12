import { unstable_getServerSession } from 'next-auth/next';

import { getCountries } from '@/lib/db';
import prisma from '@/lib/prisma';

import { ListingForm } from '@/components/forms';
import Layout from '@/components/Layout';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function EditListingPage({ listing, countries }) {
  const onSubmit = (newListing) => {
    fetch(`/api/listing/${listing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(newListing),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return (
    <Layout pageTitle='Edit listing'>
      <ListingForm
        countries={countries}
        initialValues={listing}
        onSubmit={onSubmit}
        redirectPath={`/listing/${listing.id}`}
      />
    </Layout>
  );
}

export const getServerSideProps = async ({ params, req, res }) => {
  const redirect = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
  const session = await unstable_getServerSession(req, res, authOptions);

  const listing = await prisma.listing.findUnique({
    where: {
      id: params.id,
    },
    include: {
      country: {
        select: {
          value: true,
          label: true,
        },
      },
    },
  });

  const { countries } = await getCountries();

  const isListingOwner = listing.ownerId === session?.user?.agencyId;

  if (!isListingOwner || !session) {
    return redirect;
  }
  if (!listing) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      listing: JSON.parse(JSON.stringify(listing)),
      countries: JSON.parse(JSON.stringify(countries)),
    },
  };
};
