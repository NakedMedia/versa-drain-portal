import { combineReducers } from 'redux';

import reducerAuth from './reducer-auth';
import reducerReports from './reducer-reports';
import reducerLocations from './reducer-locations';
import reducerUsers from './reducer-users';

const rootReducer = combineReducers({
  auth: reducerAuth,
  reports: reducerReports,
  locations: reducerLocations,
  users: reducerUsers
});

export default rootReducer;
