import React from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { createBatch, updateBatch } from 'state/ducks/batch/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  quantity: yup.string(),
});

const useStyles = makeStyles((theme) => ({
  mBottom: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px',
  },
  textField: {
    width: '100%',
  },
}));

const BatchForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.batch);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (preloadedValues) {
      delete data.quantity;
      dispatch(updateBatch(preloadedValues.id, data));
    } else {
      dispatch(createBatch(data));
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
            id="description"
            type="text"
            label="Description"
            name="description"
            error={!!errors.description}
            helperText={errors?.description?.message}
          />
        </Grid>
        {preloadedValues ? (
          <></>
        ) : (
          <Grid item xs={4}>
            <Input
              ref={register}
              id="quantity"
              type="text"
              label="Quantity"
              name="quantity"
              error={!!errors.quantity}
              helperText={errors?.quantity?.message}
            />
          </Grid>
        )}

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
                'Update Batch'
              ) : (
                'Save Batch'
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default BatchForm;
