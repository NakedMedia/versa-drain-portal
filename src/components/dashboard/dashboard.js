import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import routes from '../../../config/routes';

const Dashboard = props => {
	function renderColumn(icon, amount, name, route) {
		return (
			<div className="column">
				<Link to={`${routes.webRoot}${route}`}>
					<div className="notification is-primary vd-box-shadow">
						<div className="level is-mobile">
							<div className="level-left">
								<span className="icon is-large">
									<i className={`fa fa-3x fa-${icon}`} />
								</span>
							</div>
							<div className="level-right level-vertical">
								<h2 className="title is-2">{amount}</h2>
								<h4 className="subtitle is-4">{name}</h4>
							</div>
						</div>
					</div>
				</Link>
			</div>
		);
	}

	return (
		<div>
			<div className="columns is-marginless">
				{props.reportsList
					? renderColumn('clipboard', props.reportsList.length, 'Reports', '/reports')
					: null}
				{props.me && props.clients && props.me.type !== 'client'
					? renderColumn('briefcase', props.clients.length, 'Clients', '/clients')
					: null}
				{props.me && props.employees && props.me.type !== 'employee'
					? renderColumn('wrench', props.employees.length, 'Technicians', '/technicians')
					: null}
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		me: state.users.me,
		reportsList: state.reports.list,
		clients: state.users.clients,
		employees: state.users.employees,
	};
}

export default connect(mapStateToProps)(Dashboard);
