import { AUTH_LOGIN, AUTH_LOGOUT, LOGIN_ERROR } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case AUTH_LOGIN:
			return { ...state, isLoggedIn: true };
		case AUTH_LOGOUT:
			return { ...state, isLoggedIn: false };
		case LOGIN_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
