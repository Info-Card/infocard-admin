import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import CategoryForm from '../components/CategoryForm';

const AddCategoryPage = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Add Category</Typography>
          <CategoryForm />
        </Container>
      </Box>
    </>
  );
};

AddCategoryPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default AddCategoryPage;
