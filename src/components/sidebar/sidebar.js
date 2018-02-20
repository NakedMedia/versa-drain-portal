import React from 'react';

export default props => {
	return (
		<div className="column vd-sidebar-column">
			<div className="card">
				<div className="card-content">
					<div className="content">
						<figure className="image is-96x96">
							<img
								role="presentation"
								src="https://bulma.io/images/placeholders/96x96.png"
							/>
						</figure>

						<hr />
						<div className="menu">
							<p className="menu-label">Menu</p>
							<ul className="menu-list">
								<li>
									<a>
										<span className="icon is-medium has-text-primary">
											<i className="fas fa-chart-pie" />
										</span>
										<span>Dashboard</span>
									</a>
								</li>
								<li>
									<a>
										<span className="icon is-medium has-text-primary">
											<i className="fas fa-briefcase" />
										</span>
										<span>Clients</span>
									</a>
								</li>
							</ul>
							<p className="menu-label">Account</p>
							<ul className="menu-list">
								<li>
									<a>
										<span className="icon is-medium has-text-primary">
											<i className="fas fa-sliders-h" />
										</span>
										<span>Settings</span>
									</a>
								</li>
								<li>
									<a>
										<span className="icon is-medium has-text-primary">
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
