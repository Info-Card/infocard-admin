import * as types from './types';

import PlatformService from '../../services/platforms.service';

export const getPlatform = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PLATFORM_REQUEST,
    });
    const res = await PlatformService.get(id);

    dispatch({
      type: types.GET_PLATFORM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};

export const createPlatform = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PLATFORM_REQUEST,
    });
    const res = await PlatformService.create(data);

    dispatch({
      type: types.CREATE_PLATFORM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};

export const updatePlatform = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PLATFORM_REQUEST,
    });
    const res = await PlatformService.update(id, data);

    dispatch({
      type: types.UPDATE_PLATFORM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};

export const deletePlatform = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PLATFORM_REQUEST,
    });
    await PlatformService.delete(id);
    dispatch({
      type: types.UPDATE_PLATFORM_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};

export const movePlatform = (platforms, from, to) => async (dispatch) => {
  try {
    if (to < platforms.length && to > -1) {
      dispatch({
        type: types.PLATFORM_REQUEST,
      });
      await PlatformService.update(platforms[from].id, { position: to });
      await PlatformService.update(platforms[to].id, { position: from });
      dispatch({
        type: types.UPDATE_PLATFORM_SUCCESS,
      });
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};
