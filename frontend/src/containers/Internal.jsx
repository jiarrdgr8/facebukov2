import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import AppContainer from "containers/App";

import { useAuth } from "services/auth";
import { usePermissions } from "services/accounts/permissionsProvider";
import { useSubscriptionLimits } from "services/accounts/limitsProvider";
import { useGetUser } from "services/posts/queries";
import CircularProgress from "components/CircularProgress";

const RouteGuardInternal = ({ children, auth }) => {
  const navigate = useNavigate();
  let location = useLocation();

  const { userSignout } = useAuth();
  const { changeCurrentView } = usePermissions();
  const { changeLimitsCurrentView } = useSubscriptionLimits();

  const [isOnSetup, setIsOnSetup] = useState();

  const { isLogin, tokenExpiry } = auth;

  const { data: userData, isLoading: userLoading } = useGetUser(
    auth?.user?._id
  );

  // to check wether the user has not completed the set up process yet
  const onSetup = () => {
    if (userData) {
      if (userData.ownedAccounts) {
        if (userData.ownedAccounts.length === 0) {
          //if no owned accounts but has accounts, user must be invited
          if (userData.accounts && userData.accounts.length > 0) {
            return false;
          } else {
            return true;
          }
        } else if (userData.ownedAccounts.length === 1) {
          if (userData.ownedAccounts?.[0]?.subscription) {
            return false;
          } else {
            return true;
          }
        } else {
          //for multiple accounts in which there are still accounts that were not completely set up by the user
          return false;
        }
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    setIsOnSetup(onSetup());
  }, [userData]);

  useEffect(() => {
    // Conditions to check for login status and token expiry
    if (!isLogin || !tokenExpiry) {
      navigate("/login");
    } else if (tokenExpiry < new Date().getTime() && isLogin) {
      userSignout().then((res) => {
        navigate("/login");
      });
    } else if (isOnSetup) {
      navigate("/setup");
    }
    //eslint-disable-next-line
  }, [isLogin, location, isOnSetup]);

  useEffect(() => {
    //change currently viewed account in permissions provider
    changeCurrentView(auth?.user?.currentView);
    changeLimitsCurrentView(auth?.user?.currentView);
  }, [auth?.user?.currentView]);

  if (userLoading) return <CircularProgress />;

  return <AppContainer>{children}</AppContainer>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(RouteGuardInternal);
