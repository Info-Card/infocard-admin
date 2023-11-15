import { useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import DataTable from '@/components/data-table';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/store/categories';
import Link from 'next/link';
import { useRouter } from 'next/router';

const columns = [
  { field: 'id', flex: 1 },
  { field: 'name', flex: 1 },
];

const CategoriesPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
  });

  const { data } = useGetCategoriesQuery(query);
  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h4">Categories</Typography>
            <Link href="/categories/add">
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                size="small"
              >
                Add
              </Button>
            </Link>
          </Stack>
          <DataTable
            rows={data?.results}
            rowCount={data?.totalResults}
            columns={columns}
            query={query}
            setQuery={setQuery}
            onEdit={(id: any) => {
              router.replace(`/categories/${id}`);
            }}
            onDelete={(id: any) => {
              deleteCategory(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

CategoriesPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default CategoriesPage;
