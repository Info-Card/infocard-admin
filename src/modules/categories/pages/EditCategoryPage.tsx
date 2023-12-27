import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import { useGetCategoryQuery } from '@/store/categories';
import CategoryForm from '../components/CategoryForm';

const EditCategoryPage = () => {
  const { id } = useParams();

  const { data } = useGetCategoryQuery(id);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Update Category</Typography>
          <CategoryForm category={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

EditCategoryPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default EditCategoryPage;
