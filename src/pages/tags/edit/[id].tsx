import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import TagForm from '@/sections/tags/TagForm';
import { useGetTagQuery } from '@/store/tags';

const EditTagPage = () => {
  const { id } = useParams();

  const { data } = useGetTagQuery(id);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Update Tag</Typography>
          <TagForm tag={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

EditTagPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default EditTagPage;
