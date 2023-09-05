import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'state/ducks/batch/types';
import BatchForm from './components/BatchForm';
import { getBatch } from 'state/ducks/batch/actions';
import AllTags from './components/AllTags';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  my3: {
    margin: '1.3rem 0',
  },
  mRight: {
    marginRight: '.85rem',
  },
}));

const AddBatchPage = (props) => {
  const { history, match } = props;
  const batchId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, details } = useSelector((state) => state.batch);

  useEffect(() => {
    if (success) {
      dispatch({ type: types.BATCH_RESET });
      history.push('/batches');
    } else if (batchId) {
      dispatch(getBatch(batchId));
    }
  }, [dispatch, history, success, batchId]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Add New Batch
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        <BatchForm preloadedValues={details} key={details} />
        {details && (
          <>
            <AllTags batchId={batchId} />
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AddBatchPage;
