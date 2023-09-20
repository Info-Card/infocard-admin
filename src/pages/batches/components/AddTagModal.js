import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  Modal,
  makeStyles,
} from "@material-ui/core";
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
  customId: yup.string().required("This field is required"),
});

const useStyles = makeStyles((theme) => ({
  mBottom: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    padding: "10px",
  },
  textField: {
    width: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddTagModal = ({ show, setShow, preloadedValues }) => {
  const classes = useStyles();
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
    console.log(data);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Add new Tag</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && <Message severity="error">{error}</Message>}

          <Input
            ref={register}
            id="customId"
            type="text"
            label="Name"
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
