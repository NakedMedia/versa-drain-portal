/* eslint no-confusing-arrow: 0 */

import {
  FETCH_ME,
  FETCH_REPORTS,
  FETCH_CLIENTS,
  FETCH_EMPLOYEES,
  CREATE_CLIENT,
  CREATE_EMPLOYEE,
  UPDATE_CLIENT,
  UPDATE_EMPLOYEE,
  DELETE_CLIENT,
  DELETE_EMPLOYEE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPORTS:
      return { ...state, reports: action.payload };

    case FETCH_ME:
      return { ...state, me: action.payload };

    case FETCH_CLIENTS:
      return { ...state, clients: action.payload };

    case CREATE_CLIENT:
      return { ...state, clients: [action.payload.data, ...state.clients] };

    case UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.data.id ? action.payload.data : client
        ),
        me: action.payload.data.id === state.me.id ? action.payload.data : state.me
      };

    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload.data.id)
      };

    case FETCH_EMPLOYEES:
      return { ...state, employees: action.payload };

    case CREATE_EMPLOYEE:
      return { ...state, employees: [action.payload.data, ...state.employees] };

    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.data.id ? action.payload.data : employee
        ),
        me: action.payload.data.id === state.me.id ? action.payload.data : state.me
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(employee => employee.id !== action.payload.data.id)
      };

    default:
      return state;
  }
};
