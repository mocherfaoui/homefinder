import { Text } from '@nextui-org/react';

import prisma from '@/lib/prisma';

import Layout from '@/components/Layout';
import { SearchAndFilters, Wrapper } from '@/components/shared';

export default function AgencyListings({ agencyData }) {
  return (
    <Layout pageTitle={`${agencyData.name}'s listings`}>
      <Wrapper>
        <Text h2>{agencyData.name}'s listings</Text>
        <SearchAndFilters agencyId={agencyData.id} />
      </Wrapper>
    </Layout>
  );
}
export const getServerSideProps = async ({ params }) => {
  const agencyData = await prisma.agency.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  return {
    props: {
      agencyData: JSON.parse(JSON.stringify(agencyData)),
    },
  };
};
