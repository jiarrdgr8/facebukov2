import { combineReducers } from "redux";
// import { connectRouter } from 'connected-react-router';

import auth from "../auth/reducer";
// import themes from '../themes/reducer';
// import common from '../common/reducer';
// import settings from 'services/settings/reducer';

const createRootReducer = (history) =>
  combineReducers({
    // router: connectRouter(history),
    auth,
    // themes,
    // settings,
    // common
  });

export default createRootReducer;
