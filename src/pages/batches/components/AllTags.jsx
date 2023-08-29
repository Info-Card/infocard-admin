import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { getTags } from "state/ducks/tag/actions";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  my3: {
    margin: "1.3rem 0",
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: ".85rem",
  },
  p1: {
    padding: ".85rem",
  },
}));

const AllTags = ({ batchId }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(getTags(1, 999999999999, `&batch=${batchId}`));
  }, [dispatch, batchId]);

  const columns = [
    {
      name: "url",
      label: "URL",
      options: {
        filter: true,
        sort: true,
        download: true,
      },
    },
    {
      name: "user",
      label: "Active",
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value !== undefined ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },
  ];

  const options = {
    print: false,
    filter: false,
    viewColumns: false,
    selectableRows: false,
  };

  return (
    <>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Tags
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => history.push(`/tags/add-tag/${batchId}`)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Tag
          </Button>
        </Grid>
      </Grid>

      <MUIDataTable
        title={"Tags List"}
        data={results}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default AllTags;
