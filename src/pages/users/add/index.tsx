import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import UserForm from '@/sections/users/UserForm';
import { useSearchParams } from 'next/navigation';

const AddUserPage = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Add New User</Typography>
          <UserForm />
        </Container>
      </Box>
    </>
  );
};

AddUserPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddUserPage;
