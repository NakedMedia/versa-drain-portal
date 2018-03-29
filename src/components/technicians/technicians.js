import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../../../config/routes';

import * as actions from '../../actions';

import emptyProfile from '../../img/empty-profile.jpg';

class Technicians extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
		};
	}

	handleSearch(e) {
		this.setState({ search: e.target.value.toLowerCase() });
	}

	renderAdminOptions(type, employee) {
		if (type !== 'admin') return null;

		return (
			<div className="media-right">
				<span className="icon has-text-primary is-large">
					<Link to={`${routes.webRoot}/technicians/${employee.id}/edit`}>
						<i className="fas fa-edit" />
					</Link>
				</span>

				<span className="icon has-text-primary is-large">
					<a
						onClick={() => {
							this.props.deleteUser(employee);
						}}
					>
						<i className="fas fa-trash" />
					</a>
				</span>
			</div>
		);
	}

	renderTechnicians(employees) {
		if (!this.props.employeesList || !this.props.me) return <div className="loader" />;
		if (this.props.employeesList.length === 0) return <h3>No Technicians</h3>;

		return employees
			.filter(
				employee =>
					employee.id !== this.props.me.id &&
					(employee.id.toString().startsWith(this.state.search) ||
						employee.name.toLowerCase().startsWith(this.state.search) ||
						employee.email.toLowerCase().startsWith(this.state.search) ||
						employee.phone.toLowerCase().startsWith(this.state.search))
			)
			.map(employee => (
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
										#{employee.id}
									</small>
									<br />
									<small>
										<strong>Phone: </strong>
										{employee.phone || 'N/A'}
									</small>
									<br />
									<small>
										<strong>Email: </strong>
										{employee.email || 'N/A'}
									</small>
									<br />
									{this.props.me.type !== 'client' ? (
										<small className="is-capitalized">
											<strong>Type: </strong>
											{employee.type === 'employee'
												? 'Technician'
												: employee.type}
										</small>
									) : null}
								</p>
							</div>
						</div>
						{this.renderAdminOptions(this.props.me.type, employee)}
					</article>
				</div>
			));
	}

	render() {
		return (
			<div>
				<div className="field has-addons">
					<p className="control has-icons-left has-icons-right vd-report-search">
						<input
							className="input"
							type="text"
							placeholder="Search Technicians"
							onChange={this.handleSearch.bind(this)}
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-search" />
						</span>
					</p>
				</div>
				{this.renderTechnicians(this.props.employeesList)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		employeesList: state.users.employees,
	};
}

export default connect(mapStateToProps, actions)(Technicians);
