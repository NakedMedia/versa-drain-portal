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
    payload: axios.get(`${routes.apiRoot}/logout`)
  };
}

export function fetchAll(token) {
  localStorage.setItem('vd-token', token);

  axios.defaults.headers['vd-token'] = token;

  return dispatch => {
    dispatch({ type: types.AUTH_LOGIN });
    axios
      .all([
        axios.get(`${routes.apiRoot}/clients`),
        axios.get(`${routes.apiRoot}/employees`),
        axios.get(`${routes.apiRoot}/locations`),
        axios.get(`${routes.apiRoot}/reports`),
        axios.get(`${routes.apiRoot}/me`)
      ])
      .then(
        axios.spread((clients, employees, locations, reports, me) => {
          dispatch({ type: types.FETCH_CLIENTS, payload: clients.data });
          dispatch({
            type: types.FETCH_EMPLOYEES,
            payload: employees.data
          });
          dispatch({
            type: types.FETCH_LOCATIONS,
            payload: locations.data
          });
          dispatch({
            type: types.FETCH_REPORTS,
            payload: reports.data
          });
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
    payload: axios.post(`${routes.apiRoot}/reports`, report)
  };
}

export function updateReport(report) {
  return {
    type: types.UPDATE_REPORT,
    payload: axios.patch(`${routes.apiRoot}/reports/${report.id}`, report)
  };
}

export function deleteReport(report) {
  return {
    type: types.DELETE_REPORT,
    payload: axios.delete(`${routes.apiRoot}/reports/${report.id}`, report)
  };
}

export function createLocation(location) {
  return {
    type: types.CREATE_LOCATION,
    payload: axios.post(`${routes.apiRoot}/locations`, location)
  };
}

export function updateLocation(location) {
  return {
    type: types.UPDATE_LOCATION,
    payload: axios.patch(`${routes.apiRoot}/locations/${location.id}`, location)
  };
}

export function deleteLocation(location) {
  return {
    type: types.DELETE_LOCATION,
    payload: axios.delete(`${routes.apiRoot}/locations/${location.id}`, location)
  };
}

export function createClient(client) {
  return {
    type: types.CREATE_CLIENT,
    payload: axios.post(`${routes.apiRoot}/clients`, client)
  };
}

export function createEmployee(employee) {
  return {
    type: types.CREATE_EMPLOYEE,
    payload: axios.post(`${routes.apiRoot}/employees`, employee)
  };
}

export function updateUser(user) {
  switch (user.type) {
    case 'client':
      return {
        type: types.UPDATE_CLIENT,
        payload: axios.patch(`${routes.apiRoot}/clients/${user.id}`, user)
      };

    case 'admin':
    case 'employee':
    default:
      return {
        type: types.UPDATE_EMPLOYEE,
        payload: axios.patch(`${routes.apiRoot}/employees/${user.id}`, user)
      };
  }
}

export function deleteUser(user) {
  switch (user.type) {
    case 'client':
      return {
        type: types.DELETE_CLIENT,
        payload: axios.delete(`${routes.apiRoot}/clients/${user.id}`)
      };

    case 'admin':
    case 'employee':
    default:
      return {
        type: types.DELETE_EMPLOYEE,
        payload: axios.delete(`${routes.apiRoot}/employees/${user.id}`)
      };
  }
}

export function uploadImage(formData) {
  return {
    type: types.UPLOAD_IMAGE,
    payload: axios.post(`${routes.apiRoot}/media`, formData)
  };
}

export function changePassword(currentPassword, newPassword) {
  return {
    type: types.CHANGE_PASSWORD,
    payload: axios.post(`${routes.apiRoot}/password`, { currentPassword, newPassword })
  };
}

export function changeProfilePicture(mediaId) {
  return {
    type: types.CHANGE_PROFILE_PICTURE,
    payload: axios.post(`${routes.apiRoot}/profile-picture`, { media_id: mediaId })
  };
}
