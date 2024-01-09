import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/use-auth';
import CustomField from '@/components/ui/CustomField';
import { useLazyLinkTagQuery } from '@/store/tags';

interface FormData {
  tagId: string;
}

const schema = yup.object().shape({
  tagId: yup.string().required(),
});

const AddTagForm = ({ user }: any) => {
  const router = useRouter();
  const [linkTag, { data }] = useLazyLinkTagQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tagId: user?.tagId || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: FormData) => {
    console.log(body, 'onSubmit is here');
    try {
      await linkTag({ userId: user.id, tagId: body.tagId });
      toast.success('User updated');
      router.replace(`/users`);
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Typography variant="h6">Add New Tags</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid sx={{ mt: 4 }} container spacing={1}>
          <Grid item xs={12} md={4}>
            <CustomField
              name="tagId"
              label="Tag Id"
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <Button size="large" type="submit" variant="contained">
              {'Add'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddTagForm;
