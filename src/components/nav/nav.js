import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../../config/routes';

import logo from '../../img/logo.png';

export default props => {
	function renderNewReport(type) {
		if (type !== 'employee') return null;

		return (
			<NavLink
				activeClassName="is-active"
				className="navbar-item is-tab"
				to={`${routes.webRoot}/new-report`}
			>
				<span className="icon is-medium">
					<i className="fas fa-clipboard" />
				</span>
				<span>New Report</span>
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
			<div className="navbar-end">{renderNewReport(props.user.type)}</div>
		</nav>
	);
};
