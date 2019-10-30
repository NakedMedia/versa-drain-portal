import {
  FETCH_LOCATIONS,
  CREATE_LOCATION,
  UPDATE_LOCATION,
  DELETE_LOCATION
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS:
      return { ...state, list: action.payload };
    case CREATE_LOCATION:
      return { ...state, list: [action.payload.data, ...state.list] };

    case UPDATE_LOCATION:
      return {
        ...state,
        list: state.list.map(location =>
          location.id === action.payload.data.id ? action.payload.data : location
        )
      };

    case DELETE_LOCATION:
      return {
        ...state,
        list: state.list.filter(report => report.id !== action.payload.data.id)
      };

    default:
      return state;
  }
};
