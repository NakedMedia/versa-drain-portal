import React from 'react';
import { NavLink } from 'react-router-dom';

import emptyProfile from '../../img/empty-profile.jpg';

export default props => {
	function renderUserInfo(user) {
		if (!user) return <div className="loader" />;

		return (
			<div>
				<figure className="image is-96x96">
					<img role="presentation" src={emptyProfile} />
				</figure>
				<br />
				<h5>Welcome, {props.user.name}</h5>
			</div>
		);
	}

	return (
		<div className="column vd-sidebar-column">
			<div className="card">
				<div className="card-content">
					<div className="content">
						{renderUserInfo(props.user)}
						<hr />
						<div className="menu">
							<p className="menu-label">Menu</p>
							<ul className="menu-list">
								<li>
									<NavLink activeClassName="is-active" to="/dashboard">
										<span className="icon is-medium">
											<i className="fas fa-chart-pie" />
										</span>
										<span>Dashboard</span>
									</NavLink>
								</li>
								<li>
									<NavLink activeClassName="is-active" to="/clients">
										<span className="icon is-medium">
											<i className="fas fa-briefcase" />
										</span>
										<span>My Clients</span>
									</NavLink>
								</li>
							</ul>
							<p className="menu-label">Account</p>
							<ul className="menu-list">
								<li>
									<NavLink activeClassName="is-active" to="/settings">
										<span className="icon is-medium">
											<i className="fas fa-sliders-h" />
										</span>
										<span>Settings</span>
									</NavLink>
								</li>
								<li>
									<a>
										<span className="icon is-medium">
											<i className="fas fa-power-off" />
										</span>
										<span>Sign Out</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
