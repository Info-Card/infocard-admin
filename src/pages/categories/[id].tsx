import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import CategoryForm from '@/sections/categories/CategoryForm';
import { useGetCategoryQuery } from '@/store/categories';

const AddCategoryPage = () => {
  const { id } = useParams();

  const { data } = useGetCategoryQuery(id, {
    skip: id === 'add',
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
          <Typography variant="h4">
            {data ? 'Update Category' : 'Add Category'}
          </Typography>
          <CategoryForm category={data} key={data?.id} />
        </Container>
      </Box>
    </>
  );
};

AddCategoryPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddCategoryPage;
