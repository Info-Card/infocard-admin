import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import { useGetPlatformQuery } from '@/store/platforms';
import PlatformForm from '../components/PlatformForm';

const EditPlatformPage = () => {
  const params = useParams();

  const { data } = useGetPlatformQuery(params?.id, {
    skip: !params?.id,
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Update Platform</Typography>
          <PlatformForm platform={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

EditPlatformPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default EditPlatformPage;
