import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import TagsTable from '@/sections/tags/TagsTable';
import { useGetBatchQuery } from '@/store/batches';

const AddBatchPage = () => {
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
          <Typography variant="h4">{data?.name}</Typography>
          <Box sx={{ mt: 2 }}>
            {data && <TagsTable batch={data?.id} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

AddBatchPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddBatchPage;
