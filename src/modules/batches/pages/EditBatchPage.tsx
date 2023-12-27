import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import { useGetBatchQuery } from '@/store/batches';
import BatchForm from '../components/BatchForm';

const EditBatchPage = () => {
  const params = useParams();

  const { data } = useGetBatchQuery(params?.id, {
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
          <Typography variant="h4">Update Batch</Typography>
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
