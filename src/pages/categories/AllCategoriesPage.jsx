import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import { getCategories, moveCategory } from 'state/ducks/category/actions';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DataTable from 'components/Table/DataTable';
import * as types from 'state/ducks/category/types';

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

const AllCategoriesPage = (props) => {
  const { history } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const data = useSelector((state) => state.category);
  const { results, success } = data;

  useEffect(() => {
    if (success) {
      dispatch({ type: types.CATEGORY_RESET });
    } else {
      dispatch(getCategories(query));
    }
  }, [dispatch, query, success]);

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
      name: 'position',
      label: 'Move',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          return (
            <>
              <KeyboardArrowDownIcon
                onClick={() => {
                  dispatch(moveCategory(results, rowIndex, rowIndex + 1));
                }}
              />
              <KeyboardArrowUpIcon
                onClick={() => {
                  dispatch(moveCategory(results, rowIndex, rowIndex - 1));
                }}
              />
            </>
          );
        },
      },
    },
  ];

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Categories
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => history.push('/categories/add-category')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Category
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />

      <DataTable
        title={'Categories List'}
        data={data}
        columns={columns}
        setQuery={setQuery}
        onEdit={(value) => {
          history.push(`categories/${value}`);
        }}
      />
    </AdminLayout>
  );
};

export default AllCategoriesPage;
