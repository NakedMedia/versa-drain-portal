import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import emptyProfile from '../../img/empty-profile.jpg';

const Technicians = props => {
	function renderTechnicians(employees) {
		if (!props.reportsList) return <div className="loader" />;
		if (props.reportsList.length === 0) return <h3>No Technicians</h3>;

		return employees.map(employee => (
			<div className="box" key={employee.id}>
				<article className="media">
					<div className="media-left">
						<figure className="image is-64x64 vd-profile-picture">
							<img src={employee.img || emptyProfile} alt="Client" />
						</figure>
					</div>
					<div className="media-content">
						<div className="content">
							<p>
								<Link to={`/reports/${employee.id}`}>{employee.name}</Link>
								<br />
								<small>
									<strong>Employee ID: </strong>
									{employee.id}
								</small>
								<br />
								<small>
									<strong>Phone: </strong>
									{employee.phone || 'N/A'}
								</small>
								<br />
								<small>
									<strong>Name: </strong>
									{employee.name || 'N/A'}
								</small>
								<br />
								<small>
									<strong>Email: </strong>
									{employee.email || 'N/A'}
								</small>
							</p>
						</div>
					</div>
				</article>
			</div>
		));
	}

	return <div>{renderTechnicians(props.employeesList)}</div>;
};

function mapStateToProps(state) {
	return {
		reportsList: state.reports.list,
		employeesList: state.users.employees,
	};
}

export default connect(mapStateToProps)(Technicians);
