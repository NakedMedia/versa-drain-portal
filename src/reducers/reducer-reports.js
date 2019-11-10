import {
  FETCH_REPORTS,
  CREATE_REPORT,
  UPDATE_EMPLOYEE,
  UPDATE_CLIENT,
  UPDATE_REPORT,
  DELETE_REPORT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPORTS:
      return { ...state, list: action.payload };
    case CREATE_REPORT:
      return { ...state, list: [action.payload.data, ...state.list] };

    case UPDATE_REPORT:
      return {
        ...state,
        list: state.list.map(report =>
          report.id === action.payload.data.id ? action.payload.data : report
        )
      };

    case DELETE_REPORT:
      console.log(action);
      return {
        ...state,
        list: state.list.filter(report => report.id !== action.payload.data.id)
      };

    case UPDATE_EMPLOYEE:
    case UPDATE_CLIENT:
      return {
        ...state,
        list: state.list.map(report => {
          if (report.employee.id === action.payload.data.id) {
            return { ...report, employee: action.payload.data };
          } else if (report.client.id === action.payload.data.id) {
            return { ...report, client: action.payload.data };
          }

          return report;
        })
      };
    default:
      return state;
  }
};
