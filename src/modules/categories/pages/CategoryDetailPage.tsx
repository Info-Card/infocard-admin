import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { useParams } from 'next/navigation';
import { useGetCategoryQuery } from '@/store/categories';
import PlatformsTable from '@/modules/platforms/components/PlatformsTable';

const CategoryDetailPage = () => {
  const params = useParams();

  const { data } = useGetCategoryQuery(params?.id, {
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
          <Typography variant="h4">{data?.name}</Typography>
          <Box sx={{ mt: 2 }}>
            {data && <PlatformsTable category={data?.id} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

CategoryDetailPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CategoryDetailPage;
