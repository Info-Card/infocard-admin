import React, { useEffect, useState } from "react";
import { makeStyles, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlatform,
  getPlatform,
  movePlatform,
} from "state/ducks/platform/actions";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import DataTable from "components/Table/DataTable";
import PlatformForm from "./PlatformForm";
import * as types from "state/ducks/platform/types";
import { getCategory } from "state/ducks/category/actions";

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

const AllPlatforms = ({ platforms, categoryId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const { success, details, loading } = useSelector((state) => state.platform);

  useEffect(() => {
    if (success) {
      dispatch({ type: types.PLATFORM_RESET });
      dispatch(getCategory(categoryId));
      setKey(Math.random());
    } else if (details) {
      setKey(Math.random());
    }
  }, [dispatch, success, categoryId, details]);

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Avatar
              variant="rounded"
              src={
                value === ""
                  ? ""
                  : process.env.REACT_APP_API_URL + "/v1/" + value
              }
            />
          );
        },
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "headline",
      label: "Headline",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "position",
      label: "Move",
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          return (
            <>
              <KeyboardArrowDownIcon
                onClick={() => {
                  dispatch(movePlatform(platforms, rowIndex, rowIndex + 1));
                }}
              />
              <KeyboardArrowUpIcon
                onClick={() => {
                  dispatch(movePlatform(platforms, rowIndex, rowIndex - 1));
                }}
              />
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <div className={classes.root}>
        <PlatformForm
          preloadedValues={{ category: categoryId, ...details }}
          key={key}
        />
        <DataTable
          title={"Platforms List"}
          data={{ results: platforms }}
          columns={columns}
          onEdit={(value) => {
            dispatch(getPlatform(value));
          }}
          onDelete={(value) => {
            if (!loading) {
              dispatch(deletePlatform(value));
            }
          }}
        />
      </div>
    </>
  );
};

export default AllPlatforms;
