import axios from 'axios';

import routes from '../../config/routes';
import * as types from './types';

export function login(id, password) {
	return dispatch => {
		dispatch({ type: types.LOGIN_ERROR, payload: null });

		axios
			.post(`${routes.apiRoot}/login`, { id, password })
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
			.all([axios.get(`${routes.apiRoot}/reports`), axios.get(`${routes.apiRoot}/me`)])
			.then(
				axios.spread((reports, me) => {
					dispatch({ type: types.FETCH_REPORTS, payload: reports.data });
					dispatch({ type: types.FETCH_ME, payload: me.data });
				})
			)
			.catch(err => {
				if (err.response && err.response.status === 403) return dispatch(logout());

				console.log(err);
			});
	};
}

export function createReport(report) {
	return {
		type: types.CREATE_REPORT,
		payload: axios.post(`${routes.apiRoot}/reports`, report),
	};
}

export function uploadImage(formData) {
	return {
		type: types.UPLOAD_IMAGE,
		payload: axios.post(`${routes.apiRoot}/media`, formData),
	};
}

export function changePassword(currentPassword, newPassword) {
	return {
		type: types.CHANGE_PASSWORD,
		payload: axios.post(`${routes.apiRoot}/password`, { currentPassword, newPassword }),
	};
}

export function changeProfilePicture(mediaId) {
	return {
		type: types.CHANGE_PROFILE_PICTURE,
		payload: axios.post(`${routes.apiRoot}/profile-picture`, { media_id: mediaId }),
	};
}
