import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import AdminBreadcrumbs from "components/AdminBreadcrumbs/AdminBreadcrumbs";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { getBatches } from "state/ducks/batch/actions";
import { useDispatch, useSelector } from "react-redux";

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

const columns = [
  {
    name: "id",
    label: "Id",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "description",
    label: "Description",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "createdAt",
    label: "Created At",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const AllBatchesPage = (props) => {
  const { history } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { results, page, totalResults } = useSelector((state) => state.batch);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getBatches(selectedPage, limit, ""));
    } else {
      history.push("/login");
    }
  }, [history, isLoggedIn, dispatch, selectedPage, limit]);

  const options = {
    filterType: "checkbox",
    count: totalResults,
    page: page,
    serverSide: true,
    selectableRows: false,
    onRowClick: (rowData, rowState) => {
      history.push(`/batches/${rowData[0]}`);
    },
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          setSelectedPage(tableState.page + 1);
          break;
        case "changeRowsPerPage":
          setLimit(tableState.rowsPerPage);
          setSelectedPage(1);
          break;
        case "search":
          break;
        default:
          break;
      }
    },
  };

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
            onClick={() => history.push("/batches/add-batch")}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Batch
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={"Batches List"}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllBatchesPage;
