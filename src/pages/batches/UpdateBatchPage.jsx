import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getBatch } from 'state/ducks/batch/actions';
import * as types from 'state/ducks/batch/types';
import BatchForm from './components/BatchForm';
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

const UpdateBatchPage = (props) => {
  const { history, match } = props;
  const batchId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, selectedBatch } = useSelector((state) => state.batch);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (success) {
        dispatch({ type: types.BATCH_RESET });
        history.push('/batches');
      } else {
        dispatch(getBatch(batchId));
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, isLoggedIn, batchId]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update Batch
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {selectedBatch ? (
          <BatchForm preloadedValues={selectedBatch} history={history} />
        ) : (
          <></>
        )}
      </div>
      <AllTags batchId={batchId} />
    </AdminLayout>
  );
};

export default UpdateBatchPage;
