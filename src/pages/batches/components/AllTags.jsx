import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "components/Table/DataTable";
import { getTags } from "state/ducks/tag/actions";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const AllTags = ({ batchId }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const data = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getTags(`${query}&batch=${batchId}`));
  }, [dispatch, query, batchId]);

  const columns = [
    {
      name: "url",
      label: "URL",
      options: {
        filter: true,
        sort: true,
        download: true,
      },
    },
    {
      name: "user",
      label: "Active",
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value !== undefined ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },
  ];
  return (
    <div style={{ marginTop: "20px" }}>
      <DataTable
        title={"Tags List"}
        data={data}
        columns={columns}
        setQuery={setQuery}
        download={true}
      />
    </div>
  );
};

export default AllTags;
