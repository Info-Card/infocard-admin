import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import FunnelIcon from '@heroicons/react/24/solid/FunnelIcon';
import { debounce } from 'lodash';
import { filterNotNullOrEmptyFields } from '@/utils/filter-not-null-or-empty-fields';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import Swal from 'sweetalert2';

const DataTable = (props: any) => {
  const {
    title,
    rows,
    rowCount,
    columns,
    query,
    setQuery,
    onEdit,
    onDelete,
    placeHolder,
    isExport,
  } = props;

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: query?.limit || 10,
    page: (query?.page || 0) - 1,
  });

  useEffect(() => {
    setQuery({
      page: (paginationModel.page || 0) + 1,
      limit: paginationModel.pageSize || 10,
    });
  }, [paginationModel, setQuery]);

  const debouncedSearch = debounce(async (search) => {
    setQuery(
      filterNotNullOrEmptyFields({
        page: paginationModel.page,
        limit: paginationModel.pageSize,
        search,
      })
    );
  }, 1000);

  return (
    <Stack spacing={3}>
      <Card sx={{ p: 2 }}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 1 }}
        >
          {title}
          <div />
          <Stack alignItems="center" direction="row">
            <OutlinedInput
              defaultValue=""
              placeholder={placeHolder ? placeHolder : 'Search'}
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{ maxWidth: 500 }}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
            {isExport ? (
              <Button
                color="inherit"
                size="small"
                startIcon={
                  <SvgIcon fontSize="small">
                    <ArrowDownOnSquareIcon />
                  </SvgIcon>
                }
              >
                Export
              </Button>
            ) : (
              ''
            )}
          </Stack>
        </Stack>
        <DataGrid
          autoHeight
          rows={rows || []}
          columns={columns.concat({
            field: 'actions',
            renderCell: ({ id }: any) => {
              return (
                <>
                  {onEdit && (
                    <span
                      onClick={() => {
                        onEdit(id);
                      }}
                    >
                      <SvgIcon fontSize="small">
                        <PencilIcon />
                      </SvgIcon>
                    </span>
                  )}
                  {onDelete && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        marginRight: '20px',
                      }}
                      onClick={() => {
                        Swal.fire({
                          title: '<strong>Warning</strong>',
                          icon: 'warning',
                          html: 'Are you sure you want to delete this?',
                          showCloseButton: true,
                          showCancelButton: true,
                          focusConfirm: false,
                          confirmButtonText: 'Yes',
                          cancelButtonText: 'No',
                        }).then(async (result: any) => {
                          if (result.isConfirmed) {
                            onDelete(id);
                          }
                        });
                      }}
                    >
                      <SvgIcon fontSize="small">
                        <TrashIcon style={{ color: 'red' }} />
                      </SvgIcon>
                    </span>
                  )}
                </>
              );
            },
          })}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          pagination // Enable pagination
          paginationMode="server" // Set pagination mode to server
          rowCount={rowCount || 0} // Set the total number of rows
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      </Card>
    </Stack>
  );
};
export default DataTable;
