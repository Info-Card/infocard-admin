import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "components/Table/DataTable";
import { deleteTag, getTags } from "state/ducks/tag/actions";
import Swal from "sweetalert2";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import AddTagModal from "./AddTagModal";
import userService from "state/services/user.service";

const AllTags = ({ batchId }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const data = useSelector((state) => state.tag);

  const { loading } = useSelector((state) => state.tag);

  const [showAddTagModal, setShowAddTagModal] = useState(false);

  const handleDeactivate = (tagId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(tagId);
        Swal.fire("Deactivate!", "Your Tag has been deactivated.", "success");
      }
    });
  };

  const handleDelete = () => {
    console.log("ok");
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
      }
    });
  };

  const exportCsv = async () => {
    try {
      const response = await userService.exportCsv();

      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "users.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

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
        customBodyRender: (value) => {
          return <>{value !== undefined ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value) => {
          return (
            <Button
              onClick={() => {
                handleDeactivate(value);
              }}
              variant="contained"
              style={{ height: "30px" }}
            >
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
      marginLeft: "10px",
    };

    return (
      <div style={titleStyle}>
        <span>Tags List</span>
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={() => {
            setShowAddTagModal(true);
          }}
        >
          Add Tag
        </Button>

        <Button
          variant="contained"
          style={buttonStyle}
          onClick={exportCsv} // Attach the exportCsv function to the Export button
        >
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
        onDelete={(value) => {
          console.log(value);
          if (!loading) {
            dispatch(deleteTag(value));
          }
        }}
      />
      <AddTagModal show={showAddTagModal} setShow={setShowAddTagModal} />
    </div>
  );
};

export default AllTags;
