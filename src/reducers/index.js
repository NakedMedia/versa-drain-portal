import { combineReducers } from 'redux';

import reducerAuth from './reducer-auth';
import reducerReports from './reducer-reports';

const rootReducer = combineReducers({
	auth: reducerAuth,
	reports: reducerReports,
});

export default rootReducer;
