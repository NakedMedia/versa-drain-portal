import { AUTH_LOGIN, LOGIN_ERROR } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case AUTH_LOGIN:
			return { ...state, isLoggedIn: true };
		case LOGIN_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
