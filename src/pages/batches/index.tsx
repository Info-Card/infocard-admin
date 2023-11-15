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
  useDeleteBatchMutation,
  useGetBatchesQuery,
} from '@/store/batches';
import Link from 'next/link';
import { useRouter } from 'next/router';

const columns = [
  { field: 'id', flex: 1 },
  { field: 'name', flex: 1 },
];

const BatchesPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
  });

  const { data } = useGetBatchesQuery(query);
  const [deleteBatch] = useDeleteBatchMutation();

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
            onEdit={(id: any) => {
              router.replace(`/batches/${id}`);
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
