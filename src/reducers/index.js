import { combineReducers } from 'redux';

import reducerAuth from './reducer-auth';
import reducerReports from './reducer-reports';
import reducerUsers from './reducer-users';

const rootReducer = combineReducers({
	auth: reducerAuth,
	reports: reducerReports,
	users: reducerUsers,
});

export default rootReducer;
