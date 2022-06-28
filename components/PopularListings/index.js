import { useState } from 'react';
import { Button, Divider, Grid, Text } from '@nextui-org/react';
import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';

import { FlexDiv, Wrapper } from '../GlobalComponents';
import ListingsCarousel from '../ListingsCarousel';

export default function PopularListings() {
  const [propertyType, setPropertyType] = useState('Apartment');
  const { data: results } = useSWR(
    `/api/search?minPrice=100&maxPrice=99999999&propertyType=${propertyType}&status=all&cursor=null`,
    fetcher
  );
  const buttons = [
    { text: 'Apartments', key: 'Apartment' },
    { text: 'Houses', key: 'House' },
    { text: 'Villas', key: 'Villa' },
    { text: 'Offices', key: 'Office' },
    { text: 'Duplexes', key: 'Duplex' },
  ];

  return (
    <FlexDiv as='section'>
      <Wrapper css={{ py: '$10' }}>
        <Grid.Container>
          <Grid xs={12}>
            <Text h3>Popular Listings</Text>
          </Grid>
          <Grid xs={12}>
            <Divider css={{ w: '70px', my: '$3', h: '2px' }} />
          </Grid>
          <Grid.Container
            xs={12}
            gap={2}
            css={{
              mt: '$9',
              px: 0,
              '@xsMax': {
                jc: 'center',
              },
            }}
          >
            {buttons.map((button, index) => (
              <Grid xs={6} sm={1.75} key={index}>
                <Button
                  auto
                  css={{ w: '100%' }}
                  ghost={button.key !== propertyType}
                  onClick={() => setPropertyType(button.key)}
                >
                  {button.text}
                </Button>
              </Grid>
            ))}
          </Grid.Container>
          <Grid.Container xs={12}>
            <ListingsCarousel listings={results} uniqueId='pplrli' />
          </Grid.Container>
        </Grid.Container>
      </Wrapper>
    </FlexDiv>
  );
}
