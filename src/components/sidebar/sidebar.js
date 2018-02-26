import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../../config/routes';

import emptyProfile from '../../img/empty-profile.jpg';

export default props => {
	function renderUserInfo(user) {
		return (
			<nav className="level">
				<div className="level-left">
					<figure className="level-item image is-96x96 vd-profile-picture is-marginless">
						<img role="presentation" src={user.img || emptyProfile} />
					</figure>
				</div>
				<div className="level-right">
					<div className="level-item has-text-right">
						<p>
							Welcome, {user.name}
							<br />
							<small>{user.phone || user.contact_phone}</small>
							<br />
							<small>{user.email || user.contact_email}</small>
						</p>
					</div>
				</div>
			</nav>
		);
	}

	function renderUserLink(type) {
		switch (type) {
			case 'employee':
				return (
					<li>
						<NavLink activeClassName="is-active" to={`${routes.webRoot}/clients`}>
							<span className="icon is-medium">
								<i className="fas fa-briefcase" />
							</span>
							<span>My Clients</span>
						</NavLink>
					</li>
				);

			case 'client':
				return (
					<li>
						<NavLink activeClassName="is-active" to={`${routes.webRoot}/technicians`}>
							<span className="icon is-medium">
								<i className="fas fa-wrench" />
							</span>
							<span>Technicians</span>
						</NavLink>
					</li>
				);

			default:
				return null;
		}
	}

	if (!props.user) return null;

	return (
		<div className="column vd-sidebar-column is-hidden-mobile">
			<div className="card">
				<div className="card-content">
					<div className="content">
						{renderUserInfo(props.user)}
						<hr />
						<div className="menu">
							<p className="menu-label">Menu</p>
							<ul className="menu-list">
								<li>
									<NavLink
										activeClassName="is-active"
										to={`${routes.webRoot}/dashboard`}
									>
										<span className="icon is-medium">
											<i className="fas fa-chart-pie" />
										</span>
										<span>Dashboard</span>
									</NavLink>
								</li>
								{renderUserLink(props.user.type)}
								<li>
									<NavLink
										activeClassName="is-active"
										to={`${routes.webRoot}/reports`}
									>
										<span className="icon is-medium">
											<i className="fas fa-clipboard" />
										</span>
										<span>Reports</span>
									</NavLink>
								</li>
							</ul>
							<p className="menu-label">Account</p>
							<ul className="menu-list">
								<li>
									<NavLink
										activeClassName="is-active"
										to={`${routes.webRoot}/settings`}
									>
										<span className="icon is-medium">
											<i className="fas fa-sliders-h" />
										</span>
										<span>Settings</span>
									</NavLink>
								</li>
								<li>
									<a
										href={`${routes.webRoot}`}
										onClick={() => {
											props.logout();
										}}
									>
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
