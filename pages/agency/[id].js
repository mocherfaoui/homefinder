import NextLink from 'next/link';
import { AtSymbolIcon, PhoneIcon } from '@heroicons/react/outline';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Link,
  Text,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import prisma from '@/lib/prisma';

import Layout from '@/components/Layout';
import { ContactDetails, HeroIcon, Wrapper } from '@/components/shared';

export default function AgencyPage({ agency }) {
  const { data: session } = useSession();
  const isAgencyOwner = agency?.ownerId === session?.user?.id;
  return (
    <Layout pageTitle={`${agency?.name}'s profile`}>
      <Wrapper css={{ p: 0 }}>
        <Card variant='flat'>
          <Card.Header css={{ jc: 'end', gap: '$5' }}>
            {isAgencyOwner && (
              <NextLink href='/' passhref>
                <Button ghost size='sm' as='a' auto>
                  Edit agency
                </Button>
              </NextLink>
            )}
          </Card.Header>
          <Card.Body css={{ pt: 0 }}>
            <Grid.Container xs={12} sm={6} css={{ mx: 'auto' }}>
              <Grid xs={12} justify='center'>
                <Avatar
                  src={agency?.logo}
                  css={{ size: '$40', '@xsMax': { size: '$36' } }}
                />
              </Grid>
              <Grid xs={12} justify='center'>
                <Text
                  transform='capitalize'
                  weight='semibold'
                  css={{
                    mt: '$5!important',
                    fs: '$md',
                    '@xsMax': { fs: '$sm' },
                  }}
                >
                  {agency?.name}
                </Text>
              </Grid>
              <Grid xs={12} sm={11} justify='center' css={{ mx: 'auto' }}>
                <Text css={{ color: '$accents6' }}>{agency?.description}</Text>
              </Grid>
              <Grid.Container
                justify='center'
                xs={12}
                css={{ mt: '$11', gap: '$3' }}
              >
                <Grid xs={12} sm={5.5}>
                  <ContactDetails>
                    <HeroIcon>
                      <AtSymbolIcon />
                    </HeroIcon>
                    {agency?.email}
                  </ContactDetails>
                </Grid>
                <Grid xs={12} sm={5.5}>
                  <ContactDetails>
                    <HeroIcon>
                      <PhoneIcon />
                    </HeroIcon>
                    {agency?.phone}
                  </ContactDetails>
                </Grid>
              </Grid.Container>
            </Grid.Container>
          </Card.Body>
        </Card>
        <Card variant='bordered' css={{ mt: '$10' }}>
          <Card.Header css={{ ac: 'center', gap: '$1' }}>
            <Text weight='semibold'>Listings</Text>
            <NextLink href='/' passHref>
              <Link underline>({agency?._count.listings})</Link>
            </NextLink>
          </Card.Header>
          <Divider />
          <Card.Body></Card.Body>
        </Card>
      </Wrapper>
    </Layout>
  );
}
export const getStaticPaths = async () => {
  const agencies = await prisma.agency.findMany({
    select: {
      id: true,
    },
    take: 50,
  });

  return {
    paths: agencies.map((agency) => ({
      params: {
        id: agency.id,
      },
    })),
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const agency = await prisma.agency.findUnique({
    where: {
      id: params.id,
    },
    include: {
      country: {
        select: {
          label: true,
        },
      },
      listings: true,
      _count: {
        select: {
          listings: true,
        },
      },
    },
  });
  if (!agency) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      agency: JSON.parse(JSON.stringify(agency)),
    },
    revalidate: 10,
  };
};
