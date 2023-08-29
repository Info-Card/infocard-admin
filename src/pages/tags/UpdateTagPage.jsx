import React, { useEffect } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import AdminBreadcrumbs from "components/AdminBreadcrumbs/AdminBreadcrumbs";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "context/DataContext";
import { getTag } from "state/ducks/tag/actions";
import * as types from "state/ducks/tag/types";
import TagForm from "./components/TagForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  my3: {
    margin: "1.3rem 0",
  },
  mRight: {
    marginRight: ".85rem",
  },
}));

const UpdateTagPage = (props) => {
  const { history, match } = props;
  const tagId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { setValues, data } = useData();

  const { success, selectedTag } = useSelector((state) => state.tag);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (success) {
        dispatch({ type: types.TAG_RESET });
        history.push(`/batches`);
      } else {
        if (!selectedTag) {
          dispatch(getTag(tagId));
        } else {
          setValues(selectedTag);
        }
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, success, isLoggedIn, tagId, selectedTag, setValues]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update Tag
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {data.id ? <TagForm preloadedValues={data} /> : <></>}
      </div>
    </AdminLayout>
  );
};

export default UpdateTagPage;
