import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../../../config/routes';

import emptyProfile from '../../img/empty-profile.jpg';

const Technicians = props => {
	function renderTechnicians(employees) {
		if (!props.employeesList || !props.me) return <div className="loader" />;
		if (props.employeesList.length === 0) return <h3>No Technicians</h3>;

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
								<Link to={`${routes.webRoot}/reports/${employee.id}`}>
									{employee.name}
								</Link>
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
								<br />
								{props.me.type !== 'client' ? (
									<small className="is-capitalized">
										<strong>Type: </strong>
										{employee.type}
									</small>
								) : null}
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
		me: state.users.me,
		employeesList: state.users.employees,
	};
}

export default connect(mapStateToProps)(Technicians);
