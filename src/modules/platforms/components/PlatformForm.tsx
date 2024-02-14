import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import {
  useCreatePlatformMutation,
  useUpdatePlatformMutation,
} from '@/store/platforms';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/router';
import CustomField from '@/components/ui/CustomField';

interface FormData {
  title: string;
  headline?: string;
  webBaseURL?: string;
  iOSBaseURL?: string;
  androidBaseURL?: string;
  type: string;
  image?: any;
  accept?: string;
}

const schema = yup.object().shape({
  title: yup.string().required(),
  headline: yup.string(),
  webBaseURL: yup.string(),
  iOSBaseURL: yup.string(),
  androidBaseURL: yup.string(),
  type: yup.string().required(),
  image: yup.mixed(),
  accept: yup.string(),
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: platform?.title || '',
      headline: platform?.headline || '',
      webBaseURL: platform?.webBaseURL || '',
      iOSBaseURL: platform?.iosBaseURL || '',
      androidBaseURL: platform?.androidBaseURL || '',
      type: platform?.type || '',
      image: platform?.image || '',
      accept: platform?.accept || '',
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

  const type = watch('type');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      encType="multipart/form-data"
    >
      <Grid sx={{ my: 4 }} container spacing={1}>
        <Grid item xs={12} md={4}>
          <CustomField
            name="title"
            label="Title"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="headline"
            label="Headline"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="webBaseURL"
            label="Web Base Url"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="iOSBaseURL"
            label="iOS Base Url"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="androidBaseURL"
            label="Android Base Url"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            label=""
            control={control}
            name="image"
            type="file"
            accept="image/*"
            errors={errors}
            setValue={setValue}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="type"
            label="Type"
            type="select"
            control={control}
            errors={errors}
            options={[
              { label: 'Contact', value: 'contact' },
              { label: 'File', value: 'file' },
              { label: 'Phone', value: 'phone' },
              { label: 'Url', value: 'url' },
              { label: 'Email', value: 'email' },
              { label: 'Username', value: 'username' },
              { label: 'WhatsApp', value: 'whatsapp' },
            ]}
          />
        </Grid>
        {type === 'file' && (
          <Grid item xs={12} md={4}>
            <CustomField
              label="Accept"
              control={control}
              name="accept"
              errors={errors}
            />
          </Grid>
        )}
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
