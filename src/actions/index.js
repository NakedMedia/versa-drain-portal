import axios from 'axios';

import routes from '../../config/routes';
import * as types from './types';

export function login(id, password) {
	return dispatch => {
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

export function fetchAll(token) {
	localStorage.setItem('vd-token', token);

	axios.defaults.headers['vd-token'] = token;

	return dispatch => {
		dispatch({ type: types.AUTH_LOGIN });

		axios.all([axios.get(`${routes.root}/reports`)]).then(
			axios.spread(reports => {
				dispatch({ type: types.FETCH_REPORTS, payload: reports.data });
			})
		);
	};
}
