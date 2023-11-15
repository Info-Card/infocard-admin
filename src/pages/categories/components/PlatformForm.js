import React from "react";
import Form from "components/Form/Form";
import Input from "components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Grid, makeStyles, Button, MenuItem } from "@material-ui/core";
import Loader from "components/Loader/Loader";
import Message from "components/Message/Message";
import { createPlatform, updatePlatform } from "state/ducks/platform/actions";
import SelectInput from "components/Input/SelectInput";

const schema = yup.object().shape({
  title: yup.string().required(),
  headline: yup.string(),
  category: yup.string(),
  type: yup.string().required(),
  webBaseURL: yup.string(),
  androidBaseURL: yup.string(),
  iOSBaseURL: yup.string(),
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

const UpdateCategoryForm = ({ preloadedValues }) => {
  delete preloadedValues.image;
  const classes = useStyles();
  const types = ["contact", "file", "phone", "url", "email", "username"];
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.platform);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "none",
      ...preloadedValues,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (preloadedValues.id) {
      delete data.category;
      dispatch(updatePlatform(preloadedValues.id, data));
    } else {
      delete data.position;
      dispatch(createPlatform(data));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Message severity="error">{error}</Message>}
      <Grid container spacing={3} style={{ marginBottom: "10px" }}>
        <Grid item xs={4} hidden>
          <Input
            ref={register}
            id="category"
            type="text"
            label="category"
            name="category"
            error={!!errors.category}
            helperText={errors?.category?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="title"
            type="text"
            label="Title"
            name="title"
            error={!!errors.title}
            helperText={errors?.title?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="headline"
            type="text"
            label="Headline"
            name="headline"
            error={!!errors.headline}
            helperText={errors?.headline?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="webBaseURL"
            type="text"
            label="Web BaseURL"
            name="webBaseURL"
            error={!!errors.webBaseURL}
            helperText={errors?.webBaseURL?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="iOSBaseURL"
            type="text"
            label="iOS BaseURL"
            name="iOSBaseURL"
            error={!!errors.iOSBaseURL}
            helperText={errors?.iOSBaseURL?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="androidBaseURL"
            type="text"
            label="Android BaseURL"
            name="androidBaseURL"
            error={!!errors.androidBaseURL}
            helperText={errors?.androidBaseURL?.message}
          />
        </Grid>

        <Grid item xs={4}>
          <Input
            ref={register}
            id="image"
            type="file"
            label=""
            name="image"
            error={!!errors.image}
            helperText={errors?.image?.message}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <SelectInput
            ref={register}
            id="type"
            name="type"
            className={classes.textField}
            label="Type"
            control={control}
            defaultValue=""
            variant="outlined"
            margin="normal"
            error={!!errors.type}
            helperText={errors?.type?.message}
          >
            {types.map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </SelectInput>
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
              ) : preloadedValues.id ? (
                "Update Platform"
              ) : (
                "Save Platform"
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default UpdateCategoryForm;
