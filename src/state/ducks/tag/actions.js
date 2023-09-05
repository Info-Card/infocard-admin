import * as types from './types';

import TagService from 'state/services/tag.service';

export const getTags = (query) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.getAll(query);

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

export const updateTag = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.TAG_REQUEST,
    });
    const res = await TagService.update(id, data);

    dispatch({
      type: types.UPDATE_TAG_SUCCESS,
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

export const deleteTag = (id) => async (dispatch) => {
  try {
    await TagService.delete(id);
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
