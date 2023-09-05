import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import { getBatches } from 'state/ducks/batch/actions';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'components/Table/DataTable';

const useStyles = makeStyles(() => ({
  my3: {
    margin: '1.3rem 0',
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: '.85rem',
  },
  p1: {
    padding: '.85rem',
  },
}));

const columns = [
  {
    name: 'id',
    label: 'Id',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'createdAt',
    label: 'Created At',
  },
];

const AllBatchesPage = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const data = useSelector((state) => state.batch);

  useEffect(() => {
    dispatch(getBatches(query));
  }, [dispatch, query]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Batches
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => history.push('/batches/add-batch')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Batch
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <DataTable
        title={'Batches List'}
        data={data}
        columns={columns}
        setQuery={setQuery}
        onEdit={(value) => {
          history.push(`batches/${value}`);
        }}
      />
    </AdminLayout>
  );
};

export default AllBatchesPage;
