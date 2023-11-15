import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';
import {
  useCreateBatchMutation,
  useUpdateBatchMutation,
} from '@/store/batches';
import CustomField from '@/components/custom-field';
import CustomSelectField from '@/components/custom-select-field';

interface FormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

const BatchForm = ({ batch }: any) => {
  const router = useRouter();

  const [createBatch, { isLoading: createLoading }] =
    useCreateBatchMutation();
  const [updateBatch, { isLoading: updateLoading }] =
    useUpdateBatchMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: batch?.name || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: FormData) => {
    try {
      if (batch) {
        await updateBatch({
          id: batch.id,
          body,
        }).unwrap();
      } else {
        await createBatch({
          ...body,
        }).unwrap();
      }
      toast.success('Batch updated');
      router.replace(`/batches`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ mt: 4 }} container spacing={1}>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="name"
            label="Name"
            control={control}
            error={errors.name}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Button
          size="large"
          sx={{ mt: 3, float: 'right' }}
          type="submit"
          variant="contained"
          disabled={createLoading || updateLoading}
        >
          {createLoading || updateLoading ? (
            <Loader />
          ) : batch ? (
            'Update'
          ) : (
            'Add'
          )}
        </Button>
      </Grid>
    </form>
  );
};

export default BatchForm;
