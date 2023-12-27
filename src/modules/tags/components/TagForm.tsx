import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from '@/store/tags';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/router';
import CustomField from '@/components/ui/CustomField';

interface FormData {
  customId?: string;
}

const schema = yup.object().shape({
  customId: yup.string(),
});

const TagForm = ({ tag, batch }: any) => {
  const router = useRouter();

  const [createTag, { isLoading: createLoading }] =
    useCreateTagMutation();
  const [updateTag, { isLoading: updateLoading }] =
    useUpdateTagMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      customId: tag?.customId || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: FormData) => {
    try {
      if (tag) {
        await updateTag({
          id: tag.id,
          body,
        }).unwrap();
      } else {
        await createTag({
          ...body,
          batch,
        }).unwrap();
      }
      toast.success('Tag updated');
      router.replace(`/batches/${batch || tag.batch}`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ my: 4 }} container spacing={1}>
        <Grid item xs={12} md={4}>
          <CustomField
            name="customId"
            label="Custom Id"
            control={control}
            errors={errors}
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
            ) : tag ? (
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

export default TagForm;
