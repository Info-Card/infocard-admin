import React from "react";
import Form from "components/Form/Form";
import Input from "components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { createTag, updateTag } from "state/ducks/tag/actions";
import Loader from "components/Loader/Loader";
import Message from "components/Message/Message";

const schema = yup.object().shape({
  customId: yup.string(),
  name: yup.string(),
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
}));

const TagForm = ({ preloadedValues, batch }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.batch);
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
    if (preloadedValues) {
      dispatch(updateTag(preloadedValues.id, data));
    } else {
      dispatch(createTag({ ...data, batch }));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="name"
            type="text"
            label="Name"
            name="name"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="customId"
            type="text"
            label="Custom Id"
            name="customId"
            error={!!errors.customId}
            helperText={errors?.customId?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.mBottom}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              endIcon={<SaveIcon />}
            >
              {loading ? (
                <Loader />
              ) : preloadedValues ? (
                "Update Tag"
              ) : (
                "Save Tag"
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default TagForm;
