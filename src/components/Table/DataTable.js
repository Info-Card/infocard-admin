import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { debounce } from "lodash";
import { buildURLQuery } from "helpers/buildURLQuery";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";

const DataTable = (props) => {
  const { title, data, columns, setQuery, onEdit, onDelete, download } = props;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [linkId, setLinkId] = useState("");

  const handleDelete = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Delete!", "Your file has been deleted.", "success");
        onDelete(value);
      }
    });
  };

  useEffect(() => {
    if (linkId) {
      setQuery(buildURLQuery({ page, limit, search: linkId }));
    }
  }, [linkId, page, limit, setQuery]);

  const debouncedSearch = debounce(async (text) => {
    setSearch(text == null ? "" : text);
    setQuery(buildURLQuery({ page, limit, search: text == null ? "" : text }));
  }, 1000);

  const extractIdFromLink = (link) => {
    console.log(link);
    const url = new URL(link);
    return url.pathname.split("/").pop();
  };

  const options = {
    count: data.totalResults,
    page: page - 1,
    serverSide: true,
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
          const searchText = tableState.searchText;
          if (searchText && searchText.startsWith("https://app.infocard.me/")) {
            const extractedId = extractIdFromLink(searchText);
            debouncedSearch(extractedId);
            setLinkId(extractedId);
          } else {
            setLinkId("");
          }
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
                      handleDelete(value);
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
