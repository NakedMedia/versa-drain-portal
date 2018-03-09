import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';

import routes from '../../../config/routes';

import * as actions from '../../actions';

import emptyProfile from '../../img/empty-profile.jpg';

class Reports extends Component {
	constructor(props) {
		super(props);

		const userId = parseInt(this.props.match.params.id, 10);

		this.state = {
			employee:
				props.employees && props.employees.find(employee => employee.id === userId)
					? userId
					: null,
			client:
				props.clients && props.clients.find(client => client.id === userId) ? userId : null,
			search: '',
		};
	}

	handleEmployeeSelect(selectedValue) {
		this.setState({ employee: selectedValue ? selectedValue.value : null });
	}

	handleClientSelect(selectedValue) {
		this.setState({ client: selectedValue ? selectedValue.value : null });
	}

	handleSearch(e) {
		this.setState({ search: e.target.value.toLowerCase() });
	}

	renderReportImages(mediaUrls) {
		if (!mediaUrls) return null;

		return (
			<div className="media-right">
				{mediaUrls.map((media, index) => (
					<a key={index} href={media}>
						<span className="icon is-medium has-text-primary">
							<i className="fa fa-lg fa-image" />
						</span>
						<br />
					</a>
				))}
			</div>
		);
	}

	renderEmployeeSelect(type) {
		if (type === 'employee') return null;

		return (
			<Select
				className="vd-search-select is-marginless"
				value={this.state.employee}
				onChange={this.handleEmployeeSelect.bind(this)}
				options={this.renderOptions(this.props.employees)}
				placeholder="All"
			/>
		);
	}

	renderClientSelect(type) {
		if (type === 'client') return null;

		return (
			<Select
				className="vd-search-select is-marginless"
				value={this.state.client}
				onChange={this.handleClientSelect.bind(this)}
				options={this.renderOptions(this.props.clients)}
				placeholder="All"
			/>
		);
	}

	renderOptions(users) {
		if (!users || users.length === 0) return [];

		return users.map(user => ({
			value: user.id,
			label: `#${user.id} - ${user.name}`,
		}));
	}

	renderAdminOptions(type, report) {
		if (type !== 'admin') return null;

		return (
			<div>
				<span className="icon has-text-primary is-small">
					<Link to={`${routes.webRoot}/reports/${report.id}/edit`}>
						<i className="fas fa-edit" />
					</Link>
				</span>

				<span className="icon has-text-primary is-large">
					<a
						onClick={() => {
							this.props.deleteReport(report);
						}}
					>
						<i className="fas fa-trash" />
					</a>
				</span>
			</div>
		);
	}

	renderReports(reports) {
		const fliteredReports = reports.filter(
			report =>
				(report.client.id === this.state.client || !this.state.client) &&
				(report.employee.id === this.state.employee || !this.state.employee) &&
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
						<figure className="level-item image is-48x48 vd-profile-picture is-marginless">
							<img src={report.client.img || emptyProfile} alt="User" />
						</figure>
					</div>
				</nav>
				<hr />
				<div className="media has-text-grey">
					<div className="media-content">
						<p>{report.description}</p>
					</div>
					{this.renderReportImages(report.media_urls)}
				</div>
				{this.renderAdminOptions(this.props.me.type, report)}
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
					{this.renderEmployeeSelect(this.props.me.type)}
					{this.renderClientSelect(this.props.me.type)}
				</div>
				{this.renderReports(this.props.reportsList)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		employees: state.users.employees,
		clients: state.users.clients,
		reportsList: state.reports.list,
	};
}

export default connect(mapStateToProps, actions)(Reports);
