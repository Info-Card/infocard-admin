import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { getBatches } from 'state/ducks/tag/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
    name: 'batchId',
    label: 'Batch Id',
    options: {
      filter: true,
      sort: true,
    },
  },
];

const AllTagsPage = (props) => {
  const { history } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.tag);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getBatches());
    } else {
      history.push('/login');
    }
  }, [history, isLoggedIn, dispatch]);

  const options = {
    filterType: 'checkbox',
    onRowClick: (rowData, rowState) => {
      history.push(`/tags/${rowData[0]}`);
    },
  };

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Tags
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => history.push('/tags/add-tag')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Tag
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={'Tags List'}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllTagsPage;
