import { useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Avatar,
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
  useDeleteUserMutation,
  useGetUsersQuery,
} from '@/store/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getInitials } from '@/utils/get-initials';
import { getImageUrl } from '@/utils/get-Image-url';

const columns = [
  {
    field: 'id',
    flex: 2,
    renderCell: ({ row }: any) => {
      return (
        <Link
          href={`/platforms/edit/${row.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Stack direction="row" spacing={1}>
            <Avatar src={getImageUrl(row.live?.image) || ''}>
              {getInitials(row.live?.name)}
            </Avatar>
            <div>
              {row.live?.name}
              <br />
              ID: {row.id}
            </div>
          </Stack>
        </Link>
      );
    },
  },
  {
    field: 'username',
    flex: 1,
  },
  {
    field: 'email',
    flex: 1,
  },
  {
    field: 'role',
    flex: 1,
  },
];

const UsersPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data } = useGetUsersQuery(query);
  const [deleteUser] = useDeleteUserMutation();
  const placeHolder = 'Search by email';

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
            <Typography variant="h4">Users</Typography>
          </Stack>
          <DataTable
            rows={data?.results}
            rowCount={data?.totalResults}
            columns={columns}
            query={query}
            setQuery={setQuery}
            onEdit={(id: any) => {
              router.replace(`/users/edit/${id}`);
            }}
            onDelete={(id: any) => {
              deleteUser(id);
            }}
            placeHolder={placeHolder}
          />
        </Stack>
      </Container>
    </Box>
  );
};

UsersPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default UsersPage;
