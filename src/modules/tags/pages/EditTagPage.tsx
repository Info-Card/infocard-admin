import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import { useGetTagQuery } from '@/store/tags';
import TagForm from '../components/TagForm';

const EditTagPage = () => {
  const params = useParams();

  const { data } = useGetTagQuery(params?.id, { skip: !params?.id });

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
