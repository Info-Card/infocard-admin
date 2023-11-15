import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import UserForm from '@/sections/users/UserForm';
import { useGetUserQuery } from '@/store/user';

const EditItemPage = () => {
  const { id } = useParams();

  const { data } = useGetUserQuery(id);

  if (!data) {
    return;
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Update User</Typography>
          <UserForm user={data} />
        </Container>
      </Box>
    </>
  );
};

EditItemPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default EditItemPage;
