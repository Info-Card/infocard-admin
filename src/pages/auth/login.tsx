import Head from 'next/head';
import { Box, Button, Stack, Typography } from '@mui/material';
import { AuthLayout } from '@/layouts/auth/layout';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSearchParams } from 'next/navigation';
import CustomField from '@/components/ui/CustomField';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPage = () => {
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Info Card Admin</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CustomField
                name="email"
                label="Email"
                control={control}
                errors={errors}
                autoComplete="off"
              />
              <CustomField
                name="password"
                label="Password"
                type="password"
                control={control}
                errors={errors}
                autoComplete="off"
              />
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

LoginPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
LoginPage.authGuard = false;

export default LoginPage;
