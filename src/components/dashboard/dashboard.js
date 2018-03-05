import React from 'react';
import { connect } from 'react-redux';

const Dashboard = props => {
	function renderColumn(icon, amount, name) {
		return (
			<div className="column">
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
			</div>
		);
	}

	function renderInfo(user) {
		if (!user) return null;

		if (user.type === 'employee' && props.clients) {
			return renderColumn('briefcase', props.clients.length, 'Clients');
		} else if (user.type === 'client' && props.clients) {
			return renderColumn('wrench', props.employees.length, 'Technicians');
		} else if (user.type === 'admin' && props.clients && props.employees) {
			return (
				<div>
					{renderColumn('briefcase', props.clients.length, 'Clients')}
					{renderColumn('wrench', props.employees.length, 'Employees')}
				</div>
			);
		}

		return null;
	}

	return (
		<div>
			<div className="columns is-marginless">
				{props.reportsList
					? renderColumn('clipboard', props.reportsList.length, 'Reports')
					: null}
				{renderInfo(props.me)}
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
