import * as types from "../store/actionTypes";

export const updateStoreUser = (value) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: value });
  };
};
