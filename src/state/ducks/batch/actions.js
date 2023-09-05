import * as types from './types';

import BatchService from '../../services/batches.service';

export const getBatches = (query) => async (dispatch) => {
  try {
    dispatch({
      type: types.BATCH_REQUEST,
    });
    const res = await BatchService.getAll(query);

    dispatch({
      type: types.GET_BATCHES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BATCH_FAIL,
      payload: message,
    });
  }
};

export const getBatch = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.BATCH_REQUEST,
    });
    const res = await BatchService.get(id);

    dispatch({
      type: types.GET_BATCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BATCH_FAIL,
      payload: message,
    });
  }
};

export const createBatch = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.BATCH_REQUEST,
    });
    const res = await BatchService.create(data);

    dispatch({
      type: types.CREATE_BATCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BATCH_FAIL,
      payload: message,
    });
  }
};

export const updateBatch = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.BATCH_REQUEST,
    });
    const res = await BatchService.update(id, data);

    dispatch({
      type: types.UPDATE_BATCH_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BATCH_FAIL,
      payload: message,
    });
  }
};

export const deleteBatch = (id) => async (dispatch) => {
  try {
    await BatchService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BATCH_FAIL,
      payload: message,
    });
  }
};
