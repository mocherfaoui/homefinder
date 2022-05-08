import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Router from 'next/router';
import {
  Button,
  Container,
  Grid,
  Input,
  Loading,
  Radio,
  Text,
  Textarea,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import prisma from '@/lib/prisma';

import {
  Label,
  NormalSelect,
  ReactSelect,
} from '@/components/GlobalComponents';
import ImageUpload from '@/components/ImageUpload';
import Layout from '@/components/Layout';

export default function ListNewHome({ countries }) {
  const [imagesUrls, setImagesUrls] = useState([]);
  const { register, handleSubmit, control, formState } = useForm();
  const { errors, isSubmitting } = formState;
  console.log('imagesUrls', imagesUrls);
  const onSubmit = async (data) => {
    try {
      const newListing = { ...data, imagesUrls };
      await fetch('/api/listing', {
        method: 'POST',
        body: JSON.stringify(newListing),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    } finally {
      Router.push('/');
    }
  };
  return (
    <Layout pageTitle="New Listing">
      <Container css={{ px: '$20', '@xsMax': { px: 0 } }}>
        <Text h4>List your property</Text>
        <Text css={{ color: '$accents5' }}>
          Fill out the form below to list a new property.
        </Text>
        <Grid.Container
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          css={{ my: '$11', gap: '$15' }}
        >
          <Grid xs={12}>
            <Input
              name="title"
              {...register('title', { required: true })}
              label="Title"
              type="text"
              placeholder="Listing Title"
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <ImageUpload setImagesUrls={setImagesUrls} />
          </Grid>
          <Grid xs={12}>
            <Textarea
              name="description"
              {...register('description', { required: true })}
              label="Description"
              fullWidth
            />
          </Grid>
          <Grid.Container alignItems="center">
            <Text>Is this property for</Text>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Radio.Group row css={{ ml: '$10' }} {...field}>
                  <Radio value="for-rent" size="sm">
                    Rent
                  </Radio>
                  <Radio value="for-sale" size="sm">
                    Sale
                  </Radio>
                </Radio.Group>
              )}
            />
          </Grid.Container>
          <Grid.Container css={{ gap: '$8' }}>
            <Grid xs={4} sm={3.5}>
              <Input
                name="price"
                {...register('price', {
                  required: 'This field is required',
                  valueAsNumber: true,
                  minLength: 3,
                  min: 1000,
                })}
                label="Price"
                type="number"
                labelRight="$"
                fullWidth
              />
            </Grid>
            <Grid xs={3}>
              <Input
                label="Size"
                name="size"
                {...register('size', {
                  required: 'This field is required',
                  valueAsNumber: true,
                  minLength: 2,
                })}
                type="number"
                labelRight="m²"
                fullWidth
              />
            </Grid>
            <Grid xs={3.7} sm={3}>
              <Input
                label="N of Rooms"
                name="rooms"
                {...register('rooms', {
                  required: 'This field is required',
                  valueAsNumber: true,
                  minLength: 1,
                  min: 1,
                })}
                type="number"
                placeholder="13"
                fullWidth
              />
            </Grid>
            <Grid xs={4} sm>
              <Input
                label="N of Bathrooms"
                name="bathrooms"
                {...register('bathrooms', {
                  required: 'This field is required',
                  valueAsNumber: true,
                  minLength: 1,
                  min: 1,
                })}
                type="number"
                placeholder="2"
                fullWidth
              />
            </Grid>
          </Grid.Container>
          <Grid.Container alignItems="center" css={{ gap: '$5' }}>
            <Grid xs={4} sm={2}>
              <Label css={{ mb: 0 }}>Property type</Label>
            </Grid>
            <Grid xs sm={5}>
              <NormalSelect
                name="propertyType"
                {...register('propertyType', {
                  required: 'This field is required',
                })}
                css={{ w: '100%' }}
              >
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Duplex">Duplex</option>
                <option value="Villa">Villa</option>
                <option value="Office">Office</option>
              </NormalSelect>
            </Grid>
          </Grid.Container>
          <Grid.Container css={{ gap: '$8' }}>
            <Grid xs sm={3}>
              <Input
                label="Adress"
                name="address"
                {...register('address', {
                  required: 'This field is required',
                })}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid xs={4} sm={3}>
              <Input
                label="City"
                name="city"
                {...register('city', {
                  required: 'This field is required',
                })}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid xs={2}>
              <Input
                label="Zipcode"
                name="zipcode"
                {...register('zipcode', {
                  required: 'This field is required',
                })}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid xs={12} sm={3} direction="column">
              <Label css={{ fs: '$xs', color: '$black' }}>Country</Label>
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    classNamePrefix="react-select"
                    options={countries}
                    placeholder="Select Country"
                    css={{ w: '100%' }}
                  />
                )}
              />
            </Grid>
          </Grid.Container>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              'Submit'
            )}
          </Button>
        </Grid.Container>
      </Container>
    </Layout>
  );
}
export const getStaticProps = async () => {
  const result = await prisma.country.findMany({
    orderBy: {
      label: 'asc',
    },
    select: {
      value: true,
      label: true,
    },
  });

  return {
    props: {
      countries: JSON.parse(JSON.stringify(result)),
    },
  };
};
