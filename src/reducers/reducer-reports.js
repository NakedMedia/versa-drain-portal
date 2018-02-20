import { FETCH_REPORTS } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_REPORTS:
			return { ...state, list: action.payload };
		default:
			return state;
	}
};
