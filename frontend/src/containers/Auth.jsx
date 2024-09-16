import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const RouteGuardAuth = ({ children, auth }) => {
  // const loggedIn = user.isLoggedIn();
  const navigate = useNavigate();
  let location = useLocation();

  const { isLogin, tokenExpiry, user } = auth;

  useEffect(() => {
    if (user && user.status === "inactive") {
      navigate("/inactive");
    } else if (isLogin && tokenExpiry > new Date().getTime()) {
      // Redirect to dashboard if user is already logged in
      navigate("/dashboard");
    }
    //eslint-disable-next-line
  }, [isLogin, location]);

  return <>{children}</>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(RouteGuardAuth);
