import axios from 'axios';

import routes from '../../config/routes';
import * as types from './types';

export function login(id, password) {
	return dispatch => {
		dispatch({ type: types.LOGIN_ERROR, payload: null });

		axios
			.post(`${routes.root}/login`, { id, password })
			.then(res => {
				if (res.data.error) {
					return dispatch({ type: types.LOGIN_ERROR, payload: res.data.error });
				}

				dispatch(fetchAll(res.data.token));
			})
			.catch(err => {
				console.log(`Error: ${err}`);
			});
	};
}

export function logout() {
	localStorage.removeItem('vd-token');

	return {
		type: types.AUTH_LOGOUT,
	};
}

export function fetchAll(token) {
	localStorage.setItem('vd-token', token);

	axios.defaults.headers['vd-token'] = token;

	return dispatch => {
		dispatch({ type: types.AUTH_LOGIN });
		axios
			.all([axios.get(`${routes.root}/reports`), axios.get(`${routes.root}/me`)])
			.then(
				axios.spread((reports, me) => {
					dispatch({ type: types.FETCH_REPORTS, payload: reports.data });
					dispatch({ type: types.FETCH_ME, payload: me.data });
				})
			)
			.catch(err => {
				if (err.response.status === 403) dispatch(logout());
			});
	};
}

export function createReport(report) {
	return {
		type: types.CREATE_REPORT,
		payload: axios.post(`${routes.root}/reports`, report),
	};
}
