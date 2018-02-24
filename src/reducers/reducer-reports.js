import { FETCH_REPORTS, CREATE_REPORT } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_REPORTS:
			return { ...state, list: action.payload };
		case CREATE_REPORT:
			return { ...state, list: [action.payload.data, ...state.list] };
		default:
			return state;
	}
};
