import {
	FETCH_ME,
	FETCH_REPORTS,
	CHANGE_PROFILE_PICTURE,
	FETCH_CLIENTS,
	FETCH_EMPLOYEES,
} from '../actions/types';

export default (state = {}, action) => {
	const clients = [];
	const employees = [];

	switch (action.type) {
		case FETCH_REPORTS:
			action.payload.forEach(report => {
				if (!clients.find(client => report.client.id === client.id)) {
					clients.push(report.client);
				}

				if (!employees.find(employee => report.employee.id === employee.id)) {
					employees.push(report.employee);
				}
			});

			return { ...state, employees, clients };

		case FETCH_ME:
			return { ...state, me: action.payload };

		case FETCH_CLIENTS:
			return { ...state, clients: action.payload };

		case FETCH_EMPLOYEES:
			return { ...state, employees: action.payload };

		case CHANGE_PROFILE_PICTURE:
			return { ...state, me: action.payload.data };

		default:
			return state;
	}
};
