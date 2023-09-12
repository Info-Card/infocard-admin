import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "components/Table/DataTable";
import { getTags } from "state/ducks/tag/actions";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import { AddTagModal } from "./AddTagModal";

const AllTags = ({ batchId }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const data = useSelector((state) => state.tag);

  const [showTagModal, setShowTagModal] = useState(false);

  useEffect(() => {
    dispatch(getTags(`${query}&batch=${batchId}`));
  }, [dispatch, query, batchId]);

  const handleAddTag = () => {
    console.log("Add Tag button clicked");
    setShowTagModal(true);
  };

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
        customBodyRender: (value) => {
          return <>{value !== undefined ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: () => {
          return (
            <Button variant="contained" style={{ height: "30px" }}>
              Deactivate
            </Button>
          );
        },
      },
    },
  ];
  const CustomTitle = () => {
    const titleStyle = {
      display: "flex",
      alignItems: "center",
    };

    const buttonStyle = {
      marginLeft: "10px", // Adjust the margin as needed
    };

    return (
      <div style={titleStyle}>
        <span>Tags List</span>
        <Button variant="contained" style={buttonStyle} onClick={handleAddTag}>
          Add Tag
        </Button>
        <Button variant="contained" style={buttonStyle}>
          Export
        </Button>
      </div>
    );
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <DataTable
        title={<CustomTitle />}
        data={data}
        columns={columns}
        setQuery={setQuery}
        download={true}
      />
      <AddTagModal show={showTagModal} setShow={setShowTagModal} />
    </div>
  );
};

export default AllTags;
