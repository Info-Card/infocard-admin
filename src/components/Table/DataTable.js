import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { debounce } from "lodash";
import { buildURLQuery } from "helpers/buildURLQuery";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const DataTable = (props) => {
  const { title, data, columns, setQuery, onEdit, onDelete, download } = props;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [disablePagination, setDisablePagination] = useState(false);

  useEffect(() => {
    if (data && data.results) {
      setDisablePagination(data.results.length < 10);
    }
  }, [data]);

  const debouncedSearch = debounce(async (text) => {
    setSearch(text == null ? "" : text);
    setQuery(buildURLQuery({ page, limit, search: text == null ? "" : text }));
  }, 1000);

  const options = {
    count: data.totalResults,
    page: page - 1,
    serverSide: !disablePagination,
    filter: false,
    columns: false,
    print: false,
    viewColumns: false,
    download: download,
    selectableRows: false,
    sort: false,
    onTableChange: (action, tableState) => {
      console.log(action);
      switch (action) {
        case "changePage":
          setPage(tableState.page + 1);
          setQuery(buildURLQuery({ page: tableState.page + 1, limit, search }));
          break;
        case "changeRowsPerPage":
          setLimit(tableState.rowsPerPage);
          setPage(1);
          setQuery(
            buildURLQuery({ page: 1, limit: tableState.rowsPerPage, search })
          );
          break;
        case "search":
          debouncedSearch(tableState.searchText);
          break;
        default:
          break;
      }
    },
  };

  return (
    <MUIDataTable
      title={title}
      data={data.results}
      columns={columns.concat({
        name: "id",
        label: "Actions",
        options: {
          download: false,
          customBodyRender: (value) => {
            return (
              <>
                {onEdit && (
                  <span
                    onClick={() => {
                      onEdit(value);
                    }}
                  >
                    <EditIcon />
                  </span>
                )}
                {onDelete && (
                  <span
                    onClick={() => {
                      onDelete(value);
                    }}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </span>
                )}
              </>
            );
          },
        },
      })}
      options={options}
    />
  );
};

export default DataTable;
