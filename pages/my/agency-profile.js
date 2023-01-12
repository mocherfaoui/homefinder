import { Grid } from '@nextui-org/react';
import { unstable_getServerSession } from 'next-auth/next';

import { getCountries } from '@/lib/db';
import prisma from '@/lib/prisma';

import { AgencyForm } from '@/components/forms';
import MyPagesLayout from '@/components/Layout/MyLayout';

import { authOptions } from '../api/auth/[...nextauth]';

export default function AgencyProfile({ agency, countries }) {
  const onSubmit = async (newAgency) => {
    await fetch(`/api/agency/${agency.id}`, {
      body: JSON.stringify(newAgency),
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return (
    <MyPagesLayout pageTitle='Agency Profile'>
      <Grid xs={12} css={{ pt: 0, mt: '-$10' }}>
        <AgencyForm
          countries={countries}
          initialValues={agency}
          onSubmit={onSubmit}
        />
      </Grid>
    </MyPagesLayout>
  );
}
export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const agency = await prisma.agency.findUnique({
    where: {
      id: session.user.agencyId,
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
  return {
    props: {
      countries,
      agency: JSON.parse(JSON.stringify(agency)),
    },
  };
};
