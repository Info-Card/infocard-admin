import { useState } from 'react';
import {
  useDeleteTagMutation,
  useExportTagMutation,
  useGetTagsQuery,
} from '@/store/tags';
import DataTable from '@/components/ui/DataTable';
import { Button, Stack, SvgIcon, Typography } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const TagsTable = ({ batch }: any) => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data } = useGetTagsQuery({ ...query, batch });
  const [deleteTag] = useDeleteTagMutation();
  const [exportTag] = useExportTagMutation();
  const columns = [
    {
      field: 'url',
      flex: 1,
    },

    {
      field: 'user',
      flex: 1,
      renderCell: ({ row }: any) => {
        return <>{row.user ? <CheckIcon /> : <CloseIcon />}</>;
      },
    },
  ];
  console.log(batch);
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
        if (foundElement.customId) {
          router.push(`/tags/edit/${id}`);
        } else {
          toast.error('You are not allowed to edit this tag.');
        }
      }}
      onDelete={(id: any) => {
        deleteTag(id);
      }}
      onExport={(id: any) => {
        exportTag(id);
      }}
      id={batch}
    />
  );
};

export default TagsTable;
