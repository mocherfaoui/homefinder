import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button, Grid, Input } from '@nextui-org/react';
import useSWR from 'swr';

import { getCountries } from '@/lib/db';

import MyPagesLayout from '@/components/Layout/MyLayout';
import { OneImageUpload, ReactSelect } from '@/components/shared';

import { fetcher } from '@/utils/fetcher';

export default function MyPersonaProfilePage({ countries }) {
  const { data: initialValues, mutate } = useSWR('/api/user/info', fetcher, {
    refreshInterval: 0,
  });
  const [logoUrl, setLogoUrl] = useState(initialValues?.image ?? '');
  const { register, handleSubmit, control } = useForm();

  const handleOnSubmit = async (data) => {
    const newData = { ...data, image: logoUrl };
    let toastId;
    try {
      toastId = toast.loading('Updating...', {
        id: toastId,
      });
      await fetch('/api/user/info', {
        body: JSON.stringify(newData),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await mutate();
    } catch (error) {
      toast.error('An error occured', {
        id: toastId,
      });
    } finally {
      toast.success('Information Updated!', {
        id: toastId,
      });
    }
  };
  useEffect(() => {
    setLogoUrl(initialValues?.image);
  }, [initialValues]);

  return (
    <MyPagesLayout pageTitle='My Personal Profile'>
      <Grid xs={12}>
        {!!initialValues && (
          <Grid.Container
            as='form'
            onSubmit={handleSubmit(handleOnSubmit)}
            gap={2}
            css={{ px: 0 }}
          >
            <Grid xs={12}>
              <Grid.Container
                gap={2}
                css={{
                  px: 0,
                  '@xsMax': {
                    flexFlow: 'column-reverse',
                  },
                }}
                wrap='nowrap'
              >
                <Grid xs={12} sm={5}>
                  <Grid.Container gap={2} css={{ px: 0 }}>
                    <Grid xs={12}>
                      <Input
                        label='Name'
                        type='text'
                        fullWidth
                        name='name'
                        initialValue={initialValues?.name}
                        {...register('name', { required: true })}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Input
                        label='Email'
                        readOnly
                        fullWidth
                        initialValue={initialValues?.email}
                      />
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid
                  xs={12}
                  sm={7}
                  justify='flex-end'
                  alignItems='center'
                  css={{
                    '@xsMax': {
                      jc: 'center',
                    },
                  }}
                >
                  <OneImageUpload
                    setLogoUrl={setLogoUrl}
                    initialLogoUrl={initialValues?.image}
                  />
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={6} sm={4}>
              <Input
                label='Address'
                fullWidth
                name='address'
                initialValue={initialValues?.address}
                {...register('address', { required: true })}
              />
            </Grid>
            <Grid xs={6} sm={2}>
              <Input
                label='City'
                fullWidth
                name='city'
                initialValue={initialValues?.city}
                {...register('city', { required: true })}
              />
            </Grid>
            <Grid xs={4} sm={2}>
              <Input
                label='Zipcode'
                fullWidth
                name='zipcode'
                initialValue={initialValues?.zipcode}
                {...register('zipcode', { required: true })}
              />
            </Grid>
            <Grid xs={8} sm={4}>
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
                value={initialValues?.country}
              />
            </Grid>
            <Grid xs={12}>
              <Button auto type='submit'>
                Update
              </Button>
            </Grid>
          </Grid.Container>
        )}
      </Grid>
    </MyPagesLayout>
  );
}
export const getStaticProps = async () => {
  const { countries } = await getCountries();

  return {
    props: {
      countries,
    },
  };
};
