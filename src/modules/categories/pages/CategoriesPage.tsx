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
import DataTable from '@/components/ui/DataTable';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/store/categories';
import Link from 'next/link';
import { useRouter } from 'next/router';

const columns = [
  {
    field: 'id',
    flex: 2,
    renderCell: ({ row }: any) => {
      return (
        <Link
          href={`/categories/${row.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Stack direction="row" spacing={1}>
            <div>
              {row.name}
              <br />
              ID: {row.id}
            </div>
          </Stack>
        </Link>
      );
    },
  },
];

const CategoriesPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data } = useGetCategoriesQuery(query);
  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
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
            onView={(id: any) => {
              router.replace(`/categories/${id}`);
            }}
            onEdit={(id: any) => {
              router.replace(`/categories/edit/${id}`);
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
