import { Button, Grid, Input, Modal } from "@material-ui/core";
import Form from "components/Form/Form";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import Loader from "components/Loader/Loader";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message/Message";

const schema = yup.object().shape({
  customId: yup.string().required(),
});

const AddTagModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.tag);
  const {
    control, // Use control from useForm
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal open={show} onClose={handleClose} contentLabel="Example Modal">
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <h2>Add new Tag</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && <Message severity="error">{error}</Message>}
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Controller
                name="customId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Custom Id"
                    error={!!errors.customId}
                    helperText={errors?.customId?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                endIcon={<SaveIcon />}
              >
                {loading ? <Loader /> : "Save Tag"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Modal>
  );
};

export default AddTagModal;
