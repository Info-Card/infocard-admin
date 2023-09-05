import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'state/ducks/category/types';
import CategoryForm from './components/CategoryForm';
import { getCategory } from 'state/ducks/category/actions';
import AllPlatforms from './components/AllPlatforms';

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

const AddCategoryPage = (props) => {
  const { history, match } = props;
  const categoryId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, details } = useSelector((state) => state.category);

  useEffect(() => {
    if (success) {
      dispatch({ type: types.CATEGORY_RESET });
      history.push('/categories');
    } else if (categoryId) {
      dispatch(getCategory(categoryId));
    }
  }, [dispatch, history, success, categoryId]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Add New Category
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        <CategoryForm preloadedValues={details} key={details} />
        {details && (
          <>
            <AllPlatforms
              platforms={details.platforms}
              key={details}
              categoryId={categoryId}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AddCategoryPage;
