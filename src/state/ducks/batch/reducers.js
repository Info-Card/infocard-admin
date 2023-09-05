import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.BATCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.BATCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_BATCHES_SUCCESS:
      return payload;
    case types.CREATE_BATCH_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_BATCH_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_BATCH_SUCCESS:
      return {
        loading: false,
        details: payload,
      };
    case types.BATCH_RESET:
      return {};
    default:
      return state;
  }
};
