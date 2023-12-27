import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import BatchForm from '../components/BatchForm';

const AddBatchPage = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Add Batch</Typography>
          <BatchForm />
        </Container>
      </Box>
    </>
  );
};

AddBatchPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddBatchPage;
