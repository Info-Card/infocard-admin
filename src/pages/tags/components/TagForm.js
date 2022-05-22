import React, { useState } from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Grid, makeStyles, Button, MenuItem } from '@material-ui/core';
import { createTag } from 'state/ducks/tag/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

const schema = yup.object().shape({
  quantity: yup.number().required(),
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

const TagForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.tag);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(createTag(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3}>
        {/* <Grid item xs={4}>
          <Input
            ref={register}
            id="customId"
            type="string"
            label="Custom Id"
            name="customId"
            error={!!errors.customId}
            helperText={errors?.customId?.message}
          />
        </Grid>
        <Grid item xs={12}>
          OR
        </Grid> */}
        <Grid item xs={4}>
          <Input
            ref={register}
            id="quantity"
            type="number"
            label="Quantity"
            name="quantity"
            error={!!errors.quantity}
            helperText={errors?.quantity?.message}
          />
        </Grid>
        {/* <Grid item xs={12}>
          OR
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="min"
            type="number"
            label="Min"
            name="min"
            error={!!errors.min}
            helperText={errors?.min?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="max"
            type="number"
            label="Max"
            name="max"
            error={!!errors.max}
            helperText={errors?.max?.message}
          />
        </Grid> */}
        <Grid item xs={12}>
          <div className={classes.mBottom}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              endIcon={<SaveIcon />}
            >
              {loading ? <Loader /> : 'Save Tag'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default TagForm;
