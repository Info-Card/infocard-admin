import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/router';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/store/user';
import { useAuth } from '@/hooks/use-auth';
import CustomField from '@/components/ui/CustomField';

interface FormData {
  username: string;
  email: string;
  role: string;
  password?: string;
}

const UserForm = ({ user }: any) => {
  const router = useRouter();

  const [createUser, { isLoading: createLoading }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: updateLoading }] =
    useUpdateUserMutation();

  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required(),
    role: yup.string().required(),
    password: user ? yup.string() : yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      role: user?.role || 'user',
    },
    resolver: yupResolver(schema),
  });
  const { user: authUser }: any = useAuth();
  const onSubmit = async (body: FormData) => {
    try {
      if (user) {
        if (body.password === '') {
          delete body.password;
        }
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
            name="username"
            label="Username"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="email"
            label="Email"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="role"
            label="Role"
            type="select"
            control={control}
            errors={errors}
            options={[
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
            ]}
            disabled={authUser?.email === (user?.email || '')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomField
            name="password"
            label="Password"
            type="password"
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
