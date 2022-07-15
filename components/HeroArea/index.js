import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import { Button, Card, Grid, Input, Text } from '@nextui-org/react';

import { propertyTypes } from '@/lib/constants';
import useMediaQuery from '@/hooks/useMediaQuery';

import { PurchaseTypeButton } from './HeroAreaStyles';
import { Label, NormalSelect } from '../GlobalComponents';

export default function HeroArea() {
  const [purchaseType, setPurchaseType] = useState('for-rent');
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const isMobile = useMediaQuery('(max-width: 650px)');

  const onSearchSubmit = (data) => {
    Router.push({
      pathname: '/search',
      query: {
        city: data.city,
        country: data.country,
        minPrice: 100,
        maxPrice: data.maxPrice,
        propertyType: data.propertyType,
        status: purchaseType,
      },
    });
  };
  const HeroAreaText = ({ desktop }) => (
    <>
      <Text h1 size={40} css={{ pt: desktop ? '$20' : 0, lh: '$sm' }}>
        Find your perfect future home.
      </Text>
      <Text size={18} css={{ pt: '$6' }}>
        Search using our tool of homes for sale or rent.
      </Text>
    </>
  );
  return (
    <Grid.Container as='section' direction='row'>
      {!isMobile && (
        <Grid xs={0} sm={12}>
          <Card
            variant='flat'
            css={{
              h: '100%',
              backgroundColor: '#E3EEF1',
              flexDirection: 'row',
            }}
          >
            <Card.Body css={{ p: '$5 $15', width: '60%' }}>
              <HeroAreaText desktop />
            </Card.Body>
            <Card.Image
              showSkeleton
              src='/hero-area-desktop.png'
              height={500}
              width={600}
              objectFit='cover'
            />
          </Card>
        </Grid>
      )}
      {isMobile && (
        <Grid direction='column' xs={12} sm={0}>
          <HeroAreaText />
        </Grid>
      )}
      <Grid.Container
        css={{
          m: '-$28 $15 $10',
          zIndex: 100,
          '@xsMax': {
            mt: '$15!important',
            mx: '0!important',
          },
        }}
      >
        <Grid xs={12}>
          <Button.Group auto size='lg' css={{ m: 0 }}>
            <PurchaseTypeButton
              onClick={() => setPurchaseType('for-rent')}
              css={{ btrr: 0 }}
              purchaseType={purchaseType === 'for-rent' ? 'rent' : ''}
            >
              Rent
            </PurchaseTypeButton>
            <PurchaseTypeButton
              onClick={() => setPurchaseType('for-sale')}
              css={{ btlr: 0 }}
              purchaseType={purchaseType === 'for-sale' ? 'sale' : ''}
            >
              Buy
            </PurchaseTypeButton>
          </Button.Group>
        </Grid>
        <Grid
          xs={12}
          css={{
            '& > div': { btlr: 0 },
          }}
        >
          <Card
            variant='bordered'
            css={{
              pl: '$9',
              pr: '$8',
              py: '$5',
              normalShadow: '$gray100',
              '@md': { pr: '$4' },
              '@xsMax': { pt: 0 },
            }}
          >
            <Card.Body css={{ '@xsMax': { pr: 0, pb: '$6' } }}>
              <Grid.Container
                onSubmit={handleSubmit(handleSubmit(onSearchSubmit))}
                as='form'
                css={{
                  '& label, input': { fontSize: '1rem' },
                  '& label': { fontWeight: '$bold' },
                  p: 0,
                  w: '100%',
                  '@xsMax': {
                    '& > div': {
                      px: 0,
                    },
                  },
                }}
                gap={1.4}
              >
                <Grid xs={12} sm={2.5}>
                  <Input
                    label='City'
                    placeholder='Safi'
                    type='text'
                    width='100%'
                    name='city'
                    {...register('city', {
                      required: 'This field is required',
                    })}
                    //helperText={errors.location}
                  />
                </Grid>
                <Grid xs={12} sm={2.5}>
                  <Input
                    label='Country'
                    placeholder='Morocco'
                    type='text'
                    width='100%'
                    name='country'
                    {...register('country', {
                      required: 'This field is required',
                    })}
                    //helperText={errors.location}
                  />
                </Grid>
                <Grid xs={12} sm={2.5}>
                  <Input
                    label='Max Price'
                    placeholder='$'
                    type='number'
                    width='100%'
                    name='maxPrice'
                    {...register('maxPrice', {
                      required: 'This field is required',
                      maxLength: 10,
                    })}
                  />
                </Grid>
                <Grid xs={12} sm={3} direction='column'>
                  <Label>Property Type</Label>
                  <NormalSelect
                    defaultValue='all'
                    name='propertyType'
                    {...register('propertyType', {
                      required: 'This field is required',
                    })}
                    css={{
                      '@sm': {
                        mr: '$5',
                      },
                    }}
                  >
                    <option value=''>Select Property Type</option>
                    <option value='all'>All</option>
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </NormalSelect>
                </Grid>
                <Grid xs={12} sm={1.5} css={{ ai: 'end' }}>
                  <Button
                    auto
                    type='submit'
                    css={{ minWidth: '100%' }}
                    icon={<SearchIcon height={20} />}
                  />
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
}
