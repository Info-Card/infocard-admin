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
import { DashboardLayout } from '@/layouts/dashboard/layout';
import {
  useDeleteBatchMutation,
  useGetBatchesQuery,
} from '@/store/batches';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DataTable from '@/components/ui/DataTable';

const columns = [
  {
    field: 'name',
    flex: 2,
    renderCell: ({ row }: any) => {
      return (
        <Link
          href={`/batches/${row.id}`}
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
  {
    field: 'description',
    flex: 2,
    renderCell: ({ row }: any) => {
      return (
        <Stack direction="row" spacing={1}>
          {row.description}
        </Stack>
      );
    },
  },
  {
    field: 'createdAt',
    flex: 1,
    renderCell: ({ row }: any) => {
      return (
        <Stack direction="row" spacing={1}>
          {row.createdAt.split('T')[0]}
        </Stack>
      );
    },
  },
];

const BatchesPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data } = useGetBatchesQuery(query);
  const [deleteBatch] = useDeleteBatchMutation();

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
            <Typography variant="h4">Batches</Typography>
            <Link href="/batches/add">
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
              router.replace(`/batches/${id}`);
            }}
            onEdit={(id: any) => {
              router.replace(`/batches/edit/${id}`);
            }}
            onDelete={(id: any) => {
              deleteBatch(id);
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

BatchesPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default BatchesPage;
