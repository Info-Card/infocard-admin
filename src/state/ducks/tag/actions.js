import * as types from './types';

import TagService from '../../services/tag.service';

export const getTags = (batchId) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.getAll(batchId);

    dispatch({
      type: types.GET_TAGS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};

export const getBatches = () => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.getBatches();

    dispatch({
      type: types.GET_TAGS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};

export const getTag = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.get(id);

    dispatch({
      type: types.GET_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};

export const createTag = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.create(data);

    dispatch({
      type: types.CREATE_TAG_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TAG_FAIL,
      payload: message,
    });
  }
};
