import { FETCH_REPORTS, CREATE_REPORT, CHANGE_PROFILE_PICTURE } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_REPORTS:
			return { ...state, list: action.payload };
		case CREATE_REPORT:
			return { ...state, list: [action.payload.data, ...state.list] };
		case CHANGE_PROFILE_PICTURE:
			return {
				...state,
				list: state.list.map(report => {
					if (report.employee.id === action.payload.data.id) {
						return { ...report, employee: action.payload.data };
					} else if (report.client.id === action.payload.data.id) {
						return { ...report, client: action.payload.data };
					}

					return report;
				}),
			};
		default:
			return state;
	}
};
