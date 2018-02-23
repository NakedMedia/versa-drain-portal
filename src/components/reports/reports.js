import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import emptyProfile from '../../img/empty-profile.jpg';

class Reports extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: parseInt(this.props.match.params.id, 10) || null,
			search: '',
		};
	}

	handleSelect(e) {
		this.setState({ user: parseInt(e.target.value, 10) || null });
	}

	handleSearch(e) {
		this.setState({ search: e.target.value.toLowerCase() });
	}

	renderReportImage(img) {
		if (!img) return null;

		return (
			<figure className="media-right">
				<a href={img}>
					<span className="icon is-medium has-text-primary">
						<i className="fa fa-image" />
					</span>
				</a>
			</figure>
		);
	}

	renderOptions(users) {
		if (!users || users.length === 0) return null;

		return users.map(user => (
			<option key={user.id} value={user.id}>
				{user.name}
			</option>
		));
	}

	renderReports(reports) {
		const fliteredReports = reports.filter(
			report =>
				(report.client.id === this.state.user ||
					report.employee.id === this.state.user ||
					!this.state.user) &&
				report.description.toLowerCase().includes(this.state.search)
		);

		return fliteredReports.map(report => (
			<div className="box" key={report.id}>
				<nav className="level is-mobile">
					<div className="level-left">
						<figure className="level-item image is-48x48 vd-profile-picture">
							<img src={report.employee.img || emptyProfile} alt="User" />
						</figure>
						<p className="level-item has-text-grey">{report.employee.name}</p>
					</div>
					<div className="level-left level-vertical is-hidden-mobile">
						<p className="has-text-grey-light is-size-7">
							{moment(report.date).format('lll')}
						</p>
					</div>
					<div className="level-right">
						<p className="level-item has-text-grey">{report.client.name}</p>
						<figure className="level-item image is-48x48 vd-profile-picture">
							<img src={report.client.img || emptyProfile} alt="User" />
						</figure>
					</div>
				</nav>
				<hr />
				<nav className="media has-text-grey">
					<div className="media-content">
						<p>{report.description}</p>
					</div>
					{this.renderReportImage(report.img)}
				</nav>
			</div>
		));
	}

	render() {
		if (!this.props.reportsList || !this.props.me) return <div className="loader" />;
		if (this.props.reportsList.length === 0) return <h3>No Reports</h3>;

		return (
			<div>
				<div className="field has-addons">
					<p className="control has-icons-left has-icons-right vd-report-search">
						<input
							className="input"
							type="text"
							placeholder="Search Reports"
							onChange={this.handleSearch.bind(this)}
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-search" />
						</span>
					</p>
					<p className="control">
						<span className="select">
							<select
								defaultValue={this.state.user}
								onChange={this.handleSelect.bind(this)}
							>
								<option value={null}>All</option>
								{this.renderOptions(
									this.props.me.type === 'employee'
										? this.props.clients
										: this.props.employees
								)}
							</select>
						</span>
					</p>
				</div>
				{this.renderReports(this.props.reportsList)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		employee: state.users.employees,
		clients: state.users.clients,
		reportsList: state.reports.list,
	};
}

export default connect(mapStateToProps)(Reports);
