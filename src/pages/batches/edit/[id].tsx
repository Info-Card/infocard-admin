import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import BatchForm from '@/sections/batches/BatchForm';
import { useGetBatchQuery } from '@/store/batches';

const EditBatchPage = () => {
  const { id } = useParams();

  const { data } = useGetBatchQuery(id);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Edit Batch</Typography>
          <BatchForm batch={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

EditBatchPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default EditBatchPage;
