import { useState } from 'react';
import {
  useDeleteTagMutation,
  useGetTagsQuery,
  useLazyExportTagsQuery,
  useLazyUnLinkTagQuery,
  useUpdateTagMutation,
} from '@/store/tags';
import DataTable from '@/components/ui/DataTable';
import {
  Button,
  Stack,
  SvgIcon,
  Switch,
  Typography,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { downloadBlob } from '@/utils/downloadBlob';
import useDialog from '@/components/hooks/useDialog';
import LinkTagDialog from './LinkTagDialog';

const TagsTable = ({ batch, user }: any) => {
  const router = useRouter();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data, refetch } = useGetTagsQuery({
    ...query,
    batch,
    user,
  });
  const [deleteTag] = useDeleteTagMutation();
  const [updateTag] = useUpdateTagMutation();
  const [unlinkTag] = useLazyUnLinkTagQuery();
  const [exportTags] = useLazyExportTagsQuery();
  const linkTagDialog = useDialog();
  updateTag;
  const columns = [
    {
      headerName: 'URL',
      field: 'url',
      flex: 1,
    },
    {
      headerName: 'Active',
      field: 'user',
      width: 100,
      renderCell: ({ row }: any) => {
        return <>{row.user ? <CheckIcon /> : <CloseIcon />}</>;
      },
    },
    {
      headerName: '',
      field: 'id',
      width: 100,
      renderCell: ({ row }: any) => {
        return row.user ? (
          <Button
            onClick={() => {
              handleUnlinkTag(row.id);
            }}
          >
            Unlink
          </Button>
        ) : (
          <></>
        );
      },
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 100,
      renderCell: ({ row }: any) => {
        return (
          <Switch
            checked={row.status}
            onChange={(e, c) => {
              handleStatusChange(row.id, c);
            }}
          ></Switch>
        );
      },
    },
  ];

  const handleEditTag = (id: any) => {
    const foundElement = data.results.find(
      (element: any) => element.id === id
    );
    if (foundElement.customId) {
      router.push(`/tags/edit/${id}`);
    } else {
      toast.error('You are not allowed to edit this tag.');
    }
  };

  const handleDeleteTag = (id: any) => {
    deleteTag(id);
  };

  const handleUnlinkTag = async (id: any) => {
    try {
      await unlinkTag(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id: any, event: any) => {
    console.log(id, event);
    try {
      const updatStatus = {
        status: event,
      };

      await updateTag({
        id,
        body: updatStatus,
      }).unwrap();
      toast.success('Tag updated');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleExportTags = async () => {
    try {
      const res: any = await exportTags({ batch, user }).unwrap();
      downloadBlob(res, 'tags.csv', 'text/csv; name="tags.csv"');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              onClick={() => {
                if (user) {
                  linkTagDialog.open();
                } else {
                  router.push(`/tags/add?batch=${batch}`);
                }
              }}
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
        onEdit={!user ? handleEditTag : undefined}
        onDelete={!user ? handleDeleteTag : undefined}
        onExport={handleExportTags}
      />
      {linkTagDialog.isOpen && (
        <LinkTagDialog
          onClose={() => {
            linkTagDialog.close();
            refetch();
          }}
          user={user}
        />
      )}
    </>
  );
};

export default TagsTable;
