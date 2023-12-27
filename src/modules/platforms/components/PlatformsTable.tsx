import { useState } from 'react';
import {
  useDeletePlatformMutation,
  useGetPlatformsQuery,
} from '@/store/platforms';
import DataTable from '@/components/ui/DataTable';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { getInitials } from '@/utils/get-initials';
import { getImageUrl } from '@/utils/get-Image-url';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRouter } from 'next/router';

const PlatformsTable = ({ category }: any) => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data } = useGetPlatformsQuery({ ...query, category });
  const [deletePlatform] = useDeletePlatformMutation();

  const columns = [
    {
      field: 'title',
      flex: 2,
      renderCell: ({ row }: any) => {
        return (
          <Link
            href={`/platforms/edit/${row.id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Stack direction="row" spacing={1}>
              <Avatar src={getImageUrl(row.image) || ''}>
                {getInitials(row.name)}
              </Avatar>
              <div>
                {row.title}
                <br />
                ID: {row.id}
              </div>
            </Stack>
          </Link>
        );
      },
    },
    {
      field: 'headline',
      flex: 1,
    },
    {
      field: 'type',
      flex: 1,
    },
  ];

  return (
    <DataTable
      title={
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">Platforms</Typography>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
            size="small"
            onClick={() =>
              router.push(`/platforms/add?category=${category}`)
            }
          >
            Add
          </Button>
        </Stack>
      }
      rows={data?.results}
      rowCount={data?.totalResults}
      columns={columns}
      query={query}
      setQuery={setQuery}
      onEdit={(id: any) => {
        router.push(`/platforms/edit/${id}`);
      }}
      onDelete={(id: any) => {
        deletePlatform(id);
      }}
    />
  );
};

export default PlatformsTable;
