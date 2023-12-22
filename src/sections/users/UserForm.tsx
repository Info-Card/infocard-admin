import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/store/user';
import CustomField from '@/components/custom-field';
import CustomSelectField from '@/components/custom-select-field';
import { useAuth } from '@/hooks/use-auth';

interface FormData {
  username: string;
  email: string;
  role: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  role: yup.string().required(),
});

const UserForm = ({ user }: any) => {
  const router = useRouter();

  const [createUser, { isLoading: createLoading }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: updateLoading }] =
    useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      role: user?.role || '',
    },
    resolver: yupResolver(schema),
  });
  const { userLoged } = useAuth();

  const onSubmit = async (body: FormData) => {
    try {
      if (user) {
        await updateUser({
          id: user.id,
          body,
        }).unwrap();
      } else {
        await createUser({
          ...body,
        }).unwrap();
      }
      toast.success('User updated');
      router.replace(`/users`);
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
            name="username"
            label="Username"
            control={control}
            error={errors.username}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            variant="filled"
            name="email"
            label="Email"
            control={control}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomSelectField
            name="role"
            label="Role"
            control={control}
            error={errors.role}
            options={[
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
            ]}
            // Disable the field based on the condition
            disabled={userLoged?.email === user.email}
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
            ) : user ? (
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

export default UserForm;
