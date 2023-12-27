import { useState } from 'react';
import { useDeleteTagMutation, useGetTagsQuery } from '@/store/tags';
import DataTable from '@/components/data-table';
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
import router, { useRouter } from 'next/router';
import { id } from 'date-fns/locale';
import { any } from 'prop-types';
import { toast } from 'react-toastify';

const TagsTable = ({ batch }: any) => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });
  const [callEditFunction, setCallEditFunction] = useState(true);

  const { data } = useGetTagsQuery({ ...query, batch });
  const [deleteTag] = useDeleteTagMutation();
  const columns = [
    {
      field: 'id',
      flex: 1,
    },
    {
      field: 'customId',
      flex: 1,
    },
    {
      field: 'user',
      flex: 1,
    },
  ];

  return (
    <DataTable
      title={
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">Tags</Typography>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
            size="small"
            onClick={() => router.push(`/tags/add?batch=${batch}`)}
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
        const foundElement = data.results.find(
          (element: any) => element.id === id
        );

        if (foundElement.customId !== undefined) {
          router.push(`/tags/edit/${id}`);
        } else {
          toast.error('You are not allowed to edit this tag.');
        }
      }}
      onDelete={(id: any) => {
        deleteTag(id);
      }}
    />
  );
};

export default TagsTable;
