import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import {
  useCreatePlatformMutation,
  useUpdatePlatformMutation,
} from '@/store/platforms';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';
import CustomField from '@/components/custom-field';
import CustomSelectField from '@/components/custom-select-field';

interface FormData {
  title: string;
  headline?: string;
  webBaseURL?: string;
  iOSBaseURL?: string;
  androidBaseURL?: string;
  type: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  headline: yup.string(),
  webBaseURL: yup.string(),
  iOSBaseURL: yup.string(),
  androidBaseURL: yup.string(),
  type: yup.string().required(),
});

const PlatformForm = ({ platform, category }: any) => {
  const router = useRouter();

  const [createPlatform, { isLoading: createLoading }] =
    useCreatePlatformMutation();
  const [updatePlatform, { isLoading: updateLoading }] =
    useUpdatePlatformMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: platform?.title || '',
      headline: platform?.headline || '',
      webBaseURL: platform?.webBaseURL || '',
      iOSBaseURL: platform?.iosBaseURL || '',
      androidBaseURL: platform?.androidBaseURL || '',
      type: platform?.type || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: FormData) => {
    try {
      if (platform) {
        await updatePlatform({
          id: platform.id,
          body,
        }).unwrap();
      } else {
        await createPlatform({
          ...body,
          category,
        }).unwrap();
      }
      toast.success('Platform updated');
      router.replace(`/categories/${category || platform.category}`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ my: 4 }} container spacing={1}>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="title"
            label="Title"
            control={control}
            error={errors.title}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="headline"
            label="Headline"
            control={control}
            error={errors.headline}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="webBaseURL"
            label="Web Base Url"
            control={control}
            error={errors.webBaseURL}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="iOSBaseURL"
            label="iOS Base Url"
            control={control}
            error={errors.iOSBaseURL}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="androidBaseURL"
            label="Android Base Url"
            control={control}
            error={errors.androidBaseURL}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomSelectField
            name="type"
            label="Type"
            control={control}
            error={errors.type}
            options={[
              { label: 'Contact', value: 'contact' },
              { label: 'File', value: 'file' },
              { label: 'Phone', value: 'phone' },
              { label: 'Url', value: 'url' },
              { label: 'Email', value: 'email' },
              { label: 'Username', value: 'username' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="large"
            type="submit"
            variant="contained"
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? (
              <Loader />
            ) : platform ? (
              'Update'
            ) : (
              'Add'
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PlatformForm;
