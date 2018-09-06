import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../../config/routes';

import logo from '../../img/logo.png';

export default props => {
	function renderNewReport(type) {
		if (type === 'client') return null;

		return (
			<NavLink
				activeClassName="is-active"
				className="navbar-item is-tab"
				to={`${routes.webRoot}/reports/new`}
			>
				<span className="icon is-medium">
					<i className="fas fa-clipboard" />
				</span>
				<span>Create Report</span>
			</NavLink>
		);
	}

	function renderNewClient(type) {
		if (type !== 'admin') return null;

		return (
			<NavLink
				activeClassName="is-active"
				className="navbar-item is-tab"
				to={`${routes.webRoot}/clients/new`}
			>
				<span className="icon is-medium">
					<i className="fas fa-briefcase" />
				</span>
				<span>Create Client</span>
			</NavLink>
		);
	}

	function renderNewEmployee(type) {
		if (type !== 'admin') return null;

		return (
			<NavLink
				activeClassName="is-active"
				className="navbar-item is-tab"
				to={`${routes.webRoot}/technicians/new`}
			>
				<span className="icon is-medium">
					<i className="fas fa-wrench" />
				</span>
				<span>Create Technician</span>
			</NavLink>
		);
	}

	if (!props.user) return null;

	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand is-marginless">
				<a className="navbar-item" href="https://bulma.io">
					<img src={logo} alt="Logo" />
				</a>
			</div>
			<div className="navbar-end">
				{renderNewClient(props.user.type)}
				{renderNewEmployee(props.user.type)}
				{renderNewReport(props.user.type)}
			</div>
		</nav>
	);
};
