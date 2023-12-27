import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import { useGetUserQuery } from '@/store/user';
import UserForm from '../components/UserForm';

const EditUserPage = () => {
  const params = useParams();

  const { data } = useGetUserQuery(params?.id, { skip: !params?.id });

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

EditUserPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default EditUserPage;
