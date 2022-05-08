import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SearchIcon } from '@heroicons/react/outline';
import { Button, Card, Grid, Input, Text } from '@nextui-org/react';

import { PurchaseTypeButton } from './HeroAreaStyles';
import { Label, NormalSelect } from '../GlobalComponents';

export default function HeroArea() {
  const [purchaseType, setPurchaseType] = useState('rent');
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  //generate appartment type options
  console.log(errors);
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
    <Grid.Container direction="row">
      <Grid xs={0} sm={12}>
        <Card
          shadow={false}
          css={{
            h: '100%',
            backgroundColor: '$gray100',
            flexDirection: 'row-reverse',
          }}
        >
          <Card.Body css={{ p: '$5 $15', width: '60%' }}>
            <HeroAreaText desktop />
          </Card.Body>
          <Card.Image
            src="/hero-area-desktop.png"
            height={500}
            width={600}
            objectFit="cover"
          />
        </Card>
      </Grid>
      <Grid direction="column" xs={12} sm={0}>
        <HeroAreaText />
      </Grid>
      <Grid.Container
        css={{
          m: '-$28 $15 $10',
          zIndex: 100,
          '@xsMax': {
            mt: '$15!important',
            mb: '-$10!important',
            mx: '0!important',
          },
        }}
      >
        <Grid xs={12}>
          <Button.Group auto flat size="lg" css={{ m: 0 }}>
            <PurchaseTypeButton
              onClick={() => setPurchaseType('rent')}
              css={{
                bblr: 0,
                backgroundColor:
                  purchaseType === 'rent'
                    ? '$yellow300!important'
                    : '$gray200!important',
              }}
            >
              Rent
            </PurchaseTypeButton>
            <PurchaseTypeButton
              onClick={() => setPurchaseType('buy')}
              css={{
                bbrr: 0,
                backgroundColor:
                  purchaseType === 'buy'
                    ? '$yellow300!important'
                    : '$gray200!important',
              }}
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
            shadow={false}
            css={{ p: '$10', normalShadow: '$gray100', '@xsMax': { pt: 0 } }}
            bordered
          >
            <Card.Body css={{ p: 0 }}>
              <Grid.Container
                onSubmit={handleSubmit((data) => console.log(data))}
                as="form"
                css={{
                  '& label, input': { fontSize: '1rem' },
                  '& label': { fontWeight: '$bold' },
                  '@md': {
                    '& .nextui-input-wrapper:not(last-child)': {
                      mr: '$5!important',
                    },
                  },
                  '@xsMax': {
                    '& > div': {
                      mt: '$10!important',
                    },
                  },
                }}
              >
                <Grid xs={12} sm={3.5}>
                  <Input
                    label="Location"
                    placeholder="City, Country"
                    type="text"
                    width="100%"
                    name="location"
                    {...register('location', {
                      required: 'This field is required',
                    })}
                    //helperText={errors.location}
                  />
                </Grid>
                <Grid xs={12} sm={3.5}>
                  <Input
                    label="Max Price"
                    placeholder="$"
                    type="number"
                    width="100%"
                    name="maxPrice"
                    {...register('maxPrice', {
                      required: 'This field is required',
                    })}
                  />
                </Grid>
                <Grid xs={12} sm={3.5} direction="column">
                  <Label>Property Type</Label>
                  <NormalSelect
                    name="propertyType"
                    {...register('propertyType', {
                      required: 'This field is required',
                    })}
                  >{/*generate appartement type */}
                    <option value="">Select Property Type</option>
                    <option value="appartement">Blues</option>
                    <option value="rock">Rock</option>
                    <option value="jazz">Jazz</option>
                  </NormalSelect>
                </Grid>
                <Grid xs={12} sm={1.5} css={{ ai: 'end' }}>
                  <Button
                    auto
                    type="submit"
                    css={{ w: '100%', '& > span': { position: 'initial' } }}
                    size="md"
                    icon={<SearchIcon height={20} />}
                  />
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Grid sm={0} xs={12}>
        <Card cover shadow={false}>
          <Card.Image src="/hero-area-mobile.png" width="100vw" height="50vh" />
        </Card>
      </Grid>
    </Grid.Container>
  );
}
