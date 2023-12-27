import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/store/categories';
import CustomField from '@/components/ui/CustomField';
import Loader from '@/components/ui/Loader';

interface FormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

const CategoryForm = ({ category }: any) => {
  const router = useRouter();

  const [createCategory, { isLoading: createLoading }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: category?.name || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: FormData) => {
    try {
      if (category) {
        await updateCategory({
          id: category.id,
          body,
        }).unwrap();
      } else {
        await createCategory({
          ...body,
        }).unwrap();
      }
      toast.success('Category updated');
      router.replace(`/categories`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid sx={{ my: 4 }} container spacing={1}>
        <Grid item xs={12} md={4}>
          <CustomField
            name="name"
            label="Name"
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
            ) : category ? (
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

export default CategoryForm;
