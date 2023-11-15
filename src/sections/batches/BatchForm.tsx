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

interface FormData {
  name: string;
  description: string;
  quantity?: number;
}

const BatchForm = ({ batch }: any) => {
  const router = useRouter();

  const [createBatch, { isLoading: createLoading }] =
    useCreateBatchMutation();
  const [updateBatch, { isLoading: updateLoading }] =
    useUpdateBatchMutation();

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    quantity: yup
      .number()
      .when('$condition', (condition, schema) =>
        batch ? schema : schema.required()
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: batch?.name || '',
      description: batch?.description || '',
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
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="description"
            label="Description"
            control={control}
            error={errors.description}
          />
        </Grid>
        {!batch && (
          <Grid item xs={12} md={4}>
            <CustomField
              variant="filled"
              name="quantity"
              label="Quantity"
              type="number"
              control={control}
              error={errors.quantity}
            />
          </Grid>
        )}
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
