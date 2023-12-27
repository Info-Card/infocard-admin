import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useSearchParams } from 'next/navigation';
import PlatformForm from '../components/PlatformForm';

const AddPlatformPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4">Add Platform</Typography>
        <PlatformForm category={category} />
      </Container>
    </Box>
  );
};

AddPlatformPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddPlatformPage;
