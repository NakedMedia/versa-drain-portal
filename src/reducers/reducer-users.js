import {
	FETCH_ME,
	FETCH_REPORTS,
	CHANGE_PROFILE_PICTURE,
	FETCH_CLIENTS,
	FETCH_EMPLOYEES,
	CREATE_CLIENT,
	CREATE_EMPLOYEE,
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

		case CREATE_CLIENT:
			return { ...state, clients: [action.payload.data, ...state.clients] };

		case FETCH_EMPLOYEES:
			return { ...state, employees: action.payload };

		case CREATE_EMPLOYEE:
			return { ...state, employees: [action.payload.data, ...state.employees] };

		case CHANGE_PROFILE_PICTURE:
			return { ...state, me: action.payload.data };

		default:
			return state;
	}
};
