import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import TagForm from '@/sections/tags/TagForm';
import { useSearchParams } from 'next/navigation';

const AddTagPage = () => {
  const searchParams = useSearchParams();
  const batch = searchParams.get('batch');

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Add Tag</Typography>
          <TagForm batch={batch} />
        </Container>
      </Box>
    </>
  );
};

AddTagPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddTagPage;
