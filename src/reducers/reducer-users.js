import { FETCH_ME, FETCH_REPORTS } from '../actions/types';

export default (state = {}, action) => {
	const clients = [];
	const employees = [];

	switch (action.type) {
		case FETCH_REPORTS:
			if (action.payload.length === 0) return { ...state, clients: null };

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
		default:
			return state;
	}
};
