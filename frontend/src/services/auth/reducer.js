import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "../store/actionTypes";

const defaultState = {
  user: {},
  isLogin: false,
  loginTime: null,
  tokenExpiry: null,
};

const auth = (state = defaultState, action) => {
  const currentTime = new Date().getTime();
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        userID: payload.session.userId,
        isLogin: true,
        user: payload.user,
        loginTime: currentTime,
        tokenExpiry: payload.session.tokenExpiry,
      };

    case SIGNOUT_USER_SUCCESS:
      return {
        ...defaultState,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default auth;
