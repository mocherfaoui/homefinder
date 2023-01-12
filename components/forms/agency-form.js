import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Button,
  Grid,
  Input,
  Loading,
  Text,
  Textarea,
} from '@nextui-org/react';

import { OneImageUpload, ReactSelect } from '@/components/shared';

export function AgencyForm({
  countries,
  initialValues = null,
  onSubmit = () => {},
  redirectPath = '',
  newAgencyPage = false,
}) {
  const [logoUrl, setLogoUrl] = useState(initialValues?.logo ?? '');
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: {
      ...(initialValues ?? {}),
    },
  });
  const { errors, isSubmitting } = formState;
  const handleOnSubmit = async (data) => {
    let toastId;
    try {
      toastId = toast.loading(
        newAgencyPage ? 'Creating new agency...' : 'Updating Agency details...'
      );
      const newAgency = { ...data, logo: logoUrl };
      await onSubmit(newAgency);
    } catch (error) {
      toast.error('An error occurred.', {
        id: toastId,
      });
    } finally {
      toast.success(
        newAgencyPage ? 'Agency created!' : 'Agency details updated!',
        {
          id: toastId,
        }
      );
      if (redirectPath) {
        setTimeout(() => {
          window.location.replace('/listing/new');
        }, 2500);
      }
    }
  };
  return (
    <Grid.Container
      as='form'
      css={{ my: '$11', gap: '$15' }}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Grid xs={12} sm={5}>
        <Input
          label='Name'
          fullWidth
          type='text'
          placeholder='Agency Name'
          name='name'
          {...register('name', { required: true })}
        />
      </Grid>
      <Grid.Container xs={12} sm justify='end'>
        <Grid xs={5} sm={0} alignItems='center'>
          <Text span>Agency logo:</Text>
        </Grid>
        <Grid xs={7} justify='end'>
          <OneImageUpload
            setLogoUrl={setLogoUrl}
            initialLogoUrl={initialValues?.logo}
          />
        </Grid>
      </Grid.Container>
      <Grid xs={12}>
        <Textarea
          label='Description'
          fullWidth
          name='description'
          {...register('description', { required: true })}
        />
      </Grid>
      <Grid.Container justify='space-between'>
        <Grid xs={5.8}>
          <Input
            label='Email'
            fullWidth
            type='email'
            name='email'
            {...register('email', { required: true })}
            placeholder='email@example.com'
          />
        </Grid>
        <Grid xs={5.8}>
          <Input
            label='Phone Number'
            fullWidth
            type='tel'
            name='phone'
            {...register('phone', { required: true })}
            labelLeft='+1'
            placeholder='(123) 456-7890'
          />
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
            type='text'
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <ReactSelect
            name='country'
            hookFormMethods={{
              register,
              control,
              options: { required: 'This field is required' },
            }}
            label='Country'
            options={countries}
            placeholder='Select Country'
          />
        </Grid>
      </Grid.Container>
      <Button disabled={isSubmitting} type='submit'>
        {isSubmitting ? (
          <Loading type='points' color='currentColor' size='sm' />
        ) : newAgencyPage ? (
          'Create'
        ) : (
          'Update'
        )}
      </Button>
    </Grid.Container>
  );
}
