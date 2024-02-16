import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
} from '@mui/material';
import { debounce } from 'lodash';
import { filterNotNullOrEmptyFields } from '@/utils/filter-not-null-or-empty-fields';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useDialog from '../hooks/useDialog';
import FiltersForm from './FiltersForm';

const RowActions = ({ id, onView, onEdit, onDelete }: any) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '<strong>Warning</strong>',
      icon: 'warning',
      html: 'Are you sure you want to delete this?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed && onDelete) {
      onDelete(id);
    }
  };

  return (
    <Stack direction="row" gap={0}>
      {onView && (
        <IconButton onClick={() => onView(id)}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      )}
      {onEdit && (
        <IconButton onClick={() => onEdit(id)}>
          <EditIcon fontSize="small" />
        </IconButton>
      )}
      {onDelete && (
        <IconButton onClick={handleDelete}>
          <DeleteIcon fontSize="small" style={{ color: 'red' }} />
        </IconButton>
      )}
    </Stack>
  );
};
interface DataTableProps {
  title?: any;
  placeholder?: string;
  rows: any[];
  rowCount: number;
  columns: any[];
  query: any;
  setQuery: (query: any) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onExport?: () => void;
  filters?: any[];
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  placeholder,
  rows,
  rowCount,
  columns,
  query,
  setQuery,
  onView,
  onEdit,
  onDelete,
  onExport,
  filters,
}) => {
  const filterDialog = useDialog();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: query.limit || 10,
    page: query.page ? query.page - 1 : 0,
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
        ...query,
        page: 1,
        limit: 10,
        search,
      })
    );
  }, 1000);

  const onFilterSelect = (data: any) => {
    filterDialog.close();
    setQuery({
      ...query,
      page: 1,
      limit: 10,
      ...data,
    });
  };

  const actionColumn = {
    field: 'Actions',
    width: 140,
    renderCell: ({ row }: any) => (
      <RowActions
        id={row.id}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  };

  return (
    <>
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
          <Stack alignItems="center" direction="row" gap={1}>
            <OutlinedInput
              defaultValue=""
              placeholder={placeholder || 'Search'}
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{ maxWidth: 500 }}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
            {filters && (
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  filterDialog.open();
                }}
                startIcon={
                  <SvgIcon fontSize="small">
                    <FilterAltIcon />
                  </SvgIcon>
                }
              >
                Filter
              </Button>
            )}
            {onExport && (
              <Button
                color="inherit"
                size="small"
                onClick={onExport}
                startIcon={
                  <SvgIcon fontSize="small">
                    <CloudDownloadIcon />
                  </SvgIcon>
                }
              >
                Export
              </Button>
            )}
          </Stack>
        </Stack>
        <DataGrid
          autoHeight
          rows={rows || []}
          columns={
            !onView && !onEdit && !onDelete
              ? columns
              : columns.concat(actionColumn)
          }
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          pagination
          paginationMode="server"
          rowCount={rowCount || 0}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      </Card>
      {filterDialog.isOpen && (
        <FiltersForm
          onClose={() => {
            setQuery({
              page: 1,
              limit: 10,
            });
            filterDialog.close();
          }}
          filters={filters}
          onSubmit={onFilterSelect}
          values={query}
        />
      )}
    </>
  );
};

export default DataTable;
