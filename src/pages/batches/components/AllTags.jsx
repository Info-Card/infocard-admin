import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

import DataTable from "components/Table/DataTable";
import { getTags } from "state/ducks/tag/actions";
import Swal from "sweetalert2";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import { Grid, TextField } from "@material-ui/core";

const schema = yup.object().shape({
  tag: yup.string().required("Tag is required"),
});

const AllTags = ({ batchId }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const data = useSelector((state) => state.tag);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset, // Add reset function from react-hook-form
  } = useForm({
    resolver: yupResolver(schema),
  });

  const openModal = () => {
    console.log("Opening modal");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    reset(); // Reset form fields when closing the modal
  };

  const onSubmit = (formData) => {
    console.log(formData);
    closeModal();
  };
  const handleDeactivate = () => {
    console.log("ok");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivite it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deactivite!", "Your file has been deleted.", "success");
      }
    });
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
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: () => {
          return (
            <Button
              onClick={handleDeactivate}
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
        <Button variant="contained" style={buttonStyle} onClick={openModal}>
          Add Tag
        </Button>
        <Button variant="contained" style={buttonStyle}>
          Export
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
            content: {
              width: "450px",
              height: "260px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
            },
          }}
        >
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <h2>Add new Tag</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="tag"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Add Tag"
                        variant="outlined"
                        error={!!errors.tag}
                        helperText={errors.tag?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ margin: "16px 0" }}>
                    <Button
                      variant="contained"
                      onClick={closeModal}
                      style={{ marginRight: "10px" }}
                    >
                      Close
                    </Button>
                    <Button variant="contained" type="submit">
                      Save
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          </div>
        </Modal>
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
    </div>
  );
};

export default AllTags;
