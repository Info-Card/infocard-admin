import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { getUsers } from 'state/ducks/user/actions';
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
    name: 'username',
    label: 'Username',
  },
  {
    name: 'email',
    label: 'Email',
  },
  {
    name: 'role',
    label: 'Role',
  },
];

const AllUsersPage = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const data = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers(query));
  }, [dispatch, query]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Users
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <DataTable
        title={'Users List'}
        data={data}
        columns={columns}
        setQuery={setQuery}
        onEdit={(value) => {
          history.push(`users/${value}`);
        }}
      />
    </AdminLayout>
  );
};

export default AllUsersPage;
