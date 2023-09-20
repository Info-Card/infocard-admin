import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Form from "components/Form/Form";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import Loader from "components/Loader/Loader";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message/Message";
import CustomField from "components/Input/CustomField";
import { createTag } from "state/ducks/tag/actions";

const schema = yup.object().shape({
  customId: yup.string().required("This field is required"),
});

const AddTagModal = ({ show, setShow, preloadedValues, id }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.tag);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const updatedData = { ...data, batch: id };
    dispatch(createTag(updatedData));
    window.location.reload();
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth>
      <DialogTitle>Add new Tag</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && <Message severity="error">{error}</Message>}
          <CustomField
            ref={register}
            id="customId"
            type="text"
            label="Custom Id"
            name="customId"
            error={!!errors.customId}
            helperText={errors?.customId?.message}
          />
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              endIcon={<SaveIcon />}
              style={{ marginLeft: "8px" }}
            >
              {loading ? (
                <Loader />
              ) : preloadedValues ? (
                "Update Tag"
              ) : (
                "Save Tag"
              )}
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTagModal;
