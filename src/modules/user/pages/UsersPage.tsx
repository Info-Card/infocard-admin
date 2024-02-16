import { useState } from 'react';
import {
  Avatar,
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
  useDeleteUserMutation,
  useGetUsersQuery,
  useLazyExportUsersQuery,
} from '@/store/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getInitials } from '@/utils/get-initials';
import { getImageUrl } from '@/utils/get-Image-url';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { downloadBlob } from '@/utils/downloadBlob';

const columns = [
  {
    headerName: 'Name',
    field: 'id',
    width: 300,
    renderCell: ({ row }: any) => {
      return (
        <Link
          href={`/users/${row.id}`}
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
    headerName: 'Username',
    field: 'username',
    flex: 2,
  },
  {
    headerName: 'Email',
    field: 'email',
    flex: 4,
  },
  {
    headerName: 'Role',
    field: 'role',
    flex: 1,
  },
];

const filters = [
  {
    label: 'Role',
    name: 'role',
    type: 'select',
    options: [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
    ],
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
  const [exportUsers] = useLazyExportUsersQuery();

  const handleViewUser = (id: any) => {
    router.replace(`/users/${id}`);
  };

  const handleEditUser = (id: any) => {
    router.replace(`/users/edit/${id}`);
  };

  const handleDeleteUser = (id: any) => {
    deleteUser(id);
  };

  const handleExportUsers = async () => {
    try {
      const res: any = await exportUsers({}).unwrap();

      downloadBlob(res, 'users.csv', 'text/csv; name="users.csv"');
    } catch (error) {
      console.log(error);
    }
  };

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
            <Link href="/users/add">
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
            placeholder="Search by email"
            rows={data?.results}
            rowCount={data?.totalResults}
            columns={columns}
            query={query}
            setQuery={setQuery}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onExport={handleExportUsers}
            filters={filters}
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
