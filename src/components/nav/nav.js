import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../img/logo.png';

export default props => {
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="https://bulma.io">
					<img src={logo} alt="Logo" />
				</a>
			</div>
			<div className="navbar-end">
				<NavLink
					activeClassName="is-active"
					className="navbar-item is-tab"
					to="/new-report"
				>
					<span className="icon is-medium">
						<i className="fas fa-clipboard" />
					</span>
					<span>New Report</span>
				</NavLink>
			</div>
		</nav>
	);
};
