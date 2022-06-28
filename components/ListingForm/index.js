import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Router from 'next/router';
import {
  Button,
  Grid,
  Input,
  Loading,
  Radio,
  Text,
  Textarea,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';

import { propertyTypes } from '@/lib/constants';

import { Label, NormalSelect, ReactSelect, Wrapper } from '../GlobalComponents';
import MultiImageUpload from '../ImageUpload/MultiImageUpload';
import NoAgencyWarning from '../NoAgencyWarning';

export default function ListingForm({
  onSubmit = () => {},
  countries,
  initialValues = null,
  newListingPage = false,
  redirectPath = '',
}) {
  const { data: session, status } = useSession();
  const [imagesUrls, setImagesUrls] = useState(initialValues?.images ?? []);
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      ...(initialValues ?? {}),
    },
  });
  const { errors, isSubmitting } = formState;
  const hasNoAgency = !session?.user?.agencyId;
  const handleOnSubmit = async (data) => {
    let toastId;
    try {
      toastId = toast.loading(
        `${newListingPage ? 'Adding new' : 'Updating'} listing...`
      );
      const newListing = { ...data, images: imagesUrls };
      await onSubmit(newListing);
      toast.success(
        `Listing ${newListingPage ? 'added' : 'updated'} successfully!`,
        {
          id: toastId,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      if (redirectPath) {
        Router.replace(redirectPath);
      } else {
        Router.replace('/my/listings');
      }
    }
  };
  return (
    <Wrapper
      css={{
        '@md': {
          px: '$20',
        },
      }}
    >
      {status === 'authenticated' && (
        <>
          {hasNoAgency ? (
            <Grid.Container>
              <Grid xs={12} justify='center'>
                <NoAgencyWarning />
              </Grid>
            </Grid.Container>
          ) : (
            <>
              <Text h4>{newListingPage ? 'List' : 'Update'} property</Text>
              <Text css={{ color: '$accents6' }}>
                Fill out the form below to{' '}
                {newListingPage ? 'list a new' : 'update your'} property.
              </Text>
              <Grid.Container
                as='form'
                onSubmit={handleSubmit(handleOnSubmit)}
                css={{ my: '$11', gap: '$15' }}
              >
                <Grid xs={12}>
                  <Input
                    name='title'
                    {...register('title', { required: true })}
                    status={errors.title ? 'error' : 'default'}
                    helperText={errors.title?.message}
                    label='Title'
                    type='text'
                    placeholder='Listing Title'
                    fullWidth
                  />
                </Grid>
                <Grid xs={12}>
                  <MultiImageUpload
                    setImagesUrls={setImagesUrls}
                    initialImages={initialValues?.images}
                  />
                </Grid>
                <Grid xs={12}>
                  <Textarea
                    name='description'
                    {...register('description', { required: true })}
                    status={errors.description ? 'error' : 'default'}
                    helperText={errors.description?.message}
                    label='Description'
                    fullWidth
                  />
                </Grid>
                <Grid.Container alignItems='center'>
                  <Text>Is this property for</Text>
                  <Controller
                    control={control}
                    name='status'
                    {...register('status', {
                      required: 'This field is required',
                    })}
                    render={({ field }) => (
                      <Radio.Group
                        orientation='horizontal'
                        css={{ ml: '$10' }}
                        {...field}
                        aria-label='Status'
                        labelColor={errors.status ? 'error' : 'default'}
                      >
                        <Radio value='for-rent' size='sm'>
                          Rent
                        </Radio>
                        <Radio value='for-sale' size='sm'>
                          Sale
                        </Radio>
                      </Radio.Group>
                    )}
                  />
                </Grid.Container>
                <Grid.Container css={{ gap: '$8' }}>
                  <Grid xs={4} sm={2.5}>
                    <Input
                      name='price'
                      {...register('price', {
                        required: 'This field is required',
                        valueAsNumber: true,
                        minLength: 3,
                        min: 100,
                      })}
                      status={errors.price ? 'error' : 'default'}
                      helperText={errors.price?.message}
                      label='Price'
                      type='number'
                      labelLeft='$'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={3.9} sm={2}>
                    <Input
                      label='Size'
                      name='size'
                      {...register('size', {
                        required: 'This field is required',
                        valueAsNumber: true,
                        minLength: 2,
                      })}
                      status={errors.size ? 'error' : 'default'}
                      helperText={errors.size?.message}
                      type='number'
                      labelRight='m²'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={3} sm={1.5}>
                    <Input
                      label='N of Rooms'
                      name='rooms'
                      {...register('rooms', {
                        required: 'This field is required',
                        valueAsNumber: true,
                        minLength: 1,
                        min: 1,
                      })}
                      status={errors.rooms ? 'error' : 'default'}
                      helperText={errors.rooms?.message}
                      type='number'
                      placeholder='13'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={4} sm={1.5}>
                    <Input
                      label='N of Bathrooms'
                      name='bathrooms'
                      {...register('bathrooms', {
                        required: 'This field is required',
                        valueAsNumber: true,
                        minLength: 1,
                        min: 1,
                      })}
                      status={errors.bathrooms ? 'error' : 'default'}
                      helperText={errors.bathrooms?.message}
                      type='number'
                      placeholder='2'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs sm={3.8} direction='column'>
                    <Label>Property type</Label>
                    <NormalSelect
                      name='propertyType'
                      {...register('propertyType', {
                        required: 'This field is required',
                      })}
                      css={{ w: '100%' }}
                      aria-label='Property type'
                    >
                      <option value=''>Select Property Type</option>
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </NormalSelect>
                  </Grid>
                </Grid.Container>
                <Grid.Container css={{ gap: '$8' }}>
                  <Grid xs sm={3}>
                    <Input
                      label='Address'
                      name='address'
                      {...register('address', {
                        required: 'This field is required',
                      })}
                      status={errors.address ? 'error' : 'default'}
                      helperText={errors.address?.message}
                      type='text'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={4} sm={3}>
                    <Input
                      label='City'
                      name='city'
                      {...register('city', {
                        required: 'This field is required',
                      })}
                      status={errors.city ? 'error' : 'default'}
                      helperText={errors.city?.message}
                      type='text'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={2}>
                    <Input
                      label='Zipcode'
                      name='zipcode'
                      {...register('zipcode', {
                        required: 'This field is required',
                      })}
                      status={errors.zipcode ? 'error' : 'default'}
                      helperText={errors.zipcode?.message}
                      type='text'
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={3.5} direction='column'>
                    <Label>Country</Label>
                    <Controller
                      control={control}
                      name='country'
                      {...register('country', {
                        required: 'This field is required',
                      })}
                      render={({ field }) => (
                        <ReactSelect
                          {...field}
                          classNamePrefix='react-select'
                          options={countries}
                          placeholder='Select Country'
                          css={{ w: '100%' }}
                        />
                      )}
                    />
                  </Grid>
                </Grid.Container>
                <Button disabled={isSubmitting} type='submit'>
                  {isSubmitting ? (
                    <Loading type='points' color='currentColor' size='sm' />
                  ) : newListingPage ? (
                    'List'
                  ) : (
                    'Update'
                  )}
                </Button>
              </Grid.Container>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}
