import React, { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { httpClient } from "util/Api";
import * as types from "../store/actionTypes";

const authContext = createContext();
// console.log(authContext);
// Provider component that wraps your app and makes auth object ..
// ... available to any child component that calls useAuth().

export function AuthProvider({ children, store }) {
  const auth = useProvideAuth({ store });
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.

export const useAuth = () => {
  return useContext(authContext);
};

export const useProvideAuth = ({ store }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setLoading = (state) => {
    dispatch({ type: types.SET_LOADER, payload: state });
  };

  const isLoading = store.getState().common?.loading;

  const setError = (message) => {
    dispatch({ type: types.FETCH_ERROR, payload: message });
  };

  const error = store.getState().common?.error;

  const fetchStart = () => {
    dispatch({ type: types.FETCH_START });
  };

  const fetchSuccess = () => {
    dispatch({ type: types.FETCH_SUCCESS });
  };

  const fetchError = (error) => {
    dispatch({ type: types.FETCH_ERROR, payload: error });
  };

  const userLogin = (values, cbFunc) => {
    fetchStart();
    return httpClient
      .post("auth/login", values)
      .then((res) => {
        if (res.status === 200) {
          fetchSuccess();
          httpClient.defaults.headers["Authorization"] =
            "Bearer " + res.data.token;
          localStorage.setItem("token", res.data.token);
          let payload = res.data;
          dispatch({ type: types.SIGNIN_USER_SUCCESS, payload });
          // getAuthUser();
          if (cbFunc) cbFunc();
        } else {
          fetchError(res.error);
        }
      })
      .catch(function (err) {
        fetchError(err.response?.data?.message);
      });
  };

  const userSignup = (user, cbFunc) => {
    fetchStart();
    httpClient
      .post("auth/register", user)
      .then((res) => {
        if (res.status === 200) {
          fetchSuccess();
          if (cbFunc) cbFunc();
        } else {
          fetchError(res.data.error);
        }
      })
      .catch((err) => {
        fetchError(err.response.data.message);
      });
  };

  const checkResetPassword = (id, cbFunc) => {
    fetchStart();
    httpClient
      .get(`/auth/resetpass/check/${id}`)
      .then((res) => {
        if (res.status === 200) {
          fetchSuccess();
          if (cbFunc) cbFunc({ status: res.status });
        } else {
          // console.log(res);
          if (cbFunc) cbFunc({ status: res.status, message: res.data.message });
          fetchError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (cbFunc)
          cbFunc({
            status: err.response.status,
            message: err.response.data.message,
          });
        fetchError(err.response.data.message);
      });
  };

  const resetPassword = (id, password, cbFunc) => {
    fetchStart();
    httpClient
      .put(`/auth/resetpass/${id}`, password)
      .then((res) => {
        if (res.status === 200) {
          fetchSuccess();
          if (cbFunc) cbFunc(res);
        } else {
          fetchError(res.data.error);
        }
      })
      .catch((err) => {
        fetchError(err.response.data.message);
      });
  };

  const sendPasswordResetEmail = (email, cbFunc) => {
    fetchStart();
    httpClient
      .post("/auth/forgotpassword", email)
      .then((res) => {
        if (res.status === 200) {
          if (cbFunc) cbFunc({ status: res.status, message: res.data.message });
          fetchSuccess();
        } else {
          if (cbFunc) cbFunc({ status: res.status, message: res.data.message });
          fetchSuccess();
        }
      })
      .catch((err) => {
        if (cbFunc)
          cbFunc({
            status: err.response.status,
            message: err.response.data.message,
          });
        fetchSuccess();
      });
  };

  const verifyAccount = (id, cbFunc) => {
    fetchStart();
    httpClient
      .put(`/auth/verify/${id}`)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          fetchSuccess();
          if (cbFunc) cbFunc({ status: res.status });
        } else {
          // console.log(res);
          if (cbFunc) cbFunc({ status: res.status, message: res.data.message });
          fetchSuccess();
        }
      })
      .catch((err) => {
        if (cbFunc)
          cbFunc({
            status: err.response.status,
            message: err.response.data.message,
          });
        fetchSuccess();
      });
  };

  const userSignOut = (cbFunc) => {
    httpClient.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    dispatch({ type: types.SIGNOUT_USER_SUCCESS });
    navigate("/");
    if (cbFunc) cbFunc();
  };

  const renderSocialMediaLogin = () => null;

  const updateUser = (payload) => {
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }, []);

  // Return the user object and auth methods
  return {
    isLoading,
    setLoading,
    error,
    setError,
    sendPasswordResetEmail,
    checkResetPassword,
    resetPassword,
    verifyAccount,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,

    updateUser,
  };
};

// export default connect(null, { loginUser })(useProvideAuth);
